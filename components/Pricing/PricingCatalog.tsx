'use client';

import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "./pricingData";

export default function PricingCatalog() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "service" | "bundle"
  >("all");

  const filteredServices = servicesData.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" className="py-20 relative z-10 scroll-mt-14">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-secondary/50 pb-6">
          <div>
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              COMPLETE CATALOG
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              SERVICES &amp; PRICING
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ INDIVIDUAL RATES // BUNDLE DISCOUNTS // CAIRO ]
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                  : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
              }`}
            >
              All Options ({servicesData.length})
            </button>
            <button
              onClick={() => setActiveCategory("service")}
              className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === "service"
                  ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                  : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
              }`}
            >
              Individual Services
            </button>
            <button
              onClick={() => setActiveCategory("bundle")}
              className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === "bundle"
                  ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                  : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
              }`}
            >
              Complete Bundles
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
