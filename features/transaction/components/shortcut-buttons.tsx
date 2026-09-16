"use client";

import { useTransition, useState, useCallback } from "react";
import { createQuickTransaction } from "@/features/transaction/transaction-actions";
import { formatCurrencyShort } from "@/lib/utils";
import type { ShortcutData } from "@/features/transaction/transaction-types";

interface ShortcutButtonsProps {
  shortcuts: ShortcutData[];
}

export function ShortcutButtons({ shortcuts }: ShortcutButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [justTapped, setJustTapped] = useState<string | null>(null);

  const handleTap = useCallback(
    (shortcut: ShortcutData) => {
      setJustTapped(shortcut.id);
      startTransition(async () => {
        await createQuickTransaction(shortcut.id);
        // Brief delay before resetting visual state
        setTimeout(() => setJustTapped(null), 800);
      });
    },
    [startTransition]
  );

  if (shortcuts.length === 0) {
    return (
      <div className="text-center py-6 text-saku-text-muted text-sm">
        Belum ada shortcut. Tambahkan di Pengaturan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {shortcuts.map((shortcut) => {
        const isTapped = justTapped === shortcut.id;

        return (
          <button
            key={shortcut.id}
            type="button"
            disabled={isPending}
            onClick={() => handleTap(shortcut)}
            className={`
              relative flex flex-col items-center gap-1 py-3 px-2
              bg-saku-surface hover:bg-saku-surface-hover
              border rounded-[var(--saku-radius-md)]
              transition-all duration-150 ease-out
              active:scale-[0.94]
              disabled:opacity-60 disabled:pointer-events-none
              cursor-pointer select-none
              ${
                isTapped
                  ? "border-saku-accent bg-saku-accent/10 saku-animate-pulse-success"
                  : "border-saku-border"
              }
            `}
          >
            {/* Check overlay on success */}
            {isTapped && (
              <div className="absolute inset-0 flex items-center justify-center rounded-[var(--saku-radius-md)] bg-saku-accent/10">
                <span className="text-2xl saku-animate-check-pop">✓</span>
              </div>
            )}

            <span className="text-2xl leading-none" aria-hidden="true">
              {shortcut.icon}
            </span>
            <span className="text-xs font-medium text-saku-text truncate w-full text-center">
              {shortcut.label}
            </span>
            <span className="text-[10px] saku-mono text-saku-text-muted">
              {formatCurrencyShort(shortcut.amount)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
