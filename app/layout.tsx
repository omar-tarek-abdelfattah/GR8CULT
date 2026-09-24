import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Space_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google'

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

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gr8nikstudios.com";
const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    "Recording Studio Cairo",
    "Music Studio Mokattam",
    "Mixing and Mastering Cairo",
    "Music Production Egypt",
    "Audio Engineering Egypt",
    "Vocal Recording Studio Cairo",
    "Independent Egyptian Rap",
    "Egyptian Hip Hop Studio",
    "Exclusive Beats Cairo",
  ],
  authors: [{ name: "AhmedyTheGr8", url: "https://gr8nikstudios.com" }],
  creator: "AhmedyTheGr8",
  publisher: "GR8NIK STUDIOS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gr8nikstudios.com",
    siteName: "GR8NIK STUDIOS",
    title: "GR8NIK STUDIOS | Where Music Gets Made",
    description:
      "Premier recording, mixing, and mastering studio in Mokattam, Cairo. Engineered by AhmedyTheGr8. Home of the GR8CULT sound.",
    images: [
      {
        url: "/ahmedy-hero-bg.jpeg",
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
    images: ["/ahmedy-hero-bg.jpeg"],
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
  "alternateName": "GR8CULT",
  "image": "https://gr8nikstudios.com/ahmedy-hero-bg.jpeg",
  "logo": "https://gr8nikstudios.com/logo-nobg.png",
  "description": "Premier independent recording, mixing, and mastering studio located in Mokattam, Cairo. Engineered by AhmedyTheGr8.",
  "url": "https://gr8nikstudios.com",
  "telephone": "+201011444140",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mokattam",
    "addressRegion": "Cairo",
    "addressCountry": "EG",
  },
  "founder": {
    "@type": "Person",
    "name": "AhmedyTheGr8",
    "jobTitle": "Lead Audio Engineer & Music Producer",
  },
  "sameAs": [
    "https://instagram.com/gr8nikstudios",
    "https://twitch.tv",
  ],
  "priceRange": "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${jetbrains.variable} ${space.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-NEP9Z768TZ" />
    </html>
  );
}
