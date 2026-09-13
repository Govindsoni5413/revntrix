"use client";

import React, { useState } from "react";
import { Utensils, Sparkles, Clock, Calendar, Check } from "lucide-react";

export default function RES_01Design({ businessName = "L'Osteria Charcoal & Wine" }: { businessName?: string }) {
  const [selectedCourse, setSelectedCourse] = useState(0);

  const tastingMenu = [
    { course: "Amuse-Bouche", dish: "Smoked Burrata & Fermented Fig Tartlet", wine: "Pairing: Franciacorta Cuvée Brut" },
    { course: "First Course", dish: "Charred Spanish Octopus with Romesco & Saffron Oil", wine: "Pairing: Vermentino di Sardegna" },
    { course: "Main Course", dish: "Wood-Fired Truffle Wagyu Tenderloin & Morel Glaze", wine: "Pairing: Brunello di Montalcino 2018" },
    { course: "Dessert", dish: "Smoked Madagascan Dark Chocolate Ganache & Sea Salt", wine: "Pairing: Vin Santo del Chianti" },
  ];

  return (
    <div className="bg-[#090807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-serif italic text-[#D4A72C] tracking-widest uppercase">
            Fine Dining & Degustation • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Culinary Craft Guided by Smoke & Fire
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            7-course seasonal tasting journey celebrating artisanal produce cooked over binchotan charcoal and paired with rare vintage wines.
          </p>
        </div>

        {/* Tasting Menu Timeline */}
        <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <span className="text-xs font-mono text-[#D4A72C] uppercase font-bold">Chef's 7-Course Degustation</span>
          <div className="flex flex-col gap-3">
            {tastingMenu.map((m, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl bg-[#1D1714] border border-[#33261F]">
                <div>
                  <span className="text-[10px] font-mono text-[#D4A72C] uppercase">{m.course}</span>
                  <h4 className="text-sm font-serif font-bold text-[#F7F7F5]">{m.dish}</h4>
                </div>
                <span className="text-xs text-[#A7A7A0] italic">{m.wine}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
