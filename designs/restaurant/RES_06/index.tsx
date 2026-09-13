"use client";

import React, { useState } from "react";
import { Sparkles, Utensils, Award } from "lucide-react";

export default function RES_06Design({ businessName = "Dawat-e-Nawab Awadhi Kitchen" }: { businessName?: string }) {
  return (
    <div className="bg-[#0B0705] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-serif italic text-[#D4A72C]">
            Royal Awadhi & Mughlai Dastarkhwan • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Centuries of Royal Dum Cooking & Slow Fire Heritage
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            Slow-cooked in sealed clay handis with Kashmiri saffron, rose petals, and secret 32-spice potli masalas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#150F0B] border border-[#2D1F17] rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-xs font-serif text-[#D4A72C]">Dum Gosht Biryani</span>
            <p className="text-xs text-[#888]">Slow-steamed for 6 hours in dough-sealed earthen pots.</p>
          </div>
          <div className="bg-[#150F0B] border border-[#2D1F17] rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-xs font-serif text-[#D4A72C]">Galouti Kebab Melt</span>
            <p className="text-xs text-[#888]">Finely minced mutton smoked with raw papaya and cloves.</p>
          </div>
          <div className="bg-[#150F0B] border border-[#2D1F17] rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-xs font-serif text-[#D4A72C]">Shahi Tukda Zafrani</span>
            <p className="text-xs text-[#888]">Crisp brioche soaked in saffron rabri with gold leaf vark.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
