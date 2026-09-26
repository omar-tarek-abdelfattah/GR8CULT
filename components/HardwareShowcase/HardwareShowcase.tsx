import Link from "next/link";
import { ArrowRight } from "lucide-react";
import './HardwareShowcase.style.css';

export default function HardwareShowcase() {
  return (
    <section className="w-full py-24 border-b border-secondary bg-background relative overflow-hidden">
      {/* Optional subtle background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

          {/* Left: Image Display */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="hardware-image-container">

              {/* Fallback pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#d60000_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {/* Background image handler */}
              <div
                className="hardware-image-bg"
                role="img"
                aria-label="GR8NIK STUDIOS professional studio recording hardware and microphone vocal chain"
              ></div>

              <div className="absolute bottom-4 left-4 z-20 font-space text-[10px] text-white tracking-widest flex flex-col gap-1 bg-black/70 p-3 border border-secondary/50 backdrop-blur-sm">
                <span>[ STATUS: <span className="text-primary">ONLINE</span> ]</span>
                <span>[ ARSENAL // VOCAL CHAIN ]</span>
              </div>
            </div>
          </div>

          {/* Right: Text Description */}
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tight uppercase text-white leading-none">
              MAKE IT  <br />
              <span className="text-primary">SOUND LIKE YOU.</span>
            </h2>

            <p className="font-space text-sm md:text-base text-muted leading-relaxed max-w-xl">
              Good equipment helps.
              <br />


              Good engineering matters.
              <br />

              But neither one makes a great record by itself.
              <br />
              <br />

              At GR8NIK, we care about the part that happens between the artist and the music — finding the right performance, making the right production decisions, fixing what needs fixing and knowing when to stop.
              <br />
              <br />

              We don't want every artist to leave sounding like GR8NIK.
              <br />


              We want you to leave sounding *more like yourself.*
              <br />


              From recording and vocal production to beats, mixing, mastering and everything in between, we build around what the record actually needs.</p>



            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
              <Link href="/pricing" className="flex items-center gap-2 border border-primary text-primary px-8 py-4 font-space text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors rounded-none group">
                RESERVE YOUR TIME
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
