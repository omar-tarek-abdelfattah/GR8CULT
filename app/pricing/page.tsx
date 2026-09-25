import { Metadata } from "next";
import PricingSection from "@/components/Pricing/PricingSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio Services, Pricing & Process | GR8NIK STUDIOS",
  description:
    "Explore transparent studio packages and rates at GR8NIK STUDIOS in Mokattam, Cairo. Vocal Recording (500 EGP/hr), Professional Finish (1,500 EGP), Professional Execution (2,000 EGP), Custom Beats (3,000–5,000 EGP+), Beat + Track Bundles, and Full Project production.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Services, Pricing, Process & FAQ | GR8NIK STUDIOS Cairo",
    description:
      "Transparent studio rates from single booth sessions to complete tracks built from scratch. Vocal Recording, Mix & Master, Professional Execution, Custom Beats, and Bundles at GR8NIK STUDIOS.",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: "/logo-nobg.png",
        width: 1200,
        height: 630,
        alt: "GR8NIK STUDIOS - Services, Pricing and Process in Cairo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services, Pricing & Process | GR8NIK STUDIOS Cairo",
    description:
      "Build the sound. Finish the record. Transparent recording, mixing, custom beat production, and complete project rates at GR8NIK STUDIOS.",
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
    name: "GR8NIK Studio Services & Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vocal Recording",
          description:
            "Professional vocal recording with mic selection, session setup, and engineer-assisted tracking at 500 EGP / HOUR (Minimum 2 hours).",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mixing + Mastering (Professional Finish)",
          description:
            "Post-production vocal editing, processing, mixing, mastering, rough mix, and 1 free mix revision for 1,500 EGP.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Professional Execution",
          description:
            "From your beat to a finished record: vocal direction, recording, editing, mixing, mastering, and 1 free mix revision for 2,000 EGP.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Beat Production",
          description:
            "Original custom production built specifically around your sound, references, and creative direction from 3,000–5,000 EGP+.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Untitled Beats (Greatest Beats Vol. 2)",
          description:
            "Discounted catalog drops of 10 selected GR8NIK signature beats for 1,500–2,000 EGP released via Untitled.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Beat + Track Bundle",
          description:
            "Core GR8NIK track package combining beat production, vocal direction, recording, editing, mix, master, and 1 free revision for 5,000–7,000 EGP+.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Project Production",
          description:
            "Complete creative process from idea to final master: creative direction, custom beat, recording, mix, master, and revisions for 6,000–8,000 EGP+.",
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
