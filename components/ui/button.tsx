"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "shortcut" | "danger" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-saku-accent text-saku-bg font-semibold hover:brightness-110 active:scale-[0.97] shadow-[0_0_20px_rgba(52,211,153,0.2)]",
  secondary:
    "bg-saku-surface text-saku-text hover:bg-saku-surface-hover border border-saku-border active:scale-[0.97]",
  ghost:
    "bg-transparent text-saku-text-secondary hover:bg-saku-surface-hover hover:text-saku-text active:scale-[0.97]",
  shortcut:
    "bg-saku-surface hover:bg-saku-surface-hover border border-saku-border active:scale-[0.95] active:border-saku-accent transition-all",
  danger:
    "bg-saku-danger/10 text-saku-danger hover:bg-saku-danger/20 active:scale-[0.97]",
  pill:
    "bg-saku-surface text-saku-text-secondary hover:bg-saku-surface-hover border border-saku-border data-[active=true]:bg-saku-accent/15 data-[active=true]:text-saku-accent data-[active=true]:border-saku-accent/40",
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
