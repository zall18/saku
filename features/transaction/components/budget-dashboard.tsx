import { BarChart } from "@/components/ui/bar-chart";
import { formatCurrency, calcPercent } from "@/lib/utils";
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

  // Color based on budget status
  const statusColor = isOverBudget
    ? "text-saku-danger"
    : isNearLimit
      ? "text-saku-warning"
      : "text-saku-accent";

  const progressColor = isOverBudget
    ? "bg-saku-danger"
    : isNearLimit
      ? "bg-saku-warning"
      : "bg-saku-accent";

  const progressGlow = isOverBudget
    ? "shadow-[0_0_12px_rgba(248,113,113,0.3)]"
    : isNearLimit
      ? "shadow-[0_0_12px_rgba(251,191,36,0.3)]"
      : "shadow-[0_0_12px_rgba(52,211,153,0.3)]";

  return (
    <div className="space-y-4">
      {/* Monthly budget card */}
      <div className="saku-glass rounded-[var(--saku-radius-lg)] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-saku-text-muted uppercase tracking-wider">
            Bulan Ini
          </span>
          <span className={`text-xs font-semibold saku-mono ${statusColor}`}>
            {percentUsed}%
          </span>
        </div>

        {/* Main amount */}
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl font-bold saku-mono ${statusColor}`}>
            {formatCurrency(monthlyTotal)}
          </span>
          <span className="text-sm text-saku-text-muted">
            / {formatCurrency(monthlyBudget)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-saku-surface-hover rounded-full overflow-hidden">
          <div
            className={`
              absolute inset-y-0 left-0 rounded-full
              saku-animate-progress-fill
              ${progressColor} ${progressGlow}
            `}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>

        {/* Remaining */}
        <p className="text-xs text-saku-text-muted">
          Sisa:{" "}
          <span className={`font-medium saku-mono ${statusColor}`}>
            {formatCurrency(monthlyRemaining)}
          </span>
        </p>
      </div>

      {/* Today + chart row */}
      <div className="grid grid-cols-5 gap-3">
        {/* Today summary */}
        <div className="col-span-2 saku-glass rounded-[var(--saku-radius-lg)] p-4 flex flex-col justify-between">
          <span className="text-[10px] font-medium text-saku-text-muted uppercase tracking-wider">
            Hari Ini
          </span>
          <div className="mt-2">
            <span
              className={`text-lg font-bold saku-mono block ${
                todayOverBudget ? "text-saku-expense" : "text-saku-text"
              }`}
            >
              {formatCurrency(todayTotal)}
            </span>
            <span className="text-[10px] text-saku-text-muted mt-0.5 block">
              Kuota:{" "}
              <span
                className={`saku-mono ${
                  todayOverBudget ? "text-saku-expense" : "text-saku-accent"
                }`}
              >
                {formatCurrency(dailyRemaining)}
              </span>
            </span>
          </div>
        </div>

        {/* 7-day chart */}
        <div className="col-span-3 saku-glass rounded-[var(--saku-radius-lg)] p-4">
          <span className="text-[10px] font-medium text-saku-text-muted uppercase tracking-wider block mb-2">
            7 Hari Terakhir
          </span>
          <BarChart data={dailyBreakdown} dailyBudget={dailyBudget} />
        </div>
      </div>
    </div>
  );
}
