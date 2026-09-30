export type Currency = "EGP" | "USD";

export interface ServicePriceInfo {
  price: string;
  equivalent: string;
  oldPrice?: string;
  priceNote?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  category: "service" | "bundle";
  title: string;
  subtitle: string;
  whatItOffers?: string;
  shortDescription?: string;
  price: string;
  oldPrice?: string;
  priceNote?: string;
  badge?: string;
  isFeatured?: boolean;
  includes: string[];
  youBring?: string;
  weHandle?: string;
  notes?: string[];
  whatsappMessage: string;
  whatsappMessageUsd?: string;
  ctaText: string;
  pricingByCurrency?: {
    EGP: ServicePriceInfo;
    USD: ServicePriceInfo;
  };
}

export interface ComparisonRow {
  service: string;
  price: string;
  priceUsd?: string;
  recording: string;
  vocalDirection: string;
  beat: string;
  mix: string;
  master: string;
  roughMix: string;
  revision: string;
  highlight?: boolean;
}

export interface DecisionCard {
  situation: string;
  recommendation: string;
  price: string;
  priceUsd?: string;
  detail: string;
  linkId: string;
  cta: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface StudioEquipment {
  category: string;
  items: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
