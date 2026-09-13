"use client";

import React from "react";
import { Building2, MapPin, Zap } from "lucide-react";

export default function EST_05Design({ businessName = "Matrix Rapid Realty" }: { businessName?: string }) {
  const cards = [
    { name: "Signia Isle", loc: "BKC", price: "₹ 8.5 Cr", psf: "₹ 48k/sqft", config: "3 BHK Luxury" },
    { name: "Rustomjee Seasons", loc: "Bandra East", price: "₹ 5.2 Cr", psf: "₹ 38k/sqft", config: "2 BHK" },
    { name: "Ahuja Towers", loc: "Prabhadevi", price: "₹ 24.0 Cr", psf: "₹ 62k/sqft", config: "4 BHK Sky Villa" },
    { name: "Lodha World One", loc: "Lower Parel", price: "₹ 16.5 Cr", psf: "₹ 55k/sqft", config: "3 BHK + Deck" },
  ];

  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <span className="text-xs font-mono font-bold text-[#D4A72C]">{businessName}</span>
          <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
            Live Feed
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#141414] border border-[#262626] rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-[#F7F7F5]">{c.name}</h4>
                  <span className="text-xs text-[#888]">{c.loc} • {c.config}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#D4A72C] block">{c.price}</span>
                  <span className="text-[10px] text-[#666] font-mono">{c.psf}</span>
                </div>
              </div>
              <button
                type="button"
                className="w-full py-2 bg-[#1C1C1C] border border-[#333] hover:border-[#D4A72C] text-xs font-semibold text-[#F7F7F5] rounded-lg transition-colors min-h-[44px]"
              >
                Instant WhatsApp Inquiry
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
