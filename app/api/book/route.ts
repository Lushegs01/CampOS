import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// We initialize the Resend client using the environment variable.
// If it's missing, it won't crash here but will fail when we try to send.
const resend = new Resend(process.env.RESEND_API_KEY || 'missing_key');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, institution } = body;

    if (!name || !email || !institution) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send the email
    const data = await resend.emails.send({
      // Resend requires a verified domain to send 'from'.
      // If you don't have one configured yet, use 'onboarding@resend.dev' 
      // (this only works if sending TO your verified account email)
      from: 'CampOS Demo <onboarding@resend.dev>',
      to: ['scanmarkapp@gmail.com'],
      subject: `New Demo Request: ${institution}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
          <h2 style="color: #059669;">New CampOS Demo Request</h2>
          <p>You have received a new demo request from the CampOS landing page.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Institution:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${institution}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">This is an automated message from your CampOS landing page.</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
