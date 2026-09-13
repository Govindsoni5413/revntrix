"use client";

import React, { useState } from "react";
import { Sparkles, Diamond, ShieldCheck, ChevronRight } from "lucide-react";

export default function JW_03Design({ businessName = "Maison de Joaillerie" }: { businessName?: string }) {
  return (
    <div className="bg-[#08080A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-serif italic text-[#D4A72C]">
            Haute Joaillerie Campaign • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Symphonies in Light & Rare Carats
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            A celebration of exceptional fancy-cut diamonds and natural unheated gemstones handcrafted in private Parisian ateliers.
          </p>
        </div>

        <div className="bg-[#121216] border border-[#23232C] rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
          <span className="text-[10px] font-mono text-[#D4A72C] uppercase">Crown Masterpiece</span>
          <h3 className="text-2xl font-serif text-[#F7F7F5]">The Constellation Diamond Collar</h3>
          <p className="text-xs text-[#A7A7A0] leading-relaxed">
            Featuring 42 carats of D-Flawless emerald-cut diamonds seamlessly articulated on platinum mesh to rest weightlessly on the collarbone.
          </p>
        </div>
      </div>
    </div>
  );
}
