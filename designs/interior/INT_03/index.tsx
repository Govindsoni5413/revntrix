"use client";

import React, { useState } from "react";
import { ArrowUpRight, Maximize2, Compass } from "lucide-react";

export default function INT_03Design({ businessName = "Atelier Monolith" }: { businessName?: string }) {
  const [activeSpatialIndex, setActiveSpatialIndex] = useState(0);

  const spaces = [
    {
      code: "S-01",
      title: "Cantilevered Atrium",
      concept: "Monolithic raw concrete volume intersected by monolithic structural glass beams.",
      metrics: "9.2m Clear Height • Cast-in-place Concrete • Skylight Geometry",
      gradient: "linear-gradient(135deg, #1C1C1F, #08080A)",
    },
    {
      code: "S-02",
      title: "Subterranean Wine Vault",
      concept: "Deep Basalt stone masonry with recessed bronze linear LED channels.",
      metrics: "1,200 Bottle Capacity • Temperature Controlled • Lava Stone",
      gradient: "linear-gradient(135deg, #241D17, #0B0806)",
    },
    {
      code: "S-03",
      title: "Infinity Courtyard Pavilion",
      concept: "Seamless blur of indoor limestone flooring continuing into a reflecting pool.",
      metrics: "Oman Grey Limestone • Teak Louvers • Water Feature",
      gradient: "linear-gradient(135deg, #142022, #070D0E)",
    },
  ];

  return (
    <div className="bg-[#050505] text-[#ECECE8] min-h-screen font-sans selection:bg-[#D4A72C] selection:text-black">
      {/* Avant-Garde Asymmetric Grid Header */}
      <div className="border-b border-[#222] p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter text-[#1C1C1F] select-none uppercase">
              {businessName.slice(0, 4)}
            </span>
            <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#D4A72C] -mt-4 sm:-mt-8">
              {businessName} // Spatial Atelier
            </span>
          </div>
          <span className="text-xs font-mono text-[#777] border border-[#222] px-3 py-1.5 rounded-full">
            AVANT-GARDE 2026
          </span>
        </div>
      </div>

      {/* Main Asymmetric Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border-b border-[#222]">
        {/* Left Side: Spatial List Controls */}
        <div className="lg:col-span-5 p-6 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#222] flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Spatial Installations
            </span>

            <div className="flex flex-col gap-3">
              {spaces.map((space, idx) => (
                <button
                  key={space.code}
                  type="button"
                  onClick={() => setActiveSpatialIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between min-h-[56px] ${
                    activeSpatialIndex === idx
                      ? "bg-[#18181A] border-[#D4A72C] text-[#F7F7F5]"
                      : "bg-[#0A0A0A] border-[#1F1F1F] text-[#777] hover:text-[#CCC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#D4A72C]">{space.code}</span>
                    <span className="text-sm font-bold">{space.title}</span>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      activeSpatialIndex === idx ? "text-[#D4A72C] translate-x-0.5" : "text-[#444]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-[#222] text-xs text-[#888]">
            Radical spatial design combining brutalist mass with delicate light choreography.
          </div>
        </div>

        {/* Right Side: Active Spatial Showcase */}
        <div
          className="lg:col-span-7 p-8 sm:p-16 flex flex-col justify-between relative overflow-hidden transition-all duration-500"
          style={{ background: spaces[activeSpatialIndex].gradient }}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#D4A72C] uppercase bg-black/70 px-3 py-1 rounded-full border border-white/10">
              {spaces[activeSpatialIndex].code}
            </span>
            <Maximize2 className="w-5 h-5 text-[#888]" />
          </div>

          <div className="my-12 flex flex-col gap-4 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <h3 className="text-2xl sm:text-4xl font-black text-[#F7F7F5] tracking-tight">
              {spaces[activeSpatialIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#BBB] leading-relaxed">
              {spaces[activeSpatialIndex].concept}
            </p>
            <div className="text-[11px] font-mono text-[#D4A72C] pt-2 border-t border-white/10">
              {spaces[activeSpatialIndex].metrics}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
