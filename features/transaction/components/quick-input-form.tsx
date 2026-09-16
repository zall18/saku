"use client";

import { useActionState, useState, useCallback } from "react";
import { createTransaction } from "@/features/transaction/transaction-actions";
import { AmountInput, TextInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORY_OPTIONS, PAYMENT_SOURCE_OPTIONS } from "@/lib/constants";

const initialState = { error: "", success: false };

export function QuickInputForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await createTransaction(formData);
      if (result?.error) {
        return { error: result.error, success: false };
      }
      onSuccess?.();
      return { error: "", success: true };
    },
    initialState
  );

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("daily");
  const [selectedPayment, setSelectedPayment] = useState("qris");

  const handleAmountChange = useCallback((_raw: string, formatted: string) => {
    setAmount(formatted);
  }, []);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Amount input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Nominal Pengeluaran
        </label>
        <AmountInput
          name="amount"
          value={amount}
          onValueChange={handleAmountChange}
          placeholder="0"
          autoFocus
        />
      </div>

      {/* Category selector */}
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

      {/* Payment source selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Metode Pembayaran
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

      {/* Description */}
      <TextInput
        name="description"
        label="Catatan (Opsional)"
        placeholder="Contoh: Makan siang bareng teman"
      />

      {/* Error */}
      {state.error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      {/* Success */}
      {state.success && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
          <span>✓</span>
          <span>Transaksi berhasil disimpan ke Supabase!</span>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        isLoading={pending}
        className="w-full py-3 text-sm font-bold shadow-sm"
      >
        Simpan Transaksi
      </Button>
    </form>
  );
}
