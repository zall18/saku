"use client";

import { useActionState } from "react";
import { updateBudget } from "@/features/transaction/transaction-actions";
import { AmountInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useState, useCallback } from "react";

const initialState = { error: "", success: false };

export function BudgetForm({ currentBudget }: { currentBudget: number }) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await updateBudget(formData);
      if (result?.error) {
        return { error: result.error, success: false };
      }
      return { error: "", success: true };
    },
    initialState
  );

  const [amount, setAmount] = useState(
    currentBudget > 0 ? currentBudget.toLocaleString("id-ID") : ""
  );

  const handleAmountChange = useCallback((_raw: string, formatted: string) => {
    setAmount(formatted);
  }, []);

  const monthName = now.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  return (
    <div className="saku-glass rounded-[var(--saku-radius-lg)] p-5">
      <p className="text-sm text-saku-text-secondary mb-4">
        Budget untuk <span className="font-medium text-saku-text">{monthName}</span>
      </p>

      {currentBudget > 0 && (
        <p className="text-xs text-saku-text-muted mb-3">
          Saat ini: <span className="saku-mono text-saku-accent">{formatCurrency(currentBudget)}</span>
        </p>
      )}

      <form action={formAction} className="space-y-4">
        <AmountInput
          name="amount"
          value={amount}
          onValueChange={handleAmountChange}
          placeholder="1.500.000"
        />
        <input type="hidden" name="month" value={month} />
        <input type="hidden" name="year" value={year} />

        {state.error && (
          <p className="text-sm text-saku-danger saku-animate-fade-in">{state.error}</p>
        )}
        {state.success && (
          <p className="text-sm text-saku-accent saku-animate-fade-in">✓ Budget berhasil disimpan</p>
        )}

        <Button type="submit" variant="primary" isLoading={pending} className="w-full">
          Simpan Budget
        </Button>
      </form>
    </div>
  );
}
