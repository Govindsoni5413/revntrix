"use client";

import React, { useState } from "react";
import { Check, Clock, Shield, Sparkles, PhoneCall } from "lucide-react";

export default function INT_05Design({ businessName = "Solarium Interiors" }: { businessName?: string }) {
  const [selectedPackage, setSelectedPackage] = useState("Full Turnkey");

  return (
    <div className="bg-[#0B0B0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Compact Conversion Hero */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-[11px] font-bold text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            One-Page Luxury Studio
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Turnkey Interior Architecture for Discerning Homes
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-xl">
            {businessName} handles everything from concept sketches, 3D visualization, custom carpentry to final handover within 60 days.
          </p>
        </div>

        {/* 60-Day Process Timeline */}
        <div className="bg-[#141416] p-6 sm:p-8 rounded-2xl border border-[#252528] flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4A72C]">
            Our Guaranteed 4-Phase Delivery Framework
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { days: "Days 1–7", title: "Site Scan & 3D", desc: "Laser measurement & realistic virtual renders." },
              { days: "Days 8–20", title: "Civil & Electrical", desc: "Concealed plumbing, wiring & ceiling framing." },
              { days: "Days 21–45", title: "Custom Millwork", desc: "Factory-finish wardrobes, kitchens & paneling." },
              { days: "Days 46–60", title: "Styling & Handover", desc: "Lighting, art curation & deep clean handover." },
            ].map((step, idx) => (
              <div key={idx} className="bg-[#1A1A1D] p-4 rounded-xl border border-[#2E2E33] flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-[#D4A72C] font-bold">{step.days}</span>
                <h4 className="text-xs font-bold text-[#F7F7F5]">{step.title}</h4>
                <p className="text-[11px] text-[#888] leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Package Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Consultation & 3D", budget: "Design Only", details: "Floorplans, 3D renders, BOQ & material codes." },
            { name: "Full Turnkey", budget: "Complete Fit-Out", details: "Materials, carpentry, electrical, project manager & 10-yr warranty." },
            { name: "Signature Bespoke", budget: "Luxury Estate", details: "Imported Italian marbles, automation & custom artwork curation." },
          ].map((pkg) => (
            <button
              key={pkg.name}
              type="button"
              onClick={() => setSelectedPackage(pkg.name)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[160px] ${
                selectedPackage === pkg.name
                  ? "bg-[#D4A72C]/10 border-[#D4A72C] shadow-lg"
                  : "bg-[#141416] border-[#252528] hover:border-[#444]"
              }`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-[#F7F7F5]">{pkg.name}</h4>
                  {selectedPackage === pkg.name && <Check className="w-4 h-4 text-[#D4A72C]" />}
                </div>
                <span className="text-xs text-[#D4A72C] font-semibold">{pkg.budget}</span>
                <p className="text-xs text-[#888] mt-2">{pkg.details}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
