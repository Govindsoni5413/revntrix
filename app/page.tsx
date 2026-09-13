"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#080808] text-[#F7F7F5] flex flex-col font-sans selection:bg-[#D4A72C] selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[#1E1E1E]">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-br from-[#D4A72C]/10 via-[#F3C64E]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161616] border border-[#D4A72C]/40 text-[#D4A72C] text-xs font-semibold shadow-[0_0_20px_rgba(212,167,44,0.15)]">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>60 Semi-Functional Design Blueprints • 6 Niches</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F7F7F5] leading-[1.12]">
            Curated Web Design Architectures.{" "}
            <span className="text-gradient-gold">Engineered for High-Stakes Conversion.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#A7A7A0] max-w-2xl font-normal leading-relaxed">
            Stop starting websites from zero. Explore 60 fully interactive design blueprints across 6 key industries. Pick a ready direction or commission a tailored custom architecture directly over WhatsApp.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F3C64E] via-[#D4A72C] to-[#8F6415] text-black text-sm font-bold shadow-[0_0_30px_rgba(212,167,44,0.25)] hover:brightness-110 active:scale-95 transition-all min-h-[48px]"
            >
              <span>Explore All 60 Designs</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setCustomModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1D1D1D] hover:bg-[#262626] border border-[#343434] text-sm font-semibold text-[#F7F7F5] transition-all min-h-[48px]"
            >
              <Wand2 className="w-4 h-4 text-[#D4A72C]" />
              <span>Custom Architecture Brief</span>
            </button>
          </div>

          {/* Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-xs text-[#A7A7A0]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              100% Interactive Demos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              WhatsApp Direct Sales
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              Mobile-First Performance
            </span>
          </div>
        </div>
      </section>

      {/* 6 Industry Niches Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-widest">
              Industry Focus
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">
              6 Tailored Industry Niches
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-md">
            Every industry has distinct trust markers and conversion psychology. Each niche includes exactly 10 distinct design experiences.
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

      {/* Full 60 Designs Showcase Matrix */}
      <section id="catalog" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#1E1E1E]">
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-widest">
                Interactive Catalog
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">
                The 60 Design Masterpieces
              </h2>
            </div>
            <span className="text-xs text-[#A7A7A0] font-mono">
              Showing {filteredDesigns.length} of 60 Registered Blueprints
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121212] p-1.5 rounded-2xl border border-[#262626]">
            <button
              type="button"
              onClick={() => setSelectedNiche("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] ${
                selectedNiche === "ALL"
                  ? "bg-[#D4A72C] text-black shadow-lg"
                  : "text-[#A7A7A0] hover:text-[#F7F7F5]"
              }`}
            >
              All 60 Designs
            </button>
            {Object.values(NICHES).map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNiche(n.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] ${
                  selectedNiche === n.id
                    ? "bg-[#D4A72C] text-black shadow-lg"
                    : "text-[#A7A7A0] hover:text-[#F7F7F5]"
                }`}
              >
                {n.name} (10)
              </button>
            ))}
          </div>
        </div>

        {/* 60 Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </section>

      {/* How It Works & Trust Guarantee Section */}
      <section className="py-16 md:py-24 bg-[#0D0D0D] border-t border-[#1E1E1E] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-widest">
              Simple 3-Step Engagement
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5]">
              From Concept Blueprint to Live Deployment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl font-bold font-serif text-[#D4A72C]">01</span>
              <h4 className="text-base font-bold text-[#F7F7F5]">Explore & Select</h4>
              <p className="text-xs text-[#A7A7A0] leading-relaxed">
                Browse all 60 semi-functional experiences on desktop and mobile viewports. Pick the interaction architecture that fits your brand.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl font-bold font-serif text-[#D4A72C]">02</span>
              <h4 className="text-base font-bold text-[#F7F7F5]">Ready-Made or Custom</h4>
              <p className="text-xs text-[#A7A7A0] leading-relaxed">
                Choose the exact blueprint for quick turnkey customization, or submit a 5-step Custom Architecture brief with our AI-assisted form.
              </p>
            </div>

            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl font-bold font-serif text-[#D4A72C]">03</span>
              <h4 className="text-base font-bold text-[#F7F7F5]">Direct WhatsApp Handoff</h4>
              <p className="text-xs text-[#A7A7A0] leading-relaxed">
                Connect directly with our design leads on WhatsApp with pre-formatted specs, email fallbacks, and guaranteed rapid turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1D1708] via-[#1A1A1A] to-[#121212] border border-[#D4A72C]/40 p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F7F7F5] max-w-xl leading-tight">
            Ready to Build a High-Conversion Website?
          </h2>

          <p className="text-xs sm:text-sm text-[#A7A7A0] max-w-md">
            Our team turns selected blueprints into fully functioning, high-performance websites customized for your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-black text-sm font-bold hover:brightness-110 shadow-lg min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat with Design Director on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Non-intrusive 90-second Google Auth Prompt */}
      <AuthPromptModal />

      {/* Custom Qualification Modal */}
      <CustomOnboardingModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />
    </div>
  );
}
