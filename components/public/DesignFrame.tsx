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
  Lock,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Interactive Control Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm text-slate-900">
        {/* Left: Back to Catalog & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${niche?.slug || ""}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors min-h-[40px] touch-interactive"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Catalog</span>
          </Link>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-100 text-sky-700 border border-sky-200">
                {design.id}
              </span>
              <span className="text-sm font-bold text-slate-900">{design.name}</span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              {niche?.name} • Live Interactive Showcase
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewport === "desktop"
                ? "bg-white text-sky-600 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewport === "mobile"
                ? "bg-white text-sky-600 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 transition-all min-h-[40px] cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Custom Brief</span>
          </button>

          <button
            type="button"
            onClick={() => setReadyMadeOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm shadow-sky-600/25 min-h-[40px] shimmer-trigger cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current text-white" />
            <span>Get This Design</span>
          </button>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shadow-xs"
            title="Chat about this design on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
          </a>
        </div>
      </header>

      {/* Viewport Frame Container */}
      <main className="flex-1 flex justify-center items-start overflow-x-hidden p-0 md:p-4 bg-slate-900">
        {viewport === "mobile" ? (
          <div className="w-[390px] min-h-[844px] my-4 rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden bg-white relative">
            {/* Phone Dynamic Island / Speaker Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-50 pointer-events-none" />
            <div className="pt-8 h-full overflow-y-auto">{children}</div>
          </div>
        ) : (
          <div className="w-full max-w-full rounded-none md:rounded-2xl overflow-hidden shadow-2xl border-0 md:border border-slate-800 bg-white">
            {children}
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar for Mobile Device Screen Viewports */}
      <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between sm:hidden shadow-lg text-slate-900">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-900">{design.id}</span>
          <span className="text-[10px] text-slate-500">{design.name}</span>
        </div>
        <button
          type="button"
          onClick={() => setReadyMadeOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
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
