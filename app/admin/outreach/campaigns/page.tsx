"use client";

import React, { useState } from "react";
import {
  Send,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { NICHES, NicheId } from "@/lib/design-registry";

type CampaignRecord = {
  id: string;
  campaignCode: string;
  prospectName: string;
  status: "active" | "draft" | "expired" | "archived";
  overrides: Record<NicheId, string>;
  expiresAt: string;
};

export default function AdminCampaignsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form State
  const [prospectName, setProspectName] = useState("");
  const [campaignCode, setCampaignCode] = useState("");
  const [nicheId, setNicheId] = useState<NicheId>("INT");
  const [businessNameOverride, setBusinessNameOverride] = useState("");
  const [expiryDays, setExpiryDays] = useState(14);

  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([
    {
      id: "camp-01",
      campaignCode: "sharma-interiors-vip",
      prospectName: "Sharma Architectural Group",
      status: "active",
      overrides: {
        INT: "Sharma Luxury Interiors",
        CLN: "Sharma Health Studio",
        EST: "Sharma Horizon Realty",
        JW: "Sharma Polki Jewels",
        RES: "Sharma Royal Bistro",
        ECO: "Sharma Direct",
      },
      expiresAt: "2026-09-27T12:00:00Z",
    },
    {
      id: "camp-02",
      campaignCode: "apex-dental-pvt",
      prospectName: "Dr. Rohit Verma & Associates",
      status: "active",
      overrides: {
        INT: "Apex Design Space",
        CLN: "Apex Dental Aesthetics",
        EST: "Apex Prime Realty",
        JW: "Apex Fine Gems",
        RES: "Apex Bistro",
        ECO: "Apex Care Store",
      },
      expiresAt: "2026-09-20T12:00:00Z",
    },
  ]);

  const handleCopy = async (code: string, niche: NicheId) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/r/${code}?niche=${niche.toLowerCase()}`;
    await navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospectName || !campaignCode) return;

    const cleanCode = campaignCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const newCamp: CampaignRecord = {
      id: `camp-${Date.now()}`,
      campaignCode: cleanCode,
      prospectName: prospectName.trim(),
      status: "active",
      overrides: {
        INT: nicheId === "INT" ? businessNameOverride.trim() : `${prospectName.trim()} Interiors`,
        CLN: nicheId === "CLN" ? businessNameOverride.trim() : `${prospectName.trim()} Clinic`,
        EST: nicheId === "EST" ? businessNameOverride.trim() : `${prospectName.trim()} Properties`,
        JW: nicheId === "JW" ? businessNameOverride.trim() : `${prospectName.trim()} Jewellers`,
        RES: nicheId === "RES" ? businessNameOverride.trim() : `${prospectName.trim()} Kitchen`,
        ECO: nicheId === "ECO" ? businessNameOverride.trim() : `${prospectName.trim()} Store`,
      },
      expiresAt: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString(),
    };

    setCampaigns([newCamp, ...campaigns]);
    setCreateModalOpen(false);
    setProspectName("");
    setCampaignCode("");
    setBusinessNameOverride("");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Outreach Engine • Revntrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">
            Personalized Campaign Generator
          </h1>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Create New Campaign
        </Button>
      </div>

      {/* Campaigns List */}
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col gap-5 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F1F1F] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F7F7F5]">{camp.prospectName}</h3>
                  <span className="text-xs font-mono text-[#D4A72C] bg-[#1A1A1A] px-2.5 py-0.5 rounded border border-[#333]">
                    /r/{camp.campaignCode}
                  </span>
                </div>
                <span className="text-xs text-[#888]">
                  Expires: {new Date(camp.expiresAt).toLocaleDateString()}
                </span>
              </div>

              <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 w-fit">
                {camp.status}
              </span>
            </div>

            {/* Niche Overrides Matrix (Visual Guarantee of Isolation) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#A7A7A0]">
                Isolated Niche Overrides:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {Object.values(NICHES).map((n) => (
                  <div key={n.id} className="bg-[#181818] p-3 rounded-xl border border-[#282828] flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D4A72C]">{n.id}</span>
                      <span className="block text-xs font-semibold text-[#F7F7F5] truncate mt-0.5">
                        {camp.overrides[n.id]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(camp.campaignCode, n.id)}
                      className="text-[10px] text-[#A7A7A0] hover:text-[#D4A72C] flex items-center gap-1 font-mono transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedCode === camp.campaignCode ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#141414] border border-[#343434] rounded-2xl p-6 flex flex-col gap-5 text-[#F7F7F5] shadow-2xl">
            <h3 className="text-lg font-bold text-[#F7F7F5]">Create Outreach Campaign</h3>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#F7F7F5]">Prospect / Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Enterprises"
                  value={prospectName}
                  onChange={(e) => {
                    setProspectName(e.target.value);
                    if (!campaignCode) {
                      setCampaignCode(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#F7F7F5]">Campaign Unique Code (URL slug)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. sharma-vip"
                  value={campaignCode}
                  onChange={(e) => setCampaignCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] font-mono focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#F7F7F5]">Primary Niche Focus</label>
                  <select
                    value={nicheId}
                    onChange={(e) => setNicheId(e.target.value as NicheId)}
                    className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                  >
                    {Object.values(NICHES).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#F7F7F5]">Duration</label>
                  <select
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                  >
                    <option value={7}>7 Days Active</option>
                    <option value={14}>14 Days Active</option>
                    <option value={30}>30 Days Active</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#F7F7F5]">Niche Business Name Override</label>
                <input
                  type="text"
                  placeholder="e.g. Sharma Luxury Interiors"
                  value={businessNameOverride}
                  onChange={(e) => setBusinessNameOverride(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                />
                <span className="text-[10px] text-[#888]">
                  Guaranteed Niche Isolation: This override will strictly apply only when viewing {nicheId} designs.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#222]">
                <Button variant="ghost" size="sm" type="button" onClick={() => setCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Save & Generate Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
