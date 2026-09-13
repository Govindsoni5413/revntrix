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
import { GlowCursor } from "@/components/shared/GlowCursor";
import { NicheCard } from "@/components/public/NicheCard";
import { DesignCard } from "@/components/public/DesignCard";
import { CustomOnboardingModal } from "@/components/shared/CustomOnboardingModal";
import { AuthPromptModal } from "@/components/shared/AuthPromptModal";
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
    <div className="min-h-screen bg-[#E3F2FD] text-[#0A2E6B] flex flex-col font-sans selection:bg-[#2196F3] selection:text-white relative">
      <GlowCursor primaryColor="#2196F3" accentColor="#90CAF9" secondaryColor="#0D47A1" />
      <Navbar />

      {/* Hero Section with iPhone Liquid Glass Architecture */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#90CAF9]/40">
        {/* Background Multi-Layer Fluid Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[550px] bg-gradient-to-tr from-[#2196F3]/25 via-[#90CAF9]/35 to-[#E3F2FD] rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-[#2196F3]/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[420px] h-[420px] bg-[#90CAF9]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          {/* iPhone Dynamic Liquid Pill Badge */}
          <div className="liquid-pill inline-flex items-center gap-2.5 px-5 py-2 text-[#0D47A1] text-xs font-bold transition-all hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-[#2196F3] animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#2196F3] fill-current" />
            <span>60 Interactive Blueprints • 6 Industry Niches</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0D47A1] leading-[1.12]">
            Curated Web Architectures.{" "}
            <span className="text-[#2196F3]">Engineered for High-Stakes Conversion.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#3A608F] max-w-2xl font-normal leading-relaxed">
            Stop starting websites from zero. Explore 60 fully interactive design blueprints across 6 key industries. Pick a ready direction or commission a tailored custom architecture directly over WhatsApp.
          </p>

          {/* Liquid Glass Capsule Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#catalog"
              className="liquid-button-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white text-sm font-bold min-h-[48px]"
            >
              <span>Explore All 60 Designs</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setCustomModalOpen(true)}
              className="liquid-button-secondary inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold text-[#0D47A1] min-h-[48px]"
            >
              <Wand2 className="w-4 h-4 text-[#2196F3]" />
              <span>Custom Architecture Brief</span>
            </button>
          </div>

          {/* iPhone Liquid Glass Stat Island / Feature Cards */}
          <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="liquid-glass-card p-5 text-left flex flex-col gap-1.5 relative overflow-hidden group">
              {/* Gloss shine reflection line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1]">
                <div className="w-7 h-7 rounded-full bg-white/90 border border-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                </div>
                <span>100% Authored Reality</span>
              </div>
              <p className="text-[11px] text-[#3A608F] leading-relaxed pl-1">
                Zero placeholder fiction. Realistic menus, dynamic booking systems & curated portfolios.
              </p>
            </div>

            <div className="liquid-glass-card p-5 text-left flex flex-col gap-1.5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1]">
                <div className="w-7 h-7 rounded-full bg-white/90 border border-white flex items-center justify-center shadow-xs">
                  <Zap className="w-4 h-4 text-[#2196F3]" />
                </div>
                <span>Mobile-First Precision</span>
              </div>
              <p className="text-[11px] text-[#3A608F] leading-relaxed pl-1">
                Standardized 44px touch targets & fluid iOS-grade responsive interactions.
              </p>
            </div>

            <div className="liquid-glass-card p-5 text-left flex flex-col gap-1.5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1]">
                <div className="w-7 h-7 rounded-full bg-white/90 border border-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#0D47A1]" />
                </div>
                <span>WhatsApp Tri-Handoff</span>
              </div>
              <p className="text-[11px] text-[#3A608F] leading-relaxed pl-1">
                Automatic WhatsApp launch with pre-filled scope brief & fail-safe copy buffer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Niches Overview Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#2196F3] uppercase tracking-wider">
              Tailored Industry Niches
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D47A1] mt-1">
              Explore 6 Deeply Researched Domains
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#3A608F] max-w-md leading-relaxed">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#90CAF9]/40">
          <div>
            <span className="text-xs font-bold text-[#2196F3] uppercase tracking-wider">
              Master Showcase Explorer
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D47A1] mt-1">
              Interactive Design Blueprints ({filteredDesigns.length})
            </h2>
          </div>

          {/* iPhone Liquid Glass Filter Dock */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/40 backdrop-blur-xl border border-white/80 shadow-sm">
            <button
              type="button"
              onClick={() => setSelectedNiche("ALL")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] ${
                selectedNiche === "ALL"
                  ? "bg-[#0D47A1] text-white shadow-md shadow-[#0D47A1]/20 scale-105"
                  : "text-[#3A608F] hover:bg-white/80 hover:text-[#0D47A1]"
              }`}
            >
              All (60)
            </button>
            {Object.values(NICHES).map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNiche(n.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] ${
                  selectedNiche === n.id
                    ? "bg-[#0D47A1] text-white shadow-md shadow-[#0D47A1]/20 scale-105"
                    : "text-[#3A608F] hover:bg-white/80 hover:text-[#0D47A1]"
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

      {/* Conversion Callout Banner — iPhone Liquid Island Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="glass-card-deep text-white p-8 sm:p-14 relative overflow-hidden text-center flex flex-col items-center gap-6">
          {/* Internal Ambient Light Refraction */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#2196F3]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#90CAF9]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-xl border border-white/40 flex items-center justify-center text-[#90CAF9] shadow-lg relative z-10">
            <Layers className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10 max-w-2xl">
            Need a Bespoke Architecture Tailored to Your Exact Scope?
          </h2>

          <p className="text-xs sm:text-sm text-[#E3F2FD]/85 max-w-xl leading-relaxed relative z-10">
            Our 5-step qualification questionnaire structures your goals, audience, and features into a complete architectural brief, ready to execute on WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <button
              type="button"
              onClick={() => setCustomModalOpen(true)}
              className="px-8 py-4 rounded-full bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold text-xs uppercase tracking-wider transition-all shadow-xl min-h-[48px] hover:scale-105"
            >
              Launch 5-Step Custom Brief
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white font-bold text-xs uppercase tracking-wider transition-all min-h-[48px] flex items-center gap-2 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-current text-[#90CAF9]" />
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
