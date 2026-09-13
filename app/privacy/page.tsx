import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Trash2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { GlowCursor } from "@/components/shared/GlowCursor";

export const metadata = {
  title: "Privacy Policy & Data Protection | Revntrix",
  description: "Plain-language data protection, consent, and retention policies at Revntrix.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F1DC] text-[#0B1226] flex flex-col font-sans selection:bg-[#0046FF] selection:text-white relative">
      <GlowCursor primaryColor="#0046FF" accentColor="#FF8040" secondaryColor="#001BB7" />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex flex-col gap-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F5D75] hover:text-[#001BB7]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Showcase</span>
        </Link>

        <div className="flex flex-col gap-3 border-b border-[#DDD5BE] pb-6">
          <span className="text-xs font-mono text-[#001BB7] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            Plain Language Data Protection
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1226]">
            Privacy Policy & Consent Framework
          </h1>
          <p className="text-xs sm:text-sm text-[#4F5D75]">
            Last updated: September 2026 • Revntrix Agency Platform
          </p>
        </div>

        <div className="flex flex-col gap-8 text-xs sm:text-sm text-[#4F5D75] leading-relaxed bg-white border border-[#DDD5BE] rounded-3xl p-6 sm:p-10 shadow-sm">
          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1226]">1. Data Collection & Purpose</h2>
            <p>
              Revntrix collects only the information necessary to facilitate website design consultations, including business name, selected design architecture, and voluntary contact details submitted through our lead forms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1226]">2. Explicit Consent Checkpoint</h2>
            <p>
              In strict accordance with PRD-03 §11, lead details are never recorded without an explicit checkbox agreement from the visitor. We store the timestamp of consent (<code className="text-[#001BB7] font-bold">consent_at</code>) alongside submitted inquiries.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1226]">3. Automated 30-Day Analytics Purge</h2>
            <p>
              Website interaction telemetry (e.g. design view counts, clicks) is strictly aggregated and isolated from personal lead data. All raw telemetry records older than 30 days are permanently purged by our daily automated maintenance workflow.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1226]">4. No Third-Party Data Selling</h2>
            <p>
              Your contact details are used exclusively for Revntrix agency communications. We never sell, lease, or share client inquiries with third-party advertising networks.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B1226]">5. Contact & Data Deletion</h2>
            <p>
              To request immediate deletion of your inquiry data, email us directly at <a href="mailto:revntrix@gmail.com" className="text-[#0046FF] font-semibold underline">revntrix@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
