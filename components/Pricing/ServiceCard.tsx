'use client';

import { CheckCircle2, Flame, ArrowUpRight, Calendar } from "lucide-react";
import { ServiceItem } from "./types";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";

interface ServiceCardProps {
  item: ServiceItem;
}

export default function ServiceCard({ item }: ServiceCardProps) {
  const { openCalendar } = useCalendarModal();

  return (
    <div
      id={item.id}
      className={`relative flex flex-col justify-between transition-all duration-300 bg-[#090909] border ${
        item.isFeatured
          ? "border-primary shadow-[0_0_35px_rgba(214,0,0,0.25)] bg-gradient-to-b from-[#160202] via-[#0a0a0a] to-[#050505] ring-1 ring-primary/60 md:scale-[1.02]"
          : "border-secondary/60 hover:border-primary/60 shadow-lg"
      }`}
    >
      {/* Badge */}
      {item.badge && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap font-space text-[10px] tracking-[0.2em] uppercase px-4 py-1 flex items-center gap-1.5 font-bold ${
            item.isFeatured
              ? "bg-primary text-white shadow-[0_0_15px_#D60000]"
              : "bg-secondary text-white border border-primary/40"
          }`}
        >
          {item.badge}
        </div>
      )}

      {/* Header */}
      <div className="p-6 sm:p-7 border-b border-secondary/50">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-space text-xs tracking-[0.25em] text-primary font-bold">
            {item.number} — {item.title}
          </span>
          {item.isFeatured && (
            <Flame className="w-4 h-4 text-primary animate-pulse" />
          )}
        </div>

        <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide m-0 leading-tight">
          {item.subtitle}
        </h3>

        <div className="mt-4 flex flex-wrap items-baseline gap-2.5">
          <span className="font-bebas text-3xl text-primary tracking-wider">
            {item.price}
          </span>
          {item.oldPrice && (
            <span className="font-space text-xs text-muted line-through tracking-wider">
              {item.oldPrice} EGP
            </span>
          )}
        </div>

        {item.priceNote && (
          <div className="mt-2 py-1 px-2.5 bg-black/60 border border-secondary/40 font-space text-[10px] text-zinc-300 tracking-wider inline-block">
            {item.priceNote}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex-grow space-y-6">
        {/* You bring / We handle callout if present */}
        {(item.youBring || item.weHandle) && (
          <div className="p-3.5 bg-black/70 border border-secondary/50 font-space text-[11px] space-y-2">
            {item.youBring && (
              <div>
                <span className="text-primary font-bold uppercase tracking-wider block">
                  YOU BRING:
                </span>
                <span className="text-zinc-200">{item.youBring}</span>
              </div>
            )}
            {item.weHandle && (
              <div>
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                  WE HANDLE:
                </span>
                <span className="text-zinc-200">{item.weHandle}</span>
              </div>
            )}
          </div>
        )}

        {/* Includes List */}
        <div>
          <div className="font-space text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>INCLUDES:</span>
          </div>
          <ul className="space-y-2.5 font-space text-xs text-zinc-200">
            {item.includes.map((inc, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                <span className="leading-snug">{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notes Callouts */}
        {item.notes && item.notes.length > 0 && (
          <div className="border-t border-secondary/40 pt-4 space-y-2">
            {item.notes.map((note, nIdx) => (
              <p
                key={nIdx}
                className={`font-space text-[11px] leading-relaxed ${
                  note.includes("DOES NOT INCLUDE") ||
                  note.includes("Additional") ||
                  note.includes("scope")
                    ? "text-amber-400/90"
                    : "text-zinc-400"
                }`}
              >
                • {note}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="p-6 sm:p-7 pt-0">
        <button
          type="button"
          onClick={() =>
            openCalendar({ serviceName: item.title, price: item.price })
          }
          className={`w-full py-3.5 px-5 font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer ${
            item.isFeatured
              ? "bg-primary hover:bg-white text-white hover:text-black shadow-[0_0_20px_rgba(214,0,0,0.5)] border border-primary hover:border-white font-bold"
              : "border border-secondary/80 hover:border-primary bg-black hover:bg-primary text-zinc-200 hover:text-white font-bold"
          }`}
        >
          <Calendar className="w-4 h-4 text-primary group-hover:text-current transition-colors" />
          <span>CHOOSE AVAILABLE TIME SLOT</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}
