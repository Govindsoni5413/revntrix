import React from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { NicheId, NICHES } from "@/lib/design-registry";

type CampaignBannerProps = {
  prospectName: string;
  businessName: string;
  nicheId: NicheId;
  campaignCode: string;
};

export function CampaignBanner({
  prospectName,
  businessName,
  nicheId,
  campaignCode,
}: CampaignBannerProps) {
  const niche = NICHES[nicheId];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1408] via-[#1D1D1D] to-[#141414] border border-[#D4A72C]/40 p-6 md:p-8 shadow-2xl mb-8">
      {/* Background Gold Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A72C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/40 text-[#D4A72C] text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Design Proposal</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F7F7F5] leading-tight">
            Curated Web Directions for{" "}
            <span className="text-gradient-gold">{businessName || prospectName}</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7A7A0] leading-relaxed">
            I’ve prepared 10 semi-functional design directions for {businessName || prospectName} in the{" "}
            <strong className="text-[#F7F7F5]">{niche?.name}</strong> industry. Pick the architecture
            that resonates most, and our team will build and customize it completely on WhatsApp.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-[#A7A7A0] pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
              100% Tailored to your brand
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
              WhatsApp Direct Handoff
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2 bg-[#0E0E0E] border border-[#262626] p-4 rounded-xl text-center md:min-w-[200px]">
          <span className="text-[10px] uppercase tracking-wider text-[#A7A7A0] font-semibold">
            Campaign Reference
          </span>
          <span className="text-sm font-mono font-bold text-[#D4A72C]">{campaignCode}</span>
          <span className="text-[11px] text-[#666]">Active Direct Link</span>
        </div>
      </div>
    </div>
  );
}
