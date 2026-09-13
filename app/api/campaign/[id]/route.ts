import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const supabase = createAdminClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select("*, campaign_overrides(*)")
      .eq("id", id)
      .maybeSingle();

    if (error || !campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ campaign });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
