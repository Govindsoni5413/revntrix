"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function INT_10Design({ businessName = "Apex Atelier Studio" }: { businessName?: string }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    { q: "How long does a 3BHK turnkey fitout take?", a: "Our standard turnkey timeline is 45 to 60 calendar days with zero cost overrun guarantee." },
    { q: "Do you supply customized furniture and loose styling?", a: "Yes, we operate an in-house bespoke carpentry and upholstery factory ensuring custom millimeter fits." },
    { q: "What warranty is provided on woodwork and finishes?", a: "We provide an ironclad 10-year structural warranty on all factory-pressed plywood and German hardware." },
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-[11px] font-bold text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3.5 py-1.5 rounded-full border border-[#D4A72C]/30">
            Premium Studio Lead Framework
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
            Architectural Excellence. Delivered with Clockwork Precision.
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-xl">
            {businessName} eliminates project delays with laser site scanning, fixed-price contracts, and dedicated weekly project reporting.
          </p>
        </div>

        {/* 3 Core Proof Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <ShieldCheck className="w-6 h-6 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Fixed-Price Contract</h4>
            <p className="text-xs text-[#888]">Zero hidden escalation clauses once the BOQ is signed.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <Sparkles className="w-6 h-6 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">German Hardware</h4>
            <p className="text-xs text-[#888]">Hettich & Blum soft-close fittings with 10-year replacement.</p>
          </div>
          <div className="bg-[#141414] p-5 rounded-2xl border border-[#262626] flex flex-col gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#D4A72C]" />
            <h4 className="text-sm font-bold text-[#F7F7F5]">Daily Site Logs</h4>
            <p className="text-xs text-[#888]">Live photo and milestone updates sent directly to your WhatsApp.</p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-[#141414] p-6 sm:p-8 rounded-2xl border border-[#262626] flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#F7F7F5]">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-2">
            {faqs.map((item, idx) => (
              <div key={idx} className="border-b border-[#222] pb-3">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left flex justify-between items-center text-xs font-semibold text-[#F7F7F5] py-2"
                >
                  <span>{item.q}</span>
                  <span className="text-[#D4A72C] font-bold">{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <p className="text-xs text-[#A7A7A0] pt-1 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
