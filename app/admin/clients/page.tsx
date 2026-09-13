"use client";

import React, { useState } from "react";
import { Briefcase, Plus, Phone, Mail, UserCheck } from "lucide-react";
import { Button } from "@/components/shared/Button";

export default function AdminClientsPage() {
  const [clients] = useState([
    { id: "c-1", name: "Sharma Luxury Group", contact: "Vikram Sharma", phone: "+91 98200 45678", email: "vikram@sharmagroup.in", activeProjects: 1 },
    { id: "c-2", name: "Apex Healthcare Pvt Ltd", contact: "Dr. Rohit Verma", phone: "+91 98110 87654", email: "rohit@apexhealth.in", activeProjects: 2 },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Client Directory • Revntrix CRM
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">Client Accounts</h1>
        </div>
        <span className="text-xs font-mono text-[#A7A7A0] bg-[#141414] px-3 py-1.5 rounded-lg border border-[#262626]">
          {clients.length} Active Accounts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clients.map((c) => (
          <div key={c.id} className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xl">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-[#F7F7F5]">{c.name}</h3>
                <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-0.5 rounded-full border border-[#22C55E]/20">
                  {c.activeProjects} Active Project
                </span>
              </div>
              <p className="text-xs text-[#888] mt-1">Primary Contact: {c.contact}</p>
            </div>

            <div className="flex flex-col gap-1.5 pt-3 border-t border-[#1C1C1C] text-xs text-[#A7A7A0]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{c.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
