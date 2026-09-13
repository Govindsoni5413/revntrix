"use client";

import React, { useState } from "react";
import { Stethoscope, ShieldCheck, Clock, Users, Calendar, Award, CheckCircle } from "lucide-react";

export default function CLN_01Design({ businessName = "Apex Multispecialty Hospital" }: { businessName?: string }) {
  const [selectedDept, setSelectedDept] = useState("cardiology");

  const departments = {
    cardiology: {
      name: "Cardiology & Vascular Sciences",
      head: "Dr. Ananya Roy, MD, DM (Cardiology)",
      services: ["Comprehensive 2D Echocardiography", "Preventive Cardiac Health Check", "Angiography & Stenting Unit"],
      timing: "Mon–Sat: 09:00 AM – 06:00 PM",
    },
    orthopedics: {
      name: "Orthopedics & Joint Reconstruction",
      head: "Dr. Vikram Sethi, MS (Ortho), MCh",
      services: ["Robotic Knee Replacement", "Sports Arthroscopy Clinic", "Spine & Posture Rehabilitation"],
      timing: "Mon–Fri: 10:00 AM – 07:00 PM",
    },
    neurology: {
      name: "Neurology & Stroke Clinic",
      head: "Dr. Siddharth Menon, MD, DM (Neuro)",
      services: ["24/7 Acute Stroke Intervention", "Epilepsy & Migraine Management", "Neuro-Electrophysiology Lab"],
      timing: "Mon–Sat: 09:30 AM – 05:30 PM",
    },
  };

  const current = departments[selectedDept as keyof typeof departments] || departments.cardiology;

  return (
    <div className="bg-[#08090A] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Hospital Hero */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#222] pb-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              NABH Accredited Healthcare Center
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F7F5]">
              {businessName}
            </h1>
            <p className="text-xs sm:text-sm text-[#A7A7A0] leading-relaxed">
              Leading multispecialty healthcare excellence. Offering cutting-edge diagnostic technology, round-the-clock emergency support, and senior super-specialist consultations.
            </p>
          </div>

          <div className="bg-[#121417] p-5 rounded-2xl border border-[#2B303A] flex flex-col gap-2 shrink-0 min-w-[240px]">
            <span className="text-[10px] uppercase font-mono text-[#D4A72C]">Emergency Response</span>
            <span className="text-xl font-bold text-[#F7F7F5]">24/7 Critical Care</span>
            <span className="text-xs text-[#22C55E] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Ambulance on Standby
            </span>
          </div>
        </div>

        {/* Department Directory Switcher */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[#F7F7F5]">Super-Specialty Departments</h3>
            <div className="flex items-center gap-2 bg-[#121417] p-1 rounded-xl border border-[#262A33]">
              {(["cardiology", "orthopedics", "neurology"] as const).map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs capitalize transition-all min-h-[38px] ${
                    selectedDept === dept ? "bg-[#D4A72C] text-black font-bold" : "text-[#888] hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Department Card */}
          <div className="bg-[#101215] border border-[#232730] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E222A] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4A72C] uppercase">Department Lead</span>
                <h4 className="text-lg font-bold text-[#F7F7F5]">{current.head}</h4>
              </div>
              <span className="text-xs font-mono text-[#A7A7A0] bg-[#181B20] px-3 py-1.5 rounded-lg border border-[#2B303A]">
                🕒 {current.timing}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-[#A7A7A0] uppercase tracking-wider">
                Clinical Diagnostic & Treatment Services
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {current.services.map((svc, i) => (
                  <div key={i} className="bg-[#16191E] p-3.5 rounded-xl border border-[#282D38] text-xs text-[#F7F7F5] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
