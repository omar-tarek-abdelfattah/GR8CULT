'use client';

import { processSteps } from "./pricingData";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 border-t border-secondary/60 bg-background scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <span className="font-space text-xs sm:text-sm text-primary tracking-[0.25em] uppercase block mb-2 font-semibold">
            THE WORKFLOW
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase m-0 leading-none">
            THE GR8NIK PROCESS
          </h2>
          <p className="font-space text-xs sm:text-sm text-muted tracking-widest uppercase mt-2">
            [ 8 TACTICAL STAGES FROM INITIAL REFERENCE TO FINAL MASTER ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="border border-secondary/50 bg-[#090909] p-6 sm:p-7 flex flex-col justify-between hover:border-primary transition-colors group"
            >
              <div>
                <div className="font-bebas text-4xl sm:text-5xl text-primary mb-3">
                  {step.num}
                </div>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
