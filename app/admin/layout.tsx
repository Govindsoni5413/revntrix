import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Command Center | Revntrix",
  description: "Secure lead management, outreach campaigns, and agency CRM.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F7F7F5] flex flex-col lg:flex-row font-sans">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
