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
  Grid,
  FileEdit,
  Building2,
  Compass,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { NicheCard } from "@/components/public/NicheCard";
import { DesignCard } from "@/components/public/DesignCard";
import { CustomOnboardingModal } from "@/components/shared/CustomOnboardingModal";
import { AuthPromptModal } from "@/components/shared/AuthPromptModal";
import { NICHES, designRegistry, NicheId } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const [selectedNiche, setSelectedNiche] = useState<NicheId>("INT");
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hello Revntrix Team! I am exploring your 60-design showcase and would like to discuss a project."
  );

  const filteredDesigns = designRegistry.filter((d) => d.nicheId === selectedNiche);

  const nicheHighlights: Record<NicheId, string> = {
    INT: "Editorial luxury, style discovery quizzes, 3D before/after sliders, and residential portfolios.",
    CLN: "Specialist authority, digital clinic workflows, smile transformations, and instant booking flows.",
    EST: "Cinematic sky mansion editorials, search discovery engines, and pre-leased yield calculators.",
    JW: "Royal Jadau polki showcases, 4C diamond consultation tools, and DTC everyday fine jewelry.",
    RES: "Immersive tasting degustations, dietary-filtered dynamic menus, and instant WhatsApp table reservations.",
    ECO: "High-performance D2C checkout drawers, shoppable lookbook hotspots, and subscription builders.",
  };

  const handleNicheSelect = (nicheId: NicheId) => {
    setSelectedNiche(nicheId);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative antialiased">
      <Navbar />

      {/* Main Content Area */}
      <main className="w-full bg-white pt-16">
        <div className="flex flex-col w-full">
          {/* Atmospheric Glow & Aurora Micro-Layer */}
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-white">
            {/* Background Multi-Layer Fluid Ambient Glows */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[880px] sm:w-[940px] h-[480px] sm:h-[520px] bg-gradient-to-r from-sky-200/40 via-blue-100/30 to-indigo-100/40 rounded-full blur-[120px] animate-aurora" />
            <div className="pointer-events-none absolute top-72 left-1/4 w-[360px] sm:w-[380px] h-[360px] sm:h-[380px] bg-cyan-100/30 rounded-full blur-[90px] animate-float" />

            {/* Hero Section */}
            <section className="relative max-w-[1320px] mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-8 sm:pb-12 flex flex-col items-center text-center overflow-hidden">
              {/* Super-badge pill */}
              <div
                className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 shadow-xs mb-4 sm:mb-6 animate-float reveal-item"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(224, 242, 254, 0.5) 100%)",
                  backdropFilter: "blur(16px)",
                  boxShadow:
                    "rgba(255, 255, 255, 0.9) 0px 1px 2px inset, rgba(2, 132, 199, 0.08) 0px 4px 20px",
                  border: "1px solid rgba(186, 230, 253, 0.8)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600" />
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold text-sky-800">
                  60 Interactive Blueprints • 6 Industry Niches
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="relative z-10 text-[32px] sm:text-[48px] md:text-[56px] text-slate-900 max-w-4xl tracking-tight leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-4 font-extrabold reveal-item stagger-1">
                Curated Web Architectures.{" "}
                <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  Engineered for High-Stakes
                </span>{" "}
                Conversion.
              </h1>

              {/* Subhead */}
              <p className="relative z-10 text-[14px] sm:text-[17px] text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-1 reveal-item stagger-2 font-normal">
                Stop starting websites from zero. Explore 60 fully interactive design blueprints across 6 key industries. Pick a ready direction or commission a tailored custom architecture directly over WhatsApp.
              </p>

              {/* Action Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto justify-center max-w-md reveal-item stagger-3">
                <a
                  href="#showcase"
                  className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 py-3 rounded-2xl text-white text-[15px] font-semibold transition-all duration-300 active:scale-[0.97] hover:brightness-105 hover:-translate-y-0.5 w-full sm:w-auto shimmer-trigger shadow-lg shadow-sky-600/25 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgb(2, 132, 199) 0%, rgb(14, 165, 233) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.45)",
                  }}
                >
                  <Grid className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                  <span className="tracking-tight">Explore All 60 Designs</span>
                </a>

                <button
                  type="button"
                  onClick={() => setCustomModalOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 py-3 rounded-2xl text-slate-900 text-[15px] font-semibold transition-all duration-300 active:scale-[0.97] hover:bg-white/95 hover:-translate-y-0.5 w-full sm:w-auto touch-interactive shadow-md cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.85) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    boxShadow:
                      "rgba(15, 23, 42, 0.08) 0px 14px 28px -6px, rgba(15, 23, 42, 0.04) 0px 4px 10px -2px, rgba(255, 255, 255, 0.95) 0px 2px 2px inset",
                  }}
                >
                  <FileEdit className="w-4 h-4 text-sky-600 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="tracking-tight text-slate-800">Custom design&apos;s</span>
                </button>
              </div>

              {/* 3 Value Props Bar */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 w-full mt-2 text-left reveal-item stagger-4">
                {/* Prop 1 */}
                <div
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(2,132,199,0.18)] hover:-translate-y-1 hover:border-sky-300 transition-all duration-300 touch-interactive shimmer-trigger"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.7) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-xs flex-shrink-0 animate-float-icon">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] sm:text-[16px] text-slate-900 font-bold">
                      100% Authored Reality
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed pl-0.5">
                    Zero placeholder fiction. Realistic menus, dynamic booking systems & curated portfolios.
                  </p>
                </div>

                {/* Prop 2 */}
                <div
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(37,99,235,0.18)] hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 touch-interactive shimmer-trigger"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(238, 242, 255, 0.7) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div
                      className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs flex-shrink-0 animate-float-icon"
                      style={{ animationDelay: "-1.2s" }}
                    >
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] sm:text-[16px] text-slate-900 font-bold">
                      Mobile-First Precision
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed pl-0.5">
                    Standardized 44px touch targets & fluid iOS-grade responsive interactions.
                  </p>
                </div>

                {/* Prop 3 */}
                <div
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(16,185,129,0.18)] hover:-translate-y-1 hover:border-emerald-300 transition-all duration-300 touch-interactive shimmer-trigger"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(236, 253, 245, 0.7) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div
                      className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs flex-shrink-0 animate-float-icon"
                      style={{ animationDelay: "-2.4s" }}
                    >
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] sm:text-[16px] text-slate-900 font-bold">
                      WhatsApp Tri-Handoff
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed pl-0.5">
                    Automatic WhatsApp launch with pre-filled scope brief & fail-safe copy buffer.
                  </p>
                </div>
              </div>
            </section>

            {/* 6 Industry Niches Hub */}
            <section className="max-w-[1320px] mx-auto px-4 sm:px-8 py-8 sm:py-16" id="niches">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3">
                <div>
                  <span className="text-[11px] text-sky-600 uppercase tracking-widest block mb-1 font-bold">
                    Tailored Industry Niches
                  </span>
                  <h2 className="text-[24px] sm:text-[36px] text-slate-900 font-extrabold tracking-tight leading-tight">
                    Explore 6 Deeply Researched Domains
                  </h2>
                </div>
                <p className="text-[13px] sm:text-[14px] text-slate-600 max-w-md leading-relaxed">
                  Each niche contains 10 distinct, non-duplicated visual layouts, custom flows, and sector-specific conversion mechanisms.
                </p>
              </div>

              {/* 6 Niches Grid (1 col mobile, 2 col md, 3 col lg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.values(NICHES).map((niche) => (
                  <NicheCard
                    key={niche.id}
                    id={niche.id}
                    name={niche.name}
                    slug={niche.slug}
                    count={10}
                    highlightConcept={nicheHighlights[niche.id]}
                    onSelect={handleNicheSelect}
                  />
                ))}
              </div>
            </section>

            {/* Master Showcase Explorer */}
            <section className="max-w-[1320px] mx-auto px-4 sm:px-8 py-8 sm:py-16" id="showcase">
              <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
                <span className="text-[11px] text-sky-600 uppercase tracking-widest block mb-1 font-bold">
                  Master Showcase Explorer
                </span>
                <h2 className="text-[24px] sm:text-[36px] text-slate-900 mb-4 sm:mb-6 font-extrabold tracking-tight leading-tight">
                  Interactive Design Blueprints
                </h2>

                {/* Interactive Filter Pills Dock (Horizontal scroll on mobile, wrap on desktop) */}
                <div className="w-full overflow-x-auto pb-2 scrollbar-none flex">
                  <div
                    className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner w-max mx-auto"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.75) 100%)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {Object.values(NICHES).map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => setSelectedNiche(n.id)}
                        className={`h-11 px-4 rounded-xl text-[11px] sm:text-[12px] uppercase transition-all duration-300 font-semibold whitespace-nowrap active:scale-95 touch-interactive cursor-pointer ${
                          selectedNiche === n.id
                            ? "bg-sky-600 text-white shadow-sm shadow-sky-600/30"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                        }`}
                        style={
                          selectedNiche === n.id
                            ? {
                                boxShadow:
                                  "rgba(2, 132, 199, 0.4) 0px 6px 14px -2px, rgba(255, 255, 255, 0.5) 0px 1.5px 2px inset, rgba(2, 70, 125, 0.4) 0px -2px 3px inset",
                              }
                            : undefined
                        }
                      >
                        {n.name} (10)
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Cards Grid (1 col mobile, 2 col md, 3 col lg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredDesigns.map((design) => (
                  <DesignCard key={design.id} design={design} />
                ))}
              </div>
            </section>

            {/* Bespoke Architecture Call-to-Action Banner */}
            <section className="max-w-[1320px] mx-auto px-4 sm:px-8 my-8 sm:my-16" id="guarantees">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-14 text-center flex flex-col items-center justify-center shadow-2xl border border-slate-800 transition-all duration-300 hover:border-sky-500/50">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent animate-aurora" />

                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center mb-3 text-sky-400 shadow-inner animate-float">
                  <Compass className="w-6 h-6" />
                </div>

                <h2 className="text-[22px] sm:text-[34px] text-white max-w-3xl mb-2 font-extrabold tracking-tight leading-tight relative z-10">
                  Need a Bespoke Architecture Tailored to Your Exact Scope?
                </h2>

                <p className="text-[14px] sm:text-[16px] text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed relative z-10 font-normal">
                  Our 5-step qualification questionnaire structures your goals, audience, and features into a complete architectural brief, ready to execute on WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center max-w-sm sm:max-w-none relative z-10">
                  <button
                    type="button"
                    onClick={() => setCustomModalOpen(true)}
                    className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-6 rounded-xl bg-sky-500 text-white text-[14px] sm:text-[15px] hover:bg-sky-400 transition-all font-semibold shadow-lg shadow-sky-500/25 active:scale-95 shimmer-trigger cursor-pointer"
                  >
                    <span>Launch 5-Step Custom Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-[14px] sm:text-[15px] transition-all shadow-md active:scale-95 touch-interactive"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="font-medium">Direct WhatsApp Discussion</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

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
