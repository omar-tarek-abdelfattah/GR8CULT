'use client';

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Calendar,
  Loader2,
  ArrowUpRight,
  Send,
  User,
  Music2,
  Clock,
  CheckCircle,
  Info,
  Moon,
  Sun,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { BookingSessionContext } from "./CalendarModalContext";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSession?: BookingSessionContext | null;
}

const AVAILABLE_SERVICES = [
  "Recording (500 EGP / HR)",
  "Mixing + Mastering / Professional Finish (1,500 EGP)",
  "Professional Execution (2,000 EGP)",
  "Custom Beat (3,000–5,000 EGP+)",
  "Beat + Track Bundle (5,000–7,000 EGP+)",
  "Full Project (6,000–8,000 EGP+)",
  "General Studio Session / Inquiries",
];

export default function CalendarModal({
  isOpen,
  onClose,
  initialSession,
}: CalendarModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [service, setService] = useState<string>(AVAILABLE_SERVICES[2]);
  const [slotTime, setSlotTime] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  const calendarEmbedUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3LvlOtrmBmmhsShjPRpw0gZjUH2IUfHPInqNnD0fEmuxQ2tAu28FSXvEE4AfdRtF6RpuQfr1z-?gv=true";

  // Sync initialSession when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);

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
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialSession]);

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

  // Build formatted WhatsApp message
  const whatsappUrl = useMemo(() => {
    const lines = [
      "Hey GR8NIK Studios! I just selected a time slot on the calendar:",
      "",
      `• Service: ${service}`,
    ];

    if (slotTime.trim()) {
      lines.push(`• Booked Slot: ${slotTime.trim()}`);
    } else {
      lines.push("• Booked Slot: (Selected in Google Calendar)");
    }

    if (artistName.trim()) {
      lines.push(`• Artist / Client: ${artistName.trim()}`);
    }

    lines.push(
      "",
      "I'm ready to pay the required deposit and lock my session into the calendar!"
    );

    const fullMessage = lines.join("\n");
    return `https://wa.me/+201011444140?text=${encodeURIComponent(fullMessage)}`;
  }, [service, slotTime, artistName]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Google Calendar Available Time Slots"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[94vh] max-h-[880px] bg-[#0c0c0c] border border-primary shadow-[0_0_50px_rgba(214,0,0,0.35)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black border-b border-secondary/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <div>
              <span className="font-space text-[10px] sm:text-xs text-primary tracking-[0.2em] uppercase font-bold block">
                GR8NIK STUDIOS // CALENDAR SLOTS
              </span>
              <span className="font-space text-[9px] sm:text-[10px] text-muted tracking-wider uppercase hidden sm:block">
                STEP 1: PICK SLOT &bull; STEP 2: CONFIRM TO WHATSAPP &bull; STEP 3: PAY DEPOSIT TO LOCK
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Link to Pricing */}
            <Link
              href="/pricing"
              onClick={onClose}
              className="p-1.5 sm:px-3 sm:py-1 border border-secondary/50 bg-[#080808] hover:border-primary text-muted hover:text-white font-space text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              title="View full service packages & rates breakdown"
            >
              <Info className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">VIEW PACKAGES</span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 sm:px-2.5 sm:py-1 border border-secondary/50 bg-[#080808] hover:border-primary text-muted hover:text-white font-space text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              title={
                isDarkMode
                  ? "Switch to standard Google light view"
                  : "Switch to dark view"
              }
            >
              {isDarkMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">DARK</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">LIGHT</span>
                </>
              )}
            </button>

            <a
              href={calendarEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:px-3 sm:py-1 border border-secondary/50 bg-[#080808] hover:border-primary text-muted hover:text-white font-space text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Open calendar in new window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">FULLSCREEN</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 border border-secondary/50 bg-[#080808] hover:border-primary hover:bg-primary text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close calendar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Iframe Container */}
        <div
          className={`relative flex-grow w-full overflow-hidden min-h-[300px] transition-colors duration-200 ${
            isDarkMode ? "bg-[#141414]" : "bg-white"
          }`}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center gap-3 z-10">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="font-space text-xs text-muted tracking-widest uppercase">
                LOADING GOOGLE CALENDAR SLOTS...
              </span>
            </div>
          )}

          <iframe
            src={calendarEmbedUrl}
            className="w-full h-full border-0 transition-all duration-300"
            style={
              isDarkMode
                ? {
                    filter:
                      "invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(90%)",
                    colorScheme: "dark",
                  }
                : {
                    colorScheme: "light",
                  }
            }
            title="GR8NIK STUDIOS Appointment Scheduling"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Session Details Transfer & Confirmation Drawer */}
        <div className="px-4 sm:px-6 py-4 bg-[#090909] border-t border-primary/50 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="font-space text-[10px] tracking-widest uppercase text-primary font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
              CONFIRM SESSION DETAILS TO WHATSAPP
            </span>
            <Link
              href="/pricing"
              onClick={onClose}
              className="font-space text-[10px] text-primary hover:text-white uppercase tracking-wider underline flex items-center gap-1 transition-colors"
            >
              <span>Explore Package Details &amp; Rates</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
            {/* Service selector */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="font-space text-[9px] text-muted tracking-widest uppercase block">
                  SERVICE
                </label>
                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="font-space text-[9px] text-zinc-400 hover:text-white uppercase tracking-wider underline flex items-center gap-0.5"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-primary" />
                </Link>
              </div>
              <div className="relative flex items-center">
                <Music2 className="w-3.5 h-3.5 text-primary absolute left-2.5 pointer-events-none" />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 bg-black border border-secondary/60 text-white font-space text-[11px] focus:border-primary focus:outline-none transition-colors"
                >
                  {AVAILABLE_SERVICES.map((s, idx) => (
                    <option key={idx} value={s} className="bg-black text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Booked Slot input */}
            <div>
              <label className="font-space text-[9px] text-muted tracking-widest uppercase block mb-1">
                SELECTED SLOT (DATE &amp; TIME)
              </label>
              <div className="relative flex items-center">
                <Clock className="w-3.5 h-3.5 text-primary absolute left-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  placeholder="e.g. Tuesday Oct 6 at 4:00 PM"
                  className="w-full pl-8 pr-3 py-2 bg-black border border-secondary/60 text-white placeholder:text-zinc-600 font-space text-[11px] focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Artist Name input */}
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
                  className="w-full pl-8 pr-3 py-2 bg-black border border-secondary/60 text-white placeholder:text-zinc-600 font-space text-[11px] focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <span className="font-space text-[10px] text-zinc-400">
              * Tap below to send details directly to our studio WhatsApp &amp; lock your deposit.
            </span>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary hover:bg-white text-white hover:text-black font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all font-bold shadow-[0_0_20px_rgba(214,0,0,0.4)] border border-primary hover:border-white cursor-pointer shrink-0"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-400" />
              <span>CONFIRM ON WHATSAPP &amp; PAY DEPOSIT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
