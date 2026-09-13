"use client";

import React, { useState } from "react";
import { ShoppingBag, Plus, Check, Clock } from "lucide-react";

export default function RES_02Design({ businessName = "Tokyo Express Ramen Bar" }: { businessName?: string }) {
  const [cartCount, setCartCount] = useState(0);

  const items = [
    { name: "Signature 18hr Tonkotsu Ramen", price: "₹ 580", desc: "Chashu pork belly, ajitama egg, black garlic oil, scallions." },
    { name: "Spicy Miso Truffle Ramen", price: "₹ 620", desc: "Fermented red miso, wood ear mushrooms, chili oil & truffle butter." },
    { name: "Crispy Wagyu Gyoza (6 pcs)", price: "₹ 440", desc: "Pan-fried with scallion ponzu dipping glaze." },
  ];

  return (
    <div className="bg-[#090807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Fast Delivery & Dine-In • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">Authentic Hand-Pulled Ramen</h1>
          </div>

          <div className="flex items-center gap-2 bg-[#171412] px-4 py-2 rounded-xl border border-[#2D2622]">
            <ShoppingBag className="w-4 h-4 text-[#D4A72C]" />
            <span className="text-xs font-bold text-[#F7F7F5]">Cart ({cartCount} items)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-[#F7F7F5]">{item.name}</h4>
                <p className="text-xs text-[#888] mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#221915]">
                <span className="text-base font-bold text-[#D4A72C] font-mono">{item.price}</span>
                <button
                  type="button"
                  onClick={() => setCartCount((c) => c + 1)}
                  className="px-3 py-1.5 rounded-lg bg-[#D4A72C] text-black font-bold text-xs flex items-center gap-1 hover:brightness-110 min-h-[36px]"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
