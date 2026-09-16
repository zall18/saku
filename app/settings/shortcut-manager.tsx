"use client";

import { useTransition, useState, useCallback } from "react";
import {
  deleteShortcut,
  toggleShortcut,
  createShortcut,
} from "@/features/transaction/transaction-actions";
import { Button } from "@/components/ui/button";
import { AmountInput, TextInput } from "@/components/ui/input";
import { Drawer } from "@/components/ui/drawer";
import { CATEGORY_OPTIONS, PAYMENT_SOURCE_OPTIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { ShortcutData } from "@/features/transaction/transaction-types";

interface ShortcutManagerProps {
  shortcuts: ShortcutData[];
}

export function ShortcutManager({ shortcuts }: ShortcutManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = useCallback(
    (id: string) => {
      startTransition(async () => {
        await deleteShortcut(id);
      });
    },
    [startTransition]
  );

  const handleToggle = useCallback(
    (id: string) => {
      startTransition(async () => {
        await toggleShortcut(id);
      });
    },
    [startTransition]
  );

  return (
    <div className="space-y-3">
      {/* Existing shortcuts */}
      {shortcuts.map((sc) => (
        <div
          key={sc.id}
          className={`
            flex items-center gap-3 px-4 py-3
            bg-saku-surface rounded-[var(--saku-radius-md)]
            border border-saku-border
            transition-opacity duration-150
            ${!sc.isActive ? "opacity-50" : ""}
          `}
        >
          <span className="text-xl">{sc.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-saku-text truncate">
              {sc.label}
            </p>
            <p className="text-xs text-saku-text-muted saku-mono">
              {formatCurrency(sc.amount)}
            </p>
          </div>

          {/* Toggle */}
          <button
            type="button"
            onClick={() => handleToggle(sc.id)}
            disabled={isPending}
            className="
              relative w-10 h-5.5 rounded-full
              transition-colors duration-200
              cursor-pointer
            "
            style={{
              backgroundColor: sc.isActive
                ? "var(--saku-accent)"
                : "var(--saku-surface-hover)",
            }}
            aria-label={sc.isActive ? "Nonaktifkan" : "Aktifkan"}
          >
            <span
              className="
                absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white
                transition-transform duration-200 shadow-sm
              "
              style={{
                left: sc.isActive ? "calc(100% - 20px)" : "2px",
              }}
            />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => handleDelete(sc.id)}
            disabled={isPending}
            className="
              p-1.5 text-saku-text-muted hover:text-saku-danger
              transition-colors duration-150
              cursor-pointer
            "
            aria-label={`Hapus ${sc.label}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Add button */}
      <button
        type="button"
        onClick={() => setShowAdd(true)}
        className="
          w-full flex items-center justify-center gap-2
          py-3 px-4
          bg-saku-surface-hover/50 hover:bg-saku-surface-hover
          border border-dashed border-saku-border
          rounded-[var(--saku-radius-md)]
          text-sm text-saku-text-secondary hover:text-saku-text
          hover:border-saku-accent/40
          transition-all duration-150
          cursor-pointer
        "
      >
        <span className="text-lg">+</span> Tambah Shortcut
      </button>

      {/* Add drawer */}
      <Drawer
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Tambah Shortcut Baru"
      >
        <AddShortcutForm onSuccess={() => setShowAdd(false)} />
      </Drawer>
    </div>
  );
}

/* ===== Add Shortcut Form ===== */

function AddShortcutForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, setState] = useState({ error: "", success: false });
  const [isPending, startTransition] = useTransition();

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleSubmit = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        const result = await createShortcut(formData);
        if (result?.error) {
          setState({ error: result.error, success: false });
        } else {
          setState({ error: "", success: true });
          onSuccess();
        }
      });
    },
    [startTransition, onSuccess]
  );

  const handleAmountChange = useCallback((_raw: string, formatted: string) => {
    setAmount(formatted);
  }, []);

  const EMOJI_OPTIONS = ["🍚", "☕", "🚐", "👕", "🍡", "🎮", "🎬", "🛒", "💊", "📚", "🏋️", "🎵"];

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* Emoji picker */}
      <div>
        <label className="block text-sm font-medium text-saku-text-secondary mb-2">
          Ikon
        </label>
        <div className="flex flex-wrap gap-1.5">
          {EMOJI_OPTIONS.map((emoji) => (
            <label key={emoji} className="cursor-pointer">
              <input
                type="radio"
                name="icon"
                value={emoji}
                className="sr-only peer"
              />
              <span
                className="
                  inline-flex items-center justify-center w-10 h-10
                  text-xl rounded-[var(--saku-radius-sm)]
                  bg-saku-surface-hover border border-saku-border
                  peer-checked:border-saku-accent peer-checked:bg-saku-accent/10
                  transition-all duration-150
                  hover:bg-saku-surface-raised
                "
              >
                {emoji}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Label */}
      <TextInput name="label" label="Nama" placeholder="Contoh: Makan Siang" required />

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-saku-text-secondary mb-2">
          Nominal Default
        </label>
        <AmountInput
          name="amount"
          value={amount}
          onValueChange={handleAmountChange}
          placeholder="15.000"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-saku-text-secondary mb-2">
          Kategori
        </label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORY_OPTIONS.map((cat) => (
            <Button
              key={cat.value}
              type="button"
              variant="pill"
              data-active={selectedCategory === cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className="text-xs gap-1.5"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>
        <input type="hidden" name="category" value={selectedCategory} />
      </div>

      {/* Payment */}
      <div>
        <label className="block text-sm font-medium text-saku-text-secondary mb-2">
          Sumber Dana Default
        </label>
        <div className="flex gap-2 flex-wrap">
          {PAYMENT_SOURCE_OPTIONS.map((src) => (
            <Button
              key={src.value}
              type="button"
              variant="pill"
              data-active={selectedPayment === src.value}
              onClick={() => setSelectedPayment(src.value)}
              className="text-xs gap-1.5"
            >
              <span>{src.icon}</span>
              {src.label}
            </Button>
          ))}
        </div>
        <input type="hidden" name="paymentSource" value={selectedPayment} />
      </div>

      {state.error && (
        <p className="text-sm text-saku-danger saku-animate-fade-in">{state.error}</p>
      )}

      <Button type="submit" variant="primary" isLoading={isPending} className="w-full">
        Simpan Shortcut
      </Button>
    </form>
  );
}
