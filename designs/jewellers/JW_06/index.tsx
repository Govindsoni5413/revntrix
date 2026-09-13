"use client";

import React, { useState } from "react";
import { Gem, Sparkles } from "lucide-react";

export default function JW_06Design({ businessName = "Precious Gem Vault" }: { businessName?: string }) {
  const [activeGem, setActiveGem] = useState<"emerald" | "ruby" | "sapphire">("emerald");

  const gems = {
    emerald: { name: "Zambian & Panjshir Emeralds", desc: "Vivid lush green with natural silk inclusions certified unenhanced." },
    ruby: { name: "Burmese Pigeon Blood Rubies", desc: "Intense fluorescent red fluorescence with GIA origin certification." },
    sapphire: { name: "Ceylon Royal Blue Sapphires", desc: "Unheated cornflower blue clarity sourced from historic Sri Lankan mines." },
  };

  return (
    <div className="bg-[#080809] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Gemstone Provenance • {businessName}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-[#F7F7F5] mt-1">Natural Unheated Precious Gemstones</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["emerald", "ruby", "sapphire"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setActiveGem(g)}
              className={`p-5 rounded-2xl border text-left capitalize transition-all min-h-[120px] ${
                activeGem === g
                  ? "bg-[#D4A72C]/10 border-[#D4A72C] text-[#F7F7F5]"
                  : "bg-[#121215] border-[#222228] text-[#777]"
              }`}
            >
              <h4 className="text-base font-serif font-bold">{g}</h4>
              <p className="text-xs text-[#A7A7A0] mt-1">{gems[g].desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
