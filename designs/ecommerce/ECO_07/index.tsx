"use client";

import React from "react";
import { Sparkles, Palette, Users } from "lucide-react";

export default function ECO_07Design({ businessName = "Craftsmen Collective Market" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Independent Maker Collective • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">Direct From Master Artisans</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] text-[#D4A72C] uppercase font-mono">Jaipur Pottery</span>
              <h4 className="text-base font-bold text-[#F7F7F5] mt-1">Blue Glaze Ceramic Vase</h4>
              <p className="text-xs text-[#888] mt-1">By Master Potter Ramlal, Jaipur</p>
            </div>
            <span className="text-sm font-bold text-[#D4A72C]">₹ 3,200</span>
          </div>
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] text-[#D4A72C] uppercase font-mono">Saharanpur Wood</span>
              <h4 className="text-base font-bold text-[#F7F7F5] mt-1">Hand-Carved Sheesham Tray</h4>
              <p className="text-xs text-[#888] mt-1">By Noor Crafts, UP</p>
            </div>
            <span className="text-sm font-bold text-[#D4A72C]">₹ 2,400</span>
          </div>
          <div className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
            <div>
              <span className="text-[10px] text-[#D4A72C] uppercase font-mono">Kashmir Pashmina</span>
              <h4 className="text-base font-bold text-[#F7F7F5] mt-1">Hand-Spun Sozni Stole</h4>
              <p className="text-xs text-[#888] mt-1">By Ghulam Artisan Guild</p>
            </div>
            <span className="text-sm font-bold text-[#D4A72C]">₹ 14,500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
