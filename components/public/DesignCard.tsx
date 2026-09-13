"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Eye,
  CheckCircle,
  Lock,
  Wifi,
  BatteryCharging,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { DesignRecord, NICHES } from "@/lib/design-registry";
import { ReadyMadeModal } from "@/components/shared/ReadyMadeModal";

type DesignCardProps = {
  design: DesignRecord;
  businessName?: string;
  campaignId?: string | null;
  onPreviewClick?: (designId: string) => void;
};

// Design niche themes for the card header and mockup body
const nicheCardColors: Record<
  string,
  {
    badgeBg: string;
    badgeText: string;
    mockupGradient: string;
    accentGlow: string;
  }
> = {
  INT: {
    badgeBg: "bg-sky-100/70 text-sky-700",
    badgeText: "text-sky-700",
    mockupGradient: "from-stone-900 via-neutral-900 to-stone-950",
    accentGlow: "text-amber-300",
  },
  CLN: {
    badgeBg: "bg-indigo-100/70 text-indigo-700",
    badgeText: "text-indigo-700",
    mockupGradient: "from-sky-950 via-slate-900 to-indigo-950",
    accentGlow: "text-sky-300",
  },
  EST: {
    badgeBg: "bg-sky-100/70 text-sky-700",
    badgeText: "text-sky-700",
    mockupGradient: "from-slate-950 via-sky-950 to-slate-900",
    accentGlow: "text-sky-400",
  },
  JW: {
    badgeBg: "bg-amber-100/70 text-amber-700",
    badgeText: "text-amber-700",
    mockupGradient: "from-amber-950 via-neutral-950 to-stone-950",
    accentGlow: "text-amber-400",
  },
  RES: {
    badgeBg: "bg-rose-100/70 text-rose-700",
    badgeText: "text-rose-700",
    mockupGradient: "from-rose-950 via-neutral-950 to-stone-950",
    accentGlow: "text-rose-400",
  },
  ECO: {
    badgeBg: "bg-emerald-100/70 text-emerald-700",
    badgeText: "text-emerald-700",
    mockupGradient: "from-emerald-950 via-slate-950 to-neutral-950",
    accentGlow: "text-emerald-400",
  },
};

export function DesignCard({
  design,
  businessName,
  campaignId,
  onPreviewClick,
}: DesignCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const niche = NICHES[design.nicheId];
  const colorTheme = nicheCardColors[design.nicheId] || nicheCardColors.INT;
  const previewUrl = `/${niche?.slug || design.nicheId.toLowerCase()}/${design.id}${
    businessName ? `?businessName=${encodeURIComponent(businessName)}` : ""
  }`;

  return (
    <>
      <div
        className="blueprint-card group rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(2,132,199,0.18)] hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col touch-interactive"
        data-category={design.nicheId.toLowerCase()}
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 251, 255, 0.92) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top Identification Strip */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-[12px] font-bold px-2 py-0.5 rounded transition-transform group-hover:scale-105 ${colorTheme.badgeBg}`}
            >
              {design.id}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
              {niche?.name || design.nicheId}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-breathing-ring" />
            <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
              Interactive
            </span>
          </div>
        </div>

        {/* Realistic Mobile Device Frame Mockup Preview Canvas */}
        <div className="relative w-full h-64 sm:h-72 bg-slate-950 border-b border-slate-200/80 overflow-hidden flex flex-col justify-center items-center py-3 px-4 group/preview">
          {/* iOS Device Bezel Mockup */}
          <div className="w-[220px] sm:w-[245px] h-full bg-slate-900 rounded-[28px] border-[3px] border-slate-700/80 shadow-2xl overflow-hidden flex flex-col relative text-white transition-transform duration-500 group-hover/preview:scale-[1.03]">
            {/* iOS Status Bar */}
            <div className="h-6 px-3 bg-slate-950/90 flex items-center justify-between text-[9px] text-slate-300 font-medium z-20 border-b border-white/5">
              <span className="font-mono text-[9px]">9:41</span>
              <div className="w-16 h-3 bg-black rounded-full mx-auto flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-900 mr-1" />
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <Wifi className="w-2.5 h-2.5 text-slate-300" />
                <BatteryCharging className="w-2.5 h-2.5 text-slate-300" />
              </div>
            </div>

            {/* Simulated SSL URL Pill Bar */}
            <div className="px-2.5 py-1 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-[8px] z-20">
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 flex-1 mx-1 text-slate-300 font-mono">
                <Lock className="w-2 h-2 text-emerald-400 shrink-0" />
                <span className="truncate">{design.id.toLowerCase()}.revntrix.live</span>
              </div>
            </div>

            {/* Inner Live Snapshot Simulation */}
            <div
              className={`flex-1 bg-gradient-to-br ${colorTheme.mockupGradient} p-3 flex flex-col justify-between overflow-hidden relative`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-[9px] font-bold tracking-wider text-slate-200 uppercase truncate max-w-[120px]">
                  {design.name}
                </span>
                <span className="text-[7px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/20 font-mono uppercase">
                  {design.nicheId}
                </span>
              </div>

              <div className="my-auto py-1">
                <div className="text-[11px] font-bold text-white tracking-tight leading-tight mb-1">
                  {design.name}
                </div>
                <p className="text-[8px] text-slate-300 line-clamp-2 leading-tight">
                  {design.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[8px] text-slate-300">
                <span className="text-sky-300 font-semibold truncate max-w-[120px]">
                  {design.designDNA.visualDirection}
                </span>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[7px] font-bold">
                  Live
                </span>
              </div>
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="h-3 bg-slate-950 flex items-center justify-center">
              <div className="w-14 h-0.5 bg-slate-600 rounded-full" />
            </div>
          </div>

          {/* Hover Action Overlay with Direct Launch Button */}
          <div className="absolute inset-0 z-30 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
            <Link
              href={previewUrl}
              className="h-11 px-5 rounded-xl bg-sky-600 text-white text-[13px] font-semibold hover:bg-sky-500 transition-all shadow-lg flex items-center gap-1.5 active:scale-95 touch-interactive"
            >
              <Eye className="w-4 h-4" />
              <span>Launch Live Preview</span>
            </Link>
            <span className="text-[10px] text-slate-300 mt-2 font-medium">
              Interactive responsive preview
            </span>
          </div>
        </div>

        {/* Card Body & Strategic Conversion Pill */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-[17px] sm:text-[18px] text-slate-900 mb-1 font-bold group-hover:text-sky-700 transition-colors">
              {design.name}
            </h4>
            <p className="text-[13px] text-slate-600 mb-3 leading-relaxed line-clamp-2">
              {design.description}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold mb-3 border border-emerald-200/80 transition-all hover:bg-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-breathing-ring" />
              <span className="truncate max-w-[240px]">
                {design.designDNA.conversionStrategy || "Persistent WhatsApp CTA"}
              </span>
            </div>
          </div>

          {/* Action Dual Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <Link
              href={previewUrl}
              className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 text-[13px] sm:text-[14px] font-semibold hover:bg-slate-200 transition-all active:scale-[0.97] touch-interactive"
            >
              <span>Live Demo</span>
            </Link>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-sky-600 text-white text-[13px] sm:text-[14px] font-semibold hover:bg-sky-700 shadow-sm shadow-sky-600/20 transition-all active:scale-[0.97] touch-interactive shimmer-trigger cursor-pointer"
            >
              <span>Get Design</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ready-Made 2-step Conversion Modal */}
      <ReadyMadeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        designId={design.id}
        designName={design.name}
        nicheId={design.nicheId}
        defaultBusinessName={businessName}
        campaignId={campaignId}
      />
    </>
  );
}
