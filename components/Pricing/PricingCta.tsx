'use client';

import { Sparkles, ArrowUpRight, Calendar } from "lucide-react";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";

export default function PricingCta() {
  const { openCalendar } = useCalendarModal();

  return (
    <section className="py-20 border-t border-primary/50 bg-gradient-to-b from-[#180202] via-[#090909] to-[#050505]">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/20 text-primary font-space text-[10px] tracking-[0.25em] uppercase mb-6 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SESSION INITIATION // CLAIMS &amp; RATES</span>
        </div>

        <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none mb-4">
          READY TO BUILD <span className="text-primary">YOUR RECORD?</span>
        </h2>

        <p className="font-space text-sm sm:text-base text-zinc-200 uppercase tracking-widest max-w-2xl mx-auto mb-2 font-medium">
          FROM A READY-MADE BEAT TO A COMPLETE ORIGINAL RECORD.
        </p>
        <p className="font-space text-xs text-muted uppercase tracking-[0.2em] max-w-xl mx-auto mb-10">
          Choose exactly what your project needs.
        </p>

        {/* Quick Rates Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 text-center font-space">
          <div className="border border-secondary/40 bg-black/60 p-3">
            <span className="text-[10px] text-zinc-400 block uppercase">
              RECORD
            </span>
            <span className="text-xs font-bold text-white">500 EGP / HR</span>
          </div>
          <div className="border border-secondary/40 bg-black/60 p-3">
            <span className="text-[10px] text-zinc-400 block uppercase">
              MIX + MASTER
            </span>
            <span className="text-xs font-bold text-white">1,500 EGP</span>
          </div>
          <div className="border border-secondary/40 bg-black/60 p-3">
            <span className="text-[10px] text-zinc-400 block uppercase">
              EXECUTION
            </span>
            <span className="text-xs font-bold text-white">2,000 EGP</span>
          </div>
          <div className="border border-secondary/40 bg-black/60 p-3">
            <span className="text-[10px] text-zinc-400 block uppercase">
              CUSTOM BEAT
            </span>
            <span className="text-xs font-bold text-white">3,000–5,000+</span>
          </div>
          <div className="border border-primary/50 bg-primary/10 p-3">
            <span className="text-[10px] text-primary block uppercase font-bold">
              BUNDLE
            </span>
            <span className="text-xs font-bold text-white">5,000–7,000+</span>
          </div>
          <div className="border border-primary/50 bg-primary/10 p-3">
            <span className="text-[10px] text-primary block uppercase font-bold">
              FULL PROJECT
            </span>
            <span className="text-xs font-bold text-white">6,000–8,000+</span>
          </div>
        </div>

        <div className="p-4 bg-black/80 border border-secondary/50 font-space text-xs text-zinc-300 max-w-2xl mx-auto mb-8">
          <span className="text-white font-bold uppercase tracking-wider block mb-1">
            Select your service → Choose your slot on the calendar → Pay your deposit → Your session is locked.
          </span>
          <span className="text-primary font-bold tracking-widest uppercase text-[11px]">
            NO DEPOSIT = NO BOOKING.
          </span>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={openCalendar}
            className="w-full sm:w-auto bg-primary text-white font-space text-xs uppercase tracking-widest px-10 py-5 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(214,0,0,0.4)] border border-primary font-bold cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>CHOOSE AVAILABLE TIME SLOT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
