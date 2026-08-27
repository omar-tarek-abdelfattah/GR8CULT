import CinematicIntro from "@/components/Intro/CinematicIntro";
import Hero from "@/components/Hero/Hero";
import AudioEvolution from "@/components/Audio/AudioEvolution";
import HardwareShowcase from "@/components/HardwareShowcase/HardwareShowcase";
import ServicesShowcase from "@/components/ServicesShowcase/ServicesShowcase";
import BookingMatrix from "@/components/Booking/BookingMatrix";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <CinematicIntro />
      <Hero />
      <AudioEvolution />
      <HardwareShowcase />
      <ServicesShowcase />
      <BookingMatrix />
    </div>
  );
}
