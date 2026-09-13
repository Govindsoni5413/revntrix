"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "./Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildMailtoUrl } from "@/lib/email-fallback";

type FallbackHandoffProps = {
  message: string;
  businessName: string;
  designName?: string;
  whatsappNumber?: string;
  salesEmail?: string;
  onSuccess?: () => void;
};

export function FallbackHandoff({
  message,
  businessName,
  designName = "Selected Design",
  whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918764274110",
  salesEmail = process.env.SALES_EMAIL || "revntrix@gmail.com",
  onSuccess,
}: FallbackHandoffProps) {
  const [copied, setCopied] = useState(false);
  const [showManualCopy, setShowManualCopy] = useState(false);

  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, message);
  const mailtoUrl = buildMailtoUrl(
    salesEmail,
    `Website Project Enquiry — ${businessName} (${designName})`,
    message
  );

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        onSuccess?.();
      } else {
        setShowManualCopy(true);
      }
    } catch {
      setShowManualCopy(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-[#141414] border border-[#343434] rounded-xl p-5">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-[#F7F7F5] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          Choose your preferred conversation channel
        </h4>
        <p className="text-xs text-[#A7A7A0]">
          Connect instantly with our design directors. WhatsApp is fastest (typically &lt;5 min response).
        </p>
      </div>

      {/* Primary WhatsApp Action */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onSuccess?.()}
        className="flex items-center justify-between p-3.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all text-[#25D366] group min-h-[48px]"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-[#080808]">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-[#F7F7F5] group-hover:text-[#25D366] transition-colors">
              Continue to WhatsApp
            </div>
            <div className="text-xs text-[#A7A7A0]">Opens chat with pre-filled design context</div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#A7A7A0] group-hover:text-[#25D366] transition-colors" />
      </a>

      {/* Alternative Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {/* Email Fallback */}
        <a
          href={mailtoUrl}
          onClick={() => onSuccess?.()}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-[#1D1D1D] border border-[#343434] hover:border-[#D4A72C]/40 text-[#F7F7F5] transition-all text-xs font-medium min-h-[44px]"
        >
          <Mail className="w-4 h-4 text-[#D4A72C] shrink-0" />
          <div className="truncate">
            <span className="block text-[#F7F7F5]">Email Agency</span>
            <span className="text-[10px] text-[#A7A7A0] truncate">{salesEmail}</span>
          </div>
        </a>

        {/* Copy Message Fallback */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-[#1D1D1D] border border-[#343434] hover:border-[#D4A72C]/40 text-[#F7F7F5] transition-all text-xs font-medium text-left min-h-[44px]"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
          ) : (
            <Copy className="w-4 h-4 text-[#D4A72C] shrink-0" />
          )}
          <div>
            <span className="block text-[#F7F7F5]">
              {copied ? "Copied to Clipboard!" : "Copy Message"}
            </span>
            <span className="text-[10px] text-[#A7A7A0]">Manual paste anywhere</span>
          </div>
        </button>
      </div>

      {/* Selectable text area fallback for denied clipboard */}
      {showManualCopy && (
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#262626]">
          <span className="text-xs text-[#A7A7A0]">
            Select and copy the pre-formatted message below:
          </span>
          <textarea
            readOnly
            rows={4}
            value={message}
            className="w-full p-2.5 text-xs bg-[#080808] border border-[#343434] rounded-lg text-[#F7F7F5] font-mono focus:outline-none focus:border-[#D4A72C]"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>
      )}
    </div>
  );
}
