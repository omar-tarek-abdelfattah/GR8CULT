import { Metadata } from "next";
import AboutTabs from "@/components/AboutTabs/AboutTabs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AhmedyTheGr8 & GR8CULT",
  description:
    "Discover the vision, roadmap, and analog-digital sanctuary behind GR8NIK STUDIOS. Founded by audio engineer and producer AhmedyTheGr8 in Mokattam, Cairo.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About AhmedyTheGr8 & GR8CULT | GR8NIK STUDIOS",
    description:
      "The architect behind the cult: AhmedyTheGr8. Learn about the studio facility, sonic philosophy, and future roadmap.",
    url: `${SITE_URL}/about`,
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

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase text-white mb-2">
            IDENTITY // <span className="text-primary">GR8CULT</span>
          </h1>
          <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em]">
            [ THE ARCHITECTURE OF SOUND ]
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AboutTabs />
        </div>
      </section>
    </div>
    </>
  );
}
