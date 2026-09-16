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
        setTimeout(() => setJustTapped(null), 800);
      });
    },
    [startTransition]
  );

  if (shortcuts.length === 0) {
    return (
      <div className="text-center py-6 text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
        Belum ada shortcut. Tambahkan di Pengaturan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
      {shortcuts.map((shortcut) => {
        const isTapped = justTapped === shortcut.id;

        return (
          <button
            key={shortcut.id}
            type="button"
            disabled={isPending}
            onClick={() => handleTap(shortcut)}
            className={`
              group relative flex flex-col items-center justify-center gap-1.5 p-3
              bg-white hover:bg-slate-50/80
              border rounded-[var(--saku-radius-md)]
              transition-all duration-150 ease-out
              active:scale-[0.95] shadow-xs hover:shadow-sm
              disabled:opacity-60 disabled:pointer-events-none
              cursor-pointer select-none
              ${
                isTapped
                  ? "border-emerald-500 bg-emerald-50/50 saku-animate-pulse-success"
                  : "border-slate-200 hover:border-slate-300"
              }
            `}
          >
            {/* Check overlay on success */}
            {isTapped && (
              <div className="absolute inset-0 flex items-center justify-center rounded-[var(--saku-radius-md)] bg-emerald-500/10 z-10">
                <span className="text-2xl saku-animate-check-pop text-emerald-600 font-bold">✓</span>
              </div>
            )}

            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-emerald-50/80 flex items-center justify-center text-xl transition-colors">
              {shortcut.icon}
            </div>
            <span className="text-xs font-semibold text-slate-800 truncate w-full text-center">
              {shortcut.label}
            </span>
            <span className="text-[11px] saku-mono font-medium text-emerald-600">
              {formatCurrencyShort(shortcut.amount)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
