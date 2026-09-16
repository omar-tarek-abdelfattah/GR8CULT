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

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const isSeekingRef = useRef<boolean>(false);

  // Keep mute states in sync whenever activeStage changes
  useEffect(() => {
    audioRefs.current.forEach((audio, idx) => {
      if (audio) {
        audio.muted = idx !== activeStage;
      }
    });
  }, [activeStage]);

  // Proactively check for duration from audio elements once mounted/cached
  useEffect(() => {
    const checkDuration = () => {
      for (const audio of audioRefs.current) {
        if (audio && audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
          setDuration(audio.duration);
          return true;
        }
      }
      return false;
    };

    if (checkDuration()) return;

    const timer = setInterval(() => {
      if (checkDuration()) {
        clearInterval(timer);
      }
    }, 250);

    return () => clearInterval(timer);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRefs.current.forEach((audio) => {
        if (audio) audio.pause();
      });
    };
  }, []);

  // Instant seamless switching between stages by toggling mute
  const handleStageSelect = (idx: number) => {
    if (idx === activeStage) return;

    setActiveStage(idx);

    // Unmute the selected audio, mute all others
    audioRefs.current.forEach((audio, i) => {
      if (!audio) return;
      audio.muted = i !== idx;
    });

    // Align timestamp to master to avoid any micro-drift
    const master = audioRefs.current[activeStage];
    if (master && audioRefs.current[idx]) {
      const currentMasterTime = master.currentTime;
      if (Math.abs((audioRefs.current[idx]?.currentTime || 0) - currentMasterTime) > 0.05) {
        audioRefs.current[idx]!.currentTime = currentMasterTime;
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Pause all 4 tracks
      audioRefs.current.forEach((audio) => {
        if (audio) audio.pause();
      });
      setIsPlaying(false);
    } else {
      // Align all tracks to the current timestamp and play in unison
      const targetTime = currentTime;
      audioRefs.current.forEach((audio, idx) => {
        if (!audio) return;
        audio.currentTime = targetTime;
        audio.muted = idx !== activeStage;
        audio.play().catch(() => {});
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    // Prevent timeUpdate / drift correction from overriding during an active seek
    if (isSeekingRef.current) return;

    const master = audioRefs.current[activeStage] || audioRefs.current[0];
    if (!master) return;

    setCurrentTime(master.currentTime);

    // Micro-drift correction: keep all 4 streams locked to the same millisecond
    if (isPlaying) {
      audioRefs.current.forEach((audio) => {
        if (audio && audio !== master && Math.abs(audio.currentTime - master.currentTime) > 0.12) {
          audio.currentTime = master.currentTime;
        }
      });
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get duration from state or directly from any loaded audio element
    let totalDuration = duration;
    if (!totalDuration || isNaN(totalDuration)) {
      for (const a of audioRefs.current) {
        if (a && a.duration && !isNaN(a.duration) && a.duration > 0) {
          totalDuration = a.duration;
          setDuration(a.duration);
          break;
        }
      }
    }

    if (!totalDuration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * totalDuration;

    // Block timeUpdate micro-drift from reverting during seek
    isSeekingRef.current = true;
    setCurrentTime(newTime);

    // Seek all 4 audio streams simultaneously
    audioRefs.current.forEach((audio) => {
      if (audio) {
        try {
          audio.currentTime = newTime;
        } catch (err) {
          console.warn("Seek error:", err);
        }
      }
    });

    // Release seek lock after audio elements finish jumping
    setTimeout(() => {
      isSeekingRef.current = false;
    }, 300);
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
      {/* 4 Parallel Audio Streams: All play simultaneously, only active stage is unmuted */}
      {stages.map((stage, idx) => (
        <audio
          key={stage.id}
          ref={(el) => {
            audioRefs.current[idx] = el;
          }}
          src={stage.src}
          preload="auto"
          muted={idx !== activeStage}
          onTimeUpdate={idx === 0 ? handleTimeUpdate : undefined}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={idx === 0 ? handleEnded : undefined}
        />
      ))}

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
                    className={`w-full transition-all duration-200 rounded-none pointer-events-none ${isPassed
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
                className="w-full h-2 bg-secondary/30 hover:h-3 transition-all cursor-pointer relative overflow-hidden py-0.5"
              >
                <div
                  className="h-full bg-primary transition-all duration-100 relative pointer-events-none"
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
