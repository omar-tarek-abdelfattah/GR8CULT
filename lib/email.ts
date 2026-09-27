import { Resend } from "resend";

export interface BookingEmailPayload {
  toEmail: string;
  artistName: string;
  service: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
}

function formatSessionDateTime(isoStart: string, isoEnd: string) {
  try {
    const startDate = new Date(isoStart);
    const endDate = new Date(isoEnd);

    const dateFormatted = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Africa/Cairo",
    });

    const startTimeFormatted = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Cairo",
    });

    const endTimeFormatted = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Cairo",
    });

    return `${dateFormatted} from ${startTimeFormatted} to ${endTimeFormatted} (Cairo Time)`;
  } catch {
    return `${isoStart} - ${isoEnd}`;
  }
}

export async function sendBookingConfirmationEmail(payload: BookingEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY is not configured in environment variables. Email notification skipped."
    );
    return { success: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "GR8NIK STUDIOS <onboarding@resend.dev>";

  const sessionWindow = formatSessionDateTime(payload.startTime, payload.endTime);
  const whatsappUrl = `https://wa.me/+201011444140?text=${encodeURIComponent(
    `Hey GR8NIK Studios! I just received my booking email for ${payload.service} on ${sessionWindow}. I'm ready to pay the deposit.`
  )}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Session Hold Confirmation // GR8NIK STUDIOS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="max-width: 600px; background-color: #0b0b0b; border: 1px solid #222222; text-align: left;">
          <!-- Top Accent Banner -->
          <tr>
            <td style="background-color: #D60000; height: 4px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #1a1a1a;">
              <span style="font-size: 11px; letter-spacing: 3px; color: #D60000; font-weight: bold; text-transform: uppercase;">
                GR8NIK STUDIOS // CAIRO
              </span>
              <h1 style="margin: 8px 0 0 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800; text-transform: uppercase;">
                SESSION HOLD RESERVED
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #e0e0e0; line-height: 1.6;">
                Hey <strong style="color: #ffffff;">${payload.artistName || "Artist"}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #aaaaaa; line-height: 1.6;">
                Your studio session slot has been placed on <strong style="color: #ffffff;">HOLD</strong> in our calendar. Please review your session details below:
              </p>

              <!-- Session Details Card -->
              <table width="100%" style="background-color: #121212; border: 1px solid #262626; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 18px 20px; border-bottom: 1px solid #1e1e1e;">
                    <span style="font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">PACKAGE</span>
                    <strong style="font-size: 15px; color: #D60000;">${payload.service}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px; border-bottom: 1px solid #1e1e1e;">
                    <span style="font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">DATE & TIME</span>
                    <strong style="font-size: 14px; color: #ffffff;">${sessionWindow}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px;">
                    <span style="font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 4px;">LOCATION</span>
                    <strong style="font-size: 14px; color: #cccccc;">GR8NIK STUDIOS — Mokattam, Cairo, Egypt</strong>
                  </td>
                </tr>
              </table>

              <!-- Deposit Locking Callout -->
              <div style="background-color: #1a0505; border: 1px solid #D60000; padding: 20px; margin-bottom: 28px;">
                <span style="font-size: 11px; color: #ff6b6b; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; display: block; margin-bottom: 6px;">
                  ⚠️ CRITICAL: PAY 50% DEPOSIT TO OFFICIALLY LOCK SLOT
                </span>
                <p style="margin: 0; font-size: 13px; color: #dddddd; line-height: 1.5;">
                  Your slot is tentatively held for <strong>12 hours</strong>. To permanently confirm and lock your engineer session into the calendar, please transfer your deposit via <strong>Vodafone Cash</strong> or <strong>InstaPay</strong> (+201011444140).
                </p>
              </div>

              <!-- Button CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; font-size: 13px; letter-spacing: 1.5px; font-weight: bold; padding: 14px 28px; text-transform: uppercase; border-radius: 2px;">
                      CONFIRM ON WHATSAPP & PAY 50% DEPOSIT →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 28px 0 0 0; font-size: 12px; color: #777777; line-height: 1.5; text-align: center;">
                Need help or custom changes? Contact studio management directly at <strong style="color: #aaaaaa;">+20 101 144 4140</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #070707; border-top: 1px solid #1a1a1a; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #555555; letter-spacing: 1px; text-transform: uppercase;">
                © GR8NIK STUDIOS // ALL RIGHTS RESERVED // CAIRO, EGYPT
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [payload.toEmail],
      subject: `[HOLD CONFIRMATION] ${payload.service} — GR8NIK STUDIOS`,
      html: htmlContent,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error: error.message };
  }
}
