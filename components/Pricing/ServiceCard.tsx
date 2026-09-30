'use client';

import { Flame, ArrowUpRight, Sparkles, Calendar } from "lucide-react";
import { ServiceItem, Currency } from "./types";
import { getServicePricing } from "./pricingData";
import { usePricingCurrency } from "./PricingCurrencyContext";
import { useCalendarModal } from "@/components/CalendarModal/CalendarModalContext";

interface ServiceCardProps {
  item: ServiceItem;
  onSelect: (item: ServiceItem) => void;
  currency?: Currency;
}

export default function ServiceCard({ item, onSelect, currency: propCurrency }: ServiceCardProps) {
  const { openCalendar } = useCalendarModal();
  const { currency: contextCurrency } = usePricingCurrency();
  const activeCurrency = propCurrency || contextCurrency || "EGP";

  const pricing = getServicePricing(item, activeCurrency);

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCalendar({
      serviceName: item.title,
      price: pricing.equivalent ? `${pricing.price} (${pricing.equivalent})` : pricing.price,
    });
  };

  return (
    <div
      id={item.id}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={`View details for ${item.title}`}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary ${
        item.isFeatured
          ? "bg-gradient-to-b from-[#180303] via-[#0d0a0a] to-[#070707] border border-primary shadow-[0_0_25px_rgba(214,0,0,0.25)] hover:shadow-[0_0_35px_rgba(214,0,0,0.45)] hover:border-primary"
          : "bg-[#090909] border border-secondary/60 hover:border-primary/80 hover:bg-[#0e0e0e] shadow-md hover:shadow-[0_0_20px_rgba(214,0,0,0.15)]"
      }`}
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-space text-xs tracking-[0.2em] text-primary font-bold">
              {item.number}
            </span>
            {item.badge && (
              <span
                className={`font-space text-[10px] tracking-wider uppercase px-2 py-0.5 font-bold ${
                  item.isFeatured
                    ? "bg-primary text-white"
                    : "bg-secondary/70 border border-primary/40 text-zinc-200"
                }`}
              >
                {item.badge}
              </span>
            )}
            {item.whatItOffers && (
              <span className="font-space text-[12px] sm:text-[13px] tracking-wider uppercase px-2.5 py-0.5 bg-black/80 border border-secondary/50 text-emerald-400 font-bold">
                {item.whatItOffers}
              </span>
            )}
          </div>

          {item.isFeatured && (
            <div className="flex items-center gap-1 text-primary text-xs font-space font-bold shrink-0">
              <Flame className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline tracking-wider">FEATURED</span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase m-0 leading-tight group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="font-space text-[15px] sm:text-[16px] text-zinc-400 uppercase tracking-wider mt-0.5 mb-2 line-clamp-1">
          {item.subtitle}
        </p>

        {/* Small Description */}
        <p className="font-space text-[13px] sm:text-[14px] text-zinc-300 leading-relaxed line-clamp-2 min-h-[32px]">
          {item.shortDescription || item.includes[0]}
        </p>
      </div>

      {/* Price & Clickable Footer Bar */}
      <div className="mt-4 pt-3 border-t border-secondary/40">
        <div className="flex items-baseline justify-between gap-2 mb-2.5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-bebas text-2xl sm:text-3xl text-primary tracking-wider">
              {pricing.price}
            </span>
            {pricing.equivalent && (
              <span className="font-space text-[10px] sm:text-[11px] px-2 py-0.5 bg-black/80 border border-secondary/60 text-zinc-300 tracking-wider font-semibold self-center">
                {pricing.equivalent}
              </span>
            )}
            {pricing.oldPrice && (
              <span className="font-space text-xs text-muted line-through tracking-wider self-center">
                {pricing.oldPrice}
              </span>
            )}
          </div>

          {pricing.priceNote && (
            <span className="py-0.5 px-2 bg-black/70 border border-secondary/50 font-space text-[10px] sm:text-[11px] text-zinc-300 tracking-wider text-right">
              {pricing.priceNote}
            </span>
          )}
        </div>

        {/* Action Prompt */}
        <div className="flex items-center justify-between text-xs font-space uppercase tracking-wider pt-2 border-t border-secondary/30">
          <span className="text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>View Full Details</span>
          </span>

          <button
            type="button"
            onClick={handleBookClick}
            className="px-3.5 py-1.5 bg-primary hover:bg-white text-white hover:text-black font-space text-[11px] sm:text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(214,0,0,0.35)] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Slot</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
