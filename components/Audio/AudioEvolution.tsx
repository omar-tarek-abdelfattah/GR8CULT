"use client";
import { useState } from "react";
import { Play, Square } from "lucide-react";

export default function AudioEvolution() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stages = [
    { id: "01_RAW_VOCAL", label: "RAW VOCAL" },
    { id: "02_GR8_MIX", label: "GR8 MIX & MASTER" },
    { id: "03_FINAL", label: "FINAL BEAT" }
  ];

  return (
    <section className="w-full py-16 border-b border-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-bebas text-4xl mb-8 tracking-wider uppercase text-white">
          AUDIO VAULT // A-B TEST
        </h2>
        
        <div className="border border-secondary bg-background flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-secondary">
          {/* Controls */}
          <div className="p-6 md:w-1/3 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="font-space text-xs text-muted tracking-widest">ACTIVE_MATRIX</span>
              <button onClick={() => setIsPlaying(!isPlaying)} className="text-primary border border-primary px-4 py-1 hover:bg-primary hover:text-white transition-colors font-space text-xs tracking-widest flex items-center gap-2">
                {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                {isPlaying ? "STOP" : "PLAY"}
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {stages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`flex justify-between items-center p-3 font-space text-xs tracking-widest border transition-all ${activeStage === idx ? 'border-primary bg-primary/10 text-white' : 'border-secondary/50 text-muted hover:border-secondary hover:text-white'}`}
                >
                  <span>{stage.id}</span>
                  <span className={activeStage === idx ? 'text-primary' : 'text-transparent'}>●</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Visualizer Mockup */}
          <div className="p-6 md:w-2/3 flex flex-col justify-end min-h-[250px] relative overflow-hidden bg-[#0a0a0a]">
             <span className="absolute top-4 left-4 font-space text-[10px] text-muted tracking-widest">WAVEFORM_RENDER // {stages[activeStage].label}</span>
             <div className="flex items-end justify-between gap-[2px] w-full h-32">
               {/* Mock waveform bars - representing the red bars in the screenshot */}
               {Array.from({ length: 32 }).map((_, i) => {
                 // Create a pattern somewhat resembling the screenshot
                 const heightVal = Math.abs(Math.sin((i / 32) * Math.PI * 4)) * 60 + 20 + ((i * 137) % 20);
                 return (
                   <div
                     key={i}
                     className={`w-full bg-primary transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                     style={{ 
                       height: `${activeStage === 0 ? heightVal * 0.5 : activeStage === 1 ? heightVal * 0.8 : heightVal}%`,
                     }}
                   ></div>
                 );
               })}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
