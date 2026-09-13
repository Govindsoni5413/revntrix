import React from "react";
import Link from "next/link";
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { GlowCursor } from "@/components/shared/GlowCursor";
import { CampaignBanner } from "@/components/public/CampaignBanner";
import { DesignCard } from "@/components/public/DesignCard";
import { resolveCampaignPresentation } from "@/lib/campaign-resolver";
import { getDesignsByNiche, NICHES, NicheId } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type CampaignPageProps = {
  params: Promise<{ campaignCode: string }>;
  searchParams: Promise<{ niche?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ campaignCode: string }> }) {
  const { campaignCode } = await params;
  return {
    title: `Curated Design Proposal (${campaignCode}) | Revntrix`,
    description: `Private curated website architecture preview for ${campaignCode}.`,
  };
}

export default async function CampaignOutreachPage({ params, searchParams }: CampaignPageProps) {
  const { campaignCode } = await params;
  const { niche: requestedNiche } = await searchParams;

  const validNicheId: NicheId =
    requestedNiche && (requestedNiche.toUpperCase() in NICHES)
      ? (requestedNiche.toUpperCase() as NicheId)
      : "INT";

  // Server-side resolution with isolated niche overrides (TRD §6)
  const presentation = await resolveCampaignPresentation(campaignCode, validNicheId);
  const designs = getDesignsByNiche(validNicheId);
  const activeNicheMeta = NICHES[validNicheId];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const directWhatsAppUrl = buildWhatsAppUrl(
    whatsappNumber,
    `Hello Revntrix Team! I am reviewing the curated designs for ${presentation.businessName} (Ref: ${campaignCode}) and would like to discuss next steps.`
  );

  return (
    <div className="min-h-screen bg-[#E3F2FD] text-[#0A2E6B] flex flex-col font-sans relative">
      <GlowCursor primaryColor="#2196F3" accentColor="#90CAF9" secondaryColor="#0D47A1" />
      <Navbar
        activeNiche={validNicheId}
        businessName={presentation.businessName}
        isPersonalized={presentation.isPersonalized}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex flex-col gap-10">
        {/* Honest Personalized Outreach Banner */}
        <CampaignBanner
          prospectName={presentation.prospectName}
          businessName={presentation.businessName}
          nicheId={validNicheId}
          campaignCode={campaignCode}
        />

        {/* Niche Indicator Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#90CAF9]">
          <div>
            <span className="text-xs font-bold text-[#2196F3] uppercase tracking-wider">
              Niche Architecture Showcase
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D47A1]">
              10 Directions Curated for {activeNicheMeta?.name}
            </h3>
          </div>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2196F3] hover:bg-[#0D47A1] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md self-start sm:self-auto min-h-[44px]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Discuss This Proposal</span>
          </a>
        </div>

        {/* 10 Curated Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              businessName={presentation.businessName}
              campaignId={campaignCode}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
