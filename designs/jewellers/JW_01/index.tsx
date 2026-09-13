"use client";

import React, { useState } from "react";
import { Gem, Sparkles, Award, Shield, Check } from "lucide-react";

export default function JW_01Design({ businessName = "Kalyan Heritage Jewellers" }: { businessName?: string }) {
  return (
    <div className="bg-[#0A0706] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-serif italic text-[#D4A72C] tracking-widest uppercase">
            Royal Heritage • Est. 1928 • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#F7F7F5]">
            Handcrafted Polki & Heirloom Gold
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg leading-relaxed">
            Preserving centuries of royal Jadau, uncut diamond Polki, and antique temple gold craft for India's finest bridal legacies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#140F0D] border border-[#2D1F1B] rounded-2xl p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] font-mono text-[#D4A72C] uppercase">Uncut Diamonds</span>
              <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">Bikaner Jadau Choker</h4>
            </div>
            <span className="text-xs text-[#D4A72C]">22kt Hallmarked Gold Inlay</span>
          </div>
          <div className="bg-[#140F0D] border border-[#2D1F1B] rounded-2xl p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] font-mono text-[#D4A72C] uppercase">Zambian Emerald</span>
              <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">The Nizami Haar</h4>
            </div>
            <span className="text-xs text-[#D4A72C]">Certified Natural Emeralds</span>
          </div>
          <div className="bg-[#140F0D] border border-[#2D1F1B] rounded-2xl p-6 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] font-mono text-[#D4A72C] uppercase">Temple Gold</span>
              <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">Antique Nakshi Kadas</h4>
            </div>
            <span className="text-xs text-[#D4A72C]">Hand-Sculpted Deity Motifs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
