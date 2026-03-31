import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "syedmuhammadsufyan237@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:32px;background:#0f0f0f;color:#e8e6df;border:1px solid #1f1f1f;">
          <h2 style="font-size:18px;margin-bottom:24px;color:#a8ff78;">New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Name</td></tr>
            <tr><td style="padding:0 0 16px;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</td></tr>
            <tr><td style="padding:0 0 16px;font-size:14px;"><a href="mailto:${email}" style="color:#a8ff78;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Message</td></tr>
            <tr><td style="padding:0;font-size:14px;line-height:1.75;white-space:pre-wrap;">${message}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
