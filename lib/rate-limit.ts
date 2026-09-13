// ============================================================================
// Revntrix — Lightweight Rate Limiter
// Server-side rate limiting without paid dependencies (TRD §19)
// ============================================================================

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// In-memory store — sufficient for Vercel serverless at 10-30 visitors/day
const store = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export type RateLimitConfig = {
  /** Maximum requests allowed in the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

// ── Default limits per endpoint ──

export const RATE_LIMITS = {
  leads: { maxRequests: 5, windowSeconds: 300 } as RateLimitConfig,       // 5 per 5 min
  analytics: { maxRequests: 60, windowSeconds: 60 } as RateLimitConfig,   // 60 per min
  ai: { maxRequests: 10, windowSeconds: 300 } as RateLimitConfig,         // 10 per 5 min
  campaign: { maxRequests: 20, windowSeconds: 300 } as RateLimitConfig,   // 20 per 5 min
  auth: { maxRequests: 10, windowSeconds: 300 } as RateLimitConfig,       // 10 per 5 min
} as const;

/**
 * Check rate limit for a given identifier (typically IP + endpoint).
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = store.get(identifier);

  // No existing entry or window expired — allow
  if (!entry || entry.resetAt <= now) {
    const resetAt = now + config.windowSeconds * 1000;
    store.set(identifier, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt,
    };
  }

  // Within window — check count
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Within window and under limit — increment
  entry.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Extract client IP from request headers.
 * Works with Vercel's x-forwarded-for header.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Apply rate limiting to a request.
 * Returns the rate limit result for the given endpoint and IP.
 */
export function rateLimit(
  request: Request,
  endpoint: keyof typeof RATE_LIMITS
): RateLimitResult {
  const ip = getClientIp(request);
  const key = `${endpoint}:${ip}`;
  return checkRateLimit(key, RATE_LIMITS[endpoint]);
}
