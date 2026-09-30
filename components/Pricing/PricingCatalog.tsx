'use client';

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Sparkles, Coins, Heart, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { servicesData, CUSTOM_BOOKING_WHATSAPP_URL } from "./pricingData";
import { ServiceItem } from "./types";
import { usePricingCurrency } from "./PricingCurrencyContext";

export default function PricingCatalog() {
  const { currency, setCurrency } = usePricingCurrency();
  const [activeCategory, setActiveCategory] = useState<
    "all" | "service" | "bundle"
  >("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Easter egg: 3 consecutive USD clicks
  const [usdClicks, setUsdClicks] = useState(0);
  const [showJayOverlay, setShowJayOverlay] = useState(false);
  const usdClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-dismiss easter egg overlay after 5 seconds
  useEffect(() => {
    if (showJayOverlay) {
      const timer = setTimeout(() => {
        setShowJayOverlay(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showJayOverlay]);

  const handleUsdClick = () => {
    setCurrency("USD");
    const nextCount = usdClicks + 1;
    if (nextCount >= 3) {
      setUsdClicks(0);
      setShowJayOverlay(true);
      if (usdClickTimeoutRef.current) clearTimeout(usdClickTimeoutRef.current);
    } else {
      setUsdClicks(nextCount);
      if (usdClickTimeoutRef.current) clearTimeout(usdClickTimeoutRef.current);
      usdClickTimeoutRef.current = setTimeout(() => {
        setUsdClicks(0);
      }, 3000);
    }
  };

  const handleEgpClick = () => {
    setCurrency("EGP");
    setUsdClicks(0);
    if (usdClickTimeoutRef.current) clearTimeout(usdClickTimeoutRef.current);
  };

  const filteredServices = servicesData.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  const handleSelectService = (item: ServiceItem) => {
    setSelectedService(item);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="py-12 lg:py-16 relative z-10 scroll-mt-14">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header & Filter Row */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-8 border-b border-secondary/50 pb-5">
          <div>
            <span className="font-space text-xs sm:text-sm text-primary tracking-[0.25em] uppercase block mb-1 font-semibold">
              STUDIO PACKAGES &amp; RATES
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase m-0 leading-none">
              CORE PACKAGES
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>4 STREAMLINED TIERS // CLICK ANY TIER FOR FULL DETAILS &amp; BOOKING</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 font-space text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                All Packages ({servicesData.length})
              </button>
              <button
                onClick={() => setActiveCategory("service")}
                className={`px-3.5 py-1.5 font-space text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "service"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                Tracking &amp; Stems
              </button>
              <button
                onClick={() => setActiveCategory("bundle")}
                className={`px-3.5 py-1.5 font-space text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "bundle"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                Complete Bundles
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-2 bg-[#090909] border border-secondary/70 p-1">
              <span className="font-space text-[10px] text-zinc-400 uppercase tracking-widest pl-2 font-bold flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-primary" />
                <span>CURRENCY:</span>
              </span>
              <div className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleEgpClick}
                  className={`px-3 py-1 font-space text-xs uppercase tracking-wider transition-all cursor-pointer font-bold ${
                    currency === "EGP"
                      ? "bg-primary text-white shadow-[0_0_12px_rgba(214,0,0,0.45)] border border-primary"
                      : "text-zinc-400 hover:text-white border border-transparent"
                  }`}
                  aria-pressed={currency === "EGP"}
                >
                  EGP
                </button>
                <button
                  type="button"
                  onClick={handleUsdClick}
                  className={`px-3 py-1 font-space text-xs uppercase tracking-wider transition-all cursor-pointer font-bold ${
                    currency === "USD"
                      ? "bg-primary text-white shadow-[0_0_12px_rgba(214,0,0,0.45)] border border-primary"
                      : "text-zinc-400 hover:text-white border border-transparent"
                  }`}
                  aria-pressed={currency === "USD"}
                >
                  USD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2x2 Grid of Streamlined Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch">
          {filteredServices.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              currency={currency}
              onSelect={handleSelectService}
            />
          ))}
        </div>

        {/* Option for Custom or Online Bookings through WhatsApp beneath packages */}
        <div
          id="custom-booking"
          className="mt-8 p-5 sm:p-6 border border-secondary/70 bg-gradient-to-r from-[#140303] via-[#090909] to-[#0d0404] flex flex-col md:flex-row items-center justify-between gap-5 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-full bg-primary/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-primary/40 font-space text-[11px] text-primary tracking-widest uppercase mb-2 font-bold">
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
              <span>CUSTOM SCOPE // ONLINE BOOKINGS</span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase m-0 leading-tight">
              NEED A CUSTOM PACKAGE OR BESPOKE PROJECT?
            </h3>
            <p className="font-space text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1 leading-relaxed">
              Looking for a custom multi-track EP/Album deal, bespoke sound design, commercial music, or prefer to coordinate directly online with our engineering team? Chat with us on WhatsApp.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a
              href={CUSTOM_BOOKING_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)] border border-emerald-400/50 cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              <span>CHAT FOR CUSTOM BOOKING</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      <ServiceDetailsModal
        item={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currency={currency}
      />

      {/* Easter Egg Overlay: Thank you Jay ❤️ */}
      {showJayOverlay &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Thank you Jay"
            onClick={() => setShowJayOverlay(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#0a0a0a] border-2 border-primary p-7 sm:p-9 text-center shadow-[0_0_80px_rgba(214,0,0,0.5)] cursor-default overflow-hidden animate-in zoom-in-95 duration-200"
            >
              {/* Top Accent Strip & Radial Ambient Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/25 rounded-full blur-3xl pointer-events-none" />

              <button
                type="button"
                onClick={() => setShowJayOverlay(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-white p-2 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-3">
                <Heart className="w-14 h-14 text-primary fill-primary animate-pulse filter drop-shadow-[0_0_20px_rgba(214,0,0,0.9)]" />
              </div>

              <span className="font-space text-[10px] tracking-[0.3em] text-primary uppercase block mb-1.5 font-bold">
                SECRET MESSAGE
              </span>

              <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wider uppercase m-0 leading-tight flex items-center justify-center gap-2">
                <span>THANK YOU JAYTOI</span>
                <span className="text-primary text-3xl sm:text-4xl animate-bounce">❤️</span>
              </h3>

              <p className="font-space text-xs sm:text-sm text-zinc-300 tracking-wider uppercase mt-3 leading-relaxed">
                Big love. Keep being you.
                www.jay.com soon 
              </p>

              <button
                type="button"
                onClick={() => setShowJayOverlay(false)}
                className="mt-6 px-6 py-2.5 bg-primary hover:bg-white text-white hover:text-black font-space text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_15px_rgba(214,0,0,0.4)] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
