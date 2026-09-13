"use client";

import React, { useState } from "react";
import { Lock, Sparkles, Building, ArrowRight } from "lucide-react";

export default function EST_10Design({ businessName = "VIP Private Realty Desk" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="bg-[#141414] border border-[#2B2B2B] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 shadow-2xl text-center items-center">
          <div className="w-12 h-12 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
            <Lock className="w-6 h-6" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Restricted Confidential Inventory
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5]">
              Unlock Off-Market Sea Face Mansions
            </h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-md">
              {businessName} protects owner privacy. Enter your requirements to receive confidential NDAs and unlisted inventory dossiers directly on WhatsApp.
            </p>
          </div>

          <div className="w-full max-w-sm bg-[#1C1C1C] p-4 rounded-xl border border-[#333] flex flex-col gap-2 text-left">
            <span className="text-[11px] text-[#A7A7A0] font-semibold">Included in Private Dossier:</span>
            <span className="text-xs text-[#E5E5E5]">✓ High-resolution walkthrough video</span>
            <span className="text-xs text-[#E5E5E5]">✓ Complete sanctioned floorplans</span>
            <span className="text-xs text-[#E5E5E5]">✓ Verified title search summary</span>
          </div>
        </div>
      </div>
    </div>
  );
}
