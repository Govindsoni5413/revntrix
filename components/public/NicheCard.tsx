"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Palette,
  Stethoscope,
  Building2,
  Gem,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";
import { NicheId } from "@/lib/design-registry";

type NicheCardProps = {
  id: NicheId;
  name: string;
  slug: string;
  count?: number;
  highlightConcept: string;
  onSelect?: (nicheId: NicheId) => void;
};

const nicheThemes: Record<
  NicheId,
  {
    icon: React.ReactNode;
    bgStyle: string;
    borderHover: string;
    iconBg: string;
    badgeBg: string;
    badgeText: string;
    accentColor: string;
  }
> = {
  INT: {
    icon: <Palette className="w-5 h-5" />,
    bgStyle:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.7) 100%)",
    borderHover: "hover:border-sky-400 hover:shadow-[0_16px_36px_rgba(2,132,199,0.16)]",
    iconBg: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
    badgeBg: "bg-sky-50 border-sky-100",
    badgeText: "text-sky-700",
    accentColor: "text-sky-600 group-hover:text-sky-700",
  },
  CLN: {
    icon: <Stethoscope className="w-5 h-5" />,
    bgStyle:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(238, 242, 255, 0.7) 100%)",
    borderHover: "hover:border-indigo-400 hover:shadow-[0_16px_36px_rgba(37,99,235,0.16)]",
    iconBg:
      "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    badgeBg: "bg-indigo-50 border-indigo-100",
    badgeText: "text-indigo-700",
    accentColor: "text-indigo-600 group-hover:text-indigo-700",
  },
  EST: {
    icon: <Building2 className="w-5 h-5" />,
    bgStyle:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.7) 100%)",
    borderHover: "hover:border-sky-400 hover:shadow-[0_16px_36px_rgba(2,132,199,0.16)]",
    iconBg: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
    badgeBg: "bg-sky-50 border-sky-100",
    badgeText: "text-sky-700",
    accentColor: "text-sky-600 group-hover:text-sky-700",
  },
  JW: {
    icon: <Gem className="w-5 h-5" />,
    bgStyle:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 243, 199, 0.6) 100%)",
    borderHover: "hover:border-amber-400 hover:shadow-[0_16px_36px_rgba(217,119,6,0.16)]",
    iconBg:
      "bg-amber-50 border-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    badgeBg: "bg-amber-50 border-amber-100",
    badgeText: "text-amber-700",
    accentColor: "text-amber-600 group-hover:text-amber-700",
  },
  RES: {
    icon: <UtensilsCrossed className="w-5 h-5" />,
    bgStyle:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 228, 230, 0.6) 100%)",
    borderHover: "hover:border-rose-400 hover:shadow-[0_16px_36px_rgba(225,29,72,0.16)]",
    iconBg: "bg-rose-50 border-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
    badgeBg: "bg-rose-50 border-rose-100",
    badgeText: "text-rose-700",
    accentColor: "text-rose-600 group-hover:text-rose-700",
  },
  ECO: {
    icon: <ShoppingBag className="w-5 h-5" />,
    bgStyle:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(209, 250, 229, 0.6) 100%)",
    borderHover: "hover:border-emerald-400 hover:shadow-[0_16px_36px_rgba(16,185,129,0.16)]",
    iconBg:
      "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    badgeBg: "bg-emerald-50 border-emerald-100",
    badgeText: "text-emerald-700",
    accentColor: "text-emerald-600 group-hover:text-emerald-700",
  },
};

export function NicheCard({
  id,
  name,
  slug,
  count = 10,
  highlightConcept,
  onSelect,
}: NicheCardProps) {
  const theme = nicheThemes[id] || nicheThemes.INT;

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(id);
      const showcase = document.getElementById("showcase");
      if (showcase) {
        showcase.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={`group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 ${theme.borderHover} shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between touch-interactive backdrop-blur-md`}
      style={{
        background: theme.bgStyle,
        boxShadow:
          "rgba(15, 23, 42, 0.04) 0px 6px 16px -4px, rgba(255, 255, 255, 0.95) 0px 2px 2px inset",
      }}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center ${theme.iconBg} group-hover:rotate-6 transition-all duration-300 shadow-xs`}
          >
            {theme.icon}
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full border font-mono text-[11px] ${theme.badgeBg} ${theme.badgeText} font-semibold group-hover:scale-105 transition-transform`}
          >
            {count} Live Designs
          </span>
        </div>

        {/* Content */}
        <h3 className="text-[18px] sm:text-[20px] text-slate-900 mb-1.5 font-bold tracking-tight">
          {name}
        </h3>
        <p className="text-[13px] sm:text-[14px] text-slate-600 mb-4 leading-relaxed font-normal">
          {highlightConcept}
        </p>
      </div>

      {/* Action CTA */}
      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
        <button
          type="button"
          onClick={handleClick}
          className={`h-10 inline-flex items-center gap-1.5 ${theme.accentColor} font-semibold text-[13px] sm:text-[14px] group-hover:translate-x-1.5 transition-all active:scale-95 text-left cursor-pointer`}
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <Link
          href={`/${slug}`}
          className="text-[11px] text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          View Hub
        </Link>
      </div>
    </div>
  );
}
