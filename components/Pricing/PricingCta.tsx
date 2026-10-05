'use client';

import { Sparkles, ArrowUpRight, Calendar } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";
import { CUSTOM_BOOKING_WHATSAPP_URL } from "./pricingData";
import { CUSTOM_BOOKING_WHATSAPP_URL_AR } from "./pricingDataAr";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingCta() {
  const { openCalendar } = useCalendarModal();
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const customBookingUrl = isAr
    ? CUSTOM_BOOKING_WHATSAPP_URL_AR
    : CUSTOM_BOOKING_WHATSAPP_URL;

  return (
    <section className="py-20 border-t border-primary/50 bg-gradient-to-b from-[#180202] via-[#090909] to-[#050505]">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/20 text-primary font-space text-[10px] tracking-[0.25em] uppercase mb-6 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isAr
              ? "حجز سيشن // الأسعار والباقات"
              : "SESSION INITIATION // CLAIMS & RATES"}
          </span>
        </div>

        <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none mb-4">
          {isAr ? (
            <>
              جاهز تبني <span className="text-primary">تراكك صح؟</span>
            </>
          ) : (
            <>
              READY TO BUILD <span className="text-primary">YOUR RECORD?</span>
            </>
          )}
        </h2>

        <p className="font-space text-sm sm:text-base text-zinc-200 uppercase tracking-widest max-w-2xl mx-auto mb-2 font-medium">
          {isAr
            ? "٣ باقات أساسية + مشاريع مخصصة وحجز أونلاين."
            : "3 STREAMLINED PACKAGES + CUSTOM & ONLINE BOOKINGS."}
        </p>
        <p className="font-space text-xs text-muted uppercase tracking-[0.2em] max-w-xl mx-auto mb-10">
          {isAr
            ? "احجز ميعادك في الاستوديو ع الكالندر أو رتب معانا علطول ع الواتساب."
            : "Book your studio time slot or coordinate directly on WhatsApp."}
        </p>

        {/* Quick Rates Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 text-center font-space">
          <div className="border border-secondary/40 bg-black/60 p-4">
            <span className="text-[10px] text-zinc-400 block uppercase mb-1">
              {isAr ? "٠١ تسجيل بس" : "01 RECORDING ONLY"}
            </span>
            <span className="text-sm font-bold text-white block">
              {isAr ? "٥٠٠ جنيه / س" : "500 EGP / HR"}
            </span>
            <span className="text-[9px] text-zinc-400">
              {isAr ? "أقل حجز ساعتين" : "Min 2 Hours Booking"}
            </span>
          </div>

          <div className="border border-secondary/40 bg-black/60 p-4">
            <span className="text-[10px] text-zinc-400 block uppercase mb-1">
              {isAr ? "٠٢ تسجيل + ميكس + ماستر" : "02 REC + MIX + MASTER"}
            </span>
            <span className="text-sm font-bold text-white block">
              {isAr ? "٢,٠٠٠ جنيه" : "2,000 EGP"}
            </span>
            <span className="text-[9px] text-emerald-400 line-through mr-1 opacity-70">
              {isAr ? "٤,٠٠٠ جنيه" : "4,000 EGP"}
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">
              {isAr ? "خصم ٥٠٪" : "50% OFF"}
            </span>
          </div>

          <div className="border border-primary/60 bg-primary/10 p-4">
            <span className="text-[10px] text-primary block uppercase mb-1 font-bold">
              {isAr ? "٠٣ بيت + تسجيل + ميكس + ماستر" : "03 BEAT + REC + MIX + MASTER"}
            </span>
            <span className="text-sm font-bold text-white block">
              {isAr ? "٣,٠٠٠ جنيه" : "3,000 EGP"}
            </span>
            <span className="text-[9px] text-emerald-400 line-through mr-1 opacity-70">
              {isAr ? "٦,٠٠٠ جنيه" : "6,000 EGP"}
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">
              {isAr ? "وفر ٣,٠٠٠ جنيه" : "SAVE 3,000 EGP"}
            </span>
          </div>

          <div className="border border-emerald-500/40 bg-emerald-950/20 p-4">
            <span className="text-[10px] text-emerald-400 block uppercase mb-1 font-bold">
              {isAr ? "مشروع مخصص / أونلاين" : "CUSTOM / ONLINE"}
            </span>
            <span className="text-sm font-bold text-white block">
              {isAr ? "شات واتساب" : "WHATSAPP CHAT"}
            </span>
            <span className="text-[9px] text-zinc-400">
              {isAr ? "ألبوم / EP / سيشن أونلاين" : "EP / Album / Online Session"}
            </span>
          </div>
        </div>

        <div className="p-4 bg-black/80 border border-secondary/50 font-space text-xs text-zinc-300 max-w-2xl mx-auto mb-8">
          <span className="text-white font-bold uppercase tracking-wider block mb-1">
            {isAr
              ? "اختار باقتك ← اختر ميعادك ع الكالندر أو كلمنا ع الواتساب ← حول العربون ← سيشنك اتثبت رسمي."
              : "Pick your package → Choose your calendar slot OR chat on WhatsApp → Pay deposit → Session locked."}
          </span>
          <span className="text-primary font-bold tracking-widest uppercase text-[11px]">
            {isAr ? "مفيش عربون = مفيش حجز." : "NO DEPOSIT = NO BOOKING."}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openCalendar}
            className="w-full sm:w-auto bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-4.5 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(214,0,0,0.4)] border border-primary font-bold cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>
              {isAr ? "اختر الميعاد المناسب واحجز" : "CHOOSE AVAILABLE TIME SLOT"}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={customBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-space text-xs uppercase tracking-widest px-8 py-4.5 transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(16,185,129,0.3)] border border-emerald-400/50 font-bold cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-white" />
            <span>
              {isAr ? "كلمنا ع الواتساب للتفاصيل" : "CUSTOM / ONLINE ON WHATSAPP"}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
