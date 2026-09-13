"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export default function INT_06Design({ businessName = "Form & Context Studio" }: { businessName?: string }) {
  const [activeStage, setActiveStage] = useState<"challenge" | "concept" | "materials" | "result">("challenge");

  const stages = {
    challenge: {
      tag: "01. The Architectural Challenge",
      title: "Dark, compartmentalized 1980s 4BHK apartment with restrictive load-bearing columns.",
      body: "The client needed an open-plan gallery residence that optimized natural cross-ventilation while concealing heavy structural columns without compromising building integrity.",
      stats: "Initial natural light rating: 28% • Usable floor efficiency: 64%",
    },
    concept: {
      tag: "02. The Spatial Concept",
      title: "Axial Circulation & Curved Micro-Cement Volume Enclosures.",
      body: "We transformed the awkward structural columns into sculptural organic curved volumes finished with seamless lime plaster, directing circulation toward panoramic south-facing windows.",
      stats: "Ceiling height increased visually by 400mm with cove ambient lighting.",
    },
    materials: {
      tag: "03. Material Sourcing & Craft",
      title: "Honed Travertine, Fluted Ash Wood & Patinated Gunmetal Accents.",
      body: "Locally sourced stone slabs cut with waterjet precision to match curved column radii. Zero synthetic VOC paints used throughout.",
      stats: "92% Sustainable Natural Materials • Hand-buffed wax finish.",
    },
    result: {
      tag: "04. Built Outcome",
      title: "An Award-Winning Private Sanctuary Delivered on Time.",
      body: "Featured in Architectural Digest 2026. Complete climate-regulated home automation with integrated invisible acoustic speakers.",
      stats: "Natural light rating: 89% • Completed in 75 days.",
    },
  };

  return (
    <div className="bg-[#090A0B] text-[#ECECEC] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="border-b border-[#222] pb-6">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Case Study • Project Altamont
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-[#F7F7F5] mt-1">
            Reimagining Spatial Flow in High-Density Urban Living
          </h1>
          <p className="text-xs text-[#888] mt-1">By {businessName} • Architectural Documentation</p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(["challenge", "concept", "materials", "result"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveStage(key)}
              className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                activeStage === key
                  ? "bg-[#D4A72C] text-black border-[#D4A72C]"
                  : "bg-[#141416] border-[#252528] text-[#777] hover:text-[#CCC]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Active Stage Detail */}
        <div className="bg-[#121316] border border-[#26272C] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <span className="text-[11px] font-mono text-[#D4A72C] font-semibold">{stages[activeStage].tag}</span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#F7F7F5] leading-snug">{stages[activeStage].title}</h3>
          <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">{stages[activeStage].body}</p>
          <div className="mt-4 pt-4 border-t border-[#222] bg-[#0A0B0C] p-3 rounded-xl text-xs font-mono text-[#D4A72C]">
            📊 Metric: {stages[activeStage].stats}
          </div>
        </div>
      </div>
    </div>
  );
}
