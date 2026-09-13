"use client";

import React, { useState } from "react";
import { Utensils, Leaf, Sparkles, Check } from "lucide-react";

export default function RES_04Design({ businessName = "Botanica Modern Eatery" }: { businessName?: string }) {
  const [dietary, setDietary] = useState("all");

  const dishes = [
    { name: "Avocado & Edamame Truffle Tartine", price: "₹ 480", tag: "vegan", desc: "Seed sourdough, whipped tofu ricotta, black truffle glaze." },
    { name: "Pan-Seared Sea Bass with Lemon Caper Emulsion", price: "₹ 780", tag: "gluten_free", desc: "Charred broccolini, confit garlic, extra virgin olive oil." },
    { name: "Wild Morel Mushroom Risotto", price: "₹ 690", tag: "chef_special", desc: "Aged carnaroli rice, 24-month parmesan, thyme butter." },
    { name: "Smoked Beetroot & Goat Cheese Carpaccio", price: "₹ 440", tag: "gluten_free", desc: "Candied walnuts, wild arugula, pomegranate reduction." },
  ];

  const filtered = dietary === "all" ? dishes : dishes.filter((d) => d.tag === dietary);

  return (
    <div className="bg-[#0A0A0A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Digital Dietary Menu • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">Interactive Seasonal Menu</h1>
          </div>

          <div className="flex items-center gap-1.5 bg-[#141414] p-1 rounded-xl border border-[#262626]">
            {[
              { id: "all", label: "Full Menu" },
              { id: "vegan", label: "Vegan" },
              { id: "gluten_free", label: "Gluten-Free" },
              { id: "chef_special", label: "Chef Special" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDietary(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                  dietary === f.id ? "bg-[#D4A72C] text-black" : "text-[#777] hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((d, i) => (
            <div key={i} className="bg-[#141414] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between gap-3">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-bold text-[#F7F7F5]">{d.name}</h4>
                  <span className="text-sm font-bold text-[#D4A72C] font-mono">{d.price}</span>
                </div>
                <p className="text-xs text-[#888] mt-1 leading-relaxed">{d.desc}</p>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded w-fit">
                {d.tag.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
