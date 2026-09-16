import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getCurrentBudget, getAllShortcuts } from "@/features/transaction/transaction-queries";
import { BudgetForm } from "./budget-form";
import { ShortcutManager } from "./shortcut-manager";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-white border border-slate-200 text-xs font-semibold
              text-slate-600 hover:text-slate-900 hover:border-slate-300
              shadow-xs transition-all
            "
          >
            <span>&larr;</span> Kembali ke Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-sm font-bold text-slate-900">Pengaturan</h1>
        </div>

        {/* Budget section */}
        <section aria-label="Budget Bulanan">
          <Suspense fallback={<div className="saku-skeleton h-48 w-full" />}>
            <BudgetLoader />
          </Suspense>
        </section>

        {/* Shortcuts section */}
        <section aria-label="Kelola Shortcut" className="saku-card p-6">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-900">
              Kelola Shortcut Transaksi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aktifkan, nonaktifkan, atau tambahkan tombol pintasan cepat Anda sendiri
            </p>
          </div>

          <Suspense
            fallback={
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="saku-skeleton h-16" />
                ))}
              </div>
            }
          >
            <ShortcutsLoader />
          </Suspense>
        </section>
      </main>
    </div>
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
