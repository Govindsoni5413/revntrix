"use client";

import React, { useState } from "react";
import { Sparkles, Cpu, BatteryCharging, Shield, Volume2 } from "lucide-react";

export default function ECO_03Design({ businessName = "AeroAudio Flagship Acoustic" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Flagship Engineering Breakdown • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Acoustic Masterpiece. Spatial Precision.
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            Every titanium driver, planar diaphragm, and passive noise isolating chamber engineered from the ground up for zero distortion audio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col gap-2">
            <Volume2 className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">50mm Titanium Drivers</h4>
            <p className="text-xs text-[#888]">Frequency response extending from 5Hz sub-bass up to 45kHz clarity.</p>
          </div>
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col gap-2">
            <BatteryCharging className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">65-Hour Battery Life</h4>
            <p className="text-xs text-[#888]">Fast charge grants 8 hours of playback in just 10 minutes.</p>
          </div>
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col gap-2">
            <Cpu className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Lossless LDAC Codec</h4>
            <p className="text-xs text-[#888]">Stream 96kHz/24bit audiophile resolution over ultra-stable Bluetooth 5.4.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
