"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  User,
  LogOut,
} from "lucide-react";
import { NICHES } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { createClient } from "@/supabase/client";

type NavbarProps = {
  activeNiche?: string;
  businessName?: string;
  isPersonalized?: boolean;
};

export function Navbar({ activeNiche, businessName, isPersonalized }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nichesDropdown, setNichesDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [user, setUser] = useState<{ email?: string; name?: string; avatar?: string } | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
  const generalWhatsAppUrl = buildWhatsAppUrl(
    whatsappNumber,
    "Hello Revntrix Team! I am exploring your architecture catalog and would like to discuss a project."
  );

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setUser({
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split("@")[0],
            avatar: user.user_metadata?.avatar_url,
          });
        }
      }).catch(() => {});

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
            avatar: session.user.user_metadata?.avatar_url,
          });
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } catch {
      // Safe fallback
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      const redirectUrl = `${window.location.origin}/auth/callback`;
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
    } catch (err) {
      console.error("Google sign in error:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      setUserDropdown(false);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/85 transition-all duration-300 border-b border-slate-200/80">
      {/* Personalized Outreach Top Bar if applicable */}
      {isPersonalized && businessName && (
        <div className="w-full bg-slate-900 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2 border-b border-sky-500/30">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 fill-current animate-pulse" />
          <span>
            Curated Architectural Direction Prepared for: <strong className="text-sky-300">{businessName}</strong>
          </span>
        </div>
      )}

      <div className="h-16 max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-3">
        {/* Brand Wordmark & Logo */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5 group touch-interactive">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 overflow-hidden p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/revntrix-icon.svg"
                alt="Revntrix Mark"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[18px] tracking-wider text-slate-950 uppercase font-sans leading-none">
                  Revntrix
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mb-0.5 animate-pulse" />
              </div>
              <span className="text-[9px] text-slate-500 tracking-widest uppercase font-semibold">
                Architecture Catalog
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop Navigation Pill Dock */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-slate-100/90 border border-slate-200/90 shadow-inner">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full bg-white text-sky-600 font-semibold text-[13px] border border-slate-200/90 shadow-xs transition-all touch-interactive"
          >
            HOME
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setNichesDropdown(true)}
            onMouseLeave={() => setNichesDropdown(false)}
          >
            <a
              href="#niches"
              className="px-4 py-1.5 rounded-full bg-white/60 hover:bg-white text-slate-700 hover:text-slate-950 font-medium text-[13px] border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all touch-interactive flex items-center gap-1"
            >
              <span>6 Industry Niches</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {nichesDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 p-2 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {Object.values(NICHES).map((niche) => (
                  <Link
                    key={niche.id}
                    href={`/${niche.slug}`}
                    onClick={() => setNichesDropdown(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      activeNiche === niche.id
                        ? "bg-sky-50 text-sky-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <span>{niche.name}</span>
                    <span className="text-[10px] text-sky-600 font-mono bg-sky-100/60 px-1.5 py-0.5 rounded">
                      10 Designs
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="#guarantees"
            className="px-4 py-1.5 rounded-full bg-white/60 hover:bg-white text-slate-700 hover:text-slate-950 font-medium text-[13px] border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all touch-interactive"
          >
            Trust & Guarantees
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {/* User Profile / Google Sign-in Trigger */}
          <div className="relative">
            {user ? (
              <button
                type="button"
                onClick={() => setUserDropdown((prev) => !prev)}
                className="w-10 h-10 rounded-full border border-sky-200 bg-sky-50 flex items-center justify-center text-sky-700 font-bold text-xs shadow-xs hover:ring-2 hover:ring-sky-400 transition-all cursor-pointer overflow-hidden"
              >
                {user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt={user.name || "User"} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                title="Sign in with Google"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {userDropdown && user && (
              <div
                className="absolute top-full right-0 mt-2 w-56 p-3 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setUserDropdown(false)}
              >
                <div className="flex flex-col border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-900 truncate">{user.name}</span>
                  <span className="text-[11px] text-slate-500 truncate">{user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-xs text-rose-600 hover:text-rose-700 font-semibold p-1.5 rounded-lg hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-1.5 h-11 px-3.5 sm:px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold transition-all shadow-[0_4px_14px_rgba(22,163,74,0.25)] hover:shadow-emerald-600/35 active:scale-95 animate-cta-pulse"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <MessageSquare className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">WhatsApp Consultation</span>
            <span className="sm:hidden text-[12px]">WhatsApp</span>
          </a>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Navigation Menu"
            className="lg:hidden w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer active:scale-95 touch-interactive"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-5 flex flex-col gap-3.5 shadow-xl animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-900 bg-slate-50 flex items-center justify-between"
          >
            <span>HOME (All 60 Designs)</span>
            <ArrowRight className="w-4 h-4 text-sky-600" />
          </Link>

          <div className="flex flex-col gap-1.5 pl-3 border-l-2 border-sky-500 my-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Select Industry Niche:
            </span>
            {Object.values(NICHES).map((niche) => (
              <Link
                key={niche.id}
                href={`/${niche.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 flex items-center justify-between pr-2"
              >
                <span>{niche.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">10 Live</span>
              </Link>
            ))}
          </div>

          <a
            href="#guarantees"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Trust & Guarantees</span>
          </a>

          {!user ? (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 truncate">{user.email}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-xs text-rose-600 font-bold"
              >
                Sign Out
              </button>
            </div>
          )}

          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md mt-1"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Direct WhatsApp Discussion</span>
          </a>
        </div>
      )}
    </header>
  );
}
