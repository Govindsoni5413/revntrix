"use client";

import React, { useState } from "react";
import { Coffee, Croissant, Sparkles } from "lucide-react";

export default function RES_07Design({ businessName = "Atelier Artisanal Coffee Roasters" }: { businessName?: string }) {
  return (
    <div className="bg-[#0A0807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Specialty Micro-Roastery
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Single-Origin Specialty Brews & French Pastries
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} micro-roasts single-estate Arabica beans from Chikmagalur and pairs them with double-baked almond croissants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-5 flex flex-col gap-2">
            <Coffee className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Pour-Over V60 Bar</h4>
            <p className="text-xs text-[#888]">Notes of wild berries, cacao nibs, and jasmine blossom.</p>
          </div>
          <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-5 flex flex-col gap-2">
            <Croissant className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">French Viennoiserie</h4>
            <p className="text-xs text-[#888]">Laminated with 84% French butter, baked fresh every morning.</p>
          </div>
          <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-5 flex flex-col gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Cold Brew on Nitro Tap</h4>
            <p className="text-xs text-[#888]">18-hour slow cold extraction with creamy micro-foam head.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
