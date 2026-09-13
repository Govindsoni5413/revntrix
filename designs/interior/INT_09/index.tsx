"use client";

import React, { useState } from "react";
import { Grid, Eye } from "lucide-react";

export default function INT_09Design({ businessName = "Lumina Gallery Architecture" }: { businessName?: string }) {
  const [filter, setFilter] = useState("all");

  const items = [
    { title: "Kashmir Birch Dining Suite", category: "dining", gradient: "linear-gradient(135deg, #242220, #0E0D0C)" },
    { title: "Bespoke Onyx Powder Room", category: "bath", gradient: "linear-gradient(135deg, #1A1F1E, #0A0D0C)" },
    { title: "Curved Fluted Media Wall", category: "living", gradient: "linear-gradient(135deg, #261F1A, #100C09)" },
    { title: "Minimalist Floating Teak Staircase", category: "architectural", gradient: "linear-gradient(135deg, #1E1E22, #0A0A0C)" },
    { title: "Acoustic Slat Private Cinema", category: "living", gradient: "linear-gradient(135deg, #2A1A1E, #10090B)" },
    { title: "Rain Shower & Basalt Spa", category: "bath", gradient: "linear-gradient(135deg, #1B2424, #080D0D)" },
  ];

  const filtered = filter === "all" ? items : items.filter((x) => x.category === filter);

  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Gallery Archive • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#F7F7F5] mt-1">Curated Spatial Moments</h1>
          </div>

          <div className="flex items-center gap-1.5 bg-[#141414] p-1 rounded-xl border border-[#262626]">
            {["all", "living", "bath", "dining"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all min-h-[36px] ${
                  filter === cat ? "bg-[#D4A72C] text-black font-bold" : "text-[#777] hover:text-[#CCC]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="h-72 rounded-2xl p-6 border border-[#222] flex flex-col justify-between group hover:border-[#D4A72C]/40 transition-all"
              style={{ background: item.gradient }}
            >
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A72C] px-2.5 py-1 rounded bg-black/60 border border-white/10 w-fit">
                {item.category}
              </span>
              <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <h4 className="text-sm font-bold text-[#F7F7F5]">{item.title}</h4>
                <span className="text-[10px] text-[#A7A7A0] flex items-center gap-1 mt-1">
                  <Eye className="w-3 h-3 text-[#D4A72C]" /> Inspect Details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
