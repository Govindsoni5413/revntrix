import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/supabase/server";

export async function GET(req: NextRequest) {
  return handleDailyCron(req);
}

export async function POST(req: NextRequest) {
  return handleDailyCron(req);
}

async function handleDailyCron(req: NextRequest) {
  // 1. Verify CRON_SECRET header
  const authHeader = req.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET || "revntrix-secret-cron-key";

  if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const nowIso = new Date().toISOString();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const todayDate = new Date().toISOString().split("T")[0];

    // 2. Expire active campaigns whose expires_at <= now()
    const { data: expiredCampaigns } = await supabase
      .from("campaigns")
      .update({ status: "expired" })
      .eq("status", "active")
      .lte("expires_at", nowIso)
      .select("id");

    const expiredCount = expiredCampaigns?.length || 0;

    // 3. Purge analytics_events older than 30 days
    const { data: purgedAnalytics } = await supabase
      .from("analytics_events")
      .delete()
      .lt("created_at", thirtyDaysAgo)
      .select("id");

    const purgedCount = purgedAnalytics?.length || 0;

    // 4. Count new leads created today
    const { count: newLeadsCount } = await supabase
      .from("outreach_leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${todayDate}T00:00:00Z`);

    // 5. Upsert admin_daily_summary
    await supabase.from("admin_daily_summary").upsert(
      {
        summary_date: todayDate,
        new_leads_count: newLeadsCount || 0,
        campaigns_expired_count: expiredCount,
        analytics_purged_count: purgedCount,
      },
      { onConflict: "summary_date" }
    );

    return NextResponse.json({
      success: true,
      summary_date: todayDate,
      campaigns_expired: expiredCount,
      analytics_purged: purgedCount,
      new_leads: newLeadsCount || 0,
    });
  } catch (err) {
    console.error("Daily maintenance cron failure:", err);
    return NextResponse.json({ error: "Maintenance failed", details: String(err) }, { status: 500 });
  }
}
