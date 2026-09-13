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
    <div className="min-h-screen bg-[#080808] text-[#F7F7F5] flex flex-col font-sans">
      <Navbar activeNiche={niche.id} businessName={businessName} isPersonalized={!!businessName} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex flex-col gap-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#A7A7A0]">
          <Link href="/" className="hover:text-[#F7F7F5] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 60 Designs</span>
          </Link>
          <span>/</span>
          <span className="text-[#D4A72C] font-semibold">{niche.name}</span>
        </div>

        {/* Niche Header Banner */}
        <div className="bg-[#121212] border border-[#262626] rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col gap-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A72C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#D4A72C]/30 text-[#D4A72C] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>10 Distinct Architectural Experiences</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F7F5] tracking-tight">
            {niche.name} Website Architectures
          </h1>

          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-2xl leading-relaxed">
            Every design below represents a unique visual direction, conversion funnel, and interaction strategy crafted specifically for {niche.name.toLowerCase()} businesses.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#A7A7A0] pt-2 border-t border-[#1F1F1F]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              No-Op Zero Tolerance: Working interactive widgets
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              Mobile-First Engineered
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
