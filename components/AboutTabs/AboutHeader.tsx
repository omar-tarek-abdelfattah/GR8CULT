'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutHeader() {
  const { dict } = useLanguage();
  return (
    <div className="container mx-auto px-4 relative z-10">
      <h1 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase text-white mb-2">
        {dict.about.identity}
      </h1>
      <p className="font-space text-xs md:text-sm text-muted mt-5 uppercase tracking-[0.2em]">
        {dict.about.tagline}
      </p>
    </div>
  );
}
