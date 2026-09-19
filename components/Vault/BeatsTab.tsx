"use client";

import { useEffect } from "react";
import { Play, Square, ExternalLink, Sparkles } from "lucide-react";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";
import { ShowcaseBeat, STATIC_BEAT_BARS, formatDuration } from "./types";

interface BeatsTabProps {
  beats: ShowcaseBeat[];
  activeBeat: ShowcaseBeat | null;
  onSelectBeat: (beat: ShowcaseBeat) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function BeatsTab({
  beats,
  activeBeat,
  onSelectBeat,
  isPlaying,
  currentTime,
  duration,
  onSeek,
}: BeatsTabProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
        ) {
          return;
        }

        const beatToPlay = activeBeat || beats[0];
        if (!beatToPlay) return;

        e.preventDefault();
        onSelectBeat(beatToPlay);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeBeat, beats, onSelectBeat]);

  return (
    <>
      {/* Featured Showcase Beat Spotlight (Playback on Top) */}
      {activeBeat && (
        <section className="border-b border-secondary p-4 md:p-8 bg-gradient-to-r from-[#0d0202] via-[#080808] to-background">
          <div className="container mx-auto">
            <div className="w-full border border-primary/80 bg-[#0a0a0a] flex flex-col lg:flex-row relative group overflow-hidden shadow-[0_0_30px_rgba(214,0,0,0.15)]">
              {/* Top Accent Badges */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="bg-primary text-white font-space text-[10px] tracking-widest px-3 py-1 uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  BEAT_SPOTLIGHT // {activeBeat.bpm} BPM
                </span>
                <span className="bg-black/80 backdrop-blur-md border border-secondary/50 text-muted font-space text-[10px] tracking-widest px-2.5 py-1 uppercase">
                  {activeBeat.genre}
                </span>
              </div>

              {/* Beat Thumbnail Showcase (Left Column) with GR8NIK Branding */}
              <div className="w-full lg:w-2/5 aspect-square relative overflow-hidden border-b lg:border-b-0 lg:border-r border-secondary/50 bg-[#000]">
                <img
                  src={activeBeat.thumbnail}
                  alt={`${activeBeat.title} - ${activeBeat.genre} instrumental beat (${activeBeat.bpm} BPM) produced by GR8NIK STUDIOS`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* GR8NIK Cyberpunk Logo Stamp */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-secondary/60">
                    <img
                      src="/clean-crosshair-nobg.png"
                      alt="GR8NIK STUDIOS Emblem Crosshair"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-space text-[10px] text-white tracking-widest font-bold">
                      GR8NIK STUDIOS
                    </span>
                  </div>
                  <span className="font-space text-[10px] text-primary bg-black/85 px-2.5 py-1.5 border border-secondary/60 tracking-widest uppercase">
                    KEY: {activeBeat.key}
                  </span>
                </div>
              </div>

              {/* Beat Metadata & Top Playback Controls (Right Column) */}
              <div className="p-6 md:p-10 flex flex-col justify-between flex-grow gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-space text-xs text-primary tracking-[0.25em] uppercase">
                      PROD. {activeBeat.producer}
                    </span>
                    <span className="text-secondary">•</span>
                    <span className="font-space text-xs text-muted tracking-widest uppercase">
                      STUDIO INSTRUMENTAL
                    </span>
                  </div>

                  <h2 className="font-bebas text-4xl sm:text-6xl text-white mb-2 tracking-wider">
                    {activeBeat.title}
                  </h2>

                  {/* Beat Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                    <div className="border border-secondary/40 bg-black/60 p-3">
                      <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                        TEMPO
                      </span>
                      <span className="font-space text-sm text-white font-bold">
                        {activeBeat.bpm} BPM
                      </span>
                    </div>
                    <div className="border border-secondary/40 bg-black/60 p-3">
                      <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                        SCALE / KEY
                      </span>
                      <span className="font-space text-sm text-white font-bold">
                        {activeBeat.key}
                      </span>
                    </div>
                    <div className="border border-secondary/40 bg-black/60 p-3">
                      <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                        GENRE
                      </span>
                      <span className="font-space text-sm text-primary font-bold truncate block">
                        {activeBeat.genre}
                      </span>
                    </div>
                    <div className="border border-secondary/40 bg-black/60 p-3">
                      <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                        MASTER
                      </span>
                      <span className="font-space text-sm text-zinc-200 font-bold">
                        32-BIT WAV
                      </span>
                    </div>
                  </div>

                  {/* Interactive Scrubber & Waveform */}
                  <div className="flex flex-col gap-2 my-4">
                    <div
                      onClick={onSeek}
                      className="w-full h-10 bg-black/80 border border-secondary/50 flex items-center px-2 cursor-pointer relative group/scrub overflow-hidden"
                      title="Click waveform to seek"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-primary/25 transition-all duration-75"
                        style={{
                          width: `${
                            duration > 0
                              ? Math.min(100, (currentTime / duration) * 100)
                              : 0
                          }%`,
                        }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_rgba(214,0,0,1)] z-20"
                        style={{
                          left: `${
                            duration > 0
                              ? Math.min(100, (currentTime / duration) * 100)
                              : 0
                          }%`,
                        }}
                      />

                      <div className="flex items-center justify-between w-full h-6 z-10 pointer-events-none gap-0.5">
                        {STATIC_BEAT_BARS.map((height, i) => {
                          const barProgress = (i / 40) * 100;
                          const currentProgress =
                            duration > 0 ? (currentTime / duration) * 100 : 0;
                          const isPassed = barProgress <= currentProgress;
                          return (
                            <div
                              key={i}
                              className={`w-full rounded-none transition-colors duration-150 ${
                                isPassed
                                  ? "bg-primary shadow-[0_0_6px_rgba(214,0,0,0.6)]"
                                  : "bg-secondary/40 group-hover/scrub:bg-secondary/70"
                              }`}
                              style={{ height: `${height}%` }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-between items-center font-space text-[10px] text-muted tracking-widest">
                      <span className="text-zinc-400">
                        CLICK TO SCRUB WAVEFORM • [SPACE] PLAY / PAUSE
                      </span>
                      <span className="text-white">
                        {formatDuration(currentTime * 1000)} /{" "}
                        {formatDuration(
                          (duration || activeBeat.durationMs / 1000) * 1000
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions & Links */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onSelectBeat(activeBeat)}
                    className="bg-primary hover:bg-white text-white hover:text-black font-space text-xs px-8 py-3.5 tracking-widest transition-all uppercase flex items-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(214,0,0,0.4)]"
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>PAUSE BEAT</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>PLAY BEAT</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/+201011444140?text=${encodeURIComponent(
                      `Hey GR8NIK Studios, I want to inquire about leasing the beat "${activeBeat.title}" (${activeBeat.bpm} BPM / ${activeBeat.genre}).`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-secondary/70 text-muted hover:border-primary hover:text-white font-space text-xs px-6 py-3.5 tracking-widest transition-colors uppercase flex items-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4 text-primary" />
                    <span>INQUIRE / LEASE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#FF0000]/60 hover:border-[#FF0000] text-muted hover:text-white bg-[#050505] font-space text-xs px-6 py-3.5 tracking-widest transition-all uppercase flex items-center gap-2"
                  >
                    <FaYoutube className="w-4 h-4 text-[#FF0000]" />
                    <span>YOUTUBE CHANNEL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8 Showcase Beats Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-secondary/40 pb-4 gap-2">
            <div>
              <h3 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white uppercase m-0">
                SHOWCASE BEATS ({beats.length})
              </h3>
              <p className="font-space text-xs text-muted tracking-widest uppercase mt-1">
                EXCLUSIVE STUDIO PRODUCTIONS // CLICK ANY BEAT TO LOAD IN PLAYBACK
              </p>
            </div>
            <a
              href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
              target="_blank"
              rel="noreferrer"
              className="font-space text-xs text-[#FF0000] hover:text-white flex items-center gap-2 tracking-widest transition-colors w-fit"
            >
              <FaYoutube className="w-4 h-4" />
              <span>MORE ON YOUTUBE &gt;</span>
            </a>
          </div>

          {/* 8 Beats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beats.map((beat) => {
              const isSelected = activeBeat?.id === beat.id;
              const isPlayingThisBeat = isSelected && isPlaying;

              return (
                <div
                  key={beat.id}
                  onClick={() => onSelectBeat(beat)}
                  className={`border bg-[#050505] group transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? "border-primary shadow-[0_0_20px_rgba(214,0,0,0.25)]"
                      : "border-secondary/60 hover:border-primary"
                  }`}
                >
                  {/* GR8NIK Thumbnail with Badges */}
                  <div className="w-full aspect-square bg-[#0a0a0a] relative border-b border-secondary/50 group-hover:border-primary/50 overflow-hidden">
                    <img
                      src={beat.thumbnail}
                      alt={`${beat.title} (${beat.bpm} BPM) - ${beat.genre} Beat from GR8NIK STUDIOS`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />

                    {/* GR8NIK Branding Stamp */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-black/85 backdrop-blur-sm border border-secondary/60 px-2 py-0.5">
                      <img
                        src="/clean-crosshair-nobg.png"
                        alt="GR8NIK STUDIOS Official Beat Stamp"
                        className="w-3 h-3 object-contain"
                      />
                      <span className="font-space text-[9px] text-white tracking-widest font-bold">
                        GR8NIK
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-10 bg-black/85 backdrop-blur-sm border border-primary/60 px-2 py-0.5 font-space text-[9px] text-primary tracking-widest">
                      {beat.bpm} BPM
                    </div>

                    {/* Quick Play Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                      <div
                        className="w-12 h-12 bg-primary hover:bg-white text-white hover:text-black flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
                        title="Play Beat"
                      >
                        {isPlayingThisBeat ? (
                          <Square className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </div>
                    </div>

                    {/* Playing Equalizer Indicator */}
                    {isPlayingThisBeat && (
                      <div className="absolute bottom-2 left-2 z-10 flex items-end gap-1 bg-black/85 px-2 py-1 border border-primary">
                        <span className="w-1 h-3 bg-primary animate-pulse" />
                        <span className="w-1 h-4 bg-primary animate-pulse delay-75" />
                        <span className="w-1 h-2 bg-primary animate-pulse delay-150" />
                      </div>
                    )}
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-space text-[10px] text-primary tracking-widest uppercase">
                          {beat.genre}
                        </span>
                        <span className="font-space text-[10px] text-muted tracking-widest">
                          {beat.key}
                        </span>
                      </div>
                      <h4 className="font-bebas text-2xl text-white group-hover:text-primary transition-colors tracking-wide m-0">
                        {beat.title}
                      </h4>
                      <p className="font-space text-xs text-muted tracking-widest uppercase mt-0.5">
                        PROD. {beat.producer}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-secondary/50 pt-2 font-space text-[10px] tracking-widest">
                      <span className="text-secondary">
                        {formatDuration(beat.durationMs)}
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href={`https://wa.me/+201011444140?text=${encodeURIComponent(
                            `Hey GR8NIK Studios, I want to inquire about leasing the beat "${beat.title}" (${beat.bpm} BPM / ${beat.genre}).`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted hover:text-primary transition-colors flex items-center gap-1 hover:underline"
                          title={`Inquire about ${beat.title} on WhatsApp`}
                        >
                          <FaWhatsapp className="w-3 h-3 text-primary" />
                          <span>INQUIRE</span>
                        </a>
                        <span className="text-primary hover:underline flex items-center gap-1">
                          {isPlayingThisBeat ? "PLAYING" : "LOAD &gt;"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Link to YouTube Channel Banner */}
          <div className="mt-16 border border-secondary/60 bg-gradient-to-r from-[#0d0202] via-[#050505] to-[#0a0000] p-8 md:p-12 relative overflow-hidden group hover:border-primary transition-all duration-500">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,rgba(214,0,0,0.15),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="max-w-xl">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#FF0000] font-space text-xs tracking-widest uppercase mb-2">
                  <FaYoutube className="w-4 h-4" />
                  <span>YOUTUBE BEATS ARCHIVE</span>
                </div>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wider uppercase m-0">
                  WANT MORE INSTRUMENTALS?
                </h3>
                <p className="font-space text-xs md:text-sm text-muted tracking-widest uppercase mt-2">
                  EXPLORE THE FULL VAULT OF EXCLUSIVE BEATS, RELEASES &amp; STUDIO SESSIONS ON OUR OFFICIAL YOUTUBE CHANNEL.
                </p>
              </div>

              <a
                href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] hover:bg-white text-white hover:text-black font-space text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(255,0,0,0.4)] whitespace-nowrap cursor-pointer"
              >
                <FaYoutube className="w-4 h-4 fill-current" />
                <span>SUBSCRIBE ON YOUTUBE &gt;</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
