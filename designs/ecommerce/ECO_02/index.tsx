"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function ECO_02Design({ businessName = "Atelier Noir Streetwear" }: { businessName?: string }) {
  const [activeLook, setActiveLook] = useState(0);

  const looks = [
    { title: "Look 01: Oversized Acid Wash Trench", price: "₹ 8,900", fabric: "500 GSM Heavyweight Japanese Cotton" },
    { title: "Look 02: Modular Cargo Utility Pant", price: "₹ 5,400", fabric: "Water-Repellent Ripstop with Cobra Buckles" },
    { title: "Look 03: Raw Seam Boxy Knit Sweater", price: "₹ 4,800", fabric: "100% Merino Wool with Distressed Hem" },
  ];

  return (
    <div className="bg-[#050505] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex justify-between items-start border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">{businessName}</span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#F7F7F5] tracking-tight uppercase mt-1">
              Editorial Drop 04
            </h1>
          </div>
          <span className="text-xs font-mono text-[#666] border border-[#222] px-3 py-1 rounded-full">
            Limited 100 Pieces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {looks.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveLook(idx)}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between min-h-[220px] transition-all ${
                activeLook === idx
                  ? "bg-[#141414] border-[#D4A72C] shadow-xl"
                  : "bg-[#0C0C0C] border-[#1F1F1F] text-[#777]"
              }`}
            >
              <span className="text-xs font-mono text-[#D4A72C]">0{idx + 1}</span>
              <div>
                <h3 className="text-base font-bold text-[#F7F7F5]">{item.title}</h3>
                <p className="text-xs text-[#888] mt-1">{item.fabric}</p>
              </div>
              <span className="text-sm font-bold text-[#D4A72C] font-mono">{item.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
