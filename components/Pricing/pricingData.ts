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

export const servicesData: ServiceItem[] = [
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
    oldPrice: "3,000",
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
    oldPrice: "4000",
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
    id: "beat-track-bundle",
    number: "05",
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
    badge: "★ MOST COMPLETE EXPERIENCE ★",
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

export const comparisonTable: ComparisonRow[] = [
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

export const decisionCards: DecisionCard[] = [
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
    recommendation: "Exclusive Vault Drops",
    price: "The Vault / Exclusive",
    detail:
      "Explore our curated instrumentals and limited beat drops in The Vault to lease or unlock exclusive stems.",
    linkId: "/vault",
    cta: "Explore The Vault",
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

export const processSteps: ProcessStep[] = [
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
      "Our available beats and exclusive catalog drops are hosted directly in The Vault. You can stream showcase instrumentals and apply to license or unlock exclusive beats.",
  },
  {
    question: "WHAT IS THE DIFFERENCE BETWEEN A VAULT BEAT AND A CUSTOM BEAT?",
    answer:
      "VAULT BEAT: A finished showcase or catalog beat from our studio archive. You preview the production that matches your sound and apply to lease it. CUSTOM BEAT: A 100% original production designed from scratch specifically around your references, vocal tone, and creative vision (from 3,000 EGP+).",
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
      "Booking takes under 60 seconds: 1. Pick your time slot directly on our live studio calendar. 2. Confirm your session details in the booking drawer. 3. Transfer the required deposit (Vodafone Cash / InstaPay) to officially lock your session into the calendar.",
  },
];
