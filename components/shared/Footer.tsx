import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Mail, Shield, CheckCircle2 } from "lucide-react";
import { NICHES } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const salesEmail = process.env.SALES_EMAIL || "revntrix@gmail.com";
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hello Revntrix Team! I am reaching out to discuss a custom web project."
  );

  return (
    <footer className="w-full bg-[#001BB7] text-[#F5F1DC] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white text-[#001BB7] flex items-center justify-center font-bold text-sm shadow-sm">
                R
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                REVNTRIX
              </span>
            </div>
            <p className="text-xs text-[#F5F1DC]/80 max-w-md leading-relaxed">
              Revntrix is a WhatsApp-first design showcase presenting 60 semi-functional website
              architecture directions. Every preview represents a starting framework tailored
              and built out custom for your brand.
            </p>

            {/* Honest Trust Guarantee (PRD-03 §5) */}
            <div className="bg-[#001380] border border-white/15 p-4 rounded-2xl flex items-start gap-3 max-w-md">
              <CheckCircle2 className="w-4 h-4 text-[#FF8040] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#F5F1DC]/90 leading-snug">
                <strong className="text-white">Transparent Architecture Guarantee:</strong>{" "}
                All 60 designs are live interactive concept blueprints. We never use fake scarcity,
                misleading stats, or fabricated reviews.
              </p>
            </div>
          </div>

          {/* Niches Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              6 Industry Niches
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {Object.values(NICHES).map((niche) => (
                <li key={niche.id}>
                  <Link
                    href={`/${niche.slug}`}
                    className="text-[#F5F1DC]/80 hover:text-[#FF8040] transition-colors"
                  >
                    {niche.name} (10 Designs)
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Fallbacks */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sales Handoff
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#FF8040] font-semibold hover:underline"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>+91 87642 74110 (WhatsApp)</span>
              </a>
              <a
                href={`mailto:${salesEmail}`}
                className="flex items-center gap-2 text-[#F5F1DC]/80 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF8040]" />
                <span>{salesEmail}</span>
              </a>
              <Link
                href="/privacy"
                className="flex items-center gap-2 text-[#F5F1DC]/80 hover:text-white transition-colors"
              >
                <Shield className="w-4 h-4 text-[#FF8040]" />
                <span>Privacy & Consent Policy</span>
              </Link>
              <Link
                href="/admin/login"
                className="text-[11px] text-[#F5F1DC]/60 hover:text-white transition-colors pt-2"
              >
                Admin Gateway
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1DC]/70">
          <p>© 2026 Revntrix. All 60 Design Blueprints Registered.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Terms & Consent
            </Link>
            <span>•</span>
            <a
              href="https://wa.me/918764274110"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF8040] transition-colors"
            >
              Direct Studio Line
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
