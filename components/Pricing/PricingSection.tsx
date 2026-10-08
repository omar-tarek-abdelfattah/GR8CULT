'use client';

import { PricingCurrencyProvider } from "./PricingCurrencyContext";
import PricingHero from "./PricingHero";
import PricingCatalog from "./PricingCatalog";
import DecisionGuide from "./DecisionGuide";
import ComparisonMatrix from "./ComparisonMatrix";
import ProcessSection from "./ProcessSection";
import EquipmentSection from "./EquipmentSection";
import PoliciesSection from "./PoliciesSection";
import FaqSection from "./FaqSection";
import PricingCta from "./PricingCta";
import ScrollReveal from "@/components/Scroll/ScrollReveal";

export default function PricingSection() {
  return (
    <PricingCurrencyProvider>
      <div className="w-full bg-background min-h-screen text-foreground pb-24 selection:bg-primary selection:text-white">
        {/* PricingHero renders immediately to preserve LCP */}
        <PricingHero />

        <ScrollReveal>
          <PricingCatalog />
        </ScrollReveal>

        <ScrollReveal>
          <DecisionGuide />
        </ScrollReveal>

        <ScrollReveal>
          <ComparisonMatrix />
        </ScrollReveal>

        <ScrollReveal>
          <ProcessSection />
        </ScrollReveal>

        <ScrollReveal>
          <EquipmentSection />
        </ScrollReveal>

        <ScrollReveal>
          <PoliciesSection />
        </ScrollReveal>

        <ScrollReveal>
          <FaqSection />
        </ScrollReveal>

        <ScrollReveal>
          <PricingCta />
        </ScrollReveal>
      </div>
    </PricingCurrencyProvider>
  );
}
