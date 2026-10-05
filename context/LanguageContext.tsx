'use client';

import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import { en, TranslationType } from '@/locales/en';
import { ar } from '@/locales/ar';

export type Locale = 'en' | 'ar';

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  isRTL: boolean;
  dict: TranslationType;
  t: (key: string, fallback?: string) => string;
}

const dictionaries: Record<Locale, TranslationType> = {
  en,
  ar,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gr8cult_locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [, startTransition] = useTransition();

  // Initialize from URL param, localStorage, or cookie on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang')?.toLowerCase();
        if (langParam === 'ar' || langParam === 'en') {
          setLocaleState(langParam);
          localStorage.setItem(STORAGE_KEY, langParam);
          document.cookie = `${STORAGE_KEY}=${langParam}; path=/; max-age=31536000; SameSite=Lax`;
          document.documentElement.lang = langParam;
          document.documentElement.dir = langParam === 'ar' ? 'rtl' : 'ltr';
          return;
        }
      }

      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'en' || stored === 'ar') {
        setLocaleState(stored);
        document.documentElement.lang = stored;
        document.documentElement.dir = stored === 'ar' ? 'rtl' : 'ltr';
      }
    } catch {
      // Storage access restricted
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    startTransition(() => {
      setLocaleState(newLocale);
      try {
        localStorage.setItem(STORAGE_KEY, newLocale);
        document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = newLocale;
        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      } catch {
        // Storage access restricted
      }
    });
  };

  const toggleLocale = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    setLocale(next);
  };

  const currentDict = dictionaries[locale] || en;

  // Fallback string resolver: e.g. t("hero.headline1")
  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = currentDict;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return typeof current === 'string' ? current : fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        isRTL: locale === 'ar',
        dict: currentDict,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
