import { NextRequest, NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/googleCalendar";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, start, end, artistName, email, phone, notes } = body;

    if (!start || !end) {
      return NextResponse.json(
        { error: "Start and end times are required" },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const calendar = getCalendarClient();

    const titleService = service || "Studio Session";
    const clientName = artistName ? artistName.trim() : "Artist Client";
    const userEmail = email.trim();

    // 1. Insert Hold event onto the Studio Google Calendar
    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `[HOLD] ${titleService} — ${clientName} (${userEmail})`,
        description: [
          `GR8NIK STUDIOS // SESSION BOOKING CONFIRMATION`,
          ``,
          `• Package: ${titleService}`,
          `• Artist / Client: ${clientName}`,
          `• Client Email: ${userEmail}`,
          phone ? `• Phone: ${phone}` : null,
          notes ? `• Session Notes: ${notes}` : null,
          ``,
          `----------------------------------------------------`,
          `DEPOSIT REQUIRED TO LOCK YOUR SESSION:`,
          `To lock this slot on the studio calendar, please transfer the deposit via Vodafone Cash or InstaPay (+201011444140).`,
          `Unconfirmed holds will be released if deposit is not received within 12 hours.`,
          `----------------------------------------------------`,
          `Studio Address: Mokattam, Cairo, Egypt`,
          `WhatsApp Direct: +201011444140`,
        ]
          .filter(Boolean)
          .join("\n"),
        start: {
          dateTime: start,
          timeZone: "Africa/Cairo",
        },
        end: {
          dateTime: end,
          timeZone: "Africa/Cairo",
        },
        colorId: "11", // Bold Red in Google Calendar
      },
    });

    // 2. Dispatch custom branded dark-mode confirmation email to user via Resend
    let emailStatus: { success: boolean; error?: string; reason?: string } = {
      success: false,
    };

    try {
      emailStatus = await sendBookingConfirmationEmail({
        toEmail: userEmail,
        artistName: clientName,
        service: titleService,
        startTime: start,
        endTime: end,
      });
    } catch (eErr: any) {
      console.warn("Email dispatch warning:", eErr?.message || eErr);
      emailStatus = { success: false, error: eErr?.message };
    }

    return NextResponse.json({
      success: true,
      eventId: event.data.id,
      htmlLink: event.data.htmlLink,
      clientEmail: userEmail,
      emailSent: emailStatus.success,
      emailInfo: emailStatus,
    });
  } catch (error: any) {
    console.error("Error creating Google Calendar event:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to book calendar slot",
      },
      { status: 500 }
    );
  }
}
