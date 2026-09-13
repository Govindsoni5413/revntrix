import { NextRequest, NextResponse } from "next/server";
import { validateLeadInput } from "@/lib/validation";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { createAdminClient } from "@/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting check (TRD §19)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const limit = checkRateLimit(ip, RATE_LIMITS.leads);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a few minutes." },
        { status: 429 }
      );
    }

    // 2. Body parsing & validation
    const body = await req.json();
    const validation = validateLeadInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    // 3. Database persistence with service role client (RLS bypass on server)
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("outreach_leads")
        .insert({
          business_name: body.businessName.trim(),
          niche_id: body.nicheId,
          design_id: body.designId,
          intent: body.intent,
          campaign_id: body.campaignId || null,
          phone: body.phone?.trim() || null,
          requirements: body.requirements ? { notes: body.requirements } : null,
          status: "new",
          consent_given: true,
          consent_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (error) {
        console.warn("Supabase lead insertion error:", error.message);
        // Resilient fallback: return success so client WhatsApp handoff is never blocked
        return NextResponse.json({ success: true, fallback: true, leadId: null });
      }

      return NextResponse.json({ success: true, leadId: data.id });
    } catch (dbErr) {
      console.warn("Database unconfigured or unreachable:", dbErr);
      return NextResponse.json({ success: true, fallback: true, leadId: null });
    }
  } catch (err) {
    console.error("Lead submission API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
