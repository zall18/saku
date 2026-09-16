"use client";

import { InputHTMLAttributes, forwardRef, useState, useCallback } from "react";
import { formatAmountInput } from "@/lib/utils";

interface AmountInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onValueChange?: (rawValue: string, formattedValue: string) => void;
}

/**
 * Styled amount input with auto-formatting (15000 → 15.000)
 * Stores raw numeric value in a hidden input for form submission
 */
const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  ({ className = "", value: controlledValue, onValueChange, name, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("");
    const displayValue = controlledValue ?? internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d]/g, "");
        const formatted = formatAmountInput(raw);

        if (controlledValue === undefined) {
          setInternalValue(formatted);
        }
        onValueChange?.(raw, formatted);
      },
      [controlledValue, onValueChange]
    );

    return (
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-saku-text-muted text-lg font-medium">
          Rp
        </span>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={displayValue}
          onChange={handleChange}
          className={`
            w-full pl-12 pr-4 py-3.5
            bg-saku-surface-hover border border-saku-border
            rounded-[var(--saku-radius-md)]
            text-right text-2xl font-semibold saku-mono
            text-saku-text
            placeholder:text-saku-text-muted placeholder:text-lg placeholder:font-normal
            focus:outline-none focus:border-saku-accent focus:ring-1 focus:ring-saku-accent/30
            transition-colors duration-150
            ${className}
          `}
          {...props}
        />
        {/* Hidden input for raw value */}
        {name ? (
          <input
            type="hidden"
            name={name}
            value={displayValue.replace(/[^\d]/g, "")}
          />
        ) : null}
      </div>
    );
  }
);

AmountInput.displayName = "AmountInput";

export { AmountInput };

/* Simple text input */
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = "", label, id, ...props }, ref) => {
    return (
      <div>
        {label ? (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-saku-text-secondary mb-1.5"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          className={`
            w-full px-4 py-2.5
            bg-saku-surface-hover border border-saku-border
            rounded-[var(--saku-radius-md)]
            text-sm text-saku-text
            placeholder:text-saku-text-muted
            focus:outline-none focus:border-saku-accent focus:ring-1 focus:ring-saku-accent/30
            transition-colors duration-150
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
