'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Calendar as CalendarIcon,
  Loader2,
  ArrowUpRight,
  User,
  Music2,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Sparkles,
  ShieldCheck,
  Send,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BookingSessionContext } from "./CalendarModalContext";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSession?: BookingSessionContext | null;
}

interface CalendarSlot {
  start: string;
  end: string;
  timeLabel: string;
  date: string;
  durationHours: number;
}

const AVAILABLE_SERVICES = [
  "Recording Only (500 EGP / HR)",
  "Rec + Mix + Master (2,000 EGP)",
  "Beat + Rec + Mix + Master (3,000 EGP)",
];

export default function CalendarModal({
  isOpen,
  onClose,
  initialSession,
}: CalendarModalProps) {
  // Date selection state
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Form details
  const [service, setService] = useState<string>(AVAILABLE_SERVICES[1]);
  const [artistName, setArtistName] = useState<string>("");
  const [artistEmail, setArtistEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(artistEmail.trim());
  }, [artistEmail]);

  // Generate the next 14 available days
  const upcomingDays = useMemo(() => {
    const days: Array<{
      dateStr: string;
      dayOfWeek: string;
      dayNum: number;
      monthStr: string;
      isToday: boolean;
      isTomorrow: boolean;
    }> = [];

    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      days.push({
        dateStr,
        dayOfWeek: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        dayNum: d.getDate(),
        monthStr: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }

    return days;
  }, []);

  // Fetch slots whenever selectedDate changes
  const fetchSlots = useCallback(async (date: string) => {
    setIsLoadingSlots(true);
    setSlotsError(null);
    setSelectedSlot(null);

    try {
      const res = await fetch(`/api/calendar/slots?date=${date}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load available slots");
      }

      setSlots(data.slots || []);
    } catch (err: any) {
      console.error("Error fetching slots:", err);
      setSlotsError(err.message || "Failed to load slots");
      setSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Sync initialSession and pick default date when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setBookingSuccess(false);
      setEmailError(null);

      if (initialSession?.serviceName) {
        const matching = AVAILABLE_SERVICES.find((s) =>
          s.toLowerCase().includes(initialSession.serviceName!.toLowerCase())
        );
        if (matching) {
          setService(matching);
        } else {
          setService(
            `${initialSession.serviceName}${
              initialSession.price ? ` (${initialSession.price})` : ""
            }`
          );
        }
      }

      // Default to tomorrow or today if not set
      if (!selectedDate && upcomingDays.length > 0) {
        const defaultDate = upcomingDays[1]?.dateStr || upcomingDays[0]?.dateStr;
        setSelectedDate(defaultDate);
        fetchSlots(defaultDate);
      } else if (selectedDate) {
        fetchSlots(selectedDate);
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialSession, upcomingDays, fetchSlots]);

  // Handle date click
  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    fetchSlots(dateStr);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Formatted date string for humans
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [selectedDate]);

  // Pre-filled WhatsApp message
  const whatsappUrl = useMemo(() => {
    const lines = [
      "Hey GR8NIK Studios! I just booked a slot on your live calendar scheduler:",
      "",
      `• Package: ${service}`,
    ];

    if (selectedSlot) {
      lines.push(`• Date & Slot: ${formattedSelectedDate} at ${selectedSlot.timeLabel}`);
    } else if (selectedDate) {
      lines.push(`• Date: ${formattedSelectedDate}`);
    }

    if (artistName.trim()) {
      lines.push(`• Artist / Client: ${artistName.trim()}`);
    }

    if (artistEmail.trim()) {
      lines.push(`• Email (Invite Sent): ${artistEmail.trim()}`);
    }

    lines.push(
      "",
      "I am ready to transfer the deposit via Vodafone Cash / InstaPay to lock my session!"
    );

    return `https://wa.me/+201011444140?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [service, selectedDate, selectedSlot, formattedSelectedDate, artistName, artistEmail]);

  // Create hold on Google Calendar, send invite email to user, and open WhatsApp
  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address to receive your calendar invite.");
      return;
    }

    setEmailError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          start: selectedSlot.start,
          end: selectedSlot.end,
          artistName: artistName || "Client",
          email: artistEmail.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to book calendar slot");
      }

      setBookingSuccess(true);

      // Open WhatsApp to complete deposit
      setTimeout(() => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 700);
    } catch (err: any) {
      console.warn("Could not insert calendar hold event, redirecting to WhatsApp:", err);
      // Still allow WhatsApp transfer if calendar API had an issue
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Google Calendar Live Time Slots"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0c0c] border border-primary shadow-[0_0_60px_rgba(214,0,0,0.35)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black border-b border-secondary/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-space text-xs text-primary tracking-[0.2em] uppercase font-bold block">
                  GR8NIK STUDIOS // LIVE CALENDAR
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 border border-primary/40 font-space text-[9px] text-zinc-300 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  GOOGLE API SYNC
                </span>
              </div>
              <span className="font-space text-[10px] text-muted tracking-wider uppercase block mt-0.5">
                SELECT DATE &bull; CHOOSE SLOT &bull; RECEIVE CALENDAR INVITE &bull; LOCK ON WHATSAPP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pricing"
              onClick={onClose}
              className="hidden sm:flex px-3 py-1.5 border border-secondary/50 bg-[#080808] hover:border-primary text-muted hover:text-white font-space text-[10px] uppercase tracking-wider transition-colors items-center gap-1.5 cursor-pointer"
            >
              <span>VIEW PACKAGES</span>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 border border-secondary/50 bg-[#080808] hover:border-primary hover:bg-primary text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Booking Success Banner if already submitted */}
          {bookingSuccess && (
            <div className="p-4 border border-emerald-500/60 bg-emerald-950/30 flex items-center justify-between gap-3 text-emerald-300 animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="font-space text-xs">
                  <p className="font-bold uppercase tracking-wider text-white">
                    CALENDAR INVITE SENT TO {artistEmail.toUpperCase()}!
                  </p>
                  <p className="text-zinc-300 mt-0.5">
                    Check your email inbox for the Google Calendar invite. Transfer your deposit on WhatsApp to officially confirm your slot.
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shrink-0"
              >
                <span>OPEN WHATSAPP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* STEP 1: Date Strip */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-space text-[11px] tracking-widest uppercase text-white font-bold flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                <span>STEP 1: SELECT SESSION DATE</span>
              </span>
              <span className="font-space text-[10px] text-zinc-400">
                Cairo Time (Africa/Cairo)
              </span>
            </div>

            {/* Horizontal scrollable date pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary">
              {upcomingDays.map((d) => {
                const isSelected = selectedDate === d.dateStr;

                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => handleSelectDate(d.dateStr)}
                    className={`shrink-0 flex flex-col items-center justify-center min-w-[70px] sm:min-w-[82px] py-2.5 px-2 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(214,0,0,0.6)] font-bold scale-[1.03]"
                        : "bg-black/60 border-secondary/60 text-zinc-300 hover:border-primary/70 hover:text-white"
                    }`}
                  >
                    <span className="font-space text-[10px] tracking-wider uppercase opacity-80">
                      {d.isToday ? "TODAY" : d.isTomorrow ? "TOMORROW" : d.dayOfWeek}
                    </span>
                    <span className="font-bebas text-2xl sm:text-3xl tracking-wide my-0.5">
                      {d.dayNum}
                    </span>
                    <span className="font-space text-[9px] tracking-widest uppercase opacity-70">
                      {d.monthStr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Slots Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-space text-[11px] tracking-widest uppercase text-white font-bold flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>STEP 2: AVAILABLE SLOTS FOR {formattedSelectedDate.toUpperCase()}</span>
              </span>
              <span className="font-space text-[10px] text-zinc-400">
                Min. 2-Hour Sessions
              </span>
            </div>

            {isLoadingSlots ? (
              <div className="py-12 border border-secondary/40 bg-black/40 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <span className="font-space text-xs text-zinc-400 uppercase tracking-widest">
                  QUERYING GOOGLE CALENDAR FREEBUSY SLOTS...
                </span>
              </div>
            ) : slotsError ? (
              <div className="p-5 border border-amber-500/40 bg-amber-950/20 flex items-start gap-3 text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="font-space text-xs">
                  <p className="font-bold uppercase tracking-wider mb-1">
                    Notice checking availability:
                  </p>
                  <p className="text-zinc-300 leading-relaxed mb-2">{slotsError}</p>
                  <p className="text-zinc-400">
                    You can still coordinate your preferred time slot directly on WhatsApp.
                  </p>
                </div>
              </div>
            ) : slots.length === 0 ? (
              <div className="py-10 border border-secondary/40 bg-black/50 text-center px-4">
                <p className="font-bebas text-2xl text-zinc-300 tracking-wider uppercase mb-1">
                  NO OPEN SLOTS ON THIS DATE
                </p>
                <p className="font-space text-xs text-zinc-400 max-w-md mx-auto mb-4">
                  The studio schedule is fully booked for this day. Please choose another date or message us on WhatsApp for emergency slots.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-[11px] uppercase tracking-wider font-bold transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>ASK FOR CUSTOM AVAILABILITY ON WHATSAPP</span>
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {slots.map((slot, sIdx) => {
                  const isSelected = selectedSlot?.start === slot.start;

                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(214,0,0,0.5)] font-bold scale-[1.02]"
                          : "bg-black/60 border-secondary/60 text-zinc-300 hover:border-primary hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-space text-[10px] tracking-wider uppercase opacity-75">
                          SLOT {sIdx + 1}
                        </span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="font-space text-xs font-bold tracking-tight">
                        {slot.timeLabel}
                      </span>
                      <span className="font-space text-[9px] opacity-70 tracking-widest mt-1">
                        {slot.durationHours} HOURS
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* STEP 3: Session Details & Contact Input Form */}
          <div className="border-t border-secondary/50 pt-5">
            <span className="font-space text-[11px] tracking-widest uppercase text-white font-bold flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>STEP 3: PACKAGE &amp; EMAIL CONFIRMATION</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Package Selector */}
              <div>
                <label className="font-space text-[9px] text-muted tracking-widest uppercase block mb-1">
                  PACKAGE
                </label>
                <div className="relative flex items-center">
                  <Music2 className="w-3.5 h-3.5 text-primary absolute left-2.5 pointer-events-none" />
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-8 pr-2 py-2.5 bg-black border border-secondary/60 text-white font-space text-[11px] focus:border-primary focus:outline-none transition-colors"
                  >
                    {AVAILABLE_SERVICES.map((s, idx) => (
                      <option key={idx} value={s} className="bg-black text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Artist Name */}
              <div>
                <label className="font-space text-[9px] text-muted tracking-widest uppercase block mb-1">
                  ARTIST / CLIENT NAME
                </label>
                <div className="relative flex items-center">
                  <User className="w-3.5 h-3.5 text-primary absolute left-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Your artist name or handle"
                    className="w-full pl-8 pr-3 py-2.5 bg-black border border-secondary/60 text-white placeholder:text-zinc-600 font-space text-[11px] focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* User Email Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-space text-[9px] text-muted tracking-widest uppercase block">
                    EMAIL (CALENDAR INVITE SENT HERE)
                  </label>
                  <span className="font-space text-[8px] text-emerald-400 uppercase tracking-wider font-bold">
                    * REQUIRED
                  </span>
                </div>
                <div className="relative flex items-center">
                  <Mail className="w-3.5 h-3.5 text-primary absolute left-2.5 pointer-events-none" />
                  <input
                    type="email"
                    value={artistEmail}
                    onChange={(e) => {
                      setArtistEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="e.g. artist@gmail.com"
                    className={`w-full pl-8 pr-3 py-2.5 bg-black border text-white placeholder:text-zinc-600 font-space text-[11px] focus:outline-none transition-colors ${
                      emailError
                        ? "border-red-500 focus:border-red-500"
                        : "border-secondary/60 focus:border-primary"
                    }`}
                    required
                  />
                </div>
                {emailError ? (
                  <span className="font-space text-[9px] text-red-400 block mt-1">
                    {emailError}
                  </span>
                ) : (
                  <span className="font-space text-[9px] text-zinc-400 block mt-1">
                    Google Calendar will automatically email your session invitation here.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions & Confirmation Footer */}
        <div className="p-4 sm:p-5 bg-black border-t border-primary/50 shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-space text-xs text-white font-bold">
                  {selectedSlot
                    ? `${formattedSelectedDate} • ${selectedSlot.timeLabel}`
                    : "No slot selected yet (Please click an open slot above)"}
                </span>
              </div>
              <span className="font-space text-[10px] text-zinc-400 block mt-0.5">
                Google Calendar invite will be emailed to your inbox. Complete deposit via Vodafone Cash / InstaPay to lock slot.
              </span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                disabled={isSubmitting || !selectedSlot || !isEmailValid}
                onClick={handleConfirmBooking}
                className={`w-full sm:w-auto px-6 py-3 font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-bold transition-all ${
                  selectedSlot && isEmailValid
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                    : "bg-zinc-800 text-zinc-500 border border-secondary/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SENDING CALENDAR INVITE...</span>
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="w-4 h-4 text-white" />
                    <span>CONFIRM &amp; GET EMAIL INVITE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
