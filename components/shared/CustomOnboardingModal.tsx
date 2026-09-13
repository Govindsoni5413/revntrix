"use client";

import React, { useState } from "react";
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Building,
  Target,
  Palette,
  Layers,
  FileCheck,
  CheckCircle2,
  Wand2,
} from "lucide-react";
import { Button } from "./Button";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { FallbackHandoff } from "./FallbackHandoff";
import { NicheId, NICHES } from "@/lib/design-registry";

type CustomOnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultNicheId?: NicheId;
  defaultBusinessName?: string;
  campaignId?: string | null;
};

export function CustomOnboardingModal({
  isOpen,
  onClose,
  defaultNicheId = "INT",
  defaultBusinessName = "",
  campaignId,
}: CustomOnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [nicheId, setNicheId] = useState<NicheId>(defaultNicheId);
  const [businessName, setBusinessName] = useState(defaultBusinessName);
  const [phone, setPhone] = useState("");
  const [mainGoal, setMainGoal] = useState("High-Conversion Lead Generation");
  const [stylePreference, setStylePreference] = useState("Modern Luxury & Editorial");
  const [features, setFeatures] = useState<string[]>([
    "WhatsApp Quick Chat",
    "Interactive Portfolio / Gallery",
  ]);
  const [referenceUrl, setReferenceUrl] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [aiAssistEnabled, setAiAssistEnabled] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleAiRefine = async () => {
    if (!customNotes.trim() && !businessName.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          nicheId,
          mainGoal,
          stylePreference,
          features,
          notes: customNotes,
        }),
      });
      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      }
    } catch {
      // Graceful fallback to manual text
    } finally {
      setAiLoading(false);
    }
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!businessName.trim()) {
        newErrors.businessName = "Please provide your business or brand name.";
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(5, prev + 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!consentGiven) {
      setErrors({ consent: "Consent is required to submit your custom brief." });
      return;
    }

    setSubmitting(true);
    setErrors({});

    const formattedBrief = [
      `*CUSTOM WEBSITE ARCHITECTURE BRIEF*`,
      `===============================`,
      `• *Business Name:* ${businessName.trim()}`,
      `• *Industry Niche:* ${NICHES[nicheId]?.name || nicheId}`,
      `• *Primary Objective:* ${mainGoal}`,
      `• *Aesthetic Style:* ${stylePreference}`,
      `• *Required Features:* ${features.join(", ")}`,
      referenceUrl.trim() ? `• *Reference URL:* ${referenceUrl.trim()}` : null,
      (aiSummary || customNotes).trim()
        ? `• *Vision & Notes:* ${(aiSummary || customNotes).trim()}`
        : null,
      phone.trim() ? `• *Contact Phone:* ${phone.trim()}` : null,
      `===============================`,
      `Looking forward to discussing this tailored project!`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: businessName.trim(),
          nicheId,
          intent: "custom",
          campaignId: campaignId || undefined,
          phone: phone.trim() || undefined,
          requirements: formattedBrief,
          consentGiven: true,
        }),
      });

      setGeneratedMessage(formattedBrief);
      setCompleted(true);
    } catch {
      setGeneratedMessage(formattedBrief);
      setCompleted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const availableFeatures = [
    "WhatsApp Quick Chat",
    "Interactive Portfolio / Gallery",
    "Online Booking / Appointments",
    "Customer Reviews / Testimonials",
    "Menu / Catalog Filter Engine",
    "Payment Gateway / D2C Checkout",
    "Interactive Calculators / Quizzes",
    "Multi-Location / Map Directory",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white border border-[#DDD5BE] rounded-3xl shadow-2xl overflow-hidden text-[#0B1226]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#ECE6D0] bg-[#F5F1DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0046FF]/10 border border-[#0046FF]/20 flex items-center justify-center text-[#001BB7]">
              <Wand2 className="w-4 h-4 text-[#FF8040]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B1226]">
                Custom Architecture Brief
              </h3>
              <p className="text-xs text-[#4F5D75] font-semibold">
                {!completed ? `Step ${step} of 5 — Project Brief` : "Brief Ready"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#4F5D75] hover:text-[#0B1226] hover:bg-[#ECE6D0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!completed && (
          <div className="w-full bg-[#ECE6D0] h-1.5">
            <div
              className="bg-[#0046FF] h-1.5 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {!completed ? (
            <div className="flex flex-col gap-5">
              {/* STEP 1: Business Info */}
              {step === 1 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B1226]">
                    <Building className="w-4 h-4 text-[#0046FF]" />
                    <span>Step 1: Business & Industry Niche</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1226]">
                      Industry Niche <span className="text-[#0046FF]">*</span>
                    </label>
                    <select
                      value={nicheId}
                      onChange={(e) => setNicheId(e.target.value as NicheId)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F5F1DC] border border-[#DDD5BE] rounded-xl text-[#0B1226] focus:outline-none focus:border-[#0046FF] min-h-[44px]"
                    >
                      {Object.values(NICHES).map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1226]">
                      Business / Brand Name <span className="text-[#0046FF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Luxury Living"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#F5F1DC] border rounded-xl text-[#0B1226] focus:outline-none transition-colors min-h-[44px] ${
                        errors.businessName
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#DDD5BE] focus:border-[#0046FF]"
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-600 font-medium">{errors.businessName}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1226]">
                      Contact Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F5F1DC] border border-[#DDD5BE] rounded-xl text-[#0B1226] focus:outline-none focus:border-[#0046FF] min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Main Goal */}
              {step === 2 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B1226]">
                    <Target className="w-4 h-4 text-[#0046FF]" />
                    <span>Step 2: Primary Website Objective</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      "High-Conversion Lead Generation (WhatsApp / Calls)",
                      "Brand Authority & Editorial Portfolio",
                      "Direct Bookings & Reservation System",
                      "E-Commerce Catalog & Online Orders",
                      "Full Brand Identity & Website Re-design",
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => setMainGoal(goal)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between min-h-[44px] ${
                          mainGoal === goal
                            ? "bg-[#0046FF]/10 border-[#0046FF] text-[#001BB7]"
                            : "bg-[#F5F1DC] border-[#DDD5BE] text-[#4F5D75] hover:border-[#0046FF]"
                        }`}
                      >
                        <span>{goal}</span>
                        {mainGoal === goal && <Check className="w-4 h-4 text-[#0046FF]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Style Direction */}
              {step === 3 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B1226]">
                    <Palette className="w-4 h-4 text-[#0046FF]" />
                    <span>Step 3: Visual Aesthetic & Style Direction</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      "Modern Luxury & Editorial",
                      "Clean Minimalist & Typography Focus",
                      "High-Tech Asymmetric & Interactive",
                      "Warm Heritage & Rich Tones",
                      "Bold High-Impact DTC Performance",
                    ].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setStylePreference(style)}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between min-h-[44px] ${
                          stylePreference === style
                            ? "bg-[#0046FF]/10 border-[#0046FF] text-[#001BB7]"
                            : "bg-[#F5F1DC] border-[#DDD5BE] text-[#4F5D75] hover:border-[#0046FF]"
                        }`}
                      >
                        <span>{style}</span>
                        {stylePreference === style && (
                          <Check className="w-4 h-4 text-[#0046FF]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Features & References */}
              {step === 4 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B1226]">
                    <Layers className="w-4 h-4 text-[#0046FF]" />
                    <span>Step 4: Required Features & References</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#0B1226]">
                      Select Desired Components
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableFeatures.map((feat) => {
                        const active = features.includes(feat);
                        return (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 min-h-[44px] ${
                              active
                                ? "bg-[#0046FF]/10 border-[#0046FF] text-[#001BB7]"
                                : "bg-[#F5F1DC] border-[#DDD5BE] text-[#4F5D75] hover:border-[#0046FF]"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                active
                                  ? "bg-[#0046FF] border-[#0046FF] text-white"
                                  : "border-[#DDD5BE]"
                              }`}
                            >
                              {active && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="truncate">{feat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0B1226]">
                      Reference Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={referenceUrl}
                      onChange={(e) => setReferenceUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F5F1DC] border border-[#DDD5BE] rounded-xl text-[#0B1226] focus:outline-none focus:border-[#0046FF] min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Review & AI Assistant & Consent */}
              {step === 5 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0B1226]">
                    <FileCheck className="w-4 h-4 text-[#0046FF]" />
                    <span>Step 5: Review Brief & Finalize</span>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#F5F1DC] border border-[#DDD5BE] rounded-2xl p-4 flex flex-col gap-2 text-xs text-[#4F5D75]">
                    <div>
                      <strong className="text-[#0B1226]">Business:</strong> {businessName} (
                      {NICHES[nicheId]?.name})
                    </div>
                    <div>
                      <strong className="text-[#0B1226]">Goal:</strong> {mainGoal}
                    </div>
                    <div>
                      <strong className="text-[#0B1226]">Style:</strong> {stylePreference}
                    </div>
                    <div>
                      <strong className="text-[#0B1226]">Features:</strong> {features.join(", ")}
                    </div>
                  </div>

                  {/* Additional notes with optional AI button */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#0B1226]">
                        Project Notes / Specific Vision
                      </label>
                      <button
                        type="button"
                        onClick={handleAiRefine}
                        disabled={aiLoading}
                        className="text-[11px] text-[#0046FF] hover:text-[#001BB7] flex items-center gap-1 font-bold transition-colors"
                      >
                        <Wand2 className="w-3 h-3 text-[#FF8040]" />
                        {aiLoading ? "Refining..." : "AI Polish Brief"}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Add any specific requirements, deadlines, or design inspirations..."
                      value={aiSummary || customNotes}
                      onChange={(e) => {
                        setCustomNotes(e.target.value);
                        setAiSummary("");
                      }}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F5F1DC] border border-[#DDD5BE] rounded-xl text-[#0B1226] focus:outline-none focus:border-[#0046FF]"
                    />
                  </div>

                  {/* Legal Consent Checkbox */}
                  <ConsentCheckbox
                    checked={consentGiven}
                    onChange={setConsentGiven}
                    error={errors.consent}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#ECE6D0]">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleNext}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                    disabled={submitting}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    {submitting ? "Saving..." : "Submit to WhatsApp"}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="text-xs text-[#0B1226]">
                  <strong className="block text-[#0B1226] text-sm font-bold">
                    Custom Brief Formatted
                  </strong>
                  Click below to open WhatsApp with your comprehensive project briefing.
                </div>
              </div>

              <FallbackHandoff
                message={generatedMessage}
                businessName={businessName}
                designName="Custom Architecture"
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
