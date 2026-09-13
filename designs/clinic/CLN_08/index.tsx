"use client";

import React, { useState } from "react";
import { Award, Shield, CheckCircle, Activity } from "lucide-react";

export default function CLN_08Design({ businessName = "Apex Advanced Spine & Joint Center" }: { businessName?: string }) {
  return (
    <div className="bg-[#090A0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Super-Specialist Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Minimally Invasive Joint & Spine Precision
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} pioneers precision robotic navigation, same-day mobility recovery, and non-surgical regeneration therapy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121419] p-5 rounded-2xl border border-[#222733] flex flex-col gap-2">
            <Activity className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Robotic Mako Surgery</h4>
            <p className="text-xs text-[#888]">Sub-millimeter implant alignment with faster ligament recovery.</p>
          </div>
          <div className="bg-[#121419] p-5 rounded-2xl border border-[#222733] flex flex-col gap-2">
            <Shield className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Zero-Infection Protocol</h4>
            <p className="text-xs text-[#888]">Class-100 Laminar Airflow operating suites with HEPA filtration.</p>
          </div>
          <div className="bg-[#121419] p-5 rounded-2xl border border-[#222733] flex flex-col gap-2">
            <CheckCircle className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Day-Care Arthroscopy</h4>
            <p className="text-xs text-[#888]">Walk home within 6 hours of precision meniscus repair.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
