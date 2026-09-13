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
  INT: <Palette className="w-6 h-6 text-[#0046FF]" />,
  CLN: <Stethoscope className="w-6 h-6 text-[#0046FF]" />,
  EST: <Building2 className="w-6 h-6 text-[#0046FF]" />,
  JW: <Gem className="w-6 h-6 text-[#0046FF]" />,
  RES: <UtensilsCrossed className="w-6 h-6 text-[#0046FF]" />,
  ECO: <ShoppingBag className="w-6 h-6 text-[#0046FF]" />,
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
      className="group relative bg-white border border-[#DDD5BE] hover:border-[#0046FF] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-sm"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0046FF]/5 rounded-full blur-2xl group-hover:bg-[#0046FF]/10 transition-colors pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#F5F1DC] border border-[#DDD5BE] flex items-center justify-center group-hover:scale-110 group-hover:border-[#0046FF]/40 transition-all">
            {iconMap[id]}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F5F1DC] text-[#001BB7] border border-[#DDD5BE]">
            {count} Live Designs
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#0B1226] group-hover:text-[#0046FF] transition-colors">
            {name}
          </h3>
          <p className="text-xs text-[#4F5D75] mt-1 line-clamp-2 leading-relaxed font-normal">
            {highlightConcept}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#ECE6D0] flex items-center justify-between text-xs font-bold text-[#0046FF] group-hover:text-[#001BB7] transition-colors">
        <span>Explore Catalog</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
