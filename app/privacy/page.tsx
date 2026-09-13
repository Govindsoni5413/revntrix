import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Trash2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata = {
  title: "Privacy Policy & Data Protection | Revntrix",
  description: "Plain-language data protection, consent, and retention policies at Revntrix.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F7F7F5] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex flex-col gap-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#A7A7A0] hover:text-[#D4A72C]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Showcase</span>
        </Link>

        <div className="flex flex-col gap-3 border-b border-[#222] pb-6">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            Plain Language Data Protection
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#F7F7F5]">
            Privacy Policy & Consent Framework
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A0]">
            Last updated: September 2026 • Revntrix Agency Platform
          </p>
        </div>

        <div className="flex flex-col gap-8 text-xs sm:text-sm text-[#A7A7A0] leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F7F7F5]">1. Data Collection & Purpose</h2>
            <p>
              Revntrix collects only the information necessary to facilitate website design consultations, including business name, selected design architecture, and voluntary contact details submitted through our lead forms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F7F7F5]">2. Explicit Consent Checkpoint</h2>
            <p>
              In strict accordance with PRD-03 §11, lead details are never recorded without an explicit checkbox agreement from the visitor. We store the timestamp of consent (<code className="text-[#D4A72C]">consent_at</code>) alongside submitted inquiries.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F7F7F5]">3. Automated 30-Day Analytics Purge</h2>
            <p>
              Website interaction telemetry (e.g. design view counts, clicks) is strictly aggregated and isolated from personal lead data. All raw telemetry records older than 30 days are permanently purged by our daily automated maintenance workflow.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F7F7F5]">4. No Third-Party Data Selling</h2>
            <p>
              Your contact details are used exclusively for Revntrix agency communications. We never sell, lease, or share client inquiries with third-party advertising networks.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F7F7F5]">5. Contact & Data Deletion</h2>
            <p>
              To request immediate deletion of your inquiry data, email us directly at <a href="mailto:revntrix@gmail.com" className="text-[#D4A72C] underline">revntrix@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
