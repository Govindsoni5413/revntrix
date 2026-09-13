"use client";

import React, { useState } from "react";
import { Heart, Shield, Sparkles, Clock, Check } from "lucide-react";

export default function CLN_06Design({ businessName = "Little Star Pediatric Center" }: { businessName?: string }) {
  return (
    <div className="bg-[#0B0D10] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
            Gentle & Child-Friendly Care
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Nurturing Healthy, Happy Childhoods
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-lg">
            {businessName} offers pediatric care, milestone tracking, and pain-free vaccination in a soothing, play-inspired environment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#12151B] p-5 rounded-2xl border border-[#212733] flex flex-col gap-2">
            <Heart className="w-5 h-5 text-[#F59E0B]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Vaccination Tracking</h4>
            <p className="text-xs text-[#888]">Automated SMS reminders aligned with WHO pediatric schedules.</p>
          </div>
          <div className="bg-[#12151B] p-5 rounded-2xl border border-[#212733] flex flex-col gap-2">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Play Therapy Zone</h4>
            <p className="text-xs text-[#888]">Zero stress waiting zone with interactive educational toys.</p>
          </div>
          <div className="bg-[#12151B] p-5 rounded-2xl border border-[#212733] flex flex-col gap-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Evening Pediatric Slots</h4>
            <p className="text-xs text-[#888]">Open till 8:30 PM for working parents' convenience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
