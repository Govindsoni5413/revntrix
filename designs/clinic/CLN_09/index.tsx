"use client";

import React, { useState } from "react";
import { Sparkles, Sun, Heart, CheckCircle2 } from "lucide-react";

export default function CLN_09Design({ businessName = "Soma Integrative Health & Longevity" }: { businessName?: string }) {
  const [selectedPlan, setSelectedPlan] = useState("Metabolic Reset");

  const plans = [
    { title: "Metabolic Reset", focus: "Insulin & Thyroid Balance", metrics: "90-Day Guided Protocol" },
    { title: "Gut Microbiome Repair", focus: "Digestive & Autoimmune Wellness", metrics: "Food Sensitivity Mapping" },
    { title: "Longevity & Vitality", focus: "Cellular Aging & Hormonal Health", metrics: "Biomarker & VO2 Optimization" },
  ];

  return (
    <div className="bg-[#0B0E0D] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/30">
            Integrative Functional Medicine
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F7F5]">
            Root-Cause Healing & Cellular Longevity
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} integrates clinical medical diagnostics with precision nutrition, gut restoration, and peptide therapies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setSelectedPlan(p.title)}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[140px] transition-all ${
                selectedPlan === p.title
                  ? "bg-[#10B981]/10 border-[#10B981] shadow-lg"
                  : "bg-[#111714] border-[#202E27] text-[#777]"
              }`}
            >
              <div>
                <h4 className="text-sm font-bold text-[#F7F7F5]">{p.title}</h4>
                <p className="text-xs text-[#10B981] mt-1">{p.focus}</p>
              </div>
              <span className="text-[11px] text-[#A7A7A0] mt-3">📊 {p.metrics}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
