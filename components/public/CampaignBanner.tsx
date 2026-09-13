import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-3xl bg-white border border-[#90CAF9] p-6 md:p-8 shadow-xl mb-8">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#2196F3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-[#2196F3]" />
            <span>Personalized Design Proposal</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0D47A1] leading-tight">
            Curated Web Directions for{" "}
            <span className="text-[#2196F3]">{businessName || prospectName}</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#3A608F] leading-relaxed font-normal">
            I’ve prepared 10 semi-functional design directions for {businessName || prospectName} in the{" "}
            <strong className="text-[#0D47A1]">{niche?.name}</strong> industry. Pick the architecture
            that resonates most, and our team will build and customize it completely on WhatsApp.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#3A608F] pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              100% Tailored to your brand
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2196F3]" />
              WhatsApp Direct Handoff
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2 bg-[#E3F2FD] border border-[#90CAF9] p-5 rounded-2xl text-center md:min-w-[200px]">
          <span className="text-[10px] uppercase tracking-wider text-[#3A608F] font-bold">
            Campaign Reference
          </span>
          <span className="text-sm font-mono font-bold text-[#0D47A1]">{campaignCode}</span>
          <span className="text-[11px] text-[#3A608F]">Active Direct Link</span>
        </div>
      </div>
    </div>
  );
}
