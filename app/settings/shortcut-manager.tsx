"use client";

import { useTransition, useState, useCallback } from "react";
import {
  deleteShortcut,
  toggleShortcut,
  createShortcut,
  updateShortcut,
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
  const [editingShortcut, setEditingShortcut] = useState<ShortcutData | null>(null);

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
            flex items-center gap-3 px-4 py-3.5
            bg-white rounded-[var(--saku-radius-md)]
            border border-slate-200
            shadow-xs hover:border-slate-300
            transition-all duration-150
            ${!sc.isActive ? "opacity-50 bg-slate-50/50" : ""}
          `}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
            {sc.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">
              {sc.label}
            </p>
            <p className="text-xs text-emerald-600 font-medium saku-mono">
              {formatCurrency(sc.amount)}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => handleToggle(sc.id)}
              disabled={isPending}
              className={`
                relative w-11 h-6 rounded-full
                transition-colors duration-200
                cursor-pointer select-none
                ${sc.isActive ? "bg-emerald-600" : "bg-slate-200"}
              `}
              aria-label={sc.isActive ? "Nonaktifkan" : "Aktifkan"}
              title={sc.isActive ? "Aktif" : "Nonaktif"}
            >
              <span
                className={`
                  absolute top-0.5 w-5 h-5 rounded-full bg-white
                  transition-all duration-200 shadow-sm
                  ${sc.isActive ? "left-[22px]" : "left-0.5"}
                `}
              />
            </button>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setEditingShortcut(sc)}
              disabled={isPending}
              className="
                p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50
                rounded-lg transition-colors duration-150
                cursor-pointer
              "
              aria-label={`Edit ${sc.label}`}
              title="Edit shortcut"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDelete(sc.id)}
              disabled={isPending}
              className="
                p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50
                rounded-lg transition-colors duration-150
                cursor-pointer
              "
              aria-label={`Hapus ${sc.label}`}
              title="Hapus shortcut"
            >
              <svg
                width="15"
                height="15"
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
        </div>
      ))}

      {/* Add button */}
      <button
        type="button"
        onClick={() => setShowAdd(true)}
        className="
          w-full flex items-center justify-center gap-2
          py-3 px-4
          bg-slate-50 hover:bg-slate-100
          border border-dashed border-slate-300 hover:border-slate-400
          rounded-[var(--saku-radius-md)]
          text-sm font-bold text-slate-700
          transition-all duration-150
          cursor-pointer
        "
      >
        <span className="text-base font-bold">+</span> Tambah Shortcut Baru
      </button>

      {/* Add drawer */}
      <Drawer
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Tambah Shortcut Baru"
      >
        <AddShortcutForm onSuccess={() => setShowAdd(false)} />
      </Drawer>

      {/* Edit drawer */}
      <Drawer
        open={Boolean(editingShortcut)}
        onClose={() => setEditingShortcut(null)}
        title="Edit Shortcut"
      >
        {editingShortcut && (
          <EditShortcutForm
            shortcut={editingShortcut}
            onSuccess={() => setEditingShortcut(null)}
          />
        )}
      </Drawer>
    </div>
  );
}

/* ===== Add Shortcut Form ===== */

function AddShortcutForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, setState] = useState({ error: "", success: false });
  const [isPending, startTransition] = useTransition();

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("daily");
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [selectedEmoji, setSelectedEmoji] = useState("🍚");

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
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Pilih Ikon Emoji
        </label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`
                w-10 h-10 rounded-xl text-xl flex items-center justify-center
                border transition-all cursor-pointer
                ${
                  selectedEmoji === emoji
                    ? "border-emerald-500 bg-emerald-50 shadow-xs scale-105"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }
              `}
            >
              {emoji}
            </button>
          ))}
        </div>
        <input type="hidden" name="icon" value={selectedEmoji} />
      </div>

      {/* Label */}
      <TextInput name="label" label="Nama Shortcut" placeholder="Contoh: Makan Siang" required />

      {/* Amount */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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
              className="text-xs py-1.5 px-3"
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
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Metode Pembayaran Default
        </label>
        <div className="flex gap-2 flex-wrap">
          {PAYMENT_SOURCE_OPTIONS.map((src) => (
            <Button
              key={src.value}
              type="button"
              variant="pill"
              data-active={selectedPayment === src.value}
              onClick={() => setSelectedPayment(src.value)}
              className="text-xs py-1.5 px-3"
            >
              <span>{src.icon}</span>
              {src.label}
            </Button>
          ))}
        </div>
        <input type="hidden" name="paymentSource" value={selectedPayment} />
      </div>

      {state.error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      <Button type="submit" variant="primary" isLoading={isPending} className="w-full">
        Simpan Shortcut
      </Button>
    </form>
  );
}

/* ===== Edit Shortcut Form ===== */

interface EditShortcutFormProps {
  shortcut: ShortcutData;
  onSuccess: () => void;
}

function EditShortcutForm({ shortcut, onSuccess }: EditShortcutFormProps) {
  const [state, setState] = useState({ error: "", success: false });
  const [isPending, startTransition] = useTransition();

  const [amount, setAmount] = useState(shortcut.amount.toLocaleString("id-ID"));
  const [selectedCategory, setSelectedCategory] = useState(shortcut.category);
  const [selectedPayment, setSelectedPayment] = useState(shortcut.paymentSource);
  const [selectedEmoji, setSelectedEmoji] = useState(shortcut.icon);

  const handleSubmit = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        const result = await updateShortcut(formData);
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
      <input type="hidden" name="id" value={shortcut.id} />

      {/* Emoji picker */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Pilih Ikon Emoji
        </label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`
                w-10 h-10 rounded-xl text-xl flex items-center justify-center
                border transition-all cursor-pointer
                ${
                  selectedEmoji === emoji
                    ? "border-emerald-500 bg-emerald-50 shadow-xs scale-105"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }
              `}
            >
              {emoji}
            </button>
          ))}
        </div>
        <input type="hidden" name="icon" value={selectedEmoji} />
      </div>

      {/* Label */}
      <TextInput
        name="label"
        label="Nama Shortcut"
        defaultValue={shortcut.label}
        placeholder="Contoh: Makan Siang"
        required
      />

      {/* Amount */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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
              className="text-xs py-1.5 px-3"
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
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Metode Pembayaran Default
        </label>
        <div className="flex gap-2 flex-wrap">
          {PAYMENT_SOURCE_OPTIONS.map((src) => (
            <Button
              key={src.value}
              type="button"
              variant="pill"
              data-active={selectedPayment === src.value}
              onClick={() => setSelectedPayment(src.value)}
              className="text-xs py-1.5 px-3"
            >
              <span>{src.icon}</span>
              {src.label}
            </Button>
          ))}
        </div>
        <input type="hidden" name="paymentSource" value={selectedPayment} />
      </div>

      {state.error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      <Button type="submit" variant="primary" isLoading={isPending} className="w-full">
        Simpan Perubahan
      </Button>
    </form>
  );
}
