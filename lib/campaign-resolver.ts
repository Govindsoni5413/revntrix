// ============================================================================
// Revntrix — Campaign & Personalization Resolver
// Secure server-side resolution with isolated niche overrides (PRD-03 §4, TRD §6)
// ============================================================================

import { NicheId, NICHES } from "@/lib/design-registry";
import { createAdminClient } from "@/supabase/server";

export type CampaignPresentation = {
  campaignId: string | null;
  campaignCode: string | null;
  prospectName: string;
  businessName: string;
  nicheId: NicheId;
  isPersonalized: boolean;
  status: "active" | "expired" | "not_found" | "draft";
};

const DEFAULT_DEMO_NAMES: Record<NicheId, string> = {
  INT: "Studio Lumina Interior",
  CLN: "Aura Health & Medical Care",
  EST: "Horizon Prime Properties",
  JW: "Kalyan Heritage Jewellers",
  RES: "The Olive Charcoal Bistro",
  ECO: "Velvet & Vogue Direct",
};

/**
 * Resolves a campaign code against the database or memory fallback.
 * Strictly guarantees that an override for one niche (e.g. INT) NEVER leaks into another (e.g. EST).
 */
export async function resolveCampaignPresentation(
  campaignCode: string,
  nicheId: NicheId
): Promise<CampaignPresentation> {
  const defaultBusinessName = DEFAULT_DEMO_NAMES[nicheId] || "Revntrix Client Partner";

  if (!campaignCode || typeof campaignCode !== "string") {
    return {
      campaignId: null,
      campaignCode: null,
      prospectName: "Valued Prospect",
      businessName: defaultBusinessName,
      nicheId,
      isPersonalized: false,
      status: "not_found",
    };
  }

  const cleanCode = campaignCode.trim().toLowerCase();

  // Demo campaign fallback for quick preview / staging testing
  if (cleanCode === "demo" || cleanCode === "demo-campaign") {
    return {
      campaignId: "00000000-0000-0000-0000-000000000001",
      campaignCode: "demo",
      prospectName: "Sharma Enterprises",
      businessName: nicheId === "INT" ? "Sharma Interiors" : defaultBusinessName,
      nicheId,
      isPersonalized: true,
      status: "active",
    };
  }

  try {
    const supabase = createAdminClient();
    
    // 1. Fetch Campaign
    const { data: campaign, error: campErr } = await supabase
      .from("campaigns")
      .select("id, campaign_code, prospect_name, status, expires_at")
      .eq("campaign_code", cleanCode)
      .maybeSingle();

    if (campErr || !campaign) {
      return {
        campaignId: null,
        campaignCode: cleanCode,
        prospectName: "Valued Prospect",
        businessName: defaultBusinessName,
        nicheId,
        isPersonalized: false,
        status: "not_found",
      };
    }

    // 2. Expiry check: client-side cannot bypass server expiry
    const isExpired =
      campaign.status === "expired" ||
      (campaign.expires_at && new Date(campaign.expires_at) <= new Date());

    if (isExpired || campaign.status !== "active") {
      return {
        campaignId: campaign.id,
        campaignCode: campaign.campaign_code,
        prospectName: campaign.prospect_name,
        businessName: defaultBusinessName, // Falls back gracefully to default/demo
        nicheId,
        isPersonalized: false,
        status: "expired",
      };
    }

    // 3. Isolated Niche Override lookup: UNIQUE (campaign_id, niche_id)
    const { data: override } = await supabase
      .from("campaign_overrides")
      .select("business_name_override")
      .eq("campaign_id", campaign.id)
      .eq("niche_id", nicheId)
      .maybeSingle();

    const resolvedBusinessName =
      override?.business_name_override?.trim() || campaign.prospect_name || defaultBusinessName;

    return {
      campaignId: campaign.id,
      campaignCode: campaign.campaign_code,
      prospectName: campaign.prospect_name,
      businessName: resolvedBusinessName,
      nicheId,
      isPersonalized: true,
      status: "active",
    };
  } catch {
    // Fail safe to default/demo presentation on network or unconfigured DB
    return {
      campaignId: null,
      campaignCode: cleanCode,
      prospectName: "Valued Prospect",
      businessName: defaultBusinessName,
      nicheId,
      isPersonalized: false,
      status: "not_found",
    };
  }
}
