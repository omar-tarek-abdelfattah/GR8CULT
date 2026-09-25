import { Metadata } from "next";
import PricingSection from "@/components/Pricing/PricingSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio Packages & Rates | Recording, Mix & Master",
  description:
    "Explore transparent studio packages at GR8NIK STUDIOS in Mokattam, Cairo. Flagship Full Project package, Record + Mix + Master, and flexible Hourly Recording engineered by AhmedyTheGr8.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Studio Packages & Rates | GR8NIK STUDIOS Cairo",
    description:
      "Transparent studio rates for Full Project Production, Record + Mix + Master, and Hourly Recording booth sessions in Cairo. Direct booking via WhatsApp.",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: "/logo-nobg.png",
        width: 1200,
        height: 630,
        alt: "GR8NIK STUDIOS - Studio Packages and Rates in Cairo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Packages & Rates | GR8NIK STUDIOS Cairo",
    description:
      "Flagship Full Project production, Record + Mix + Master singles, and Hourly Recording booth time at GR8NIK STUDIOS in Mokattam.",
    images: ["/logo-nobg.png"],
  },
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Music Recording, Mixing, Mastering & Production",
  provider: {
    "@type": "MusicRecordingStudio",
    name: "GR8NIK STUDIOS",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mokattam",
      addressRegion: "Cairo",
      addressCountry: "EG",
    },
    telephone: "+201011444140",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "GR8NIK Studio Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Project Production Package",
          description:
            "Custom beat production, dedicated studio recording, pitch tuning, hybrid analog mix, and commercial master engineered by AhmedyTheGr8.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Record + Mix + Master Package",
          description:
            "Dedicated vocal tracking session, vocal tuning, hybrid multi-stem mixing, and commercial streaming master for single releases.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hourly Recording Studio Time",
          description:
            "Flexible vocal booth recording hours with professional engineer, acoustic treatment, and multitrack WAV stem export.",
        },
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingSection />
    </>
  );
}
