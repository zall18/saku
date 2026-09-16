import { Suspense } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

import { getCurrentBudget, getAllShortcuts, isDatabaseConnected } from "@/features/transaction/transaction-queries";
import { BudgetForm } from "./budget-form";
import { ShortcutManager } from "./shortcut-manager";

export default async function SettingsPage() {
  const dbConnected = await isDatabaseConnected();

  return (
    <main className="flex-1 w-full max-w-lg mx-auto px-4 pb-8 pt-6">
      {!dbConnected && (
        <div className="mb-5 p-3 rounded-[var(--saku-radius-md)] bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
          <span className="text-sm leading-none mt-0.5">ℹ️</span>
          <div>
            <p className="font-semibold text-amber-200">Mode Preview (Database Belum Dikonfigurasi)</p>
            <p className="text-amber-300/80 mt-0.5">
              Isi <code className="bg-amber-950/60 px-1 py-0.5 rounded text-[11px] font-mono">DATABASE_URL</code> di file <code className="bg-amber-950/60 px-1 py-0.5 rounded text-[11px] font-mono">.env</code> dengan credentials Supabase Anda untuk menyimpan pengaturan budget dan shortcut.
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="
            p-2.5 rounded-[var(--saku-radius-md)]
            bg-saku-surface hover:bg-saku-surface-hover
            border border-saku-border
            transition-colors duration-150
            text-saku-text-secondary hover:text-saku-text
          "
          aria-label="Kembali"
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-saku-text">Pengaturan</h1>
          <p className="text-xs text-saku-text-muted">
            Budget & shortcut
          </p>
        </div>
      </header>

      {/* Budget section */}
      <section className="mb-8" aria-label="Budget Bulanan">
        <h2 className="text-xs font-medium text-saku-text-muted uppercase tracking-wider mb-4">
          Budget Bulanan
        </h2>
        <Suspense
          fallback={<div className="saku-skeleton h-40 w-full" />}
        >
          <BudgetLoader />
        </Suspense>
      </section>

      {/* Shortcuts section */}
      <section aria-label="Kelola Shortcut">
        <h2 className="text-xs font-medium text-saku-text-muted uppercase tracking-wider mb-4">
          Kelola Shortcut
        </h2>
        <Suspense
          fallback={
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="saku-skeleton h-14" />
              ))}
            </div>
          }
        >
          <ShortcutsLoader />
        </Suspense>
      </section>
    </main>
  );
}

async function BudgetLoader() {
  const budget = await getCurrentBudget();
  return <BudgetForm currentBudget={budget} />;
}

async function ShortcutsLoader() {
  const shortcuts = await getAllShortcuts();
  return <ShortcutManager shortcuts={shortcuts} />;
}
