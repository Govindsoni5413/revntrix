import React from "react";
import Link from "next/link";
import { MessageSquare, Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { NICHES } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const salesEmail = process.env.SALES_EMAIL || "revntrix@gmail.com";
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hello Revntrix Team! I am reaching out to discuss a custom web architecture project."
  );

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/90 text-slate-600 mt-16 sm:mt-24">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-6">
          {/* Column 1: Studio Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-xs animate-float-icon overflow-hidden p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/revntrix-icon.svg"
                  alt="Revntrix Mark"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[18px] tracking-wider text-slate-950 uppercase font-sans leading-none">
                  Revntrix
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mb-0.5 animate-pulse" />
              </div>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed max-w-sm">
              Conversion architecture engineered as strategic enterprise infrastructure. We architect high-converting web systems, eliminating template decay with precision-crafted blueprints.
            </p>
            <div className="flex items-center gap-2 text-emerald-700 text-[11px] uppercase font-bold pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Engineered Conversion Standard</span>
            </div>
          </div>

          {/* Column 2: 6 Industry Niches (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="text-[11px] text-slate-900 uppercase tracking-widest font-bold">
              6 Industry Niches
            </span>
            <nav className="flex flex-col gap-2 pt-1">
              {Object.values(NICHES).map((niche) => (
                <Link
                  key={niche.id}
                  href={`/${niche.slug}`}
                  className="text-[13px] text-slate-600 hover:text-sky-600 transition-colors py-0.5 hover:translate-x-1 transition-transform inline-flex items-center justify-between"
                >
                  <span>{niche.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">10</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Direct Studio Inquiries (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="text-[11px] text-slate-900 uppercase tracking-widest font-bold">
              Direct Studio Inquiries
            </span>
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <a
                  href="tel:+918764274110"
                  className="text-[13px] hover:text-sky-600 transition-colors font-medium touch-interactive"
                >
                  +91 87642 74110
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                <a
                  href={`mailto:${salesEmail}`}
                  className="text-[13px] hover:text-sky-600 transition-colors font-medium touch-interactive"
                >
                  {salesEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-slate-500 hover:text-emerald-700 transition-colors font-medium"
                >
                  24/7 Priority WhatsApp Line
                </a>
              </div>
              <Link
                href="/admin/login"
                className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors pt-2"
              >
                Admin Gateway
              </Link>
            </div>
          </div>

          {/* Column 4: Architecture Guarantee Card (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="text-[11px] text-slate-900 uppercase tracking-widest font-bold">
              Architecture Guarantee
            </span>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col gap-1 hover:border-sky-300 transition-colors mt-1">
              <span className="text-[13px] text-slate-900 font-bold">100% Commercial Proof</span>
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Guaranteed zero render layout debt, audited conversion paths, and instant WhatsApp handoff.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 mt-8 sm:mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[12px] text-slate-500">
          <p>© 2026 Revntrix Architecture Studio. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a href="#guarantees" className="hover:text-slate-900 transition-colors">
              Guarantees
            </a>
            <a href="#guarantees" className="hover:text-slate-900 transition-colors">
              Commercial SLA
            </a>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy & Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
