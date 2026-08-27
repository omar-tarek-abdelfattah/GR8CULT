'use client';

import { useState } from 'react';
import { Music2 } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const tabs = [
  "THE MAN BEHIND IT",
  "OUR FUTURE",
  "JOIN THE CULT",
  "CONTACT US"
];

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState(0);

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
            <h2 className="font-bebas text-4xl text-white mb-6 tracking-wider">VISIONARY // ARCHITECT</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 aspect-square bg-[#050505] border border-secondary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#d60000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                <span className="font-space text-[10px] text-muted tracking-widest relative z-10">[ PHOTO_PLACEHOLDER ]</span>
              </div>
              <div className="w-full md:w-2/3">
                <p className="font-space text-sm text-muted leading-relaxed mb-4">
                  Born from a relentless obsession with sonic perfection, GR8NIK emerged as a response to the compromised quality of modern independent releases. The architect behind the cult has spent over a decade dissecting soundscapes, engineering records, and studying the visceral impact of frequency manipulation.
                </p>
                <p className="font-space text-sm text-muted leading-relaxed mb-4">
                  "It’s not just about pushing faders. It’s about manifesting an energy that outlives the creator."
                </p>
                <p className="font-space text-sm text-muted leading-relaxed">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-secondary p-6 bg-[#0a0a0a]">
                <h3 className="font-space text-xs tracking-widest text-primary mb-4 uppercase">PHASE 01 // THE FOUNDATION</h3>
                <p className="font-space text-sm text-muted leading-relaxed">
                  Establish the premier independent facility in Cairo. A sanctuary for artists demanding uncompromising audio fidelity. (STATUS: COMPLETE)
                </p>
              </div>
              <div className="border border-secondary p-6 bg-[#0a0a0a]">
                <h3 className="font-space text-xs tracking-widest text-primary mb-4 uppercase">PHASE 02 // THE ROSTER</h3>
                <p className="font-space text-sm text-muted leading-relaxed">
                  Transition from a commercial facility to an independent label powerhouse, signing and developing the avant-garde voices of the next generation.
                </p>
              </div>
              <div className="border border-secondary p-6 bg-[#0a0a0a]">
                <h3 className="font-space text-xs tracking-widest text-primary mb-4 uppercase">PHASE 03 // GLOBAL BROADCAST</h3>
                <p className="font-space text-sm text-muted leading-relaxed">
                  Launch the GR8CULT media division. Live performance series, documentaries, and a global distribution network for cult affiliates.
                </p>
              </div>
              <div className="border border-secondary p-6 bg-[#0a0a0a] border-dashed">
                <h3 className="font-space text-xs tracking-widest text-muted mb-4 uppercase">[ CLASSIFIED DIRECTIVE ]</h3>
                <p className="font-space text-sm text-secondary leading-relaxed">
                  DATA ENCRYPTED. AWAITING CLEARANCE.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Join the Cult */}
        {activeTab === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-bebas text-4xl text-white mb-6 tracking-wider">NETWORK // ASSOCIATES</h2>
            <p className="font-space text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              GR8CULT is an exclusive network of producers, engineers, and visionaries. Connect with us across our secure channels to monitor operations and upcoming releases.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                <FaInstagram className="w-4 h-4" /> [ INITIATE LINK ]
              </button>
              <button className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                <FaTwitter className="w-4 h-4" /> [ INITIATE LINK ]
              </button>
              <button className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                <FaYoutube className="w-4 h-4" /> [ INITIATE LINK ]
              </button>
              <button className="flex items-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all bg-[#0a0a0a]">
                <Music2 className="w-4 h-4" /> [ INITIATE LINK ]
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Contact Us */}
        {activeTab === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Booking Form */}
              <div className="w-full lg:w-1/2">
                <h2 className="font-bebas text-4xl text-white mb-6 tracking-wider">TACTICAL INQUIRY</h2>
                <form className="flex flex-col gap-4 font-space">
                  <input type="text" placeholder="NAME // ARTIST ALIAS" className="bg-[#0a0a0a] border border-secondary text-white text-xs tracking-widest p-4 focus:outline-none focus:border-primary transition-colors" />
                  <input type="text" placeholder="PHONE // WHATSAPP" className="bg-[#0a0a0a] border border-secondary text-white text-xs tracking-widest p-4 focus:outline-none focus:border-primary transition-colors" />
                  <select className="bg-[#0a0a0a] border border-secondary text-muted text-xs tracking-widest p-4 focus:outline-none focus:border-primary transition-colors appearance-none rounded-none">
                    <option>SELECT SERVICE_TIER</option>
                    <option>SINGLE VOCAL TRACK</option>
                    <option>FULL EP LOCKDOWN</option>
                    <option>MIXING & MASTERING</option>
                  </select>
                  <input type="date" className="bg-[#0a0a0a] border border-secondary text-muted text-xs tracking-widest p-4 focus:outline-none focus:border-primary transition-colors" />
                  <textarea placeholder="STEM_LINKS // NOTES" rows={4} className="bg-[#0a0a0a] border border-secondary text-white text-xs tracking-widest p-4 focus:outline-none focus:border-primary transition-colors"></textarea>
                  <button type="button" className="bg-primary text-white font-space text-xs tracking-widest uppercase py-4 hover:bg-white hover:text-black transition-colors mt-2">
                    TRANSMIT DATA
                  </button>
                </form>
              </div>
              
              {/* Blueprint */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h2 className="font-bebas text-4xl text-white mb-6 tracking-wider">ACOUSTIC BLUEPRINT</h2>
                <div className="border border-secondary bg-[#0a0a0a] flex-grow p-6 relative overflow-hidden flex flex-col justify-center items-center group min-h-[300px]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  {/* Map/Blueprint mockup */}
                  <div className="w-64 h-64 border border-secondary/50 relative flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-primary animate-ping opacity-50 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary"></div>
                    <span className="font-space text-[10px] text-muted tracking-widest mt-12">CAIRO_DISTRICT_COORD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
