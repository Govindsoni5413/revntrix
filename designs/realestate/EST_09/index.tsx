"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, ShieldCheck, DollarSign } from "lucide-react";

export default function EST_09Design({ businessName = "YieldPrime Commercial Real Estate" }: { businessName?: string }) {
  const [investmentAmount, setInvestmentAmount] = useState(500); // 500 Lakhs = 5 Cr
  const grossYield = 8.4; // 8.4%
  const annualIncome = ((investmentAmount * 100000 * grossYield) / 100).toLocaleString("en-IN");

  return (
    <div className="bg-[#090A0B] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#22C55E] uppercase tracking-widest bg-[#22C55E]/10 px-3 py-1 rounded-full border border-[#22C55E]/30">
            Institutional Grade Assets
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">High-Yield Pre-Leased Commercial</h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} sources grade-A IT parks & banks pre-leased to Fortune 500 tenants with 9-year locked in escalations.
          </p>
        </div>

        {/* Interactive Yield Calculator */}
        <div className="bg-[#121417] border border-[#23272F] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-[#1E222A] pb-4">
            <span className="text-sm font-bold text-[#F7F7F5] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#D4A72C]" />
              Pre-Leased Cashflow Simulator
            </span>
            <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded font-bold">
              Avg Yield: {grossYield}% p.a.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-[#A7A7A0]">
              <span>Investment Size:</span>
              <strong className="text-[#D4A72C] font-mono text-sm">₹ {(investmentAmount / 100).toFixed(2)} Cr</strong>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full accent-[#D4A72C] cursor-pointer"
            />
          </div>

          <div className="bg-[#0B0D10] p-4 rounded-xl border border-[#1C2028] flex justify-between items-center">
            <span className="text-xs text-[#A7A7A0]">Estimated Annual Rental Inflow:</span>
            <span className="text-lg font-bold text-[#22C55E] font-mono">₹ {annualIncome} / yr</span>
          </div>
        </div>
      </div>
    </div>
  );
}
