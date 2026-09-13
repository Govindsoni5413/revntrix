"use client";

import React from "react";
import { Phone, Clock, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";

export default function CLN_10Design({ businessName = "Dr. Gupta Family Clinic" }: { businessName?: string }) {
  return (
    <div className="bg-[#090A0B] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="bg-[#121417] border border-[#23272F] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#D4A72C] uppercase font-bold">Local Family Practice</span>
            <span className="text-xs text-[#22C55E] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Open Now
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5]">{businessName}</h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0]">
            Trusted neighbourhood family physician serving Model Town since 2004. General health checkups, chronic disease management, and emergency nebulization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1E222A] text-xs text-[#C5C5C5]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4A72C]" />
              <span>Morning: 9:00 AM – 1:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4A72C]" />
              <span>Evening: 5:30 PM – 9:00 PM</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-[#D4A72C]" />
              <span>Shop 4, Market Complex, Model Town Phase 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
