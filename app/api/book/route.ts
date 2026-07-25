import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// We initialize the Resend client using the environment variable.
// If it's missing, it won't crash here but will fail when we try to send.
const resend = new Resend(process.env.RESEND_API_KEY || 'missing_key');

/**
 * Escape a submitted value for interpolation into the HTML email body.
 *
 * Every field below is attacker-controlled: this is a public, unauthenticated
 * endpoint, and whatever is posted lands in a human's inbox formatted as HTML.
 * Without this, `name` of `<a href="…">Verify your account</a>` arrives as a
 * live link inside a message that looks like our own automated tooling.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const MAX_FIELD_LENGTH = 200;
const MAX_BODY_BYTES = 8 * 1024;

// Deliberately permissive — this rejects obvious junk without trying to be the
// authority on what a valid address looks like. Resend is.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Per-IP fixed window, held in module scope.
 *
 * This is a single-instance guard: it resets on cold start and is not shared
 * across serverless instances or regions, so it blunts casual abuse rather than
 * a distributed flood. A durable store (Upstash, Vercel KV) is the real answer
 * if this endpoint ever gets sustained traffic.
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; expires: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, entry] of hits) {
      if (entry.expires <= now) hits.delete(key);
    }
  }

  const entry = hits.get(ip);
  if (!entry || entry.expires <= now) {
    hits.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: Request) {
  try {
    if (rateLimited(clientIp(request))) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) } }
      );
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'Malformed request body' }, { status: 400 });
    }

    const { name, email, institution } = (body ?? {}) as Record<string, unknown>;

    // Type checks matter as much as presence checks — JSON can carry arrays and
    // objects into fields the template expects to be strings.
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof institution !== 'string'
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanInstitution = institution.trim();

    if (!cleanName || !cleanEmail || !cleanInstitution) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (
      cleanName.length > MAX_FIELD_LENGTH ||
      cleanEmail.length > MAX_FIELD_LENGTH ||
      cleanInstitution.length > MAX_FIELD_LENGTH
    ) {
      return NextResponse.json({ error: 'One or more fields are too long' }, { status: 400 });
    }

    // The browser's type="email" is a hint to the user, not a control — this
    // endpoint is reachable without it.
    if (!EMAIL_PATTERN.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured; cannot send demo request.');
      return NextResponse.json(
        { error: 'Demo requests are temporarily unavailable. Please email us directly.' },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeInstitution = escapeHtml(cleanInstitution);

    const data = await resend.emails.send({
      // Resend requires a verified domain to send 'from'.
      // If you don't have one configured yet, use 'onboarding@resend.dev'
      // (this only works if sending TO your verified account email)
      from: process.env.RESEND_FROM ?? 'CampOS Demo <onboarding@resend.dev>',
      to: [process.env.RESEND_TO ?? 'scanmarkapp@gmail.com'],
      replyTo: cleanEmail,
      subject: `New Demo Request: ${cleanInstitution}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
          <h2 style="color: #059669;">New CampOS Demo Request</h2>
          <p>You have received a new demo request from the CampOS landing page.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Institution:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeInstitution}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">This is an automated message from your CampOS landing page.</p>
        </div>
      `,
    });

    if (data.error) {
      // Upstream copy can leak provider detail; log it, return something plain.
      console.error('Resend rejected the message:', data.error);
      return NextResponse.json({ error: 'Could not send your request. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
