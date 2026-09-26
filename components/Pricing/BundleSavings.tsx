'use client';

import { Check, ArrowUpRight, Calendar } from "lucide-react";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";

export default function BundleSavings() {
  const { openCalendar } = useCalendarModal();

  return (
    <section
      id="bundles-savings"
      className="py-16 border-t border-secondary/60 bg-[#070707] scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
            PROJECT VALUE &amp; TRANSPARENCY
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
            INDIVIDUAL VS BUNDLE
          </h2>
          <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
            [ SAVE MORE WHEN COMBINING PRODUCTION + TRACKING + FINISH ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Option A: Individually */}
          <div className="border border-secondary/50 bg-[#0a0a0a] p-8 flex flex-col justify-between">
            <div>
              <div className="font-space text-xs text-muted uppercase tracking-[0.2em] mb-2">
                OPTION A
              </div>
              <h3 className="font-bebas text-3xl text-white tracking-wide uppercase mb-6">
                BOOKING INDIVIDUALLY
              </h3>

              <div className="space-y-4 font-space text-xs">
                <div className="flex justify-between items-center py-2.5 border-b border-secondary/30">
                  <span className="text-zinc-300">Custom Beat:</span>
                  <span className="text-white font-bold">3,000–5,000 EGP+</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-secondary/30">
                  <span className="text-zinc-300">Recording (Min. 2 Hours):</span>
                  <span className="text-white font-bold">1,000 EGP (500 EGP/hr)</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-secondary/30">
                  <span className="text-zinc-300">Mix + Master:</span>
                  <span className="text-white font-bold">1,500 EGP</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-black/60 border border-secondary/50 font-space">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                  TOTAL SEPARATE COST:
                </span>
                <div className="font-bebas text-3xl sm:text-4xl text-white tracking-wider">
                  5,500–7,500 EGP+
                </div>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  A typical custom-beat track booked individually can reach 5,500–7,500 EGP+ depending on recording time and production scope.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-secondary/30 font-space text-xs text-muted">
              Best if you already have certain stages complete or want to take things one step at a time.
            </div>
          </div>

          {/* Option B: The Bundle */}
          <div className="border border-primary bg-gradient-to-b from-[#180303] via-[#0c0c0c] to-[#080808] p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(214,0,0,0.2)]">
            <div>
              <div className="inline-block px-2.5 py-1 bg-primary text-white font-space text-[10px] tracking-widest uppercase mb-2 font-bold">
                RECOMMENDED PROJECT RATE
              </div>
              <h3 className="font-bebas text-3xl text-white tracking-wide uppercase mb-6">
                BOOKING THE BUNDLE
              </h3>

              <p className="font-space text-xs sm:text-sm text-zinc-200 leading-relaxed mb-6">
                The <span className="text-white font-bold">Beat + Track Bundle</span> combines the production, recording and finishing stages under one unified project price:
              </p>

              <div className="p-5 bg-black/80 border border-primary/60 font-space text-center mb-6">
                <span className="text-[11px] text-primary uppercase tracking-widest font-bold block mb-1">
                  ALL-IN-ONE BUNDLE RATE
                </span>
                <div className="font-bebas text-4xl sm:text-5xl text-white tracking-wider">
                  5,000–7,000 EGP+
                </div>
                <span className="text-[11px] text-emerald-400 tracking-wider uppercase mt-1 block">
                  Better Overall Project Rate
                </span>
              </div>

              <ul className="space-y-3 font-space text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>The bundle gives the artist a better overall project rate while keeping individual service values clear.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>One coherent sonic direction from the initial kick drum to the final stereo limiter.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Includes 1 Free Mix Revision &amp; full rough mix listening stage.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/30">
              <button
                type="button"
                onClick={() =>
                  openCalendar({
                    serviceName: "Beat + Track Bundle",
                    price: "5,000–7,000 EGP+",
                  })
                }
                className="w-full py-3.5 px-6 bg-primary text-white font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all font-bold shadow-[0_0_20px_rgba(214,0,0,0.4)] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>CHOOSE BUNDLE TIME SLOT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
