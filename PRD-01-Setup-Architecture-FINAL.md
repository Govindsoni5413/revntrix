# Revntrix --- PRD 01: Setup, Architecture & Infrastructure

**Status:** Master Product Requirements Document --- Final Consolidated\
**Depends on:** Nothing\
**Consumed by:** PRD 02, PRD 03, TRD

## 1. Product Objective

Revntrix is a WhatsApp-first web-design showcase and lead-generation
platform for a modern web agency.

The product must:

-   Present exactly **60 semi-functional client-facing design
    experiences**.
-   Cover exactly **6 niches**: Interior Designer, Clinic/Doctor, Real
    Estate, Jewellers, Restaurant, E-commerce.
-   Convert visitor interest into qualified sales conversations.
-   Use **WhatsApp as the primary sales handoff**.
-   Provide **native email (`mailto:`) and Copy Message fallbacks**.
-   Run on a free-first infrastructure during the initial outreach
    runway.
-   Remain truthful: personalized pages are previews/design directions,
    not completed custom websites.

Expected traffic is approximately **10--30 visitors/day**, primarily
from direct outreach links.

## 2. Brand / Visual System

The supplied Revntrix logo establishes the visual direction: **metallic
gold + near-black/charcoal**, with a premium technology/agency feel.

### Brand tokens

``` css
--brand-gold: #D4A72C;
--brand-gold-bright: #F3C64E;
--brand-gold-deep: #8F6415;
--brand-black: #080808;
--brand-charcoal: #141414;
--brand-surface: #1D1D1D;
--brand-white: #F7F7F5;
--brand-muted: #A7A7A0;
--brand-border: #343434;
```

These are the starting design tokens, not a requirement that every
design use the same palette. Individual showcase designs must remain
materially different. The Revntrix shell, navigation, admin UI, CTAs,
focus states and shared primitives should use the gold/black identity
consistently.

### Logo rules

-   Use the supplied Revntrix logo as the primary brand mark.
-   Keep the logo aspect ratio unchanged.
-   Do not redraw, distort, recolor arbitrarily, or place it on
    backgrounds where contrast is insufficient.
-   Store the production logo under a version-controlled brand asset
    path such as `/public/brand/revntrix-logo.png`.
-   If a transparent logo variant is created, it must preserve the
    supplied visual identity.

## 3. Locked Technology Stack

  -----------------------------------------------------------------------
  Layer                               Decision
  ----------------------------------- -----------------------------------
  Framework                           Next.js App Router, TypeScript

  Hosting                             Vercel Hobby initially

  Database                            Supabase Postgres

  Database security                   Supabase RLS

  Public auth                         Google OAuth only

  Admin auth                          Email + password through Supabase
                                      Auth + allowlisted admin record

  Styling                             Tailwind CSS

  Icons                               lucide-react

  Motion                              Framer Motion

  AI                                  Optional Gemini adapter; model
                                      configurable

  Analytics                           Supabase `analytics_events` table
                                      only

  Bot protection                      reCAPTCHA v3 on public lead forms
                                      if enabled

  Source control                      GitHub

  Automation                          GitHub Actions

  Error monitoring                    Vercel logs or Sentry free tier;
                                      choose one consistently
  -----------------------------------------------------------------------

**Free-first rule:** no paid third-party service is a hard dependency
for core browsing, design previews, lead capture, WhatsApp handoff,
email fallback, or admin operation.

## 4. Repository Structure

``` text
/app
  /(public)
    /page.tsx
    /[niche]/page.tsx
    /[niche]/[designId]/page.tsx
    /r/[campaignCode]/page.tsx
  /admin
    /dashboard/page.tsx
    /leads/page.tsx
    /clients/page.tsx
    /projects/page.tsx
    /outreach/campaigns/page.tsx
    /analytics/page.tsx
    /settings/page.tsx
  /api
    /campaign/[id]/route.ts
    /leads/route.ts
    /analytics/route.ts
    /ai/onboarding/route.ts
    /cron/daily/route.ts

/designs
  /interior/INT_01 ... INT_10
  /clinic/CLN_01 ... CLN_10
  /realestate/EST_01 ... EST_10
  /jewellers/JW_01 ... JW_10
  /restaurant/RES_01 ... RES_10
  /ecommerce/ECO_01 ... ECO_10

/lib
  /design-registry.ts
  /design-modules.ts
  /whatsapp.ts
  /email-fallback.ts
  /campaign-resolver.ts
  /validation.ts
  /rate-limit.ts
  /ai/provider.ts

/supabase
  /client.ts
  /server.ts

/components
  /shared
  /public
  /admin

/public
  /brand/revntrix-logo.png
  /designs/{nicheId}/{designId}/*.webp

/.github/workflows
  /ci.yml
  /daily-maintenance.yml
```

### Isolation rules

-   A design module must never import another design module.
-   A design module must never import `/admin`.
-   Shared reusable UI belongs in `/components/shared`.
-   No client-controlled filesystem path may reach `import()`.
-   No design module may contain privileged Supabase/service-role logic.

## 5. Free-Tier Infrastructure Guardrails

The implementation must stay within the free-first operating limits
identified in the supplied infrastructure audit.

### Vercel

-   Keep serverless bundle size below the applicable platform limit.
-   Use dynamic loading/code splitting for design modules.
-   Avoid unnecessary server dependencies.
-   AI is never required for core conversion.
-   Upgrade to Vercel Pro at the first signed client as the
    commercial-use milestone.

### Supabase

-   Keep business data and analytics separate.
-   Do not store design raster assets in Supabase Storage.
-   Keep analytics lightweight and purge events older than 30 days.
-   Run the legitimate daily maintenance workflow.
-   Never implement a fake database heartbeat.

## 6. Legitimate Daily Maintenance

GitHub Actions runs a daily maintenance workflow.

It must:

1.  Expire campaigns whose trusted `expires_at` has passed.
2.  Delete `analytics_events` older than 30 days.
3.  Upsert the daily operational summary.
4.  Fail visibly in CI/logs if the protected maintenance endpoint cannot
    complete.

This is real product maintenance, not an artificial heartbeat.

## 7. Mobile-First Engineering

Mobile is the primary acceptance platform.

Required:

-   Mobile layout is designed first.
-   Desktop/tablet styles are progressive `min-width` additions.
-   Minimum interactive target: **44×44px**.
-   Test on a real or emulated mid-tier Android device.
-   Test on throttled 4G / constrained CPU.
-   Review LCP and interaction readiness.
-   Admin screens must also be usable one-handed on mobile.

## 8. Motion

-   Prefer `transform` and `opacity`.
-   Micro interactions: approximately 150--400ms.
-   Section reveals: approximately 400--800ms where useful.
-   Avoid constant loops, blocking animation, excessive parallax and
    unnecessary WebGL.
-   Respect `prefers-reduced-motion`.
-   Reduced-motion mode must remove nonessential motion without breaking
    interaction.

## 9. Design Registry

The catalog is immutable application metadata, not database content.

`lib/design-registry.ts` is the source of truth for:

-   ID
-   niche
-   public name
-   description
-   Design DNA
-   module key
-   active flag
-   sort order
-   declared personalization slots

### Secure module loading

Do not build an import path from raw user input.

Use a statically defined loader map:

``` ts
export const DESIGN_MODULES = {
  INT_01: () => import("@/designs/interior/INT_01"),
  INT_02: () => import("@/designs/interior/INT_02"),
  // ...
  ECO_10: () => import("@/designs/ecommerce/ECO_10"),
} as const;
```

The requested ID must first be validated against the registry.

## 10. Asset Policy

Free-first asset strategy:

1.  CSS gradients and shapes where suitable.
2.  SVG and lucide-react icons.
3.  Original/generated agency assets.
4.  Free-license assets with a clear usage basis.
5.  Agency-owned images.

Rules:

-   No paid asset is a mandatory dependency.
-   No scraping/copying proprietary imagery.
-   Maximum **5 raster images per design**.
-   Prefer WebP.
-   Target roughly **20--80KB/image** where practical.
-   Use `next/image`.
-   Store showcase images in `/public`, not Supabase Storage.

## 11. Analytics

Minimum events:

``` text
landing_view
niche_view
design_view
design_preview
ready_made_click
custom_start
custom_complete
whatsapp_click
campaign_open
```

Analytics must never block conversion.

Use `navigator.sendBeacon()` for final conversion telemetry where
appropriate.

Analytics records are private and automatically purged after 30 days.

## 12. AI Boundary

AI is optional.

Allowed use:

-   Custom onboarding assistance.
-   Content planning.
-   Requirement summarization.
-   Message preparation.

Not allowed as a dependency for:

-   Landing page.
-   Niche browsing.
-   Design preview.
-   Lead persistence.
-   WhatsApp generation.
-   Email fallback.

Implement an adapter:

``` text
AIProvider
  └── GeminiAdapter
```

The model is configured by environment variable rather than hard-coded
into business logic. Re-verify the currently available GA model before
deployment.

AI output is untrusted text and must be sanitized before rendering.

## 13. Environment Variables

``` text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_WHATSAPP_NUMBER
SALES_EMAIL
GEMINI_API_KEY
GEMINI_MODEL
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY
CRON_SECRET
ADMIN_BOOTSTRAP_EMAIL
```

Rules:

-   Never put service-role keys, AI keys, database passwords or internal
    secrets in `NEXT_PUBLIC_*`.
-   WhatsApp number is public configuration, not a secret.
-   `SALES_EMAIL` is public conversion configuration.
-   Use placeholders until the real agency contact details are supplied.

## 14. Acceptance Gate

PRD 01 is complete only when:

-   Repository structure exists.
-   Brand tokens and supplied logo are integrated into the shared shell.
-   All 60 IDs are registered.
-   Every design is dynamically loadable through a trusted static loader
    map.
-   No raw user-controlled import path exists.
-   Image limits are respected.
-   Analytics is isolated and purgeable.
-   Daily maintenance workflow works.
-   No secrets appear in public environment variables.
-   Mobile QA passes on the target profile.
-   Public auth is Google only.
-   Admin auth is separate and server-enforced.

## LOCKS

-   **L1.01** Exactly 60 design modules.
-   **L1.02** Dynamic/code-split design loading.
-   **L1.03** No raw user-supplied import paths.
-   **L1.04** No raster design storage in Supabase Storage.
-   **L1.05** Analytics isolated from leads and purged after 30 days.
-   **L1.06** No fake heartbeat jobs.
-   **L1.07** Server-only secrets never appear in `NEXT_PUBLIC_*`.
-   **L1.08** Public authentication = Google OAuth only.
-   **L1.09** Admin authentication = email/password + server role check.
-   **L1.10** Mobile-first is the acceptance bar.
-   **L1.11** Revntrix visual shell uses the supplied gold/black brand
    direction.
-   **L1.12** Vercel Pro upgrade is triggered at the first signed
    client.
