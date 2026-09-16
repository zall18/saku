"use client";

import { useTransition, useOptimistic } from "react";
import { deleteTransaction } from "@/features/transaction/transaction-actions";
import { formatCurrency, formatTime } from "@/lib/utils";
import { CATEGORIES, PAYMENT_SOURCES } from "@/lib/constants";
import type { TransactionData } from "@/features/transaction/transaction-types";

interface TransactionListProps {
  transactions: TransactionData[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [isPending, startTransition] = useTransition();
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
        );
      })}
    </div>
  );
}
