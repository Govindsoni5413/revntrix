"use client";

import React from "react";
import { Award, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function INT_08Design({ businessName = "Ar. Rohit Singhal" }: { businessName?: string }) {
  return (
    <div className="bg-[#0A0A0A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Personal Brand Bio Header */}
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-[#222] pb-10">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-[#3A2F1B] to-[#141414] border-2 border-[#D4A72C] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,167,44,0.2)]">
            <span className="text-3xl font-serif font-bold text-[#D4A72C]">RS</span>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Principal Architect & Interiorist
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#F7F7F5]">{businessName}</h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0] leading-relaxed">
              15 years transforming premier urban estates across India and Dubai with a philosophy rooted in restraint, natural illumination, and handcrafted legacy.
            </p>
          </div>
        </div>

        {/* Accolades & Philosophy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <Award className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Architectural Digest 100</h4>
            <p className="text-xs text-[#888]">Recognized as top interior visionary for consecutive 3 years.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <BookOpen className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Published Monograph</h4>
            <p className="text-xs text-[#888]">Author of "Silence & Stone: Modern Indian Living".</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Selective Commission</h4>
            <p className="text-xs text-[#888]">Strictly 6 turnkey commissions accepted per calendar year.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
