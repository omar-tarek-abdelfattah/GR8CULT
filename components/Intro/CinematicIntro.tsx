"use client";
import { useState, useEffect } from "react";

export default function CinematicIntro() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("gr8cult_intro_seen");
    if (!hasSeenIntro) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowIntro(true);
      // Auto-hide after 6 seconds
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("gr8cult_intro_seen", "true");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSkip = () => {
    setShowIntro(false);
    sessionStorage.setItem("gr8cult_intro_seen", "true");
  };

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Mock Video Container */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity"></div>
      
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="font-bebas text-7xl md:text-9xl text-primary animate-pulse tracking-widest uppercase">
          INITIATING
        </h1>
        <div className="flex gap-2">
           <div className="w-16 h-1 bg-secondary overflow-hidden">
             <div className="w-full h-full bg-primary animate-[slide_1s_ease-in-out_infinite]"></div>
           </div>
        </div>
      </div>

      <button 
        onClick={handleSkip}
        className="absolute bottom-12 border border-secondary text-muted font-space text-xs tracking-widest px-8 py-3 hover:bg-white hover:text-black hover:border-white transition-all uppercase z-20"
      >
        [ SKIP_INTRO ]
      </button>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
