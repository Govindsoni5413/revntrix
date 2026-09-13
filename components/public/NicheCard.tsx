import React from "react";
import Link from "next/link";
import {
  Palette,
  Stethoscope,
  Building2,
  Gem,
  UtensilsCrossed,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { NicheId } from "@/lib/design-registry";

type NicheCardProps = {
  id: NicheId;
  name: string;
  slug: string;
  count?: number;
  highlightConcept: string;
};

const iconMap: Record<NicheId, React.ReactNode> = {
  INT: <Palette className="w-6 h-6 text-[#D4A72C]" />,
  CLN: <Stethoscope className="w-6 h-6 text-[#D4A72C]" />,
  EST: <Building2 className="w-6 h-6 text-[#D4A72C]" />,
  JW: <Gem className="w-6 h-6 text-[#D4A72C]" />,
  RES: <UtensilsCrossed className="w-6 h-6 text-[#D4A72C]" />,
  ECO: <ShoppingBag className="w-6 h-6 text-[#D4A72C]" />,
};

export function NicheCard({
  id,
  name,
  slug,
  count = 10,
  highlightConcept,
}: NicheCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group relative bg-[#141414] border border-[#262626] hover:border-[#D4A72C]/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,167,44,0.12)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A72C]/5 rounded-full blur-2xl group-hover:bg-[#D4A72C]/10 transition-colors pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#1D1D1D] border border-[#343434] flex items-center justify-center group-hover:scale-110 group-hover:border-[#D4A72C]/40 transition-all">
            {iconMap[id]}
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#1D1D1D] text-[#D4A72C] border border-[#343434]">
            {count} Live Designs
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#F7F7F5] group-hover:text-[#F3C64E] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-[#A7A7A0] mt-1 line-clamp-2 leading-relaxed">
            {highlightConcept}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#1F1F1F] flex items-center justify-between text-xs font-semibold text-[#D4A72C] group-hover:text-[#F3C64E] transition-colors">
        <span>Explore Catalog</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
