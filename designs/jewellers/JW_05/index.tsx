"use client";

import React from "react";
import { Heart, Sparkles, Award } from "lucide-react";

export default function JW_05Design({ businessName = "Shringaar Bridal Trousseau" }: { businessName?: string }) {
  return (
    <div className="bg-[#0A0706] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-serif italic text-[#D4A72C]">
            Bridal Trousseau Atelier • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Timeless Treasures for the Indian Bride
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            Polki Mathapatti, Choker, Rani Haar, and Hathphool complete bridal sets customized to match your wedding lehenga colors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#150F0D] border border-[#2B1F1C] rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-xs font-serif text-[#D4A72C]">The Royal Rajputana Set</span>
            <p className="text-xs text-[#888]">Syndicate uncut polki with Zambian emerald drops.</p>
          </div>
          <div className="bg-[#150F0D] border border-[#2B1F1C] rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-xs font-serif text-[#D4A72C]">The South Indian Temple Set</span>
            <p className="text-xs text-[#888]">22kt handmade antique gold with ruby & pearl accents.</p>
          </div>
          <div className="bg-[#150F0D] border border-[#2B1F1C] rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-xs font-serif text-[#D4A72C]">The Modern Fusion Solitaire</span>
            <p className="text-xs text-[#888]">Tiered diamond necklace for cocktail and reception nights.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
