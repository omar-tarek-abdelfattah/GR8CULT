import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Space_Mono, Cairo } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { SITE_URL } from "@/lib/site";
import { LanguageProvider } from "@/context/LanguageContext";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const space = Space_Mono({
  variable: "--font-space",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GR8NIK STUDIOS | The Culture Around Independent Egyptian Music",
    template: "%s | GR8NIK STUDIOS",
  },
  description:
    "Premier recording, mixing, and mastering studio located in Mokattam, Cairo. Engineered by AhmedyTheGr8. Discover the Vault, book sessions, and join the GR8CULT.",
  keywords: [
    "GR8NIK STUDIOS",
    "GR8NIK",
    "GR8NIKSTUDIOS",
    "gr8nikstudios",
    "GR8CULT",
    "gr8cult",
    "gr8nik",
    "AhmedyTheGr8",
    "ahmedy",
    "GR8EST BEATS",
    "GREATEST BEATS",
    "gr8est beats",
    "greatest beats",
    "GR8EST BEATS VOL2",
    "GREATEST BEATS VOL2",
    "gr8est beats vol2",
    "greatest beats vol2",
    "greatnik beats",
    "greatnikstudios beats",
    "greatnikstudios",
    "greatnik",
    "Recording Studio Cairo",
    "Music Studio Mokattam",
    "Mixing and Mastering Cairo",
    "Music Production Egypt",
    "Audio Engineering Egypt",
    "Vocal Recording Studio Cairo",
    "Independent Egyptian Rap",
    "Egyptian Hip Hop Studio",
    "Exclusive Beats Cairo",
    "Premier Recording Studio Cairo",
    "Recording Studio in Cairo",
    "Recording Studio in Egypt",
    "Recording Studio in Mokattam",
    "Recording Studio in New Cairo",
    "Underground Egyptian Rap",
    "Underground Egyptian Hip Hop",
    "Beneath Cairo Playlist",
    "Underground Egyptian Artists",
    "Vault",
    "The Vault",
    "AhmedyTheGr8 Vault",
    "gr8nikstudios Vault",
    "gr8nik studios Vault",
    "gr8nik Vault",
    "استوديو GR8NIK",
    "GR8NIK ستوديوز",
    "GR8NIK",
    "جريت كالت",
    "أحمدي",
    "احمدي",
    "أحمدي ذا جريت",
    "احمدي ذا جريت",
    "استوديو تسجيل في القاهرة",
    "استوديو تسجيل في المقطم",
    "استوديو تسجيل في مصر",
    "استوديو تسجيل في التجمع",
    "استوديو تسجيل صوتي القاهرة",
    "استوديو تسجيل اغاني القاهرة",
    "استوديو تسجيل أغاني",
    "استوديو صوت في مصر",
    "استوديو تسجيل صوت احترافي",
    "استوديو راب في القاهرة",
    "أفضل استوديو تسجيل في القاهرة",
    "افضل استوديو تسجيل في مصر",
    "ميكساج وماسترينج القاهرة",
    "ميكس وماستر مصر",
    "مكس وماستر",
    "هندسة صوتية في مصر",
    "مهندس صوت في القاهرة",
    "توزيع موسيقي مصر",
    "إنتاج موسيقي مصر",
    "انتاج موسيقي راب",
    "تسجيل فوكال القاهرة",
    "راب مصري",
    "هيب هوب مصري",
    "استوديو راب مصري",
    "موسيقى راب مصرية مستقلة",
    "اندر جراوند راب مصري",
    "بيتات راب مصري",
    "بيتات حصرية",
    "صناعة الموسيقى المستقلة في مصر",
    "ثقافة الراب المصري",
    "حجز استوديو تسجيل",
    "حجز استوديو في القاهرة",
    "حجز استوديو تسجيل في المقطم",
    "خزنة استوديو GR8NIK",
    "اسعار استوديو تسجيل في مصر"
  ],
  authors: [{ name: "AhmedyTheGr8", url: SITE_URL }],
  creator: "AhmedyTheGr8",
  publisher: "GR8NIK STUDIOS",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "ar-EG": "/?lang=ar",
      "ar": "/?lang=ar",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG", "ar"],
    url: SITE_URL,
    siteName: "GR8NIK STUDIOS",
    title: "GR8NIK STUDIOS | Where Music Gets Made",
    description:
      "Premier recording, mixing, and mastering studio in Mokattam, Cairo. Engineered by AhmedyTheGr8. Home of the GR8CULT sound.",
    images: [
      {
        url: "/logo-nobg.png",
        width: 1200,
        height: 630,
        alt: "GR8NIK STUDIOS - Mokattam, Cairo Recording Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GR8NIK STUDIOS | Cairo Recording & Production Facility",
    description:
      "Where music gets made. The culture around it. Premier studio facility in Mokattam, Cairo.",
    images: ["/logo-nobg.png"],
    creator: "@gr8nikstudios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const studioJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GR8NIK STUDIOS",
  "alternateName": "GR8NIK",
  "image": `${SITE_URL}/g8-without-bg.png`,
  "logo": `${SITE_URL}/logo-nobg.png`,
  "description": "Premier independent recording, mixing, and mastering studio located in Mokattam, Cairo. Engineered by AhmedyTheGr8.",
  "url": SITE_URL,
  "telephone": "+201011444140",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mokattam",
    "addressRegion": "Cairo",
    "addressCountry": "EG",
  },
  "knowsLanguage": ["en", "ar"],
  "availableLanguage": [
    {
      "@type": "Language",
      "name": "Arabic",
      "alternateName": "العربية"
    },
    {
      "@type": "Language",
      "name": "English"
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "AhmedyTheGr8",
    "jobTitle": "Lead Audio Engineer & Music Producer",
  },
  "sameAs": [
    "https://instagram.com/gr8nikstudios",
    "https://tiktok.com/@gr8nikstudios",
  ],
  "priceRange": "$$",
};

import { CalendarModalProvider } from "@/components/CalendarModal/CalendarModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${jetbrains.variable} ${space.variable} ${cairo.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-white">
        <LanguageProvider>
          <CalendarModalProvider>
            <Navbar />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </CalendarModalProvider>
        </LanguageProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-NEP9Z768TZ" />
    </html>
  );
}
