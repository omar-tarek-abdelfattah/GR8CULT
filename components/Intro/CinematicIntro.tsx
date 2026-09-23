"use client";
import { useState, useEffect } from "react";

export default function CinematicIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("gr8cult_intro_seen");
    if (!hasSeenIntro) {
      setShowIntro(true);

      // Hold message briefly, then start slide-up transition
      const slideTimer = setTimeout(() => {
        setIsSlidingUp(true);
      }, 1500);

      // Unmount after the slide-up animation completes
      const unmountTimer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("gr8cult_intro_seen", "true");
      }, 2300);

      return () => {
        clearTimeout(slideTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, []);

  const handleDismiss = () => {
    if (isSlidingUp) return;
    setIsSlidingUp(true);
    setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem("gr8cult_intro_seen", "true");
    }, 700);
  };

  if (!showIntro) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isSlidingUp ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      {/* Background Ambience: Subtle Studio Grid & Red Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 animate-in fade-in zoom-in-95 duration-500">
        <img
          src="/clean-crosshair-nobg.png"
          alt="GR8NIK Studios Crosshair"
          className="w-12 h-12 object-contain opacity-80 animate-pulse filter drop-shadow-[0_0_15px_rgba(214,0,0,0.6)]"
        />

        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-[0.16em] text-white uppercase flex items-center flex-col md:flex-row gap-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]">
          <span>WELCOME TO</span>
          <span className="text-primary drop-shadow-[0_0_30px_rgba(214,0,0,0.7)]">GR8NIK</span>
        </h1>

        <div className="inline-flex items-center gap-2 px-3 py-1 border border-secondary/50 bg-[#080808]/90 text-[10px] sm:text-xs font-space tracking-[0.25em] text-muted uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping"></span>
          <span>MOKATTAM, CAIRO // PRIVATE STUDIO</span>
        </div>
      </div>

      {/* Subtle indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 font-space text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
        <span className="text-[9px]">CLICK ANYWHERE TO SKIP</span>
        <div className="w-10 h-[2px] bg-primary/40 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
