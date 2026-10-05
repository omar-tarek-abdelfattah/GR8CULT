'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, Calendar, ArrowUpRight, Flame, Layers, PackageCheck, AlertCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ServiceItem, Currency } from "./types";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";
import { WHATSAPP_PHONE_NUMBER, getServicePricing } from "./pricingData";
import { usePricingCurrency } from "./PricingCurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceDetailsModalProps {
  item: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  currency?: Currency;
}

export default function ServiceDetailsModal({
  item,
  isOpen,
  onClose,
  currency: propCurrency,
}: ServiceDetailsModalProps) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [mounted, setMounted] = useState(false);
  const { openCalendar } = useCalendarModal();
  const { currency: contextCurrency } = usePricingCurrency();
  const activeCurrency = propCurrency || contextCurrency || "EGP";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item || !mounted) return null;

  const pricing = getServicePricing(item, activeCurrency);

  const handleBookSession = () => {
    onClose();
    openCalendar({
      serviceName: item.title,
      price: pricing.equivalent ? `${pricing.price} (${pricing.equivalent})` : pricing.price,
    });
  };

  const currentWhatsappMessage =
    activeCurrency === "USD" && item.whatsappMessageUsd
      ? item.whatsappMessageUsd
      : item.whatsappMessage;

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE_NUMBER.replace(/\+/g, "")}?text=${encodeURIComponent(
    currentWhatsappMessage
  )}`;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0b0b0b] border border-primary/50 shadow-[0_0_60px_rgba(214,0,0,0.35)] text-white flex flex-col max-h-[92vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-red-500 to-primary/40" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-secondary/60 bg-[#0d0d0d] relative text-start">
          <button
            onClick={onClose}
            aria-label={isAr ? "قفل النافذة" : "Close modal"}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-space text-xs tracking-[0.25em] text-primary font-bold">
              {item.number} — {isAr ? "تفاصيل الباقة" : "PACKAGE DETAILS"}
            </span>
            {item.badge && (
              <span className="px-2.5 py-0.5 bg-primary/20 border border-primary/50 text-white font-space text-[11px] font-bold uppercase tracking-wider">
                {item.badge}
              </span>
            )}
            {item.whatItOffers && (
              <span className="px-2.5 py-0.5 bg-black border border-secondary/60 text-emerald-400 font-space text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <PackageCheck className="w-3 h-3" />
                {item.whatItOffers}
              </span>
            )}
            {item.isFeatured && (
              <span className="inline-flex items-center gap-1 text-primary text-xs font-space font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse" /> {isAr ? "الأكثر طلباً" : "FEATURED"}
              </span>
            )}
          </div>

          <h2
            id="service-modal-title"
            className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase m-0 leading-tight"
          >
            {item.title}
          </h2>
          <p className="font-space text-xs sm:text-sm text-zinc-400 uppercase tracking-widest mt-1">
            {item.subtitle}
          </p>

          {/* Pricing bar */}
          <div className="mt-4 pt-3 border-t border-secondary/40 flex flex-wrap items-center gap-3">
            <span className="font-bebas text-3xl sm:text-4xl text-primary tracking-wider">
              {pricing.price}
            </span>
            {pricing.equivalent && (
              <span className="py-1 px-2.5 bg-black/80 border border-secondary/60 font-space text-xs text-zinc-200 tracking-wider font-semibold">
                {pricing.equivalent}
              </span>
            )}
            {pricing.oldPrice && (
              <span className="font-space text-sm text-muted line-through tracking-wider">
                {pricing.oldPrice}
              </span>
            )}
            {pricing.priceNote && (
              <span className="py-1 px-2.5 bg-black/80 border border-secondary/60 font-space text-xs text-zinc-200 tracking-wider">
                {pricing.priceNote}
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow custom-scrollbar text-start">
          {/* Summary / Description */}
          {item.shortDescription && (
            <div className="p-3.5 bg-black/60 border border-secondary/50 font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {item.shortDescription}
            </div>
          )}

          {/* You bring / We handle callouts */}
          {(item.youBring || item.weHandle) && (
            <div className="p-4 bg-black/80 border border-secondary/60 font-space text-xs sm:text-sm space-y-3">
              {item.youBring && (
                <div>
                  <span className="text-primary font-bold uppercase tracking-wider block mb-1">
                    {isAr ? "عليك أنت:" : "YOU BRING:"}
                  </span>
                  <span className="text-zinc-200">{item.youBring}</span>
                </div>
              )}
              {item.weHandle && (
                <div>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                    {isAr ? "إحنا بنتولى:" : "WE HANDLE:"}
                  </span>
                  <span className="text-zinc-200">{item.weHandle}</span>
                </div>
              )}
            </div>
          )}

          {/* Full Includes Checklist */}
          <div>
            <div className="font-space text-xs tracking-[0.2em] text-zinc-300 uppercase mb-3.5 flex items-center gap-2 font-bold border-b border-secondary/40 pb-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>
                {isAr
                  ? "الباقة دي بتشمل إيه بالظبط:"
                  : "WHAT THIS TIER FULLY INCLUDES:"}
              </span>
            </div>
            <ul className="space-y-2.5 font-space text-xs sm:text-[13px] text-zinc-200">
              {item.includes.map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-primary shrink-0" />
                  <span className="leading-relaxed">{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes & Scope */}
          {item.notes && item.notes.length > 0 && (
            <div className="border-t border-secondary/40 pt-4 space-y-2">
              <span className="font-space text-xs tracking-[0.2em] text-zinc-400 uppercase block font-bold mb-2">
                {isAr ? "ملاحظات وتعليمات:" : "NOTES & GUIDELINES:"}
              </span>
              {item.notes.map((note, nIdx) => (
                <p
                  key={nIdx}
                  className={`font-space text-xs leading-relaxed ${
                    note.includes("DOES NOT INCLUDE") ||
                    note.includes("Additional") ||
                    note.includes("scope") ||
                    note.includes("مش داخلين") ||
                    note.includes("زيادة")
                      ? "text-amber-400/90 font-medium"
                      : "text-zinc-400"
                  }`}
                >
                  • {note}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-secondary/60 bg-[#0d0d0d] flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleBookSession}
            className="w-full sm:flex-1 py-3.5 px-4 bg-primary hover:bg-white text-white hover:text-black font-space text-xs sm:text-[13px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(214,0,0,0.4)] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>
              {isAr ? "اختر الميعاد واحجز" : "CHOOSE TIME SLOT & BOOK"}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3.5 px-5 border border-emerald-500/60 hover:border-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white font-space text-xs sm:text-[13px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? "كلمنا ع الواتساب" : "CHAT ON WHATSAPP"}</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
