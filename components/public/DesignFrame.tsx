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
    <div className="min-h-screen bg-[#F5F1DC] text-[#0B1226] flex flex-col font-sans">
      {/* Top Interactive Control Bar */}
      <header className="sticky top-0 z-50 bg-[#F5F1DC]/95 backdrop-blur-md border-b border-[#DDD5BE] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${niche?.slug || ""}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#ECE6D0] border border-[#DDD5BE] text-xs font-bold text-[#0B1226] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Catalog</span>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0046FF]/10 text-[#001BB7] border border-[#0046FF]/20">
                {design.id}
              </span>
              <span className="text-sm font-bold text-[#0B1226]">{design.name}</span>
            </div>
            <span className="text-[11px] text-[#4F5D75] hidden sm:block">
              {niche?.name} • Semi-Functional Preview
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center bg-white p-1 rounded-xl border border-[#DDD5BE]">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === "desktop"
                ? "bg-[#001BB7] text-white shadow-sm"
                : "text-[#4F5D75] hover:text-[#0B1226]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === "mobile"
                ? "bg-[#001BB7] text-white shadow-sm"
                : "text-[#4F5D75] hover:text-[#0B1226]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Right: Conversion Triggers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCustomOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#ECE6D0] border border-[#DDD5BE] text-xs font-bold text-[#0B1226] transition-all min-h-[44px]"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#FF8040]" />
            <span>Custom Brief</span>
          </button>

          <button
            type="button"
            onClick={() => setReadyMadeOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0046FF] hover:bg-[#001BB7] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0046FF]/20 min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current text-[#FF8040]" />
            <span>Get This Design</span>
          </button>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white hover:bg-[#ECE6D0] border border-[#DDD5BE] text-[#001BB7] hover:text-[#0046FF] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Chat about this design on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
          </a>
        </div>
      </header>

      {/* Viewport Frame Container */}
      <main className="flex-1 flex justify-center items-start overflow-x-hidden p-0 md:p-4 bg-[#ECE6D0]">
        {viewport === "mobile" ? (
          <div className="w-[390px] min-h-[844px] my-4 rounded-[40px] border-[10px] border-[#0B1226] shadow-2xl overflow-hidden bg-white relative">
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#0B1226] rounded-full z-50 pointer-events-none" />
            <div className="pt-6 h-full overflow-y-auto">{children}</div>
          </div>
        ) : (
          <div className="w-full max-w-full rounded-none md:rounded-2xl overflow-hidden shadow-2xl border-0 md:border border-[#DDD5BE] bg-white">
            {children}
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar for Mobile Device View */}
      <div className="sticky bottom-0 z-40 bg-[#F5F1DC]/95 backdrop-blur-md border-t border-[#DDD5BE] p-3 flex items-center justify-between sm:hidden shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#0B1226]">{design.id}</span>
          <span className="text-[10px] text-[#4F5D75]">{design.name}</span>
        </div>
        <button
          type="button"
          onClick={() => setReadyMadeOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0046FF] text-white text-xs font-bold uppercase tracking-wider shadow-md"
        >
          Get This Design
        </button>
      </div>

      {/* Ready-Made 2-step Conversion Modal */}
      <ReadyMadeModal
        isOpen={readyMadeOpen}
        onClose={() => setReadyMadeOpen(false)}
        designId={design.id}
        designName={design.name}
        nicheId={design.nicheId}
        defaultBusinessName={businessName}
        campaignId={campaignId}
      />

      {/* Custom Onboarding 5-step Modal */}
      <CustomOnboardingModal
        isOpen={customOpen}
        onClose={() => setCustomOpen(false)}
        defaultBusinessName={businessName}
      />
    </div>
  );
}
