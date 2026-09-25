'use client';

import { useState } from "react";
import {
  Sparkles,
  Check,
  ArrowUpRight,
  Mic,
  Sliders,
  Disc3,
  Clock,
  Layers,
  ChevronDown,
  Info,
  Calendar,
  Music,
  Volume2,
  ShieldAlert,
  AlertCircle,
  FolderOpen,
  ArrowRight,
  Headphones,
  Radio,
  FileCheck,
  CheckCircle2,
  Flame,
  HelpCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ServiceItem {
  id: string;
  number: string;
  category: "service" | "bundle" | "beats";
  title: string;
  subtitle: string;
  price: string;
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

const servicesData: ServiceItem[] = [
  {
    id: "recording",
    number: "01",
    category: "service",
    title: "RECORDING",
    subtitle: "VOCAL RECORDING",
    price: "500 EGP / HOUR",
    priceNote: "MINIMUM BOOKING: 2 HOURS",
    includes: [
      "Professional vocal recording",
      "Mic selection tailored to your vocal tone",
      "Session setup & acoustic isolation",
      "Engineer-assisted recording",
      "Recording of vocals, harmonies & ad-lib takes",
    ],
    notes: [
      "Typical recording workflow is completed within 2–3 hours for most songs.",
      "Additional time is charged at: 500 EGP / HOUR.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book a Vocal Recording session (500 EGP/hour, min 2 hours). What is your upcoming availability?",
    ctaText: "BOOK RECORDING SESSION",
  },
  {
    id: "mixing-mastering",
    number: "02",
    category: "service",
    title: "MIXING + MASTERING",
    subtitle: "PROFESSIONAL FINISH",
    price: "1,500 EGP",
    priceNote: "ALREADY RECORDED YOUR VOCALS?",
    badge: "POST-PRODUCTION",
    includes: [
      "Vocal editing & surgical cleanup",
      "Vocal processing (EQ, compression, spatial FX)",
      "Multi-stem mixing with beat / instrumental",
      "Commercial streaming & club mastering",
      "Rough Mix for review",
      "Final Master (WAV / MP3)",
      "1 FREE MIX REVISION INCLUDED",
    ],
    notes: [
      "THIS SERVICE DOES NOT INCLUDE RECORDING.",
      "For artists who have already recorded and only need the track professionally finished.",
      "Send us your vocals + instrumental / stems.",
      "Additional mix revisions are charged separately.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book Mix + Master (Professional Finish — 1,500 EGP). I have my vocals and stems ready to send over.",
    ctaText: "GET PROFESSIONAL FINISH",
  },
  {
    id: "professional-execution",
    number: "03",
    category: "service",
    title: "PROFESSIONAL EXECUTION",
    subtitle: "YOUR BEAT → FINISHED RECORD",
    price: "2,000 EGP",
    priceNote: "YOU ALREADY HAVE THE BEAT",
    badge: "POPULAR SINGLE DEAL",
    includes: [
      "Vocal direction & coaching in-booth",
      "Professional vocal recording session",
      "Vocal editing, comping & alignment",
      "Vocal processing & effects chain",
      "Hybrid mixing for maximum punch",
      "Streaming-ready final mastering",
      "Rough Mix delivery",
      "Final Master export",
      "1 FREE MIX REVISION INCLUDED",
    ],
    youBring: "Your beat + lyrics + references.",
    weHandle: "Vocal Direction → Recording → Editing → Mix → Master.",
    whatsappMessage:
      "Hey GR8NIK Studios, I'd like to book Professional Execution (2,000 EGP). I have my beat and lyrics ready to record and finish.",
    ctaText: "BOOK PROFESSIONAL EXECUTION",
  },
  {
    id: "custom-beat",
    number: "04",
    category: "service",
    title: "CUSTOM BEAT",
    subtitle: "MADE FOR YOUR RECORD",
    price: "3,000–5,000 EGP+",
    priceNote: "STARTS FROM 3,000 EGP",
    badge: "ORIGINAL PRODUCTION",
    includes: [
      "Creative reference analysis",
      "Custom sound selection & signature patches",
      "Song arrangement & structure building",
      "Melody & harmonic progression design",
      "Hard-hitting drums & rhythmic bounce",
      "808 & bass design tailored to the record",
      "Creative sound design & sonic textures",
      "Arrangement development & section transitions",
      "Production revision rounds",
    ],
    notes: [
      "A custom production built specifically around your sound, references and creative direction.",
      "More complex productions can reach 5,000 EGP+.",
      "Final price is confirmed based on project scope before payment.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to commission a Custom Beat (3,000–5,000 EGP+). Here are my reference tracks and sound direction:",
    ctaText: "COMMISSION CUSTOM BEAT",
  },
  {
    id: "untitled-beats",
    number: "05",
    category: "beats",
    title: "UNTITLED BEATS",
    subtitle: "GR8NIK BEAT DROPS",
    price: "1,500–2,000 EGP",
    priceNote: "GREATEST BEATS — VOL. 2 (10 BEATS)",
    badge: "CATALOG SALE",
    includes: [
      "Limited collection of 10 GR8NIK signature beats",
      "Discounted catalog drop format",
      "Immediate listening & selection via Untitled",
      "New beats added to catalog regularly",
      "Full stereo WAV / stem delivery options",
      "Commercial licensing terms via Untitled store",
    ],
    notes: [
      "For artists who want an available beat instead of a custom production.",
      "This is a catalog sale, not the price of a custom beat.",
      "Individual licensing / usage terms are provided through the Untitled store.",
      "For international clients and higher-tier licensing, pricing may vary based on selected license.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I'm interested in the Untitled Beats catalog / Greatest Beats Vol. 2 collection. How can I browse and license?",
    ctaText: "BROWSE BEAT DROPS",
  },
  {
    id: "beat-track-bundle",
    number: "06",
    category: "bundle",
    title: "BEAT + TRACK BUNDLE",
    subtitle: "THE GR8NIK RECORD",
    price: "5,000–7,000 EGP+",
    priceNote: "BEAT → RECORD → MIX → MASTER",
    badge: "★ CORE GR8NIK TRACK PACKAGE ★",
    isFeatured: true,
    includes: [
      "Beat production crafted for your voice",
      "1-on-1 vocal direction in studio",
      "Professional vocal recording session",
      "Vocal editing, comping & alignment",
      "Signature vocal processing & tuning",
      "Multi-stem hybrid mixing",
      "Commercial loudness master",
      "Rough Mix check-in",
      "Final Master delivery (WAV + MP3)",
      "1 FREE MIX REVISION INCLUDED",
    ],
    notes: [
      "Instead of booking every service separately, the project is handled as one complete track.",
      "Final price depends on the complexity of the beat and project requirements.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book the Beat + Track Bundle (5,000–7,000 EGP+). I'm ready to build a complete record from beat to master.",
    ctaText: "BOOK BEAT + TRACK BUNDLE",
  },
  {
    id: "full-project",
    number: "★",
    category: "bundle",
    title: "FULL PROJECT",
    subtitle: "FROM IDEA TO FINAL MASTER",
    price: "6,000–8,000 EGP+",
    priceNote: "COMPLETE PROJECT ARCHITECTURE",
    badge: "★ MOST COMPLETE FLAGSHIP EXPERIENCE ★",
    isFeatured: true,
    includes: [
      "Full creative direction & sonic architecture",
      "Deep reference analysis & moodboarding",
      "Full Custom Beat production built from zero",
      "Dedicated vocal direction & performance coaching",
      "Professional studio recording booth time",
      "Comprehensive vocal editing & tuning",
      "Signature vocal processing & spatial depth",
      "Full multi-track analog/digital hybrid mixing",
      "Commercial streaming & club master",
      "Rough Mix preview before sign-off",
      "Final Master file package",
      "1 FREE MIX REVISION INCLUDED",
    ],
    notes: [
      "For artists who want the complete creative process handled as one unified project.",
      "This is the most complete GR8NIK service.",
      "The final price is confirmed based on the scope of the project before the deposit is paid.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book the Full Project (6,000–8,000 EGP+). I want the entire sound developed from idea to final master.",
    ctaText: "START FULL PROJECT",
  },
];

const comparisonTable = [
  {
    service: "Recording",
    price: "500 EGP / HR",
    recording: "✓",
    vocalDirection: "—",
    beat: "—",
    mix: "—",
    master: "—",
    roughMix: "—",
    revision: "—",
  },
  {
    service: "Mix + Master / Professional Finish",
    price: "1,500 EGP",
    recording: "—",
    vocalDirection: "—",
    beat: "—",
    mix: "✓",
    master: "✓",
    roughMix: "✓",
    revision: "1",
  },
  {
    service: "Professional Execution",
    price: "2,000 EGP",
    recording: "✓",
    vocalDirection: "✓",
    beat: "YOUR BEAT",
    mix: "✓",
    master: "✓",
    roughMix: "✓",
    revision: "1",
  },
  {
    service: "Custom Beat",
    price: "3,000–5,000 EGP+",
    recording: "—",
    vocalDirection: "Creative",
    beat: "✓",
    mix: "—",
    master: "—",
    roughMix: "—",
    revision: "—",
  },
  {
    service: "Beat + Track Bundle",
    price: "5,000–7,000 EGP+",
    recording: "✓",
    vocalDirection: "✓",
    beat: "✓",
    mix: "✓",
    master: "✓",
    roughMix: "✓",
    revision: "1",
    highlight: true,
  },
  {
    service: "Full Project",
    price: "6,000–8,000 EGP+",
    recording: "✓",
    vocalDirection: "✓",
    beat: "✓",
    mix: "✓",
    master: "✓",
    roughMix: "✓",
    revision: "1",
    highlight: true,
  },
];

const decisionCards = [
  {
    situation: "I ALREADY RECORDED MY VOCALS.",
    recommendation: "Professional Finish",
    price: "1,500 EGP",
    detail:
      "You send the recorded vocals and instrumental / stems. We finish the track to release standard.",
    linkId: "mixing-mastering",
    cta: "View Mix + Master",
  },
  {
    situation: "I HAVE THE BEAT BUT I NEED TO RECORD.",
    recommendation: "Professional Execution",
    price: "2,000 EGP",
    detail:
      "You bring the beat. We handle the recording, vocal direction, mix and master from start to finish.",
    linkId: "professional-execution",
    cta: "View Professional Execution",
  },
  {
    situation: "I ONLY NEED A RECORDING SESSION.",
    recommendation: "Vocal Recording",
    price: "500 EGP / HOUR",
    detail:
      "Minimum 2 hours. Professional vocal recording booth with engineer-assisted tracking and mic selection.",
    linkId: "recording",
    cta: "View Recording",
  },
  {
    situation: "I NEED A CUSTOM BEAT.",
    recommendation: "Custom Beat",
    price: "3,000–5,000 EGP+",
    detail:
      "Built specifically around your sound, vocal tone, references and creative direction.",
    linkId: "custom-beat",
    cta: "View Custom Beat",
  },
  {
    situation: "I WANT A READY-MADE BEAT.",
    recommendation: "Untitled Beat Drops",
    price: "1,500–2,000 EGP (10 Beats)",
    detail:
      "Browse the current GR8NIK beat selection through Untitled. Check the latest Greatest Beats collection and weekly beat drops.",
    linkId: "untitled-beats",
    cta: "View Untitled Beats",
  },
  {
    situation: "I WANT A COMPLETE TRACK.",
    recommendation: "Beat + Track Bundle or Full Project",
    price: "5,000–8,000 EGP+",
    detail:
      "Beat + Track Bundle (5,000–7,000 EGP+) or Full Project (6,000–8,000 EGP+) depending on scope.",
    linkId: "beat-track-bundle",
    cta: "View Complete Bundles",
  },
];

const processSteps = [
  {
    num: "01",
    title: "REFERENCE",
    description:
      "We start with the sound you're trying to achieve. Send songs, artists, references, moods, vocal ideas, or production references. You don't need to know technical terminology.",
  },
  {
    num: "02",
    title: "CREATIVE DIRECTION",
    description:
      "We define the direction before recording or production: vocal energy, delivery, effects, beat direction, arrangement, and overall sonic identity.",
  },
  {
    num: "03",
    title: "PRODUCTION",
    description:
      "If the project includes a custom beat, the production is developed around the agreed direction. If you already have a beat, we work directly with your production.",
  },
  {
    num: "04",
    title: "RECORDING",
    description:
      "Your vocals are recorded professionally with engineer-assisted direction throughout the session. 500 EGP / HOUR, minimum 2 hours. Most songs are recorded within ~2–3 hours.",
  },
  {
    num: "05",
    title: "EDIT + MIX",
    description:
      "The vocals are edited, processed, and mixed with the production. The goal is for the vocals and instrumental to feel like one unified, finished record.",
  },
  {
    num: "06",
    title: "ROUGH MIX",
    description:
      "You receive a rough mix so you can hear the exact direction and balance of the finished record before final sign-off.",
  },
  {
    num: "07",
    title: "REVISION",
    description:
      "Every Mix + Master package includes 1 FREE MIX REVISION for adjustments to the existing mix based on agreed creative direction. Additional revisions charged separately.",
  },
  {
    num: "08",
    title: "FINAL MASTER",
    description:
      "The final Mix + Master is completed after the revision process. Normal delivery turnaround is 4–7 DAYS.",
  },
];

const studioEquipments = [
  {
    category: "MICROPHONES",
    items: [
      "Lewitt LCT 240 Pro (Ultra-clear modern vocal capture)",
      "MXL 990 (Warm large-diaphragm condenser)",
      "Dynamic Microphone (Punchy tracking & live energy)",
    ],
  },
  {
    category: "MONITORING",
    items: [
      "Kali 6.5” Studio Monitors (Surgical stereo imaging & flat response)",
      "Audio-Technica ATH-M40x Studio Headphones (Precise tracking & critical listening)",
    ],
  },
  {
    category: "PRODUCTION & KEYS",
    items: [
      "MIDI Keyboard / Controller",
      "Keystation 49 (Full composition & chord arrangement)",
      "Professional DAW-based production and mixing setup",
    ],
  },
];

const faqsData = [
  {
    question: "HOW DO I GET THE RIGHT VIBE?",
    answer:
      "You don't have to know how to explain the sound technically. Send us references — songs, artists, sounds, moods or examples. We use those references to understand the direction and translate that into your own record.",
  },
  {
    question: "WHAT IF I DON'T KNOW EXACTLY WHAT SOUND I WANT?",
    answer:
      "That's okay. A rough idea, mood or reference is enough to start. The creative direction can be developed with you during the project.",
  },
  {
    question: "CAN YOU MAKE THE SONG SOUND LIKE MY REFERENCE?",
    answer:
      "References are used to communicate the target sound, energy and direction. The goal is to use that reference as a creative starting point and build a record that fits your own voice and identity.",
  },
  {
    question: "HOW LONG DOES RECORDING TAKE?",
    answer:
      "Most songs take approximately 2–3 HOURS. The minimum booking is 2 hours. Recording is charged at 500 EGP / HOUR. Any additional time is charged separately.",
  },
  {
    question: "WHAT IS PROFESSIONAL FINISH?",
    answer:
      "Professional Finish is for artists who have already recorded their vocals. You send us your vocals and instrumental / stems. We handle: Editing → Vocal Processing → Mix → Master for 1,500 EGP. Recording is not included.",
  },
  {
    question: "WHAT IS PROFESSIONAL EXECUTION?",
    answer:
      "Professional Execution is for artists who already have the beat but still need to record the song at GR8NIK. We handle: Vocal Direction → Recording → Editing → Mix → Master for 2,000 EGP.",
  },
  {
    question: "WHAT IS THE DIFFERENCE BETWEEN PROFESSIONAL EXECUTION AND FULL PROJECT?",
    answer:
      "Professional Execution: You already have the beat, and we execute the record from recording to final master. Full Project: We start from the raw idea and handle the production, recording and finalization of the entire record.",
  },
  {
    question: "DO YOU MAKE CUSTOM BEATS?",
    answer:
      "Yes. Custom Beats start from 3,000 EGP and can go up to 5,000 EGP+ depending on the production scope.",
  },
  {
    question: "WHERE CAN I GET A READY-MADE BEAT?",
    answer:
      "Our available beats are hosted through Untitled. The catalog is updated regularly with new beats. Check the latest Greatest Beats collection for discounted beat drops.",
  },
  {
    question: "WHAT IS THE DIFFERENCE BETWEEN AN UNTITLED BEAT AND A CUSTOM BEAT?",
    answer:
      "UNTITLED BEAT: A finished beat from our available catalog. You choose the production that fits your sound. CUSTOM BEAT: A new production created specifically for your project. Custom production starts from 3,000 EGP+.",
  },
  {
    question: "WHAT IS THE BEAT + TRACK BUNDLE?",
    answer:
      "It's the complete process of creating a finished record around a beat: Beat → Vocal Direction → Recording → Editing → Mix → Master (5,000–7,000 EGP+). The bundle price is lower than booking the equivalent services individually.",
  },
  {
    question: "DO I GET A ROUGH MIX?",
    answer:
      "Yes. A rough mix is provided before final delivery so you can review the direction of the record.",
  },
  {
    question: "HOW MANY MIX REVISIONS ARE INCLUDED?",
    answer:
      "1 FREE MIX REVISION. Additional revisions are paid separately. The included revision applies to the existing mix. A completely new creative direction, new production request or substantial additional work may require an additional fee.",
  },
  {
    question: "HOW LONG DOES MIXING + MASTERING TAKE?",
    answer:
      "The normal delivery window is 4–7 DAYS. This can vary depending on the project and current workload.",
  },
  {
    question: "CAN I BOOK ONLY ONE SERVICE?",
    answer:
      "Yes. Every service can be booked individually. You can book: Recording, Mix + Master, Custom Beat, Professional Execution, or Full Project. Bundles are available when you need multiple services for the same record.",
  },
  {
    question: "WHAT DO I NEED TO BRING?",
    answer:
      "Depending on your service: Beat / instrumental, lyrics, references, song structure, or vocal ideas. For a Full Project, you don't need to have everything figured out before starting.",
  },
  {
    question: "HOW DO I BOOK?",
    answer:
      "Select an available time slot directly through the booking grid on the GR8NIK website. Step 1: Choose your service. Step 2: Select an available time slot. Step 3: Contact GR8NIK on WhatsApp to confirm the booking and payment. Step 4: Pay the required deposit. Step 5: Your slot is officially locked into the calendar.",
  },
];

export default function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "service" | "bundle" | "beats">("all");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredServices = servicesData.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  const calendarBookingUrl =
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3LvlOtrmBmmhsShjPRpw0gZjUH2IUfHPInqNnD0fEmuxQ2tAu28FSXvEE4AfdRtF6RpuQfr1z-";

  return (
    <div className="w-full bg-background min-h-screen text-foreground pb-24 selection:bg-primary selection:text-white">
      {/* Hero Header */}
      <section className="border-b border-secondary/60 pt-20 pb-16 relative overflow-hidden bg-gradient-to-b from-[#140202] via-[#080808] to-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-primary/50 bg-primary/10 text-primary font-space text-[11px] tracking-[0.25em] uppercase mb-6 shadow-[0_0_15px_rgba(214,0,0,0.25)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GR8NIK STUDIOS // SERVICES / PRICING / PROCESS / FAQ</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase text-white mb-6 leading-none">
            BUILD THE SOUND. <br className="hidden sm:inline" />
            <span className="text-primary">FINISH THE RECORD.</span>
          </h1>

          <p className="font-space text-sm sm:text-base text-zinc-200 max-w-3xl mx-auto leading-relaxed mb-4">
            GR8NIK STUDIOS is built for artists who want their music developed,
            recorded and finished with one clear creative direction.
          </p>

          <p className="font-space text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Book exactly what you need — from a single recording session to a
            complete track built from scratch. Every service is available
            individually, while bundles combine multiple services at a better project rate.
          </p>

          {/* Quick Anchor Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-space text-[11px] uppercase tracking-wider text-muted">
            <a
              href="#services"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 01 Services &amp; Rates ]
            </a>
            <a
              href="#bundles-savings"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 02 Bundle Savings ]
            </a>
            <a
              href="#guide"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 03 Which Service Do I Need? ]
            </a>
            <a
              href="#comparison"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 04 Matrix ]
            </a>
            <a
              href="#process"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 05 Process ]
            </a>
            <a
              href="#policies"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 06 Policies ]
            </a>
            <a
              href="#faq"
              className="px-3 py-1.5 border border-secondary/60 bg-black/60 hover:border-primary hover:text-white transition-colors"
            >
              [ 07 FAQ ]
            </a>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section id="services" className="py-20 relative z-10 scroll-mt-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-secondary/50 pb-6">
            <div>
              <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
                COMPLETE CATALOG
              </span>
              <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
                SERVICES &amp; PRICING
              </h2>
              <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
                [ INDIVIDUAL RATES // BUNDLE DISCOUNTS // CAIRO ]
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                All Options ({servicesData.length})
              </button>
              <button
                onClick={() => setActiveCategory("service")}
                className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "service"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                Individual Services
              </button>
              <button
                onClick={() => setActiveCategory("bundle")}
                className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "bundle"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                Complete Bundles
              </button>
              <button
                onClick={() => setActiveCategory("beats")}
                className={`px-3.5 py-1.5 font-space text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "beats"
                    ? "bg-primary text-white border border-primary font-bold shadow-[0_0_12px_rgba(214,0,0,0.4)]"
                    : "border border-secondary/60 bg-black/40 text-muted hover:text-white hover:border-primary/50"
                }`}
              >
                Beat Drops
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredServices.map((item) => {
              const whatsappUrl = `https://wa.me/+201011444140?text=${encodeURIComponent(
                item.whatsappMessage
              )}`;

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={`relative flex flex-col justify-between transition-all duration-300 bg-[#090909] border ${
                    item.isFeatured
                      ? "border-primary shadow-[0_0_35px_rgba(214,0,0,0.25)] bg-gradient-to-b from-[#160202] via-[#0a0a0a] to-[#050505] ring-1 ring-primary/60 md:scale-[1.02]"
                      : "border-secondary/60 hover:border-primary/60 shadow-lg"
                  }`}
                >
                  {/* Badge */}
                  {item.badge && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap font-space text-[10px] tracking-[0.2em] uppercase px-4 py-1 flex items-center gap-1.5 font-bold ${
                        item.isFeatured
                          ? "bg-primary text-white shadow-[0_0_15px_#D60000]"
                          : "bg-secondary text-white border border-primary/40"
                      }`}
                    >
                      {item.badge}
                    </div>
                  )}

                  {/* Header */}
                  <div className="p-6 sm:p-7 border-b border-secondary/50">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-space text-xs tracking-[0.25em] text-primary font-bold">
                        {item.number} — {item.title}
                      </span>
                      {item.isFeatured && (
                        <Flame className="w-4 h-4 text-primary animate-pulse" />
                      )}
                    </div>

                    <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide m-0 leading-tight">
                      {item.subtitle}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-baseline gap-2">
                      <span className="font-bebas text-3xl text-primary tracking-wider">
                        {item.price}
                      </span>
                    </div>

                    {item.priceNote && (
                      <div className="mt-2 py-1 px-2.5 bg-black/60 border border-secondary/40 font-space text-[10px] text-zinc-300 tracking-wider inline-block">
                        {item.priceNote}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-grow space-y-6">
                    {/* You bring / We handle callout if present */}
                    {(item.youBring || item.weHandle) && (
                      <div className="p-3.5 bg-black/70 border border-secondary/50 font-space text-[11px] space-y-2">
                        {item.youBring && (
                          <div>
                            <span className="text-primary font-bold uppercase tracking-wider block">
                              YOU BRING:
                            </span>
                            <span className="text-zinc-200">{item.youBring}</span>
                          </div>
                        )}
                        {item.weHandle && (
                          <div>
                            <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                              WE HANDLE:
                            </span>
                            <span className="text-zinc-200">{item.weHandle}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Includes List */}
                    <div>
                      <div className="font-space text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        <span>INCLUDES:</span>
                      </div>
                      <ul className="space-y-2.5 font-space text-xs text-zinc-200">
                        {item.includes.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                            <span className="leading-snug">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Notes Callouts */}
                    {item.notes && item.notes.length > 0 && (
                      <div className="border-t border-secondary/40 pt-4 space-y-2">
                        {item.notes.map((note, nIdx) => (
                          <p
                            key={nIdx}
                            className={`font-space text-[11px] leading-relaxed ${
                              note.includes("DOES NOT INCLUDE") ||
                              note.includes("Additional") ||
                              note.includes("scope")
                                ? "text-amber-400/90"
                                : "text-zinc-400"
                            }`}
                          >
                            • {note}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 sm:p-7 pt-0 space-y-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 px-5 font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer ${
                        item.isFeatured
                          ? "bg-primary hover:bg-white text-white hover:text-black shadow-[0_0_20px_rgba(214,0,0,0.5)] border border-primary hover:border-white font-bold"
                          : "border border-secondary hover:border-primary bg-black hover:bg-primary text-zinc-200 hover:text-white"
                      }`}
                    >
                      <FaWhatsapp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{item.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <a
                      href={calendarBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 font-space text-[10px] uppercase tracking-wider text-muted hover:text-white border border-secondary/40 hover:border-secondary flex items-center justify-center gap-2 bg-[#050505] transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Check Calendar Slot Availability</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Individual vs Bundle Savings Analysis */}
      <section
        id="bundles-savings"
        className="py-16 border-t border-secondary/60 bg-[#070707] scroll-mt-14"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              PROJECT VALUE &amp; TRANSPARENCY
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              INDIVIDUAL VS BUNDLE
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ SAVE MORE WHEN COMBINING PRODUCTION + TRACKING + FINISH ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Individually */}
            <div className="border border-secondary/50 bg-[#0a0a0a] p-8 flex flex-col justify-between">
              <div>
                <div className="font-space text-xs text-muted uppercase tracking-[0.2em] mb-2">
                  OPTION A
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide uppercase mb-6">
                  BOOKING INDIVIDUALLY
                </h3>

                <div className="space-y-4 font-space text-xs">
                  <div className="flex justify-between items-center py-2.5 border-b border-secondary/30">
                    <span className="text-zinc-300">Custom Beat:</span>
                    <span className="text-white font-bold">3,000–5,000 EGP+</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-secondary/30">
                    <span className="text-zinc-300">Recording (Min. 2 Hours):</span>
                    <span className="text-white font-bold">1,000 EGP (500 EGP/hr)</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-secondary/30">
                    <span className="text-zinc-300">Mix + Master:</span>
                    <span className="text-white font-bold">1,500 EGP</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-black/60 border border-secondary/50 font-space">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                    TOTAL SEPARATE COST:
                  </span>
                  <div className="font-bebas text-3xl sm:text-4xl text-white tracking-wider">
                    5,500–7,500 EGP+
                  </div>
                  <p className="text-xs text-muted mt-2 leading-relaxed">
                    A typical custom-beat track booked individually can reach 5,500–7,500 EGP+ depending on recording time and production scope.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-secondary/30 font-space text-xs text-muted">
                Best if you already have certain stages complete or want to take things one step at a time.
              </div>
            </div>

            {/* The Bundle */}
            <div className="border border-primary bg-gradient-to-b from-[#180303] via-[#0c0c0c] to-[#080808] p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(214,0,0,0.2)]">
              <div>
                <div className="inline-block px-2.5 py-1 bg-primary text-white font-space text-[10px] tracking-widest uppercase mb-2 font-bold">
                  RECOMMENDED PROJECT RATE
                </div>
                <h3 className="font-bebas text-3xl text-white tracking-wide uppercase mb-6">
                  BOOKING THE BUNDLE
                </h3>

                <p className="font-space text-xs sm:text-sm text-zinc-200 leading-relaxed mb-6">
                  The <span className="text-white font-bold">Beat + Track Bundle</span> combines the production, recording and finishing stages under one unified project price:
                </p>

                <div className="p-5 bg-black/80 border border-primary/60 font-space text-center mb-6">
                  <span className="text-[11px] text-primary uppercase tracking-widest font-bold block mb-1">
                    ALL-IN-ONE BUNDLE RATE
                  </span>
                  <div className="font-bebas text-4xl sm:text-5xl text-white tracking-wider">
                    5,000–7,000 EGP+
                  </div>
                  <span className="text-[11px] text-emerald-400 tracking-wider uppercase mt-1 block">
                    Better Overall Project Rate
                  </span>
                </div>

                <ul className="space-y-3 font-space text-xs text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>The bundle gives the artist a better overall project rate while keeping individual service values clear.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>One coherent sonic direction from the initial kick drum to the final stereo limiter.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Includes 1 Free Mix Revision &amp; full rough mix listening stage.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-primary/30">
                <a
                  href={`https://wa.me/+201011444140?text=${encodeURIComponent(
                    "Hey GR8NIK Studios, I want to book the Beat + Track Bundle at the project rate. Let's discuss dates and creative direction."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-primary text-white font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all font-bold shadow-[0_0_20px_rgba(214,0,0,0.4)]"
                >
                  <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                  <span>CLAIM BUNDLE RATE ON WHATSAPP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Which Service Do I Need? Interactive Decision Guide */}
      <section id="guide" className="py-20 border-t border-secondary/60 bg-background scroll-mt-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              DECISION ENGINE
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              WHICH SERVICE DO I NEED?
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ MATCH YOUR CURRENT STAGE TO THE EXACT PACKAGE ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decisionCards.map((d, index) => (
              <div
                key={index}
                className="border border-secondary/60 bg-[#090909] p-6 flex flex-col justify-between hover:border-primary/80 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 font-space text-[10px] text-primary tracking-widest uppercase mb-3">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>SITUATION {index + 1}</span>
                  </div>

                  <h4 className="font-bebas text-2xl text-white tracking-wide uppercase mb-3 group-hover:text-primary transition-colors">
                    "{d.situation}"
                  </h4>

                  <div className="py-1 px-2.5 bg-black border border-secondary/50 font-space text-xs text-emerald-400 font-bold tracking-wider inline-block mb-4">
                    {d.recommendation} — {d.price}
                  </div>

                  <p className="font-space text-xs text-zinc-300 leading-relaxed">
                    {d.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-secondary/40">
                  <a
                    href={`#${d.linkId}`}
                    className="font-space text-xs text-primary group-hover:text-white uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <span>{d.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section
        id="comparison"
        className="py-20 border-t border-secondary/60 bg-[#060606] scroll-mt-14"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              TRANSPARENT FEATURE BREAKDOWN
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              PRICE COMPARISON MATRIX
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ SEE EXACTLY WHAT EACH SERVICE &amp; BUNDLE DELIVERS ]
            </p>
          </div>

          <div className="overflow-x-auto border border-secondary/60 bg-[#080808]">
            <table className="w-full text-left border-collapse font-space text-xs">
              <thead>
                <tr className="border-b border-secondary/60 bg-black text-white">
                  <th className="p-4 sm:p-5 uppercase tracking-wider font-semibold text-zinc-400 min-w-[200px]">
                    SERVICE
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider font-bold text-white min-w-[140px]">
                    INDIVIDUAL PRICE
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    RECORDING
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    VOCAL DIRECTION
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    BEAT
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    MIX
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    MASTER
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    ROUGH MIX
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                    FREE REVISION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/40 text-zinc-300">
                {comparisonTable.map((row, index) => (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      row.highlight
                        ? "bg-primary/5 hover:bg-primary/10"
                        : "hover:bg-zinc-900/60"
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                      {row.highlight && (
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      )}
                      <span>{row.service}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-primary">
                      {row.price}
                    </td>
                    <td className="p-4 sm:p-5 text-center">{row.recording}</td>
                    <td className="p-4 sm:p-5 text-center">{row.vocalDirection}</td>
                    <td className="p-4 sm:p-5 text-center font-medium">
                      {row.beat}
                    </td>
                    <td className="p-4 sm:p-5 text-center">{row.mix}</td>
                    <td className="p-4 sm:p-5 text-center">{row.master}</td>
                    <td className="p-4 sm:p-5 text-center">{row.roughMix}</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-white">
                      {row.revision}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The GR8NIK Process (01-08) */}
      <section id="process" className="py-20 border-t border-secondary/60 bg-background scroll-mt-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              THE WORKFLOW
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              THE GR8NIK PROCESS
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ 8 TACTICAL STAGES FROM INITIAL REFERENCE TO FINAL MASTER ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="border border-secondary/50 bg-[#090909] p-6 flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div className="font-bebas text-4xl text-primary mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="font-space text-xs text-zinc-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Equipment Section */}
      <section
        id="equipment"
        className="py-20 border-t border-secondary/60 bg-[#070707] scroll-mt-14"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              HARDWARE &amp; ACOUSTICS
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              STUDIO EQUIPMENT
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ EQUIPPED FOR PROFESSIONAL RECORDING, PRODUCTION AND MIXING ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {studioEquipments.map((eq, i) => (
              <div
                key={i}
                className="border border-secondary/50 bg-[#0a0a0a] p-6 hover:border-primary/70 transition-colors"
              >
                <div className="font-space text-xs text-primary tracking-widest uppercase mb-4 font-bold flex items-center gap-2">
                  {i === 0 && <Mic className="w-4 h-4 text-primary" />}
                  {i === 1 && <Headphones className="w-4 h-4 text-primary" />}
                  {i === 2 && <Sliders className="w-4 h-4 text-primary" />}
                  <span>{eq.category}</span>
                </div>
                <ul className="space-y-3 font-space text-xs text-zinc-200">
                  {eq.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center font-space text-xs text-muted max-w-2xl mx-auto uppercase tracking-wider">
            * Equipment selection depends on the artist, voice and specific requirements of the project.
          </p>
        </div>
      </section>

      {/* Booking Steps & Studio Policies */}
      <section
        id="policies"
        className="py-20 border-t border-secondary/60 bg-background scroll-mt-14"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              GUIDELINES &amp; POLICIES
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              BOOKING &amp; POLICIES
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ 5 EASY STEPS // CLEAR DEPOSIT &amp; CANCELLATION TERMS ]
            </p>
          </div>

          {/* 5 Steps to Book */}
          <div className="mb-14 p-8 border border-secondary/60 bg-[#080808]">
            <h3 className="font-bebas text-3xl text-white tracking-wide uppercase mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <span>HOW DO I BOOK?</span>
            </h3>
            <p className="font-space text-xs sm:text-sm text-zinc-300 mb-8 leading-relaxed">
              You can select an available time slot directly through the booking grid on the GR8NIK website.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { step: "STEP 1", desc: "Choose your service." },
                { step: "STEP 2", desc: "Select an available time slot." },
                { step: "STEP 3", desc: "Contact GR8NIK on WhatsApp to confirm booking and payment." },
                { step: "STEP 4", desc: "Pay the required deposit." },
                { step: "STEP 5", desc: "Your slot is officially locked into the calendar." },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="border border-secondary/40 bg-black/60 p-4 flex flex-col justify-between"
                >
                  <span className="font-space text-xs font-bold text-primary tracking-widest uppercase mb-2">
                    {s.step}
                  </span>
                  <p className="font-space text-xs text-zinc-200 leading-snug">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deposit Policy */}
            <div className="border border-primary/80 bg-gradient-to-br from-[#160202] to-[#090909] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="w-6 h-6 text-primary" />
                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase m-0">
                  DEPOSIT POLICY
                </h4>
              </div>

              <div className="inline-block py-1 px-3 bg-primary text-white font-space text-xs tracking-widest uppercase font-bold mb-4">
                NO DEPOSIT = NO BOOKING
              </div>

              <p className="font-space text-xs text-zinc-200 leading-relaxed mb-3">
                Selecting a slot does not mean the booking is confirmed. Your session is only officially locked once the required deposit has been received.
              </p>
              <p className="font-space text-xs text-zinc-400 leading-relaxed">
                The deposit reserves your time and removes that slot from availability for other clients.
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="border border-secondary/60 bg-[#090909] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase m-0">
                  CANCELLATION POLICY
                </h4>
              </div>

              <div className="space-y-4 font-space text-xs">
                <div className="p-3 bg-black border border-secondary/40">
                  <span className="text-white font-bold uppercase tracking-wider block mb-1">
                    CANCEL WITHIN 24 HOURS
                  </span>
                  <span className="text-zinc-300">
                    If you cancel within the first 24 HOURS, 50% of the deposit is refundable.
                  </span>
                </div>

                <div className="p-3 bg-black border border-primary/50">
                  <span className="text-primary font-bold uppercase tracking-wider block mb-1">
                    AFTER 24 HOURS
                  </span>
                  <span className="text-zinc-300">
                    After 24 hours, the deposit is completely <strong className="text-white">NON-REFUNDABLE</strong>.
                  </span>
                </div>
              </div>
            </div>

            {/* Rescheduling & Additional Time */}
            <div className="border border-secondary/60 bg-[#090909] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase m-0">
                  RESCHEDULING &amp; ADDITIONAL TIME
                </h4>
              </div>

              <div className="space-y-3 font-space text-xs text-zinc-300 leading-relaxed">
                <p>
                  <strong className="text-white uppercase tracking-wider block mb-1">
                    RESCHEDULING:
                  </strong>
                  Need to change your session time? Contact us as early as possible. Rescheduling is subject to available slots. A new time is only confirmed after availability has been checked.
                </p>
                <div className="border-t border-secondary/30 pt-3">
                  <strong className="text-white uppercase tracking-wider block mb-1">
                    ADDITIONAL TIME:
                  </strong>
                  Recording is 500 EGP / HOUR (Min. 2 hours). Any time beyond the booked session is charged as Extra Time. Additional work outside the agreed package is quoted separately before proceeding.
                </div>
              </div>
            </div>

            {/* Final Delivery */}
            <div className="border border-secondary/60 bg-[#090909] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-primary" />
                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase m-0">
                  FINAL DELIVERY TIMELINE
                </h4>
              </div>

              <div className="space-y-3 font-space text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                  <span>
                    <strong className="text-white">ROUGH MIX:</strong> Delivered for review so you can verify the sonic direction.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                  <span>
                    <strong className="text-white">1 FREE REVISION:</strong> Included with every Mix + Master package.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
                  <span>
                    <strong className="text-white">FINAL MIX + MASTER:</strong> Normally delivered within <strong className="text-primary">4–7 DAYS</strong>.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section id="faq" className="py-20 border-t border-secondary/60 bg-[#060606] scroll-mt-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
              SESSION INTELLIGENCE // FAQ
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ 17 ANSWERS TO EVERYTHING YOU NEED TO KNOW ]
            </p>
          </div>

          <div className="space-y-3 font-space">
            {faqsData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-secondary/60 bg-[#090909] transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm text-white uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-secondary/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ready to Build Your Record? Bottom Final CTA */}
      <section className="py-20 border-t border-primary/50 bg-gradient-to-b from-[#180202] via-[#090909] to-[#050505]">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/20 text-primary font-space text-[10px] tracking-[0.25em] uppercase mb-6 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SESSION INITIATION // CLAIMS &amp; RATES</span>
          </div>

          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-none mb-4">
            READY TO BUILD <span className="text-primary">YOUR RECORD?</span>
          </h2>

          <p className="font-space text-sm sm:text-base text-zinc-200 uppercase tracking-widest max-w-2xl mx-auto mb-2 font-medium">
            FROM A READY-MADE BEAT TO A COMPLETE ORIGINAL RECORD.
          </p>
          <p className="font-space text-xs text-muted uppercase tracking-[0.2em] max-w-xl mx-auto mb-10">
            Choose exactly what your project needs.
          </p>

          {/* Quick Rates Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 text-center font-space">
            <div className="border border-secondary/40 bg-black/60 p-3">
              <span className="text-[10px] text-zinc-400 block uppercase">RECORD</span>
              <span className="text-xs font-bold text-white">500 EGP / HR</span>
            </div>
            <div className="border border-secondary/40 bg-black/60 p-3">
              <span className="text-[10px] text-zinc-400 block uppercase">MIX + MASTER</span>
              <span className="text-xs font-bold text-white">1,500 EGP</span>
            </div>
            <div className="border border-secondary/40 bg-black/60 p-3">
              <span className="text-[10px] text-zinc-400 block uppercase">EXECUTION</span>
              <span className="text-xs font-bold text-white">2,000 EGP</span>
            </div>
            <div className="border border-secondary/40 bg-black/60 p-3">
              <span className="text-[10px] text-zinc-400 block uppercase">CUSTOM BEAT</span>
              <span className="text-xs font-bold text-white">3,000–5,000+</span>
            </div>
            <div className="border border-primary/50 bg-primary/10 p-3">
              <span className="text-[10px] text-primary block uppercase font-bold">BUNDLE</span>
              <span className="text-xs font-bold text-white">5,000–7,000+</span>
            </div>
            <div className="border border-primary/50 bg-primary/10 p-3">
              <span className="text-[10px] text-primary block uppercase font-bold">FULL PROJECT</span>
              <span className="text-xs font-bold text-white">6,000–8,000+</span>
            </div>
          </div>

          <div className="p-4 bg-black/80 border border-secondary/50 font-space text-xs text-zinc-300 max-w-2xl mx-auto mb-8">
            <span className="text-white font-bold uppercase tracking-wider block mb-1">
              Select your service → Choose your slot → Contact us on WhatsApp → Pay your deposit → Your session is locked.
            </span>
            <span className="text-primary font-bold tracking-widest uppercase text-[11px]">
              NO DEPOSIT = NO BOOKING.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/+201011444140?text=${encodeURIComponent(
                "Hey GR8NIK Studios, I'm ready to build my record. I want to confirm my service, time slot, and deposit."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-5 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(214,0,0,0.4)] border border-primary font-bold cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5 text-emerald-400" />
              <span>LOCK YOUR SESSION VIA WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={calendarBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-secondary text-muted hover:border-primary hover:text-white bg-[#0a0a0a] font-space text-xs uppercase tracking-widest px-8 py-5 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>CHOOSE AVAILABLE TIME SLOT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
