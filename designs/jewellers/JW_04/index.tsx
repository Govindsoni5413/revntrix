"use client";

import React, { useState } from "react";
import { Sparkles, Diamond, ShieldCheck } from "lucide-react";

export default function JW_04Design({ businessName = "Solitaire Matrix Diamonds" }: { businessName?: string }) {
  const [selectedShape, setSelectedShape] = useState("Round Brilliant");

  return (
    <div className="bg-[#050505] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            GIA Certified Solitaires
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Exceptional Diamonds. Pure Brilliance.
          </h1>
        </div>

        {/* Diamond Shape Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Round Brilliant", "Oval Cut", "Emerald Cut", "Cushion Cut"].map((shape) => (
            <button
              key={shape}
              type="button"
              onClick={() => setSelectedShape(shape)}
              className={`p-4 rounded-xl border text-center transition-all min-h-[50px] ${
                selectedShape === shape
                  ? "bg-[#D4A72C]/15 border-[#D4A72C] text-[#F7F7F5]"
                  : "bg-[#101010] border-[#222] text-[#777] hover:text-white"
              }`}
            >
              <h4 className="text-xs font-bold">{shape}</h4>
              <span className="text-[10px] text-[#D4A72C]">Triple Excellent</span>
            </button>
          ))}
        </div>

        <div className="bg-[#101010] border border-[#222] rounded-2xl p-6 sm:p-8 flex flex-col gap-3">
          <span className="text-xs font-mono text-[#D4A72C] uppercase">{selectedShape} Diamond Spec</span>
          <h3 className="text-xl font-bold text-[#F7F7F5]">Selection: 1.50ct – 5.00ct Triple EX Non-Fluorescent</h3>
          <p className="text-xs text-[#A7A7A0]">Every stone laser-inscribed with official GIA certificate matching.</p>
        </div>
      </div>
    </div>
  );
}
