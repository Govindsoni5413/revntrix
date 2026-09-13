"use client";

import React, { useState } from "react";
import { Calendar, Clock, User, CheckCircle2, ArrowRight } from "lucide-react";

export default function CLN_07Design({ businessName = "Apex FastTrack Clinic" }: { businessName?: string }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("General Health Consultation");
  const [selectedDate, setSelectedDate] = useState("Tomorrow, 10:30 AM");

  return (
    <div className="bg-[#090A0C] text-[#F7F7F5] min-h-screen font-sans p-6 sm:p-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#D4A72C] uppercase tracking-widest bg-[#D4A72C]/10 px-3 py-1 rounded-full border border-[#D4A72C]/30">
            Rapid Appointment Flow
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#F7F7F5]">Book Your Clinical Appointment</h1>
          <p className="text-xs text-[#A7A7A0]">Step {step} of 3 • Real-Time Doctor Availability</p>
        </div>

        <div className="bg-[#121418] border border-[#242832] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[#D4A72C] uppercase">1. Select Consultation Service</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  "General Health Consultation (30 mins)",
                  "Diabetes & Blood Pressure Review",
                  "Comprehensive Full Body Blood Diagnostics",
                  "Physiotherapy & Posture Rehab Session",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedService(s)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all min-h-[44px] ${
                      selectedService === s
                        ? "bg-[#D4A72C]/15 border-[#D4A72C] text-[#F7F7F5]"
                        : "bg-[#181B22] border-[#2A303E] text-[#888] hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-2 py-3 rounded-xl bg-[#D4A72C] text-black font-bold text-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Select Time Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[#D4A72C] uppercase">2. Select Preferred Time Slot</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {["Today, 04:30 PM", "Today, 06:00 PM", "Tomorrow, 10:30 AM", "Tomorrow, 02:00 PM"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedDate(t)}
                    className={`p-3.5 rounded-xl border text-center text-xs font-medium transition-all min-h-[44px] ${
                      selectedDate === t
                        ? "bg-[#D4A72C]/15 border-[#D4A72C] text-[#F7F7F5]"
                        : "bg-[#181B22] border-[#2A303E] text-[#888] hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-[#181B22] border border-[#2A303E] text-xs font-medium text-[#A7A7A0] min-h-[44px]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 rounded-xl bg-[#D4A72C] text-black font-bold text-xs flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Confirm Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 text-center items-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#F7F7F5]">Appointment Slot Reserved</h3>
              <div className="bg-[#181B22] border border-[#2A303E] p-4 rounded-xl text-xs text-[#A7A7A0] w-full text-left flex flex-col gap-1">
                <div><strong className="text-white">Service:</strong> {selectedService}</div>
                <div><strong className="text-white">Time:</strong> {selectedDate}</div>
                <div><strong className="text-white">Clinic:</strong> {businessName}</div>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#D4A72C] hover:underline"
              >
                Book Another Slot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
