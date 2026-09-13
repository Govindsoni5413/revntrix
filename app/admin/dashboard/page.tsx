"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Send,
  Sparkles,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/shared/Button";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Leads", value: "24", change: "+6 this week", icon: Users, color: "text-[#D4A72C]" },
    { label: "Active Outreach Campaigns", value: "8", change: "4 expiring soon", icon: Send, color: "text-[#38BDF8]" },
    { label: "WhatsApp Handoffs", value: "31", change: "82% conversion rate", icon: MessageSquare, color: "text-[#22C55E]" },
    { label: "Custom Briefs", value: "11", change: "AI summarized", icon: Sparkles, color: "text-[#F43F5E]" },
  ];

  const recentLeads = [
    { id: "1", name: "Sharma Luxury Interiors", niche: "Interior (INT)", intent: "ready_made", design: "INT_01", time: "25m ago", status: "new" },
    { id: "2", name: "Dr. Rohit Apex Dental", niche: "Clinic (CLN)", intent: "custom", design: "CUSTOM_ARCH", time: "2h ago", status: "contacted" },
    { id: "3", name: "Horizon Sky Mansions", niche: "Real Estate (EST)", intent: "ready_made", design: "EST_01", time: "5h ago", status: "qualified" },
    { id: "4", name: "Kalyan Heritage Jewels", niche: "Jewellers (JW)", intent: "ready_made", design: "JW_05", time: "1d ago", status: "proposal" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Agency Operations • Revntrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">
            Executive Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/outreach/campaigns"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F3C64E] via-[#D4A72C] to-[#8F6415] text-black text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg min-h-[44px]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Generate Campaign Link</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#121212] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div className="flex justify-between items-start">
                <span className="text-xs text-[#A7A7A0] font-medium">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg bg-[#1D1D1D] border border-[#333] flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] font-mono">{stat.value}</span>
                <span className="block text-[11px] text-[#A7A7A0] mt-1">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Lead Pipeline */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D4A72C]" />
            <h3 className="text-base font-bold text-[#F7F7F5]">Recent Inbound Inquiries</h3>
          </div>
          <Link href="/admin/leads" className="text-xs text-[#D4A72C] hover:underline font-semibold flex items-center gap-1">
            <span>View All Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#1C1C1C]">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#F7F7F5]">{lead.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D1D1D] text-[#D4A72C] border border-[#333]">
                    {lead.design}
                  </span>
                </div>
                <p className="text-xs text-[#888] mt-0.5">{lead.niche} • Intent: {lead.intent}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-[10px] text-[#A7A7A0] flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {lead.time}
                </span>
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border ${
                  lead.status === "new" ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30" : "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30"
                }`}>
                  {lead.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
