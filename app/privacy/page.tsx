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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative antialiased">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 pb-12 sm:pb-20 w-full flex flex-col gap-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Showcase</span>
        </Link>

        <div className="flex flex-col gap-2.5 border-b border-slate-200 pb-6">
          <span className="text-xs font-mono text-sky-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Plain Language Data Protection
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
            Privacy Policy & Consent Framework
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last updated: September 2026 • Revntrix Architecture Studio
          </p>
        </div>

        <div className="flex flex-col gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Data Collection & Purpose</h2>
            <p>
              Revntrix collects only the information necessary to facilitate website design consultations, including business name, selected design architecture, and voluntary contact details submitted through our lead forms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Explicit Consent Checkpoint</h2>
            <p>
              Lead details are never recorded without an explicit checkbox agreement from the visitor. We store the timestamp of consent alongside submitted inquiries.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Automated 30-Day Analytics Purge</h2>
            <p>
              Website interaction telemetry (e.g. design view counts, clicks) is strictly aggregated and isolated from personal lead data. All raw telemetry records older than 30 days are permanently purged by our daily automated maintenance workflow.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. No Third-Party Data Selling</h2>
            <p>
              Your contact details are used exclusively for Revntrix agency communications. We never sell, lease, or share client inquiries with third-party advertising networks.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">5. Contact & Data Deletion</h2>
            <p>
              To request immediate deletion of your inquiry data, email us directly at{" "}
              <a href="mailto:revntrix@gmail.com" className="text-sky-600 font-semibold underline">
                revntrix@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
