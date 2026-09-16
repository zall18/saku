import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

import {
  getDashboardSummary,
  getDailyBreakdown,
  getTodayTransactions,
  getShortcuts,
  isDatabaseConnected,
} from "@/features/transaction/transaction-queries";
import { BudgetDashboard } from "@/features/transaction/components/budget-dashboard";
import { ShortcutButtons } from "@/features/transaction/components/shortcut-buttons";
import { ManualInputDrawer } from "@/features/transaction/components/manual-input-drawer";
import { TransactionList } from "@/features/transaction/components/transaction-list";
import { formatDateFull } from "@/lib/utils";

export default async function HomePage() {
  const dbConnected = await isDatabaseConnected();

  return (
    <main className="flex-1 w-full max-w-lg mx-auto px-4 pb-8 pt-6">
      {/* DB Connection Notice */}
      {!dbConnected && (
        <div className="mb-5 p-3 rounded-[var(--saku-radius-md)] bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
          <span className="text-sm leading-none mt-0.5">ℹ️</span>
          <div>
            <p className="font-semibold text-amber-200">Mode Preview (Database Belum Dikonfigurasi)</p>
            <p className="text-amber-300/80 mt-0.5">
              Isi <code className="bg-amber-950/60 px-1 py-0.5 rounded text-[11px] font-mono">DATABASE_URL</code> di file <code className="bg-amber-950/60 px-1 py-0.5 rounded text-[11px] font-mono">.env</code> dengan credentials Supabase Anda untuk menyimpan data secara permanen.
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-saku-text">Saku</h1>
          <p className="text-xs text-saku-text-muted mt-0.5">
            {formatDateFull(new Date())}
          </p>
        </div>
        <Link
          href="/settings"
          className="
            p-2.5 rounded-[var(--saku-radius-md)]
            bg-saku-surface hover:bg-saku-surface-hover
            border border-saku-border
            transition-colors duration-150
            text-saku-text-secondary hover:text-saku-text
          "
          aria-label="Pengaturan"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>
      </header>

      {/* Dashboard */}
      <section className="mb-6" aria-label="Budget Dashboard">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardLoader />
        </Suspense>
      </section>

      {/* Shortcuts */}
      <section className="mb-4" aria-label="Shortcut Buttons">
        <h2 className="text-xs font-medium text-saku-text-muted uppercase tracking-wider mb-3">
          Pintasan
        </h2>
        <Suspense fallback={<ShortcutsSkeleton />}>
          <ShortcutsLoader />
        </Suspense>
      </section>

      {/* Manual input */}
      <section className="mb-6">
        <ManualInputDrawer />
      </section>

      {/* Today's transactions */}
      <section aria-label="Transaksi Hari Ini">
        <h2 className="text-xs font-medium text-saku-text-muted uppercase tracking-wider mb-3">
          Transaksi Hari Ini
        </h2>
        <Suspense fallback={<TransactionsSkeleton />}>
          <TransactionsLoader />
        </Suspense>
      </section>
    </main>
  );
}

/* ===== Async data loaders ===== */

async function DashboardLoader() {
  const [summary, dailyBreakdown] = await Promise.all([
    getDashboardSummary(),
    getDailyBreakdown(7),
  ]);
  return <BudgetDashboard summary={summary} dailyBreakdown={dailyBreakdown} />;
}

async function ShortcutsLoader() {
  const shortcuts = await getShortcuts();
  return <ShortcutButtons shortcuts={shortcuts} />;
}

async function TransactionsLoader() {
  const transactions = await getTodayTransactions();
  return <TransactionList transactions={transactions} />;
}

/* ===== Skeleton loaders ===== */

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="saku-skeleton h-36 w-full" />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2 saku-skeleton h-24" />
        <div className="col-span-3 saku-skeleton h-24" />
      </div>
    </div>
  );
}

function ShortcutsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="saku-skeleton h-20" />
      ))}
    </div>
  );
}

function TransactionsSkeleton() {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="saku-skeleton h-14" />
      ))}
    </div>
  );
}
