'use client';

import Link from "next/link";
import { MapPin, Disc } from "lucide-react";
import { FaTwitch, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const whatsappUrl = `https://wa.me/+201011444140?text=${encodeURIComponent(
    "Hey GR8NIK Studios, I'd like to get in touch regarding studio sessions, beats, or general inquiries."
  )}`;

  return (
    <footer className="relative w-full border-t border-secondary/60 bg-background mt-auto overflow-hidden">
      {/* Background Ambience: Subtle Grid & Red Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center gap-7">

        {/* Brand Emblem & Logo */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="group flex flex-col items-center gap-2 cursor-pointer">
            <img
              src="/clean-crosshair-nobg.png"
              alt="GR8NIK STUDIOS Crosshair Emblem"
              className="w-10 h-10 object-contain opacity-75 group-hover:opacity-100 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500 filter drop-shadow-[0_0_12px_rgba(214,0,0,0.4)]"
            />
            <img
              src="/logo-nobg.png"
              alt="GR8NIK STUDIOS Official Logo - Mokattam, Cairo"
              className="w-44 md:w-52 h-auto object-contain opacity-90 group-hover:opacity-100 drop-shadow-[0_0_25px_rgba(214,0,0,0.35)] transition-all duration-300"
            />
          </Link>

          {/* Studio Radar / Status Indicator */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 border border-secondary/50 bg-[#080808]/90 text-[11px] font-space tracking-[0.22em] text-muted uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>MOKATTAM, CAIRO // PRIVATE STUDIO</span>
          </div>
        </div>

        {/* Location Notice */}
        <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2 border border-secondary/40 bg-[#080808]/90 text-xs font-space tracking-wider text-muted max-w-md">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>
            LOCATED IN <span className="text-zinc-200 font-bold">MOKATTAM</span> — SPECIFIC LOCATION WILL BE SHARED UPON BOOKING
          </span>
        </div>

        {/* Slick Navigation Bar */}
        <nav aria-label="Footer Navigation" className="w-full max-w-xl border-y border-secondary/40 py-3.5 px-4 bg-[#080808]/70 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-space text-xs tracking-[0.25em] uppercase">
            <Link
              href="/"
              className="text-muted hover:text-white transition-colors relative py-1"
            >
              HOME
            </Link>

            <Link
              href="/vault"
              className="group flex items-center gap-1.5 px-3 py-1 border border-primary/50 bg-primary/10 hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_14px_rgba(214,0,0,0.5)] text-zinc-100 hover:text-white transition-all"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary shadow-[0_0_4px_#D60000]" />
              </span>
              <span>VAULT</span>
              <Disc className="w-3 h-3 text-primary group-hover:rotate-180 transition-transform duration-500" />
            </Link>

            <Link
              href="/pricing"
              className="text-muted hover:text-white transition-colors relative py-1"
            >
              PRICING
            </Link>

            <Link
              href="/about"
              className="text-muted hover:text-white transition-colors relative py-1"
            >
              ABOUT
            </Link>

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1.5 text-muted hover:text-emerald-400 transition-colors py-1"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform shrink-0" />
              <span>CONTACT US</span>
            </Link>
          </div>
        </nav>

        {/* Socials */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl">
          <Link
            href="https://instagram.com/gr8nikstudios"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 border border-secondary/60 bg-[#080808] hover:border-primary font-space text-xs tracking-widest text-muted hover:text-white transition-all duration-300"
          >
            <FaInstagram className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>INSTAGRAM</span>
          </Link>

          <Link
            href="https://www.tiktok.com/@gr8nikstudios"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 border border-secondary/60 bg-[#080808] hover:border-primary font-space text-xs tracking-widest text-muted hover:text-white transition-all duration-300"
          >
            <FaTiktok className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>TIKTOK</span>
          </Link>

          {/* <Link
            href="https://twitch.tv"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 border border-secondary/60 bg-[#080808] hover:border-primary font-space text-xs tracking-widest text-muted hover:text-white transition-all duration-300"
          >
            <FaTwitch className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>TWITCH</span>
          </Link> */}
        </div>

        {/* Payment Gateways */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 border border-secondary/30 bg-[#060606] h-[60px] font-space text-[11px] tracking-widest text-muted">
            <span className="text-secondary uppercase">ACCEPTED:</span>
            <span className="text-zinc-300 flex items-center gap-2">
              INSTAPAY
              <img src="/instapay.png" alt="Instapay Egypt payment method accepted at GR8NIK STUDIOS" className="w-16 h-auto object-contain inline-block" />
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 border border-secondary/30 bg-[#060606] h-[60px] font-space text-[11px] tracking-widest text-muted">
            <span className="text-secondary uppercase">ACCEPTED:</span>
            <span className="text-zinc-300 flex items-center gap-2">
              VODAFONE CASH
              <img src="/Vodafone_Symbol_1.png" alt="Vodafone Cash Egypt payment method accepted at GR8NIK STUDIOS" className="w-4 h-4 object-contain inline-block" />
            </span>
          </div>
        </div>

        {/* Subtle Accent Separator */}
        <div className="w-full max-w-xl h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent my-1" />

        {/* Bottom Tagline & Copyright */}
        <div className="flex flex-col gap-2">
          <span className="font-space text-xs md:text-sm text-secondary tracking-[0.25em] uppercase">
            WHERE MUSIC GETS MADE. THE CULTURE AROUND IT.
          </span>
          <span className="font-space text-[11px] text-muted tracking-widest">
            GR8NIK STUDIOS © {new Date().getFullYear()} // ALL RIGHTS RESERVED
          </span>
        </div>

      </div>
    </footer>
  );
}
