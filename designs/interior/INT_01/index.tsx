"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  Sparkles,
  Maximize2,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sliders,
  MapPin,
  Calendar,
  Ruler,
  Eye,
  Info,
} from "lucide-react";

interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  area: string;
  category: "residence" | "penthouse" | "commercial";
  heroVisual: {
    bgGradient: string;
    accentColor: string;
    ambientTone: string;
    architectureType: string;
  };
  narrative: string;
  spatialChallenge: string;
  solution: string;
  materials: string[];
  blueprintSpec: {
    ceilingHeight: string;
    naturalLightOrientation: string;
    acousticRating: string;
  };
}

const FEATURED_HERO_PROJECTS = [
  {
    id: "monte-carlo",
    title: "Residence Monte-Carlo",
    location: "Monaco Riviera",
    coordinates: "43.7384° N, 7.4246° E",
    year: "2025",
    area: "5,800 SQ.FT",
    typology: "Private Coastal Villa",
    bgStyle: "linear-gradient(135deg, #1C1A17 0%, #292521 50%, #151311 100%)",
    accent: "#C2A36B",
    quote: "A monolithic stone volume suspended between Mediterranean light and terraced cliffs.",
  },
  {
    id: "kyoto-pavilion",
    title: "The Glass Pavilion",
    location: "Higashiyama, Kyoto",
    coordinates: "34.9949° N, 135.7850° E",
    year: "2026",
    area: "4,200 SQ.FT",
    typology: "Tea Sanctuary & Residence",
    bgStyle: "linear-gradient(135deg, #161A19 0%, #202724 50%, #0F1312 100%)",
    accent: "#8FA396",
    quote: "Merging traditional charred cedar Engawa corridors with floor-to-ceiling acoustic glass.",
  },
  {
    id: "zurich-sanctuary",
    title: "Brutalist Sanctuary",
    location: "Lake Zurich, Switzerland",
    coordinates: "47.3769° N, 8.5417° E",
    year: "2024",
    area: "7,100 SQ.FT",
    typology: "Alpine Architectural Estate",
    bgStyle: "linear-gradient(135deg, #1A1C20 0%, #272C33 50%, #121417 100%)",
    accent: "#9CA8B8",
    quote: "Board-formed concrete softened by smoked Swiss pine and fluted Roman travertine.",
  },
];

const CURATED_PROJECTS: ProjectDetail[] = [
  {
    id: "monte-carlo",
    title: "Residence Monte-Carlo",
    subtitle: "Coastal Monolith & Terraced Horizons",
    location: "Monaco Riviera",
    year: "2025",
    area: "5,800 sq.ft",
    category: "residence",
    heroVisual: {
      bgGradient: "linear-gradient(135deg, #1F1B16, #2E2820, #14120E)",
      accentColor: "#C2A36B",
      ambientTone: "Warm Amber & Honed Limestone",
      architectureType: "Subtractive Cliffside Architecture",
    },
    narrative:
      "Sculpted directly into the limestone cliffs of the French Riviera, this residence eliminates conventional walls in favor of 4.2m sliding bronze-framed glass panels that dissolve the boundary between salon and ocean.",
    spatialChallenge:
      "Managing severe southern solar gain while preserving uninterrupted 240-degree panoramic ocean views without heavy tinted glazing.",
    solution:
      "Engineered automated deep cantilevered micro-louvers crafted from marine-grade anodized bronze that self-adjust based on real-time solar tracking.",
    materials: ["Navona Vein-Cut Travertine", "Smoked Fluted Oak", "Brushed Marine Bronze", "Hand-Plastered Stucco"],
    blueprintSpec: {
      ceilingHeight: "4.20 Meters Clear",
      naturalLightOrientation: "Direct South-Southwest (180° Exposure)",
      acousticRating: "NC-25 Ultra-Quiet Isolation",
    },
  },
  {
    id: "kyoto-pavilion",
    title: "The Glass Pavilion",
    subtitle: "Higashiyama Modernist Tea Atelier",
    location: "Kyoto, Japan",
    year: "2026",
    area: "4,200 sq.ft",
    category: "residence",
    heroVisual: {
      bgGradient: "linear-gradient(135deg, #141A17, #212B26, #0E1210)",
      accentColor: "#8FA396",
      ambientTone: "Forest Moss & Charred Hinoki",
      architectureType: "Biophilic Post-and-Beam",
    },
    narrative:
      "A harmonious dialogue between century-old garden pines and contemporary glass engineering, creating quiet meditative spatial rhythms for contemplative living.",
    spatialChallenge:
      "Integrating rigorous seismic dampening requirements without introducing visible diagonal steel cross-bracing across pristine garden-facing elevations.",
    solution:
      "Implemented a submerged base-isolation foundation system paired with concealed moment-resisting carbon composite joinery.",
    materials: ["Yakisugi Charred Cedar", "Kyoto Green Stone", "Hand-Woven Tatami Weave", "Low-Iron Acoustic Glass"],
    blueprintSpec: {
      ceilingHeight: "3.60 Meters",
      naturalLightOrientation: "Filtered East-Northeast Morning Sun",
      acousticRating: "NC-20 Meditative Isolation",
    },
  },
  {
    id: "tribeca-loft",
    title: "The Tribeca Foundry",
    subtitle: "Cast-Iron Heritage Transformation",
    location: "Franklin St, New York",
    year: "2025",
    area: "6,400 sq.ft",
    category: "penthouse",
    heroVisual: {
      bgGradient: "linear-gradient(135deg, #241D1A, #382B26, #161210)",
      accentColor: "#D19B75",
      ambientTone: "Raw Brick, Patina Brass & Cognac Leather",
      architectureType: "Industrial Heritage Adaptive Reuse",
    },
    narrative:
      "A former 19th-century textile warehouse reimagined as an expansive duplex sanctuary for an international contemporary art collector.",
    spatialChallenge:
      "Introducing museum-grade gallery lighting and micro-climate climate control without concealing the landmarked 1888 exposed timber joists and fluted iron columns.",
    solution:
      "Designed a bespoke recessed structural floor trench network carrying dual airflow supply and magnetic track fixtures disguised in floor registers.",
    materials: ["Original 1888 Heart Pine", "Gunmetal Blackened Steel", "Calacatta Paonazzo Marble", "Saddle Leather"],
    blueprintSpec: {
      ceilingHeight: "4.80 Meters (Triple Height Atrium)",
      naturalLightOrientation: "North Sky-Light Gallery Diffuser",
      acousticRating: "NC-28 Urban Decoupling",
    },
  },
  {
    id: "zurich-sanctuary",
    title: "Brutalist Sanctuary",
    subtitle: "Alpine Terraced Monolith",
    location: "Lake Zurich, Switzerland",
    year: "2024",
    area: "7,100 sq.ft",
    category: "residence",
    heroVisual: {
      bgGradient: "linear-gradient(135deg, #181B20, #262B33, #111317)",
      accentColor: "#9CA8B8",
      ambientTone: "Chiseled Granite & Alpine Fir",
      architectureType: "Monolithic Cast Concrete",
    },
    narrative:
      "A cascading terraced structure where board-formed concrete masses act as thermal batteries, capturing alpine sun during winter and framing serene water views.",
    spatialChallenge:
      "Severe 38-degree slope gradient with strict local municipal volume envelope and shoreline setback constraints.",
    solution:
      "Stepped subterranean retention anchors supporting cantilevered residential trays that float over the alpine landscape without disturbing tree root systems.",
    materials: ["Swiss Board-Formed Concrete", "Vals Quartzite", "Brushed Pewter", "Alpine Larch"],
    blueprintSpec: {
      ceilingHeight: "3.80 Meters",
      naturalLightOrientation: "South-West Alpine Exposure",
      acousticRating: "NC-22 Soundproof Enclosure",
    },
  },
  {
    id: "mayfair-salon",
    title: "Maison Vesper",
    subtitle: "Private Haute Horlogerie Salon",
    location: "Mayfair, London",
    year: "2025",
    area: "3,100 sq.ft",
    category: "commercial",
    heroVisual: {
      bgGradient: "linear-gradient(135deg, #1D1822, #2B2333, #120F16)",
      accentColor: "#B596C7",
      ambientTone: "Deep Aubergine Velvet & Fluted Walnut",
      architectureType: "Bespoke Hospitality Atelier",
    },
    narrative:
      "An ultra-exclusive private client lounge and watch salon offering tailored client hospitality, high-security display vaults, and discreet private meeting chambers.",
    spatialChallenge:
      "Concealing Grade-VI ballistic security reinforcement within historic Georgian architectural envelope.",
    solution:
      "Integrated lightweight kevlar composite backing into handcrafted fluted American walnut wall paneling with biometric hidden door releases.",
    materials: ["American Black Walnut", "Belgian Linen Velvet", "Hand-Chiseled Alabaster", "Antiqued Mirror Glass"],
    blueprintSpec: {
      ceilingHeight: "3.90 Meters",
      naturalLightOrientation: "Controlled Indirect Atelier Luminance",
      acousticRating: "NC-18 Confidential Acoustic Shell",
    },
  },
  {
    id: "milan-duomo",
    title: "Penthouse Brera",
    subtitle: "Skyline Terrace & Private Art Gallery",
    location: "Brera, Milan",
    year: "2026",
    area: "4,900 sq.ft",
    category: "penthouse",
    heroVisual: {
      bgGradient: "linear-gradient(135deg, #221F1B, #332D27, #151310)",
      accentColor: "#D1A153",
      ambientTone: "Ceppo di Gré Stone & Polished Lacquer",
      architectureType: "Italian Rationalist Penthouse",
    },
    narrative:
      "Perched above the historic rooftops of Milan, this penthouse combines a 360-degree glass rooftop belvedere with bespoke furniture crafted exclusively by master Brianza artisans.",
    spatialChallenge:
      "Supporting a 12-meter heated reflection pool on an existing historic 1930s residential building roof terrace.",
    solution:
      "Engineered a lightweight titanium-framed infinity pool structure distributing weight directly into the building's central masonry elevator spine.",
    materials: ["Ceppo di Gré Stone", "Dark Bronze Mirror", "Hand-Rubbed French Polish", "Cashmere Drapery"],
    blueprintSpec: {
      ceilingHeight: "3.50 Meters",
      naturalLightOrientation: "Dual East-West Skyline Terraces",
      acousticRating: "NC-25 Penthouse Acoustic Glass",
    },
  },
];

const MATERIAL_SWATCHES = [
  {
    id: "travertine",
    name: "Navona Vein-Cut Travertine",
    origin: "Tivoli Quarry, Rome, Italy",
    finish: "Open-Pore Honed Matte",
    colorHex: "#D8CCB8",
    textureBg: "radial-gradient(circle at 30% 30%, #E6DEC9 0%, #C4B69E 100%)",
    specText: "Sawn along the natural sedimentation bed to expose sweeping caramel veining. Density 2450 kg/m³.",
    bestPairedWith: "Smoked Oak & Brushed Patina Bronze",
    tactileNote: "Soft velvet touch with subtle thermal warmth underfoot.",
  },
  {
    id: "walnut",
    name: "Architectural Smoked Walnut",
    origin: "Black Forest, Germany",
    finish: "Organic Danish Oil & Ultra-Matte Wax",
    colorHex: "#543D2B",
    textureBg: "linear-gradient(135deg, #5D432F 0%, #3B271A 100%)",
    specText: "Thermally treated smoked grain that creates deep espresso tones without synthetic chemical stains.",
    bestPairedWith: "Navona Travertine & Belgian Raw Linen",
    tactileNote: "Distinct linear grain texture with satin reflectance.",
  },
  {
    id: "terrazzo",
    name: "Bespoke Venetian Terrazzo",
    origin: "Veneto, Italy",
    finish: "Diamond Polished Semi-Gloss",
    colorHex: "#A89F91",
    textureBg: "radial-gradient(circle at 50% 50%, #C7BEB1 0%, #91887A 100%)",
    specText: "Hand-cast with river aggregate, Verde Alpi chips, and white Carrara marble fragments.",
    bestPairedWith: "Cast Glass & Monolithic Concrete",
    tactileNote: "Cool crystalline surface with micro-mineral texture.",
  },
  {
    id: "bronze",
    name: "Hand-Burnished Gunmetal Bronze",
    origin: "Birmingham Metalworks, UK",
    finish: "Living Waxed Patina",
    colorHex: "#7A6855",
    textureBg: "linear-gradient(135deg, #8A7763 0%, #5E4E3D 100%)",
    specText: "Solid extruded architectural bronze naturally oxidized and hand-sealed with microcrystalline wax.",
    bestPairedWith: "Light Stucco & Fluted Glass",
    tactileNote: "Heavy, substantial mass that ages gracefully over decades.",
  },
  {
    id: "linen",
    name: "Belgian Heavyweight Raw Linen",
    origin: "Flanders, Belgium",
    finish: "Stone-Washed Organic Weave",
    colorHex: "#D4C7B4",
    textureBg: "linear-gradient(135deg, #E2D7C6 0%, #C1B39E 100%)",
    specText: "100% long-staple flax fiber woven at 680 g/m² for natural acoustic absorption and soft light diffusion.",
    bestPairedWith: "Cast Iron & Dark Wood Joinery",
    tactileNote: "Rich tactile slub with relaxed, graceful drapery fall.",
  },
];

export default function INT_01Design({
  businessName = "Atelier Vesper",
}: {
  businessName?: string;
}) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<"all" | "residence" | "penthouse" | "commercial">("all");
  const [inspectedProject, setInspectedProject] = useState<ProjectDetail | null>(null);
  const [selectedSwatch, setSelectedSwatch] = useState(MATERIAL_SWATCHES[0]);
  const [inquiryScope, setInquiryScope] = useState<string>("Full Architectural Remodel");
  const [inquirySqFt, setInquirySqFt] = useState<number>(4500);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeHero = FEATURED_HERO_PROJECTS[heroIndex];

  const filteredProjects =
    activeCategory === "all"
      ? CURATED_PROJECTS
      : CURATED_PROJECTS.filter((p) => p.category === activeCategory);

  const nextHero = () => {
    setHeroIndex((prev) => (prev + 1) % FEATURED_HERO_PROJECTS.length);
  };

  const prevHero = () => {
    setHeroIndex((prev) => (prev - 1 + FEATURED_HERO_PROJECTS.length) % FEATURED_HERO_PROJECTS.length);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#181716] min-h-screen font-sans selection:bg-[#9E7D47] selection:text-white antialiased">
      {/* =========================================================================
          1. ATELIER MASTHEAD & RESTRAINED NAVIGATION
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E4DC] px-6 sm:px-12 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-base sm:text-lg font-serif font-medium tracking-[0.2em] uppercase text-[#181716]">
              {businessName}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E8B82] hidden md:inline-block">
              / Architecture & Living Environments
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider text-[#68655E] uppercase">
            <a href="#hero" className="hover:text-[#181716] transition-colors">
              Featured Works
            </a>
            <a href="#portfolio" className="hover:text-[#181716] transition-colors">
              Monographs
            </a>
            <a href="#materiality" className="hover:text-[#181716] transition-colors">
              Materiality
            </a>
            <a href="#philosophy" className="hover:text-[#181716] transition-colors">
              Philosophy
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#8E8B82] hidden sm:block">
              Paris • Kyoto • New York
            </span>
            <a
              href="#commission"
              className="px-4 py-2 bg-[#181716] text-[#FAF8F5] text-xs font-mono uppercase tracking-widest hover:bg-[#9E7D47] transition-all rounded"
            >
              Commission
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. FULL-BLEED EDITORIAL HERO & PROJECT SWITCHER
          ========================================================================= */}
      <section id="hero" className="relative bg-[#111111] text-[#FAF8F5] overflow-hidden border-b border-[#262626]">
        <div
          className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between p-6 sm:p-12 md:p-16 transition-all duration-700 ease-out"
          style={{ background: activeHero.bgStyle }}
        >
          {/* Subtle Architectural Grid Wireframe Backdrop */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C2A36B_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Top Hero Meta Row */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/15 text-white/90">
                Monograph 0{heroIndex + 1} / 0{FEATURED_HERO_PROJECTS.length}
              </span>
              <span className="text-xs font-mono text-white/60 tracking-wider">
                {activeHero.coordinates}
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C2A36B]" /> {activeHero.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-[#C2A36B]" /> {activeHero.area}
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <Calendar className="w-3.5 h-3.5 text-[#C2A36B]" /> {activeHero.year}
              </span>
            </div>
          </div>

          {/* Central Hero Editorial Display */}
          <div className="relative z-10 my-auto py-12 max-w-4xl flex flex-col gap-6">
            <span
              className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase font-semibold"
              style={{ color: activeHero.accent }}
            >
              {activeHero.typology}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.05] text-[#FAF8F5]">
              {activeHero.title}
            </h1>
            <p className="text-base sm:text-xl font-serif italic text-white/80 max-w-2xl font-light leading-relaxed">
              "{activeHero.quote}"
            </p>
          </div>

          {/* Hero Navigation & Switcher Controls */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevHero}
                aria-label="Previous Featured Project"
                className="w-11 h-11 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/80 hover:text-white transition-all bg-white/5 hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextHero}
                aria-label="Next Featured Project"
                className="w-11 h-11 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/80 hover:text-white transition-all bg-white/5 hover:bg-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 ml-4">
                {FEATURED_HERO_PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setHeroIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      heroIndex === idx ? "w-8 bg-[#C2A36B]" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to ${p.title}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const found = CURATED_PROJECTS.find((p) => p.id === activeHero.id);
                if (found) setInspectedProject(found);
              }}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded bg-white text-[#111111] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#C2A36B] hover:text-white transition-all shadow-lg"
            >
              <span>Examine Architectural Blueprint</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CURATED PORTFOLIO INDEX & INTERACTIVE PROJECT INSPECTOR
          ========================================================================= */}
      <section id="portfolio" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Section Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#E8E4DC]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9E7D47] font-semibold">
              Selected Portfolios • 2024–2026
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#181716] mt-2">
              Spatial Monographs
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#EFECE5] p-1.5 rounded-lg border border-[#E0DCD3]">
            {[
              { id: "all", label: "All Works (6)" },
              { id: "residence", label: "Private Residences" },
              { id: "penthouse", label: "Penthouses" },
              { id: "commercial", label: "Commercial Salons" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-all min-h-[38px] ${
                  activeCategory === tab.id
                    ? "bg-[#181716] text-[#FAF8F5] font-semibold shadow-sm"
                    : "text-[#68655E] hover:text-[#181716]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => setInspectedProject(project)}
              className="group cursor-pointer flex flex-col bg-white border border-[#E8E4DC] hover:border-[#9E7D47] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Project Card Visual Frame */}
              <div
                className="h-64 sm:h-72 w-full relative p-6 flex flex-col justify-between overflow-hidden"
                style={{ background: project.heroVisual.bgGradient }}
              >
                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 text-white/90 backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded backdrop-blur-md">
                    {project.location}
                  </span>
                </div>

                <div className="z-10 bg-black/70 backdrop-blur-md p-4 rounded-lg border border-white/10 transform transition-all group-hover:bg-black/85">
                  <span className="text-[10px] font-mono tracking-widest text-[#C2A36B] uppercase font-semibold">
                    {project.area} • {project.year}
                  </span>
                  <h3 className="text-xl font-serif text-[#FAF8F5] mt-1">{project.title}</h3>
                  <p className="text-xs text-white/70 line-clamp-2 mt-1 font-light">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Project Card Bottom Specs */}
              <div className="p-6 flex flex-col gap-4 bg-white flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8B82]">
                    Key Material Palette:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.materials.slice(0, 3).map((mat, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-sans px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E8E4DC] text-[#423F3A]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE4] text-xs font-mono text-[#9E7D47] font-semibold group-hover:text-[#181716]">
                  <span>Inspect Blueprint & Challenge</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. THE MATERIALITY ATELIER (INTERACTIVE SWATCH BOARD)
          ========================================================================= */}
      <section id="materiality" className="bg-[#181716] text-[#FAF8F5] py-24 px-6 sm:px-12 border-y border-[#2E2C29]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C2A36B] font-semibold">
                Tactile Sourcing & Provenance
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] mt-2">
                The Materiality Atelier
              </h2>
            </div>
            <p className="text-sm font-sans text-[#A8A49D] max-w-md font-light leading-relaxed">
              Every Atelier Vesper space begins with raw geological and botanical swatches sourced directly from heritage European quarries and sustainable forests.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Swatch Selector Buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {MATERIAL_SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  type="button"
                  onClick={() => setSelectedSwatch(swatch)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedSwatch.id === swatch.id
                      ? "bg-white/10 border-[#C2A36B] shadow-lg"
                      : "bg-white/5 border-white/10 hover:border-white/30 text-white/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg border border-white/20 shadow-inner flex-shrink-0"
                      style={{ background: swatch.textureBg }}
                    />
                    <div>
                      <h4 className="text-sm font-serif font-medium text-[#FAF8F5]">
                        {swatch.name}
                      </h4>
                      <span className="text-[11px] font-mono text-white/60">
                        {swatch.origin}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      selectedSwatch.id === swatch.id ? "text-[#C2A36B] translate-x-1" : "text-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right: Detailed Tactile Inspector Board */}
            <div className="lg:col-span-7 bg-[#21201D] border border-white/15 rounded-2xl p-8 sm:p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none rounded-full blur-3xl"
                style={{ background: selectedSwatch.colorHex }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A36B]">
                    Material Specimen / {selectedSwatch.origin}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] mt-1">
                    {selectedSwatch.name}
                  </h3>
                </div>
                <span className="text-xs font-mono px-3 py-1.5 rounded bg-white/10 text-white/90 border border-white/15">
                  {selectedSwatch.finish}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase text-[#A8A49D]">
                    Engineering Specification
                  </span>
                  <p className="text-xs text-white/80 font-sans leading-relaxed">
                    {selectedSwatch.specText}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase text-[#A8A49D]">
                    Harmonious Pairings
                  </span>
                  <p className="text-xs text-[#C2A36B] font-mono leading-relaxed">
                    {selectedSwatch.bestPairedWith}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#C2A36B] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-white/70 italic font-serif">
                  Tactile Sensory Profile: "{selectedSwatch.tactileNote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ARCHITECTURAL PHILOSOPHY & MONOGRAPH
          ========================================================================= */}
      <section id="philosophy" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9E7D47] font-semibold">
              The Atelier Manifesto
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#181716] leading-tight">
              We design spaces not for the eye alone, but for the nervous system.
            </h2>
            <p className="text-sm font-sans text-[#68655E] font-light leading-relaxed">
              True luxury in contemporary architecture is the elimination of sensory clutter. By mastering natural illumination angles, natural acoustic absorption, and authentic materials, we craft sanctuaries of enduring peace.
            </p>

            <div className="pt-4 border-t border-[#E8E4DC] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#181716] text-[#FAF8F5] flex items-center justify-center font-serif text-lg">
                V
              </div>
              <div>
                <span className="text-sm font-serif font-medium text-[#181716] block">
                  Vincent Delacroix & Kenzo Mori
                </span>
                <span className="text-xs font-mono text-[#8E8B82]">
                  Founding Principals, Atelier Vesper
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-[#E8E4DC] flex flex-col gap-4 shadow-sm">
              <span className="text-2xl font-serif text-[#9E7D47]">01</span>
              <h3 className="text-lg font-serif font-medium text-[#181716]">
                Solar Micro-Choreography
              </h3>
              <p className="text-xs text-[#68655E] leading-relaxed font-sans">
                Every floorplan is derived from 3D solar trajectory simulations, ensuring golden morning radiance in living atriums and diffuse, serene twilight across private chambers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8E4DC] flex flex-col gap-4 shadow-sm">
              <span className="text-2xl font-serif text-[#9E7D47]">02</span>
              <h3 className="text-lg font-serif font-medium text-[#181716]">
                Acoustic Decoupling
              </h3>
              <p className="text-xs text-[#68655E] leading-relaxed font-sans">
                Urban noise is eliminated through multi-chamber isolated floor slabs, hidden micro-perforated acoustic timber paneling, and decoupled sub-structures rated to NC-20.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8E4DC] flex flex-col gap-4 shadow-sm">
              <span className="text-2xl font-serif text-[#9E7D47]">03</span>
              <h3 className="text-lg font-serif font-medium text-[#181716]">
                Zero Synthetic Finishes
              </h3>
              <p className="text-xs text-[#68655E] leading-relaxed font-sans">
                We strictly ban synthetic polyurethanes and toxic adhesives, utilizing only breathable lime plasters, beeswax timber sealers, and pure mineral stones.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8E4DC] flex flex-col gap-4 shadow-sm">
              <span className="text-2xl font-serif text-[#9E7D47]">04</span>
              <h3 className="text-lg font-serif font-medium text-[#181716]">
                Turnkey White-Glove Handover
              </h3>
              <p className="text-xs text-[#68655E] leading-relaxed font-sans">
                From initial zoning permits through custom millwork fabrication and curated art placement, our atelier supervises every millimetre on-site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. COMMISSION & PROJECT ESTIMATOR SECTION
          ========================================================================= */}
      <section id="commission" className="bg-[#EFECE5] py-24 px-6 sm:px-12 border-t border-[#E0DCD3]">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-[#DDD8CE] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9E7D47] font-semibold">
              Commission an Architectural Project
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#181716] mt-2">
              Initiate Your Private Atelier Brief
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#68655E] mt-2 font-light">
              We accept a limited roster of 6 bespoke residential and commercial commissions per calendar year.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-10 text-center flex flex-col items-center gap-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC]">
              <CheckCircle2 className="w-12 h-12 text-[#9E7D47]" />
              <h3 className="text-2xl font-serif text-[#181716]">
                Commission Brief Received
              </h3>
              <p className="text-xs text-[#68655E] max-w-md leading-relaxed font-sans">
                Our principal partners Vincent Delacroix & Kenzo Mori will review your spatial scope and contact you within 24 hours to schedule a confidential atelier consultation.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider rounded"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
              className="flex flex-col gap-8"
            >
              {/* Project Scope Selection */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-mono uppercase tracking-wider text-[#423F3A] font-medium">
                  Select Architectural Commission Scope:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Full Architectural Remodel",
                    "Penthouse Interior Architecture",
                    "Commercial / Private Atelier",
                  ].map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setInquiryScope(scope)}
                      className={`p-3.5 rounded-xl border text-xs font-sans font-medium text-left transition-all ${
                        inquiryScope === scope
                          ? "bg-[#181716] text-[#FAF8F5] border-[#181716] shadow-sm"
                          : "bg-[#FAF8F5] border-[#E8E4DC] text-[#423F3A] hover:border-[#9E7D47]"
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Estimator Slider */}
              <div className="flex flex-col gap-3 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC]">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase text-[#68655E]">Estimated Spatial Footprint:</span>
                  <span className="font-bold text-[#181716] text-sm">
                    {inquirySqFt.toLocaleString()} SQ.FT
                  </span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={15000}
                  step={500}
                  value={inquirySqFt}
                  onChange={(e) => setInquirySqFt(Number(e.target.value))}
                  className="w-full accent-[#9E7D47] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8E8B82]">
                  <span>1,500 SQ.FT</span>
                  <span>7,500 SQ.FT</span>
                  <span>15,000+ SQ.FT</span>
                </div>
              </div>

              {/* Contact Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#423F3A]">
                    Principal Contact Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alistair Vance"
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-xs font-sans focus:outline-none focus:border-[#9E7D47]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-[#423F3A]">
                    Confidential Email / Direct WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="vance@estate.com / +44 7..."
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-xs font-sans focus:outline-none focus:border-[#9E7D47]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-[#423F3A]">
                  Project Location & Key Aspirations
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Kensington private residence, full acoustic isolation, natural limestone finishes throughout..."
                  className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-xs font-sans focus:outline-none focus:border-[#9E7D47]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#181716] text-[#FAF8F5] text-xs font-mono uppercase tracking-[0.2em] font-semibold hover:bg-[#9E7D47] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Submit Private Commission Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          7. ATELIER FOOTER
          ========================================================================= */}
      <footer className="bg-[#111111] text-[#A8A49D] py-16 px-6 sm:px-12 border-t border-[#222]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-serif font-medium tracking-widest text-[#FAF8F5]">
              {businessName}
            </span>
            <span className="text-xs font-mono text-[#8E8B82]">
              Architectural Practice • License No. INT-2026-EU
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#8E8B82]">
            <span>Monographs Registered 2026</span>
            <span>•</span>
            <span>All Rights Reserved</span>
            <span>•</span>
            <span>Monaco • Tokyo • Zurich • New York</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          8. INTERACTIVE PROJECT INSPECTOR MODAL / DRAWER
          ========================================================================= */}
      {inspectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] text-[#181716] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E4DC] shadow-2xl p-6 sm:p-10 relative">
            <button
              type="button"
              onClick={() => setInspectedProject(null)}
              aria-label="Close Inspector"
              className="absolute top-6 right-6 p-2 rounded-full bg-[#EFECE5] hover:bg-[#181716] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#9E7D47] font-semibold">
                  Architectural Case Study • {inspectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-[#181716] mt-1">
                  {inspectedProject.title}
                </h3>
                <p className="text-sm font-sans text-[#68655E] mt-1">
                  {inspectedProject.subtitle} — {inspectedProject.location} ({inspectedProject.year})
                </p>
              </div>

              {/* Visual Ambient Banner */}
              <div
                className="h-44 sm:h-56 rounded-xl p-6 flex flex-col justify-end text-white relative overflow-hidden"
                style={{ background: inspectedProject.heroVisual.bgGradient }}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A36B]">
                  {inspectedProject.heroVisual.architectureType}
                </span>
                <h4 className="text-lg font-serif">{inspectedProject.heroVisual.ambientTone}</h4>
              </div>

              {/* Narrative */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9E7D47] font-semibold">
                  Spatial Narrative
                </span>
                <p className="text-xs sm:text-sm font-sans text-[#423F3A] leading-relaxed">
                  {inspectedProject.narrative}
                </p>
              </div>

              {/* Challenge vs Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#EFECE5] border border-[#DDD8CE]">
                  <span className="text-xs font-mono uppercase font-semibold text-[#181716] block mb-1">
                    Architectural Challenge
                  </span>
                  <p className="text-xs text-[#68655E] leading-relaxed font-sans">
                    {inspectedProject.spatialChallenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#EFECE5] border border-[#DDD8CE]">
                  <span className="text-xs font-mono uppercase font-semibold text-[#9E7D47] block mb-1">
                    Atelier Engineering Solution
                  </span>
                  <p className="text-xs text-[#68655E] leading-relaxed font-sans">
                    {inspectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Blueprint Specifications */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E4DC] flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#181716] font-semibold">
                  Structural & Environmental Metrics
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#68655E]">
                  <div>
                    <span className="text-[10px] uppercase text-[#8E8B82] block">Ceiling Clear</span>
                    <span className="text-[#181716] font-semibold">
                      {inspectedProject.blueprintSpec.ceilingHeight}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#8E8B82] block">Acoustic Shield</span>
                    <span className="text-[#181716] font-semibold">
                      {inspectedProject.blueprintSpec.acousticRating}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#8E8B82] block">Orientation</span>
                    <span className="text-[#181716] font-semibold">
                      {inspectedProject.blueprintSpec.naturalLightOrientation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Material Badges */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase text-[#8E8B82]">
                  Specified Material Swatches:
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectedProject.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DDD8CE] text-xs font-sans font-medium text-[#181716]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E8E4DC]">
                <button
                  type="button"
                  onClick={() => setInspectedProject(null)}
                  className="px-6 py-2.5 bg-[#181716] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider rounded hover:bg-[#9E7D47] transition-all"
                >
                  Close Monograph Inspector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
