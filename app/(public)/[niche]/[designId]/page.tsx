import React from "react";
import { notFound } from "next/navigation";
import { getDesignById, getNicheBySlug } from "@/lib/design-registry";
import { loadDesignModule } from "@/lib/design-modules";
import { DesignFrame } from "@/components/public/DesignFrame";

type PreviewPageProps = {
  params: Promise<{ niche: string; designId: string }>;
  searchParams: Promise<{ businessName?: string; campaignId?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ niche: string; designId: string }> }) {
  const { designId } = await params;
  const design = getDesignById(designId);
  if (!design) return { title: "Design Not Found" };

  return {
    title: `${design.id}: ${design.name} — Live Interactive Preview | Revntrix`,
    description: design.description,
  };
}

export default async function DesignPreviewPage({ params, searchParams }: PreviewPageProps) {
  const { niche: nicheSlug, designId } = await params;
  const { businessName, campaignId } = await searchParams;

  const design = getDesignById(designId);
  if (!design) {
    notFound();
  }

  // Secure dynamic module loading through static map (TRD §5)
  const loadedModule = (await loadDesignModule(design.id)) as { default?: React.ComponentType<{ businessName?: string }> } | null;

  if (!loadedModule || !loadedModule.default) {
    notFound();
  }

  const DesignComponent = loadedModule.default;

  return (
    <DesignFrame design={design} businessName={businessName} campaignId={campaignId}>
      <DesignComponent businessName={businessName} />
    </DesignFrame>
  );
}
