import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { createAIProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const limit = checkRateLimit(ip, RATE_LIMITS.ai);
    if (!limit.allowed) {
      return NextResponse.json({ error: "AI rate limit reached. Please use manual brief." }, { status: 429 });
    }

    const body = await req.json();
    const prompt = `Business: ${body.businessName || "Client"}
Niche: ${body.nicheId || "General"}
Primary Goal: ${body.mainGoal || "Lead generation"}
Style: ${body.stylePreference || "Modern"}
Key Features: ${(body.features || []).join(", ")}
Notes: ${body.notes || ""}`;

    const ai = createAIProvider();
    if (!ai) {
      // Fallback response when AI key is unconfigured
      const fallbackSummary = `Bespoke web architecture tailored for ${body.businessName || "your business"}. Focuses on ${body.mainGoal || "conversion"} with a ${body.stylePreference || "clean"} visual design and integrated ${(body.features || []).slice(0, 3).join(", ")}.`;
      return NextResponse.json({ summary: fallbackSummary });
    }

    const summary = await ai.summarizeRequirements(prompt);
    return NextResponse.json({ summary });
  } catch (err) {
    console.warn("AI assistance fallback triggered:", err);
    return NextResponse.json({
      summary: "Custom high-conversion web application designed to elevate brand authority and lead inquiries.",
    });
  }
}
