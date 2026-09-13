"use client";

import React from "react";
import { Award, CheckCircle2, TrendingUp } from "lucide-react";

export default function EST_08Design({ businessName = "Vikram Singhania Luxury Advisory" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-[#222] pb-8">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#382B1B] to-[#141414] border-2 border-[#D4A72C] flex items-center justify-center shrink-0">
            <span className="text-3xl font-bold text-[#D4A72C]">VS</span>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Private Real Estate Wealth Advisor
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F5]">{businessName}</h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0]">
              Over 14 years representing UHNW families, family offices & CXOs in acquiring marquee real estate assets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-1">
            <span className="text-2xl font-bold text-[#D4A72C]">₹ 680 Cr+</span>
            <h4 className="text-xs font-bold text-[#F7F7F5]">Lifetime Transaction Volume</h4>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-1">
            <span className="text-2xl font-bold text-[#D4A72C]">100%</span>
            <h4 className="text-xs font-bold text-[#F7F7F5]">Confidentiality Guarantee</h4>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-1">
            <span className="text-2xl font-bold text-[#D4A72C]">42 Days</span>
            <h4 className="text-xs font-bold text-[#F7F7F5]">Average Liquidation Velocity</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
