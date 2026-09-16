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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleAmountChange = useCallback((_raw: string, formatted: string) => {
    setAmount(formatted);
  }, []);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Amount input */}
      <div>
        <label className="block text-sm font-medium text-saku-text-secondary mb-2">
          Nominal
        </label>
        <AmountInput
          name="amount"
          value={amount}
          onValueChange={handleAmountChange}
          placeholder="0"
        />
      </div>

      {/* Category selector */}
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

      {/* Payment source selector */}
      <div>
        <label className="block text-sm font-medium text-saku-text-secondary mb-2">
          Sumber Dana
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

      {/* Description */}
      <TextInput
        name="description"
        label="Catatan (opsional)"
        placeholder="Contoh: Makan siang di kantin"
      />

      {/* Error */}
      {state.error && (
        <p className="text-sm text-saku-danger saku-animate-fade-in">
          {state.error}
        </p>
      )}

      {/* Success */}
      {state.success && (
        <p className="text-sm text-saku-accent saku-animate-fade-in">
          ✓ Transaksi berhasil disimpan
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        isLoading={pending}
        className="w-full py-3.5 text-base"
      >
        Simpan Transaksi
      </Button>
    </form>
  );
}
