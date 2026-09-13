"use client";

import React, { useState } from "react";
import { Building, MapPin, Maximize2, Sparkles, ChevronRight, Check } from "lucide-react";

export default function EST_01Design({ businessName = "Horizon Prime Estates" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans">
      {/* Luxury Editorial Hero */}
      <div className="relative min-h-[80vh] flex flex-col justify-between p-6 sm:p-12 border-b border-[#222]">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold tracking-[0.25em] uppercase text-[#D4A72C]">
            {businessName}
          </span>
          <span className="text-xs font-mono text-[#888] uppercase">Ultra-Luxury Realty</span>
        </div>

        <div className="max-w-3xl my-10 flex flex-col gap-4">
          <span className="text-xs font-mono text-[#D4A72C] tracking-widest uppercase">
            Private Listing • Worli Sea Face
          </span>
          <h1 className="text-3xl sm:text-6xl font-serif font-light text-[#F7F7F5] leading-tight">
            The Ocean Crest Sky Mansion
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-xl font-light leading-relaxed">
            7,800 sq.ft duplex penthouse with 270-degree Arabian Sea panoramas, private infinity pool, and dedicated 4-car private elevator.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1F1F1F] text-xs text-[#A7A7A0]">
          <div>Price Upon Request • 5 Suites • 7 Baths</div>
          <div className="text-[#D4A72C] font-semibold">Schedule Private VIP Tour →</div>
        </div>
      </div>
    </div>
  );
}
