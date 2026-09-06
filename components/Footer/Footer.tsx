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

  return (
    <footer className="w-full border-t border-secondary bg-background mt-auto flex flex-col">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

        {/* Left Content */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          {/* Brand/Copyright */}
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <span className="font-space text-sm text-muted tracking-widest">
              GR8NIK STUDIOS © {new Date().getFullYear()}
            </span>
            <span className="font-space text-xs text-secondary tracking-widest uppercase">
              WHERE MUSIC GETS MADE. THE CULTURE AROUND IT.
            </span>
          </div>

          {/* Tactics & Badges */}
          <div className="flex flex-col items-start justify-start lg:justify-start gap-4 lg:gap-6">
            <Link
              href="https://maps.app.goo.gl/8GVuSJFKQ2Np81CB9"
              target="_blank"
              rel="noreferrer"
              className="font-space text-sm text-primary tracking-widest hover:text-white transition-colors cursor-crosshair flex items-center gap-2"
            >
              GR8NIK'S LOCATION ON GOOGLE MAPS
              <MapPin className="w-4 h-4" />
            </Link>
            {/* <div className="hidden lg:block h-6 w-px bg-secondary mx-2"></div> */}
            <span className="font-space text-sm text-muted tracking-widest flex items-center gap-2">
              We Accept INSTAPAY
              <img src="instapay.png" alt="instapay" className="w-20" />
            </span>
            <span className="font-space text-sm text-muted tracking-widest flex items-center gap-2">
              We Accept VODAFONE_CASH
              <img src="Vodafone_Symbol_1.png" width="20" />
            </span>
            {/* <div className="hidden lg:block h-6 w-px bg-secondary mx-2"></div> */}
            <Link
              href="https://twitch.tv"
              target="_blank"
              rel="noreferrer"
              className="font-space text-sm text-primary tracking-widest hover:text-white transition-colors cursor-crosshair flex items-center gap-2"
            >
              TWITCH
              <FaTwitch className="w-4 h-4" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="font-space text-sm text-primary tracking-widest hover:text-white transition-colors cursor-crosshair flex items-center gap-2"
            >
              INSTAGRAM
              <FaInstagram className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Content: Map Box */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="relative w-full h-[300px] border border-secondary/30 grayscale hover:grayscale-0 transition-all duration-700 bg-[#050505] p-2">
            <div
              ref={mapContainer}
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
