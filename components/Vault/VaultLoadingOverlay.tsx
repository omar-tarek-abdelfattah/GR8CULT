"use client";

import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";

interface VaultLoadingOverlayProps {
  isLoading: boolean;
  title?: string;
  subtitle?: string;
  trackCount?: number;
  minDisplayTimeMs?: number;
}

export default function VaultLoadingOverlay({
  isLoading,
  title = "INITIALIZING AUDIO VAULT",
  subtitle = "SYNCHRONIZING SPOTIFY DISCOGRAPHY & FREQUENCIES",
  trackCount,
  minDisplayTimeMs = 700,
}: VaultLoadingOverlayProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState<boolean>(false);

  useEffect(() => {
    // Check if user prefers reduced motion for instant reveal
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldRender(false);
      return;
    }

    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDisplayTimeMs);

    return () => clearTimeout(timer);
  }, [minDisplayTimeMs]);

  useEffect(() => {
    // When Spotify data is loaded AND the minimum cinematic reveal has elapsed
    if (!isLoading && minTimeElapsed) {
      setIsFadingOut(true);
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
      }, 700); // Matches transition-duration
      return () => clearTimeout(exitTimer);
    }
  }, [isLoading, minTimeElapsed]);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      role="status"
      aria-label="Loading vault audio archive"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] p-6 select-none transition-all duration-700 ease-out ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-102 blur-[2px]"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Ambient Crimson Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,0,0,0.18)_0%,rgba(5,5,5,0.85)_60%,#050505_100%)]" />

      {/* Industrial Studio Corner Metadata */}
      <div className="absolute top-6 left-6 font-space text-[10px] tracking-widest text-muted uppercase hidden sm:block">
        GR8NIK STUDIOS // CAIRO
      </div>
      <div className="absolute top-6 right-6 font-space text-[10px] tracking-widest text-primary uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
        <span>SYNC ACTIVE</span>
      </div>
      <div className="absolute bottom-6 left-6 font-space text-[10px] tracking-widest text-zinc-500 uppercase hidden sm:block">
        AUDIO MASTER // 24-BIT 48kHz
      </div>
      <div className="absolute bottom-6 right-6 font-space text-[10px] tracking-widest text-zinc-500 uppercase hidden sm:block">
        OFFICIAL DISCOGRAPHY ARCHIVE
      </div>

      {/* Center Branding & Visualizer */}
      <div className="relative z-10 flex flex-col items-center max-w-lg text-center px-4">
        {/* Glowing Spotify Icon Capsule */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-primary/20 animate-ping opacity-40" />
          <div className="relative w-16 h-16 rounded-full border border-primary/50 bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_30px_rgba(214,0,0,0.35)]">
            <FaSpotify className="w-8 h-8 text-[#1DB954]" />
          </div>
        </div>

        {/* Studio Monospace Badge */}
        <div className="font-space text-[11px] tracking-[0.25em] text-primary uppercase mb-2">
          SECURE VAULT ACCESS // v2.0
        </div>

        {/* Title */}
        <h2 className="font-bebas text-4xl sm:text-6xl tracking-wider text-white uppercase m-0 leading-tight">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="font-space text-xs text-muted tracking-widest uppercase mt-2 max-w-md">
          {subtitle}
        </p>

        {/* Equalizer Waveform Frequency Bars */}
        <div className="flex items-center justify-center gap-1.5 h-10 my-6">
          {[0, 0.18, 0.36, 0.54, 0.27, 0.45, 0.09].map((delay, i) => (
            <span
              key={i}
              className="vault-eq-bar w-1.5 bg-gradient-to-t from-secondary via-primary to-white rounded-full"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        {/* Laser Sweep Progress Line */}
        <div className="w-52 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
          <div className="vault-laser-sweep absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Track Buffer Telemetry */}
        <div className="font-space text-[10px] tracking-widest text-zinc-400 uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
          <span>
            {trackCount && trackCount > 0
              ? `${trackCount} TRACKS BUFFERED & READY`
              : "DECRYPTING SPOTIFY AUDIO STREAM..."}
          </span>
        </div>
      </div>
    </div>
  );
}
