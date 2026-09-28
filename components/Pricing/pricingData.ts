import {
  ServiceItem,
  ComparisonRow,
  DecisionCard,
  ProcessStep,
  StudioEquipment,
  FaqItem,
} from "./types";

export const CALENDAR_BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3LvlOtrmBmmhsShjPRpw0gZjUH2IUfHPInqNnD0fEmuxQ2tAu28FSXvEE4AfdRtF6RpuQfr1z-";

export const WHATSAPP_PHONE_NUMBER = "+201011444140";

export const CUSTOM_BOOKING_WHATSAPP_URL =
  "https://wa.me/+201011444140?text=Hey%20GR8NIK%20Studios%2C%20I%20want%20to%20inquire%20about%20a%20custom%20package%20or%20book%20a%20session%20online.";

export const servicesData: ServiceItem[] = [
  {
    id: "recording-only",
    number: "01",
    category: "service",
    title: "RECORDING ONLY",
    subtitle: "VOCAL & INSTRUMENT TRACKING",
    whatItOffers: "RECORDING ONLY",
    shortDescription: "Acoustic vocal booth tracking with engineer-assisted mic selection and raw stem export.",
    price: "500 EGP / HOUR",
    priceNote: "MINIMUM BOOKING: 2 HOURS",
    badge: "STUDIO TIME",
    includes: [
      "Professional vocal booth session & acoustic isolation",
      "Tailored microphone selection matched to your vocal tone",
      "Engineer-assisted tracking & session workflow setup",
      "Lead vocals, doubles, harmonies & ad-lib takes",
      "Clean raw stems exported at session wrap",
    ],
    notes: [
      "Typical recording workflow is completed within 2–3 hours for most songs.",
      "Additional studio time is charged at: 500 EGP / HOUR.",
      "Post-production mixing and mastering are not included in this hourly rate.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book a Recording Only session (500 EGP/hour, min 2 hours). What is your upcoming availability?",
    ctaText: "BOOK RECORDING SESSION",
  },
  {
    id: "mix-master-stems",
    number: "02",
    category: "service",
    title: "MIX & MASTERING (STEMS)",
    subtitle: "MULTI-TRACK STEMS → FINISHED RECORD",
    whatItOffers: "MIX + MASTER (STEMS)",
    shortDescription: "Multi-track stem mixing, surgical vocal tuning, spatial FX, and commercial club-ready master.",
    price: "40 – 50 USD",
    priceNote: "EQUIVALENT TO ~2,000 – 2,500 EGP",
    badge: "STEMS ONLY",
    includes: [
      "Multi-track stem balancing & hybrid analog/digital summing",
      "Surgical vocal tuning, timing alignment & pitch correction",
      "Creative spatial effects, dynamic EQ, saturation & parallel compression",
      "High-end commercial mastering optimized for Spotify, Apple Music & clubs",
      "Rough Mix preview & artist sign-off stage",
      "Full high-resolution master delivery (24-bit WAV & 320kbps MP3)",
      "1 FREE MIX REVISION INCLUDED",
    ],
    youBring: "Clean, zero-aligned WAV stems (dry vocals + beat tracks) + reference tracks.",
    weHandle: "Stem Balancing → Surgical FX & Tuning → Hybrid Mix → Commercial Master.",
    notes: [
      "Designed for artists who recorded elsewhere and need an industry-standard stem mix & master.",
      "Rate is 40 – 50 USD per song (equivalent to ~2,000 – 2,500 EGP depending on stem count & complexity).",
      "Online & remote delivery available with rapid digital turnaround.",
      "Includes 1 free revision round to ensure your sonic vision is fully met.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book the Mix & Mastering Stems package (40 - 50 USD / ~2,000 - 2,500 EGP). I have my audio stems ready.",
    ctaText: "BOOK STEM MIX & MASTER",
  },
  {
    id: "rec-mix-master",
    number: "03",
    category: "bundle",
    title: "REC + MIX + MASTER",
    subtitle: "YOUR BEAT → FINISHED RECORD",
    whatItOffers: "REC + MIX + MASTER",
    shortDescription: "Bring your beat. In-booth vocal direction, tracking, pitch tuning, hybrid mixing, and final master.",
    price: "2,000 EGP",
    oldPrice: "4,000",
    priceNote: "SAVE 2,000 EGP (WAS 4,000 EGP)",
    badge: "POPULAR SINGLE DEAL",
    includes: [
      "1-on-1 vocal direction & coaching in-booth",
      "Professional studio vocal recording session",
      "Surgical vocal editing, tuning & alignment",
      "Signature vocal processing & spatial effects",
      "Multi-stem hybrid mixing with your beat",
      "Streaming & club-ready final mastering",
      "Rough Mix delivery for artist review",
      "Final Master export package (WAV & MP3)",
      "1 FREE MIX REVISION INCLUDED",
    ],
    youBring: "Your beat / instrumental + lyrics & reference tracks.",
    weHandle: "Vocal Direction → Recording → Editing → Mix → Master.",
    notes: [
      "Designed for artists who already have the beat and want a release-ready track.",
      "Includes vocal direction to ensure the best possible performance.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book the Rec + Mix + Master package (2,000 EGP instead of 4,000 EGP). I have my beat and lyrics ready.",
    ctaText: "BOOK REC + MIX + MASTER",
  },
  {
    id: "beat-rec-mix-master",
    number: "04",
    category: "bundle",
    title: "BEAT + REC + MIX + MASTER",
    subtitle: "THE COMPLETE RECORD PACKAGE",
    whatItOffers: "BEAT + REC + MIX + MASTER",
    shortDescription: "Custom beat crafted from scratch, vocal coaching, recording, full mixing, and commercial master.",
    price: "3,000 EGP",
    oldPrice: "6,000",
    priceNote: "SAVE 3,000 EGP (WAS 6,000 EGP — 50% OFF)",
    badge: "★ ALL-IN-ONE RECORD PACKAGE ★",
    isFeatured: true,
    includes: [
      "Custom beat production crafted specifically for your voice & sound",
      "Song arrangement, signature sound design & drum programming",
      "Dedicated vocal direction & coaching in studio booth",
      "Professional studio vocal recording session",
      "Vocal editing, pitch correction & precision alignment",
      "Signature analog/digital hybrid multi-track mixing",
      "Commercial loudness streaming & club master",
      "Rough Mix review stage before final sign-off",
      "Full Master release package (WAV, MP3 & stems upon request)",
      "1 FREE MIX REVISION INCLUDED",
    ],
    youBring: "Your vocal ideas, concept & reference artists/tracks.",
    weHandle: "Custom Beat → Recording → Mix → Master → Final Release.",
    notes: [
      "Instead of booking production, studio time, and mixing separately, everything is handled under one complete project.",
      "Our most complete single-track package at half the standard separate rate.",
    ],
    whatsappMessage:
      "Hey GR8NIK Studios, I want to book the complete Beat + Rec + Mix + Master package (3,000 EGP instead of 6,000 EGP). I'm ready to build my record from scratch.",
    ctaText: "BOOK FULL RECORD PACKAGE",
  },
];

export const comparisonTable: ComparisonRow[] = [
  {
    service: "Recording Only",
    price: "500 EGP / HR",
    recording: "✓ (Min. 2 Hrs)",
    vocalDirection: "Session Assist",
    beat: "—",
    mix: "—",
    master: "—",
    roughMix: "—",
    revision: "—",
  },
  {
    service: "Mix & Master (Stems)",
    price: "40 – 50 USD (~2,000–2,500 EGP)",
    recording: "—",
    vocalDirection: "—",
    beat: "YOUR STEMS",
    mix: "✓ (Full Stems)",
    master: "✓",
    roughMix: "✓",
    revision: "1 FREE",
  },
  {
    service: "Rec + Mix + Master",
    price: "2,000 EGP (was 4,000)",
    recording: "✓",
    vocalDirection: "✓",
    beat: "YOUR BEAT",
    mix: "✓",
    master: "✓",
    roughMix: "✓",
    revision: "1 FREE",
    highlight: true,
  },
  {
    service: "Beat + Rec + Mix + Master",
    price: "3,000 EGP (was 6,000)",
    recording: "✓",
    vocalDirection: "✓",
    beat: "CUSTOM BEAT",
    mix: "✓",
    master: "✓",
    roughMix: "✓",
    revision: "1 FREE",
    highlight: true,
  },
];

export const decisionCards: DecisionCard[] = [
  {
    situation: "I ONLY NEED STUDIO RECORDING TIME.",
    recommendation: "Recording Only",
    price: "500 EGP / HOUR",
    detail:
      "Minimum 2 hours. Professional vocal recording booth with engineer-assisted tracking, mic selection, and raw stem export.",
    linkId: "recording-only",
    cta: "View Recording Only",
  },
  {
    situation: "I HAVE MY STEMS AND NEED MIXING & MASTERING.",
    recommendation: "Mix & Mastering (Stems)",
    price: "40 – 50 USD (~2,000–2,500 EGP)",
    detail:
      "Send your multi-track audio stems. We handle hybrid analog/digital mixing, vocal tuning, spatial FX, and club-ready master.",
    linkId: "mix-master-stems",
    cta: "View Stems Package",
  },
  {
    situation: "I HAVE THE BEAT AND NEED TO RECORD & FINISH.",
    recommendation: "Rec + Mix + Master",
    price: "2,000 EGP (was 4,000)",
    detail:
      "You bring the beat. We handle in-booth vocal direction, tracking, editing, hybrid mixing, mastering & 1 free revision.",
    linkId: "rec-mix-master",
    cta: "View Rec + Mix + Master",
  },
  {
    situation: "I WANT A COMPLETE TRACK BUILT FROM ZERO.",
    recommendation: "Beat + Rec + Mix + Master",
    price: "3,000 EGP (was 6,000)",
    detail:
      "All-in-one complete production: custom beat, vocal direction, studio recording session, full mix, and commercial master.",
    linkId: "beat-rec-mix-master",
    cta: "View Full Package",
  },
  {
    situation: "I NEED A CUSTOM PROJECT OR ONLINE BOOKING.",
    recommendation: "Custom / Online Inquiries",
    price: "WhatsApp Consult",
    detail:
      "EP / Album deals, bespoke sound design, commercial music, or direct online session booking with our engineering team.",
    linkId: "custom-booking",
    cta: "Chat on WhatsApp",
  },
];

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "REFERENCE & VISION",
    description:
      "We start with the sound you're aiming to achieve. Share reference songs, artists, moods, or production ideas. You don't need technical jargon to get your vision across.",
  },
  {
    num: "02",
    title: "CREATIVE DIRECTION",
    description:
      "We establish sonic direction before booth tracking: vocal energy, delivery style, effects chain, beat dynamics, and arrangement.",
  },
  {
    num: "03",
    title: "BEAT PRODUCTION",
    description:
      "If your package includes a custom beat, we build it from zero around your vocal range and style. If you already have your beat, we optimize it for tracking.",
  },
  {
    num: "04",
    title: "STUDIO RECORDING",
    description:
      "Your vocals are tracked in our treated booth with engineer guidance. 500 EGP / HOUR, minimum 2 hours. Most songs wrap tracking in ~2–3 hours.",
  },
  {
    num: "05",
    title: "SURGICAL EDIT & MIX",
    description:
      "Vocals are edited, tuned, and mixed with the production using hybrid analog/digital processing so the voice and beat become one unified record.",
  },
  {
    num: "06",
    title: "ROUGH MIX REVIEW",
    description:
      "You receive a rough mix preview to evaluate balance, presence, and direction before final mastering sign-off.",
  },
  {
    num: "07",
    title: "FREE REVISION",
    description:
      "Packages include 1 FREE MIX REVISION for adjustments to the existing mix based on the agreed creative vision.",
  },
  {
    num: "08",
    title: "COMMERCIAL MASTER",
    description:
      "The final master is optimized for Spotify, Apple Music, YouTube, and club systems. Normal delivery turnaround is 4–7 DAYS.",
  },
];

export const studioEquipments: StudioEquipment[] = [
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

export const faqsData: FaqItem[] = [
  {
    question: "WHAT SERVICES AND PACKAGES DO YOU OFFER?",
    answer:
      "We offer 3 core packages: 1. Recording Only (500 EGP / HOUR, min 2 hrs), 2. Rec + Mix + Master (2,000 EGP instead of 4,000 EGP), and 3. Beat + Rec + Mix + Master (3,000 EGP instead of 6,000 EGP). For custom packages, album projects, or online bookings, chat with us on WhatsApp.",
  },
  {
    question: "WHAT IS INCLUDED IN RECORDING ONLY?",
    answer:
      "Recording Only is 500 EGP / HOUR (minimum 2 hours). It includes acoustic booth time, mic selection matched to your voice, engineer-assisted tracking, and export of your clean raw stems at the end of the session. Mixing and mastering are not included.",
  },
  {
    question: "WHAT IS REC + MIX + MASTER?",
    answer:
      "Rec + Mix + Master is for artists who already have their beat. For 2,000 EGP (was 4,000 EGP), we handle vocal coaching in the booth, recording, pitch editing, hybrid mixing with your beat, commercial mastering, and 1 free mix revision.",
  },
  {
    question: "WHAT IS BEAT + REC + MIX + MASTER?",
    answer:
      "It is our complete all-in-one record package for 3,000 EGP (was 6,000 EGP). We build an original custom beat for you, coach and track your vocals in our studio, edit and mix the full multi-tracks, and deliver a release-ready commercial master.",
  },
  {
    question: "CAN I BOOK A CUSTOM PACKAGE OR ONLINE BOOKING?",
    answer:
      "Yes! If you have a multi-song project, need an EP/Album package, custom beat licensing, or want to coordinate an online session directly, use the WhatsApp button beneath the service packages to reach our team immediately.",
  },
  {
    question: "HOW LONG DOES RECORDING TAKE?",
    answer:
      "Most single tracks take approximately 2–3 hours to record cleanly. The minimum booking is 2 hours (1,000 EGP). Any additional recording hours are charged at 500 EGP / HOUR.",
  },
  {
    question: "DO I GET A ROUGH MIX AND REVISIONS?",
    answer:
      "Yes. Both Rec + Mix + Master and Beat + Rec + Mix + Master include a rough mix check-in and 1 FREE MIX REVISION. Additional revisions or complete re-tracking are charged separately.",
  },
  {
    question: "HOW LONG DOES MIXING + MASTERING TAKE?",
    answer:
      "Standard turnaround for finished mixing and mastering is 4–7 business days following your tracking session.",
  },
  {
    question: "HOW DO I LOCK MY BOOKING?",
    answer:
      "You can choose an available time slot on our live Google Calendar, or tap the WhatsApp button to coordinate directly with the studio. All bookings require a deposit (via Vodafone Cash or InstaPay) to confirm your slot.",
  },
];
