import Link from "next/link";
import Image from "next/image";
import { Disc, ArrowLeft, VolumeX, Sliders } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center relative px-4 py-16 md:py-24 overflow-hidden min-h-[70vh]">
      {/* Background Ambience: Studio Grid & Subtle Red Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Watermarked Studio Crosshair in Center Background */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none select-none opacity-5">
        <Image
          src="/clean-crosshair-nobg.png"
          alt="gr8"
          width={384}
          height={384}
          aria-hidden="true"
          className="w-80 h-80 md:w-96 md:h-96 object-contain"
          priority
        />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-secondary/60 bg-[#080808]/90 text-[11px] font-space tracking-[0.25em] text-muted uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
          </span>
          <span>ERROR 404 // FREQUENCY LOST</span>
        </div>

        {/* Big Impact 404 Title */}
        <div className="flex flex-col items-center">
          <h1 className="font-bebas text-8xl sm:text-9xl md:text-[11rem] leading-none tracking-tight text-white select-none drop-shadow-2xl">
            4<span className="text-primary drop-shadow-[0_0_35px_rgba(214,0,0,0.65)]">0</span>4
          </h1>
          <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl tracking-[0.15em] text-zinc-300 uppercase -mt-2 sm:-mt-4">
            DEAD CHANNEL // OUT OF MATRIX
          </h2>
        </div>

        {/* Explanatory Description */}
        <p className="font-space text-xs sm:text-sm text-muted uppercase tracking-[0.18em] sm:tracking-[0.22em] max-w-lg leading-relaxed">
          The sound, track, or coordinates you are looking for do not exist in this sanctuary or have been purged from the archive.
        </p>

        {/* Studio Telemetry Readout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg border border-secondary/40 bg-[#080808]/80 p-3 font-space text-[10px] sm:text-[11px] tracking-wider text-muted">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <VolumeX className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>GAIN: <strong className="text-zinc-300">-INF dB</strong></span>
          </div>
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <Sliders className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>CH: <strong className="text-zinc-300">MUTED</strong></span>
          </div>
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span>PEAK: <strong className="text-zinc-300">0.00</strong></span>
          </div>
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span>SIG: <strong className="text-primary">DROP</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-2 w-full sm:w-auto">
          {/* Primary CTA */}
          <Link
            href="/"
            className="group bg-primary text-white font-space text-xs uppercase tracking-widest px-7 py-3.5 hover:bg-secondary transition-all rounded-none border border-primary hover:border-secondary flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(214,0,0,0.3)]"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO FREQUENCY</span>
          </Link>

          {/* Secondary CTA: Enter the Vault */}
          <Link
            href="/vault"
            className="flex items-center justify-center gap-3 border border-secondary text-zinc-100 font-space text-xs uppercase tracking-widest px-7 py-3.5 hover:border-primary hover:bg-primary/15 hover:text-white hover:shadow-[0_0_20px_rgba(214,0,0,0.4)] transition-all rounded-none bg-background/50 backdrop-blur-sm group text-center"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
            </span>
            <Disc className="w-3.5 h-3.5 text-primary group-hover:rotate-180 transition-transform duration-500 shrink-0" />
            <span>ENTER THE VAULT</span>
          </Link>
        </div>

        {/* Subtle coordinate footer */}
        <div className="font-space text-[10px] tracking-[0.2em] text-zinc-600 uppercase mt-4">
          GR8NIK STUDIOS // MOKATTAM, CAIRO [SYS_ERR: 404]
        </div>

      </div>
    </div>
  );
}
