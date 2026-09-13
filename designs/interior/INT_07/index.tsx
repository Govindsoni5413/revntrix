"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Coffee, Sun, Home } from "lucide-react";

export default function INT_07Design({ businessName = "Haven & Hearth Interiors" }: { businessName?: string }) {
  const [selectedRoom, setSelectedRoom] = useState<"living" | "kitchen" | "master">("living");

  const rooms = {
    living: {
      name: "Sunlit Conversation Lounge",
      quote: "A room designed for long evenings with family, tea, and soft linen warmth.",
      features: ["Curved Bouclé Sofa", "Custom Walnut Bookshelf", "Terracotta Table Accents", "Linen Sheer Drapes"],
    },
    kitchen: {
      name: "The Culinary Sanctuary",
      quote: "Tactile quartzite islands paired with fluted sage green cabinetry and hidden spices.",
      features: ["Honed Taj Mahal Quartzite", "Solid Brass Hardware", "Integrated Induction Cooktop", "Warm Oak Breakfast Nook"],
    },
    master: {
      name: "Serene Sleep Suite",
      quote: "Low acoustic reverb, circadian lighting scenes, and natural jute underfoot.",
      features: ["Custom Upholstered Headboard", "Concealed Wardrobe Lighting", "Lime Wash Walls", "Wool Berber Rug"],
    },
  };

  return (
    <div className="bg-[#11100E] text-[#F3EFEA] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs font-serif italic text-[#D4A72C] tracking-wide">
            Warm Residential Story • By {businessName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#F7F5F0]">
            Homes Crafted Around Human Emotion
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A29A] max-w-lg leading-relaxed">
            We reject sterile showrooms. Our design philosophy celebrates tactile textures, morning sunlight, and meaningful personal artifacts.
          </p>
        </div>

        {/* Room Switcher Pills */}
        <div className="flex justify-center gap-2">
          {(["living", "kitchen", "master"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRoom(r)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium capitalize transition-all min-h-[44px] ${
                selectedRoom === r
                  ? "bg-[#D4A72C] text-[#080808] font-bold shadow"
                  : "bg-[#1E1C18] text-[#A8A29A] border border-[#332F2A] hover:text-[#F3EFEA]"
              }`}
            >
              {r === "living" ? "Living Lounge" : r === "kitchen" ? "Warm Kitchen" : "Master Bedroom"}
            </button>
          ))}
        </div>

        {/* Room Story Card */}
        <div className="bg-[#181613] border border-[#2E2922] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 shadow-xl">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A72C]">Room Feature</span>
            <h3 className="text-2xl font-serif text-[#F7F5F0] mt-1">{rooms[selectedRoom].name}</h3>
            <p className="text-sm italic text-[#D4A72C]/90 mt-1">"{rooms[selectedRoom].quote}"</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#2A251E]">
            {rooms[selectedRoom].features.map((f, i) => (
              <div key={i} className="bg-[#211E18] p-3 rounded-xl border border-[#3A332A] text-xs text-[#D8D2C9] font-medium text-center">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
