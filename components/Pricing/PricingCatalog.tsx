'use client';

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import { servicesData, CUSTOM_BOOKING_WHATSAPP_URL } from "./pricingData";

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
              STUDIO PACKAGES &amp; RATES
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              CORE PACKAGES
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ 3 STREAMLINED OPTIONS // TRANSPARENT PRICING // CAIRO ]
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
              All Packages ({servicesData.length})
            </button>
            <button
              onClick={() => setActiveCategory("service")}
              className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === "service"
                  ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                  : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
              }`}
            >
              Studio Time
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

        {/* 3 Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>

        {/* Option for Custom or Online Bookings through WhatsApp beneath packages */}
        <div
          id="custom-booking"
          className="mt-12 p-6 sm:p-8 border border-secondary/70 bg-gradient-to-r from-[#140303] via-[#090909] to-[#0d0404] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-full bg-primary/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-primary/40 font-space text-[10px] text-primary tracking-widest uppercase mb-3 font-bold">
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
              <span>CUSTOM SCOPE // ONLINE BOOKINGS</span>
            </div>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide uppercase m-0 leading-tight">
              NEED A CUSTOM PACKAGE OR ONLINE BOOKING?
            </h3>
            <p className="font-space text-xs sm:text-sm text-zinc-300 max-w-2xl mt-2 leading-relaxed">
              Looking for a custom multi-track EP/Album deal, bespoke sound design, commercial music, or prefer to coordinate and book your session directly online with our engineering team? Chat directly with us on WhatsApp.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <a
              href={CUSTOM_BOOKING_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all font-bold shadow-[0_0_25px_rgba(16,185,129,0.35)] border border-emerald-400/50 cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5 text-white" />
              <span>CHAT FOR CUSTOM OR ONLINE BOOKING</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
