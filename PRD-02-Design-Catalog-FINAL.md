# Revntrix --- PRD 02: 60-Design Catalog

**Status:** Master Product Requirements Document --- Final Consolidated\
**Depends on:** PRD 01\
**Consumed by:** PRD 03, TRD

## 1. Purpose

Define exactly 60 client-facing design experiences, their Design DNA,
interaction expectations, personalization compatibility and acceptance
criteria.

These are **showcase/preview experiences**, not production websites.

## 2. Catalog Formula

**6 niches × 10 designs = exactly 60.**

  Niche               IDs
  ------------------- ----------------
  Interior Designer   INT_01--INT_10
  Clinic/Doctor       CLN_01--CLN_10
  Real Estate         EST_01--EST_10
  Jewellers           JW_01--JW_10
  Restaurant          RES_01--RES_10
  E-commerce          ECO_01--ECO_10

`EST` is the only canonical Real Estate prefix. Never use `RE`.

## 3. Originality Standard

Research references are pattern inputs only.

Extract:

-   structural strengths
-   information architecture
-   typography relationships
-   interaction patterns
-   conversion mechanisms
-   mobile behavior
-   storytelling techniques

Then remove proprietary identity and synthesize original Design DNA.

Never copy:

-   logos
-   source code
-   exact layouts
-   proprietary imagery
-   proprietary copywriting
-   brand identity

A color/font/logo/image swap is never enough to qualify as a new design.

## 4. Full Design Matrix

### Interior Designer

  -----------------------------------------------------------------------
  ID                      Name                    Core DNA
  ----------------------- ----------------------- -----------------------
  INT_01                  Editorial Luxury        Full-bleed imagery,
                          Portfolio               project-first
                                                  storytelling,
                                                  restrained navigation

  INT_02                  Guided Design Discovery Style/category
                                                  selection journey

  INT_03                  Avant-Garde             Asymmetric grid,
                          Architecture            oversized type,
                                                  controlled motion

  INT_04                  Visual 3D Design        Before/after
                          Showcase                transformation story

  INT_05                  One-Page Conversion     Compact single-page
                          Portfolio               enquiry experience

  INT_06                  Architectural Case      Challenge → concept →
                          Study                   materials → execution →
                                                  result

  INT_07                  Warm Residential Story  Room discovery +
                                                  designer story

  INT_08                  Designer Personal Brand Bio, philosophy, work,
                                                  contact

  INT_09                  Gallery-First Minimal   Large gallery,
                                                  restrained typography

  INT_10                  Premium Lead-Focused    Process, proof,
                          Studio                  persistent CTA
  -----------------------------------------------------------------------

### Clinic / Doctor

  -----------------------------------------------------------------------
  ID                      Name                    Core DNA
  ----------------------- ----------------------- -----------------------
  CLN_01                  High-Trust Medical      Institutional trust,
                          Center                  services, doctors

  CLN_02                  Modern Digital Clinic   Digital-first service
                                                  discovery, appointment
                                                  CTA

  CLN_03                  Specialist Doctor       Doctor-first authority
                          Profile                 and credentials

  CLN_04                  Dental Results          Results-led visual
                          Experience              journey

  CLN_05                  Multi-Doctor Clinic     Specialist profiles and
                          Directory               filters

  CLN_06                  Family / Pediatric      Family-friendly,
                          Clinic                  accessible information

  CLN_07                  Appointment-First       Minimal-friction
                          Clinic                  appointment-style flow

  CLN_08                  Premium Specialist      Procedures and outcomes
                          Practice                

  CLN_09                  Wellness + Medical      Empathy + structured
                          Practice                factual information

  CLN_10                  Compact Local Doctor    Local clarity, FAQs,
                          Webapp                  contact
  -----------------------------------------------------------------------

### Real Estate

  -----------------------------------------------------------------------
  ID                      Name                    Core DNA
  ----------------------- ----------------------- -----------------------
  EST_01                  Luxury Property         Cinematic hero, agent
                          Editorial               story

  EST_02                  Property Discovery      Search-first filters,
                          Engine                  WhatsApp lead

  EST_03                  Visual Listing          Gallery, facts,
                          Experience              amenities

  EST_04                  Hyperlocal Broker       Neighbourhood trust,
                                                  agent profile

  EST_05                  Mobile Property Matrix  Mobile-first dense
                                                  cards

  EST_06                  Map + Listing Explorer  Map-centric synced
                                                  discovery

  EST_07                  New Launch Experience   Launch storytelling,
                                                  floor plans

  EST_08                  Agent Personal Brand    Sold portfolio,
                                                  expertise

  EST_09                  Investment Property     Price/location
                          Explorer                hierarchy; only
                                                  client-provided claims

  EST_10                  Lead Recovery Property  Contact capture before
                          Webapp                  WhatsApp
  -----------------------------------------------------------------------

### Jewellers

  -----------------------------------------------------------------------
  ID                      Name                    Core DNA
  ----------------------- ----------------------- -----------------------
  JW_01                   Heritage Luxury         Heritage and campaign
                                                  imagery

  JW_02                   Modern Minimal          Clean DTC discovery
                          Catalogue               

  JW_03                   Editorial Jewellery     Campaign → story →
                          Story                   collection → CTA

  JW_04                   Cinematic Diamond       Dark cinematic
                          Experience              presentation

  JW_05                   Indian Bridal Jewellery Indian wedding heritage

  JW_06                   Gemstone Discovery      Gemstone education and
                                                  discovery

  JW_07                   Craftsmanship Story     Design → materials →
                                                  craft

  JW_08                   High-Fashion Collection Seasonal campaign
                                                  catalogue

  JW_09                   Diamond Consultation    Guided comparison

  JW_10                   Premium Indian          Indian identity +
                          Jewellery Catalogue     modern UX
  -----------------------------------------------------------------------

### Restaurant

  -----------------------------------------------------------------------
  ID                      Name                    Core DNA
  ----------------------- ----------------------- -----------------------
  RES_01                  Fine Dining Immersive   Philosophy, menu,
                                                  reservation

  RES_02                  Fast Conversion         Action-first ordering
                          Restaurant              

  RES_03                  Modern Organic          Ingredients and
                          Restaurant              philosophy

  RES_04                  Interactive Menu Webapp Menu-first, dietary
                                                  information

  RES_05                  Retro Restaurant        Nostalgic brand
                                                  experience

  RES_06                  Premium Indian          Cultural + premium
                          Restaurant              hospitality

  RES_07                  Café Discovery          Casual signature-item
                                                  discovery

  RES_08                  Food Storytelling       Ingredient-to-dish
                                                  story

  RES_09                  Multi-Location          Location selector and
                          Restaurant              network

  RES_10                  Local Restaurant Lead   Discover → reserve →
                          Funnel                  WhatsApp
  -----------------------------------------------------------------------

### E-commerce

  ID       Name                         Core DNA
  -------- ---------------------------- -----------------------------------
  ECO_01   D2C Performance Store        Sticky cart, strong hero
  ECO_02   Fashion Editorial Store      Asymmetric editorial layout
  ECO_03   Product Storytelling Store   Features, specs, visuals
  ECO_04   Guided Product Finder        Preference-based recommendation
  ECO_05   High-Density Marketplace     Search, filters, dense cards
  ECO_06   Lifestyle Commerce           Campaign story → catalogue
  ECO_07   Creative Marketplace         Masonry/grid discovery
  ECO_08   Beauty Variant Store         Swatches and variant selection
  ECO_09   Visual Home Commerce         Room → hotspot → product
  ECO_10   Subscription Commerce        Guided recurring-purchase concept

## 5. Design DNA Contract

``` ts
type DesignDNA = {
  designId: string;
  nicheId: string;
  name: string;
  references: string[];
  coreConcept: string;
  visualDirection: string;
  layoutStrategy: string;
  typographyDirection: string;
  imageryStrategy: string;
  interactionStrategy: string;
  motionStrategy: string;
  conversionStrategy: string;
  responsiveStrategy: string;
  performanceNotes: string;
};
```

Each design record must also contain:

``` ts
type DesignRecord = {
  id: string;
  nicheId: string;
  name: string;
  description: string;
  designDNA: DesignDNA;
  referenceResearch: string[];
  moduleKey: string;
  active: boolean;
  sortOrder: number;
  personalizationSlots: string[];
};
```

## 6. Semi-Functional Demo Standard

Every design must feel like a real website concept.

Examples:

-   **Real Estate:** 2--4 sample properties, working filter
    interactions, property detail.
-   **Restaurant:** working menu categories and sample dishes.
-   **Jewellers:** working gallery and variant interactions.
-   **E-commerce:** working product selection/cart drawer where the
    concept requires it.
-   **Clinic:** appointment-style step flow where implied by the DNA.
-   **Interior:** gallery, project filtering or case-study transitions
    where implied.

### No-op rule

A visible interactive control cannot simply do nothing.

If a design implies:

-   navigation drawer
-   tabs
-   accordions
-   filter
-   gallery/carousel
-   product variant selection
-   appointment-style flow
-   cart/drawer
-   enquiry form
-   CTA transition

then the interaction must execute real client-side logic against
placeholder/demo data.

## 7. Content Standard

Every design ships with authored placeholder/demo content.

Do not use lorem ipsum.

Content must look realistic enough to demonstrate the design, while
clearly remaining sample/demo content where factual claims could
otherwise be misleading.

## 8. Personalization

Allowed temporary campaign overrides must use explicit slots only.

Typical slots:

``` text
brandLabel
businessName
heroBusinessName
footerBusinessName
navigationBrand
```

No global string replacement.

Example:

``` text
Default: Studio Aurora
Campaign override: Sharma Interiors
```

The same campaign may have:

``` text
INT → Sharma Interiors
EST → Sharma Properties
RES → Sharma Kitchen
```

An INT override must never appear in EST/RES/etc.

## 9. Mobile Contract

Build order:

1.  Mobile first.
2.  Finalize mobile behavior.
3.  Add tablet/desktop via progressive `min-width` rules.

Explicitly design mobile behavior for:

-   navigation
-   grids
-   galleries
-   typography
-   CTA placement
-   forms
-   cards
-   sticky actions
-   drawers/modals
-   media

Minimum target: **44×44px**.

## 10. Motion Contract

Allowed:

-   page entrance
-   section reveal
-   hover/tap feedback
-   image transitions
-   modal transitions
-   tab transitions
-   restrained scroll-linked storytelling

Avoid:

-   constant looping motion
-   reading-blocking animation
-   excessive parallax
-   unnecessary WebGL
-   stacked heavy effects

Respect `prefers-reduced-motion`.

## 11. Shared Primitive Strategy

Common components belong in `/components/shared`.

Examples:

``` text
Button
IconButton
Section
Container
Heading
Card
Badge
Gallery
Carousel
Tabs
Accordion
Drawer
Modal
Input
Textarea
Select
Checkbox
StickyCTA
LeadForm
```

Do not copy/paste the same component into 60 modules.

## 12. Brand Integration

The supplied Revntrix logo is used by the global showcase shell and
agency conversion UI.

Individual designs may have their own visual identity because material
difference is required. However:

-   outer Revntrix navigation should remain recognizable;
-   shared CTA/funnel surfaces should use the Revntrix gold/black token
    system;
-   accessibility contrast must be maintained;
-   gold should be used as an accent, not as the only text color on
    light backgrounds.

## 13. Asset Strategy

Free-first hybrid:

-   CSS/SVG/original assets first.
-   Free-license imagery where necessary.
-   No paid asset dependency.
-   No proprietary asset scraping.
-   ≤5 raster images/design.
-   WebP preferred.
-   Approximately 20--80KB/image where practical.
-   Images in `/public/designs/...`.

## 14. Rollout

### Batch 1 --- 10 designs

`INT_01–INT_10`

### Batch 2 --- 20 designs

`EST_01–EST_10`\
`CLN_01–CLN_10`

### Batch 3 --- 30 designs

`JW_01–JW_10`\
`RES_01–RES_10`\
`ECO_01–ECO_10`

A batch must pass acceptance before the next batch begins.

## 15. Per-Design Acceptance

-   [ ] Stable ID registered.
-   [ ] Public name exists.
-   [ ] Three research references documented.
-   [ ] Design DNA complete.
-   [ ] Materially distinct from the other 9 designs in its niche.
-   [ ] All implied interactions work.
-   [ ] Authored demo content; no lorem ipsum.
-   [ ] Mobile-first implementation verified.
-   [ ] 44×44px interactive targets.
-   [ ] Personalization slots declared and tested.
-   [ ] ≤5 raster images.
-   [ ] Dynamic loading works.
-   [ ] No cross-design imports.
-   [ ] No admin dependency.
-   [ ] Reduced-motion behavior works.
-   [ ] Build remains clean.

## LOCKS

-   **L2.01** Exactly 60 designs.
-   **L2.02** IDs are immutable.
-   **L2.03** `EST` is canonical for Real Estate.
-   **L2.04** Research references are inputs, not assets to copy.
-   **L2.05** Palette/font/logo/image swaps do not create a new design.
-   **L2.06** Every design is semi-functional.
-   **L2.07** No decorative no-op interactions.
-   **L2.08** No lorem ipsum in delivered demos.
-   **L2.09** Personalization uses explicit slots only.
-   **L2.10** Shared primitives are mandatory.
-   **L2.11** Mobile-first is mandatory.
-   **L2.12** Rollout is batch-based.
