"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Send,
  Briefcase,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Lead Pipeline", icon: Users },
    { href: "/admin/outreach/campaigns", label: "Outreach Campaigns", icon: Send },
    { href: "/admin/clients", label: "Client CRM", icon: Briefcase },
    { href: "/admin/projects", label: "Active Projects", icon: FolderKanban },
    { href: "/admin/analytics", label: "Analytics Funnel", icon: BarChart3 },
    { href: "/admin/settings", label: "Agency Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Header for Admin */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#121212] border-b border-[#262626] text-[#F7F7F5]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
          <span className="text-sm font-bold">Revntrix Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-[#1D1D1D] border border-[#333] text-[#F7F7F5]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0E0E0E] border-r border-[#262626] p-5 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="relative w-36 h-8">
              <Image src="/brand/revntrix-logo.svg" alt="Revntrix" fill className="object-contain" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-[#888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2B2B2B] text-[11px] text-[#D4A72C] font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Authorized Agency Operator</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all min-h-[44px] ${
                    active
                      ? "bg-[#D4A72C] text-black font-bold shadow-lg"
                      : "text-[#A7A7A0] hover:text-[#F7F7F5] hover:bg-[#181818]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#1F1F1F] flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#A7A7A0] hover:text-[#F7F7F5] transition-colors"
          >
            <span>Public Showcase</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Portal</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
