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
      className="group relative bg-white border border-[#90CAF9] hover:border-[#2196F3] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-sm"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2196F3]/5 rounded-full blur-2xl group-hover:bg-[#2196F3]/10 transition-colors pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center group-hover:scale-110 group-hover:border-[#2196F3] transition-all">
            {iconMap[id]}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1] border border-[#90CAF9]">
            {count} Live Designs
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-[#3A608F] mt-1 line-clamp-2 leading-relaxed font-normal">
            {highlightConcept}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#D9EDFC] flex items-center justify-between text-xs font-bold text-[#2196F3] group-hover:text-[#0D47A1] transition-colors">
        <span>Explore Catalog</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
