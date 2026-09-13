"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Clock, Video, ShieldCheck, Check } from "lucide-react";

export default function CLN_02Design({ businessName = "Aura Digital Health Clinic" }: { businessName?: string }) {
  const [selectedConsult, setSelectedConsult] = useState<"video" | "clinic">("video");

  return (
    <div className="bg-[#0A0D0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#22C55E] uppercase tracking-widest bg-[#22C55E]/10 px-3 py-1 rounded-full border border-[#22C55E]/30">
            Digital-First Healthcare
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Instant Consultations. Zero Waiting Rooms.
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} connects you with board-certified physicians via HD encrypted video consultation or priority in-clinic visits.
          </p>
        </div>

        {/* Consultation Mode Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedConsult("video")}
            className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[140px] ${
              selectedConsult === "video"
                ? "bg-[#22C55E]/10 border-[#22C55E] shadow-xl"
                : "bg-[#111614] border-[#222E29] text-[#777]"
            }`}
          >
            <div>
              <div className="flex justify-between items-center">
                <Video className="w-5 h-5 text-[#22C55E]" />
                {selectedConsult === "video" && <Check className="w-4 h-4 text-[#22C55E]" />}
              </div>
              <h4 className="text-base font-bold text-[#F7F7F5] mt-3">HD Tele-Consultation</h4>
              <p className="text-xs text-[#A7A7A0] mt-1">Connect from home with digital e-prescription.</p>
            </div>
            <span className="text-[11px] text-[#22C55E] font-semibold mt-2">⏱ Next Slot: In 15 mins</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedConsult("clinic")}
            className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[140px] ${
              selectedConsult === "clinic"
                ? "bg-[#22C55E]/10 border-[#22C55E] shadow-xl"
                : "bg-[#111614] border-[#222E29] text-[#777]"
            }`}
          >
            <div>
              <div className="flex justify-between items-center">
                <Calendar className="w-5 h-5 text-[#22C55E]" />
                {selectedConsult === "clinic" && <Check className="w-4 h-4 text-[#22C55E]" />}
              </div>
              <h4 className="text-base font-bold text-[#F7F7F5] mt-3">In-Clinic Express Visit</h4>
              <p className="text-xs text-[#A7A7A0] mt-1">Priority queue check-in with doctor in-person.</p>
            </div>
            <span className="text-[11px] text-[#22C55E] font-semibold mt-2">📍 Bandra West, Mumbai</span>
          </button>
        </div>
      </div>
    </div>
  );
}
