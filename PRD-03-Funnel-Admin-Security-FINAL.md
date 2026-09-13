# Revntrix --- PRD 03: Funnel, Admin & Security

**Status:** Master Product Requirements Document --- Final Consolidated\
**Depends on:** PRD 01, PRD 02\
**Consumed by:** TRD

## 1. Public Funnel

``` text
Landing
  ↓
Niche
  ↓
10 Designs
  ↓
Design Preview
  ↓
Ready-Made OR Custom
  ↓
Lead Context
  ↓
Consent
  ↓
Save Lead
  ↓
WhatsApp
  ├── Email fallback
  └── Copy Message fallback
  ↓
Agency Sales Conversation
```

WhatsApp delivery must never be falsely claimed. A `wa.me` deep link
means the system attempted to hand off the conversation; it does not
prove delivery.

## 2. Direct Visitor Flow

Visitors can browse without immediate authentication:

``` text
Homepage
→ niche
→ designs
→ preview
→ Ready-Made / Custom
→ conversion
```

No login wall on initial browsing.

## 3. Outreach Flow

### Admin

``` text
Choose prospect
→ choose niche
→ enter business name
→ save campaign
→ generate share link
→ send link
```

### Prospect

``` text
/r/{campaignCode}
→ server campaign resolution
→ niche-specific personalization
→ 10 designs
→ Ready-Made / Custom
→ lead capture
→ WhatsApp
```

## 4. Personalization Isolation

A single campaign may contain multiple niche-specific overrides.

Example:

``` text
INT → Sharma Interiors
EST → Sharma Properties
RES → Sharma Kitchen
```

The active route's niche determines which override can be applied.

Database guarantee:

``` sql
UNIQUE (campaign_id, niche_id)
```

An INT override must never leak into EST, CLN, JW, RES or ECO.

## 5. Trust Framing

Personalized experiences must be presented honestly as previews/design
directions.

Approved pattern:

> I've prepared 10 design directions for {businessName} --- pick the one
> that fits, and we'll build it out properly from there.

Avoid claims that imply the preview was independently built from scratch
for the prospect.

Do not use fabricated:

-   ratings
-   awards
-   client counts
-   scarcity
-   countdowns
-   testimonials presented as real
-   performance claims

If testimonials are shown, label them **Sample Client Feedback** or
**Demo Feedback**.

## 6. Campaign Lifecycle

``` text
Draft → Active → Expired → Archived
```

Requirements:

-   Admin can manually deactivate/archive.
-   Expiry is determined by trusted server/database state.
-   Client cannot set expiry.
-   Expired campaigns remain functional.
-   Personalized business name falls back to default/demo branding after
    expiry.
-   Invalid campaign codes also fall back safely rather than exposing
    private data.

## 7. Ready-Made Conversion

``` text
Preview
→ Choose This Design
→ Lightweight Lead Form
→ Consent
→ Save Lead
→ WhatsApp
```

Minimum useful lead context:

-   business name
-   niche
-   selected design
-   design name
-   intent = `ready_made`
-   campaign ID where applicable
-   optional contact/requirements fields

## 8. Custom Conversion

Custom is a lightweight sales qualification flow, not a full website
builder.

``` text
Business Information
→ Main Goal
→ Style Preferences
→ Reference Websites
→ Feature Requirements
→ Review
→ Consent
→ Save Lead
→ WhatsApp
```

AI may assist but cannot be required.

If AI fails, the structured manual form remains available.

## 9. WhatsApp Handoff

Generate a human-readable message and encode it with
`encodeURIComponent`.

Example structure:

``` text
Hello Revntrix Team,

Business: {businessName}
Niche: {nicheName}
Design: {designId} — {designName}
Intent: {intent}

I would like to discuss this website.
```

Never include:

-   passwords
-   API keys
-   internal notes
-   private CRM fields
-   security tokens
-   hidden admin information

The WhatsApp number comes from public configuration.

## 10. Fallback Stack

Every conversion surface exposes:

1.  **WhatsApp**
2.  **Email (`mailto:`)**
3.  **Copy Message**

Clipboard fallback:

-   Use Clipboard API.
-   If permission is denied, show a selectable text area for manual
    copy.

No email-sending service is required for V1.

## 11. Lead Capture / Privacy

Every lead form must have an explicit consent checkpoint.

Example:

``` text
[ ] I agree to be contacted about this enquiry.
```

Store only information required for sales follow-up.

Required business fields are defined by the TRD schema.

A plain-language Privacy Policy must exist before launch.

## 12. Public Authentication

Public authentication is **Google OAuth only**.

Behavior:

``` text
Visitor enters site
→ browse freely
→ approximately 90 seconds of unauthenticated activity
→ Google OAuth prompt
```

Rules:

-   No Phone/SMS OTP.
-   Successful session persists.
-   Valid session suppresses the prompt.
-   Public auth never grants admin access.

The exact prompt mechanism must avoid interrupting an active form
submission or conversion action.

## 13. Admin Authentication

Admin authentication is separate from public authentication.

Required:

-   Supabase Auth email + password.
-   Server-side session verification.
-   User must exist in allowlisted `admin_users`.
-   Role must be `admin` or `owner`.
-   Public Google users cannot become admins merely by authenticating.
-   Do not trust localStorage roles, URL roles or hidden UI.

Admin bootstrap:

-   Seed the first admin deliberately.
-   Do not auto-promote arbitrary authenticated users.
-   `ADMIN_BOOTSTRAP_EMAIL` may identify the intended initial operator
    but must not replace server-side authorization.

## 14. Admin Information Architecture

``` text
Admin
├── Dashboard
├── Leads
├── Clients
├── Projects
├── Outreach
│   ├── Campaigns
│   ├── Personalization
│   └── Links
├── Analytics
└── Settings
```

Dashboard:

-   New Leads
-   Active Campaigns
-   Ready-Made Interest
-   Custom Interest
-   WhatsApp Clicks
-   Active Personalized Links
-   Recent Activity

## 15. Lead Management

Required capabilities:

-   search
-   pagination
-   filters
-   status updates
-   detail view
-   campaign attribution
-   selected design
-   niche
-   intent
-   date

Statuses:

``` text
new
contacted
qualified
proposal
won
lost
follow_up
```

Lead detail may include:

-   business
-   niche
-   design
-   intent
-   campaign
-   requirements
-   stored contact information
-   timeline
-   admin notes
-   status

Private lead information is never public.

## 16. Campaign Management

Admin can:

-   create campaign
-   choose prospect/client
-   select niche
-   set business name
-   set duration
-   activate
-   generate/copy link
-   edit niche-specific override
-   deactivate
-   archive

The UI must make niche isolation obvious.

Saving an EST override must visibly operate only on EST.

## 17. Client / Project Flow

``` text
Lead → Client → Project
```

A project may contain:

``` text
clientId
nicheId
designId
status
notes
createdAt
updatedAt
```

The system does not auto-publish the final production website.

## 18. Analytics

Required events:

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

Analytics are private, stored in Supabase, and never block conversion.

## 19. Security Architecture

Security is enforced at:

``` text
Browser
   +
Server/API
   +
Database/RLS
```

The browser is never an authority.

Never trust:

-   hidden buttons
-   localStorage roles
-   client admin flags
-   client expiry values
-   campaign code as a credential
-   client ownership claims
-   client-provided authorization headers

The server owns:

-   authorization
-   protected writes
-   validation
-   campaign resolution
-   personalization validity
-   lead creation
-   admin operations
-   sensitive configuration
-   AI calls
-   expiry decisions

## 20. XSS / Input Safety

Treat all user-controlled fields as untrusted:

-   business name
-   requirements
-   notes
-   reference URLs
-   campaign labels
-   AI output

Render text by default.

Do not use arbitrary `dangerouslySetInnerHTML`.

Reference URLs must be validated before use.

## 21. IDOR Protection

Explicitly test:

``` text
/r/{anotherCampaign}
 /admin/leads/{anotherLead}
 /api/campaign/{anotherId}
```

Changing an identifier must never grant unauthorized access.

Campaign codes are lookup identifiers, not permissions.

## 22. Rate Limiting

Protect:

-   public lead submissions
-   repeated form submissions
-   campaign creation
-   expensive DB operations
-   AI endpoint
-   public analytics ingestion
-   authentication attempts

Use lightweight server-side limits and, if enabled, reCAPTCHA v3 on
public lead forms.

Do not make the whole application dependent on one third-party
rate-limit provider.

## 23. Failure Handling

  Failure                   Required behavior
  ------------------------- -----------------------------------------
  Design module failure     Isolate failure; catalog remains usable
  Analytics failure         Continue conversion
  AI failure                Switch to manual form
  Personalization failure   Default/demo content
  Expired campaign          Default/demo content
  WhatsApp blocked          Email + Copy Message
  Clipboard denied          Selectable text area
  DB failure                Truthful error; never fake success
  Unauthorized admin        401/403 or safe redirect

## 24. Mobile Requirements

-   Public funnel mobile-first.
-   Admin mobile-first.
-   44×44px minimum target.
-   Mid-tier Android verification.
-   Throttled 4G verification.
-   Reduced-motion support.
-   No initial loading of all 60 designs.

## 25. Final Acceptance

Complete only when:

-   backend works
-   public Google auth works
-   admin email/password works
-   sessions persist correctly
-   RLS is active
-   admin authorization is enforced
-   campaign links resolve
-   niche personalization is isolated
-   expiry fallback works
-   all 60 designs render
-   designs are materially distinct
-   interactions work
-   mobile QA passes
-   consent works
-   WhatsApp works
-   email fallback works
-   Copy Message works
-   privacy page exists
-   security tests pass
-   production build passes

## LOCKS

-   **P3.01** WhatsApp is primary; email + Copy Message are mandatory
    fallbacks.
-   **P3.02** Ready-Made and Custom are separate paths.
-   **P3.03** WhatsApp message context is encoded.
-   **P3.04** No private/internal data in outbound payloads.
-   **P3.05** No false WhatsApp delivery claims.
-   **P3.06** Public browsing has no immediate login wall.
-   **P3.07** Auth prompt is approximately 90 seconds.
-   **P3.08** Public auth = Google OAuth only.
-   **P3.09** Public auth never grants admin.
-   **P3.10** Admin = email/password + server/database authorization.
-   **P3.11** Niche personalization is isolated.
-   **P3.12** Expired personalization safely falls back.
-   **P3.13** AI/analytics never block conversion.
-   **P3.14** No fake trust signals.
-   **P3.15** Personalized pages are previews/directions.
-   **P3.16** Consent checkpoint is mandatory.
-   **P3.17** Security testing is mandatory.
-   **P3.18** Secrets remain server-side.
-   **P3.19** Mobile is primary.
