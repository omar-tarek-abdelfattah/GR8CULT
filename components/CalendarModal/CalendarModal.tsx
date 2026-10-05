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
import { useLanguage } from "@/context/LanguageContext";

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
  available?: boolean;
  isBooked?: boolean;
  reason?: "booked" | "past" | "available";
}

const AVAILABLE_SERVICES_EN = [
  "Recording Only (500 EGP / HR)",
  "Mix & Master Stems (40 - 50 USD / ~2,000 - 2,500 EGP)",
  "Rec + Mix + Master (2,000 EGP)",
  "Beat + Rec + Mix + Master (3,000 EGP)",
];

const AVAILABLE_SERVICES_AR = [
  "تسجيل بس (٥٠٠ جنيه / س)",
  "ميكس وماستر ستيمز (٤٠ - ٥٠ دولار / ~٢,٠٠٠ - ٢,٥٠٠ جنيه)",
  "تسجيل + ميكس + ماستر (٢,٠٠٠ جنيه)",
  "بيت + تسجيل + ميكس + ماستر (٣,٠٠٠ جنيه)",
];

export default function CalendarModal({
  isOpen,
  onClose,
  initialSession,
}: CalendarModalProps) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const availableServices = isAr ? AVAILABLE_SERVICES_AR : AVAILABLE_SERVICES_EN;

  // Date selection state
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Form details
  const [service, setService] = useState<string>(availableServices[1]);
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
        dayOfWeek: isAr
          ? d.toLocaleDateString("ar-EG", { weekday: "short" })
          : d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        dayNum: d.getDate(),
        monthStr: isAr
          ? d.toLocaleDateString("ar-EG", { month: "short" })
          : d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }

    return days;
  }, [isAr]);

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
        const matching = availableServices.find((s) =>
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
  }, [isOpen, initialSession, upcomingDays, fetchSlots, availableServices, selectedDate]);

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
    return dateObj.toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [selectedDate, isAr]);

  // Pre-filled WhatsApp message
  const whatsappUrl = useMemo(() => {
    const lines = isAr
      ? [
          "أهلاً GR8NIK Studios! حجزت ميعاد على الكالندر اللايف بتاعكم:",
          "",
          `• الباقة: ${service}`,
          selectedSlot
            ? `• اليوم والميعاد: ${formattedSelectedDate} الساعة ${selectedSlot.timeLabel}`
            : selectedDate
            ? `• اليوم: ${formattedSelectedDate}`
            : "",
          artistName.trim() ? `• اسم الفنان: ${artistName.trim()}` : "",
          artistEmail.trim() ? `• الإيميل: ${artistEmail.trim()}` : "",
          "",
          "حابب أحول العربون عن طريق فودافون كاش / إنستاباي لتثبيت الميعاد رسمي.",
        ].filter(Boolean)
      : [
          "Hey GR8NIK Studios! I just booked a slot on your live calendar scheduler:",
          "",
          `• Package: ${service}`,
          selectedSlot
            ? `• Date & Slot: ${formattedSelectedDate} at ${selectedSlot.timeLabel}`
            : selectedDate
            ? `• Date: ${formattedSelectedDate}`
            : "",
          artistName.trim() ? `• Artist / Client: ${artistName.trim()}` : "",
          artistEmail.trim() ? `• Email (Invite Sent): ${artistEmail.trim()}` : "",
          "",
          "I am ready to transfer the deposit via Vodafone Cash / InstaPay to lock my session!",
        ].filter(Boolean);

    return `https://wa.me/+201011444140?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [isAr, service, selectedDate, selectedSlot, formattedSelectedDate, artistName, artistEmail]);

  // Create hold on Google Calendar, send invite email to user, and open WhatsApp
  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;

    if (!isEmailValid) {
      setEmailError(
        isAr
          ? "من فضلك اكتب إيميل صحيح عشان تستلم دعوة الكالندر عليه."
          : "Please enter a valid email address to receive your calendar invite."
      );
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
      className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0c0c] border border-primary shadow-[0_0_60px_rgba(214,0,0,0.35)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black border-b border-secondary/60 shrink-0 text-start">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-space text-xs sm:text-sm text-primary tracking-[0.2em] uppercase font-bold block">
                  {isAr
                    ? "استوديو GR8NIK // الكالندر المباشر"
                    : "GR8NIK STUDIOS // LIVE CALENDAR"}
                </span>
              </div>
              <span className="font-space text-[11px] sm:text-xs text-muted tracking-wider uppercase block mt-0.5">
                {isAr
                  ? "اختار اليوم • حدد الميعاد • استلم دعوة الكالندر • أكد الحجز ع الواتساب"
                  : "SELECT DATE • CHOOSE SLOT • RECEIVE CALENDAR INVITE • LOCK ON WHATSAPP"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pricing"
              onClick={onClose}
              className="hidden sm:flex px-3.5 py-1.5 border border-secondary/50 bg-[#080808] hover:border-primary text-muted hover:text-white font-space text-xs uppercase tracking-wider transition-colors items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span>{isAr ? "شوف الباقات" : "VIEW PACKAGES"}</span>
            </Link>

            <button
              onClick={onClose}
              className="p-2 border border-secondary/50 bg-[#080808] hover:border-primary hover:bg-primary text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label={isAr ? "قفل النافذة" : "Close modal"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 text-start">
          {/* Booking Success Banner if already submitted */}
          {bookingSuccess && (
            <div className="p-4 sm:p-5 border border-emerald-500/60 bg-emerald-950/30 flex items-center justify-between gap-3 text-emerald-300 animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="font-space text-xs sm:text-sm">
                  <p className="font-bold uppercase tracking-wider text-white">
                    {isAr
                      ? `اتبعتت دعوة الكالندر لـ ${artistEmail}!`
                      : `CALENDAR INVITE SENT TO ${artistEmail.toUpperCase()}!`}
                  </p>
                  <p className="text-zinc-300 mt-1 leading-relaxed">
                    {isAr
                      ? "افتح إيميلك هتلاقي دعوة Google Calendar اتبعتتلك. حول العربون ع الواتساب عشان تثبت ميعادك رسمي."
                      : "Check your email inbox for the Google Calendar invite. Transfer your deposit on WhatsApp to officially confirm your slot."}
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 shrink-0"
              >
                <span>{isAr ? "افتح الواتساب" : "OPEN WHATSAPP"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* STEP 1: Date Strip */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-space text-xs sm:text-sm tracking-widest uppercase text-white font-bold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <span>
                  {isAr ? "الخطوة ١: اختر يوم السيشن" : "STEP 1: SELECT SESSION DATE"}
                </span>
              </span>
              <span className="font-space text-[11px] sm:text-xs text-zinc-400">
                {isAr ? "توقيت القاهرة" : "Cairo Time (Africa/Cairo)"}
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
                    className={`shrink-0 flex flex-col items-center justify-center min-w-[72px] sm:min-w-[86px] py-2.5 px-2 border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(214,0,0,0.6)] font-bold scale-[1.03]"
                        : "bg-black/60 border-secondary/60 text-zinc-300 hover:border-primary/70 hover:text-white"
                    }`}
                  >
                    <span className="font-space text-[11px] tracking-wider uppercase opacity-90 font-semibold">
                      {d.isToday
                        ? isAr
                          ? "النهارده"
                          : "TODAY"
                        : d.isTomorrow
                        ? isAr
                          ? "بكره"
                          : "TOMORROW"
                        : d.dayOfWeek}
                    </span>
                    <span className="font-bebas text-2xl sm:text-3xl tracking-wide my-0.5">
                      {d.dayNum}
                    </span>
                    <span className="font-space text-[10px] sm:text-[11px] tracking-widest uppercase opacity-75">
                      {d.monthStr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Slots Grid */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="font-space text-xs sm:text-sm tracking-widest uppercase text-white font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>
                  {isAr
                    ? `الخطوة ٢: المواعيد المتاحة ليوم ${formattedSelectedDate}`
                    : `STEP 2: AVAILABLE SLOTS FOR ${formattedSelectedDate.toUpperCase()}`}
                </span>
              </span>
              <div className="flex items-center gap-3 font-space text-[10px] sm:text-[11px]">
                <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>{isAr ? "متاح" : "OPEN"}</span>
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                  <span className="line-through decoration-red-500 decoration-1 text-zinc-400">
                    {isAr ? "محجوز" : "BOOKED"}
                  </span>
                </span>
                <span className="text-zinc-500 hidden sm:inline">
                  &bull; {isAr ? "أقل حجز: ساعتين" : "Min. 2h"}
                </span>
              </div>
            </div>

            {isLoadingSlots ? (
              <div className="py-12 border border-secondary/40 bg-black/40 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <span className="font-space text-xs sm:text-sm text-zinc-400 uppercase tracking-widest">
                  {isAr
                    ? "بيجيب المواعيد المتاحة من جوجل كالندر..."
                    : "QUERYING GOOGLE CALENDAR FREEBUSY SLOTS..."}
                </span>
              </div>
            ) : slotsError ? (
              <div className="p-5 border border-amber-500/40 bg-amber-950/20 flex items-start gap-3 text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="font-space text-xs sm:text-sm">
                  <p className="font-bold uppercase tracking-wider mb-1">
                    {isAr
                      ? "تنبيه أثناء مراجعة المواعيد:"
                      : "Notice checking availability:"}
                  </p>
                  <p className="text-zinc-300 leading-relaxed mb-2">{slotsError}</p>
                  <p className="text-zinc-400">
                    {isAr
                      ? "تقدر ترتب وتنسق ميعادك علطول ع الواتساب."
                      : "You can still coordinate your preferred time slot directly on WhatsApp."}
                  </p>
                </div>
              </div>
            ) : slots.length === 0 ? (
              <div className="py-10 border border-secondary/40 bg-black/50 text-center px-4">
                <p className="font-bebas text-2xl sm:text-3xl text-zinc-300 tracking-wider uppercase mb-1">
                  {isAr ? "مفيش مواعيد فاضية في اليوم ده" : "NO OPEN SLOTS ON THIS DATE"}
                </p>
                <p className="font-space text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-4">
                  {isAr
                    ? "جدول الاستوديو محجوز بالكامل في اليوم ده. اختار يوم تاني من الكالندر أو كلمنا ع الواتساب لو محتاج ميعاد ضروري."
                    : "The studio schedule is fully booked for this day. Please choose another date or message us on WhatsApp for emergency slots."}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-xs uppercase tracking-wider font-bold transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>
                    {isAr
                      ? "اسأل عن المواعيد المتاحة ع الواتساب"
                      : "ASK FOR CUSTOM AVAILABILITY ON WHATSAPP"}
                  </span>
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {slots.map((slot, sIdx) => {
                    const isSelected = selectedSlot?.start === slot.start;
                    const isBooked = slot.available === false || slot.isBooked === true;

                    return (
                      <button
                        key={sIdx}
                        type="button"
                        disabled={isBooked}
                        aria-disabled={isBooked}
                        onClick={() => {
                          if (!isBooked) {
                            setSelectedSlot(slot);
                          }
                        }}
                        title={
                          isBooked
                            ? "This slot is already booked and unavailable"
                            : `Select ${slot.timeLabel}`
                        }
                        className={`relative overflow-hidden p-3.5 border text-left flex flex-col justify-between transition-all select-none ${isBooked
                            ? "bg-[#090909] border-zinc-800/80 text-zinc-500 cursor-not-allowed opacity-65"
                            : isSelected
                              ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(214,0,0,0.5)] font-bold scale-[1.02] cursor-pointer"
                              : "bg-black/60 border-secondary/60 text-zinc-300 hover:border-primary hover:text-white cursor-pointer"
                          }`}
                      >
                        {/* Crossed red strike line overlay for booked slots */}
                        {isBooked && (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
                          >
                            <div className="w-[140%] h-[1.5px] bg-red-600/75 -rotate-[16deg] shadow-[0_0_6px_rgba(220,38,38,0.7)]" />
                          </div>
                        )}

                        <div className="flex items-center justify-between w-full mb-1 relative z-10">
                          <span
                            className={`font-space text-[11px] tracking-wider uppercase font-semibold ${isBooked ? "text-zinc-500" : "opacity-80"
                              }`}
                          >
                            {isAr ? `ميعاد ${sIdx + 1}` : `SLOT ${sIdx + 1}`}
                          </span>
                          {isBooked ? (
                            <span className="inline-flex items-center px-1.5 py-0.5 bg-red-950/80 border border-red-800/60 font-space text-[9px] text-red-400 font-bold uppercase tracking-wider">
                              {isAr ? "محجوز" : "BOOKED"}
                            </span>
                          ) : isSelected ? (
                            <CheckCircle className="w-3.5 h-3.5 text-white" />
                          ) : null}
                        </div>

                        <span
                          className={`font-space text-xs sm:text-sm font-bold tracking-tight relative z-10 ${isBooked
                              ? "line-through decoration-red-500 decoration-[1.5px] text-zinc-400"
                              : ""
                            }`}
                        >
                          {slot.timeLabel}
                        </span>

                        <span
                          className={`font-space text-[10px] sm:text-[11px] tracking-widest mt-1 relative z-10 ${isBooked ? "text-red-500/80 font-bold" : "opacity-75"
                            }`}
                        >
                          {isBooked
                            ? isAr
                              ? "محجوز // غير متاح"
                              : "BOOKED // UNAVAILABLE"
                            : isAr
                            ? `${slot.durationHours} ساعات`
                            : `${slot.durationHours} HOURS`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* If all slots for this date are booked, show an intuitive WhatsApp inquiry banner */}
                {slots.length > 0 && slots.every((s) => s.available === false || s.isBooked === true) && (
                  <div className="p-4 border border-zinc-800 bg-[#090909] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start mt-3">
                    <div>
                      <p className="font-bebas text-lg sm:text-xl text-zinc-300 tracking-wide uppercase">
                        {isAr
                          ? "كل مواعيد اليوم ده اتحجزت بالكامل"
                          : "ALL SLOTS FOR THIS DATE ARE FULLY BOOKED"}
                      </p>
                      <p className="font-space text-xs text-zinc-400 mt-0.5">
                        {isAr
                          ? "اختار يوم تاني من الخطوة ١، أو ابعتلنا ع الواتساب بخصوص سيشنات الطوارئ أو الأوقات التانية."
                          : "Pick another upcoming date from Step 1, or message us on WhatsApp for emergency or off-hours sessions."}
                      </p>
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-xs uppercase tracking-wider font-bold transition-all shrink-0 cursor-pointer"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span>{isAr ? "استفسر ع الواتساب" : "INQUIRE ON WHATSAPP"}</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 3: Session Details & Contact Input Form */}
          <div className="border-t border-secondary/50 pt-5">
            <span className="font-space text-xs sm:text-sm tracking-widest uppercase text-white font-bold flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>
                {isAr
                  ? "الخطوة ٣: باقة الخدمة وتأكيد الإيميل"
                  : "STEP 3: PACKAGE & EMAIL CONFIRMATION"}
              </span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Package Selector */}
              <div>
                <label className="font-space text-[10px] sm:text-[11px] text-muted tracking-widest uppercase block mb-1 font-semibold">
                  {isAr ? "باقة الخدمة" : "PACKAGE"}
                </label>
                <div className="relative flex items-center">
                  <Music2 className="w-4 h-4 text-primary absolute left-2.5 rtl:left-auto rtl:right-2.5 pointer-events-none" />
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-8 rtl:pl-2 rtl:pr-8 pr-2 py-3 bg-black border border-secondary/60 text-white font-space text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors"
                  >
                    {availableServices.map((s, idx) => (
                      <option key={idx} value={s} className="bg-black text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Artist Name */}
              <div>
                <label className="font-space text-[10px] sm:text-[11px] text-muted tracking-widest uppercase block mb-1 font-semibold">
                  {isAr ? "اسم الفنان / اسم الشهرة" : "ARTIST / CLIENT NAME"}
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-primary absolute left-2.5 rtl:left-auto rtl:right-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder={
                      isAr ? "اسمك الفني أو الشهرة" : "Your artist name or handle"
                    }
                    className="w-full pl-8 rtl:pl-3 rtl:pr-8 pr-3 py-3 bg-black border border-secondary/60 text-white placeholder:text-zinc-600 font-space text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* User Email Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-space text-[10px] sm:text-[11px] text-muted tracking-widest uppercase block font-semibold">
                    {isAr ? "الإيميل (الدعوة هتوصل هنا)" : "EMAIL (INVITE SENT HERE)"}
                  </label>
                  <span className="font-space text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-wider font-bold">
                    {isAr ? "* مطلوب" : "* REQUIRED"}
                  </span>
                </div>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-primary absolute left-2.5 rtl:left-auto rtl:right-2.5 pointer-events-none" />
                  <input
                    type="email"
                    value={artistEmail}
                    onChange={(e) => {
                      setArtistEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="e.g. artist@gmail.com"
                    className={`w-full pl-8 rtl:pl-3 rtl:pr-8 pr-3 py-3 bg-black border text-white placeholder:text-zinc-600 font-space text-xs sm:text-sm focus:outline-none transition-colors ${
                      emailError
                        ? "border-red-500 focus:border-red-500"
                        : "border-secondary/60 focus:border-primary"
                    }`}
                    required
                  />
                </div>
                {emailError ? (
                  <span className="font-space text-[10px] sm:text-[11px] text-red-400 block mt-1">
                    {emailError}
                  </span>
                ) : (
                  <span className="font-space text-[10px] sm:text-[11px] text-zinc-400 block mt-1">
                    {isAr
                      ? "جوجل كالندر هيبعتلك دعوة السيشن تلقائياً على إيميلك."
                      : "Google Calendar will automatically email your session invitation here."}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions & Confirmation Footer */}
        <div className="p-4 sm:p-5 bg-black border-t border-primary/50 shrink-0 text-start">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-space text-sm sm:text-base text-white font-bold">
                  {selectedSlot
                    ? `${formattedSelectedDate} • ${selectedSlot.timeLabel}`
                    : isAr
                    ? "لسه ما اخترتش ميعاد (دوس على ميعاد متاح فوق)"
                    : "No slot selected yet (Please click an open slot above)"}
                </span>
              </div>
              <span className="font-space text-xs text-zinc-400 block mt-0.5">
                {isAr
                  ? "دعوة جوجل كالندر هتوصل لإيميلك. حول العربون عن طريق فودافون كاش / إنستاباي لتثبيت الميعاد."
                  : "Google Calendar invite will be emailed to your inbox. Complete deposit via Vodafone Cash / InstaPay to lock slot."}
              </span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                disabled={isSubmitting || !selectedSlot || !isEmailValid}
                onClick={handleConfirmBooking}
                className={`w-full sm:w-auto px-6 py-3.5 font-space text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 font-bold transition-all ${
                  selectedSlot && isEmailValid
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                    : "bg-zinc-800 text-zinc-500 border border-secondary/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {isAr
                        ? "بيبعت دعوة الكالندر..."
                        : "SENDING CALENDAR INVITE..."}
                    </span>
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="w-4 h-4 text-white" />
                    <span>
                      {isAr
                        ? "أكّد الحجز واستلم الدعوة"
                        : "CONFIRM & GET EMAIL INVITE"}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180" />
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
