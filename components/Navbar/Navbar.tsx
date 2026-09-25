'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Disc } from "lucide-react";
import './Navbar.style.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isVaultActive = pathname === "/vault" || pathname?.startsWith("/vault/");
  const isPricingActive = pathname === "/pricing" || pathname?.startsWith("/pricing/");
  const isAboutActive = pathname === "/about" || pathname?.startsWith("/about/");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-secondary bg-background/95 backdrop-blur-md overflow-y-hidden">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-0 text-primary hover:text-white transition-colors group cursor-pointer grouped-link"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/clean-crosshair-nobg.png"
            alt="GR8NIK STUDIOS Crosshair Emblem"
            className="w-14 sm:w-20 h-auto crosshair"
          />
          <div className="logo relative">
            <img
              src="/logo-nobg.png"
              alt="GR8NIK STUDIOS Official Brand Logo"
              className="w-32 sm:w-40 h-auto"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            href="/about"
            className={`font-space text-sm uppercase tracking-[0.2em] transition-colors relative py-1 ${isAboutActive ? "text-white font-bold" : "text-muted hover:text-white"
              }`}
          >
            ABOUT
            {isAboutActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_8px_#D60000]" />
            )}
          </Link>

          {/* Enticing Glowing Vault Nav Button */}
          <Link
            href="/vault"
            className={`relative group/vault px-4 py-1.5 border font-space text-sm tracking-[0.22em] uppercase flex items-center gap-2.5 transition-all duration-300 rounded-none cursor-pointer ${isVaultActive
                ? "border-primary bg-primary/25 text-white shadow-[0_0_22px_rgba(214,0,0,0.85),inset_0_0_12px_rgba(214,0,0,0.3)] ring-1 ring-primary font-bold"
                : "border-primary/50 bg-primary/10 text-zinc-100 hover:border-primary hover:bg-primary/20 hover:text-white hover:shadow-[0_0_18px_rgba(214,0,0,0.55)]"
              }`}
          >
            {/* Live radar / pulse beacon */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-primary ${isVaultActive ? "animate-ping opacity-90" : "animate-pulse opacity-75"
                  }`}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
            </span>

            <span className="relative z-10 flex items-center gap-2">
              <span className="tracking-[0.25em]">VAULT</span>
              <Disc
                className={`w-3.5 h-3.5 text-primary transition-transform duration-700 ${isVaultActive ? "animate-spin" : "group-hover/vault:rotate-180"
                  }`}
              />
            </span>

            {/* Ambient neon crown when active */}
            {isVaultActive && (
              <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white shadow-[0_0_8px_#ffffff]" />
            )}
          </Link>

          <Link
            href="/pricing"
            className={`font-space text-sm uppercase tracking-[0.2em] transition-colors relative py-1 ${isPricingActive ? "text-white font-bold" : "text-muted hover:text-white"
              }`}
          >
            PRICING
            {isPricingActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_8px_#D60000]" />
            )}
          </Link>


        </div>

        {/* Desktop CTA */}
        <Link
          href="/#booking"
          className="hidden md:inline-flex border border-primary text-primary px-6 py-2 font-space text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors rounded-none"
        >
          BOOK YOUR SESSION NOW !
        </Link>

        {/* Mobile Header Actions: Direct Vault Button + Hamburger Menu */}
        <div className="flex md:hidden items-center gap-2.5">
          {/* Direct Mobile Vault Button */}
          <Link
            href="/vault"
            aria-label="Enter The Vault directly"
            className={`px-3 py-1.5 border font-space text-xs tracking-widest uppercase flex items-center gap-1.5 transition-all duration-300 rounded-none cursor-pointer ${isVaultActive
                ? "border-primary bg-primary/30 text-white shadow-[0_0_16px_rgba(214,0,0,0.85)] ring-1 ring-primary font-bold"
                : "border-primary/60 bg-primary/15 text-zinc-100 hover:border-primary hover:bg-primary/25 shadow-[0_0_10px_rgba(214,0,0,0.35)]"
              }`}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary shadow-[0_0_4px_#D60000]" />
            </span>
            <span>VAULT</span>
            <Disc className={`w-3 h-3 text-primary ${isVaultActive ? "animate-spin" : ""}`} />
          </Link>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="p-2 text-muted hover:text-white border border-secondary/60 hover:border-primary transition-all bg-[#0a0a0a] cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden w-full border-t border-secondary/60 bg-background/98 backdrop-blur-lg animate-in slide-in-from-top-2 duration-300">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2.5 font-space text-sm tracking-[0.2em]">
              {/* Special Vault entry in drawer */}
              <Link
                href="/vault"
                onClick={() => setIsOpen(false)}
                className={`py-3 px-3 border transition-all flex items-center justify-between ${isVaultActive
                    ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(214,0,0,0.6)]"
                    : "border-primary/40 bg-primary/10 text-zinc-100 hover:border-primary hover:bg-primary/20"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
                  </span>
                  <span className="font-bold tracking-[0.22em]">VAULT</span>
                  <span className="text-[10px] tracking-widest text-primary border border-primary/40 px-1.5 py-0.5 ml-1">
                    BEATS & RELEASES
                  </span>
                </div>
                <Disc className={`w-4 h-4 text-primary ${isVaultActive ? "animate-spin" : ""}`} />
              </Link>

              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className={`py-3 px-2 border-b transition-colors flex items-center justify-between ${isPricingActive
                    ? "text-white border-primary font-bold"
                    : "text-muted hover:text-white border-secondary/30 hover:border-primary"
                  }`}
              >
                <span>PRICING</span>
                <span className="text-primary text-xs">&gt;</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`py-3 px-2 border-b transition-colors flex items-center justify-between ${isAboutActive
                    ? "text-white border-primary font-bold"
                    : "text-muted hover:text-white border-secondary/30 hover:border-primary"
                  }`}
              >
                <span>ABOUT</span>
                <span className="text-primary text-xs">&gt;</span>
              </Link>
            </div>

            {/* Mobile CTA */}
            <Link
              href="/#booking"
              onClick={() => setIsOpen(false)}
              className="w-full text-center border border-primary bg-primary/10 text-primary py-3.5 font-space text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(214,0,0,0.2)]"
            >
              BOOK YOUR SESSION NOW !
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
