"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Star, ChevronRight, Check } from "lucide-react";

export default function INT_01Design({ businessName = "Studio Lumina" }: { businessName?: string }) {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial" | "hospitality">("residential");

  const projects = {
    residential: [
      {
        title: "The Penthouse Horizon",
        location: "South Mumbai",
        area: "4,500 sq.ft",
        concept: "Warm Minimalism & Fluted Marble",
        image: "linear-gradient(135deg, #2A2521, #141210)",
      },
      {
        title: "Villa Solarium",
        location: "Goa Coastal",
        area: "6,200 sq.ft",
        concept: "Tropical Modernism & Teak Wood",
        image: "linear-gradient(135deg, #1C2421, #0F1412)",
      },
    ],
    commercial: [
      {
        title: "Apex Venture Headquarters",
        location: "Bandra Kurla Complex",
        area: "12,000 sq.ft",
        concept: "Biophilic Acoustic Architecture",
        image: "linear-gradient(135deg, #1F2228, #101215)",
      },
    ],
    hospitality: [
      {
        title: "Aura Boutique Lounge",
        location: "Indiranagar, Bangalore",
        area: "3,800 sq.ft",
        concept: "Moody Brass & Velvet Atmosphere",
        image: "linear-gradient(135deg, #2E1F27, #150E12)",
      },
    ],
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F7F7F5] min-h-screen font-sans">
      {/* Editorial Hero */}
      <header className="relative min-h-[85vh] flex flex-col justify-between p-6 sm:p-12 border-b border-[#222]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold tracking-[0.25em] uppercase text-[#D4A72C]">
            {businessName}
          </span>
          <span className="text-xs text-[#A7A7A0] uppercase tracking-widest hidden sm:block">
            Architecture • Interior Atelier
          </span>
        </div>

        <div className="max-w-3xl my-12 flex flex-col gap-6">
          <span className="text-xs font-semibold text-[#D4A72C] tracking-widest uppercase">
            Editorial Luxury • Issue 2026
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-[#F7F7F5] leading-[1.15]">
            Spaces sculpted with silence, light, and enduring materiality.
          </h1>
          <p className="text-sm sm:text-base text-[#A7A7A0] max-w-xl font-light leading-relaxed">
            We craft bespoke private residences and iconic commercial sanctuaries that elevate everyday living into art.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1F1F1F]">
          <div className="flex items-center gap-6 text-xs text-[#A7A7A0]">
            <span>Est. 2018</span>
            <span>•</span>
            <span>48+ Built Portfolios</span>
            <span>•</span>
            <span>National Design Laurels</span>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] hover:text-[#F3C64E]"
          >
            <span>Explore Curated Works</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Interactive Project Filter Section */}
      <section id="projects" className="p-6 sm:p-12 max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-wider">
              Selected Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#F7F7F5] mt-1">
              Architecture & Living Environments
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 bg-[#141414] p-1 rounded-xl border border-[#262626]">
            {(["residential", "commercial", "hospitality"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all min-h-[38px] ${
                  activeTab === tab
                    ? "bg-[#D4A72C] text-[#080808] font-bold shadow"
                    : "text-[#A7A7A0] hover:text-[#F7F7F5]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects[activeTab].map((p, i) => (
            <div
              key={i}
              className="group bg-[#141414] border border-[#262626] hover:border-[#D4A72C]/50 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <div
                className="h-64 sm:h-80 w-full relative p-6 flex flex-col justify-between"
                style={{ background: p.image }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[#D4A72C] border border-white/10">
                    {p.area}
                  </span>
                  <span className="text-[11px] text-white/80 bg-black/60 px-2.5 py-1 rounded backdrop-blur-md">
                    {p.location}
                  </span>
                </div>

                <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4A72C] font-semibold">
                    Concept Direction
                  </span>
                  <h3 className="text-lg font-serif text-[#F7F7F5]">{p.title}</h3>
                  <p className="text-xs text-[#A7A7A0] mt-1">{p.concept}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Studio Process */}
      <section className="bg-[#111] border-y border-[#222] py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-serif text-[#D4A72C]">01</span>
            <h4 className="text-base font-bold text-[#F7F7F5]">Spatial Blueprinting</h4>
            <p className="text-xs text-[#A7A7A0] leading-relaxed">
              We analyze natural light movement, circulation paths, and acoustic comfort before sketching the initial concept.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-serif text-[#D4A72C]">02</span>
            <h4 className="text-base font-bold text-[#F7F7F5]">Material Curation</h4>
            <p className="text-xs text-[#A7A7A0] leading-relaxed">
              Hand-selected Italian marbles, sustainable teak, brushed brass, and textured plaster swatches curated for longevity.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-serif text-[#D4A72C]">03</span>
            <h4 className="text-base font-bold text-[#F7F7F5]">Turnkey Execution</h4>
            <p className="text-xs text-[#A7A7A0] leading-relaxed">
              Precision site engineering, bespoke millwork manufacturing, and turnkey white-glove handover.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
