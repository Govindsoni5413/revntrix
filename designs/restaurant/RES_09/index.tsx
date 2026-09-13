"use client";

import React, { useState } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

export default function RES_09Design({ businessName = "Bawarchi Legacy Outlets" }: { businessName?: string }) {
  const [city, setCity] = useState("Mumbai");

  const outlets: Record<string, { address: string; timing: string; phone: string }> = {
    Mumbai: { address: "Pali Naka, Bandra West", timing: "12:00 PM – 11:30 PM", phone: "+91 98200 12345" },
    Delhi: { address: "Khan Market, New Delhi", timing: "12:30 PM – 11:00 PM", phone: "+91 98110 54321" },
    Bangalore: { address: "100ft Road, Indiranagar", timing: "12:00 PM – 11:30 PM", phone: "+91 98450 98765" },
  };

  const current = outlets[city];

  return (
    <div className="bg-[#090807] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222] pb-6">
          <div>
            <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
              Multi-City Presence • {businessName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5] mt-1">Select Your Nearest Location</h1>
          </div>

          <div className="flex items-center gap-2">
            {["Mumbai", "Delhi", "Bangalore"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                  city === c ? "bg-[#D4A72C] text-black" : "bg-[#161311] text-[#888] border border-[#2B231F]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#14100E] border border-[#2B201A] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center gap-2 text-[#D4A72C] text-sm font-bold">
            <MapPin className="w-4 h-4" />
            <span>{city} Flagship Outlet</span>
          </div>
          <h3 className="text-xl font-bold text-[#F7F7F5]">{current.address}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#241A15] text-xs text-[#A7A7A0]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4A72C]" />
              <span>Dine-In: {current.timing}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4A72C]" />
              <span>Direct Reservations: {current.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
