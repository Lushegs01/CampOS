import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * "Talk to CampOS" — relays an institutional enquiry by email.
 *
 * RESEND_API_KEY and CONTACT_TO must be set in the deployment environment. The
 * route never echoes submitted content back to the browser, and everything that
 * reaches the email body is escaped.
 */

const resend = new Resend(process.env.RESEND_API_KEY ?? "missing_key");

const TO = process.env.CONTACT_TO ?? "scanmarkapp@gmail.com";
const FROM = process.env.CONTACT_FROM ?? "CampOS <onboarding@resend.dev>";

const MAX = 2000;

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .slice(0, MAX)
    .replace(/[<>&"']/g, (character) =>
      character === "<"
        ? "&lt;"
        : character === ">"
          ? "&gt;"
          : character === "&"
            ? "&amp;"
            : character === '"'
              ? "&quot;"
              : "&#39;"
    )
    .trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const name = clean(body.name);
    const email = clean(body.email);
    const institution = clean(body.institution);
    const role = clean(body.role);
    const message = clean(body.message);

    if (!name || !email || !institution) {
      return NextResponse.json(
        { error: "Please provide your name, email and institution." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "That email address looks incomplete." }, { status: 400 });
    }

    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Institution", institution],
      ["Role", role || "—"],
      ["Message", message || "—"],
    ];

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `CampOS enquiry — ${institution}`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; color: #0A0D0C; padding: 24px;">
          <p style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #6B726E; margin: 0;">
            New institutional enquiry
          </p>
          <h1 style="font-size: 20px; font-weight: 600; margin: 12px 0 20px;">${institution}</h1>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #E3E2D9; color: #6B726E; width: 140px; vertical-align: top;">${label}</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #E3E2D9;">${value}</td>
              </tr>`
              )
              .join("")}
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #6B726E;">
            Sent from the CampOS website.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend rejected the enquiry:", error);
      return NextResponse.json(
        { error: "We could not send that just now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (cause) {
    console.error("Failed to send enquiry:", cause);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
