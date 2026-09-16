"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Square, Volume2 } from "lucide-react";

const stages = [
  {
    id: "01_RAW_VOCALS",
    label: "RAW VOCALS",
    desc: "UNPROCESSED CAPTURE",
    src: "https://d2flaqome864xs.cloudfront.net/raw-only.wav",
    heightMultiplier: 0.5,
  },
  {
    id: "02_MIXED_VOCALS",
    label: "MIXED VOCALS",
    desc: "TUNED, EQ'D & COMPRESSED",
    src: "https://d2flaqome864xs.cloudfront.net/mix-only.wav",
    heightMultiplier: 0.7,
  },
  {
    id: "03_BEAT_ONLY",
    label: "BEAT ONLY",
    desc: "INSTRUMENTAL FOUNDATION",
    src: "https://d2flaqome864xs.cloudfront.net/beat-only.wav",
    heightMultiplier: 0.85,
  },
  {
    id: "04_FINAL_PRODUCT",
    label: "FINAL PRODUCT",
    desc: "COMPLETE MASTERED RECORD",
    src: "https://d2flaqome864xs.cloudfront.net/final-product.wav",
    heightMultiplier: 1.0,
  },
];

export default function AudioEvolution() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const targetTimeRef = useRef<number>(0);

  // switching stages
  const handleStageSelect = (idx: number) => {
    if (idx === activeStage) return;

    if (audioRef.current) {
      targetTimeRef.current = audioRef.current.currentTime;
    }
    setActiveStage(idx);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

  const handleCanPlay = () => {
    if (audioRef.current && targetTimeRef.current > 0) {
      audioRef.current.currentTime = targetTimeRef.current;
      targetTimeRef.current = 0;
    }

    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => { });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="w-full py-16 border-b border-secondary bg-background relative">
      {/* Hidden audio element controlling playback */}
      <audio
        ref={audioRef}
        src={stages[activeStage].src}
        preload="auto"
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider uppercase text-white m-0">
              AUDIO VAULT // A-B TEST
            </h2>
            <p className="font-space text-xs text-muted tracking-widest uppercase mt-1">
              REAL-TIME PRODUCTION MATRIX // MULTI-STAGE COMPARISON
            </p>
          </div>

          <div className="flex items-center gap-4 font-space text-xs tracking-widest text-muted">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </span>
          </div>
        </div>

        <div className="border border-secondary bg-background flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-secondary">
          {/* Controls Panel */}
          <div className="p-6 md:w-1/3 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="font-space text-xs text-muted tracking-widest">ACTIVE_MATRIX</span>
                <button
                  onClick={togglePlay}
                  className="text-primary border border-primary px-4 py-1.5 hover:bg-primary hover:text-white transition-colors font-space text-xs tracking-widest flex items-center gap-2 cursor-pointer"
                >
                  {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                  {isPlaying ? "STOP" : "PLAY"}
                </button>
              </div>

              {/* 4 Stages Selector */}
              <div className="flex flex-col gap-2">
                {stages.map((stage, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageSelect(idx)}
                      className={`flex justify-between items-center p-3 font-space text-xs tracking-widest border transition-all text-left cursor-pointer ${isActive
                        ? "border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(214,0,0,0.2)]"
                        : "border-secondary/50 text-muted hover:border-secondary hover:text-white"
                        }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">{stage.id}</span>
                        <span className="text-[10px] text-zinc-400">{stage.desc}</span>
                      </div>
                      <span className={`text-sm ${isActive ? "text-primary animate-pulse" : "text-transparent"}`}>
                        ●
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Matrix Status Indicator */}
            <div className="pt-4 border-t border-secondary/40 flex items-center justify-between font-space text-[10px] text-muted tracking-widest uppercase">
              <span>SYNC_STATE: {isPlaying ? "STREAMING" : "STANDBY"}</span>
            </div>
          </div>

          {/* Visualizer & Interactive Waveform Panel */}
          <div className="p-6 md:w-2/3 flex flex-col justify-between min-h-[300px] relative overflow-hidden bg-[#0a0a0a]">
            {/* Header info */}
            <div className="flex items-center justify-between z-10">
              <span className="font-space text-[10px] text-muted tracking-widest uppercase">
                WAVEFORM_RENDER // {stages[activeStage].label}
              </span>
              <span className="font-space text-[10px] text-primary tracking-widest uppercase bg-black/80 px-2 py-0.5 border border-secondary/40">
                {stages[activeStage].desc}
              </span>
            </div>

            {/* Waveform Bars Display (Interactive Scrubbing) */}
            <div
              onClick={handleSeek}
              className="flex items-end justify-between gap-[3px] w-full h-40 my-auto cursor-pointer relative group py-2"
              title="Click to seek"
            >
              {Array.from({ length: 48 }).map((_, i) => {
                const heightVal =
                  Math.abs(Math.sin((i / 48) * Math.PI * 5)) * 60 +
                  25 +
                  ((i * 157) % 25);
                const barHeight = heightVal * stages[activeStage].heightMultiplier;
                const barProgress = (i / 48) * 100;
                const isPassed = barProgress <= progressPercent;

                return (
                  <div
                    key={i}
                    className={`w-full transition-all duration-200 rounded-none ${isPassed
                      ? "bg-primary shadow-[0_0_8px_rgba(214,0,0,0.5)]"
                      : "bg-secondary/40 group-hover:bg-secondary/70"
                      } ${isPlaying && isPassed ? "opacity-100" : "opacity-80"}`}
                    style={{
                      height: `${Math.min(100, Math.max(12, barHeight))}%`,
                    }}
                  />
                );
              })}
            </div>

            {/* Scrubber / Progress Track */}
            <div className="flex flex-col gap-2 z-10">
              <div
                onClick={handleSeek}
                className="w-full h-1.5 bg-secondary/30 hover:h-2.5 transition-all cursor-pointer relative overflow-hidden"
              >
                <div
                  className="h-full bg-primary transition-all duration-100 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_6px_#fff]" />
                </div>
              </div>

              <div className="flex justify-between items-center font-space text-[10px] text-muted tracking-widest">
                <span>STAGE: [{stages[activeStage].id}]</span>
                <span className="text-zinc-400">CLICK WAVEFORM TO SCRUB</span>
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
