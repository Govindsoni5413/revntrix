"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle,
} from "lucide-react";
import { DesignRecord, NICHES } from "@/lib/design-registry";
import { ReadyMadeModal } from "@/components/shared/ReadyMadeModal";

type DesignCardProps = {
  design: DesignRecord;
  businessName?: string;
  campaignId?: string | null;
  onPreviewClick?: (designId: string) => void;
};

export function DesignCard({
  design,
  businessName,
  campaignId,
  onPreviewClick,
}: DesignCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const niche = NICHES[design.nicheId];
  const previewUrl = `/${niche?.slug || design.nicheId.toLowerCase()}/${design.id}${
    businessName ? `?businessName=${encodeURIComponent(businessName)}` : ""
  }`;

  return (
    <>
      <div className="group glass-panel glass-panel-hover rounded-3xl p-5 flex flex-col justify-between transition-all duration-300">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#90CAF9]/40">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9]">
              {design.id}
            </span>
            <span className="text-xs font-semibold text-[#3A608F]">{niche?.name}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#16A34A] font-bold px-2 py-0.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            Interactive
          </span>
        </div>

        {/* Visual Mock / Abstract Preview Canvas */}
        <Link
          href={previewUrl}
          className="relative my-4 aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-[#0D47A1] to-[#062454] border border-[#2196F3]/40 overflow-hidden flex flex-col justify-between p-4 group-hover:border-[#2196F3] transition-colors shadow-inner"
        >
          {/* Top Bar Mock */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/30" />
              <span className="w-2 h-2 rounded-full bg-white/30" />
              <span className="w-2 h-2 rounded-full bg-white/30" />
            </div>
            <div className="text-[10px] text-[#E3F2FD]/70 font-mono tracking-wider">
              {design.id}.revntrix.live
            </div>
          </div>

          {/* Central Mock Content */}
          <div className="flex flex-col gap-1 text-center py-2 relative z-10">
            <span className="text-xs font-bold text-white group-hover:text-[#90CAF9] transition-colors">
              {design.name}
            </span>
            <span className="text-[10px] text-[#E3F2FD]/80 line-clamp-1">
              {design.designDNA.visualDirection}
            </span>
          </div>

          {/* Bottom Interactive Prompt Overlay */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-white bg-[#2196F3]/90 backdrop-blur-md py-2 rounded-xl relative z-10 group-hover:bg-[#0D47A1] transition-all border border-white/20">
            <Eye className="w-3.5 h-3.5" />
            <span>Launch Live Preview</span>
          </div>
        </Link>

        {/* Description & Key Strategy */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-[#0D47A1]">{design.name}</h4>
          <p className="text-xs text-[#3A608F] line-clamp-2 leading-relaxed">
            {design.description}
          </p>
          <div className="text-[11px] text-[#0D47A1] bg-white/80 border border-[#90CAF9] px-2.5 py-1.5 rounded-xl font-medium shadow-sm">
            🎯 {design.designDNA.conversionStrategy}
          </div>
        </div>

        {/* Action Buttons — Liquid Glass Capsules */}
        <div className="mt-5 pt-3 border-t border-[#90CAF9]/40 grid grid-cols-2 gap-2.5">
          <Link
            href={previewUrl}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white/90 border border-white hover:bg-white hover:text-[#0D47A1] text-xs font-bold text-[#0D47A1] transition-all min-h-[44px] shadow-xs hover:shadow-md"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="liquid-button-primary flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white transition-all min-h-[44px]"
          >
            <span>Get Design</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
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
