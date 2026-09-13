"use client";

import React, { useState } from "react";
import { Utensils, Calendar, Users, Sparkles, CheckCircle2 } from "lucide-react";

export default function RES_10Design({ businessName = "Saffron & Flame Dining" }: { businessName?: string }) {
  const [guests, setGuests] = useState("2 Guests");
  const [time, setTime] = useState("08:00 PM Tonight");

  return (
    <div className="bg-[#090807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl text-center items-center">
          <div className="w-12 h-12 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
            <Utensils className="w-6 h-6" />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Instant Table Reservation Desk
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5]">{businessName}</h1>
            <p className="text-xs text-[#A7A7A0]">
              Reserve your table in 30 seconds. Confirmed immediately with priority seating and welcome chef amuse-bouche.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="bg-[#1D1714] p-3.5 rounded-xl border border-[#33261F] flex flex-col gap-1">
              <span className="text-[10px] text-[#A7A7A0] font-semibold">Party Size</span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-sm font-bold text-[#F7F7F5] focus:outline-none"
              >
                <option value="2 Guests" className="bg-[#14100E]">2 Guests (Couple)</option>
                <option value="4 Guests" className="bg-[#14100E]">4 Guests (Family)</option>
                <option value="6+ Guests" className="bg-[#14100E]">6+ Guests (Private Dining)</option>
              </select>
            </div>

            <div className="bg-[#1D1714] p-3.5 rounded-xl border border-[#33261F] flex flex-col gap-1">
              <span className="text-[10px] text-[#A7A7A0] font-semibold">Seating Time</span>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent text-sm font-bold text-[#F7F7F5] focus:outline-none"
              >
                <option value="08:00 PM Tonight" className="bg-[#14100E]">08:00 PM Tonight</option>
                <option value="09:30 PM Tonight" className="bg-[#14100E]">09:30 PM Tonight</option>
                <option value="Tomorrow Lunch" className="bg-[#14100E]">Tomorrow Lunch (01:00 PM)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
