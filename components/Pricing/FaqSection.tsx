'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqsData } from "./pricingData";

export default function FaqSection() {
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
          <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
            SESSION INTELLIGENCE // FAQ
          </h2>
          <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
            [ 17 ANSWERS TO EVERYTHING YOU NEED TO KNOW ]
          </p>
        </div>

        <div className="space-y-3 font-space">
          {faqsData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-secondary/60 bg-[#090909] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm text-white uppercase tracking-wider hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-secondary/30">
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
