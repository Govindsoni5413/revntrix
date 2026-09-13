"use client";

import React, { useState } from "react";
import { Sparkles, Music, Wine } from "lucide-react";

export default function RES_05Design({ businessName = "The Neon Velvet Speakeasy" }: { businessName?: string }) {
  return (
    <div className="bg-[#09060A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-widest bg-[#F43F5E]/10 px-3 py-1 rounded-full border border-[#F43F5E]/30">
            Nostalgic Cocktails & Jazz
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Vintage Vinyl, Craft Bourbon & Midnight Bites
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} resurrects 1930s cocktail craft with barrel-aged negronis, live acoustic jazz, and velvet booth hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#140C16] border border-[#2B1730] rounded-2xl p-5 flex flex-col gap-2">
            <Wine className="w-5 h-5 text-[#F43F5E]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Oak Barrel Aged Cocktails</h4>
            <p className="text-xs text-[#888]">Rested for 90 days in charred American oak casks.</p>
          </div>
          <div className="bg-[#140C16] border border-[#2B1730] rounded-2xl p-5 flex flex-col gap-2">
            <Music className="w-5 h-5 text-[#F43F5E]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Live Jazz Sessions</h4>
            <p className="text-xs text-[#888]">Every Thursday to Sunday from 9:30 PM onwards.</p>
          </div>
          <div className="bg-[#140C16] border border-[#2B1730] rounded-2xl p-5 flex flex-col gap-2">
            <Sparkles className="w-5 h-5 text-[#F43F5E]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Secret Password Entry</h4>
            <p className="text-xs text-[#888]">Exclusive door access codes updated weekly on WhatsApp.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
