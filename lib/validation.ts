// ============================================================================
// Revntrix — Input Validation Utilities
// Server-side validation for lead forms and campaign data (TRD §7)
// ============================================================================

import { isValidNicheId, isValidDesignId, designBelongsToNiche } from "@/lib/design-registry";
import type { NicheId } from "@/lib/design-registry";

// ── Constants ──

const MAX_BUSINESS_NAME_LENGTH = 100;
const MAX_REQUIREMENTS_LENGTH = 2000;
const MAX_PHONE_LENGTH = 20;
const MAX_REFERENCE_URL_LENGTH = 500;
const MAX_REFERENCE_URLS = 5;
const SAFE_URL_SCHEMES = ["https:", "http:"];
const BUSINESS_NAME_PATTERN = /^[a-zA-Z0-9\s\-'&.,()]+$/;

// ── Types ──

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export type LeadInput = {
  businessName: string;
  nicheId: string;
  designId: string;
  intent: string;
  campaignId?: string;
  phone?: string;
  requirements?: string;
  referenceUrls?: string[];
  consentGiven: boolean;
};

// ── Validators ──

export function validateBusinessName(name: string): ValidationResult {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push("Business name is required.");
  } else if (name.trim().length > MAX_BUSINESS_NAME_LENGTH) {
    errors.push(`Business name must be ${MAX_BUSINESS_NAME_LENGTH} characters or fewer.`);
  } else if (!BUSINESS_NAME_PATTERN.test(name.trim())) {
    errors.push("Business name contains invalid characters.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateNicheId(nicheId: string): ValidationResult {
  const errors: string[] = [];

  if (!nicheId) {
    errors.push("Niche is required.");
  } else if (!isValidNicheId(nicheId)) {
    errors.push("Invalid niche selected.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateDesignId(designId: string, nicheId: string): ValidationResult {
  const errors: string[] = [];

  if (!designId) {
    errors.push("Design is required.");
  } else if (!isValidDesignId(designId)) {
    errors.push("Invalid design selected.");
  } else if (nicheId && !designBelongsToNiche(designId, nicheId)) {
    errors.push("Design does not belong to the selected niche.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateIntent(intent: string): ValidationResult {
  const errors: string[] = [];

  if (!intent) {
    errors.push("Intent is required.");
  } else if (!["ready_made", "custom"].includes(intent)) {
    errors.push("Intent must be 'ready_made' or 'custom'.");
  }

  return { valid: errors.length === 0, errors };
}

export function validatePhone(phone: string | undefined): ValidationResult {
  const errors: string[] = [];

  if (phone && phone.length > MAX_PHONE_LENGTH) {
    errors.push(`Phone number must be ${MAX_PHONE_LENGTH} characters or fewer.`);
  }

  return { valid: errors.length === 0, errors };
}

export function validateRequirements(requirements: string | undefined): ValidationResult {
  const errors: string[] = [];

  if (requirements && requirements.length > MAX_REQUIREMENTS_LENGTH) {
    errors.push(`Requirements must be ${MAX_REQUIREMENTS_LENGTH} characters or fewer.`);
  }

  return { valid: errors.length === 0, errors };
}

export function validateReferenceUrl(url: string): ValidationResult {
  const errors: string[] = [];

  if (url.length > MAX_REFERENCE_URL_LENGTH) {
    errors.push("URL is too long.");
    return { valid: false, errors };
  }

  try {
    const parsed = new URL(url);
    if (!SAFE_URL_SCHEMES.includes(parsed.protocol)) {
      errors.push(`URL must use ${SAFE_URL_SCHEMES.join(" or ")} scheme.`);
    }
  } catch {
    errors.push("Invalid URL format.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateReferenceUrls(urls: string[] | undefined): ValidationResult {
  const errors: string[] = [];

  if (!urls) return { valid: true, errors };

  if (urls.length > MAX_REFERENCE_URLS) {
    errors.push(`Maximum ${MAX_REFERENCE_URLS} reference URLs allowed.`);
  }

  urls.forEach((url, i) => {
    const result = validateReferenceUrl(url);
    if (!result.valid) {
      errors.push(`URL ${i + 1}: ${result.errors.join(", ")}`);
    }
  });

  return { valid: errors.length === 0, errors };
}

export function validateConsent(consentGiven: boolean): ValidationResult {
  const errors: string[] = [];

  if (!consentGiven) {
    errors.push("Consent is required before submitting.");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validates a complete lead submission.
 * All validation is server-side — never trust hidden form fields.
 */
export function validateLeadInput(input: LeadInput): ValidationResult {
  const allErrors: string[] = [];

  const checks = [
    validateBusinessName(input.businessName),
    validateNicheId(input.nicheId),
    validateDesignId(input.designId, input.nicheId),
    validateIntent(input.intent),
    validatePhone(input.phone),
    validateRequirements(input.requirements),
    validateReferenceUrls(input.referenceUrls),
    validateConsent(input.consentGiven),
  ];

  for (const check of checks) {
    allErrors.push(...check.errors);
  }

  return { valid: allErrors.length === 0, errors: allErrors };
}
