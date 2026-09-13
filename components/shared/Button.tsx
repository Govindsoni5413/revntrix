"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A72C] disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#F3C64E] via-[#D4A72C] to-[#8F6415] text-[#080808] font-semibold hover:brightness-110 active:scale-[0.98] shadow-[0_0_20px_rgba(212,167,44,0.2)]",
    gold:
      "bg-[#D4A72C] text-[#080808] font-semibold hover:bg-[#F3C64E] active:scale-[0.98]",
    secondary:
      "bg-[#1D1D1D] text-[#F7F7F5] border border-[#343434] hover:bg-[#262626] hover:border-[#D4A72C]/40 active:scale-[0.98]",
    outline:
      "bg-transparent text-[#F7F7F5] border border-[#343434] hover:border-[#D4A72C] hover:text-[#D4A72C] active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#A7A7A0] hover:text-[#F7F7F5] hover:bg-[#1D1D1D] active:scale-[0.98]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
