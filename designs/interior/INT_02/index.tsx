"use client";

import React, { useState } from "react";
import { Sparkles, Check, ArrowRight, RotateCcw } from "lucide-react";

export default function INT_02Design({ businessName = "Aura Interior Studio" }: { businessName?: string }) {
  const [vibe, setVibe] = useState<string>("Japandi Minimal");
  const [budget, setBudget] = useState<string>("Luxury Turnkey");
  const [scope, setScope] = useState<string>("Full 3BHK Residence");

  const styleProfiles: Record<string, { palette: string[]; desc: string; materials: string }> = {
    "Japandi Minimal": {
      palette: ["#D8CBB9", "#8E8271", "#2D2824", "#F4EFEA"],
      desc: "Warm oak tones, organic linen textures, concealed lighting, and calming neutral minimalism.",
      materials: "White Oak • Wabi-Sabi Plaster • Brushed Bronze • Raw Linen",
    },
    "Contemporary Neo-Classical": {
      palette: ["#1C2524", "#C6A664", "#ECE7DE", "#3B4D4B"],
      desc: "Fluted wall paneling, Italian Statuario marble, antique brass accents, and tailored velvet seating.",
      materials: "Statuario Marble • Brass Inlays • Velvet • Crown Moldings",
    },
    "Moody Industrial Chic": {
      palette: ["#18181A", "#736453", "#9E9080", "#2E2B27"],
      desc: "Exposed micro-cement textures, blackened steel partitions, leather accents, and warm Edison glow.",
      materials: "Micro-Cement • Smoked Glass • Full-Grain Leather • Blackened Steel",
    },
  };

  const currentProfile = styleProfiles[vibe] || styleProfiles["Japandi Minimal"];

  return (
    <div className="bg-[#0D0D0E] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center items-center">
          <span className="text-xs font-bold text-[#D4A72C] tracking-widest uppercase bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Interactive Style Discovery
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F5]">
            Discover Your Signature Interior DNA
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            Custom interior blueprint calculator powered by {businessName}. Select your space parameters to generate an instant design direction.
          </p>
        </div>

        {/* Step 1: Vibe Selection */}
        <div className="flex flex-col gap-3 bg-[#141415] p-6 rounded-2xl border border-[#262628]">
          <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider">
            1. Select Your Preferred Design Aesthetic
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(styleProfiles).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setVibe(style)}
                className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all min-h-[50px] flex items-center justify-between ${
                  vibe === style
                    ? "bg-[#D4A72C]/15 border-[#D4A72C] text-[#F3C64E]"
                    : "bg-[#1C1C1E] border-[#343438] text-[#A7A7A0] hover:border-[#A7A7A0]"
                }`}
              >
                <span>{style}</span>
                {vibe === style && <Check className="w-4 h-4 text-[#D4A72C]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Space Scope */}
        <div className="flex flex-col gap-3 bg-[#141415] p-6 rounded-2xl border border-[#262628]">
          <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider">
            2. Scope of Project
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {["Living Room Only", "Master Suite", "Full 3BHK Residence", "Luxury Villa / Duplex"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScope(s)}
                className={`p-3 rounded-lg border text-center text-xs font-medium transition-all min-h-[44px] ${
                  scope === s
                    ? "bg-[#D4A72C] text-black font-bold border-[#D4A72C]"
                    : "bg-[#1C1C1E] border-[#343438] text-[#A7A7A0] hover:text-[#F7F7F5]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Live Palette & Material Board */}
        <div className="bg-gradient-to-br from-[#1A1A1E] to-[#121214] p-6 sm:p-8 rounded-2xl border border-[#D4A72C]/40 shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A2A30] pb-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A72C]">
                Generated Direction
              </span>
              <h3 className="text-xl font-bold text-[#F7F7F5]">{vibe}</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-[#25252A] text-[#D4A72C] border border-[#3A3A42] w-fit">
              Scope: {scope}
            </span>
          </div>

          <p className="text-xs text-[#C5C5C0] leading-relaxed">
            {currentProfile.desc}
          </p>

          {/* Color Palette Swatches */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-[#A7A7A0] uppercase tracking-wider">
              Curated Chromatic Palette
            </span>
            <div className="grid grid-cols-4 gap-2 h-14 rounded-xl overflow-hidden border border-[#343438]">
              {currentProfile.palette.map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className="flex items-end justify-center pb-1 text-[9px] font-mono font-bold text-black/80 uppercase"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0E0E10] p-3.5 rounded-xl border border-[#252528] text-xs">
            <strong className="text-[#D4A72C] block mb-1">Recommended Material Specifications:</strong>
            <span className="text-[#A7A7A0]">{currentProfile.materials}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
