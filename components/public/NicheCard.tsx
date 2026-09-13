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
  INT: <Palette className="w-6 h-6 text-[#2196F3]" />,
  CLN: <Stethoscope className="w-6 h-6 text-[#2196F3]" />,
  EST: <Building2 className="w-6 h-6 text-[#2196F3]" />,
  JW: <Gem className="w-6 h-6 text-[#2196F3]" />,
  RES: <UtensilsCrossed className="w-6 h-6 text-[#2196F3]" />,
  ECO: <ShoppingBag className="w-6 h-6 text-[#2196F3]" />,
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
      className="group relative liquid-glass-card rounded-[2rem] p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#2196F3]/15 rounded-full blur-2xl group-hover:bg-[#2196F3]/25 transition-colors pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-13 h-13 rounded-2xl bg-white/95 border border-white flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#2196F3] transition-all">
            {iconMap[id]}
          </div>
          <span className="liquid-pill text-[11px] font-bold px-3.5 py-1 text-[#0D47A1]">
            {count} Live Designs
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-[#3A608F] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {highlightConcept}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#90CAF9]/40 flex items-center justify-between text-xs font-bold text-[#2196F3] group-hover:text-[#0D47A1] transition-colors">
        <span>Explore Catalog</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
}
