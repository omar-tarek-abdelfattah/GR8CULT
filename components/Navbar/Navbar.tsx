'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import './Navbar.style.css';

const navLinks = [
  { name: "VAULT", href: "/vault" },
  { name: "ABOUT", href: "/about" },
  { name: "RATES", href: "/#rates" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-space text-sm uppercase tracking-[0.2em] text-muted hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/#booking"
          className="hidden md:inline-flex border border-primary text-primary px-6 py-2 font-space text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors rounded-none"
        >
          BOOK YOUR SESSION NOW !
        </Link>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="md:hidden p-2 text-muted hover:text-white border border-secondary/60 hover:border-primary transition-all bg-[#0a0a0a] cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden w-full border-t border-secondary/60 bg-background/98 backdrop-blur-lg animate-in slide-in-from-top-2 duration-300">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2 font-space text-sm tracking-[0.2em]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 border-b border-secondary/30 text-muted hover:text-white hover:border-primary transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-primary text-xs">&gt;</span>
                </Link>
              ))}
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
