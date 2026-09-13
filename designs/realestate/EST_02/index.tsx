"use client";

import React, { useState } from "react";
import { Search, Building2, MapPin, Bed, Bath, ArrowRight } from "lucide-react";

export default function EST_02Design({ businessName = "Apex Real Estate Search" }: { businessName?: string }) {
  const [bhk, setBhk] = useState("3 BHK");
  const [location, setLocation] = useState("Bandra West");

  const listings = [
    { title: "The Imperial Sky Villa", location: "Bandra West", bhk: "3 BHK", price: "₹ 11.5 Cr", sqft: "2,450 sq.ft" },
    { title: "Veritas Sea Facing Residences", location: "Worli", bhk: "4 BHK", price: "₹ 18.2 Cr", sqft: "3,800 sq.ft" },
    { title: "Aura Garden Estate", location: "Juhu", bhk: "3 BHK", price: "₹ 14.0 Cr", sqft: "2,900 sq.ft" },
    { title: "Monolith Heights", location: "Bandra West", bhk: "2 BHK", price: "₹ 6.8 Cr", sqft: "1,250 sq.ft" },
  ];

  const filtered = listings.filter((l) => (bhk === "All" ? true : l.bhk === bhk));

  return (
    <div className="bg-[#0A0A0A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Discovery Engine • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">Prime Residential Explorer</h1>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#141414] border border-[#2B2B2B] p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A7A7A0]">Configuration:</span>
            {["All", "2 BHK", "3 BHK", "4 BHK"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setBhk(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                  bhk === opt ? "bg-[#D4A72C] text-black" : "bg-[#1F1F1F] text-[#888] hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#D4A72C] font-mono">{filtered.length} Properties Matching</span>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col justify-between gap-4 group hover:border-[#D4A72C]/50 transition-all">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#22C55E] font-mono font-bold">{item.bhk}</span>
                  <span className="text-sm font-bold text-[#D4A72C]">{item.price}</span>
                </div>
                <h3 className="text-lg font-bold text-[#F7F7F5] mt-2">{item.title}</h3>
                <p className="text-xs text-[#888] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A72C]" /> {item.location} • {item.sqft}
                </p>
              </div>
              <button
                type="button"
                className="w-full py-2.5 rounded-xl bg-[#1E1E1E] border border-[#333] hover:border-[#D4A72C] text-xs font-semibold text-[#F7F7F5] transition-all min-h-[44px]"
              >
                Inquire & Download Brochure
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
