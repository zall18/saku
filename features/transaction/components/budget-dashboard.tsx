import { BarChart } from "@/components/ui/bar-chart";
import { formatCurrency } from "@/lib/utils";
import type { DashboardSummary, DailyBreakdown } from "@/features/transaction/transaction-types";

interface BudgetDashboardProps {
  summary: DashboardSummary;
  dailyBreakdown: DailyBreakdown[];
}

export function BudgetDashboard({ summary, dailyBreakdown }: BudgetDashboardProps) {
  const {
    todayTotal,
    monthlyTotal,
    monthlyBudget,
    dailyBudget,
    dailyRemaining,
    monthlyRemaining,
    percentUsed,
  } = summary;

  const isOverBudget = percentUsed > 100;
  const isNearLimit = percentUsed > 80 && percentUsed <= 100;
  const todayOverBudget = todayTotal > dailyBudget;

  const statusBadge = isOverBudget ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
      Over Budget ({percentUsed}%)
    </span>
  ) : isNearLimit ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      Mendekati Limit ({percentUsed}%)
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
      Aman ({percentUsed}%)
    </span>
  );

  const progressBg = isOverBudget
    ? "bg-rose-500"
    : isNearLimit
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="space-y-4">
      {/* 4 Stat Cards Grid (Responsive 2 cols on mobile, 4 cols on tablet/desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Card 1: Pengeluaran Bulan Ini */}
        <div className="saku-card p-4 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Bulan Ini</span>
            <span className="text-base">📅</span>
          </div>
          <div className="mt-2.5">
            <span className="text-xl md:text-2xl font-bold text-slate-900 saku-mono block">
              {formatCurrency(monthlyTotal)}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Budget: {formatCurrency(monthlyBudget)}
            </span>
          </div>
        </div>

        {/* Card 2: Sisa Budget Bulanan */}
        <div className="saku-card p-4 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Sisa Budget</span>
            <span className="text-base">💰</span>
          </div>
          <div className="mt-2.5">
            <span
              className={`text-xl md:text-2xl font-bold saku-mono block ${
                isOverBudget ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {formatCurrency(monthlyRemaining)}
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              {statusBadge}
            </div>
          </div>
        </div>

        {/* Card 3: Pengeluaran Hari Ini */}
        <div className="saku-card p-4 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Hari Ini</span>
            <span className="text-base">⚡</span>
          </div>
          <div className="mt-2.5">
            <span
              className={`text-xl md:text-2xl font-bold saku-mono block ${
                todayOverBudget ? "text-rose-600" : "text-slate-900"
              }`}
            >
              {formatCurrency(todayTotal)}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Target: {formatCurrency(dailyBudget)}/hari
            </span>
          </div>
        </div>

        {/* Card 4: Sisa Kuota Hari Ini */}
        <div className="saku-card p-4 flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Sisa Kuota Hari Ini</span>
            <span className="text-base">🎯</span>
          </div>
          <div className="mt-2.5">
            <span
              className={`text-xl md:text-2xl font-bold saku-mono block ${
                todayOverBudget ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {formatCurrency(dailyRemaining)}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              {todayOverBudget ? "Melebihi kuota harian" : "Tersisa untuk hari ini"}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Chart Section (Responsive 2 columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Budget Progress Card */}
        <div className="saku-card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Penggunaan Anggaran
              </span>
              <span className="text-sm font-bold text-slate-900 saku-mono">
                {percentUsed}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-700 ${progressBg}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Terpakai:</span>
                <span className="font-semibold text-slate-800 saku-mono">{formatCurrency(monthlyTotal)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Target Budget:</span>
                <span className="font-semibold text-slate-800 saku-mono">{formatCurrency(monthlyBudget)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Sisa Kuota:</span>
                <span className="font-semibold text-emerald-600 saku-mono">{formatCurrency(monthlyRemaining)}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            💡 Kuota harian dihitung dari total budget dibagi jumlah hari dalam bulan berjalan.
          </p>
        </div>

        {/* 7-Day Chart Card */}
        <div className="saku-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Grafik Pengeluaran 7 Hari Terakhir</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pantau tren belanja harian Anda</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>Aman</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                <span>Over</span>
              </div>
            </div>
          </div>

          <BarChart data={dailyBreakdown} dailyBudget={dailyBudget} />
        </div>
      </div>
    </div>
  );
}
