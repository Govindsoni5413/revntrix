"use client";

import React, { useState } from "react";
import { UserCheck, Search, Star, Calendar } from "lucide-react";

export default function CLN_05Design({ businessName = "CityCare Medical Polyclinic" }: { businessName?: string }) {
  const [filterDept, setFilterDept] = useState("all");

  const doctors = [
    { name: "Dr. Priyamvada Rao", dept: "gynecology", exp: "14 yrs", qual: "MD, DGO, Fellowship IVF" },
    { name: "Dr. Alok Nath Verma", dept: "pediatrics", exp: "19 yrs", qual: "MD (Pediatrics), IAP Member" },
    { name: "Dr. Tanvi Deshmukh", dept: "dermatology", exp: "11 yrs", qual: "MD, DNB (Dermatology)" },
    { name: "Dr. Rajeshwar Iyer", dept: "general", exp: "22 yrs", qual: "MBBS, MD (General Medicine)" },
  ];

  const filtered = filterDept === "all" ? doctors : doctors.filter((d) => d.dept === filterDept);

  return (
    <div className="bg-[#08090A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Consultant Directory • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">Our Specialist Panel</h1>
          </div>

          <div className="flex items-center gap-1 bg-[#121417] p-1 rounded-xl border border-[#232730]">
            {["all", "pediatrics", "gynecology", "dermatology"].map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setFilterDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all min-h-[36px] ${
                  filterDept === dept ? "bg-[#D4A72C] text-black font-bold" : "text-[#777] hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((doc, i) => (
            <div key={i} className="bg-[#101215] border border-[#232730] rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4A72C] uppercase font-bold">{doc.dept}</span>
                <h4 className="text-base font-bold text-[#F7F7F5] mt-1">{doc.name}</h4>
                <p className="text-xs text-[#888]">{doc.qual}</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#1C2028] text-xs">
                <span className="text-[#A7A7A0]">Experience: {doc.exp}</span>
                <span className="text-[#22C55E] font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Available Today
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
