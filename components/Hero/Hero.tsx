'use client';

import Link from "next/link";
import { Play } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import './Hero.style.css'

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex flex-row items-center justify-center gap-5 border-b border-secondary overflow-hidden bg-background px-4 md:px-12">
      {/* Background Grid Pattern (simulating the UI mockup) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Left side: Text Content */}
      <div className="relative z-10 flex flex-col items-start w-full max-w-2xl gap-6">
        <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-none drop-shadow-2xl">
          CRAFT THE SOUND.<br />
          <span className="text-primary pseudo">JOIN GR8NIK</span>
        </h1>

        <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">
          MANIFEST YOUR FATE<br />
          BECOME THE GR8.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 mt-8 w-full sm:w-auto">
          <Link href="/#booking" className="bg-primary text-white font-space text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary transition-colors rounded-none text-center border border-primary hover:border-secondary">
            LOCK IN A SESSION
          </Link>
          <Link href="https://wa.me/+201092501573" target="_blank" className="flex items-center justify-center gap-3 border border-secondary text-muted font-space text-xs uppercase tracking-widest px-8 py-4 hover:border-primary hover:text-white transition-all rounded-none bg-background/50 backdrop-blur-sm group">
            <Play className="w-3 h-3 fill-current group-hover:text-primary transition-colors" />
            STUDIO 01 SOUND &gt; READY
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
          {[`https://d2flaqome864xs.cloudfront.net/first-video-muted.mp4`,
            `https://d2flaqome864xs.cloudfront.net/second-video-muted.mp4`,
            `https://d2flaqome864xs.cloudfront.net/third-video-muted.mp4`,
            `https://d2flaqome864xs.cloudfront.net/fourth-video-muted.mp4`].map((video: string, index) => (
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
