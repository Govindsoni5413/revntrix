"use client";

import React, { useState } from "react";
import { Leaf, Sun, Award } from "lucide-react";

export default function RES_03Design({ businessName = "Earth & Seed Organic Bistro" }: { businessName?: string }) {
  return (
    <div className="bg-[#0B0D0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#22C55E] uppercase tracking-widest bg-[#22C55E]/10 px-3 py-1 rounded-full border border-[#22C55E]/30">
            100% Farm-To-Table Regenerative
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Nourishing Soils. Honest Cooking.
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} sources organic heirloom vegetables, stoneground flour, and pasture-raised dairy directly from local regenerative farms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121614] border border-[#202924] rounded-2xl p-5 flex flex-col gap-2">
            <Leaf className="w-5 h-5 text-[#22C55E]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Zero Pesticide Produce</h4>
            <p className="text-xs text-[#888]">Harvested within 24 hours of arriving at our kitchen.</p>
          </div>
          <div className="bg-[#121614] border border-[#202924] rounded-2xl p-5 flex flex-col gap-2">
            <Sun className="w-5 h-5 text-[#22C55E]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Cold-Pressed Oils Only</h4>
            <p className="text-xs text-[#888]">Wood-pressed mustard, sesame, and extra virgin olive oils.</p>
          </div>
          <div className="bg-[#121614] border border-[#202924] rounded-2xl p-5 flex flex-col gap-2">
            <Award className="w-5 h-5 text-[#22C55E]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">100% Sourdough Bakery</h4>
            <p className="text-xs text-[#888]">Slow 36-hour wild fermentation with zero commercial yeast.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
