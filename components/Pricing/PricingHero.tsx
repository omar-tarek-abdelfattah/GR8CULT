'use client';

import { Sparkles } from "lucide-react";

export default function PricingHero() {
  return (
    <section className="border-b border-secondary/60 pt-20 pb-16 relative overflow-hidden bg-gradient-to-b from-[#140202] via-[#080808] to-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-primary/50 bg-primary/10 text-primary font-space text-[11px] tracking-[0.25em] uppercase mb-6 shadow-[0_0_15px_rgba(214,0,0,0.25)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>GR8NIK STUDIOS // SERVICES / PRICING / PROCESS / FAQ</span>
        </div>

        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase text-white mb-6 leading-none">
          BUILD THE SOUND. <br className="hidden sm:inline" />
          <span className="text-primary">FINISH THE RECORD.</span>
        </h1>

        <p className="font-space text-sm sm:text-base text-zinc-200 max-w-3xl mx-auto leading-relaxed mb-4">
          GR8NIK STUDIOS is built for artists who want their music developed,
          recorded and finished with one clear creative direction.
        </p>

        <p className="font-space text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Book exactly what you need — from a single recording session to a
          complete track built from scratch. Every service is available
          individually, while bundles combine multiple services at a better project rate.
        </p>

        {/* Quick Anchor Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-space text-[11px] uppercase tracking-wider text-muted">
          <a
            href="#services"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 01 Services &amp; Rates ]
          </a>
          <a
            href="#bundles-savings"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 02 Bundle Savings ]
          </a>
          <a
            href="#guide"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 03 Which Service Do I Need? ]
          </a>
          <a
            href="#comparison"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 04 Matrix ]
          </a>
          <a
            href="#process"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 05 Process ]
          </a>
          <a
            href="#policies"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 06 Policies ]
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
          >
            [ 07 FAQ ]
          </a>
        </div>
      </div>
    </section>
  );
}
