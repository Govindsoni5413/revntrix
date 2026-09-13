"use client";

import React, { useState } from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function ECO_04Design({ businessName = "Curator Product Quiz" }: { businessName?: string }) {
  const [skinType, setSkinType] = useState("Dry / Dehydrated");
  const [goal, setGoal] = useState("Deep Hydration & Barrier Repair");

  return (
    <div className="bg-[#09090A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Intelligent Routine Finder
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">Custom Skincare Regimen Builder</h1>
        </div>

        <div className="bg-[#141416] border border-[#252528] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#D4A72C] uppercase">1. Select Skin Profile</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Dry / Dehydrated", "Oily / Acne-Prone", "Sensitive / Rosacea", "Combination"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSkinType(t)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all min-h-[44px] ${
                    skinType === t ? "bg-[#D4A72C] text-black border-[#D4A72C]" : "bg-[#1A1A1D] border-[#2E2E33] text-[#888]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0D0D0F] p-4 rounded-xl border border-[#222226] flex justify-between items-center text-xs">
            <div>
              <span className="text-[#A7A7A0] block">Recommended Serum:</span>
              <strong className="text-[#F7F7F5] font-bold text-sm">Ceramide + 5-Molecular Hyaluronic Acid Infusion</strong>
            </div>
            <span className="text-sm font-mono font-bold text-[#D4A72C]">₹ 1,850</span>
          </div>
        </div>
      </div>
    </div>
  );
}
