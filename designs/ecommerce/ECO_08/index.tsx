"use client";

import React, { useState } from "react";
import { Sparkles, Check } from "lucide-react";

export default function ECO_08Design({ businessName = "Aura Mineral Velvet Cosmetics" }: { businessName?: string }) {
  const [shade, setShade] = useState("02 Warm Sand");

  const shades = [
    { name: "01 Ivory Dew", hex: "#EAD2B8", undertone: "Cool Neutral" },
    { name: "02 Warm Sand", hex: "#D6B494", undertone: "Warm Golden" },
    { name: "03 Golden Amber", hex: "#BC8E68", undertone: "Warm Olive" },
    { name: "04 Rich Espresso", hex: "#7E523A", undertone: "Deep Neutral" },
  ];

  return (
    <div className="bg-[#090808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-[#222] pb-10">
          <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-gradient-to-tr from-[#241A17] to-[#120D0B] border border-[#3A2A25] flex flex-col justify-between p-6">
            <span className="text-xs font-mono text-[#D4A72C] uppercase font-bold">Clean Formula</span>
            <div className="text-center">
              <span className="text-4xl">💄</span>
              <h3 className="text-xl font-serif text-[#F7F7F5] mt-2">Weightless Silk Foundation</h3>
              <p className="text-xs text-[#D4A72C] mt-1">{shade}</p>
            </div>
            <span className="text-xs text-[#A7A7A0]">SPF 30 Broad Spectrum</span>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div>
              <span className="text-xs font-mono text-[#D4A72C] uppercase">{businessName}</span>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#F7F7F5] mt-1">
                Skin-Luminous Mineral Serum Tint
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold text-[#D4A72C] font-mono">₹ 2,250</span>
              </div>
            </div>

            {/* Swatch Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#A7A7A0]">Select Exact Complexion Shade:</span>
              <div className="grid grid-cols-2 gap-2">
                {shades.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setShade(s.name)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all min-h-[44px] ${
                      shade === s.name
                        ? "bg-[#1F1411] border-[#D4A72C]"
                        : "bg-[#140E0C] border-[#2B1B17] text-[#888]"
                    }`}
                  >
                    <div
                      style={{ backgroundColor: s.hex }}
                      className="w-5 h-5 rounded-full border border-black/50 shrink-0"
                    />
                    <div className="truncate">
                      <span className="block text-xs font-bold text-[#F7F7F5]">{s.name}</span>
                      <span className="text-[10px] text-[#A7A7A0]">{s.undertone}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
