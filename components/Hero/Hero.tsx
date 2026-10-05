'use client';

import Link from "next/link";
import { Disc } from "lucide-react";
import HeroVideoSlider from "./HeroVideoSlider";
import { useLanguage } from "@/context/LanguageContext";
import './Hero.style.css';

export default function Hero() {
  const { dict } = useLanguage();

  return (
    <section className="relative w-full h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-5 border-b border-secondary overflow-hidden bg-background px-4 md:px-12 py-12 lg:py-0">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Left side: Text Content */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-start w-full max-w-2xl gap-6">
        <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none drop-shadow-2xl text-center md:text-start">
          {dict.hero.headline1}<br />
          <span className="text-primary pseudo">{dict.hero.headline2}</span>
        </h1>

        <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2 text-center md:text-start">
          {dict.hero.sub1}<br />
          {dict.hero.sub2}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-4 mt-8 w-full sm:w-auto">
          <Link href="/pricing" className="bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary transition-colors rounded-none text-center border border-primary hover:border-secondary">
            {dict.hero.lockIn}
          </Link>
          <Link
            href="/vault"
            className="flex items-center justify-center gap-3 border border-secondary text-zinc-100 font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:bg-primary/15 hover:text-white hover:shadow-[0_0_20px_rgba(214,0,0,0.4)] transition-all rounded-none bg-background/50 backdrop-blur-sm group text-center"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
            </span>
            <Disc className="w-3.5 h-3.5 text-primary group-hover:rotate-180 transition-transform duration-500 shrink-0" />
            <span>{dict.hero.enterVault}</span>
          </Link>
        </div>
      </div>

      {/* Right side: Vertical Video Slider (Client Component) */}
      <HeroVideoSlider />
    </section>
  );
}
