"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type ConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  error?: string;
};

export function ConsentCheckbox({
  checked,
  onChange,
  id = "consent-checkbox",
  error,
}: ConsentCheckboxProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-start gap-3 cursor-pointer select-none group min-h-[44px] py-1"
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <div
            className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
              checked
                ? "bg-[#D4A72C] border-[#D4A72C] text-[#080808]"
                : "bg-[#141414] border-[#343434] group-hover:border-[#A7A7A0]"
            } ${error ? "border-red-500" : ""}`}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
        <span className="text-xs text-[#A7A7A0] leading-relaxed group-hover:text-[#F7F7F5] transition-colors">
          I agree to be contacted via WhatsApp/Email regarding this enquiry and accept the{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="text-[#D4A72C] underline hover:text-[#F3C64E]"
            onClick={(e) => e.stopPropagation()}
          >
            Privacy Terms
          </Link>
          .
        </span>
      </label>
      {error && <p className="text-xs text-red-400 pl-8">{error}</p>}
    </div>
  );
}
