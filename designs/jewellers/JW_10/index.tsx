"use client";

import React, { useState } from "react";
import { Sparkles, Gem, ArrowRight } from "lucide-react";

export default function JW_10Design({ businessName = "Manekchand Jewellers" }: { businessName?: string }) {
  const [activeCategory, setActiveCategory] = useState("bangles");

  const items = {
    bangles: [
      { name: "22kt Calcutta Filigree Kadas", weight: "48 grams", price: "₹ 3,45,000" },
      { name: "Antique Pachedi Kada Pair", weight: "62 grams", price: "₹ 4,40,000" },
    ],
    necklaces: [
      { name: "Heritage Temple Mango Mala", weight: "85 grams", price: "₹ 6,10,000" },
      { name: "Royal Jadau Choker with Pearls", weight: "70 grams", price: "₹ 5,20,000" },
    ],
  };

  const current = items[activeCategory as keyof typeof items] || items.bangles;

  return (
    <div className="bg-[#0A0706] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-serif text-[#D4A72C] tracking-widest uppercase">
              Hallmarked Indian Gold • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#F7F7F5] mt-1">22kt Hallmark Gold Catalogue</h1>
          </div>

          <div className="flex items-center gap-2">
            {(["bangles", "necklaces"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs capitalize font-semibold transition-all min-h-[40px] ${
                  activeCategory === cat ? "bg-[#D4A72C] text-black" : "bg-[#160F0C] border border-[#2B1E19] text-[#777]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {current.map((item, idx) => (
            <div key={idx} className="bg-[#140F0D] border border-[#2B1E19] rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4A72C] uppercase font-bold">BIS 916 Hallmarked</span>
                <h4 className="text-base font-serif font-bold text-[#F7F7F5] mt-1">{item.name}</h4>
                <p className="text-xs text-[#888] mt-0.5">Approx Net Weight: {item.weight}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#241A15]">
                <span className="text-base font-bold text-[#D4A72C] font-mono">{item.price}</span>
                <span className="text-xs text-[#A7A7A0]">In Stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
