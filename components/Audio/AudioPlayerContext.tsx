"use client";
import { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Square } from "lucide-react";

export default function AudioPlayerContext() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Logic for ducking audio when other media plays would hook into DOM events here
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#0a0a0a] border border-secondary p-3 shadow-2xl flex items-center gap-4 group">
      <div className="flex flex-col">
        <span className="font-space text-[10px] text-primary tracking-widest leading-none">SYS.AUDIO</span>
        <span className="font-space text-[8px] text-muted tracking-widest uppercase mt-1">Ambient_Context_v1</span>
      </div>
      
      <div className="flex items-center gap-2 border-l border-secondary/50 pl-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-muted hover:text-white transition-colors"
        >
          {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-muted hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Mini Visualizer */}
      {isPlaying && !isMuted && (
        <div className="absolute -top-6 right-0 flex items-end gap-[2px] h-4 w-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-primary w-2 animate-pulse" style={{ height: `${Math.max(20, ((i * 37) % 100))}%`, animationDuration: `${Math.max(0.5, ((i * 17) % 1.5))}s` }}></div>
          ))}
        </div>
      )}
    </div>
  );
}
