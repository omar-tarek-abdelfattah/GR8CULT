'use client';

import { useState, useEffect, useRef } from 'react';
import { Music2, Mail, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './AboutTabs.css';

const tabs = [
  "THE MAN BEHIND IT",
  "OUR FUTURE",
  "JOIN THE CULT",
  "CONTACT US"
];

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const contactMapContainer = useRef<HTMLDivElement>(null);
  const contactMap = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (activeTab !== 3) {
      if (contactMap.current) {
        contactMap.current.remove();
        contactMap.current = null;
      }
      return;
    }

    const timer = setTimeout(() => {
      if (!contactMapContainer.current || contactMap.current) return;

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

      const mapInstance = new mapboxgl.Map({
        container: contactMapContainer.current,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || '',
        center: [31.318819202238007, 30.011750165945585],
        zoom: 14.2,
        interactive: false
      });

      new mapboxgl.Marker({ color: "#d60000" })
        .setLngLat([31.318819202238007, 30.011750165945585])
        .addTo(mapInstance);

      contactMap.current = mapInstance;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (contactMap.current) {
        contactMap.current.remove();
        contactMap.current = null;
      }
    };
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap border-b border-secondary/50 mb-12">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`
              font-space text-xs md:text-sm tracking-[0.2em] uppercase py-4 px-6 md:px-8 transition-colors
              ${activeTab === index
                ? 'border-b-2 border-primary text-white bg-secondary/10'
                : 'text-muted hover:text-white hover:bg-secondary/5'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="w-full min-h-[400px]">
        {/* Tab 1: The Man Behind It */}
        {activeTab === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 relative group overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#d60000_1px,transparent_1px)] bg-[size:16px_16px] z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10 pointer-events-none"></div>
                <img
                  src="/ahmedy-hero-2-bg.jpeg"
                  alt="Ahmedy"
                  className="w-full h-auto filter grayscale contrast-125 opacity-90 transition-all duration-500"
                />
                <img
                  src="/ahmedy-hero-bg.jpeg"
                  alt="Ahmedy Hover"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-0 group-hover:opacity-100 transition-all duration-500"
                />

                <div className="absolute top-4 left-0 w-full p-6 z-20 pointer-events-none">
                  <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-wider m-0">VISIONARY // ARCHITECT</h2>
                </div>
              </div>
              <div className="w-full md:w-2/3 pt-2">
                <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-wider m-0 drop-shadow-md">AhmedyTheGr8</h2>
                <p className="font-space text-lg text-white leading-relaxed mb-4">
                  Born from a relentless obsession with sonic perfection, GR8NIK emerged as a response to the compromised quality of modern independent Egyptian releases. The architect behind the cult has spent the better part of the last decade dissecting soundscapes, engineering records, and studying the visceral impact of frequency manipulation.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img src="/ahmedy-working-1.jpeg" alt="" className='w-full h-auto' />
                  </div>
                  <div>
                    <img src="/ahmedy-working-2.jpeg" alt="" className='w-full h-auto' />
                  </div>
                </div>

                <p className="font-space text-lg text-white leading-relaxed mb-4">
                  "It’s not just a Fixed Preset or the clearest sound. It’s about manifesting an energy that outlives the creator and transcends the sense of hearing."
                </p>
                <p className="font-space text-lg text-white leading-relaxed">
                  Combining raw analog warmth with surgical digital precision, the goal has always been singular: to build an empire where artists don't just record music, but forge timeless cultural artifacts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Our Future */}
        {activeTab === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-bebas text-4xl text-white mb-6 tracking-wider">ROADMAP // EXPANSION</h2>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-secondary p-6 bg-[#0a0a0a]">
                    <h3 className="font-space text-lg tracking-widest text-primary mb-4 uppercase">PHASE 01 // THE FOUNDATION</h3>
                    <p className="font-space text-md text-muted leading-relaxed">
                      Establish the premier independent facility in Cairo. A sanctuary for artists demanding uncompromising audio fidelity. (STATUS: COMPLETE)
                    </p>
                  </div>
                  <div className="border border-secondary p-6 bg-[#0a0a0a]">
                    <h3 className="font-space text-lg tracking-widest text-primary mb-4 uppercase">PHASE 02 // THE ROSTER</h3>
                    <p className="font-space text-md text-muted leading-relaxed">
                      Transition from a commercial facility to an independent label powerhouse, signing and developing the avant-garde voices of the next generation.
                    </p>
                  </div>
                  <div className="border border-secondary p-6 bg-[#0a0a0a]">
                    <h3 className="font-space text-lg tracking-widest text-primary mb-4 uppercase">PHASE 03 // GLOBAL BROADCAST</h3>
                    <p className="font-space text-md text-muted leading-relaxed">
                      Launch the GR8CULT media division. Live performance series, documentaries, and a global distribution network for cult affiliates.
                    </p>
                  </div>
                  <div className="border border-secondary p-6 bg-[#0a0a0a] border-dashed">
                    <h3 className="font-space text-lg tracking-widest text-muted mb-4 uppercase">[ CLASSIFIED DIRECTIVE ]</h3>
                    <p className="font-space text-md text-secondary leading-relaxed">
                      DATA ENCRYPTED. AWAITING CLEARANCE.
                    </p>
                  </div>
                </div>
              </div>

              {/* Picture on the right with aura & glowing border on hover */}
              <div className="w-full lg:w-1/3 flex justify-center items-center">
                <div className="mic-aura-container relative group w-full max-w-sm cursor-pointer">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src="/MIC.png"
                      alt="GR8 Microphone"
                      className="w-full h-auto object-contain"
                    />
                    <img
                      src="/mic-w-bg.jpeg"
                      alt="GR8 Microphone with Background"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Join the Cult */}
        {activeTab === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              <div className="w-full lg:w-3/5">
                <h2 className="font-bebas text-4xl text-white mb-6 tracking-wider">NETWORK // ASSOCIATES</h2>
                <p className="font-space text-lg text-muted leading-relaxed mb-8 max-w-2xl">
                  GR8CULT is an exclusive network of producers, engineers, and visionaries. Connect with us across our secure channels to monitor operations and upcoming releases.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => window.open('https://www.instagram.com/gr8nikstudios/', '_blank', 'noopener,noreferrer')} className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                    <FaInstagram className="w-4 h-4" /> [ INITIATE LINK ]
                  </button>
                  {/* <button onClick={() => window.open('https://twitter.com', '_blank', 'noopener,noreferrer')} className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                    <FaTwitter className="w-4 h-4" /> [ INITIATE LINK ]
                  </button> */}
                  <button onClick={() => window.open('https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA', '_blank', 'noopener,noreferrer')} className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                    <FaYoutube className="w-4 h-4" /> [ INITIATE LINK ]
                  </button>
                  <button onClick={() => window.open('https://open.spotify.com/artist/72v5C9amne1zphSU3n7H3u?si=jkBSHQTFQU-ayMHGZN7ndA', '_blank', 'noopener,noreferrer')} className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                    <Music2 className="w-4 h-4" /> [ INITIATE LINK ]
                  </button>
                </div>
              </div>

              {/* Logo on the right */}
              <div className="w-full lg:w-2/5 flex justify-center items-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] max-w-full flex items-center justify-center">
                  <img
                    src="/logo-nobg.png"
                    alt="GR8CULT Logo"
                    className="w-full h-full object-contain opacity-85 hover:opacity-100 transition-all duration-500 hover:scale-105 drop-shadow-[0_0_35px_rgba(214,0,0,0.35)] hover:drop-shadow-[0_0_55px_rgba(214,0,0,0.7)]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Contact Us */}
        {activeTab === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Left Column: Direct Contact Links */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="font-bebas text-4xl text-white mb-2 tracking-wider">DIRECT LINE // TRANSMISSION</h2>
                  <p className="font-space text-sm text-muted uppercase tracking-[0.2em] mb-6">
                    [ SECURE COMMS // STUDIO INQUIRIES &amp; BOOKINGS ]
                  </p>
                </div>

                <div className="flex flex-col gap-4 flex-grow justify-between">
                  {/* WhatsApp Link */}
                  <a
                    href="https://wa.me/+201011444140"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-secondary bg-[#0a0a0a] p-5 flex items-center justify-between hover:border-primary transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-secondary/50 flex items-center justify-center bg-black group-hover:border-primary transition-colors flex-shrink-0">
                        <FaWhatsapp className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-space text-[10px] text-muted tracking-widest uppercase block">PRIMARY CHANNEL</span>
                        <h3 className="font-bebas text-xl text-white tracking-wider">WHATSAPP CHAT</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-space text-xs text-primary group-hover:text-white transition-colors">
                      <span className="hidden sm:inline">START CHAT</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>

                  {/* Email Link */}
                  <a
                    href="mailto:gr8nikstudios@gmail.com"
                    className="border border-secondary bg-[#0a0a0a] p-5 flex items-center justify-between hover:border-primary transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-secondary/50 flex items-center justify-center bg-black group-hover:border-primary transition-colors flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-space text-[10px] text-muted tracking-widest uppercase block">OFFICIAL DISPATCH</span>
                        <h3 className="font-bebas text-xl text-white tracking-wider">gr8nikstudios@gmail.com</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-space text-xs text-primary group-hover:text-white transition-colors">
                      <span className="hidden sm:inline">SEND EMAIL</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>

                  {/* Phone Link */}
                  <a
                    href="tel:+201092501573"
                    className="border border-secondary bg-[#0a0a0a] p-5 flex items-center justify-between hover:border-primary transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 border border-secondary/50 flex items-center justify-center bg-black group-hover:border-primary transition-colors flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-space text-[10px] text-muted tracking-widest uppercase block">VOICE FREQUENCY</span>
                        <h3 className="font-bebas text-xl text-white tracking-wider">+20 109 250 1573</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-space text-xs text-primary group-hover:text-white transition-colors">
                      <span className="hidden sm:inline">CALL DIRECT</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Studio Map */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h2 className="font-bebas text-4xl text-white mb-2 tracking-wider">STUDIO LOCATION // CAIRO</h2>
                <p className="font-space text-sm text-muted uppercase tracking-[0.2em] mb-6">
                  [ CLICK MAP TO NAVIGATE VIA GOOGLE MAPS ]
                </p>
                <a
                  href="https://maps.app.goo.gl/8GVuSJFKQ2Np81CB9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full flex-grow min-h-[320px] border border-secondary/50 grayscale hover:grayscale-0 transition-all duration-700 bg-[#050505] p-2 block group overflow-hidden cursor-pointer"
                  title="Open GR8NIK on Google Maps"
                >
                  <div
                    ref={contactMapContainer}
                    className="w-full h-full min-h-[300px]"
                  />
                  <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none group-hover:from-black/60 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-space text-[10px] text-muted tracking-widest uppercase bg-black/80 px-2.5 py-1 border border-secondary/50 backdrop-blur-sm">
                        CAIRO_DISTRICT_COORD
                      </span>
                      <span className="font-space text-[10px] text-primary tracking-widest uppercase bg-black/80 px-2.5 py-1 border border-secondary/50 backdrop-blur-sm">
                        31.3188° E, 30.0117° N
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-space text-xs text-white tracking-widest bg-black/85 px-4 py-2 border border-secondary/60 group-hover:border-primary group-hover:text-primary transition-all w-fit backdrop-blur-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>OPEN IN GOOGLE MAPS &gt;</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
