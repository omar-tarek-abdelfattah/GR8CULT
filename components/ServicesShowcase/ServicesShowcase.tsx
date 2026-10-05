'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { Mic, SlidersHorizontal, Disc3, UserStar, Tv, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function ServicesShowcase() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { dict, isRTL } = useLanguage();

  const services = [
    {
      id: 1,
      title: dict.services.items.vocal.title,
      description: dict.services.items.vocal.desc,
      icon: Mic,
      tag: dict.services.items.vocal.tag
    },
    {
      id: 2,
      title: dict.services.items.mixMaster.title,
      description: dict.services.items.mixMaster.desc,
      icon: SlidersHorizontal,
      tag: dict.services.items.mixMaster.tag
    },
    {
      id: 3,
      title: dict.services.items.beatProd.title,
      description: dict.services.items.beatProd.desc,
      icon: Disc3,
      tag: dict.services.items.beatProd.tag
    },
    {
      id: 4,
      title: dict.services.items.commercial.title,
      description: dict.services.items.commercial.desc,
      icon: Tv,
      tag: dict.services.items.commercial.tag
    },
    {
      id: 5,
      title: dict.services.items.management.title,
      description: dict.services.items.management.desc,
      icon: UserStar,
      tag: dict.services.items.management.tag
    },
    {
      id: 6,
      title: dict.services.items.musicVideos.title,
      description: dict.services.items.musicVideos.desc,
      icon: UserStar,
      tag: dict.services.items.musicVideos.tag
    }
  ];

  return (
    <section className="w-full py-24 border-b border-secondary bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="mb-16 text-center md:text-start flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-bebas text-5xl md:text-7xl tracking-tight uppercase text-white leading-none">
              {dict.services.title1} <span className="text-primary">{dict.services.title2}</span>
            </h2>
            <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em] mt-6">
              {dict.services.tagline}
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/pricing" className="border border-secondary text-muted px-6 py-2 font-space text-[10px] uppercase tracking-widest hover:border-primary hover:text-white transition-colors bg-[#050505]">
              {dict.services.viewRates}
            </Link>
          </div>
        </div>

        {/* Carousel Container with Left & Right Navigation Buttons */}
        <div className="relative w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => isRTL ? swiperInstance?.slideNext() : swiperInstance?.slidePrev()}
            aria-label="Previous Service"
            className="absolute -left-2 sm:left-0 md:-left-8 top-[210px] -translate-y-1/2 z-30 p-2 text-white/70 hover:text-primary transition-all duration-200 cursor-pointer group"
          >
            <ChevronLeft className="w-8 h-8 md:w-11 md:h-11 transition-transform group-hover:-translate-x-1 drop-shadow-lg" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => isRTL ? swiperInstance?.slidePrev() : swiperInstance?.slideNext()}
            aria-label="Next Service"
            className="absolute -right-2 sm:right-0 md:-right-8 top-[210px] -translate-y-1/2 z-30 p-2 text-white/70 hover:text-primary transition-all duration-200 cursor-pointer group"
          >
            <ChevronRight className="w-8 h-8 md:w-11 md:h-11 transition-transform group-hover:translate-x-1 drop-shadow-lg" />
          </button>

          <Swiper
            key={isRTL ? 'swiper-rtl' : 'swiper-ltr'}
            dir={isRTL ? 'rtl' : 'ltr'}
            onSwiper={setSwiperInstance}
            loop={false}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-secondary !opacity-50 !w-2 !h-2 !rounded-none transition-all duration-300 mx-1',
              bulletActiveClass: '!bg-primary !opacity-100 !w-4'
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="w-full pb-16"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <SwiperSlide key={service.id} className="max-w-[320px] md:max-w-[380px] w-full group">
                  {/* @ts-ignore */}
                  {({ isActive }) => (
                    <div className={`
                      relative overflow-hidden flex flex-col h-[420px] p-8 border transition-all duration-500 bg-[#050505]
                      ${isActive ? 'border-primary shadow-[0_0_30px_-5px_rgba(214,0,0,0.3)]' : 'border-secondary/50 opacity-60 scale-95'}
                    `}>
                      {/* Background Icon */}
                      <Icon className={`absolute -bottom-12 -right-12 w-96 h-96 transition-all duration-700 pointer-events-none
                        ${isActive ? 'text-primary/20 rotate-12 scale-110' : 'text-secondary/10 -rotate-12'}
                      `} />

                      <div className="relative z-10 flex justify-between items-start mb-8">
                        <div className="p-3 border border-secondary/50 bg-[#111] rounded-sm">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <span className="font-space text-[10px] text-muted tracking-widest px-2 py-1 border border-secondary/30 bg-black">
                          {service.tag}
                        </span>
                      </div>

                      <div className="mt-auto relative z-10">
                        <h3 className="font-bebas text-3xl tracking-wider text-white mb-4">
                          {service.title}
                        </h3>
                        <p className="font-space text-sm text-muted leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      <div className={`relative z-10 mt-8 pt-6 border-t border-secondary/30 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <Link href="/pricing" className="font-space text-xs text-primary uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 w-max">
                          {dict.services.bookNow} <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Mobile View Rates Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/pricing" className="border border-secondary text-muted px-8 py-3 font-space text-xs uppercase tracking-widest hover:border-primary hover:text-white transition-colors bg-[#050505]">
            {dict.services.viewRates}
          </Link>
        </div>
      </div>
    </section>
  );
}
