'use client';

import Link from "next/link";
import { Disc } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import './Hero.style.css'

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-5 border-b border-secondary overflow-hidden bg-background px-4 md:px-12 py-12 lg:py-0">
      {/* Background Grid Pattern (simulating the UI mockup) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Left side: Text Content */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left w-full max-w-2xl gap-6">
        <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-none drop-shadow-2xl text-center md:text-left">
          CRAFT THE SOUND.<br />
          <span className="text-primary pseudo">JOIN GR8NIK</span>
        </h1>

        <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2 text-center md:text-left">
          MANIFEST YOUR FATE<br />
          BECOME THE GR8.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-4 mt-8 w-full sm:w-auto">
          <Link href="/#booking" className="bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary transition-colors rounded-none text-center border border-primary hover:border-secondary">
            LOCK IN A SESSION
          </Link>
          <Link
            href="/vault"
            className="flex items-center justify-center gap-3 border border-secondary text-zinc-100 font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:bg-primary/15 hover:text-white hover:shadow-[0_0_20px_rgba(214,0,0,0.4)] transition-all rounded-none bg-background/50 backdrop-blur-sm group text-center"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
            </span>
            <Disc className="w-3.5 h-3.5 text-primary group-hover:rotate-180 transition-transform duration-500 shrink-0" />
            <span>ENTER THE VAULT</span>
          </Link>
        </div>
      </div>

      {/* Right side: Vertical Video Slider */}
      <div className="relative z-10 h-full w-full max-w-sm py-12 hidden lg:block">
        {/* Subtle gradient fades for top and bottom of the slider */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>

        <Swiper
          direction={'vertical'}
          slidesPerView={1.2}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          mousewheel={true}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,

          }}
          modules={[Autoplay, Mousewheel]}
          className="h-full w-full"
        >
          {/* Example Slides (Replace with your actual video paths) */}
          {[`https://d2flaqome864xs.cloudfront.net/vid1.mp4`,
            `https://d2flaqome864xs.cloudfront.net/vid2.mp4`,
            `https://d2flaqome864xs.cloudfront.net/vid3.mp4`,
            `https://d2flaqome864xs.cloudfront.net/vid4.mp4`].map((video: string, index) => (
              <SwiperSlide key={index} className="transition-opacity duration-500 overflow-hidden border border-secondary/50 rounded-sm bg-black">
                {({ isActive }: any) => (
                  <div className={`w-full h-full relative ${isActive ? 'opacity-100' : 'opacity-40 grayscale'} transition-all duration-700`}>
                    {/* Using a placeholder video, swap with actual paths like /vid-${index}.mp4 */}
                    <video
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={`GR8NIK STUDIOS recording session reel clip ${index + 1}`}
                      title="GR8NIK STUDIOS studio session highlight"
                      className="object-cover w-full h-full"
                    />
                    {/* Stylistic Overlay */}
                    <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-10"></div>
                  </div>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
