import { Metadata } from "next";
import AboutTabs from "@/components/AboutTabs/AboutTabs";

export const metadata: Metadata = {
  title: "About | GR8NIK STUDIOS",
  description: "The cultural future of Egypt's independent music scene.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Header */}
      <section className="border-b border-secondary pt-16 pb-8 relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-bebas text-6xl md:text-8xl tracking-wider uppercase text-white mb-2">
            IDENTITY // <span className="text-primary">GR8CULT</span>
          </h1>
          <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em]">
            [ THE ARCHITECTURE OF SOUND ]
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AboutTabs />
        </div>
      </section>
    </div>
  );
}
