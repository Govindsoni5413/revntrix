"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Eye, MousePointerClick, MessageSquare, Clock } from "lucide-react";

export default function AdminAnalyticsPage() {
  const events = [
    { type: "landing_view", count: "1,420", label: "Showcase Landing Page Views", color: "text-[#38BDF8]" },
    { type: "design_preview", count: "890", label: "Full Interactive Previews Launched", color: "text-[#D4A72C]" },
    { type: "ready_made_click", count: "310", label: "Ready-Made Lead Form Opens", color: "text-[#F59E0B]" },
    { type: "custom_start", count: "145", label: "Custom Architecture Brief Starts", color: "text-[#A855F7]" },
    { type: "whatsapp_click", count: "182", label: "Direct WhatsApp Sales Handoffs", color: "text-[#22C55E]" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Telemetry & Funnels • Revntrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">Conversion Analytics</h1>
        </div>
        <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-3 py-1.5 rounded-lg border border-[#22C55E]/30">
          ✓ 30-Day Auto Purge Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e) => (
          <div key={e.type} className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl">
            <span className="text-xs font-mono text-[#888]">{e.type}</span>
            <div>
              <span className={`text-3xl font-bold font-mono ${e.color}`}>{e.count}</span>
              <p className="text-xs text-[#A7A7A0] mt-1">{e.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
