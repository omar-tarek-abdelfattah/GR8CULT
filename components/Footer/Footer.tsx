import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-secondary bg-background py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand/Copyright */}
        <div className="flex flex-col gap-1">
          <span className="font-space text-xs text-muted tracking-widest">
            GR8NIK STUDIOS © {new Date().getFullYear()}
          </span>
          <span className="font-space text-[10px] text-secondary tracking-widest uppercase">
            WHERE MUSIC GETS MADE. THE CULTURE AROUND IT.
          </span>
        </div>

        {/* Right: Tactics & Badges */}
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-space text-xs text-muted tracking-widest hover:text-primary transition-colors cursor-crosshair">
            CAIRO_DISTRICT_COORD
          </span>
          <span className="font-space text-xs text-muted tracking-widest">
            INSTAPAY
          </span>
          <span className="font-space text-xs text-muted tracking-widest">
            VODAFONE_CASH
          </span>
          <div className="h-4 w-px bg-secondary mx-2"></div>
          <Link href="https://twitch.tv" target="_blank" rel="noreferrer" className="font-space text-xs text-muted tracking-widest hover:text-white transition-colors">
            TWITCH
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="font-space text-xs text-muted tracking-widest hover:text-white transition-colors">
            INSTAGRAM
          </Link>
        </div>
      </div>
    </footer>
  );
}
