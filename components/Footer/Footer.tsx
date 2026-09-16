'use client';

import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaTwitch, FaInstagram } from "react-icons/fa";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Footer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  /*
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';


    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || '',
      center: [31.318819202238007, 30.011750165945585],
      zoom: 14.2
    });

    new mapboxgl.Marker({ color: "#d60000" })
      .setLngLat([31.318819202238007, 30.011750165945585])
      .addTo(map.current);

  }, []);
  */

  return (
    <footer className="relative w-full border-t border-secondary/60 bg-background mt-auto overflow-hidden">
      {/* Background Ambience: Subtle Grid & Red Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center gap-8">
        
        {/* Brand Emblem & Logo */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="group flex flex-col items-center gap-2 cursor-pointer">
            <img
              src="/clean-crosshair-nobg.png"
              alt="GR8NIK Crosshair"
              className="w-10 h-10 object-contain opacity-75 group-hover:opacity-100 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500 filter drop-shadow-[0_0_12px_rgba(214,0,0,0.4)]"
            />
            <img
              src="/logo-nobg.png"
              alt="GR8NIK Studios"
              className="w-44 md:w-52 h-auto object-contain opacity-90 group-hover:opacity-100 drop-shadow-[0_0_25px_rgba(214,0,0,0.35)] transition-all duration-300"
            />
          </Link>
          
          {/* Studio Radar / Live Status Indicator */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 border border-secondary/50 bg-[#080808]/90 text-[11px] font-space tracking-[0.22em] text-muted uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>CAIRO HQ // 31.3188° E, 30.0117° N</span>
          </div>
        </div>

        {/* Action Elements: Location & Socials */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl">
          <Link
            href="https://maps.app.goo.gl/8GVuSJFKQ2Np81CB9"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2.5 px-5 py-2.5 border border-secondary/60 bg-[#080808] hover:border-primary font-space text-xs tracking-widest text-muted hover:text-white transition-all duration-300"
          >
            <MapPin className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>LOCATION ON GOOGLE MAPS</span>
            <span className="text-primary text-[11px]">&gt;</span>
          </Link>

          <Link
            href="https://instagram.com/gr8nikstudios"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-4 py-2.5 border border-secondary/60 bg-[#080808] hover:border-primary font-space text-xs tracking-widest text-muted hover:text-white transition-all duration-300"
          >
            <FaInstagram className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>INSTAGRAM</span>
          </Link>

          <Link
            href="https://twitch.tv"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 px-4 py-2.5 border border-secondary/60 bg-[#080808] hover:border-primary font-space text-xs tracking-widest text-muted hover:text-white transition-all duration-300"
          >
            <FaTwitch className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>TWITCH</span>
          </Link>
        </div>

        {/* Payment Gateways */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 border border-secondary/30 bg-[#060606] font-space text-[11px] tracking-widest text-muted">
            <span className="text-secondary uppercase">ACCEPTED:</span>
            <span className="text-zinc-300 flex items-center gap-2">
              INSTAPAY
              <img src="/instapay.png" alt="Instapay" className="w-16 h-auto object-contain inline-block" />
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 border border-secondary/30 bg-[#060606] font-space text-[11px] tracking-widest text-muted">
            <span className="text-secondary uppercase">ACCEPTED:</span>
            <span className="text-zinc-300 flex items-center gap-2">
              VODAFONE CASH
              <img src="/Vodafone_Symbol_1.png" alt="Vodafone Cash" className="w-4 h-4 object-contain inline-block" />
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

        {/* Right Content: Map Box (Preserved & Commented) */}
        {/* <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="relative w-full h-[300px] border border-secondary/30 grayscale hover:grayscale-0 transition-all duration-700 bg-[#050505] p-2">
            <div
              ref={mapContainer}
              className="w-full h-full"
            />
          </div>
        </div> */}

      </div>
    </footer>
  );
}
