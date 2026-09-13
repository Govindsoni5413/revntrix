"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Layers,
  Wand2,
  ChevronDown,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/shared/Button";
import { NicheCard } from "@/components/public/NicheCard";
import { DesignCard } from "@/components/public/DesignCard";
import { CustomOnboardingModal } from "@/components/shared/CustomOnboardingModal";
import { AuthPromptModal } from "@/components/shared/AuthPromptModal";
import { GlowCursor } from "@/components/shared/GlowCursor";
import { NICHES, designRegistry, NicheId } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const [selectedNiche, setSelectedNiche] = useState<NicheId | "ALL">("ALL");
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hello Revntrix Team! I am exploring your 60-design showcase and would like to discuss a project."
  );

  const filteredDesigns =
    selectedNiche === "ALL"
      ? designRegistry
      : designRegistry.filter((d) => d.nicheId === selectedNiche);

  const nicheHighlights: Record<NicheId, string> = {
    INT: "Editorial luxury, style discovery quizzes, 3D before/after sliders, and residential portfolios.",
    CLN: "Specialist authority, digital clinic workflows, smile transformations, and instant booking flows.",
    EST: "Cinematic sky mansion editorials, search discovery engines, and pre-leased yield calculators.",
    JW: "Royal Jadau polki showcases, 4C diamond consultation tools, and DTC everyday fine jewelry.",
    RES: "Immersive tasting degustations, dietary-filtered dynamic menus, and instant WhatsApp table reservations.",
    ECO: "High-performance D2C checkout drawers, shoppable lookbook hotspots, and subscription builders.",
  };

  return (
    <div className="min-h-screen bg-[#F5F1DC] text-[#0B1226] flex flex-col font-sans selection:bg-[#0046FF] selection:text-white relative">
      <GlowCursor primaryColor="#0046FF" accentColor="#FF8040" secondaryColor="#001BB7" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#DDD5BE]">
        {/* Background Ambient Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-br from-[#0046FF]/10 via-[#FF8040]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DDD5BE] text-[#001BB7] text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8040] fill-current" />
            <span>60 Semi-Functional Design Blueprints • 6 Niches</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0B1226] leading-[1.12]">
            Curated Web Architectures.{" "}
            <span className="text-[#0046FF]">Engineered for High-Stakes Conversion.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#4F5D75] max-w-2xl font-normal leading-relaxed">
            Stop starting websites from zero. Explore 60 fully interactive design blueprints across 6 key industries. Pick a ready direction or commission a tailored custom architecture directly over WhatsApp.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0046FF] text-white text-sm font-bold shadow-lg shadow-[#0046FF]/25 hover:bg-[#001BB7] active:scale-95 transition-all min-h-[48px]"
            >
              <span>Explore All 60 Designs</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setCustomModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#ECE6D0] border border-[#DDD5BE] text-sm font-bold text-[#0B1226] transition-all min-h-[48px] shadow-sm"
            >
              <Wand2 className="w-4 h-4 text-[#FF8040]" />
              <span>Custom Architecture Brief</span>
            </button>
          </div>

          {/* Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-semibold text-[#4F5D75]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              100% Authored Reality (No Lorem Ipsum)
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF8040]" />
              44px Mobile Touch Targets
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0046FF]" />
              WhatsApp Native Tri-Handoff
            </span>
          </div>
        </div>
      </section>

      {/* 6 Niches Overview Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#0046FF] uppercase tracking-wider">
              Tailored Industry Niches
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1226] mt-1">
              Explore 6 Deeply Researched Domains
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4F5D75] max-w-md leading-relaxed">
            Each niche contains 10 distinct, non-duplicated visual layouts, custom flows, and sector-specific conversion mechanisms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(NICHES).map((niche) => (
            <NicheCard
              key={niche.id}
              id={niche.id}
              name={niche.name}
              slug={niche.slug}
              count={10}
              highlightConcept={nicheHighlights[niche.id]}
            />
          ))}
        </div>
      </section>

      {/* 60 Designs Master Catalog Explorer */}
      <section id="catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#DDD5BE]">
          <div>
            <span className="text-xs font-bold text-[#0046FF] uppercase tracking-wider">
              Master Showcase Explorer
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1226] mt-1">
              Interactive Design Blueprints ({filteredDesigns.length})
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedNiche("ALL")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                selectedNiche === "ALL"
                  ? "bg-[#001BB7] text-white shadow-sm"
                  : "bg-white text-[#4F5D75] border border-[#DDD5BE] hover:bg-[#ECE6D0] hover:text-[#0B1226]"
              }`}
            >
              All Niches (60)
            </button>
            {Object.values(NICHES).map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNiche(n.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                  selectedNiche === n.id
                    ? "bg-[#001BB7] text-white shadow-sm"
                    : "bg-white text-[#4F5D75] border border-[#DDD5BE] hover:bg-[#ECE6D0] hover:text-[#0B1226]"
                }`}
              >
                {n.name} (10)
              </button>
            ))}
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </section>

      {/* Honest Conversion Callout Banner */}
      <section className="bg-[#001BB7] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FF8040]">
            <Layers className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Need a Bespoke Architecture Tailored to Your Exact Scope?
          </h2>

          <p className="text-xs sm:text-sm text-[#F5F1DC]/80 max-w-xl leading-relaxed">
            Our 5-step qualification questionnaire structures your goals, audience, and features into a complete architectural brief, ready to execute on WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setCustomModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#FF8040] hover:bg-[#E56725] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FF8040]/30 min-h-[48px]"
            >
              Launch 5-Step Custom Brief
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all min-h-[48px] flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current text-[#FF8040]" />
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom Onboarding 5-step Modal */}
      <CustomOnboardingModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />

      {/* Non-intrusive 90s Auth Prompt Modal */}
      <AuthPromptModal />
    </div>
  );
}
