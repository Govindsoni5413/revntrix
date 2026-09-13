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
      <div className="group bg-white border border-[#DDD5BE] hover:border-[#0046FF] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl shadow-sm">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#ECE6D0]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F5F1DC] text-[#001BB7] border border-[#DDD5BE]">
              {design.id}
            </span>
            <span className="text-xs font-semibold text-[#4F5D75]">{niche?.name}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] text-[#16A34A] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            Interactive
          </span>
        </div>

        {/* Visual Mock / Abstract Preview Canvas */}
        <Link
          href={previewUrl}
          className="relative my-4 aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-[#0B1226] to-[#040814] border border-[#2A3756] overflow-hidden flex flex-col justify-between p-4 group-hover:border-[#0046FF] transition-colors"
        >
          {/* Top Bar Mock */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="text-[10px] text-[#F5F1DC]/60 font-mono tracking-wider">
              {design.id}.revntrix.live
            </div>
          </div>

          {/* Central Mock Content */}
          <div className="flex flex-col gap-1 text-center py-2 relative z-10">
            <span className="text-xs font-bold text-white group-hover:text-[#FF8040] transition-colors">
              {design.name}
            </span>
            <span className="text-[10px] text-[#F5F1DC]/70 line-clamp-1">
              {design.designDNA.visualDirection}
            </span>
          </div>

          {/* Bottom Interactive Prompt Overlay */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-white bg-[#0046FF] py-2 rounded-lg backdrop-blur-sm relative z-10 group-hover:bg-[#FF8040] transition-all">
            <Eye className="w-3.5 h-3.5" />
            <span>Launch Live Preview</span>
          </div>
        </Link>

        {/* Description & Key Strategy */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-[#0B1226]">{design.name}</h4>
          <p className="text-xs text-[#4F5D75] line-clamp-2 leading-relaxed">
            {design.description}
          </p>
          <div className="text-[11px] text-[#001BB7] bg-[#0046FF]/10 border border-[#0046FF]/20 px-2.5 py-1 rounded-md font-medium">
            🎯 {design.designDNA.conversionStrategy}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 border-t border-[#ECE6D0] grid grid-cols-2 gap-2">
          <Link
            href={previewUrl}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#DDD5BE] hover:bg-[#F5F1DC] hover:text-[#001BB7] text-xs font-bold text-[#0B1226] transition-colors min-h-[44px]"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0046FF] hover:bg-[#001BB7] text-xs font-bold text-white transition-all shadow-sm min-h-[44px]"
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
