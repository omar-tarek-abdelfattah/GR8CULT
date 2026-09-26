'use client';

import PricingHero from "./PricingHero";
import PricingCatalog from "./PricingCatalog";
import BundleSavings from "./BundleSavings";
import DecisionGuide from "./DecisionGuide";
import ComparisonMatrix from "./ComparisonMatrix";
import ProcessSection from "./ProcessSection";
import EquipmentSection from "./EquipmentSection";
import PoliciesSection from "./PoliciesSection";
import FaqSection from "./FaqSection";
import PricingCta from "./PricingCta";

export default function PricingSection() {
  return (
    <div className="w-full bg-background min-h-screen text-foreground pb-24 selection:bg-primary selection:text-white">
      <PricingHero />
      <PricingCatalog />
      <BundleSavings />
      <DecisionGuide />
      <ComparisonMatrix />
      <ProcessSection />
      {/* <EquipmentSection /> */}
      <PoliciesSection />
      <FaqSection />
      <PricingCta />
    </div>
  );
}
