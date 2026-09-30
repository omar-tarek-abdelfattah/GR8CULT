'use client';

import React, { createContext, useContext, useState } from "react";

export type Currency = "EGP" | "USD";

interface PricingCurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
}

const PricingCurrencyContext = createContext<PricingCurrencyContextType>({
  currency: "EGP",
  setCurrency: () => {},
  toggleCurrency: () => {},
});

export function PricingCurrencyProvider({
  children,
  initialCurrency = "EGP",
}: {
  children: React.ReactNode;
  initialCurrency?: Currency;
}) {
  const [currency, setCurrency] = useState<Currency>(initialCurrency);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "EGP" ? "USD" : "EGP"));
  };

  return (
    <PricingCurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency }}>
      {children}
    </PricingCurrencyContext.Provider>
  );
}

export function usePricingCurrency() {
  return useContext(PricingCurrencyContext);
}
