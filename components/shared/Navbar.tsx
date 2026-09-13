"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  MessageSquare,
  Sparkles,
  ShieldCheck,
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
    <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#262626]">
      {/* Personalized Outreach Top Bar if applicable */}
      {isPersonalized && businessName && (
        <div className="w-full bg-gradient-to-r from-[#8F6415]/80 via-[#D4A72C]/90 to-[#8F6415]/80 text-[#080808] px-4 py-1.5 text-xs font-semibold text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>
            Curated Design Directions Prepared for: <strong>{businessName}</strong>
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-40 h-10 transition-transform group-hover:scale-[1.02]">
            <Image
              src="/brand/revntrix-logo.svg"
              alt="Revntrix Design Architecture"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-[#A7A7A0] hover:text-[#F7F7F5] transition-colors"
          >
            All 60 Designs
          </Link>

          {/* Niches Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNichesDropdown((prev) => !prev)}
              onMouseEnter={() => setNichesDropdown(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#A7A7A0] hover:text-[#F7F7F5] transition-colors py-2"
            >
              <span>6 Industry Niches</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {nichesDropdown && (
              <div
                onMouseLeave={() => setNichesDropdown(false)}
                className="absolute top-full left-0 w-64 p-2 bg-[#141414] border border-[#343434] rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1"
              >
                {Object.values(NICHES).map((niche) => (
                  <Link
                    key={niche.id}
                    href={`/${niche.slug}`}
                    onClick={() => setNichesDropdown(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      activeNiche === niche.id
                        ? "bg-[#D4A72C]/10 text-[#D4A72C]"
                        : "text-[#F7F7F5] hover:bg-[#1D1D1D]"
                    }`}
                  >
                    <span>{niche.name}</span>
                    <span className="text-[10px] text-[#A7A7A0]">10 Designs</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/privacy"
            className="text-sm font-medium text-[#A7A7A0] hover:text-[#F7F7F5] transition-colors"
          >
            Trust & Privacy
          </Link>

          <Link
            href="/admin/dashboard"
            className="text-sm font-medium text-[#A7A7A0] hover:text-[#D4A72C] transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/25 transition-all min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp Direct</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden w-11 h-11 rounded-lg border border-[#343434] bg-[#141414] text-[#F7F7F5] flex items-center justify-center focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#262626] bg-[#0E0E0E] p-4 flex flex-col gap-3 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#F7F7F5] py-2 border-b border-[#1D1D1D]"
          >
            All 60 Showcase Designs
          </Link>

          <div className="flex flex-col gap-1 py-1">
            <span className="text-[11px] font-semibold text-[#A7A7A0] uppercase tracking-wider">
              Browse by Industry
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {Object.values(NICHES).map((niche) => (
                <Link
                  key={niche.id}
                  href={`/${niche.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-[#F7F7F5] hover:border-[#D4A72C] transition-colors"
                >
                  {niche.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#1D1D1D]">
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#25D366] text-black font-semibold text-xs min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>

            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-[#A7A7A0] py-2"
            >
              Admin CRM Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
