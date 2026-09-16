import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { getAuthUser } from "@/lib/supabase/server";
import { LandingPage } from "@/components/landing/landing-page";
import {
  getDashboardSummary,
  getDailyBreakdown,
  getTodayTransactions,
  getShortcuts,
} from "@/features/transaction/transaction-queries";
import { BudgetDashboard } from "@/features/transaction/components/budget-dashboard";
import { ShortcutButtons } from "@/features/transaction/components/shortcut-buttons";
import { ManualInputDrawer } from "@/features/transaction/components/manual-input-drawer";
import { TransactionList } from "@/features/transaction/components/transaction-list";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getAuthUser();

  // If user is not authenticated, display the public Landing Page
  if (!user) {
    return <LandingPage />;
  }

  // If authenticated, display personal Finance Dashboard
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Dashboard Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
        {/* Top Hero Section: Budget Dashboard & 7-Day Chart */}
        <section aria-label="Budget Dashboard">
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardLoader />
          </Suspense>
        </section>

        {/* Lower Grid: Shortcuts & Quick Action vs Today's Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Main Column: Quick Shortcuts & Manual Input */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shortcut Buttons Card */}
            <section className="saku-card p-5 md:p-6" aria-label="Pintasan Cepat">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Pintasan Cepat (1-Tap)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Klik tombol untuk langsung mencatat transaksi instan
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Instant
                </span>
              </div>

              <Suspense fallback={<ShortcutsSkeleton />}>
                <ShortcutsLoader />
              </Suspense>
            </section>

            {/* Manual input drawer */}
            <section className="saku-card p-4">
              <ManualInputDrawer />
            </section>
          </div>

          {/* Right / Sidebar Column: Today's Transactions */}
          <div className="lg:col-span-5">
            <section className="saku-card p-5 md:p-6" aria-label="Transaksi Hari Ini">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Transaksi Hari Ini
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Aktivitas pengeluaran tercatat
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  Live
                </span>
              </div>

              <Suspense fallback={<TransactionsSkeleton />}>
                <TransactionsLoader />
              </Suspense>
            </section>
          </div>
        </div>
      </main>
    </div>
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

/* ===== Skeleton loaders for Light Mode ===== */

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="saku-skeleton h-24 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="saku-skeleton h-56 w-full" />
        <div className="lg:col-span-2 saku-skeleton h-56 w-full" />
      </div>
    </div>
  );
}

function ShortcutsSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="saku-skeleton h-24" />
      ))}
    </div>
  );
}

function TransactionsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="saku-skeleton h-16" />
      ))}
    </div>
  );
}
