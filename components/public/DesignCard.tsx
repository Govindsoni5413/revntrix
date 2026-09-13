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
      <div className="group bg-[#141414] border border-[#262626] hover:border-[#D4A72C]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,167,44,0.12)]">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#1D1D1D] text-[#D4A72C] border border-[#343434]">
              {design.id}
            </span>
            <span className="text-xs text-[#A7A7A0]">{niche?.name}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] text-[#22C55E] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            Interactive
          </span>
        </div>

        {/* Visual Mock / Abstract Preview Canvas */}
        <Link
          href={previewUrl}
          className="relative my-4 aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-[#1D1D1D] to-[#0A0A0A] border border-[#2E2E2E] overflow-hidden flex flex-col justify-between p-4 group-hover:border-[#D4A72C]/40 transition-colors"
        >
          {/* Subtle Ambient Background Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4A72C_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Top Bar Mock */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#343434]" />
              <span className="w-2 h-2 rounded-full bg-[#343434]" />
              <span className="w-2 h-2 rounded-full bg-[#343434]" />
            </div>
            <div className="text-[10px] text-[#A7A7A0] font-mono tracking-wider">
              {design.id}.revntrix.live
            </div>
          </div>

          {/* Central Mock Content */}
          <div className="flex flex-col gap-1 text-center py-2 relative z-10">
            <span className="text-xs font-bold text-[#F7F7F5] group-hover:text-[#F3C64E] transition-colors">
              {design.name}
            </span>
            <span className="text-[10px] text-[#A7A7A0] line-clamp-1">
              {design.designDNA.visualDirection}
            </span>
          </div>

          {/* Bottom Interactive Prompt Overlay */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#D4A72C] bg-[#080808]/80 py-1.5 rounded-lg backdrop-blur-sm border border-[#343434] relative z-10 group-hover:bg-[#D4A72C] group-hover:text-black transition-all">
            <Eye className="w-3.5 h-3.5" />
            <span>Launch Live Preview</span>
          </div>
        </Link>

        {/* Description & Key Strategy */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-[#F7F7F5]">{design.name}</h4>
          <p className="text-xs text-[#A7A7A0] line-clamp-2 leading-relaxed">
            {design.description}
          </p>
          <div className="text-[11px] text-[#8F6415] bg-[#D4A72C]/10 border border-[#D4A72C]/20 px-2.5 py-1 rounded-md font-medium">
            🎯 {design.designDNA.conversionStrategy}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-[#1F1F1F] grid grid-cols-2 gap-2">
          <Link
            href={previewUrl}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#1D1D1D] hover:bg-[#262626] border border-[#343434] text-xs font-semibold text-[#F7F7F5] transition-all min-h-[44px]"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Preview</span>
          </Link>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#F3C64E] to-[#D4A72C] hover:brightness-110 text-black text-xs font-bold transition-all min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Select</span>
          </button>
        </div>
      </div>

      {/* Ready Made Modal */}
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
