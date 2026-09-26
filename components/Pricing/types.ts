export interface ServiceItem {
  id: string;
  number: string;
  category: "service" | "bundle";
  title: string;
  subtitle: string;
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
  ctaText: string;
}

export interface ComparisonRow {
  service: string;
  price: string;
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
