import { Calendar, ArrowUpRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function BookingMatrix() {
  return (
    <section id="booking" className="relative w-full py-24 md:py-32 bg-background border-t border-secondary overflow-hidden">
      {/* Background radial glow & tactical grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,0,0,0.12)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Anchor for existing #rates links */}
      <div id="rates" className="absolute -top-12 left-0"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center flex flex-col items-center">
        {/* Tactical Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-primary/50 bg-primary/10 text-primary font-space text-[11px] tracking-[0.25em] uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SESSION TRANSMISSION // READY</span>
        </div>

        {/* Direct Call to Action Title */}
        <h2 className="font-bebas text-5xl sm:text-6xl md:text-8xl tracking-tight text-white uppercase leading-none mb-6">
          CLAIM YOUR TIME.<br />
          <span className="text-primary">FORGE YOUR LEGACY.</span>
        </h2>

        {/* Motivating Copy */}
        <p className="font-space text-base md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-4 font-light">
          Greatness isn't accidental—it's engineered. Step into Cairo's premier sonic sanctuary where raw analog warmth converges with surgical digital precision.
        </p>
        <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em] max-w-xl mb-12">
          "Don’t let your vision remain an unmastered frequency. Lock in the facility, capture raw energy, and build cultural artifacts that outlive the creator."
        </p>

        {/* 2 Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-5 w-full sm:w-auto">
          {/* Google Calendar Slots Button */}
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3LvlOtrmBmmhsShjPRpw0gZjUH2IUfHPInqNnD0fEmuxQ2tAu28FSXvEE4AfdRtF6RpuQfr1z-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-5 hover:bg-white hover:text-black transition-all border border-primary hover:border-white shadow-[0_0_25px_rgba(214,0,0,0.35)] group cursor-pointer"
          >
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>VIEW CALENDAR SLOTS</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* WhatsApp Link Button */}
          <a
            href="https://wa.me/+201011444140"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#0a0a0a] border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-5 hover:border-primary hover:text-white hover:bg-black transition-all group cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <span>BOOK VIA WHATSAPP</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
