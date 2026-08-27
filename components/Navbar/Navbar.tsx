import Link from "next/link";
import './Navbar.style.css'


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-secondary bg-background/90 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-0 text-primary hover:text-white transition-colors group cursor-pointer grouped-link">
          <img src="clean-crosshair-nobg.png" alt="gr8nik crosshair" className="w-20 h-auto crosshair" />
          <div className="logo relative">
            <img src="logo-nobg.png" alt="gr8nik logo" className="w-40 h-auto" />
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "VAULT", href: "/vault" },
            { name: "ABOUT", href: "/about" },
            { name: "RATES", href: "/#rates" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-space text-sm uppercase tracking-[0.2em] text-muted hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/#booking"
          className="hidden md:inline-flex border border-primary text-primary px-6 py-2 font-space text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-colors rounded-none"
        >
          BOOK YOUR SESSION NOW !
        </Link>
      </div>
    </nav>
  );
}
