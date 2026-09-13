"use client";

import React from "react";
import { Award, ShieldCheck, MapPin, Building, CheckCircle2 } from "lucide-react";

export default function EST_04Design({ businessName = "Bandra West Realty Advisors" }: { businessName?: string }) {
  return (
    <div className="bg-[#080808] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-[#222] pb-8">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#3A2A18] to-[#121212] border-2 border-[#D4A72C] flex items-center justify-center shrink-0">
            <Building className="w-12 h-12 text-[#D4A72C]" />
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Hyperlocal Real Estate Brokerage
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F5]">{businessName}</h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0]">
              Specializing exclusively in Pali Hill, Carter Road & Bandstand luxury residential acquisitions. Over ₹420 Cr+ in closed high-value mandates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">100% Title Clear Deeds</h4>
            <p className="text-xs text-[#888]">Comprehensive legal search report by tier-1 law firms.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <Award className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Off-Market Inventory</h4>
            <p className="text-xs text-[#888]">Direct access to unlisted celebrity bungalows & penthouses.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Discreet Negotiation</h4>
            <p className="text-xs text-[#888]">Confidential escrow and buyer privacy protection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
