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
    <div className="flex flex-col gap-4 bg-[#E3F2FD]/50 border border-[#90CAF9] rounded-2xl p-5">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-[#0D47A1] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2196F3]" />
          Choose your preferred conversation channel
        </h4>
        <p className="text-xs text-[#0D47A1]/70">
          Connect instantly with our design directors. WhatsApp is fastest (typically &lt;5 min response).
        </p>
      </div>

      {/* Primary WhatsApp Action */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onSuccess?.()}
        className="flex items-center justify-between p-3.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 hover:bg-[#25D366]/25 transition-all text-[#0D47A1] group min-h-[48px]"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-[#0D47A1] group-hover:text-[#25D366] transition-colors">
              Continue to WhatsApp
            </div>
            <div className="text-xs text-[#0D47A1]/70">Opens chat with pre-filled design context</div>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#0D47A1]/60 group-hover:text-[#25D366] transition-colors" />
      </a>

      {/* Alternative Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {/* Email Fallback */}
        <a
          href={mailtoUrl}
          onClick={() => onSuccess?.()}
          className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#90CAF9] hover:border-[#2196F3] text-[#0D47A1] transition-all text-xs font-semibold min-h-[44px]"
        >
          <Mail className="w-4 h-4 text-[#2196F3] shrink-0" />
          <div className="truncate">
            <span className="block text-[#0D47A1]">Email Agency</span>
            <span className="text-[10px] text-[#0D47A1]/70 truncate">{salesEmail}</span>
          </div>
        </a>

        {/* Copy Message Fallback */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#90CAF9] hover:border-[#2196F3] text-[#0D47A1] transition-all text-xs font-semibold text-left min-h-[44px]"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#2196F3] shrink-0" />
          ) : (
            <Copy className="w-4 h-4 text-[#2196F3] shrink-0" />
          )}
          <div className="truncate">
            <span className="block text-[#0D47A1]">
              {copied ? "Message Copied!" : "Copy Full Message"}
            </span>
            <span className="text-[10px] text-[#0D47A1]/70">For manual pasting</span>
          </div>
        </button>
      </div>

      {/* Manual Selectable Textarea if clipboard unavailable */}
      {showManualCopy && (
        <div className="flex flex-col gap-2 pt-2 border-t border-[#90CAF9]/60">
          <span className="text-[11px] text-[#0D47A1]/70 font-semibold">
            Select & copy your message below:
          </span>
          <textarea
            readOnly
            rows={4}
            value={message}
            className="w-full p-2.5 rounded-lg bg-white border border-[#90CAF9] text-xs font-mono text-[#0D47A1] focus:outline-none select-all"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>
      )}
    </div>
  );
}
