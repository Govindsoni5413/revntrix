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
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0046FF] disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#0046FF] text-white font-semibold hover:bg-[#001BB7] active:scale-[0.98] shadow-md shadow-[#0046FF]/20",
    accent:
      "bg-[#FF8040] text-white font-semibold hover:bg-[#E56725] active:scale-[0.98] shadow-md shadow-[#FF8040]/25",
    secondary:
      "bg-white text-[#0B1226] border border-[#DDD5BE] hover:bg-[#ECE6D0] hover:border-[#0046FF] active:scale-[0.98]",
    outline:
      "bg-transparent text-[#001BB7] border border-[#001BB7] hover:bg-[#0046FF]/10 active:scale-[0.98]",
    ghost:
      "bg-transparent text-[#4F5D75] hover:text-[#0B1226] hover:bg-[#ECE6D0] active:scale-[0.98]",
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
