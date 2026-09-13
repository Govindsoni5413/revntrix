"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, ShieldCheck, RefreshCw, Check } from "lucide-react";

export default function ECO_10Design({ businessName = "Roast Club Specialty Subscription" }: { businessName?: string }) {
  const [frequency, setFrequency] = useState("Every 2 Weeks");
  const [grind, setGrind] = useState("Whole Bean");

  return (
    <div className="bg-[#0A0807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Automated Coffee Club • {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Freshly Roasted Coffee. Delivered on Your Schedule.
          </h1>
        </div>

        <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#D4A72C] uppercase">1. Delivery Frequency</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {["Every Week", "Every 2 Weeks", "Monthly (4 Bags)"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] ${
                    frequency === f
                      ? "bg-[#D4A72C] text-black border-[#D4A72C]"
                      : "bg-[#1C1613] border-[#33251F] text-[#888]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0D0B0A] p-4 rounded-xl border border-[#221814] flex justify-between items-center text-xs">
            <div>
              <span className="text-[#A7A7A0] block">Subscription Plan:</span>
              <strong className="text-[#F7F7F5] font-bold text-sm">2x 250g Micro-Lot Estates ({frequency})</strong>
            </div>
            <span className="text-sm font-mono font-bold text-[#D4A72C]">₹ 1,190 / shipment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
