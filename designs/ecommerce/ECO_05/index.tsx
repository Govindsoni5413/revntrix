"use client";

import React, { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";

export default function ECO_05Design({ businessName = "ProStudio Gear Market" }: { businessName?: string }) {
  const [cat, setCat] = useState("all");

  const products = [
    { title: "Wireless Studio Lavalier Mic", price: "₹ 8,499", rating: "4.9", cat: "audio" },
    { title: "RGB Magnetic LED Video Bar", price: "₹ 3,999", rating: "4.8", cat: "lighting" },
    { title: "Carbon Fiber Travel Tripod", price: "₹ 6,200", rating: "4.9", cat: "rigs" },
    { title: "4K60 Ultra Low-Latency Capture Card", price: "₹ 11,200", rating: "5.0", cat: "audio" },
  ];

  const filtered = cat === "all" ? products : products.filter((p) => p.cat === cat);

  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#222] pb-4">
          <h1 className="text-xl font-bold text-[#F7F7F5]">{businessName} • High Density Catalog</h1>
          <div className="flex items-center gap-1.5 bg-[#141414] p-1 rounded-xl border border-[#222]">
            {["all", "audio", "lighting", "rigs"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs capitalize font-semibold transition-all min-h-[34px] ${
                  cat === c ? "bg-[#D4A72C] text-black" : "text-[#777] hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filtered.map((p, i) => (
            <div key={i} className="bg-[#121212] border border-[#222] rounded-xl p-3.5 flex flex-col justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-[#D4A72C] uppercase">{p.cat}</span>
                <h4 className="text-xs font-bold text-[#F7F7F5] mt-0.5 line-clamp-2">{p.title}</h4>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#1C1C1C]">
                <span className="text-xs font-bold text-[#D4A72C] font-mono">{p.price}</span>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg bg-[#222] hover:bg-[#D4A72C] hover:text-black flex items-center justify-center text-xs font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
