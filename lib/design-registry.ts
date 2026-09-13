// ============================================================================
// Revntrix — Design Registry
// Source of truth for all 60 design records (6 niches × 10 designs)
// This is immutable application metadata, NOT database content.
// ============================================================================

export type NicheId = "INT" | "CLN" | "EST" | "JW" | "RES" | "ECO";

export type DesignDNA = {
  designId: string;
  nicheId: NicheId;
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

export type DesignRecord = {
  id: string;
  nicheId: NicheId;
  name: string;
  description: string;
  designDNA: DesignDNA;
  referenceResearch: string[];
  moduleKey: string;
  active: boolean;
  sortOrder: number;
  personalizationSlots: string[];
};

// ── Niche Metadata ──
export const NICHES = {
  INT: { id: "INT" as const, name: "Interior Designer", slug: "interior", icon: "Palette" },
  CLN: { id: "CLN" as const, name: "Clinic / Doctor", slug: "clinic", icon: "Stethoscope" },
  EST: { id: "EST" as const, name: "Real Estate", slug: "realestate", icon: "Building2" },
  JW:  { id: "JW"  as const, name: "Jewellers", slug: "jewellers", icon: "Gem" },
  RES: { id: "RES" as const, name: "Restaurant", slug: "restaurant", icon: "UtensilsCrossed" },
  ECO: { id: "ECO" as const, name: "E-commerce", slug: "ecommerce", icon: "ShoppingBag" },
} as const;

export const NICHE_IDS: NicheId[] = ["INT", "CLN", "EST", "JW", "RES", "ECO"];

// Default personalization slots used by most designs
const DEFAULT_SLOTS = [
  "brandLabel",
  "businessName",
  "heroBusinessName",
  "footerBusinessName",
  "navigationBrand",
];

// ── Helper to create a DesignRecord with defaults ──
function createDesign(
  id: string,
  nicheId: NicheId,
  name: string,
  description: string,
  coreConcept: string,
  visualDirection: string,
  layoutStrategy: string,
  sortOrder: number,
  extraDNA?: Partial<DesignDNA>
): DesignRecord {
  return {
    id,
    nicheId,
    name,
    description,
    moduleKey: id,
    active: true,
    sortOrder,
    personalizationSlots: DEFAULT_SLOTS,
    referenceResearch: [
      `${name} — structural pattern analysis`,
      `${name} — typography and spacing study`,
      `${name} — conversion mechanism research`,
    ],
    designDNA: {
      designId: id,
      nicheId,
      name,
      references: [],
      coreConcept,
      visualDirection,
      layoutStrategy,
      typographyDirection: "Modern sans-serif hierarchy with clear scale",
      imageryStrategy: "CSS gradients, SVG patterns, and curated free-license imagery",
      interactionStrategy: "Micro-interactions with purposeful feedback",
      motionStrategy: "Entrance reveals and hover transitions, reduced-motion safe",
      conversionStrategy: "Persistent CTA with WhatsApp primary handoff",
      responsiveStrategy: "Mobile-first with progressive min-width enhancements",
      performanceNotes: "Code-split, lazy-loaded images, minimal bundle",
      ...extraDNA,
    },
  };
}

// ============================================================================
// INTERIOR DESIGNER — INT_01 through INT_10
// ============================================================================

const interiorDesigns: DesignRecord[] = [
  createDesign("INT_01", "INT", "Editorial Luxury Portfolio",
    "Full-bleed imagery with project-first storytelling and restrained navigation for high-end interior studios.",
    "Editorial luxury with project-first narrative",
    "Dark backgrounds, full-bleed imagery, gold accents",
    "Full-width hero → project grid → detail overlays", 1),
  createDesign("INT_02", "INT", "Guided Design Discovery",
    "Style and category selection journey that guides visitors through curated design collections.",
    "Guided discovery through style preferences",
    "Warm neutrals, category cards, soft transitions",
    "Style quiz → filtered results → detail pages", 2),
  createDesign("INT_03", "INT", "Avant-Garde Architecture",
    "Asymmetric grid with oversized type and controlled motion for bold architectural studios.",
    "Asymmetric modernism with bold typography",
    "High contrast, oversized headings, geometric accents",
    "Asymmetric grid → type-driven sections → portfolio", 3),
  createDesign("INT_04", "INT", "Visual 3D Design Showcase",
    "Before/after transformation story with visual sliders and immersive room walkthroughs.",
    "Transformation storytelling through before/after reveals",
    "Split-screen comparisons, subtle depth layers",
    "Hero slider → before/after → room gallery → CTA", 4),
  createDesign("INT_05", "INT", "One-Page Conversion Portfolio",
    "Compact single-page experience optimized for quick enquiries with persistent contact CTA.",
    "Compact conversion-optimized single page",
    "Clean white space, accent colors, minimal sections",
    "Hero → portfolio strip → services → testimonials → form", 5),
  createDesign("INT_06", "INT", "Architectural Case Study",
    "Challenge → concept → materials → execution → result narrative for detail-oriented studios.",
    "Narrative case study format",
    "Editorial layout, process photography, timeline feel",
    "Challenge → concept → materials → execution → results", 6),
  createDesign("INT_07", "INT", "Warm Residential Story",
    "Room discovery with designer story for warm, approachable residential interior practices.",
    "Warmth and approachability through room discovery",
    "Warm tones, lifestyle imagery, friendly typography",
    "Room categories → designer bio → project stories → contact", 7),
  createDesign("INT_08", "INT", "Designer Personal Brand",
    "Bio, philosophy, work, and contact focused on the individual designer's personal brand.",
    "Personal brand authority and philosophy",
    "Portrait-centric, minimal palette, signature typography",
    "Bio hero → philosophy → curated work → press → contact", 8),
  createDesign("INT_09", "INT", "Gallery-First Minimal",
    "Large gallery with restrained typography for studios that let the work speak for itself.",
    "Gallery-dominant with maximum visual impact",
    "Near-zero chrome, large images, whisper-thin type",
    "Full-screen gallery → minimal captions → contact overlay", 9),
  createDesign("INT_10", "INT", "Premium Lead-Focused Studio",
    "Process, proof, and persistent CTA for studios focused on lead generation and conversion.",
    "Lead generation through trust and process proof",
    "Professional, trust signals, process icons, gold CTAs",
    "Hero → process steps → portfolio proof → testimonials → sticky CTA", 10),
];

// ============================================================================
// CLINIC / DOCTOR — CLN_01 through CLN_10
// ============================================================================

const clinicDesigns: DesignRecord[] = [
  createDesign("CLN_01", "CLN", "High-Trust Medical Center",
    "Institutional trust with comprehensive services directory and doctor profiles.",
    "Institutional trust and medical authority",
    "Clean whites, medical blue accents, trust badges",
    "Hero → services grid → doctor profiles → insurance → contact", 1),
  createDesign("CLN_02", "CLN", "Modern Digital Clinic",
    "Digital-first service discovery with prominent appointment CTA and modern aesthetics.",
    "Digital-first healthcare discovery",
    "Modern gradients, card-based services, vibrant accents",
    "Service cards → appointment CTA → doctor carousel → FAQ", 2),
  createDesign("CLN_03", "CLN", "Specialist Doctor Profile",
    "Doctor-first authority with credentials, publications, and professional expertise showcase.",
    "Individual specialist authority and credentials",
    "Portrait-centric, academic feel, credential badges",
    "Doctor hero → credentials → specializations → publications → book", 3),
  createDesign("CLN_04", "CLN", "Dental Results Experience",
    "Results-led visual journey showcasing dental transformations and patient outcomes.",
    "Results-driven visual proof",
    "Before/after sliders, bright smile imagery, trust signals",
    "Results gallery → treatments → before/after → testimonials → CTA", 4),
  createDesign("CLN_05", "CLN", "Multi-Doctor Clinic Directory",
    "Specialist profiles with filters for multi-practitioner clinics and medical centers.",
    "Directory-style specialist discovery",
    "Grid of doctor cards, specialty filters, search",
    "Search → specialty filters → doctor cards → detail → book", 5),
  createDesign("CLN_06", "CLN", "Family / Pediatric Clinic",
    "Family-friendly design with accessible information and warm, reassuring aesthetics.",
    "Family-first warmth and accessibility",
    "Soft colors, illustrations, friendly typography",
    "Welcome hero → family services → pediatric focus → health tips → contact", 6),
  createDesign("CLN_07", "CLN", "Appointment-First Clinic",
    "Minimal-friction appointment-style flow with booking as the primary interaction.",
    "Appointment-driven minimal friction",
    "Clean, step-based form, calendar-style elements",
    "Book now hero → service selection → date/time → confirmation", 7),
  createDesign("CLN_08", "CLN", "Premium Specialist Practice",
    "Procedures and outcomes focused design for premium medical specialties.",
    "Premium specialist procedure showcase",
    "Dark premium theme, procedure cards, outcome stats",
    "Procedure hero → technique details → outcomes → credentials → consult", 8),
  createDesign("CLN_09", "CLN", "Wellness + Medical Practice",
    "Empathy combined with structured factual information for holistic health practices.",
    "Holistic wellness meets clinical trust",
    "Nature tones, wellness imagery, balanced layout",
    "Wellness hero → services → approach → team → testimonials → contact", 9),
  createDesign("CLN_10", "CLN", "Compact Local Doctor Webapp",
    "Local clarity with FAQs and contact for neighborhood clinics and family doctors.",
    "Local accessibility and quick contact",
    "Compact layout, map integration style, FAQ accordion",
    "Location hero → services → hours → FAQ → directions → call", 10),
];

// ============================================================================
// REAL ESTATE — EST_01 through EST_10 (never RE_*)
// ============================================================================

const realEstateDesigns: DesignRecord[] = [
  createDesign("EST_01", "EST", "Luxury Property Editorial",
    "Cinematic hero with agent story for luxury real estate brands and premium property showcase.",
    "Cinematic luxury property narrative",
    "Dark cinematic, large property imagery, gold accents",
    "Cinematic hero → featured listings → agent story → testimonials → contact", 1),
  createDesign("EST_02", "EST", "Property Discovery Engine",
    "Search-first filters with WhatsApp lead capture for property discovery platforms.",
    "Search-driven property discovery",
    "Clean interface, filter sidebar, card grid",
    "Search bar → filters → property cards → detail → WhatsApp lead", 2),
  createDesign("EST_03", "EST", "Visual Listing Experience",
    "Gallery, facts, and amenities focused design for individual property showcases.",
    "Visual-first property details",
    "Gallery-dominant, facts sidebar, amenity icons",
    "Photo gallery → key facts → amenities → floor plan → enquiry", 3),
  createDesign("EST_04", "EST", "Hyperlocal Broker",
    "Neighbourhood trust with agent profile for local real estate professionals.",
    "Hyperlocal trust and neighborhood expertise",
    "Map-style hero, neighborhood cards, agent profile",
    "Neighborhood hero → area guide → listings → agent bio → contact", 4),
  createDesign("EST_05", "EST", "Mobile Property Matrix",
    "Mobile-first dense cards for property browsing optimized for on-the-go discovery.",
    "Mobile-optimized dense property browsing",
    "Compact cards, swipe interactions, quick filters",
    "Filter bar → dense card grid → quick view → detail → enquiry", 5),
  createDesign("EST_06", "EST", "Map + Listing Explorer",
    "Map-centric synced discovery with interactive map and listing sidebar.",
    "Map-centric property exploration",
    "Split map/list view, pin interactions, synced hover",
    "Interactive map → listing sidebar → detail overlay → enquiry", 6),
  createDesign("EST_07", "EST", "New Launch Experience",
    "Launch storytelling with floor plans for new property developments and projects.",
    "New development launch storytelling",
    "Hero video/image, floor plan viewer, pricing tiers",
    "Launch hero → concept story → floor plans → pricing → register interest", 7),
  createDesign("EST_08", "EST", "Agent Personal Brand",
    "Sold portfolio and expertise showcase for individual real estate agents.",
    "Agent-centric personal branding",
    "Professional portrait, sold statistics, portfolio",
    "Agent hero → sold portfolio → expertise → testimonials → contact", 8),
  createDesign("EST_09", "EST", "Investment Property Explorer",
    "Price and location hierarchy for investment-focused property discovery.",
    "Investment-focused property analysis",
    "Data-rich cards, price/location hierarchy, comparison",
    "Investment hero → property comparison → area analysis → calculator → enquiry", 9),
  createDesign("EST_10", "EST", "Lead Recovery Property Webapp",
    "Contact capture before WhatsApp for lead recovery and re-engagement campaigns.",
    "Lead capture optimized property funnel",
    "Form-first, minimal distractions, trust elements",
    "Value prop → lead form → property preview → WhatsApp handoff", 10),
];

// ============================================================================
// JEWELLERS — JW_01 through JW_10
// ============================================================================

const jewellersDesigns: DesignRecord[] = [
  createDesign("JW_01", "JW", "Heritage Luxury",
    "Heritage and campaign imagery for traditional luxury jewellery houses.",
    "Heritage luxury with campaign-driven storytelling",
    "Rich golds, ornate patterns, campaign photography",
    "Campaign hero → heritage story → collections → featured pieces → CTA", 1),
  createDesign("JW_02", "JW", "Modern Minimal Catalogue",
    "Clean direct-to-consumer discovery for contemporary jewellery brands.",
    "Modern minimalism for contemporary jewellery",
    "White space, clean product photography, subtle animations",
    "Category nav → product grid → quick view → detail → enquiry", 2),
  createDesign("JW_03", "JW", "Editorial Jewellery Story",
    "Campaign → story → collection → CTA narrative for editorial jewellery brands.",
    "Editorial storytelling through collection narratives",
    "Magazine-style layouts, storytelling sections, campaign feel",
    "Campaign spread → story → collection → lookbook → CTA", 3),
  createDesign("JW_04", "JW", "Cinematic Diamond Experience",
    "Dark cinematic presentation for diamond and premium stone jewellery.",
    "Dark cinematic diamond presentation",
    "Deep blacks, sparkle effects, dramatic lighting",
    "Cinematic hero → diamond showcase → craftsmanship → collection → enquiry", 4),
  createDesign("JW_05", "JW", "Indian Bridal Jewellery",
    "Indian wedding heritage with bridal collection focus and cultural aesthetics.",
    "Indian bridal heritage and celebration",
    "Rich reds and golds, ornamental borders, bridal imagery",
    "Bridal hero → collection categories → bridal sets → customization → contact", 5),
  createDesign("JW_06", "JW", "Gemstone Discovery",
    "Gemstone education and discovery with interactive exploration.",
    "Educational gemstone exploration",
    "Jewel-tone accents, educational cards, interactive elements",
    "Gemstone hero → stone types → education → collection → consultation", 6),
  createDesign("JW_07", "JW", "Craftsmanship Story",
    "Design → materials → craft narrative for artisanal jewellery makers.",
    "Artisanal craftsmanship narrative",
    "Workshop imagery, process photography, earthy tones",
    "Craft hero → design process → materials → finished pieces → commission", 7),
  createDesign("JW_08", "JW", "High-Fashion Collection",
    "Seasonal campaign catalogue for fashion-forward jewellery brands.",
    "Fashion-forward seasonal collections",
    "Editorial fashion feel, seasonal colors, lookbook style",
    "Season campaign → runway/editorial → collection → pieces → pre-order", 8),
  createDesign("JW_09", "JW", "Diamond Consultation",
    "Guided comparison for diamond selection and engagement ring consultation.",
    "Guided diamond selection and comparison",
    "Clean comparison UI, specifications, guided steps",
    "Diamond hero → shape selection → comparison → specification → consultation", 9),
  createDesign("JW_10", "JW", "Premium Indian Jewellery Catalogue",
    "Indian identity combined with modern UX for premium jewellery catalogues.",
    "Indian identity meets modern digital catalogue",
    "Traditional motifs, modern grid, cultural color palette",
    "Heritage hero → categories → collection grid → detail → WhatsApp enquiry", 10),
];

// ============================================================================
// RESTAURANT — RES_01 through RES_10
// ============================================================================

const restaurantDesigns: DesignRecord[] = [
  createDesign("RES_01", "RES", "Fine Dining Immersive",
    "Philosophy, menu, and reservation for premium fine dining establishments.",
    "Immersive fine dining atmosphere",
    "Dark elegance, food photography, ambient lighting feel",
    "Atmospheric hero → philosophy → menu highlights → chef → reservation", 1),
  createDesign("RES_02", "RES", "Fast Conversion Restaurant",
    "Action-first ordering with minimal friction for quick-service restaurants.",
    "Action-first quick ordering",
    "Bold colors, large food imagery, prominent CTAs",
    "Food hero → menu categories → popular items → order/reserve → contact", 2),
  createDesign("RES_03", "RES", "Modern Organic Restaurant",
    "Ingredients and philosophy for farm-to-table and organic dining concepts.",
    "Organic philosophy and ingredient storytelling",
    "Earth tones, ingredient photography, natural textures",
    "Farm hero → philosophy → seasonal menu → ingredients → reserve", 3),
  createDesign("RES_04", "RES", "Interactive Menu Webapp",
    "Menu-first with dietary information and interactive filtering.",
    "Interactive digital menu experience",
    "Clean menu UI, dietary badges, category tabs",
    "Menu search → category tabs → items with dietary info → detail → order", 4),
  createDesign("RES_05", "RES", "Retro Restaurant",
    "Nostalgic brand experience for vintage-themed restaurants and diners.",
    "Nostalgic retro brand experience",
    "Vintage colors, retro typography, nostalgic imagery",
    "Retro hero → signature dishes → history → menu → visit", 5),
  createDesign("RES_06", "RES", "Premium Indian Restaurant",
    "Cultural and premium hospitality for Indian fine dining restaurants.",
    "Cultural premium Indian dining",
    "Rich spice colors, cultural motifs, premium feel",
    "Cultural hero → cuisine story → menu → chef profile → reservation", 6),
  createDesign("RES_07", "RES", "Café Discovery",
    "Casual signature-item discovery for cafés and coffee shops.",
    "Casual café discovery and signature items",
    "Warm coffee tones, cozy imagery, relaxed typography",
    "Café hero → signature items → menu → ambiance gallery → visit", 7),
  createDesign("RES_08", "RES", "Food Storytelling",
    "Ingredient-to-dish story for restaurants with a strong culinary narrative.",
    "Ingredient-to-plate culinary narrative",
    "Process photography, rich food imagery, story sections",
    "Ingredient hero → sourcing → preparation → dish → chef → reserve", 8),
  createDesign("RES_09", "RES", "Multi-Location Restaurant",
    "Location selector and network for restaurant chains and multi-location brands.",
    "Multi-location restaurant network",
    "Location cards, map integration style, unified brand",
    "Location selector → branch details → shared menu → events → contact", 9),
  createDesign("RES_10", "RES", "Local Restaurant Lead Funnel",
    "Discover → reserve → WhatsApp funnel for local restaurants and eateries.",
    "Local discovery to WhatsApp reservation",
    "Local feel, food gallery, simple reservation flow",
    "Food hero → highlights → menu preview → gallery → WhatsApp reserve", 10),
];

// ============================================================================
// E-COMMERCE — ECO_01 through ECO_10
// ============================================================================

const ecommerceDesigns: DesignRecord[] = [
  createDesign("ECO_01", "ECO", "D2C Performance Store",
    "Sticky cart with strong hero for direct-to-consumer performance brands.",
    "High-performance D2C conversion store",
    "Bold hero, product-centric, sticky cart, strong CTAs",
    "Product hero → features → social proof → variants → sticky cart", 1),
  createDesign("ECO_02", "ECO", "Fashion Editorial Store",
    "Asymmetric editorial layout for fashion and lifestyle e-commerce brands.",
    "Editorial fashion commerce",
    "Asymmetric layouts, campaign imagery, editorial typography",
    "Editorial hero → lookbook → collection grid → product detail → cart", 2),
  createDesign("ECO_03", "ECO", "Product Storytelling Store",
    "Features, specs, and visuals for product-focused e-commerce experiences.",
    "Product story through features and specifications",
    "Feature sections, specification tables, visual demonstrations",
    "Product hero → feature deep-dive → specs → comparisons → buy", 3),
  createDesign("ECO_04", "ECO", "Guided Product Finder",
    "Preference-based recommendation for e-commerce stores with varied product ranges.",
    "Guided product recommendation",
    "Quiz-style flow, preference cards, recommendation results",
    "Preference quiz → filtered results → recommended products → detail → cart", 4),
  createDesign("ECO_05", "ECO", "High-Density Marketplace",
    "Search, filters, and dense cards for marketplace-style e-commerce platforms.",
    "Dense marketplace browsing",
    "Compact cards, faceted filters, search-first",
    "Search → filter sidebar → dense product grid → quick view → cart", 5),
  createDesign("ECO_06", "ECO", "Lifestyle Commerce",
    "Campaign story → catalogue for lifestyle and aspirational e-commerce brands.",
    "Lifestyle-driven commerce storytelling",
    "Lifestyle imagery, campaign narratives, curated collections",
    "Campaign hero → lifestyle story → curated collection → product → cart", 6),
  createDesign("ECO_07", "ECO", "Creative Marketplace",
    "Masonry/grid discovery for creative and artisanal product marketplaces.",
    "Creative discovery through masonry grid",
    "Masonry grid, creator profiles, varied card sizes",
    "Discovery grid → creator spotlight → product detail → cart", 7),
  createDesign("ECO_08", "ECO", "Beauty Variant Store",
    "Swatches and variant selection for beauty and cosmetics e-commerce.",
    "Beauty-focused variant exploration",
    "Swatch selectors, shade comparisons, beauty imagery",
    "Product hero → shade selector → swatches → reviews → cart", 8),
  createDesign("ECO_09", "ECO", "Visual Home Commerce",
    "Room → hotspot → product for home décor and furniture e-commerce.",
    "Room-based visual product discovery",
    "Room photography, interactive hotspots, product popups",
    "Room hero → hotspot exploration → product detail → room builder → cart", 9),
  createDesign("ECO_10", "ECO", "Subscription Commerce",
    "Guided recurring-purchase concept for subscription box and membership commerce.",
    "Subscription-driven recurring commerce",
    "Plan comparison cards, benefit highlights, commitment flow",
    "Subscription hero → plan comparison → customization → benefits → subscribe", 10),
];

// ============================================================================
// Combined Registry — Exactly 60 Designs
// ============================================================================

export const designRegistry: readonly DesignRecord[] = [
  ...interiorDesigns,
  ...clinicDesigns,
  ...realEstateDesigns,
  ...jewellersDesigns,
  ...restaurantDesigns,
  ...ecommerceDesigns,
] as const;

// ── Lookup Helpers ──

export function getDesignById(id: string): DesignRecord | undefined {
  return designRegistry.find((d) => d.id === id && d.active);
}

export function getDesignsByNiche(nicheId: NicheId): DesignRecord[] {
  return designRegistry
    .filter((d) => d.nicheId === nicheId && d.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getNicheBySlug(slug: string) {
  return Object.values(NICHES).find((n) => n.slug === slug);
}

export function getAllNiches() {
  return Object.values(NICHES);
}

// ── Validation ──

export function isValidNicheId(id: string): id is NicheId {
  return NICHE_IDS.includes(id as NicheId);
}

export function isValidDesignId(id: string): boolean {
  return designRegistry.some((d) => d.id === id);
}

export function designBelongsToNiche(designId: string, nicheId: string): boolean {
  return designRegistry.some((d) => d.id === designId && d.nicheId === nicheId);
}
