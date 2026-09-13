"use client";

import React, { useState } from "react";
import { Settings, Save, ShieldCheck, Sparkles, Phone, Mail } from "lucide-react";
import { Button } from "@/components/shared/Button";

export default function AdminSettingsPage() {
  const [whatsapp, setWhatsapp] = useState(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110");
  const [salesEmail, setSalesEmail] = useState(process.env.SALES_EMAIL || "revntrix@gmail.com");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
        <div>
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest">
            Configuration • Revntrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F7F7F5] mt-1">Agency Settings</h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-[#121212] border border-[#262626] rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
        {saved && (
          <div className="p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs text-[#22C55E]">
            ✓ Settings updated successfully.
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#F7F7F5] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Public Sales WhatsApp Number (with Country Code)</span>
          </label>
          <input
            type="text"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] font-mono focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
          />
          <span className="text-[11px] text-[#888]">Used to generate wa.me deep links across the public showcase.</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#F7F7F5] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span>Public Sales Email Address (mailto: fallback)</span>
          </label>
          <input
            type="email"
            required
            value={salesEmail}
            onChange={(e) => setSalesEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#343434] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
          />
        </div>

        <div className="pt-3 border-t border-[#222] flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
