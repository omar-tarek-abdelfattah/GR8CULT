'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqsData as faqsDataEn } from "./pricingData";
import { faqsDataAr } from "./pricingDataAr";
import { useLanguage } from "@/context/LanguageContext";

export default function FaqSection() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const currentFaqs = isAr ? faqsDataAr : faqsDataEn;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 border-t border-secondary/60 bg-[#060606] scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <span className="font-space text-xs sm:text-sm text-primary tracking-[0.25em] uppercase block mb-2 font-semibold">
            {isAr ? "الأسئلة اللي بتتكرر" : "FREQUENTLY ASKED QUESTIONS"}
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase m-0 leading-none">
            {isAr ? "تفاصيل السيشن // الأسئلة الشائعة" : "SESSION INTELLIGENCE // FAQ"}
          </h2>
          <p className="font-space text-xs sm:text-sm text-muted tracking-widest uppercase mt-2">
            {isAr
              ? `[ إجابات لكل سؤال ممكن يجي في بالك عن الاستوديو ]`
              : `[ ${currentFaqs.length} ANSWERS TO EVERYTHING YOU NEED TO KNOW ]`}
          </p>
        </div>

        <div className="space-y-3 font-space">
          {currentFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-secondary/60 bg-[#090909] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 text-sm sm:text-base text-white uppercase tracking-wider hover:text-primary transition-colors cursor-pointer font-bold"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-[15px] text-zinc-300 leading-relaxed border-t border-secondary/30 text-start">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
