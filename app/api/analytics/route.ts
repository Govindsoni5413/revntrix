import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { createAdminClient } from "@/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const limit = checkRateLimit(ip, RATE_LIMITS.analytics);
    if (!limit.allowed) {
      return NextResponse.json({ status: "rate_limited" }, { status: 429 });
    }

    const body = await req.json();

    if (!body.eventType || typeof body.eventType !== "string") {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    try {
      const supabase = createAdminClient();
      await supabase.from("analytics_events").insert({
        event_type: body.eventType.slice(0, 50),
        niche_id: body.nicheId || null,
        design_id: body.designId || null,
        campaign_id: body.campaignId || null,
        session_id: body.sessionId || null,
        metadata: body.metadata || null,
      });
    } catch {
      // Analytics must never block conversion or throw errors to client
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
