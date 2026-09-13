"use client";

import React, { useState } from "react";
import {
  Flame,
  Utensils,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Wine,
  Sparkles,
  Award,
  ChevronRight,
  Check,
  Star,
  Users,
  Info,
  X,
  ArrowRight,
  Compass,
  Heart,
  MessageCircle,
} from "lucide-react";

interface DishItem {
  id: string;
  name: string;
  category: "starters" | "mains" | "desserts" | "drinks";
  description: string;
  price: string;
  dietary?: ("GF" | "VG" | "DF" | "Signature")[];
  pairing?: string;
  provenance?: string;
  visualColor: string;
}

interface RES01Props {
  businessName?: string;
  location?: string;
  phone?: string;
  whatsapp?: string;
  headline?: string;
  description?: string;
  primaryCTA?: string;
}

const SIGNATURE_DISHES: DishItem[] = [
  {
    id: "dish-1",
    name: "Charred Spanish Carabineros",
    category: "starters",
    description: "Binchotan-grilled jumbo scarlet red prawns, sea buckthorn emulsion, smoked garlic oil, wild sea fennel crisp.",
    price: "$38",
    dietary: ["GF", "DF", "Signature"],
    pairing: "2022 Domaine Sigalas Assyrtiko, Santorini",
    provenance: "Wild-caught off the coast of Huelva, Spain",
    visualColor: "linear-gradient(135deg, #2D140C 0%, #4A1E11 50%, #1A0B07 100%)",
  },
  {
    id: "dish-2",
    name: "Miyazaki A5 Wagyu Rib Cap",
    category: "mains",
    description: "Wood-fired over Japanese white oak, 45-day dry-aged bone marrow emulsion, glazed wild pine morels, charred shallot jus.",
    price: "$78",
    dietary: ["GF", "Signature"],
    pairing: "2018 Giacomo Conterno Barolo Francia",
    provenance: "Miyazaki Prefecture, 100% Fullblood Kuroge Washu",
    visualColor: "linear-gradient(135deg, #2A1711 0%, #3D1F16 50%, #150B08 100%)",
  },
  {
    id: "dish-3",
    name: "Smoked Burrata & Black Mission Figs",
    category: "starters",
    description: "Artisanal hand-tied burrata smoked with applewood, wood-roasted heirloom figs, 25-year aged Modena balsamic caviar, toasted pistachio oil.",
    price: "$26",
    dietary: ["GF", "VG"],
    pairing: "2021 Occhipinti SP68 Bianco, Sicily",
    provenance: "Organic Jersey cow milk, Puglia, Italy",
    visualColor: "linear-gradient(135deg, #221D18 0%, #382F26 50%, #14110E 100%)",
  },
  {
    id: "dish-4",
    name: "Ember-Baked Wild Turbot",
    category: "mains",
    description: "Whole turbot baked on fig leaves over open embers, saffron vin jaune velouté, sea herbs, crispy sunchoke scales.",
    price: "$64",
    dietary: ["GF", "Signature"],
    pairing: "2020 Domaine Jean Macle Côtes du Jura",
    provenance: "Day-boat caught, Brittany Atlantic coast",
    visualColor: "linear-gradient(135deg, #1C2322 0%, #2A3634 50%, #101514 100%)",
  },
  {
    id: "dish-5",
    name: "Smoked Guanaja Chocolate Torte",
    category: "desserts",
    description: "70% single-origin dark chocolate smoked with cherrywood coals, salted tahini caramel, roasted macadamia milk gelato.",
    price: "$20",
    dietary: ["VG", "Signature"],
    pairing: "Rare Blandy's 10-Year Malmsey Madeira",
    provenance: "Wild harvest cocoa, Valrhona single parcel",
    visualColor: "linear-gradient(135deg, #261713 0%, #3B211A 50%, #120A08 100%)",
  },
  {
    id: "dish-6",
    name: "Torched Blood Orange Pavlova",
    category: "desserts",
    description: "Crisp hazelnut meringue, charcoal-flamed Sicilian blood orange curd, sheep's milk chantilly, garden verbena oil.",
    price: "$18",
    dietary: ["GF", "VG"],
    pairing: "2021 Kracher Trockenbeerenauslese, Austria",
    provenance: "Mount Etna volcanic citrus groves",
    visualColor: "linear-gradient(135deg, #2E1B15 0%, #47271E 50%, #160D0A 100%)",
  },
  {
    id: "dish-7",
    name: "The Binchotan Old Fashioned",
    category: "drinks",
    description: "Charcoal-filtered Japanese malt whisky, smoked fig leaf syrup, charred orange bitters, hand-carved ice sphere.",
    price: "$24",
    dietary: ["VG", "DF", "Signature"],
    pairing: "Chef's savory bar snacks",
    provenance: "Hakushu distillery barrel aged",
    visualColor: "linear-gradient(135deg, #2F1E14 0%, #4D2D1B 50%, #170E09 100%)",
  },
  {
    id: "dish-8",
    name: "Wild Ferment Bergamot Spritz",
    category: "drinks",
    description: "House-fermented green gooseberry pét-nat, Calabrian bergamot, gentian root aperitif, sparkling spring water.",
    price: "$19",
    dietary: ["VG", "DF"],
    pairing: "Raw shellfish & cured crudos",
    provenance: "Wild botanicals foraged in Kent",
    visualColor: "linear-gradient(135deg, #24221A 0%, #383425 50%, #13120E 100%)",
  },
];

const REVIEWS = [
  {
    author: "Eleanor Vance",
    source: "The Michelin Guide Inspector Note",
    rating: 5,
    quote:
      "Maison Ember elevates open-flame cooking to absolute poetry. The control over temperature across the dual hearths produces textures in seafood and wild game rarely achieved in European gastronomy.",
  },
  {
    author: "Marcus Aurelius Sterling",
    source: "World's 50 Best Discovery",
    rating: 5,
    quote:
      "The counter seating offers front-row immersion into culinary mastery. The Miyazaki Wagyu with smoked morel glaze is worth crossing continents for.",
  },
  {
    author: "Sophie Laurent",
    source: "British GQ Food & Travel",
    rating: 5,
    quote:
      "A subterranean wine vault of unmatched natural and biodynamic depth paired with precise, smoky elegance in every course. An essential modern dining institution.",
  },
];

export default function RES_01Design({
  businessName = "Maison Ember",
  location = "42 Berkeley Square, Mayfair, London",
  phone = "+44 (0)20 7946 0812",
  whatsapp = "+447946081200",
  headline = "Where Heritage Fire Meets Contemporary Gastronomy",
  description = "An intimate 38-seat dining room and hearth counter dedicated to whole-animal wood-fired cooking, regeneratively farmed produce, and low-intervention natural wines.",
  primaryCTA = "Reserve a Table",
}: RES01Props) {
  const [activeMenuCategory, setActiveMenuCategory] = useState<"all" | "starters" | "mains" | "desserts" | "drinks">("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "GF" | "VG">("all");
  const [inspectedDish, setInspectedDish] = useState<DishItem | null>(null);

  // Reservation Demo State
  const [resDate, setResDate] = useState("2026-09-18");
  const [resTime, setResTime] = useState("19:30");
  const [resGuests, setResGuests] = useState(2);
  const [resArea, setResArea] = useState<"counter" | "dining" | "vault">("counter");
  const [resName, setResName] = useState("");
  const [resContact, setResContact] = useState("");
  const [resSubmitted, setResSubmitted] = useState(false);

  const filteredMenu = SIGNATURE_DISHES.filter((dish) => {
    const matchesCategory = activeMenuCategory === "all" || dish.category === activeMenuCategory;
    const matchesDietary =
      dietaryFilter === "all" || (dish.dietary && dish.dietary.includes(dietaryFilter));
    return matchesCategory && matchesDietary;
  });

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResSubmitted(true);
  };

  return (
    <div className="bg-[#0F0D0B] text-[#F7F4EE] min-h-screen font-sans selection:bg-[#D97736] selection:text-white antialiased">
      {/* =========================================================================
          1. HEADER & RESTAURANT NAVIGATION
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#0F0D0B]/90 backdrop-blur-md border-b border-[#26201B] px-6 sm:px-12 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#241A14] border border-[#D97736]/40 flex items-center justify-center text-[#D97736]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-serif font-medium tracking-[0.2em] uppercase text-[#F7F4EE] block leading-none">
                {businessName}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#A89F91] uppercase">
                Wood Fire Atelier & Natural Cellar
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest text-[#B5ABA0] uppercase">
            <a href="#about" className="hover:text-[#D97736] transition-colors">
              The Atelier
            </a>
            <a href="#dishes" className="hover:text-[#D97736] transition-colors">
              Signatures
            </a>
            <a href="#menu" className="hover:text-[#D97736] transition-colors">
              Seasonal Menu
            </a>
            <a href="#craft" className="hover:text-[#D97736] transition-colors">
              Fire Craft
            </a>
            <a href="#chef" className="hover:text-[#D97736] transition-colors">
              Culinary Directors
            </a>
            <a href="#location" className="hover:text-[#D97736] transition-colors">
              Hours & Location
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#A89F91] hidden sm:block">
              London • Mayfair
            </span>
            <a
              href="#reservation"
              className="px-5 py-2.5 bg-[#D97736] text-[#0F0D0B] font-mono text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#E89D67] transition-all shadow-md"
            >
              {primaryCTA}
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. EDITORIAL HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-between p-6 sm:p-12 md:p-16 border-b border-[#26201B] overflow-hidden">
        {/* Ambient Warm Charcoal Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18130F] via-[#0F0D0B] to-[#0A0807] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D97736]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F1813] border border-[#3D2C20] text-xs font-mono text-[#D97736]">
            <Award className="w-3.5 h-3.5 text-[#E89D67]" />
            <span>Michelin Guide 2026 Recommended • Two Rosettes</span>
          </div>
          <div className="text-xs font-mono text-[#8C8377] flex items-center gap-4">
            <span>Seating: 38 Guests Only</span>
            <span>•</span>
            <span>Tasting & À La Carte</span>
          </div>
        </div>

        {/* Central Asymmetric Editorial Headline & Food Visual Composition */}
        <div className="relative z-10 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#D97736] font-semibold">
              Seasonal Degustation & Live Hearth
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-[#F7F4EE] leading-[1.08]">
              {headline}
            </h1>
            <p className="text-sm sm:text-base text-[#B5ABA0] max-w-xl font-light leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#reservation"
                className="px-6 py-3.5 bg-[#D97736] text-[#0F0D0B] font-mono text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#E89D67] transition-all flex items-center gap-2 shadow-lg"
              >
                <span>{primaryCTA}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#menu"
                className="px-6 py-3.5 bg-[#1F1813] border border-[#3D2C20] text-[#F7F4EE] font-mono text-xs uppercase tracking-wider font-semibold rounded hover:border-[#D97736] transition-all"
              >
                Explore Current Menu
              </a>
            </div>
          </div>

          {/* Large Editorial Food Visual Art Piece */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-8 border border-[#3D2C20] bg-gradient-to-br from-[#261711] via-[#1A100B] to-[#0E0907] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D97736]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start mb-12 relative z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-black/60 rounded border border-white/10 text-[#E89D67]">
                  Chef's Highlight
                </span>
                <span className="text-xs font-mono text-white/70">
                  Course IV
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D97736]">
                  Miyazaki A5 Wagyu • 45-Day Dry Aged
                </span>
                <h3 className="text-2xl font-serif text-[#F7F4EE]">
                  Wood-Fired Rib Cap with Glazed Morels
                </h3>
                <p className="text-xs text-[#B5ABA0] font-light leading-relaxed">
                  Cooked over binchotan embers at 950°C, basted in fermented black garlic butter, and served with reduced shallot jus.
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#E89D67]">Wine: 2018 Barolo Francia</span>
                  <span className="text-white font-bold">$78</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Strip */}
        <div className="relative z-10 pt-6 border-t border-[#26201B] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8C8377]">
          <div className="flex items-center gap-6">
            <span>Binchotan Charcoal Hearth</span>
            <span>•</span>
            <span>Whole-Animal Butchery</span>
            <span>•</span>
            <span>350+ Natural Wines</span>
          </div>
          <a href="#about" className="inline-flex items-center gap-1 text-[#D97736] hover:text-[#E89D67]">
            <span>Discover The Philosophy</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED DISHES SECTION
          ========================================================================= */}
      <section id="dishes" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#26201B]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
              Autumn & Winter 2026 Collection
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F4EE] mt-2">
              Signature Hearth Creations
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#A89F91] max-w-md font-light leading-relaxed">
            Every dish is designed around the alchemy of wood smoke, raw mineral acidity, and seasonal harvests from independent regenerative farms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNATURE_DISHES.slice(0, 4).map((dish) => (
            <div
              key={dish.id}
              onClick={() => setInspectedDish(dish)}
              className="cursor-pointer group rounded-2xl bg-[#171310] border border-[#2B211A] hover:border-[#D97736]/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div
                className="h-44 rounded-xl p-5 flex flex-col justify-between mb-5 relative overflow-hidden"
                style={{ background: dish.visualColor }}
              >
                <div className="flex justify-between items-start z-10">
                  <div className="flex gap-1">
                    {dish.dietary?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 text-white/90 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E89D67] bg-black/70 px-2.5 py-1 rounded">
                    {dish.price}
                  </span>
                </div>
                <div className="z-10 bg-black/60 backdrop-blur-sm p-2.5 rounded-lg border border-white/10">
                  <span className="text-[10px] font-mono text-[#D97736] uppercase block">
                    {dish.provenance}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-serif text-[#F7F4EE] group-hover:text-[#D97736] transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs text-[#A89F91] font-light leading-relaxed line-clamp-3">
                  {dish.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#26201B] flex items-center justify-between text-xs font-mono text-[#D97736]">
                <span>Inspect Pairing</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. RESTAURANT STORY & THE TWO FIRES
          ========================================================================= */}
      <section id="about" className="py-24 px-6 sm:px-12 bg-[#14100D] border-y border-[#26201B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
              The Maison Ember Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F4EE] leading-tight">
              Two fires, six elemental ingredients, infinite depth.
            </h2>
            <p className="text-sm font-sans text-[#B5ABA0] font-light leading-relaxed">
              Founded in 2021 by Chef Julien Vane and Sommelier Sophie Laurent, Maison Ember was born from a desire to strip away molecular distraction in favor of raw, primal craft.
            </p>
            <p className="text-sm font-sans text-[#B5ABA0] font-light leading-relaxed">
              Our kitchen features two custom-engineered open brick hearths fueled by sustainable British sweet chestnut and high-density Kishu Binchotan. We never use gas, microwaves, or electric ovens — every drop of oil, every crust of bread, and every cut of wild meat touches live flame.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#26201B] text-center">
              <div className="p-4 rounded-xl bg-[#1A1410] border border-[#2E221A]">
                <span className="text-2xl font-serif text-[#D97736] block">1,000°C</span>
                <span className="text-[10px] font-mono text-[#8C8377] uppercase">Hearth Heat</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1410] border border-[#2E221A]">
                <span className="text-2xl font-serif text-[#D97736] block">100%</span>
                <span className="text-[10px] font-mono text-[#8C8377] uppercase">Wild / Organic</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1A1410] border border-[#2E221A]">
                <span className="text-2xl font-serif text-[#D97736] block">38</span>
                <span className="text-[10px] font-mono text-[#8C8377] uppercase">Seats Nightly</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#1A1410] border border-[#2E221A] flex flex-col gap-3">
              <Flame className="w-6 h-6 text-[#D97736]" />
              <h3 className="text-base font-serif text-[#F7F4EE]">Binchotan Coal Purity</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                Slow-carbonized oak creates odorless, smokeless infrared heat that crisps exterior collagen while locking in juices.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1A1410] border border-[#2E221A] flex flex-col gap-3">
              <Wine className="w-6 h-6 text-[#D97736]" />
              <h3 className="text-base font-serif text-[#F7F4EE]">Low-Intervention Wines</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                Biodynamic vintages produced without synthetic sulfites, perfectly paired with the caramelized sugars of open-fire grilling.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#1A1410] border border-[#2E221A] flex flex-col gap-3 sm:col-span-2">
              <Sparkles className="w-6 h-6 text-[#D97736]" />
              <h3 className="text-base font-serif text-[#F7F4EE]">Zero-Waste Fermentation Vault</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                Vegetable trimmings, shellfish shells, and fruit peels are fermented into house garums, amino pastes, and vinegars that season our tasting menu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SEASONAL MENU SECTION
          ========================================================================= */}
      <section id="menu" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#26201B]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
              Interactive Menu Catalogue
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F4EE] mt-2">
              The Seasonal Tasting & À La Carte
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Dietary Filter */}
            <div className="flex items-center gap-2 bg-[#171310] p-1.5 rounded-lg border border-[#2E221A] text-xs font-mono">
              <span className="text-[#8C8377] px-2">Filter:</span>
              <button
                type="button"
                onClick={() => setDietaryFilter("all")}
                className={`px-3 py-1.5 rounded transition-all ${
                  dietaryFilter === "all" ? "bg-[#D97736] text-[#0F0D0B] font-bold" : "text-[#B5ABA0]"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter("GF")}
                className={`px-3 py-1.5 rounded transition-all ${
                  dietaryFilter === "GF" ? "bg-[#D97736] text-[#0F0D0B] font-bold" : "text-[#B5ABA0]"
                }`}
              >
                Gluten-Free
              </button>
              <button
                type="button"
                onClick={() => setDietaryFilter("VG")}
                className={`px-3 py-1.5 rounded transition-all ${
                  dietaryFilter === "VG" ? "bg-[#D97736] text-[#0F0D0B] font-bold" : "text-[#B5ABA0]"
                }`}
              >
                Vegetarian
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "Full Menu (8)" },
            { id: "starters", label: "Starters & Raw" },
            { id: "mains", label: "Mains from the Hearth" },
            { id: "desserts", label: "Smoked Sweets" },
            { id: "drinks", label: "Cellar Cocktails" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveMenuCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all min-h-[44px] ${
                activeMenuCategory === cat.id
                  ? "bg-[#F7F4EE] text-[#0F0D0B] font-bold shadow-md"
                  : "bg-[#171310] border border-[#2B211A] text-[#A89F91] hover:text-[#F7F4EE]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              onClick={() => setInspectedDish(item)}
              className="cursor-pointer p-6 rounded-2xl bg-[#171310] border border-[#2B211A] hover:border-[#D97736]/60 flex flex-col justify-between transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="text-lg font-serif text-[#F7F4EE] hover:text-[#D97736] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-sm font-mono font-bold text-[#E89D67] flex-shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs text-[#A89F91] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#26201B] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex gap-1.5">
                  {item.dietary?.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded bg-[#241A14] text-[#D97736] border border-[#3D2C20]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="text-[#8C8377] italic font-serif">
                  Pairing: {item.pairing?.split(",")[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. THE CRAFT & WHY US
          ========================================================================= */}
      <section id="craft" className="py-24 px-6 sm:px-12 bg-[#120E0B] border-y border-[#26201B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
              Pillars of Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F4EE] mt-2">
              The Maison Ember Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-[#171310] border border-[#2E221A] flex flex-col gap-4">
              <span className="text-2xl font-serif text-[#D97736]">01</span>
              <h3 className="text-lg font-serif text-[#F7F4EE]">Same-Day Harvest</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                Vegetables harvested at 5:00 AM from four regenerative partner farms in Sussex arrive at our kitchen by noon.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#171310] border border-[#2E221A] flex flex-col gap-4">
              <span className="text-2xl font-serif text-[#D97736]">02</span>
              <h3 className="text-lg font-serif text-[#F7F4EE]">Whole-Animal Respect</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                We purchase whole carcasses directly from independent heritage-breed farmers and dry-age everything in our on-site vault.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#171310] border border-[#2E221A] flex flex-col gap-4">
              <span className="text-2xl font-serif text-[#D97736]">03</span>
              <h3 className="text-lg font-serif text-[#F7F4EE]">Live Culinary Theater</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                Watch our kitchen brigade orchestrate embers, pans, and charcoal spits without walls separating dinner from craft.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#171310] border border-[#2E221A] flex flex-col gap-4">
              <span className="text-2xl font-serif text-[#D97736]">04</span>
              <h3 className="text-lg font-serif text-[#F7F4EE]">Sommelier Guidance</h3>
              <p className="text-xs text-[#8C8377] leading-relaxed">
                Personalized wine storytelling tailored to your chosen courses, uncovering rare small-batch winemakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CULINARY DIRECTORS & CHEF SECTION
          ========================================================================= */}
      <section id="chef" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="h-96 rounded-2xl bg-gradient-to-br from-[#2D1B13] via-[#1F120D] to-[#120B07] border border-[#3D2C20] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-black/60 rounded border border-white/10 text-[#D97736]">
                  Executive Culinary Direction
                </span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E89D67]">
                  Chef Julien Vane & Chef Kenji Takahashi
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F4EE] mt-1">
                  Mastery Over The Flame
                </h3>
                <p className="text-xs text-[#A89F91] mt-2 font-light">
                  Formerly of L’Astrance (Paris) & Kikunoi Honten (Kyoto).
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
              The Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#F7F4EE]">
              "Fire is not just heat; it is an ingredient with its own aroma, moisture, and character."
            </h2>
            <p className="text-sm font-sans text-[#B5ABA0] font-light leading-relaxed">
              Chef Julien Vane spent over fifteen years working in classical Parisian three-star dining rooms before training in Kyoto under master charcoal artisans. Alongside co-culinary director Kenji Takahashi, they created Maison Ember to synthesize French saucing rigor with Japanese charcoal precision.
            </p>
            <p className="text-sm font-sans text-[#B5ABA0] font-light leading-relaxed">
              Every staff member in our kitchen is trained in thermal wood management, butchery, and wine pairing to ensure a unified dining vision from first sip to final dessert.
            </p>

            <div className="pt-4 border-t border-[#26201B] flex items-center gap-6 text-xs font-mono text-[#8C8377]">
              <span>Gault & Millau 3 Toques</span>
              <span>•</span>
              <span>National Sommelier of the Year 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. INTERACTIVE TABLE RESERVATION SECTION
          ========================================================================= */}
      <section id="reservation" className="py-24 px-6 sm:px-12 bg-[#171310] border-t border-[#26201B]">
        <div className="max-w-4xl mx-auto bg-[#0F0D0B] rounded-3xl p-8 sm:p-12 md:p-16 border border-[#2E221A] shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
              Table Bookings & Tasting Counter
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F7F4EE] mt-2">
              Reserve Your Experience
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#B5ABA0] mt-2 font-light">
              Reservations release 30 days in advance at midnight. For parties larger than 8, please contact our private hire concierge.
            </p>
          </div>

          {resSubmitted ? (
            <div className="p-10 text-center flex flex-col items-center gap-4 bg-[#1A1410] rounded-2xl border border-[#D97736]/40">
              <div className="w-12 h-12 rounded-full bg-[#D97736]/20 text-[#D97736] flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-[#F7F4EE]">
                Reservation Request Recorded
              </h3>
              <p className="text-xs text-[#B5ABA0] max-w-md leading-relaxed font-sans">
                Thank you, <strong className="text-white">{resName}</strong>. We have saved your booking request for <strong className="text-white">{resGuests} Guests</strong> on <strong className="text-white">{resDate} at {resTime}</strong> ({resArea === "counter" ? "Hearth Counter" : resArea === "dining" ? "Main Dining Room" : "Private Wine Vault"}).
              </p>
              <span className="text-[11px] font-mono text-[#D97736]">
                Demo Mode: Confirmation SMS/Email simulated for preview.
              </span>
              <button
                type="button"
                onClick={() => setResSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#D97736] text-[#0F0D0B] text-xs font-mono uppercase tracking-wider rounded font-bold hover:bg-[#E89D67]"
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleReservationSubmit} className="flex flex-col gap-8">
              {/* Seating Area Selection */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
                  1. Select Seating Atmosphere:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "counter", name: "Chef's Hearth Counter", desc: "Front-row live fire interaction" },
                    { id: "dining", name: "Main Dining Room", desc: "Intimate banquette seating" },
                    { id: "vault", name: "Sommelier Wine Vault", desc: "Private cellar room (up to 8)" },
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setResArea(area.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all min-h-[44px] ${
                        resArea === area.id
                          ? "bg-[#241A14] border-[#D97736] text-white shadow-sm"
                          : "bg-[#14100D] border-[#2B211A] text-[#8C8377] hover:border-[#3D2C20]"
                      }`}
                    >
                      <h4 className="text-xs font-mono font-bold text-[#F7F4EE]">{area.name}</h4>
                      <p className="text-[10px] text-[#8C8377] mt-1">{area.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Time & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#A89F91]">Date</label>
                  <input
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    required
                    className="p-3.5 rounded-xl bg-[#14100D] border border-[#2B211A] text-xs font-mono text-[#F7F4EE] focus:outline-none focus:border-[#D97736] min-h-[44px]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#A89F91]">Time Slot</label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="p-3.5 rounded-xl bg-[#14100D] border border-[#2B211A] text-xs font-mono text-[#F7F4EE] focus:outline-none focus:border-[#D97736] min-h-[44px]"
                  >
                    <option value="17:30">17:30 (Early Degustation)</option>
                    <option value="18:30">18:30 (Hearth Seating)</option>
                    <option value="19:30">19:30 (Prime Dinner)</option>
                    <option value="20:30">20:30 (Prime Dinner)</option>
                    <option value="21:15">21:15 (Late Night Ember)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#A89F91]">Number of Guests</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setResGuests(num)}
                        className={`flex-1 py-3 rounded-lg text-xs font-mono transition-all min-h-[44px] ${
                          resGuests === num
                            ? "bg-[#D97736] text-[#0F0D0B] font-bold"
                            : "bg-[#14100D] border border-[#2B211A] text-[#8C8377] hover:text-white"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#A89F91]">Lead Guest Name</label>
                  <input
                    type="text"
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    placeholder="e.g. Lord Alistair Vance"
                    className="p-3.5 rounded-xl bg-[#14100D] border border-[#2B211A] text-xs font-sans text-[#F7F4EE] focus:outline-none focus:border-[#D97736] min-h-[44px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#A89F91]">Mobile Phone / Email</label>
                  <input
                    type="text"
                    required
                    value={resContact}
                    onChange={(e) => setResContact(e.target.value)}
                    placeholder="vance@estate.com / +44 79..."
                    className="p-3.5 rounded-xl bg-[#14100D] border border-[#2B211A] text-xs font-sans text-[#F7F4EE] focus:outline-none focus:border-[#D97736] min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-[#A89F91]">
                  Dietary Requirements & Occasion Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Shellfish allergy, celebrating anniversary, sommelier wine pairing requested..."
                  className="p-3.5 rounded-xl bg-[#14100D] border border-[#2B211A] text-xs font-sans text-[#F7F4EE] focus:outline-none focus:border-[#D97736]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#D97736] text-[#0F0D0B] text-xs font-mono uppercase tracking-[0.2em] font-bold hover:bg-[#E89D67] transition-all shadow-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Confirm Table Reservation Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          9. TESTIMONIALS & PRESS
          ========================================================================= */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D97736] font-semibold">
            Press & Gastronomic Acclaim
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F4EE] mt-2">
            Critical Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-[#171310] border border-[#2B211A] flex flex-col justify-between gap-6 shadow-sm"
            >
              <div className="flex items-center gap-1 text-[#D97736]">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-[#EAE5D9] leading-relaxed">
                "{review.quote}"
              </p>
              <div className="pt-4 border-t border-[#26201B]">
                <h4 className="text-xs font-mono font-bold text-[#F7F4EE]">{review.author}</h4>
                <span className="text-[10px] font-mono text-[#D97736] block mt-0.5">{review.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          10. LOCATION, HOURS & CONTACT
          ========================================================================= */}
      <section id="location" className="py-24 px-6 sm:px-12 bg-[#120E0B] border-t border-[#26201B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D97736]">Atelier Address</span>
            <h3 className="text-lg font-serif text-[#F7F4EE]">{businessName}</h3>
            <p className="text-xs text-[#A89F91] leading-relaxed font-mono">
              {location}
            </p>
            <span className="text-xs text-[#8C8377] font-mono">
              Nearest Tube: Green Park / Bond Street
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D97736]">Service Hours</span>
            <div className="flex flex-col gap-1 text-xs font-mono text-[#A89F91]">
              <div className="flex justify-between">
                <span>Tuesday – Friday:</span>
                <span className="text-white font-semibold">17:30 – 23:30</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-semibold">12:00 – 15:00 / 17:30 – 00:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-semibold">12:30 – 18:00 (Long Lunch)</span>
              </div>
              <div className="flex justify-between text-[#8C8377]">
                <span>Monday:</span>
                <span>Closed for Butchery & Foraging</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D97736]">Direct Inquiries</span>
            <div className="flex flex-col gap-2 text-xs font-mono text-[#A89F91]">
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-[#D97736]">
                <Phone className="w-3.5 h-3.5 text-[#D97736]" /> {phone}
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D97736]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D97736]" /> WhatsApp Concierge
              </a>
              <span className="text-[11px] text-[#8C8377] mt-2">
                Dress Code: Smart Elegant • Valet Parking Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. FOOTER
          ========================================================================= */}
      <footer className="bg-[#0A0807] text-[#8C8377] py-16 px-6 sm:px-12 border-t border-[#1F1813]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-serif font-medium tracking-widest text-[#F7F4EE]">
              {businessName}
            </span>
            <span className="text-xs font-mono text-[#6E665C]">
              Contemporary Wood-Fired Cuisine & Cellar • All Rights Reserved 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#6E665C]">
            <a href="#about" className="hover:text-white">The Atelier</a>
            <span>•</span>
            <a href="#menu" className="hover:text-white">Menu</a>
            <span>•</span>
            <a href="#reservation" className="hover:text-white">Reservations</a>
            <span>•</span>
            <span>London • Mayfair</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          12. DISH INSPECTOR MODAL
          ========================================================================= */}
      {inspectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#171310] text-[#F7F4EE] rounded-2xl max-w-2xl w-full border border-[#3D2C20] shadow-2xl p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setInspectedDish(null)}
              aria-label="Close Dish Inspector"
              className="absolute top-6 right-6 p-2 rounded-full bg-[#241A14] hover:bg-[#D97736] hover:text-[#0F0D0B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D97736]">
                  Culinary Monograph • {inspectedDish.category}
                </span>
                <div className="flex justify-between items-baseline gap-4 mt-1">
                  <h3 className="text-2xl font-serif text-[#F7F4EE]">
                    {inspectedDish.name}
                  </h3>
                  <span className="text-lg font-mono font-bold text-[#E89D67]">
                    {inspectedDish.price}
                  </span>
                </div>
              </div>

              {/* Visual Banner */}
              <div
                className="h-36 rounded-xl p-5 flex flex-col justify-end text-white relative overflow-hidden"
                style={{ background: inspectedDish.visualColor }}
              >
                <span className="text-[10px] font-mono text-[#D97736] uppercase tracking-widest">
                  Provenance Source
                </span>
                <h4 className="text-base font-serif">{inspectedDish.provenance}</h4>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase text-[#A89F91]">Preparation Notes:</span>
                <p className="text-xs sm:text-sm text-[#B5ABA0] font-light leading-relaxed">
                  {inspectedDish.description}
                </p>
              </div>

              {inspectedDish.pairing && (
                <div className="p-4 rounded-xl bg-[#241A14] border border-[#3D2C20] flex items-center gap-3">
                  <Wine className="w-5 h-5 text-[#D97736] flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#A89F91] block">Sommelier Recommendation:</span>
                    <span className="text-xs font-mono font-bold text-[#E89D67]">{inspectedDish.pairing}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-[#26201B]">
                <button
                  type="button"
                  onClick={() => setInspectedDish(null)}
                  className="px-6 py-2.5 bg-[#D97736] text-[#0F0D0B] text-xs font-mono uppercase tracking-wider font-bold rounded hover:bg-[#E89D67] transition-all"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
