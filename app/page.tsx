import CinematicIntro from "@/components/Intro/CinematicIntro";
import Hero from "@/components/Hero/Hero";
import AudioEvolution from "@/components/Audio/AudioEvolution";
import HardwareShowcase from "@/components/HardwareShowcase/HardwareShowcase";
import ServicesShowcase from "@/components/ServicesShowcase/ServicesShowcase";
import BookingMatrix from "@/components/Booking/BookingMatrix";
import SpotifyPlaylist from "@/components/SpotifyPlaylist/SpotifyPlaylist";
import ScrollReveal from "@/components/Scroll/ScrollReveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <CinematicIntro />
      {/* Hero renders immediately to preserve LCP and guarantee instant bot render */}
      <Hero />

      <ScrollReveal>
        <AudioEvolution />
      </ScrollReveal>

      <ScrollReveal>
        <HardwareShowcase />
      </ScrollReveal>

      <ScrollReveal>
        <ServicesShowcase />
      </ScrollReveal>

      <ScrollReveal>
        <BookingMatrix />
      </ScrollReveal>

      <ScrollReveal>
        <SpotifyPlaylist />
      </ScrollReveal>
    </div>
  );
}
