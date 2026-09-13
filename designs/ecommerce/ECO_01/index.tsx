"use client";

import React, { useState } from "react";
import { ShoppingBag, Star, ShieldCheck, Zap, Plus, Check } from "lucide-react";

export default function ECO_01Design({ businessName = "Apex Performance Gear" }: { businessName?: string }) {
  const [selectedSize, setSelectedSize] = useState("L");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-[#222] pb-10">
          <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-gradient-to-tr from-[#1E1E1E] to-[#0A0A0A] border border-[#333] flex flex-col justify-between p-6">
            <span className="text-xs font-mono text-[#D4A72C] uppercase font-bold">New Drop 2026</span>
            <div className="text-center">
              <span className="text-5xl">⚡</span>
              <h3 className="text-xl font-bold text-[#F7F7F5] mt-2">AeroPro Seamless Technical Hoodie</h3>
            </div>
            <span className="text-xs text-[#22C55E] font-bold">In Stock • Fast Dispatch</span>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div>
              <span className="text-xs font-mono text-[#D4A72C] uppercase">{businessName}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">AeroPro Ultra-Thermal Hoodie</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-bold text-[#D4A72C] font-mono">₹ 3,499</span>
                <span className="text-xs line-through text-[#666]">₹ 4,999</span>
                <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">Save 30%</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#A7A7A0]">Select Size:</span>
              <div className="flex items-center gap-2">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-12 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === sz
                        ? "bg-[#D4A72C] text-black shadow-lg"
                        : "bg-[#141414] border border-[#2B2B2B] text-[#888] hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all min-h-[48px] ${
                added
                  ? "bg-[#22C55E] text-black"
                  : "bg-gradient-to-r from-[#F3C64E] to-[#D4A72C] text-black hover:brightness-110"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 fill-current" />
                  <span>Instant Checkout — Free Shipping</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
