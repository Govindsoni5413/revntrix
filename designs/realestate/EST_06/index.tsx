"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Building2, Check } from "lucide-react";

export default function EST_06Design({ businessName = "Map & Matrix Realty" }: { businessName?: string }) {
  const [selectedPin, setSelectedPin] = useState(0);

  const zones = [
    { name: "Worli Coastal Belt", count: "14 Properties", desc: "Prime sea-facing highrises with luxury connectivity." },
    { name: "BKC Financial District", count: "9 Properties", desc: "Walking distance to corporate headquarters and luxury dining." },
    { name: "Pali Hill Sanctuary", count: "6 Properties", desc: "Quiet verdant avenues with high-security private residences." },
  ];

  return (
    <div className="bg-[#090A0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Geographic Explorer • {businessName}
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">Prime Mumbai Micro-Markets</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {zones.map((z, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedPin(i)}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[140px] transition-all ${
                selectedPin === i
                  ? "bg-[#D4A72C]/10 border-[#D4A72C] shadow-lg"
                  : "bg-[#121417] border-[#22272F] text-[#777]"
              }`}
            >
              <div>
                <span className="text-xs text-[#22C55E] font-mono font-bold">{z.count}</span>
                <h4 className="text-sm font-bold text-[#F7F7F5] mt-1">{z.name}</h4>
              </div>
              <p className="text-xs text-[#A7A7A0] mt-2">{z.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
