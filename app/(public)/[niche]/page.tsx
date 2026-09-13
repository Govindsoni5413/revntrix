import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { DesignCard } from "@/components/public/DesignCard";
import { getNicheBySlug, getDesignsByNiche, NICHES, NicheId } from "@/lib/design-registry";

type NichePageProps = {
  params: Promise<{ niche: string }>;
  searchParams: Promise<{ businessName?: string; campaignCode?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ niche: string }> }) {
  const { niche: nicheSlug } = await params;
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) return { title: "Niche Not Found" };

  return {
    title: `${niche.name} Web Designs — 10 Curated Experiences | Revntrix`,
    description: `Explore 10 semi-functional website architectures for ${niche.name}. Choose ready-made or custom designs for WhatsApp handoff.`,
  };
}

export default async function NicheCatalogPage({ params, searchParams }: NichePageProps) {
  const { niche: nicheSlug } = await params;
  const { businessName, campaignCode } = await searchParams;

  const niche = getNicheBySlug(nicheSlug);
  if (!niche) {
    notFound();
  }

  const designs = getDesignsByNiche(niche.id as NicheId);

  return (
    <div className="min-h-screen bg-[#F5F1DC] text-[#0B1226] flex flex-col font-sans selection:bg-[#0046FF] selection:text-white">
      <Navbar activeNiche={niche.id} businessName={businessName} isPersonalized={!!businessName} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex flex-col gap-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#4F5D75]">
          <Link href="/" className="hover:text-[#001BB7] transition-colors flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 60 Designs</span>
          </Link>
          <span>/</span>
          <span className="text-[#001BB7] font-bold">{niche.name}</span>
        </div>

        {/* Niche Header Banner */}
        <div className="bg-white border border-[#DDD5BE] rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col gap-4 shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0046FF]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-[#0046FF]/10 border border-[#0046FF]/20 text-[#001BB7] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8040]" />
            <span>10 Distinct Architectural Experiences</span>
          </div>

          <div className="flex flex-col gap-2 max-w-3xl relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1226] tracking-tight">
              {niche.name} Web Designs
            </h1>
            <p className="text-sm sm:text-base text-[#4F5D75] leading-relaxed">
              Explore 10 bespoke, semi-functional website architectures engineered specifically for the{" "}
              <strong>{niche.name}</strong> industry. Every design features unique information architecture,
              domain-tailored copy, and high-conversion interaction flows.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#ECE6D0] text-xs font-semibold text-[#4F5D75] relative z-10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              10 Original Blueprints
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0046FF]" />
              Desktop & Mobile 390px Previews
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF8040]" />
              Direct WhatsApp Customization
            </span>
          </div>
        </div>

        {/* 10 Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              businessName={businessName}
              campaignId={campaignCode}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
