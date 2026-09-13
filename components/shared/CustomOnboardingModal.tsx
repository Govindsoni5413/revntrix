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
  const [stylePreference, setStylePreference] = useState("Modern Luxury & Dark Minimal");
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
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!consentGiven) {
      setErrors({ consent: "Please agree to the contact consent to proceed." });
      return;
    }

    setSubmitting(true);
    setErrors({});

    const summaryText = aiSummary || customNotes || "Bespoke custom architecture";

    const formattedMessage = [
      "Hello Revntrix Team,",
      "",
      `Business: ${businessName.trim()}`,
      `Niche: ${NICHES[nicheId]?.name || nicheId}`,
      `Intent: custom (Custom Architecture Inquiry)`,
      `Primary Goal: ${mainGoal}`,
      `Style Direction: ${stylePreference}`,
      `Key Features: ${features.join(", ")}`,
      referenceUrl ? `Reference: ${referenceUrl}` : null,
      `Notes: ${summaryText}`,
      "",
      "I would like to discuss a tailored website design project.",
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
          designId: "CUSTOM_ARCH",
          intent: "custom",
          campaignId: campaignId || undefined,
          phone: phone.trim() || undefined,
          requirements: JSON.stringify({
            mainGoal,
            stylePreference,
            features,
            referenceUrl,
            notes: summaryText,
          }),
          consentGiven: true,
        }),
      });
    } catch (e) {
      console.warn("Custom lead saved locally fallback", e);
    } finally {
      setGeneratedMessage(formattedMessage);
      setCompleted(true);
      setSubmitting(false);
    }
  };

  const availableFeatures = [
    "WhatsApp Quick Chat",
    "Interactive Portfolio / Gallery",
    "Appointment / Table Booking Flow",
    "Filterable Product / Listing Catalog",
    "Before / After Transformation Slider",
    "Diamond / Property Consultation Estimator",
    "Multi-location Support",
    "Direct Checkout / Cart Drawer",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#141414] border border-[#343434] rounded-2xl shadow-2xl overflow-hidden text-[#F7F7F5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#262626] bg-[#1D1D1D]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#F7F7F5]">
                Custom Design Architecture
              </h3>
              <p className="text-xs text-[#A7A7A0]">
                {!completed ? `Step ${step} of 5 — Project Brief` : "Brief Ready"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A7A7A0] hover:text-[#F7F7F5] hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!completed && (
          <div className="w-full bg-[#1D1D1D] h-1">
            <div
              className="bg-gradient-to-r from-[#F3C64E] to-[#D4A72C] h-1 transition-all duration-300"
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
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F7F7F5]">
                    <Building className="w-4 h-4 text-[#D4A72C]" />
                    <span>Step 1: Business & Industry Niche</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#F7F7F5]">
                      Industry Niche <span className="text-[#D4A72C]">*</span>
                    </label>
                    <select
                      value={nicheId}
                      onChange={(e) => setNicheId(e.target.value as NicheId)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#080808] border border-[#343434] rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                    >
                      {Object.values(NICHES).map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#F7F7F5]">
                      Business / Brand Name <span className="text-[#D4A72C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Luxury Living"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#080808] border rounded-lg text-[#F7F7F5] focus:outline-none transition-colors min-h-[44px] ${
                        errors.businessName
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#343434] focus:border-[#D4A72C]"
                      }`}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-400">{errors.businessName}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#F7F7F5]">
                      Contact Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#080808] border border-[#343434] rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Main Goal */}
              {step === 2 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F7F7F5]">
                    <Target className="w-4 h-4 text-[#D4A72C]" />
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
                        className={`p-3.5 rounded-lg border text-left text-xs font-medium transition-all flex items-center justify-between min-h-[44px] ${
                          mainGoal === goal
                            ? "bg-[#D4A72C]/10 border-[#D4A72C] text-[#F7F7F5]"
                            : "bg-[#1D1D1D] border-[#343434] text-[#A7A7A0] hover:border-[#A7A7A0]"
                        }`}
                      >
                        <span>{goal}</span>
                        {mainGoal === goal && <Check className="w-4 h-4 text-[#D4A72C]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Style Direction */}
              {step === 3 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F7F7F5]">
                    <Palette className="w-4 h-4 text-[#D4A72C]" />
                    <span>Step 3: Visual Aesthetic & Style Direction</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      "Modern Luxury & Dark Charcoal Minimal",
                      "Clean Editorial, Warm Off-White & Typography Focus",
                      "High-Tech Asymmetric Cyber & Glassmorphism",
                      "Heritage Gold, Regal Indian Cultural Luxury",
                      "Bold High-Impact DTC Performance & Vibrant Accents",
                    ].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setStylePreference(style)}
                        className={`p-3.5 rounded-lg border text-left text-xs font-medium transition-all flex items-center justify-between min-h-[44px] ${
                          stylePreference === style
                            ? "bg-[#D4A72C]/10 border-[#D4A72C] text-[#F7F7F5]"
                            : "bg-[#1D1D1D] border-[#343434] text-[#A7A7A0] hover:border-[#A7A7A0]"
                        }`}
                      >
                        <span>{style}</span>
                        {stylePreference === style && (
                          <Check className="w-4 h-4 text-[#D4A72C]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Features & References */}
              {step === 4 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F7F7F5]">
                    <Layers className="w-4 h-4 text-[#D4A72C]" />
                    <span>Step 4: Required Features & References</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#F7F7F5]">
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
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 min-h-[44px] ${
                              active
                                ? "bg-[#D4A72C]/10 border-[#D4A72C] text-[#F7F7F5]"
                                : "bg-[#1D1D1D] border-[#343434] text-[#A7A7A0] hover:border-[#A7A7A0]"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                active
                                  ? "bg-[#D4A72C] border-[#D4A72C] text-black"
                                  : "border-[#343434]"
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
                    <label className="text-xs font-semibold text-[#F7F7F5]">
                      Reference Website URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={referenceUrl}
                      onChange={(e) => setReferenceUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#080808] border border-[#343434] rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C] min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Review & AI Assistant & Consent */}
              {step === 5 && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F7F7F5]">
                    <FileCheck className="w-4 h-4 text-[#D4A72C]" />
                    <span>Step 5: Review Brief & Finalize</span>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#1D1D1D] border border-[#262626] rounded-xl p-4 flex flex-col gap-2.5 text-xs text-[#A7A7A0]">
                    <div>
                      <strong className="text-[#F7F7F5]">Business:</strong> {businessName} (
                      {NICHES[nicheId]?.name})
                    </div>
                    <div>
                      <strong className="text-[#F7F7F5]">Goal:</strong> {mainGoal}
                    </div>
                    <div>
                      <strong className="text-[#F7F7F5]">Style:</strong> {stylePreference}
                    </div>
                    <div>
                      <strong className="text-[#F7F7F5]">Features:</strong> {features.join(", ")}
                    </div>
                  </div>

                  {/* Additional notes with optional AI button */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#F7F7F5]">
                        Project Notes / Specific Vision
                      </label>
                      <button
                        type="button"
                        onClick={handleAiRefine}
                        disabled={aiLoading}
                        className="text-[11px] text-[#D4A72C] hover:text-[#F3C64E] flex items-center gap-1 font-medium transition-colors"
                      >
                        <Wand2 className="w-3 h-3" />
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
                      className="w-full px-3.5 py-2.5 text-xs bg-[#080808] border border-[#343434] rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#D4A72C]"
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
              <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
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
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="text-xs">
                  <strong className="block text-[#F7F7F5] text-sm font-medium">
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
