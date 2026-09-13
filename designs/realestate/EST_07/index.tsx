"use client";

import React from "react";
import { Sparkles, Calendar, FileText, Download, CheckCircle2 } from "lucide-react";

export default function EST_07Design({ businessName = "The Luminary Residences" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3.5 py-1.5 rounded-full border border-[#D4A72C]/30 w-fit">
            Exclusive Pre-Launch Allocation • Handover Q4 2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">{businessName}</h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-xl">
            60 storeys of architectural majesty. Pre-launch preferential pricing for early investor tranches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <span className="text-xs font-mono text-[#D4A72C]">Payment Plan</span>
            <h4 className="text-base font-bold text-[#F7F7F5]">20:80 Construction Linked</h4>
            <p className="text-xs text-[#888]">Pay 20% on booking, balance on structural slab milestones.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <span className="text-xs font-mono text-[#D4A72C]">RERA Approved</span>
            <h4 className="text-base font-bold text-[#F7F7F5]">P51800098762</h4>
            <p className="text-xs text-[#888]">100% compliant documentation with escrow account security.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <span className="text-xs font-mono text-[#D4A72C]">VIP Allocation</span>
            <h4 className="text-base font-bold text-[#F7F7F5]">Floor Plans Available</h4>
            <p className="text-xs text-[#888]">Download complete high-res architectural PDFs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
