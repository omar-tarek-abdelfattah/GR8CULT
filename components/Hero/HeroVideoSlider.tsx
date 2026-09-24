'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

const VIDEOS = [
  'https://d2flaqome864xs.cloudfront.net/vid1.mp4',
  'https://d2flaqome864xs.cloudfront.net/vid2.mp4',
  'https://d2flaqome864xs.cloudfront.net/vid3.mp4',
  'https://d2flaqome864xs.cloudfront.net/vid4.mp4',
];

export default function HeroVideoSlider() {
  return (
    <div className="relative z-10 h-full w-full max-w-sm py-12 hidden lg:block">
      {/* Subtle gradient fades for top and bottom of the slider */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

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
        {VIDEOS.map((video: string, index: number) => (
          <SwiperSlide
            key={index}
            className="transition-opacity duration-500 overflow-hidden border border-secondary/50 rounded-sm bg-black"
          >
            {({ isActive }: any) => (
              <div
                className={`w-full h-full relative ${
                  isActive ? 'opacity-100' : 'opacity-40 grayscale'
                } transition-all duration-700`}
              >
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
                <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-10" />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
