"use client";

import React, { useState } from "react";
import { Sparkles, Plus, Check } from "lucide-react";

export default function ECO_09Design({ businessName = "Atelier Living Spaces" }: { businessName?: string }) {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const hotspots = [
    { title: "Curved Bouclé Armchair", price: "₹ 24,999", desc: "Solid teak frame with high-density foam & textured cream bouclé." },
    { title: "Monolithic Travertine Coffee Table", price: "₹ 18,500", desc: "Honed natural Italian travertine with fluted stone base." },
    { title: "Brushed Brass Minimalist Arc Floor Lamp", price: "₹ 12,000", desc: "Warm dimmable 2700K integrated LED strip." },
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Shoppable Living Suite • {businessName}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif text-[#F7F7F5] mt-1">Interactive Lookbook Experience</h1>
        </div>

        {/* Room Stage with Clickable Hotspots */}
        <div className="relative aspect-[16/9] w-full rounded-2xl bg-gradient-to-br from-[#1C1815] to-[#0A0908] border border-[#332A24] overflow-hidden p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#D4A72C] bg-black/60 px-3 py-1 rounded-full border border-white/10">
              Living Room Suite 01
            </span>
          </div>

          {/* Hotspot buttons positioned across the room canvas */}
          <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
            {hotspots.map((h, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveHotspot(i)}
                className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-2xl transition-transform hover:scale-125 min-h-[44px] min-w-[44px] ${
                  activeHotspot === i
                    ? "bg-[#D4A72C] text-black ring-4 ring-[#D4A72C]/40"
                    : "bg-black/80 text-[#D4A72C] border border-[#D4A72C]"
                }`}
              >
                +
              </button>
            ))}
          </div>

          {/* Active Hotspot Inspector Card */}
          <div className="bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-sm self-end relative z-10">
            <span className="text-[10px] font-mono text-[#D4A72C] uppercase">Shoppable Hotspot</span>
            <h4 className="text-sm font-bold text-[#F7F7F5] mt-0.5">{hotspots[activeHotspot].title}</h4>
            <p className="text-xs text-[#A7A7A0] mt-1">{hotspots[activeHotspot].desc}</p>
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10">
              <span className="text-sm font-bold text-[#D4A72C] font-mono">{hotspots[activeHotspot].price}</span>
              <span className="text-xs text-[#22C55E] font-semibold">Available for Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
