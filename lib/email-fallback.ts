// ============================================================================
// Revntrix — Email Fallback (mailto: only in V1)
// No email-sending service required (PRD-03 §10, TRD §11)
// ============================================================================

/**
 * Builds a mailto: URL for email fallback.
 * V1 uses native mailto: — no email API required.
 */
export function buildMailtoUrl(
  email: string,
  subject: string,
  body: string
): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Builds an email subject line from lead context.
 */
export function buildEmailSubject(
  businessName: string,
  designId: string
): string {
  return `Website Enquiry — ${businessName} (${designId})`;
}

/**
 * Gets the configured sales email from environment.
 */
export function getSalesEmail(): string {
  return process.env.SALES_EMAIL || "revntrix@gmail.com";
}
