"use client";

import { useTransition, useOptimistic, useState, useActionState, useCallback } from "react";
import { deleteTransaction, updateTransaction } from "@/features/transaction/transaction-actions";
import { formatCurrency, formatTime } from "@/lib/utils";
import { CATEGORIES, PAYMENT_SOURCES, CATEGORY_OPTIONS, PAYMENT_SOURCE_OPTIONS } from "@/lib/constants";
import { Drawer } from "@/components/ui/drawer";
import { AmountInput, TextInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TransactionData } from "@/features/transaction/transaction-types";

interface TransactionListProps {
  transactions: TransactionData[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [isPending, startTransition] = useTransition();
  const [editingTxn, setEditingTxn] = useState<TransactionData | null>(null);

  const [optimisticTxns, removeOptimistic] = useOptimistic(
    transactions,
    (state: TransactionData[], removedId: string) =>
      state.filter((t) => t.id !== removedId)
  );

  function handleDelete(id: string) {
    startTransition(async () => {
      removeOptimistic(id);
      await deleteTransaction(id);
    });
  }

  if (optimisticTxns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 bg-white rounded-xl border border-dashed border-slate-200 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl mb-2">
          ☕
        </div>
        <p className="text-sm font-semibold text-slate-700">Belum ada transaksi hari ini</p>
        <p className="text-xs text-slate-400 mt-0.5">
          Gunakan pintasan di atas atau tombol catat transaksi untuk memulai.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {optimisticTxns.map((txn, i) => {
        const cat =
          CATEGORIES[txn.category as keyof typeof CATEGORIES] ?? CATEGORIES.daily;
        const pay =
          PAYMENT_SOURCES[txn.paymentSource as keyof typeof PAYMENT_SOURCES] ??
          PAYMENT_SOURCES.cash;

        return (
          <div
            key={txn.id}
            className="
              group flex items-center gap-3 px-3.5 py-3
              bg-white hover:bg-slate-50/80
              border border-slate-200/80 hover:border-slate-300
              rounded-[var(--saku-radius-md)]
              shadow-xs hover:shadow-sm
              transition-all duration-150
              saku-animate-fade-in
            "
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            {/* Category icon with soft pastel bg */}
            <div
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-lg shadow-xs"
              style={{ backgroundColor: `${cat.color}18` }}
            >
              {cat.icon}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {txn.description || cat.label}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400 font-medium">
                  {formatTime(new Date(txn.createdAt))}
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                  {pay.icon} {pay.label}
                </span>
              </div>
            </div>

            {/* Amount */}
            <span className="text-sm font-bold saku-mono text-rose-600 flex-shrink-0">
              -{formatCurrency(txn.amount)}
            </span>

            {/* Actions: Edit & Delete */}
            <div className="flex items-center gap-1">
              {/* Edit button */}
              <button
                type="button"
                onClick={() => setEditingTxn(txn)}
                className="
                  opacity-60 group-hover:opacity-100
                  flex-shrink-0 p-1.5 rounded-lg
                  text-slate-400 hover:text-emerald-600 hover:bg-emerald-50
                  transition-all duration-150
                  cursor-pointer
                "
                aria-label={`Edit transaksi ${txn.description || cat.label}`}
                title="Edit transaksi"
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

              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(txn.id)}
                disabled={isPending}
                className="
                  opacity-60 group-hover:opacity-100
                  flex-shrink-0 p-1.5 rounded-lg
                  text-slate-400 hover:text-rose-600 hover:bg-rose-50
                  transition-all duration-150
                  cursor-pointer
                "
                aria-label={`Hapus transaksi ${txn.description || cat.label}`}
                title="Hapus transaksi"
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}

      {/* Edit Transaction Drawer */}
      <Drawer
        open={Boolean(editingTxn)}
        onClose={() => setEditingTxn(null)}
        title="Edit Transaksi"
      >
        {editingTxn && (
          <EditTransactionForm
            transaction={editingTxn}
            onSuccess={() => setEditingTxn(null)}
          />
        )}
      </Drawer>
    </div>
  );
}

/* ===== Edit Transaction Form Component ===== */

interface EditTransactionFormProps {
  transaction: TransactionData;
  onSuccess: () => void;
}

const initialEditState = { error: "", success: false };

function EditTransactionForm({ transaction, onSuccess }: EditTransactionFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialEditState, formData: FormData) => {
      const result = await updateTransaction(formData);
      if (result?.error) {
        return { error: result.error, success: false };
      }
      onSuccess();
      return { error: "", success: true };
    },
    initialEditState
  );

  const [amount, setAmount] = useState(transaction.amount.toLocaleString("id-ID"));
  const [selectedCategory, setSelectedCategory] = useState(transaction.category);
  const [selectedPayment, setSelectedPayment] = useState(transaction.paymentSource);

  const handleAmountChange = useCallback((_raw: string, formatted: string) => {
    setAmount(formatted);
  }, []);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Hidden ID */}
      <input type="hidden" name="id" value={transaction.id} />

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
        defaultValue={transaction.description || ""}
        placeholder="Contoh: Makan siang di warteg"
      />

      {/* Error notification */}
      {state.error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        isLoading={pending}
        className="w-full py-3 text-sm font-bold shadow-sm mt-2"
      >
        Simpan Perubahan
      </Button>
    </form>
  );
}
