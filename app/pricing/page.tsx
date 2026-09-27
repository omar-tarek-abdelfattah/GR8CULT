import { Metadata } from "next";
import PricingSection from "@/components/Pricing/PricingSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio Services, Pricing & Packages | GR8NIK STUDIOS Cairo",
  description:
    "Transparent studio packages at GR8NIK STUDIOS in Mokattam, Cairo: 1. Recording Only (500 EGP/hr), 2. Rec + Mix + Master (2,000 EGP was 4,000 EGP), 3. Beat + Rec + Mix + Master (3,000 EGP was 6,000 EGP), plus custom and online bookings via WhatsApp.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "3 Core Studio Packages & Rates | GR8NIK STUDIOS Cairo",
    description:
      "Recording Only (500 EGP/hr), Rec + Mix + Master (2,000 EGP), Beat + Rec + Mix + Master (3,000 EGP). Direct calendar & WhatsApp online booking available.",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: "/logo-nobg.png",
        width: 1200,
        height: 630,
        alt: "GR8NIK STUDIOS - Services, Pricing and Packages in Cairo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Packages & Rates | GR8NIK STUDIOS Cairo",
    description:
      "Recording Only (500 EGP/hr), Rec + Mix + Master (2,000 EGP was 4,000 EGP), Beat + Rec + Mix + Master (3,000 EGP was 6,000 EGP).",
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
          name: "Recording Only",
          description:
            "Professional vocal booth tracking with mic selection and engineer assistance at 500 EGP / HOUR (Minimum 2 hours).",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rec + Mix + Master",
          description:
            "From your beat to a release-ready track: in-booth vocal direction, tracking, surgical editing, hybrid mix, commercial master & 1 free revision for 2,000 EGP (was 4,000 EGP).",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Beat + Rec + Mix + Master",
          description:
            "All-in-one complete record package: custom beat production, vocal coaching, recording, mixing, mastering & 1 free revision for 3,000 EGP (was 6,000 EGP).",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom / Online Studio Bookings",
          description:
            "EP / Album bundles, bespoke sound design, or direct online session booking via studio WhatsApp.",
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
