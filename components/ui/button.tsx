"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "shortcut" | "danger" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-600 text-white font-semibold hover:bg-emerald-700 active:scale-[0.97] shadow-sm hover:shadow transition-all",
  secondary:
    "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm active:scale-[0.97]",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.97]",
  shortcut:
    "bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow active:scale-[0.95] text-slate-800 transition-all",
  danger:
    "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 active:scale-[0.97]",
  pill:
    "bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-transparent data-[active=true]:bg-emerald-50 data-[active=true]:text-emerald-700 data-[active=true]:border-emerald-300 data-[active=true]:font-medium",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-[var(--saku-radius-md)] px-4 py-2.5
          text-sm font-medium
          transition-all duration-150 ease-out
          disabled:opacity-50 disabled:pointer-events-none
          cursor-pointer select-none
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant };
