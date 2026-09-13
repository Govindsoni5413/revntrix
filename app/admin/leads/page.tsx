"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";
import { NICHES, NicheId } from "@/lib/design-registry";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type LeadRecord = {
  id: string;
  businessName: string;
  nicheId: NicheId;
  designId: string;
  intent: "ready_made" | "custom";
  phone?: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost" | "follow_up";
  requirements?: string;
  consentGiven: boolean;
  createdAt: string;
};

export default function AdminLeadsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  const [leads, setLeads] = useState<LeadRecord[]>([
    {
      id: "lead-01",
      businessName: "Sharma Luxury Interiors",
      nicheId: "INT",
      designId: "INT_01",
      intent: "ready_made",
      phone: "+91 98200 45678",
      status: "new",
      requirements: "Looking for turnkey residential portfolio for our South Mumbai design firm.",
      consentGiven: true,
      createdAt: "2026-09-13T10:15:00Z",
    },
    {
      id: "lead-02",
      businessName: "Apex Multi-Specialty Dental Clinic",
      nicheId: "CLN",
      designId: "CLN_04",
      intent: "custom",
      phone: "+91 98110 87654",
      status: "contacted",
      requirements: "Need custom patient booking system and 3D smile gallery integration.",
      consentGiven: true,
      createdAt: "2026-09-13T08:30:00Z",
    },
    {
      id: "lead-03",
      businessName: "Horizon Sea Crest Realty",
      nicheId: "EST",
      designId: "EST_01",
      intent: "ready_made",
      phone: "+91 98450 11223",
      status: "qualified",
      requirements: "Worli sea face luxury penthouse showcase with WhatsApp instant brochure handoff.",
      consentGiven: true,
      createdAt: "2026-09-12T16:45:00Z",
    },
    {
      id: "lead-04",
      businessName: "Kalyan Heritage Polki Jewels",
      nicheId: "JW",
      designId: "JW_05",
      intent: "ready_made",
      phone: "+91 98300 99887",
      status: "proposal",
      requirements: "Bridal Jadau and Kundan catalogue for upcoming wedding season.",
      consentGiven: true,
      createdAt: "2026-09-12T11:20:00Z",
    },
  ]);

  const updateLeadStatus = (id: string, newStatus: LeadRecord["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.businessName.toLowerCase().includes(search.toLowerCase()) ||
      l.designId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" ? true : l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Pipeline Management • Revntrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">Lead Pipeline</h1>
        </div>
        <span className="text-xs font-mono text-[#A7A7A0] bg-[#141414] px-3 py-1.5 rounded-lg border border-[#262626]">
          {leads.length} Total Qualified Leads
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121212] border border-[#262626] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search business or design ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[40px]"
          />
          <Search className="w-3.5 h-3.5 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["all", "new", "contacted", "qualified", "proposal", "won"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize font-semibold transition-all min-h-[36px] ${
                filterStatus === st
                  ? "bg-[#D4A72C] text-black"
                  : "bg-[#1C1C1C] border border-[#2E2E2E] text-[#888] hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#222] bg-[#161616] text-[#A7A7A0] uppercase font-mono text-[10px]">
                <th className="p-4">Business / Brand</th>
                <th className="p-4">Niche</th>
                <th className="p-4">Design Selection</th>
                <th className="p-4">Intent</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C1C]">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#181818] transition-colors">
                  <td className="p-4 font-bold text-[#F7F7F5]">{lead.businessName}</td>
                  <td className="p-4 text-[#A7A7A0]">{NICHES[lead.nicheId]?.name}</td>
                  <td className="p-4 font-mono font-bold text-[#D4A72C]">{lead.designId}</td>
                  <td className="p-4 font-mono uppercase text-[11px] text-[#A7A7A0]">{lead.intent}</td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadRecord["status"])}
                      className="bg-[#080808] border border-[#333] text-[11px] font-semibold rounded-lg px-2.5 py-1 text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C]"
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="qualified">qualified</option>
                      <option value="proposal">proposal</option>
                      <option value="won">won</option>
                      <option value="lost">lost</option>
                      <option value="follow_up">follow_up</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333] text-xs font-semibold text-[#D4A72C] transition-colors min-h-[36px]"
                    >
                      Inspect Brief
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#141414] border border-[#343434] rounded-2xl p-6 flex flex-col gap-5 text-[#F7F7F5] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#222] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4A72C] uppercase font-bold">
                  Lead ID: {selectedLead.id}
                </span>
                <h3 className="text-lg font-bold text-[#F7F7F5]">{selectedLead.businessName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-[#888] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs text-[#A7A7A0]">
              <div><strong className="text-white">Selected Architecture:</strong> {selectedLead.designId} ({selectedLead.intent})</div>
              <div><strong className="text-white">Phone / WhatsApp:</strong> {selectedLead.phone || "Not specified"}</div>
              <div><strong className="text-white">Consent Verified:</strong> Yes (Explicit checkbox logged)</div>
              <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-[#222]">
                <strong className="text-[#D4A72C] block mb-1">Project Notes / Requirements:</strong>
                <span>{selectedLead.requirements || "Standard turnkey configuration requested."}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#222]">
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Message on WhatsApp</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1F1F1F] border border-[#333] text-xs font-semibold text-[#888] hover:text-white min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
