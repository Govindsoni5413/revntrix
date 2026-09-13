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
    <footer className="w-full bg-[#080808] border-t border-[#262626] text-[#A7A7A0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="relative w-44 h-10">
              <Image
                src="/brand/revntrix-logo.svg"
                alt="Revntrix"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-xs text-[#A7A7A0] max-w-md leading-relaxed">
              Revntrix is a WhatsApp-first design showcase presenting 60 semi-functional website
              architecture directions. Every preview represents a starting framework tailored
              and built out custom for your brand.
            </p>

            {/* Honest Trust Guarantee (PRD-03 §5) */}
            <div className="bg-[#141414] border border-[#262626] p-3.5 rounded-xl flex items-start gap-2.5 max-w-md">
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#A7A7A0] leading-snug">
                <strong className="text-[#F7F7F5]">Transparent Architecture Guarantee:</strong>{" "}
                All 60 designs are live interactive concept blueprints. We never use fake scarcity,
                misleading stats, or fabricated reviews.
              </p>
            </div>
          </div>

          {/* Niches Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#F7F7F5] uppercase tracking-wider">
              6 Industry Niches
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {Object.values(NICHES).map((niche) => (
                <li key={niche.id}>
                  <Link
                    href={`/${niche.slug}`}
                    className="hover:text-[#D4A72C] transition-colors"
                  >
                    {niche.name} (10 Designs)
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Fallbacks */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#F7F7F5] uppercase tracking-wider">
              Sales Handoff
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>+91 87642 74110 (WhatsApp)</span>
              </a>
              <a
                href={`mailto:${salesEmail}`}
                className="flex items-center gap-2 hover:text-[#F7F7F5] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4A72C]" />
                <span>{salesEmail}</span>
              </a>
              <Link
                href="/privacy"
                className="flex items-center gap-2 hover:text-[#F7F7F5] transition-colors"
              >
                <Shield className="w-4 h-4 text-[#D4A72C]" />
                <span>Privacy & Consent Policy</span>
              </Link>
              <Link
                href="/admin/login"
                className="text-[11px] text-[#666] hover:text-[#A7A7A0] transition-colors pt-2"
              >
                Admin Gateway
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1D1D1D] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666]">
          <p>© 2026 Revntrix. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#A7A7A0]">
              Privacy Policy
            </Link>
            <span>•</span>
            <span>Mobile-First Engineering</span>
            <span>•</span>
            <span className="text-[#D4A72C]">Powered by Next.js & Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
