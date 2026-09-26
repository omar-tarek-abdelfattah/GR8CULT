'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { decisionCards } from "./pricingData";

export default function DecisionGuide() {
  return (
    <section
      id="guide"
      className="py-20 border-t border-secondary/60 bg-background scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
            DECISION ENGINE
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
            WHICH SERVICE DO I NEED?
          </h2>
          <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
            [ MATCH YOUR CURRENT STAGE TO THE EXACT PACKAGE ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decisionCards.map((d, index) => {
            const isRoute = d.linkId.startsWith("/");

            return (
              <div
                key={index}
                className="border border-secondary/60 bg-[#090909] p-6 flex flex-col justify-between hover:border-primary/80 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 font-space text-[10px] text-primary tracking-widest uppercase mb-3">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>SITUATION {index + 1}</span>
                  </div>

                  <h4 className="font-bebas text-2xl text-white tracking-wide uppercase mb-3 group-hover:text-primary transition-colors">
                    "{d.situation}"
                  </h4>

                  <div className="py-1 px-2.5 bg-black border border-secondary/50 font-space text-xs text-emerald-400 font-bold tracking-wider inline-block mb-4">
                    {d.recommendation} — {d.price}
                  </div>

                  <p className="font-space text-xs text-zinc-300 leading-relaxed">
                    {d.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-secondary/40">
                  {isRoute ? (
                    <Link
                      href={d.linkId}
                      className="font-space text-xs text-primary group-hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>{d.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <a
                      href={`#${d.linkId}`}
                      className="font-space text-xs text-primary group-hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <span>{d.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
