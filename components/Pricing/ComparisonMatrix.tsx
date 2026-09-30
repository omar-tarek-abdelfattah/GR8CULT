'use client';

import { comparisonTable } from "./pricingData";
import { usePricingCurrency } from "./PricingCurrencyContext";

export default function ComparisonMatrix() {
  const { currency } = usePricingCurrency();

  return (
    <section
      id="comparison"
      className="py-20 border-t border-secondary/60 bg-[#060606] scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="font-space text-xs sm:text-sm text-primary tracking-[0.25em] uppercase block mb-2 font-semibold">
            TRANSPARENT FEATURE BREAKDOWN
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase m-0 leading-none">
            PRICE COMPARISON MATRIX
          </h2>
          <p className="font-space text-xs sm:text-sm text-muted tracking-widest uppercase mt-2">
            [ SEE EXACTLY WHAT EACH SERVICE &amp; BUNDLE DELIVERS ]
          </p>
        </div>

        <div className="overflow-x-auto border border-secondary/60 bg-[#080808]">
          <table className="w-full text-left border-collapse font-space text-sm">
            <thead>
              <tr className="border-b border-secondary/60 bg-black text-white">
                <th className="p-4 sm:p-5 uppercase tracking-wider font-semibold text-zinc-400 text-xs sm:text-sm min-w-[200px]">
                  SERVICE
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider font-bold text-white text-xs sm:text-sm min-w-[150px]">
                  INDIVIDUAL PRICE
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  RECORDING
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  VOCAL DIRECTION
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  BEAT
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  MIX
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  MASTER
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  ROUGH MIX
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300 text-xs sm:text-sm">
                  FREE REVISION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/40 text-zinc-300 text-sm sm:text-[15px]">
              {comparisonTable.map((row, index) => (
                <tr
                  key={index}
                  className={`transition-colors ${
                    row.highlight
                      ? "bg-primary/5 hover:bg-primary/10"
                      : "hover:bg-zinc-900/60"
                  }`}
                >
                  <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                    {row.highlight && (
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                    )}
                    <span>{row.service}</span>
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-primary text-base sm:text-lg">
                    {currency === "USD" && row.priceUsd ? row.priceUsd : row.price}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-medium">{row.recording}</td>
                  <td className="p-4 sm:p-5 text-center font-medium">{row.vocalDirection}</td>
                  <td className="p-4 sm:p-5 text-center font-medium">
                    {row.beat}
                  </td>
                  <td className="p-4 sm:p-5 text-center font-medium">{row.mix}</td>
                  <td className="p-4 sm:p-5 text-center font-medium">{row.master}</td>
                  <td className="p-4 sm:p-5 text-center font-medium">{row.roughMix}</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-white">
                    {row.revision}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
