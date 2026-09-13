"use client";

import React, { useState } from "react";
import { Sparkles, Diamond, CheckCircle2 } from "lucide-react";

export default function JW_09Design({ businessName = "Gemological Diamond Advisory" }: { businessName?: string }) {
  const [carat, setCarat] = useState(2.0);
  const [clarity, setClarity] = useState("VVS1");
  const [color, setColor] = useState("D");

  return (
    <div className="bg-[#08080A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Interactive Diamond 4Cs Simulator
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">GIA Diamond Consultation Tool</h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-md">
            Compare carat weight, color grade, and clarity with {businessName} certified gemologists.
          </p>
        </div>

        <div className="bg-[#121216] border border-[#23232C] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          {/* Carat Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#A7A7A0]">1. Carat Weight:</span>
              <strong className="text-[#D4A72C] font-mono text-sm">{carat.toFixed(2)} Carats</strong>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={carat}
              onChange={(e) => setCarat(Number(e.target.value))}
              className="w-full accent-[#D4A72C] cursor-pointer"
            />
          </div>

          {/* Color Grade */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#A7A7A0]">2. Color Grade:</span>
            <div className="grid grid-cols-4 gap-2">
              {["D (Colorless)", "E (Colorless)", "F (Colorless)", "G (Near Colorless)"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c.split(" ")[0])}
                  className={`p-2.5 rounded-lg border text-xs font-semibold transition-all min-h-[40px] ${
                    color === c.split(" ")[0]
                      ? "bg-[#D4A72C] text-black border-[#D4A72C]"
                      : "bg-[#18181E] border-[#2A2A33] text-[#888]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Clarity */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#A7A7A0]">3. Clarity Grade:</span>
            <div className="grid grid-cols-4 gap-2">
              {["FL/IF (Flawless)", "VVS1 (Very Very Slight)", "VVS2", "VS1 (Very Slight)"].map((cl) => (
                <button
                  key={cl}
                  type="button"
                  onClick={() => setClarity(cl.split(" ")[0])}
                  className={`p-2.5 rounded-lg border text-xs font-semibold transition-all min-h-[40px] ${
                    clarity === cl.split(" ")[0]
                      ? "bg-[#D4A72C] text-black border-[#D4A72C]"
                      : "bg-[#18181E] border-[#2A2A33] text-[#888]"
                  }`}
                >
                  {cl}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B0E] p-4 rounded-xl border border-[#1E1E26] flex justify-between items-center text-xs">
            <div>
              <span className="text-[#A7A7A0] block">Configured Spec:</span>
              <strong className="text-[#F7F7F5] font-mono text-sm">{carat.toFixed(2)}ct • {color} Color • {clarity} Clarity</strong>
            </div>
            <span className="text-[#22C55E] font-bold">100% GIA Inscribed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
