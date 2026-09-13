"use client";

import React, { useState } from "react";
import { Award, BookOpen, Clock, ShieldCheck, CheckCircle } from "lucide-react";

export default function CLN_03Design({ businessName = "Dr. Sameer Kapoor Clinic" }: { businessName?: string }) {
  return (
    <div className="bg-[#090A0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-[#222] pb-8">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-[#1D2530] to-[#111419] border-2 border-[#D4A72C] flex items-center justify-center shrink-0">
            <span className="text-3xl font-bold text-[#D4A72C]">SK</span>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Senior Consultant Dermatologist & Hair Transplant Surgeon
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F5]">{businessName}</h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0]">
              MBBS, MD (Dermatology), Fellow British Association of Dermatologists. 18+ years restoring skin health and clinical confidence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#12151B] p-5 rounded-2xl border border-[#232935] flex flex-col gap-2">
            <Award className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">12,000+ Cases Treated</h4>
            <p className="text-xs text-[#888]">Acne, laser rejuvenation & advanced follicular restoration.</p>
          </div>
          <div className="bg-[#12151B] p-5 rounded-2xl border border-[#232935] flex flex-col gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">US-FDA Approved Lasers</h4>
            <p className="text-xs text-[#888]">Candela GentleMax Pro & Morpheus8 RF clinical equipment.</p>
          </div>
          <div className="bg-[#12151B] p-5 rounded-2xl border border-[#232935] flex flex-col gap-2">
            <Clock className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Private 1-on-1 Slots</h4>
            <p className="text-xs text-[#888]">Comprehensive 30-minute unhurried diagnostic analysis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
