// ============================================================================
// Revntrix — WhatsApp Message Builder
// Primary conversion handoff channel (PRD-01 §1, TRD §10)
// Never includes internal CRM data, passwords, API keys, or admin info.
// ============================================================================

export type WhatsAppContext = {
  businessName: string;
  nicheName: string;
  designId: string;
  designName: string;
  intent: "ready_made" | "custom";
  requirements?: string;
};

/**
 * Builds a human-readable WhatsApp message from lead context.
 * Only includes information the user explicitly provided.
 */
export function buildWhatsAppMessage(ctx: WhatsAppContext): string {
  const lines = [
    "Hello Revntrix Team,",
    "",
    `Business: ${ctx.businessName}`,
    `Niche: ${ctx.nicheName}`,
    `Design: ${ctx.designId} — ${ctx.designName}`,
    `Intent: ${ctx.intent === "ready_made" ? "Ready-Made" : "Custom"}`,
  ];

  if (ctx.requirements?.trim()) {
    lines.push("", `Requirements: ${ctx.requirements.trim()}`);
  }

  lines.push("", "I would like to discuss this website.");

  return lines.join("\n");
}

/**
 * Builds the wa.me deep link URL.
 * Only uses the configured WhatsApp number — never a user-supplied number.
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Gets the configured WhatsApp number from environment.
 */
export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110";
}
