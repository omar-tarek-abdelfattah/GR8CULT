import { NextRequest, NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/googleCalendar";

// Studio working hours (Africa/Cairo)
// 12:00 PM (noon) to 12:00 AM (midnight)
const STUDIO_START_HOUR = 12;
const STUDIO_END_HOUR = 24;
const DEFAULT_SESSION_HOURS = 2; // Minimum booking is 2 hours

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // Expected: YYYY-MM-DD
    const durationParam = parseInt(
      searchParams.get("duration") || `${DEFAULT_SESSION_HOURS}`,
      10
    );
    const durationHours =
      isNaN(durationParam) || durationParam < 1 ? DEFAULT_SESSION_HOURS : durationParam;

    if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      return NextResponse.json(
        { error: "Valid date query parameter (YYYY-MM-DD) is required" },
        { status: 400 }
      );
    }

    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const calendar = getCalendarClient();

    // Query bounds for the given day in UTC (covering Cairo timezone)
    // Cairo is UTC+2 or UTC+3
    const dayStart = new Date(`${dateParam}T00:00:00Z`);
    const dayEnd = new Date(`${dateParam}T23:59:59Z`);
    dayStart.setHours(dayStart.getHours() - 4);
    dayEnd.setHours(dayEnd.getHours() + 4);

    let busyRanges: Array<{ start?: string | null; end?: string | null }> = [];

    try {
      const freeBusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: dayStart.toISOString(),
          timeMax: dayEnd.toISOString(),
          timeZone: "Africa/Cairo",
          items: [{ id: calendarId }],
        },
      });

      busyRanges = freeBusyRes.data.calendars?.[calendarId]?.busy || [];
    } catch (fbErr: any) {
      console.warn("FreeBusy query warning, falling back to empty busy list:", fbErr?.message || fbErr);
    }

    // Generate potential slots for the day
    const [year, month, day] = dateParam.split("-").map(Number);
    const now = new Date();
    const slots = [];

    for (let hour = STUDIO_START_HOUR; hour <= STUDIO_END_HOUR - durationHours; hour++) {
      // Build start and end dates in Cairo local time
      // We format with Cairo offset
      const startIso = `${dateParam}T${String(hour).padStart(2, "0")}:00:00+02:00`;
      const endHour = hour + durationHours;
      const endIso = `${dateParam}T${String(endHour).padStart(2, "0")}:00:00+02:00`;

      const slotStartDate = new Date(startIso);
      const slotEndDate = new Date(endIso);

      // Must be at least 1 hour in the future
      const minBookingLeadTime = new Date(now.getTime() + 60 * 60 * 1000);
      if (slotStartDate < minBookingLeadTime) {
        continue;
      }

      // Check overlap against busy ranges
      const isBusy = busyRanges.some((range) => {
        if (!range.start || !range.end) return false;
        const bStart = new Date(range.start).getTime();
        const bEnd = new Date(range.end).getTime();
        return slotStartDate.getTime() < bEnd && slotEndDate.getTime() > bStart;
      });

      if (!isBusy) {
        // Format human readable label (e.g. "2:00 PM – 4:00 PM")
        const formatTime = (d: Date) =>
          d.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Africa/Cairo",
          });

        slots.push({
          start: slotStartDate.toISOString(),
          end: slotEndDate.toISOString(),
          timeLabel: `${formatTime(slotStartDate)} - ${formatTime(slotEndDate)}`,
          date: dateParam,
          durationHours,
        });
      }
    }

    return NextResponse.json({
      date: dateParam,
      calendarId,
      timeZone: "Africa/Cairo",
      durationHours,
      slots,
    });
  } catch (error: any) {
    console.error("Error in calendar slots route:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to retrieve calendar slots",
      },
      { status: 500 }
    );
  }
}
