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
    <div className="min-h-screen bg-[#F5F1DC] text-[#0B1226] flex flex-col font-sans relative">
      <GlowCursor primaryColor="#0046FF" accentColor="#FF8040" secondaryColor="#001BB7" />
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

        {/* Niche Navigation / Isolation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-widest">
              Curated Category
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F7F7F5] mt-1">
              10 Design Directions for {activeNicheMeta.name}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {Object.values(NICHES).map((n) => (
              <Link
                key={n.id}
                href={`/r/${campaignCode}?niche=${n.id.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center ${
                  validNicheId === n.id
                    ? "bg-[#D4A72C] text-black shadow"
                    : "bg-[#141414] border border-[#2B2B2B] text-[#888] hover:text-white"
                }`}
              >
                {n.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 10 Curated Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              businessName={presentation.businessName}
              campaignId={presentation.campaignId}
            />
          ))}
        </div>

        {/* Floating Quick Action CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#1A1408] via-[#1D1D1D] to-[#141414] border border-[#D4A72C]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#F7F7F5]">
              Ready to Discuss a Direction for {presentation.businessName}?
            </h3>
            <p className="text-xs text-[#A7A7A0]">
              Our design lead is ready on WhatsApp with instant wireframing and timeline estimation.
            </p>
          </div>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-black text-xs font-bold hover:brightness-110 shadow-lg min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
