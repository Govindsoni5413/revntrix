# Revntrix --- TRD: Technical Requirements Document

**Status:** Master Technical Specification --- Final Consolidated\
**Depends on:** PRD 01, PRD 02, PRD 03

This document translates the three PRDs into implementation contracts.
Where implementation detail is added here, it must not contradict the
locked PRD behavior.

------------------------------------------------------------------------

# 1. Architecture

``` text
Next.js App Router
│
├── Public UI
│   ├── Landing
│   ├── Niche Catalog
│   ├── Design Preview
│   └── Outreach Resolver
│
├── Conversion
│   ├── Ready-Made
│   ├── Custom
│   ├── Consent
│   ├── WhatsApp
│   ├── mailto:
│   └── Copy Message
│
├── Admin UI
│   ├── Dashboard
│   ├── Leads
│   ├── Campaigns
│   ├── Personalization
│   ├── Clients
│   ├── Projects
│   └── Analytics
│
├── Server/API
│   ├── Auth/session checks
│   ├── Campaign resolution
│   ├── Lead validation
│   ├── Analytics ingestion
│   ├── AI adapter
│   └── Daily maintenance
│
└── Supabase
    ├── Auth
    ├── Postgres
    └── RLS
```

## Architectural rule

The browser may request actions, but it never decides whether the action
is authorized.

------------------------------------------------------------------------

# 2. Database Schema

The static 60-design catalog is not a database table.

## 2.1 `profiles`

Use this table for application-level user profile/role metadata if
desired.

``` sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 2.2 `admin_users`

``` sql
create table admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin'
    check (role in ('admin', 'owner')),
  created_at timestamptz not null default now()
);
```

## 2.3 `campaigns`

``` sql
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  campaign_code text unique not null,
  prospect_name text not null,
  status text not null default 'draft'
    check (status in ('draft','active','expired','archived')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 2.4 `campaign_overrides`

``` sql
create table campaign_overrides (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  niche_id text not null
    check (niche_id in ('INT','CLN','EST','JW','RES','ECO')),
  business_name_override text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, niche_id)
);
```

The unique constraint is a hard database boundary against duplicate
niche overrides.

## 2.5 `outreach_leads`

``` sql
create table outreach_leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  niche_id text not null
    check (niche_id in ('INT','CLN','EST','JW','RES','ECO')),
  design_id text not null,
  intent text not null
    check (intent in ('ready_made','custom')),
  campaign_id uuid references campaigns(id) on delete set null,
  requirements jsonb,
  phone text,
  status text not null default 'new'
    check (status in (
      'new','contacted','qualified','proposal',
      'won','lost','follow_up'
    )),
  consent_given boolean not null default false,
  consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

`consent_at` must be populated whenever `consent_given = true`.

## 2.6 `clients`

``` sql
create table clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references outreach_leads(id) on delete set null,
  name text not null,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 2.7 `projects`

``` sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  niche_id text not null,
  design_id text not null,
  status text not null default 'in_progress',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 2.8 `analytics_events`

``` sql
create table analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null,
  niche_id text,
  design_id text,
  campaign_id uuid references campaigns(id) on delete set null,
  session_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index analytics_events_created_at_idx
  on analytics_events(created_at);

create index analytics_events_campaign_idx
  on analytics_events(campaign_id);

create index analytics_events_type_idx
  on analytics_events(event_type);
```

## 2.9 `admin_daily_summary`

``` sql
create table admin_daily_summary (
  id uuid primary key default gen_random_uuid(),
  summary_date date not null unique,
  new_leads_count integer not null default 0,
  campaigns_expired_count integer not null default 0,
  analytics_purged_count integer not null default 0,
  created_at timestamptz not null default now()
);
```

------------------------------------------------------------------------

# 3. Database Indexes

Required:

``` sql
create index campaigns_status_idx
  on campaigns(status);

create index campaigns_expires_at_idx
  on campaigns(expires_at);

create index campaign_overrides_campaign_niche_idx
  on campaign_overrides(campaign_id, niche_id);

create index leads_created_at_idx
  on outreach_leads(created_at);

create index leads_campaign_idx
  on outreach_leads(campaign_id);

create index leads_status_idx
  on outreach_leads(status);

create index projects_client_idx
  on projects(client_id);
```

------------------------------------------------------------------------

# 4. RLS: Exact Security Contract

Enable RLS on every application table:

``` sql
alter table profiles enable row level security;
alter table admin_users enable row level security;
alter table campaigns enable row level security;
alter table campaign_overrides enable row level security;
alter table outreach_leads enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table analytics_events enable row level security;
alter table admin_daily_summary enable row level security;
```

## 4.1 Admin function

Create a security-definer helper with a fixed `search_path`:

``` sql
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.id = auth.uid()
      and au.role in ('admin', 'owner')
  );
$$;
```

Revoke direct execution from anonymous callers as appropriate for the
deployment.

## 4.2 Admin policies

For private business tables:

``` sql
create policy "admin_full_campaigns"
on campaigns
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin_full_overrides"
on campaign_overrides
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin_full_leads"
on outreach_leads
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin_full_clients"
on clients
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin_full_projects"
on projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin_read_summary"
on admin_daily_summary
for select
to authenticated
using (public.is_admin());

create policy "admin_read_analytics"
on analytics_events
for select
to authenticated
using (public.is_admin());
```

## 4.3 Public analytics

If the analytics route uses the server service-role client, direct
browser insertion is not required.

Preferred contract:

``` text
Browser
→ /api/analytics
→ validation + rate limit
→ server Supabase client
→ analytics_events
```

Do not expose a privileged database key to the browser.

## 4.4 Lead insertion

Preferred contract:

``` text
Browser
→ /api/leads
→ validate + consent + rate limit
→ server authorization/validation
→ outreach_leads
```

Do not allow arbitrary browser writes to core business tables.

------------------------------------------------------------------------

# 5. Design Registry

`lib/design-registry.ts` contains all 60 records.

Example:

``` ts
export const designRegistry = [
  {
    id: "INT_01",
    nicheId: "INT",
    name: "Editorial Luxury Portfolio",
    moduleKey: "INT_01",
    active: true,
    sortOrder: 1,
    personalizationSlots: [
      "brandLabel",
      "businessName",
      "heroBusinessName",
      "footerBusinessName",
      "navigationBrand",
    ],
  },
  // ... all 60
] as const;
```

## Secure module loader

Do not interpolate a request directly into an import path.

``` ts
export const DESIGN_MODULES = {
  INT_01: () => import("@/designs/interior/INT_01"),
  // ...
  ECO_10: () => import("@/designs/ecommerce/ECO_10"),
} as const;
```

Resolver:

``` ts
const record = designRegistry.find(
  (item) => item.id === requestedId && item.active
);

if (!record) {
  notFound();
}

const loader = DESIGN_MODULES[record.id];

if (!loader) {
  notFound();
}

const module = await loader();
```

This keeps module resolution deterministic and prevents filesystem/path
traversal behavior.

------------------------------------------------------------------------

# 6. Personalization Resolver

Resolution order:

``` text
requested campaign
→ validate campaign code
→ load campaign
→ verify active + not expired
→ resolve requested niche
→ load campaign_overrides(campaign_id, niche_id)
→ apply only declared slots
→ fallback to default values
```

Pseudo-code:

``` ts
async function resolveCampaignPresentation(
  campaignCode: string,
  nicheId: NicheId
) {
  const campaign = await getCampaignByCode(campaignCode);

  if (!campaign || campaign.status !== "active") {
    return defaultPresentation();
  }

  if (campaign.expires_at && new Date(campaign.expires_at) <= new Date()) {
    return defaultPresentation();
  }

  const override = await getOverride(campaign.id, nicheId);

  return {
    campaignId: campaign.id,
    businessName: override?.business_name_override ?? DEFAULT_BUSINESS_NAME,
  };
}
```

Never allow a client-provided `expires_at` to influence this function.

------------------------------------------------------------------------

# 7. Lead Validation

Server-side validation must verify:

-   `business_name` length and allowed characters.
-   `niche_id` is one of the six canonical IDs.
-   `design_id` exists in the static registry.
-   `design_id` belongs to `niche_id`.
-   `intent` is `ready_made` or `custom`.
-   campaign ID exists if supplied.
-   campaign is valid for attribution.
-   requirements are size-limited.
-   reference URLs use safe URL schemes.
-   consent is true before lead persistence.
-   `consent_at` is written.

Never trust hidden form fields.

------------------------------------------------------------------------

# 8. Ready-Made Flow Implementation

``` text
Preview
→ Choose This Design
→ Lead Form
→ Consent
→ POST /api/leads
→ build message
→ WhatsApp
```

Minimum form:

``` text
Business Name
Phone (optional if not required by agency)
Optional short requirement
Consent checkbox
```

The selected design and intent are derived/validated server-side rather
than trusted solely from hidden fields.

------------------------------------------------------------------------

# 9. Custom Flow Implementation

Steps:

``` text
1. Business Information
2. Main Goal
3. Style Preferences
4. Reference Websites
5. Feature Requirements
6. Review
7. Consent
8. Save Lead
9. WhatsApp
```

AI can assist with wording/summarization, but the structured manual path
must always work.

------------------------------------------------------------------------

# 10. WhatsApp Message Builder

`lib/whatsapp.ts`:

``` ts
type WhatsAppContext = {
  businessName: string;
  nicheName: string;
  designId: string;
  designName: string;
  intent: "ready_made" | "custom";
};

export function buildWhatsAppMessage(ctx: WhatsAppContext) {
  return [
    "Hello Revntrix Team,",
    "",
    `Business: ${ctx.businessName}`,
    `Niche: ${ctx.nicheName}`,
    `Design: ${ctx.designId} — ${ctx.designName}`,
    `Intent: ${ctx.intent}`,
    "",
    "I would like to discuss this website.",
  ].join("\n");
}

export function buildWhatsAppUrl(
  number: string,
  message: string
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

Never include internal CRM information.

------------------------------------------------------------------------

# 11. Email Fallback

No email API is required for V1.

``` ts
export function buildMailtoUrl(
  email: string,
  subject: string,
  body: string
) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

Email fallback must be visible on every conversion surface.

------------------------------------------------------------------------

# 12. Copy Message Fallback

Use:

``` ts
navigator.clipboard.writeText(message)
```

If unavailable or denied:

``` text
Show selectable textarea containing the message.
```

Never trap the user in an error modal.

------------------------------------------------------------------------

# 13. Public Google OAuth

Use Supabase Auth Google provider.

Rules:

-   No Phone OTP code.
-   No SMS auth.
-   Public auth does not modify admin role.
-   Store/refresh session using the supported Supabase SSR approach.
-   A valid session suppresses the 90-second auth prompt.

The 90-second prompt should be implemented as a non-blocking UI event
and must not interrupt an active lead form or conversion.

------------------------------------------------------------------------

# 14. Admin Authentication

Admin flow:

``` text
/admin
→ Supabase email/password sign-in
→ server session check
→ admin_users lookup
→ role ∈ {admin, owner}
→ allow
```

Failure:

``` text
401/403
or safe redirect to public landing
```

Never implement:

``` ts
localStorage.role === "admin"
```

or any client-only equivalent.

------------------------------------------------------------------------

# 15. Campaign Admin Isolation

When saving an override:

``` text
campaign_id
+
selected niche_id
+
business_name_override
```

The API must update/insert only:

``` sql
(campaign_id, niche_id)
```

It must never execute a global campaign business-name replacement.

Test:

``` text
Save INT = Sharma Interiors
Open EST = default/demo
Open CLN = default/demo
Open JW  = default/demo
Open RES = default/demo
Open ECO = default/demo
```

Then save EST separately and verify both values coexist.

------------------------------------------------------------------------

# 16. Analytics Implementation

Events are fire-and-forget.

Recommended client pattern:

``` ts
function track(event: AnalyticsEvent) {
  try {
    const body = JSON.stringify(event);

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics",
        new Blob([body], { type: "application/json" })
      );
      return;
    }

    void fetch("/api/analytics", {
      method: "POST",
      body,
      keepalive: true,
      headers: { "content-type": "application/json" },
    }).catch(() => {});
  } catch {
    // Analytics must never block conversion.
  }
}
```

------------------------------------------------------------------------

# 17. Daily Maintenance

GitHub Actions workflow:

``` yaml
name: daily-maintenance

on:
  schedule:
    - cron: "0 2 * * *"
  workflow_dispatch:

jobs:
  maintenance:
    runs-on: ubuntu-latest
    steps:
      - name: Call maintenance endpoint
        run: |
          curl --fail-with-body \
            -H "Authorization: Bearer $CRON_SECRET" \
            "$APP_URL/api/cron/daily"
        env:
          CRON_SECRET: ${{ secrets.CRON_SECRET }}
          APP_URL: ${{ secrets.APP_URL }}
```

The endpoint must:

1.  Verify `CRON_SECRET`.
2.  Expire active campaigns where `expires_at <= now()`.
3.  Purge analytics older than 30 days.
4.  Calculate daily counts.
5.  Upsert `admin_daily_summary`.

The job is legitimate operational maintenance.

------------------------------------------------------------------------

# 18. AI Adapter

``` ts
export interface AIProvider {
  summarizeRequirements(input: string): Promise<string>;
  assistCustomOnboarding(input: string): AsyncIterable<string>;
}
```

Implementation:

``` text
AIProvider
  └── GeminiAdapter
```

Environment:

``` text
GEMINI_API_KEY
GEMINI_MODEL
```

The exact GA model must be verified immediately before
implementation/deployment.

Fallback:

``` text
AI unavailable
→ manual structured form
→ continue conversion
```

------------------------------------------------------------------------

# 19. Rate Limiting

Implement a lightweight server-side limiter.

Protect:

``` text
POST /api/leads
POST /api/analytics
POST /api/ai/onboarding
POST /api/campaign/*
POST /auth/*
```

Use:

-   request/IP window
-   payload size limits
-   duplicate submission prevention
-   optional reCAPTCHA verification

Do not introduce a paid rate-limit dependency as a core requirement.

------------------------------------------------------------------------

# 20. Unsafe Redirect Protection

Only permit explicitly supported destinations.

For WhatsApp:

``` text
https://wa.me/{configuredNumber}?text=...
```

For email:

``` text
mailto:{configuredSalesEmail}?...
```

Never redirect to a URL supplied directly by the user.

Reference website URLs submitted during Custom onboarding are stored as
data, not automatically navigated to.

------------------------------------------------------------------------

# 21. XSS Protection

Never render user input as HTML.

Avoid:

``` tsx
dangerouslySetInnerHTML={userInput}
```

Sanitize/escape:

-   business name
-   requirements
-   notes
-   campaign labels
-   AI output

Use a strict text-first content model.

------------------------------------------------------------------------

# 22. Error / Loading States

Every public design module must have:

``` text
loading
error
empty
```

states where relevant.

But error states must preserve catalog usability.

Example:

``` text
Design A fails
→ show isolated fallback
→ Design B/C/etc remain accessible
```

Database failure must show truthful feedback.

Never display:

``` text
Lead saved successfully
```

until persistence has actually succeeded.

------------------------------------------------------------------------

# 23. Accessibility

Minimum:

-   44×44px interactive target.
-   Keyboard accessibility where applicable.
-   Visible focus states.
-   Semantic headings.
-   Labels for form controls.
-   Accessible dialog/drawer behavior.
-   `prefers-reduced-motion`.
-   Sufficient contrast for gold/black theme.
-   Do not rely on color alone for state.

Use axe-core in automated QA.

------------------------------------------------------------------------

# 24. SEO / Metadata

Public pages should have:

-   meaningful title
-   description
-   canonical URL where appropriate
-   Open Graph metadata
-   correct niche/design naming

Do not expose private campaign information in global metadata.

Personalized business names should not accidentally create sensitive
indexing behavior.

------------------------------------------------------------------------

# 25. Testing Matrix

## Unit

Vitest:

-   design registry validation
-   niche/design relationship validation
-   personalization resolver
-   campaign expiry
-   WhatsApp builder
-   mailto builder
-   input validation
-   safe URL validation

## Component

React Testing Library:

-   shared Button
-   LeadForm
-   ConsentCheckbox
-   Gallery
-   Drawer
-   Tabs
-   Sticky CTA

## E2E

Playwright:

1.  Homepage → niche → design.
2.  Ready-Made → consent → lead → WhatsApp.
3.  Custom → all steps → consent → lead → WhatsApp.
4.  Email fallback.
5.  Copy Message fallback.
6.  Active campaign personalization.
7.  Cross-niche isolation.
8.  Expired campaign fallback.
9.  Public Google auth.
10. Unauthorized admin access.
11. Admin campaign creation.
12. Admin lead detail.
13. Mobile viewport.

## Security

Manual + automated:

-   XSS
-   IDOR
-   auth bypass
-   privilege escalation
-   unsafe redirects
-   secret exposure
-   rate-limit abuse
-   malformed IDs
-   invalid niche/design combinations

------------------------------------------------------------------------

# 26. CI/CD

`ci.yml`:

``` text
install
→ typecheck
→ lint
→ unit/component tests
→ production build
→ secret scan
→ Playwright mobile smoke tests
```

Production deploy is blocked on failed required checks.

Enable GitHub dependency/security alerts.

------------------------------------------------------------------------

# 27. Design Rollout

## Phase 1 --- Foundation

-   Next.js
-   Tailwind
-   Framer Motion
-   lucide-react
-   brand tokens
-   supplied logo
-   shared primitives
-   registry
-   secure loader map

## Phase 2 --- Data + Security

-   Supabase
-   schema
-   indexes
-   RLS
-   admin auth
-   public Google auth
-   validation

## Phase 3 --- Public Funnel

-   landing
-   niche catalog
-   design preview
-   campaign resolver
-   personalization

## Phase 4 --- Conversion

-   Ready-Made
-   Custom
-   consent
-   lead API
-   WhatsApp
-   email
-   clipboard
-   analytics

## Phase 5 --- Admin

-   dashboard
-   leads
-   campaigns
-   personalization
-   clients
-   projects
-   analytics

## Phase 6 --- Design Batches

### Batch 1

`INT_01–INT_10`

### Batch 2

`EST_01–EST_10` + `CLN_01–CLN_10`

### Batch 3

`JW_01–JW_10` + `RES_01–RES_10` + `ECO_01–ECO_10`

Each batch must pass its per-design acceptance checklist before the next
batch begins.

## Phase 7 --- Maintenance

-   daily GitHub Actions
-   analytics purge
-   campaign expiry
-   daily summary

## Phase 8 --- Final QA

-   mobile QA
-   accessibility
-   security
-   performance
-   fallback testing
-   production build

------------------------------------------------------------------------

# 28. Performance Budget

Target:

-   no initial load of all 60 design modules
-   design code split by module
-   images lazy-loaded where appropriate
-   no unnecessary realtime subscriptions
-   no heavy third-party analytics SDK
-   no unnecessary WebGL
-   reduced-motion path
-   lightweight thumbnails
-   shared primitives instead of duplicated component implementations

The final acceptance environment is a mid-tier Android profile on
throttled 4G.

------------------------------------------------------------------------

# 29. Environment Separation

Use separate environment values for:

``` text
local
preview
production
```

Never reuse production secrets in local development unnecessarily.

Required server-only values:

``` text
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
RECAPTCHA_SECRET_KEY
CRON_SECRET
```

Public:

``` text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
```

Sales email and WhatsApp number are configuration values, not security
credentials.

------------------------------------------------------------------------

# 30. Deployment Checklist

Before production:

-   [ ] All environment variables configured.
-   [ ] No secret in `NEXT_PUBLIC_*`.
-   [ ] Supabase schema migrated.
-   [ ] RLS enabled.
-   [ ] `is_admin()` verified.
-   [ ] Initial admin seeded deliberately.
-   [ ] Google OAuth configured.
-   [ ] Admin email/password tested.
-   [ ] WhatsApp number configured.
-   [ ] Sales email configured.
-   [ ] Privacy Policy published.
-   [ ] Consent tested.
-   [ ] Daily GitHub Action active.
-   [ ] Analytics purge verified.
-   [ ] Campaign expiry verified.
-   [ ] All 60 registry entries present.
-   [ ] Batch acceptance completed.
-   [ ] Mobile QA passed.
-   [ ] Security tests passed.
-   [ ] Production build passed.

------------------------------------------------------------------------

# 31. Technical Definition of Done

A feature is complete only if it satisfies:

``` text
Correctness
+
Security
+
Accessibility
+
Performance
+
Failure Handling
+
Mobile QA
```

A page that merely renders is not considered implemented.

------------------------------------------------------------------------

# 32. Antigravity Agent Hard Locks

1.  Do not invent additional niches.
2.  Do not reduce the catalog below 60.
3.  Do not rename stable design IDs.
4.  Do not use `RE_*`; use `EST_*`.
5.  Do not make design modules statically eager-load all 60.
6.  Do not accept raw user strings as import paths.
7.  Do not let one design import another design.
8.  Do not let designs import admin code.
9.  Do not use Phone/SMS OTP.
10. Public auth is Google OAuth only.
11. Admin auth is email/password plus server/database role verification.
12. Never trust client-side admin state.
13. Never trust client expiry values.
14. Never use campaign codes as authorization credentials.
15. Never perform global personalization replacement.
16. Never put internal CRM/security data into WhatsApp/email messages.
17. Never require AI for core conversion.
18. Never let analytics failure block conversion.
19. Never show fake success states.
20. Never store mandatory design raster assets in Supabase Storage.
21. Never require a paid asset/service for core V1 operation.
22. Never ship lorem ipsum in the delivered design demos.
23. Never ship decorative no-op interactions.
24. Never skip consent before lead persistence.
25. Never ship without mobile QA.
26. Never ship without security spot-checks.
27. Use the supplied Revntrix gold/black visual direction for the global
    shell and shared conversion UI.
28. Keep Gemini model configurable and re-verify availability before
    deployment.
29. Email fallback is `mailto:` in V1; do not add a mandatory email API.
30. Upgrade to Vercel Pro at the first signed client.
