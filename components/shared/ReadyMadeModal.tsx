"use client";

import React, { useState } from "react";
import { X, Sparkles, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { FallbackHandoff } from "./FallbackHandoff";
import { buildWhatsAppMessage } from "@/lib/whatsapp";
import { NicheId, NICHES } from "@/lib/design-registry";

type ReadyMadeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  designId: string;
  designName: string;
  nicheId: NicheId;
  defaultBusinessName?: string;
  campaignId?: string | null;
};

export function ReadyMadeModal({
  isOpen,
  onClose,
  designId,
  designName,
  nicheId,
  defaultBusinessName = "",
  campaignId,
}: ReadyMadeModalProps) {
  const [businessName, setBusinessName] = useState(defaultBusinessName);
  const [phone, setPhone] = useState("");
  const [requirements, setRequirements] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "handoff">("form");
  const [generatedMessage, setGeneratedMessage] = useState("");

  if (!isOpen) return null;

  const nicheMeta = NICHES[nicheId];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!businessName.trim()) {
      newErrors.businessName = "Please enter your business or brand name.";
    }

    if (!consentGiven) {
      newErrors.consent = "You must agree to be contacted to proceed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const formattedMessage = buildWhatsAppMessage({
      businessName: businessName.trim(),
      nicheName: nicheMeta?.name || nicheId,
      designId,
      designName,
      intent: "ready_made",
    });

    try {
      // Server-side lead registration
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          nicheId,
          designId,
          intent: "ready_made",
          campaignId: campaignId || undefined,
          phone: phone.trim() || undefined,
          requirements: requirements.trim() || undefined,
          consentGiven: true,
        }),
      });

      if (!res.ok) {
        console.warn("Lead recorded with client fallback.");
      }

      setGeneratedMessage(formattedMessage);
      setStep("handoff");
    } catch {
      setGeneratedMessage(formattedMessage);
      setStep("handoff");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white border border-[#90CAF9] rounded-3xl shadow-2xl overflow-hidden text-[#0A2E6B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#D9EDFC] bg-[#E3F2FD]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2196F3]/15 border border-[#2196F3]/30 flex items-center justify-center text-[#0D47A1]">
              <Sparkles className="w-4 h-4 text-[#2196F3]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0D47A1]">
                {step === "form" ? "Ready-Made Design Selection" : "Handoff Ready"}
              </h3>
              <p className="text-xs text-[#3A608F] font-semibold">
                {designId} • {designName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#3A608F] hover:text-[#0D47A1] hover:bg-[#D9EDFC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "form" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="bg-[#E3F2FD] p-4 rounded-2xl border border-[#90CAF9]">
                <p className="text-xs text-[#3A608F] leading-relaxed">
                  We will take this exact <strong className="text-[#0D47A1]">{designName}</strong>{" "}
                  architecture, customize your branding, imagery & copy, and deploy it to your domain.
                </p>
              </div>

              {/* Business Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0D47A1]">
                  Business / Brand Name <span className="text-[#2196F3]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Interiors, Apex Dental Care"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm bg-[#E3F2FD] border rounded-xl text-[#0A2E6B] focus:outline-none transition-colors min-h-[44px] ${
                    errors.businessName
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#90CAF9] focus:border-[#2196F3]"
                  }`}
                />
                {errors.businessName && (
                  <p className="text-xs text-red-600 font-medium">{errors.businessName}</p>
                )}
              </div>

              {/* Contact Phone / WhatsApp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0D47A1]">
                  Phone / WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#E3F2FD] border border-[#90CAF9] rounded-xl text-[#0A2E6B] focus:outline-none focus:border-[#2196F3] min-h-[44px]"
                />
              </div>

              {/* Specific notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0D47A1]">
                  Specific Requirements or Deadline (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any particular features, timeline, or color requirements?"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#E3F2FD] border border-[#90CAF9] rounded-xl text-[#0A2E6B] focus:outline-none focus:border-[#2196F3]"
                />
              </div>

              {/* Explicit Legal Consent Checkbox */}
              <ConsentCheckbox
                checked={consentGiven}
                onChange={setConsentGiven}
                error={errors.consent}
              />

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={submitting}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="mt-2"
              >
                {submitting ? "Preparing Handoff..." : "Continue to WhatsApp Handoff"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="text-xs text-[#0A2E6B]">
                  <strong className="block text-[#0D47A1] text-sm font-bold">
                    Enquiry Details Saved
                  </strong>
                  Click below to open WhatsApp with your pre-formatted project details.
                </div>
              </div>

              <FallbackHandoff
                message={generatedMessage}
                businessName={businessName}
                designName={designName}
                onSuccess={() => {}}
              />

              <Button variant="ghost" size="sm" onClick={onClose} fullWidth>
                Close Window
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
