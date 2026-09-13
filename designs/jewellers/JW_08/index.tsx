"use client";

import React, { useState } from "react";
import { Sparkles, Eye } from "lucide-react";

export default function JW_08Design({ businessName = "Luxe Runway Couture Jewels" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Runway Couture Lookbook • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Autumn / Winter High Fashion Edit
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
            <span className="text-xs font-mono text-[#D4A72C]">Look 01</span>
            <div>
              <h3 className="text-lg font-serif text-[#F7F7F5]">Asymmetric Titanium Ear Cuff with Paraiba Tourmaline</h3>
              <p className="text-xs text-[#888] mt-1">Weightless anodized titanium with neon electric blue tourmalines.</p>
            </div>
          </div>
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
            <span className="text-xs font-mono text-[#D4A72C]">Look 02</span>
            <div>
              <h3 className="text-lg font-serif text-[#F7F7F5]">Sculptural Liquid Gold Choker</h3>
              <p className="text-xs text-[#888] mt-1">Fluid ergonomic 18kt gold wrapping organically across the neck.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
