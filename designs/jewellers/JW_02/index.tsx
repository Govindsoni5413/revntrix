"use client";

import React, { useState } from "react";
import { Gem, Sparkles, Check, ShoppingBag } from "lucide-react";

export default function JW_02Design({ businessName = "Lumina Everyday Fine Jewelry" }: { businessName?: string }) {
  const [selectedMetal, setSelectedMetal] = useState("Rose Gold");

  const items = [
    { title: "Solitaire Dewdrop Pendant", price: "₹ 28,500", desc: "18kt Gold with EF-VVS Natural Diamond" },
    { title: "Baguette Diamond Stacking Band", price: "₹ 34,000", desc: "Minimalist everyday eternity profile" },
    { title: "Celestial Micro-Hoops", price: "₹ 22,000", desc: "Lightweight comfort latch for daily wear" },
  ];

  return (
    <div className="bg-[#090909] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              DTC Fine Jewelry • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">Modern Everyday Luxury</h1>
          </div>

          <div className="flex items-center gap-2">
            {["Rose Gold", "Yellow Gold", "White Gold"].map((metal) => (
              <button
                key={metal}
                type="button"
                onClick={() => setSelectedMetal(metal)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                  selectedMetal === metal
                    ? "bg-[#D4A72C] text-black"
                    : "bg-[#161616] text-[#888] hover:text-white border border-[#2B2B2B]"
                }`}
              >
                {metal}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="bg-[#121212] border border-[#222] rounded-2xl p-5 flex flex-col justify-between gap-4 group hover:border-[#D4A72C]/50 transition-all">
              <div>
                <span className="text-[10px] text-[#D4A72C] uppercase font-mono">{selectedMetal} Edition</span>
                <h4 className="text-sm font-bold text-[#F7F7F5] mt-1">{item.title}</h4>
                <p className="text-xs text-[#888] mt-1">{item.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#1C1C1C]">
                <span className="text-sm font-bold text-[#D4A72C] font-mono">{item.price}</span>
                <span className="text-xs text-[#A7A7A0]">IGI Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
