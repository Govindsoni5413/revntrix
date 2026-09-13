"use client";

import React from "react";
import { Sparkles, ShoppingBag } from "lucide-react";

export default function ECO_06Design({ businessName = "Nomad Living Essentials" }: { businessName?: string }) {
  return (
    <div className="bg-[#0C0B0A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-serif italic text-[#D4A72C]">
            Shoppable Stories • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Mindfully Crafted for Everyday Rituals
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#161412] border border-[#2B2622] rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-xs text-[#D4A72C]">Ceramics</span>
              <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">Hand-Thrown Stoneware Mug</h4>
            </div>
            <span className="text-sm font-bold text-[#D4A72C]">₹ 1,450</span>
          </div>
          <div className="bg-[#161412] border border-[#2B2622] rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-xs text-[#D4A72C]">Textiles</span>
              <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">Washed Belgian Linen Throw</h4>
            </div>
            <span className="text-sm font-bold text-[#D4A72C]">₹ 4,200</span>
          </div>
          <div className="bg-[#161412] border border-[#2B2622] rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-xs text-[#D4A72C]">Aromatherapy</span>
              <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">Hinoki & Sandalwood Candle</h4>
            </div>
            <span className="text-sm font-bold text-[#D4A72C]">₹ 2,100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
