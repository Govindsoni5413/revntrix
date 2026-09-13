"use client";

import React, { useState } from "react";
import { FolderKanban, Clock, CheckCircle2 } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects] = useState([
    { id: "p-1", title: "Sharma Interiors Digital Flagship", client: "Sharma Luxury Group", design: "INT_01", status: "in_progress", progress: "65%" },
    { id: "p-2", title: "Apex Dental Patient Portal", client: "Apex Healthcare Pvt Ltd", design: "CLN_04", status: "staging_review", progress: "90%" },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Production Pipeline • Revntrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">Active Projects</h1>
        </div>
        <span className="text-xs font-mono text-[#A7A7A0] bg-[#141414] px-3 py-1.5 rounded-lg border border-[#262626]">
          {projects.length} In-Flight Deliverables
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#F7F7F5]">{p.title}</h3>
                <span className="text-xs text-[#888]">Client: {p.client} • Architecture Base: <strong className="text-[#D4A72C]">{p.design}</strong></span>
              </div>
              <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#D4A72C]/10 text-[#D4A72C] border border-[#D4A72C]/30 w-fit">
                {p.status.replace("_", " ")}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1C1C1C]">
              <div className="flex justify-between text-xs text-[#A7A7A0]">
                <span>Milestone Completion</span>
                <strong className="text-[#F7F7F5] font-mono">{p.progress}</strong>
              </div>
              <div className="w-full bg-[#1C1C1C] h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#F3C64E] to-[#D4A72C] h-2 rounded-full" style={{ width: p.progress }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
