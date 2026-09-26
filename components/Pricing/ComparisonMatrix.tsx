'use client';

import { comparisonTable } from "./pricingData";

export default function ComparisonMatrix() {
  return (
    <section
      id="comparison"
      className="py-20 border-t border-secondary/60 bg-[#060606] scroll-mt-14"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="font-space text-xs text-primary tracking-[0.25em] uppercase block mb-2">
            TRANSPARENT FEATURE BREAKDOWN
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider uppercase m-0">
            PRICE COMPARISON MATRIX
          </h2>
          <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
            [ SEE EXACTLY WHAT EACH SERVICE &amp; BUNDLE DELIVERS ]
          </p>
        </div>

        <div className="overflow-x-auto border border-secondary/60 bg-[#080808]">
          <table className="w-full text-left border-collapse font-space text-xs">
            <thead>
              <tr className="border-b border-secondary/60 bg-black text-white">
                <th className="p-4 sm:p-5 uppercase tracking-wider font-semibold text-zinc-400 min-w-[200px]">
                  SERVICE
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider font-bold text-white min-w-[140px]">
                  INDIVIDUAL PRICE
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  RECORDING
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  VOCAL DIRECTION
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  BEAT
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  MIX
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  MASTER
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  ROUGH MIX
                </th>
                <th className="p-4 sm:p-5 uppercase tracking-wider text-center font-semibold text-zinc-300">
                  FREE REVISION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/40 text-zinc-300">
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
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    )}
                    <span>{row.service}</span>
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-primary">
                    {row.price}
                  </td>
                  <td className="p-4 sm:p-5 text-center">{row.recording}</td>
                  <td className="p-4 sm:p-5 text-center">{row.vocalDirection}</td>
                  <td className="p-4 sm:p-5 text-center font-medium">
                    {row.beat}
                  </td>
                  <td className="p-4 sm:p-5 text-center">{row.mix}</td>
                  <td className="p-4 sm:p-5 text-center">{row.master}</td>
                  <td className="p-4 sm:p-5 text-center">{row.roughMix}</td>
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
