'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  id?: string;
}

/**
 * SEO & Performance-Safe Scroll Reveal Component
 * - Progressive enhancement: renders standard opacity:1 on SSR and for non-JS scrapers.
 * - Bypasses animation for above-the-fold content to preserve LCP (Largest Contentful Paint).
 * - Triggers immediately for tall headless bot viewports (Googlebot Evergreen Chromium).
 * - Disconnects observer once revealed (once: true) to eliminate scroll-loop overhead.
 * - Respects prefers-reduced-motion for accessibility.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
  id,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    // If already in or above viewport on mount, render immediately without delay
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    // Arm the scroll reveal for below-the-fold elements
    setIsArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  // If not armed (SSR & initial load), no animation classes are attached (opacity: 1)
  const revealClasses = isArmed
    ? `scroll-reveal ${isVisible ? 'is-visible' : ''}`
    : '';

  return (
    <Component
      ref={ref as any}
      id={id}
      className={`${revealClasses} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
