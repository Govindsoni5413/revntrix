"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Layers,
} from "lucide-react";
import { Button } from "./Button";
import { NICHES } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type NavbarProps = {
  activeNiche?: string;
  businessName?: string;
  isPersonalized?: boolean;
};

export function Navbar({ activeNiche, businessName, isPersonalized }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nichesDropdown, setNichesDropdown] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const generalWhatsAppUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hello Revntrix Team! I am interested in discussing a website design project."
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F1DC]/95 backdrop-blur-md border-b border-[#DDD5BE] text-[#0B1226]">
      {/* Personalized Outreach Top Bar if applicable */}
      {isPersonalized && businessName && (
        <div className="w-full bg-[#001BB7] text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8040] fill-current" />
          <span>
            Curated Design Directions Prepared for: <strong className="text-[#FF8040]">{businessName}</strong>
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Wordmark & Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#001BB7] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-[#0046FF] transition-colors">
              R
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#001BB7]">
              REVNTRIX
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-[#4F5D75] hover:text-[#001BB7] transition-colors"
          >
            All 60 Designs
          </Link>

          {/* Niches Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNichesDropdown((prev) => !prev)}
              onMouseEnter={() => setNichesDropdown(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#4F5D75] hover:text-[#001BB7] transition-colors py-2"
            >
              <span>6 Industry Niches</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {nichesDropdown && (
              <div
                onMouseLeave={() => setNichesDropdown(false)}
                className="absolute top-full left-0 w-64 p-2 bg-white border border-[#DDD5BE] rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1 z-50"
              >
                {Object.values(NICHES).map((niche) => (
                  <Link
                    key={niche.id}
                    href={`/${niche.slug}`}
                    onClick={() => setNichesDropdown(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      activeNiche === niche.id
                        ? "bg-[#0046FF]/10 text-[#001BB7]"
                        : "text-[#0B1226] hover:bg-[#ECE6D0]"
                    }`}
                  >
                    <span>{niche.name}</span>
                    <span className="text-[10px] text-[#4F5D75] font-mono">10 Designs</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/privacy"
            className="text-sm font-semibold text-[#4F5D75] hover:text-[#001BB7] transition-colors"
          >
            Trust & Guarantees
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0046FF] hover:bg-[#001BB7] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0046FF]/20 min-h-[44px]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl bg-white border border-[#DDD5BE] text-[#0B1226] min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DDD5BE] bg-[#F5F1DC] px-4 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-sm font-bold text-[#0B1226] hover:bg-[#ECE6D0]"
          >
            All 60 Designs
          </Link>

          <div className="flex flex-col gap-1 pl-3 border-l-2 border-[#0046FF]">
            <span className="text-[11px] font-bold text-[#4F5D75] uppercase tracking-wider mb-1">
              Select Industry Niche:
            </span>
            {Object.values(NICHES).map((niche) => (
              <Link
                key={niche.id}
                href={`/${niche.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-xs font-semibold text-[#0B1226] hover:text-[#0046FF]"
              >
                {niche.name} (10 Designs)
              </Link>
            ))}
          </div>

          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-[#4F5D75]"
          >
            Trust & Guarantees
          </Link>

          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-[#0046FF] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
}
