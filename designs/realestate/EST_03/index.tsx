"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, MapPin, Sparkles } from "lucide-react";

export default function EST_03Design({ businessName = "Skyline Visual Living" }: { businessName?: string }) {
  const [activeAmenity, setActiveAmenity] = useState<number>(0);

  const amenities = [
    { title: "Heated Sky Infinity Pool", desc: "Cantilevered 45 floors above sea level with private cabanas." },
    { title: "Resident Private Helipad", desc: "DGCA compliant rooftop landing for seamless airport transit." },
    { title: "Sommelier Temperature Wine Cellar", desc: "Personal lockers with biometric temperature monitoring." },
  ];

  return (
    <div className="bg-[#09090A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Visual Listing Showcase • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">The Crown Residences, Altamount</h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0]">
            An ultra-exclusive collection of 12 bespoke vertical mansions designed by international architectural masters.
          </p>
        </div>

        {/* Amenities Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {amenities.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveAmenity(i)}
              className={`p-6 rounded-2xl border text-left flex flex-col justify-between min-h-[140px] transition-all ${
                activeAmenity === i
                  ? "bg-[#D4A72C]/10 border-[#D4A72C] shadow-lg"
                  : "bg-[#141416] border-[#252528] text-[#777]"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#D4A72C] font-bold">0{i + 1}</span>
                <h4 className="text-sm font-bold text-[#F7F7F5] mt-1">{a.title}</h4>
              </div>
              <p className="text-xs text-[#A7A7A0] mt-2">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
