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
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <span className="text-3xl">📝</span>
        <p className="text-sm text-saku-text-muted">
          Belum ada transaksi hari ini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
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
              group flex items-center gap-3 px-3 py-2.5
              bg-saku-surface hover:bg-saku-surface-hover
              rounded-[var(--saku-radius-md)]
              transition-all duration-150
              saku-animate-fade-in
            "
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            {/* Category icon */}
            <div
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-[var(--saku-radius-sm)] text-lg"
              style={{ backgroundColor: `${cat.color}15` }}
            >
              {cat.icon}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-saku-text truncate">
                {txn.description || cat.label}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-saku-text-muted">
                  {formatTime(new Date(txn.createdAt))}
                </span>
                <span className="text-[10px] text-saku-text-muted">•</span>
                <span className="text-[10px] text-saku-text-muted">
                  {pay.icon} {pay.label}
                </span>
              </div>
            </div>

            {/* Amount */}
            <span className="text-sm font-semibold saku-mono text-saku-expense flex-shrink-0">
              -{formatCurrency(txn.amount)}
            </span>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleDelete(txn.id)}
              disabled={isPending}
              className="
                opacity-0 group-hover:opacity-100
                flex-shrink-0 p-1.5
                text-saku-text-muted hover:text-saku-danger
                transition-all duration-150
                cursor-pointer
                sm:opacity-100
              "
              aria-label={`Hapus transaksi ${txn.description || cat.label}`}
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
