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
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface PricingPackage {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  badge?: string;
  isPriority?: boolean;
  priceNote: string;
  features: string[];
  whatsappMessage: string;
  ctaText: string;
  icon: typeof Sparkles;
}

const packages: PricingPackage[] = [
  {
    id: "hourly",
    tag: "TIER 01 // BOOTH ACCESS",
    name: "HOURLY RECORDING",
    subtitle:
      "Pure studio booth time for vocalists, rappers, and producers needing pristine tracking with an experienced engineer on the board.",
    priceNote: "500 EGP PER HOUR // MIN. 2 HOURS",
    icon: Clock,
    features: [
      "World-class vocal chain & analog preamps (Neumann / Universal Audio)",
      "Engineered live by AhmedyTheGr8 on Pro Tools / DAW",
      "Zero-latency monitoring with custom headphone mixes",
      "Raw multitrack WAV stems exported immediately at session end",
      "Access to creative lounge and listening room in Mokattam, Cairo",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I'd like to book studio recording hours. What is your hourly rate and upcoming availability?",
    ctaText: "BOOK HOURLY RECORDING",
  },
  {
    id: "full-project",
    tag: "TIER 02 // COMPLETE ARCHITECTURE",
    name: "FULL PROJECT PACKAGE",
    subtitle:
      "From blank canvas to radio-ready master. The ultimate GR8NIK sanctuary experience where the sound of your record is built from the ground up.",
    badge: "★ ★ ★ ★ ★ MOST WANTED PACKAGE",
    isPriority: true,
    priceNote: "ALL-INCLUSIVE SINGLE RATE // CUSTOM QUOTE",
    icon: Disc3,
    features: [
      "Custom Beat Production tailored to your vocal tone, style & artistic vision",
      "Dedicated Studio Recording Sessions with direct vocal production & coaching",
      "Comprehensive Vocal Tuning, Comping, Ad-lib Stacks & Harmony Alignment",
      "Full Multi-Track Analog/Digital Hybrid Mixing for maximum punch & spatial depth",
      "Commercial Master calibrated for Spotify, Apple Music & Club Sound Systems",
      "Direct 1-on-1 creative collaboration with AhmedyTheGr8 from start to finish",
      "Full Stem Pack (WAV Master, Clean, Instrumental, Acapella & TV Track)",
      "Priority Studio Scheduling & Comprehensive Revision Rounds Included",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I'm interested in the Full Project Package (Beat Production + Recording + Mix & Master). I'd like to discuss my project vision and get a quote.",
    ctaText: "START FULL PROJECT",
  },
  {
    id: "record-mix-master",
    tag: "TIER 03 // INDUSTRY STANDARD",
    name: "RECORD + MIX + MASTER",
    subtitle:
      "Bring your instrumental, step into the booth, and walk away with a release-ready, streaming-optimized commercial record.",
    priceNote: "FIXED SINGLE PACKAGE // INQUIRE VIA WHATSAPP",
    icon: Sliders,
    features: [
      "Dedicated studio vocal recording session in our treated acoustic booth",
      "Precision vocal tuning, timing alignment, cleanup, and de-essing",
      "Multi-stem hybrid mixing (analog warmth, surgical EQ, stereo imaging)",
      "Loudness-optimized final master ready for all major streaming platforms",
      "Commercial WAV & MP3 master files + performance playback mix",
      "Engineering, guidance, and critical listening by AhmedyTheGr8",
      "Revision rounds included to dial in the mix to your exact taste",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book the Record + Mix + Master Package. I have my instrumental ready and want to schedule a session.",
    ctaText: "BOOK RECORD + MIX + MASTER",
  },
];

const comparisonData = [
  {
    feature: "Custom Instrumental / Beat",
    hourly: "Artist provides",
    full: "Included (Built from scratch)",
    recordMixMaster: "Artist provides",
  },
  {
    feature: "Studio Recording Time",
    hourly: "By the hour",
    full: "Full dedicated sessions",
    recordMixMaster: "Dedicated single session",
  },
  {
    feature: "Vocal Comping & Pitch Tuning",
    hourly: "Optional add-on",
    full: "Included (Full vocal edit)",
    recordMixMaster: "Included",
  },
  {
    feature: "Hybrid Analog/Digital Mix",
    hourly: "—",
    full: "Included (Full multi-stem)",
    recordMixMaster: "Included",
  },
  {
    feature: "Streaming Master (WAV/MP3)",
    hourly: "—",
    full: "Included (Radio/Club ready)",
    recordMixMaster: "Included",
  },
  {
    feature: "Deliverable Files",
    hourly: "Raw tracking stems",
    full: "Master, Inst, Acapella, Stems",
    recordMixMaster: "Master, Inst, Performance WAV",
  },
  {
    feature: "Creative Direction & Guidance",
    hourly: "Standard tracking",
    full: "Full 1-on-1 architecture",
    recordMixMaster: "Vocal production & mix notes",
  },
  {
    feature: "Revision Rounds",
    hourly: "Live in-session",
    full: "Unlimited until approved",
    recordMixMaster: "Included rounds",
  },
];

const faqs = [
  {
    question: "HOW DO I INITIATE AND CONFIRM A BOOKING?",
    answer:
      "Click the package that fits your project to open a pre-filled WhatsApp message directly with our studio manager. We'll confirm available calendar dates, session requirements, and payment details. Your slot is confirmed once the deposit is received.",
  },
  {
    question: "WHERE IS GR8NIK STUDIOS LOCATED?",
    answer:
      "GR8NIK STUDIOS is based in Mokattam, Cairo, Egypt. For privacy and security reasons, exact street address and GPS pin directions are sent automatically upon session booking confirmation.",
  },
  {
    question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
    answer:
      "We accept InstaPay, Vodafone Cash, local Egyptian bank transfers, and cash at the studio. International clients can also pay via direct wire transfer.",
  },
  {
    question: "WHAT SHOULD I BRING TO MY SESSION?",
    answer:
      "Bring your instrumental or project stems on a USB flash drive or have them ready in a cloud link (Google Drive / WeTransfer). Make sure any lyric sheets or reference tracks are ready on your phone.",
  },
  {
    question: "HOW LONG DOES MIXING AND MASTERING TAKE?",
    answer:
      "Standard turnaround for Record + Mix + Master is 3 to 5 business days after recording wraps. Rush turnaround is available upon request.",
  },
];

export default function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-background min-h-screen text-foreground pb-24">
      {/* Hero Header */}
      <section className="border-b border-secondary pt-16 pb-12 relative overflow-hidden bg-gradient-to-b from-black via-background to-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-primary/50 bg-primary/10 text-primary font-space text-[11px] tracking-[0.25em] uppercase mb-6 shadow-[0_0_12px_rgba(214,0,0,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO RATES // SANCTUARY ARCHITECTURE</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase text-white mb-4 leading-none">
            STUDIO <span className="text-primary">PACKAGES</span> &amp; RATES
          </h1>

          <p className="font-space text-xs sm:text-sm text-muted uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed mb-6">
            [ 3 TAILORED TIERS // CREATIVE ACCESS // CAIRO ]
          </p>

          <p className="font-space text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Every record has different needs. Whether you need raw hours in the booth,
            a full single engineered to commercial standards, or an end-to-end sonic
            identity built from scratch with <span className="text-white font-bold">AhmedyTheGr8</span>.
          </p>
        </div>
      </section>

      {/* 3 Packages Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const IconComponent = pkg.icon;
              const whatsappUrl = `https://wa.me/+201011444140?text=${encodeURIComponent(
                pkg.whatsappMessage
              )}`;

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between transition-all duration-500 bg-[#080808] border ${
                    pkg.isPriority
                      ? "border-primary lg:-translate-y-4 shadow-[0_0_40px_rgba(214,0,0,0.3)] bg-gradient-to-b from-[#140202] via-[#090909] to-[#050505] ring-1 ring-primary/60"
                      : "border-secondary/60 hover:border-primary/60 shadow-lg"
                  }`}
                >
                  {/* Top Badge for Priority Package */}
                  {pkg.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-primary text-white font-space text-[10px] tracking-[0.2em] uppercase px-4 py-1 shadow-[0_0_15px_#D60000] flex items-center gap-1.5 font-bold">

                      {pkg.badge}
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="p-6 sm:p-8 border-b border-secondary/50">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-space text-[10px] tracking-[0.25em] text-primary uppercase">
                        {pkg.tag}
                      </span>
                      <IconComponent
                        className={`w-5 h-5 ${
                          pkg.isPriority ? "text-primary" : "text-muted"
                        }`}
                      />
                    </div>

                    <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider m-0">
                      {pkg.name}
                    </h2>

                    <div className="mt-3 py-1.5 px-3 bg-black/60 border border-secondary/40 font-space text-[11px] text-zinc-300 tracking-wider inline-block">
                      {pkg.priceNote}
                    </div>

                    <p className="font-space text-xs text-muted leading-relaxed mt-4">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="p-6 sm:p-8 flex-grow">
                    <div className="font-space text-[10px] tracking-[0.2em] text-zinc-400 uppercase mb-4">
                      [ INCLUDED IN THIS TIER ]
                    </div>
                    <ul className="space-y-3.5 font-space text-xs text-zinc-200">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 w-4 h-4 rounded-none flex items-center justify-center shrink-0 border ${
                              pkg.isPriority
                                ? "bg-primary/20 border-primary text-primary"
                                : "bg-secondary/40 border-secondary text-zinc-400"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Footer */}
                  <div className="p-6 sm:p-8 pt-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-4 px-6 font-space text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer ${
                        pkg.isPriority
                          ? "bg-primary hover:bg-white text-white hover:text-black shadow-[0_0_20px_rgba(214,0,0,0.5)] border border-primary hover:border-white font-bold"
                          : "border border-secondary hover:border-primary bg-black hover:bg-primary text-zinc-200 hover:text-white"
                      }`}
                    >
                      <FaWhatsapp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{pkg.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <span className="block text-center font-space text-[10px] text-muted tracking-wider uppercase mt-2.5">
                      Direct WhatsApp with Studio Manager
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="py-16 border-t border-secondary/60 bg-[#060606]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              SIDE-BY-SIDE BREAKDOWN
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wider uppercase m-0">
              PACKAGE COMPARISON MATRIX
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
              [ EVERY FEATURE TRANSPARENTLY SPECIFIED ]
            </p>
          </div>

          <div className="overflow-x-auto border border-secondary/60 bg-[#090909]">
            <table className="w-full text-left border-collapse font-space text-xs">
              <thead>
                <tr className="border-b border-secondary/60 bg-black/90 text-white">
                  <th className="p-4 sm:p-5 uppercase tracking-wider font-semibold text-zinc-400">
                    SERVICE CAPABILITY
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider font-semibold text-zinc-300">
                    HOURLY RECORDING
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider font-bold text-primary bg-primary/10 border-x border-primary/40">
                    FULL PROJECT (FLAGSHIP)
                  </th>
                  <th className="p-4 sm:p-5 uppercase tracking-wider font-semibold text-zinc-300">
                    RECORD + MIX + MASTER
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/40 text-zinc-300">
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="p-4 sm:p-5 text-white font-medium">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-400">{row.hourly}</td>
                    <td className="p-4 sm:p-5 text-white bg-primary/5 border-x border-primary/30 font-semibold">
                      {row.full}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-300">
                      {row.recordMixMaster}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Studio Amenities Banner */}
      <section className="py-16 border-t border-secondary/60 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border border-secondary/40 bg-[#080808] p-5">
              <Mic className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="font-bebas text-xl text-white tracking-wide">
                NEUMANN &amp; UA CHAIN
              </div>
              <p className="font-space text-[10px] text-muted uppercase tracking-wider mt-1">
                Pristine Analog Front-End
              </p>
            </div>
            <div className="border border-secondary/40 bg-[#080808] p-5">
              <Layers className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="font-bebas text-xl text-white tracking-wide">
                ISOLATED BOOTH
              </div>
              <p className="font-space text-[10px] text-muted uppercase tracking-wider mt-1">
                Acoustically Treated Space
              </p>
            </div>
            <div className="border border-secondary/40 bg-[#080808] p-5">
              <Sliders className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="font-bebas text-xl text-white tracking-wide">
                HYBRID ANALOG MIX
              </div>
              <p className="font-space text-[10px] text-muted uppercase tracking-wider mt-1">
                Warmth, Punch &amp; Clarity
              </p>
            </div>
            <div className="border border-secondary/40 bg-[#080808] p-5">
              <Disc3 className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="font-bebas text-xl text-white tracking-wide">
                AHMEDYTHEGR8
              </div>
              <p className="font-space text-[10px] text-muted uppercase tracking-wider mt-1">
                Chief Audio Engineer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-t border-secondary/60 bg-[#060606]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wider uppercase m-0">
              SESSION INTELLIGENCE // FAQ
            </h2>
          </div>

          <div className="space-y-3 font-space">
            {faqs.map((faq, index) => {
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
                    <div className="px-5 pb-5 pt-1 text-xs text-muted leading-relaxed border-t border-secondary/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Booking CTA Banner */}
      <section className="py-16 border-t border-secondary bg-gradient-to-r from-[#120202] via-[#090909] to-[#050505]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase mb-3">
            NEED A CUSTOM EP OR ALBUM DEAL?
          </h2>
          <p className="font-space text-xs sm:text-sm text-muted uppercase tracking-[0.2em] max-w-xl mx-auto mb-8">
            Tell us about your project, timeline, and track count. We construct customized rates for full projects and multi-track projects.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/+201011444140?text=${encodeURIComponent(
                "Hey GR8NIK Studios, I want to discuss a custom project / multi-track package. Here are the details:"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(214,0,0,0.3)] border border-primary font-bold cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-400" />
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3LvlOtrmBmmhsShjPRpw0gZjUH2IUfHPInqNnD0fEmuxQ2tAu28FSXvEE4AfdRtF6RpuQfr1z-"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-secondary text-muted hover:border-primary hover:text-white bg-[#0a0a0a] font-space text-xs uppercase tracking-widest px-8 py-4 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>VIEW CALENDAR SLOTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
