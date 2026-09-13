"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
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
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2196F3] disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#2196F3] text-white hover:bg-[#0D47A1] active:scale-[0.98] shadow-md shadow-[#2196F3]/25",
    accent:
      "bg-[#0D47A1] text-white hover:bg-[#2196F3] active:scale-[0.98] shadow-md shadow-[#0D47A1]/20",
    secondary:
      "bg-white text-[#0D47A1] border border-[#90CAF9] hover:bg-[#D9EDFC] hover:border-[#2196F3] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#0D47A1] border border-[#2196F3] hover:bg-[#2196F3]/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#3A608F] hover:text-[#0D47A1] hover:bg-[#D9EDFC] active:scale-[0.98]",
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
