"use client";

import React, { useState } from "react";
import { Sparkles, SlidersHorizontal, Layers, CheckCircle } from "lucide-react";

export default function INT_04Design({ businessName = "Transform 3D Interiors" }: { businessName?: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeProject, setActiveProject] = useState<"duplex" | "penthouse">("duplex");

  return (
    <div className="bg-[#0C0D0E] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Visual 3D Transformation Story
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">
              From Raw Concrete to Luxury Sanctuary
            </h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0] mt-1">
              Drag the interactive slider below to inspect the precision transformation delivered by {businessName}.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#161719] p-1 rounded-xl border border-[#2B2D31]">
            <button
              type="button"
              onClick={() => setActiveProject("duplex")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                activeProject === "duplex" ? "bg-[#D4A72C] text-black" : "text-[#888] hover:text-white"
              }`}
            >
              Duplex Penthouse
            </button>
            <button
              type="button"
              onClick={() => setActiveProject("penthouse")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                activeProject === "penthouse" ? "bg-[#D4A72C] text-black" : "text-[#888] hover:text-white"
              }`}
            >
              Minimal Master Suite
            </button>
          </div>
        </div>

        {/* Interactive Before/After Visualizer Canvas */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#343438] shadow-2xl select-none">
          {/* "AFTER" Finished Layer (Full Background) */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10"
            style={{
              background:
                activeProject === "duplex"
                  ? "linear-gradient(135deg, #2D241C, #181410)"
                  : "linear-gradient(135deg, #1A2624, #0D1413)",
            }}
          >
            <span className="self-end text-[11px] font-bold px-3 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 backdrop-blur-md">
              AFTER: Bespoke Execution
            </span>
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-sm self-end">
              <span className="text-[10px] text-[#D4A72C] uppercase font-bold tracking-wider">
                Finished Reality
              </span>
              <p className="text-xs text-[#EAEAEA] mt-0.5">
                Italian bookmatched marble, custom acoustic oak slats, warm recessed lighting & custom Italian sofas.
              </p>
            </div>
          </div>

          {/* "BEFORE" Raw Concrete Layer (Clipped by slider position) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden flex flex-col justify-between p-6 sm:p-10"
            style={{
              width: `${sliderPosition}%`,
              background: "linear-gradient(135deg, #2B2B2E, #141416)",
            }}
          >
            <span className="self-start text-[11px] font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 backdrop-blur-md">
              BEFORE: Bare Shell
            </span>
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-sm self-start">
              <span className="text-[10px] text-[#888] uppercase font-bold tracking-wider">
                Unfinished Site
              </span>
              <p className="text-xs text-[#AAA] mt-0.5">
                Exposed electrical conduits, untreated brick masonry, and unoptimized spatial proportions.
              </p>
            </div>
          </div>

          {/* Interactive Divider Line */}
          <div
            className="absolute inset-y-0 w-1 bg-[#D4A72C] shadow-[0_0_15px_#D4A72C] cursor-ew-resize flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-[#D4A72C] text-black flex items-center justify-center shadow-lg font-bold text-[10px]">
              ↔
            </div>
          </div>

          {/* Transparent Range Input for Touch/Mouse Drag */}
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          />
        </div>

        {/* 3D Specs Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141416] p-4 rounded-xl border border-[#26262A] flex flex-col gap-1">
            <span className="text-[10px] text-[#D4A72C] font-mono uppercase">Phase 1</span>
            <h4 className="text-sm font-bold text-[#F7F7F5]">3D Photorealistic Render</h4>
            <p className="text-xs text-[#888]">100% material-accurate virtual staging.</p>
          </div>
          <div className="bg-[#141416] p-4 rounded-xl border border-[#26262A] flex flex-col gap-1">
            <span className="text-[10px] text-[#D4A72C] font-mono uppercase">Phase 2</span>
            <h4 className="text-sm font-bold text-[#F7F7F5]">BIM Site Engineering</h4>
            <p className="text-xs text-[#888]">Millimeter-accurate MEP and HVAC alignment.</p>
          </div>
          <div className="bg-[#141416] p-4 rounded-xl border border-[#26262A] flex flex-col gap-1">
            <span className="text-[10px] text-[#D4A72C] font-mono uppercase">Phase 3</span>
            <h4 className="text-sm font-bold text-[#F7F7F5]">Identical Real Handover</h4>
            <p className="text-xs text-[#888]">The finished home exactly matches the 3D promise.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
