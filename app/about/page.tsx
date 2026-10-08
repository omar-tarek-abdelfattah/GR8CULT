import { Metadata } from "next";
import AboutTabs from "@/components/AboutTabs/AboutTabs";
import AboutHeader from "@/components/AboutTabs/AboutHeader";
import ScrollReveal from "@/components/Scroll/ScrollReveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AhmedyTheGr8 & GR8CULT",
  description:
    "Discover the vision, roadmap, and analog-digital sanctuary behind GR8NIK STUDIOS. Founded by audio engineer and producer AhmedyTheGr8 in Mokattam, Cairo.",
  alternates: {
    canonical: "/about",
    languages: {
      "en": "/about",
      "ar-EG": "/about?lang=ar",
      "ar": "/about?lang=ar",
      "x-default": "/about",
    },
  },
  keywords: [
    "About AhmedyTheGr8",
    "AhmedyTheGr8",
    "GR8NIK STUDIOS Founder",
    "GR8CULT",
    "Audio Engineer Mokattam Cairo",
    "Music Producer Cairo",
    "Analog Digital Sanctuary",
    "Cairo Recording Studio Founder",
    "Independent Egyptian Music Movement",
    "Studio Gear Cairo",
    "عن استوديو GR8NIK",
    "من نحن GR8NIK ستوديوز",
    "أحمدي ذا جريت",
    "احمدي ذا جريت",
    "أحمدي",
    "احمدي",
    "مهندس صوت أحمدي",
    "مؤسس استوديو GR8NIK",
    "تاريخ استوديو GR8NIK",
    "استوديو تسجيل في المقطم القاهرة",
    "فلسفة الصوت والإنتاج الموسيقي",
    "معدات استوديو تسجيل احترافي",
    "هندسة الصوت في مصر",
    "إنتاج موسيقي مستقل مصر",
    "حركة جريت كالت",
    "قصة استوديو GR8NIK",
    "استوديو تسجيل مستقل في مصر"
  ],
  openGraph: {
    title: "About AhmedyTheGr8 & GR8CULT | GR8NIK STUDIOS",
    description:
      "The architect behind the cult: AhmedyTheGr8. Learn about the studio facility, sonic philosophy, and future roadmap.",
    url: `${SITE_URL}/about`,
    locale: "en_US",
    alternateLocale: ["ar_EG", "ar"],
    images: [
      {
        url: "/logo-nobg.png",
        width: 1200,
        height: 630,
        alt: "AhmedyTheGr8 - Founder and Chief Audio Engineer at GR8NIK STUDIOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About AhmedyTheGr8 & GR8CULT | GR8NIK STUDIOS",
    description:
      "The architect behind the cult: AhmedyTheGr8. Sonic philosophy and studio roadmap.",
    images: ["/logo-nobg.png"],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About AhmedyTheGr8 & GR8NIK STUDIOS",
  description: "The cultural future of Egypt's independent music scene.",
  mainEntity: {
    "@type": "Person",
    name: "AhmedyTheGr8",
    jobTitle: "Chief Audio Engineer & Music Producer",
    worksFor: {
      "@type": "MusicRecordingStudio",
      name: "GR8NIK STUDIOS",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mokattam, Cairo",
        addressCountry: "EG",
      },
    },
    description:
      "Founder and architect behind GR8NIK STUDIOS, engineering records and shaping the sound of modern independent Egyptian music.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="w-full bg-background min-h-screen">
      {/* Header */}
      <section className="border-b border-secondary pt-16 pb-8 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <AboutHeader />
      </section>

      {/* Tabs Section */}
      <ScrollReveal as="section" className="py-16">
        <div className="container mx-auto px-4">
          <AboutTabs />
        </div>
      </ScrollReveal>
    </div>
    </>
  );
}
