"use client";

import React from "react";
import { Utensils, Award, Sparkles } from "lucide-react";

export default function RES_08Design({ businessName = "Provenance Culinary Story" }: { businessName?: string }) {
  return (
    <div className="bg-[#090807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-serif italic text-[#D4A72C]">
            Ingredient-to-Plate Narrative • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Every Dish Carries a Micro-Climate Story
          </h1>
        </div>

        <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-6 sm:p-8 flex flex-col gap-3">
          <span className="text-xs font-mono text-[#D4A72C] uppercase font-bold">Hero Dish Provenance</span>
          <h3 className="text-xl font-serif text-[#F7F7F5]">Hand-Rolled Tagliolini with White Alba Truffle</h3>
          <p className="text-xs text-[#A7A7A0] leading-relaxed">
            Pasta hand-extruded with 30 organic egg yolks per kilogram of stone-milled semolina, bathed in cultured churned mountain butter and shaved table-side with fresh Alba truffles.
          </p>
        </div>
      </div>
    </div>
  );
}
