"use client";

import React, { useState } from "react";
import { Sparkles, Smile, CheckCircle, Shield } from "lucide-react";

export default function CLN_04Design({ businessName = "Apex Aesthetic Dental Spa" }: { businessName?: string }) {
  const [activeProcedure, setActiveProcedure] = useState<"veneers" | "aligners" | "implants">("veneers");

  const procedures = {
    veneers: {
      title: "Handcrafted Porcelain Veneers",
      duration: "2 Visits • 5 Days Handover",
      quote: "Corrects alignment, tooth shape, and natural luminosity with ultrathin porcelain.",
      stats: "99.4% Patient Smile Satisfaction",
    },
    aligners: {
      title: "Clear Invisible Aligners",
      duration: "6–9 Months Treatment",
      quote: "Custom 3D scanned aligners for discreet, comfortable tooth straightening.",
      stats: "Zero Metal Brackets • 3D Simulation Before Starting",
    },
    implants: {
      title: "Same-Day Guided Dental Implants",
      duration: "Single Day Procedure",
      quote: "Swiss Straumann titanium implants restoring full bite strength permanently.",
      stats: "Lifetime Structural Implant Guarantee",
    },
  };

  return (
    <div className="bg-[#090B0E] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest bg-[#38BDF8]/10 px-3 py-1 rounded-full border border-[#38BDF8]/30">
            Aesthetic Smile Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            World-Class Smiles. Digitally Designed.
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} combines 3D facial smile mapping with painless laser dentistry to create radiant, natural smiles.
          </p>
        </div>

        {/* Procedure Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["veneers", "aligners", "implants"] as const).map((proc) => (
            <button
              key={proc}
              type="button"
              onClick={() => setActiveProcedure(proc)}
              className={`p-4 rounded-xl border text-left transition-all min-h-[50px] ${
                activeProcedure === proc
                  ? "bg-[#38BDF8]/15 border-[#38BDF8] text-[#F7F7F5]"
                  : "bg-[#12161E] border-[#222B3A] text-[#777] hover:text-white"
              }`}
            >
              <h4 className="text-sm font-bold capitalize">{proc}</h4>
              <span className="text-[11px] text-[#38BDF8]">{procedures[proc].duration}</span>
            </button>
          ))}
        </div>

        {/* Active Procedure Canvas */}
        <div className="bg-[#10141B] border border-[#222B3A] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <span className="text-xs font-mono text-[#38BDF8] uppercase">Clinical Procedure Specification</span>
          <h3 className="text-xl font-bold text-[#F7F7F5]">{procedures[activeProcedure].title}</h3>
          <p className="text-xs sm:text-sm text-[#A7A7A0]">{procedures[activeProcedure].quote}</p>
          <div className="mt-2 bg-[#0A0D12] p-3 rounded-xl border border-[#1E2633] text-xs font-mono text-[#22C55E]">
            ✓ {procedures[activeProcedure].stats}
          </div>
        </div>
      </div>
    </div>
  );
}
