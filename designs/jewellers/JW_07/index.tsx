"use client";

import React, { useState } from "react";
import { Sparkles, Hammer, Flame, Award } from "lucide-react";

export default function JW_07Design({ businessName = "The Karigar Atelier" }: { businessName?: string }) {
  return (
    <div className="bg-[#090706] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-serif italic text-[#D4A72C]">
            Master Craftsmen Legacy • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            From Molten Gold to Museum Masterpiece
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            Over 200 hours of meticulous hand-chasing, die-punching, and microscopic prong setting goes into every jewel we forge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#140F0D] border border-[#2B1F1C] rounded-2xl p-5 flex flex-col gap-2">
            <Flame className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">1. Hand Alloying</h4>
            <p className="text-xs text-[#888]">Melting 24kt pure bullion into 18kt/22kt ductile gold wire.</p>
          </div>
          <div className="bg-[#140F0D] border border-[#2B1F1C] rounded-2xl p-5 flex flex-col gap-2">
            <Hammer className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">2. Nakshi & Filigree</h4>
            <p className="text-xs text-[#888]">Traditional Indian embossed carving using miniature bone chisels.</p>
          </div>
          <div className="bg-[#140F0D] border border-[#2B1F1C] rounded-2xl p-5 flex flex-col gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">3. Micro-Pavé Setting</h4>
            <p className="text-xs text-[#888]">Precision setting under 40x stereomicroscopes for maximum light return.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
