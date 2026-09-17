"use client";

import { useActionState, useState, useCallback } from "react";
import { updateBudget } from "@/features/transaction/transaction-actions";
import { AmountInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

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
    <div className="saku-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Budget Bulanan: {monthName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tentukan batas belanja bulanan Anda
          </p>
        </div>
        {currentBudget > 0 && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full saku-mono">
            Saat ini: {formatCurrency(currentBudget)}
          </span>
        )}
      </div>

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
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{state.error}</span>
          </div>
        )}
        {state.success && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <span>✓</span>
            <span>Budget bulan ini berhasil diperbarui di Supabase!</span>
          </div>
        )}

        <Button type="submit" variant="primary" isLoading={pending} className="w-full">
          Simpan Budget
        </Button>
      </form>
    </div>
  );
}
