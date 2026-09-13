"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Sparkles,
  MessageSquare,
  Wand2,
  Share2,
  ExternalLink,
} from "lucide-react";
import { DesignRecord, NICHES } from "@/lib/design-registry";
import { ReadyMadeModal } from "@/components/shared/ReadyMadeModal";
import { CustomOnboardingModal } from "@/components/shared/CustomOnboardingModal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type DesignFrameProps = {
  design: DesignRecord;
  businessName?: string;
  campaignId?: string | null;
  children: React.ReactNode;
};

export function DesignFrame({
  design,
  businessName,
  campaignId,
  children,
}: DesignFrameProps) {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [readyMadeOpen, setReadyMadeOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  const niche = NICHES[design.nicheId];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const directWhatsAppUrl = buildWhatsAppUrl(
    whatsappNumber,
    `Hello Revntrix Team! I am reviewing design ${design.id} (${design.name}) for ${
      businessName || "my business"
    } and would like to proceed.`
  );

  return (
    <div className="min-h-screen bg-[#080808] text-[#F7F7F5] flex flex-col">
      {/* Top Interactive Control Bar */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-[#2E2E2E] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${niche?.slug || ""}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D1D1D] hover:bg-[#262626] border border-[#343434] text-xs font-semibold text-[#A7A7A0] hover:text-[#F7F7F5] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Catalog</span>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D4A72C]/20 text-[#D4A72C] border border-[#D4A72C]/30">
                {design.id}
              </span>
              <span className="text-sm font-bold text-[#F7F7F5]">{design.name}</span>
            </div>
            <span className="text-[11px] text-[#A7A7A0] hidden sm:block">
              {niche?.name} • Semi-Functional Preview
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center bg-[#080808] p-1 rounded-lg border border-[#343434]">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewport === "desktop"
                ? "bg-[#1D1D1D] text-[#D4A72C] shadow"
                : "text-[#A7A7A0] hover:text-[#F7F7F5]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewport === "mobile"
                ? "bg-[#1D1D1D] text-[#D4A72C] shadow"
                : "text-[#A7A7A0] hover:text-[#F7F7F5]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Right: Conversion Triggers */}
        <div className="flex items-center gap-2">
          {/* Custom Flow */}
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1D1D1D] hover:bg-[#262626] border border-[#343434] text-xs font-medium text-[#F7F7F5] transition-colors min-h-[44px]"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Custom Architecture</span>
          </button>

          {/* Ready Made Handoff */}
          <button
            type="button"
            onClick={() => setReadyMadeOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#F3C64E] via-[#D4A72C] to-[#8F6415] text-black text-xs font-bold hover:brightness-110 shadow-[0_0_20px_rgba(212,167,44,0.25)] transition-all min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Choose This Design</span>
          </button>
        </div>
      </header>

      {/* Live Content Stage */}
      <main className="flex-1 flex justify-center items-start bg-[#0D0D0D] p-0 md:p-6 overflow-x-hidden">
        <div
          className={`w-full transition-all duration-300 ease-out bg-[#080808] ${
            viewport === "mobile"
              ? "max-w-[390px] min-h-[844px] my-4 rounded-[40px] border-[8px] border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
              : "max-w-7xl rounded-none md:rounded-2xl border-0 md:border md:border-[#222] shadow-2xl overflow-hidden"
          }`}
        >
          {children}
        </div>
      </main>

      {/* Sticky Bottom Quick Handoff Bar on Mobile */}
      <div className="md:hidden sticky bottom-0 z-40 bg-[#141414]/95 backdrop-blur-md border-t border-[#262626] p-3 flex items-center gap-2">
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-black text-xs font-bold min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp Handoff</span>
        </a>
        <button
          type="button"
          onClick={() => setReadyMadeOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r from-[#F3C64E] to-[#D4A72C] text-black text-xs font-bold min-h-[44px]"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Ready-Made</span>
        </button>
      </div>

      {/* Conversion Modals */}
      <ReadyMadeModal
        isOpen={readyMadeOpen}
        onClose={() => setReadyMadeOpen(false)}
        designId={design.id}
        designName={design.name}
        nicheId={design.nicheId}
        defaultBusinessName={businessName}
        campaignId={campaignId}
      />

      <CustomOnboardingModal
        isOpen={customOpen}
        onClose={() => setCustomOpen(false)}
        defaultNicheId={design.nicheId}
        defaultBusinessName={businessName}
        campaignId={campaignId}
      />
    </div>
  );
}
