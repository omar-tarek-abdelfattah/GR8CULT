'use client';

import { Mic, Headphones, Sliders } from "lucide-react";
import { studioEquipments } from "./pricingData";

export default function EquipmentSection() {
  return (
    <section
      id="equipment"
      className="py-20 border-t border-secondary/60 bg-[#070707] scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
            HARDWARE &amp; ACOUSTICS
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
            STUDIO EQUIPMENT
          </h2>
          <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
            [ EQUIPPED FOR PROFESSIONAL RECORDING, PRODUCTION AND MIXING ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {studioEquipments.map((eq, i) => (
            <div
              key={i}
              className="border border-secondary/50 bg-[#0a0a0a] p-6 hover:border-primary/70 transition-colors"
            >
              <div className="font-space text-xs text-primary tracking-widest uppercase mb-4 font-bold flex items-center gap-2">
                {i === 0 && <Mic className="w-4 h-4 text-primary" />}
                {i === 1 && <Headphones className="w-4 h-4 text-primary" />}
                {i === 2 && <Sliders className="w-4 h-4 text-primary" />}
                <span>{eq.category}</span>
              </div>
              <ul className="space-y-3 font-space text-xs text-zinc-200">
                {eq.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center font-space text-xs text-muted max-w-2xl mx-auto uppercase tracking-wider">
          * Equipment selection depends on the artist, voice and specific
          requirements of the project.
        </p>
      </div>
    </section>
  );
}
