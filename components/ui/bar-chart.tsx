"use client";

import type { DailyBreakdown } from "@/features/transaction/transaction-types";
import { formatCurrencyShort } from "@/lib/utils";

interface BarChartProps {
  data: DailyBreakdown[];
  dailyBudget: number;
}

export function BarChart({ data, dailyBudget }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.total), dailyBudget, 1);

  return (
    <div className="flex items-end gap-2 h-32 w-full pt-4">
      {data.map((day, i) => {
        const height = maxValue > 0 ? (day.total / maxValue) * 100 : 0;
        const isOverBudget = dailyBudget > 0 && day.total > dailyBudget;
        const isToday = i === data.length - 1;

        return (
          <div
            key={day.date}
            className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative"
          >
            {/* Amount label */}
            <span
              className={`text-[10px] saku-mono leading-none ${
                isToday
                  ? "text-slate-900 font-semibold"
                  : "text-slate-400 group-hover:text-slate-700"
              }`}
            >
              {day.total > 0 ? formatCurrencyShort(day.total) : "0"}
            </span>

            {/* Bar container */}
            <div className="w-full relative flex-1 flex items-end bg-slate-50 rounded-t-md overflow-hidden">
              {/* Daily Budget guide line */}
              {dailyBudget > 0 && (
                <div
                  className="absolute w-full border-t border-dashed border-slate-300 z-10 pointer-events-none"
                  style={{
                    bottom: `${(dailyBudget / maxValue) * 100}%`,
                  }}
                  title={`Budget Harian: ${formatCurrencyShort(dailyBudget)}`}
                />
              )}

              <div
                className={`
                  w-full rounded-t-md min-h-[3px]
                  saku-animate-bar-grow
                  transition-all duration-300
                  ${
                    isOverBudget
                      ? "bg-gradient-to-t from-rose-500 to-rose-400 shadow-sm"
                      : isToday
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-sm"
                        : "bg-gradient-to-t from-emerald-500/70 to-emerald-400/80 group-hover:from-emerald-600 group-hover:to-emerald-500"
                  }
                `}
                style={{
                  height: `${Math.max(height, day.total > 0 ? 6 : 0)}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            </div>

            {/* Day label */}
            <span
              className={`text-[11px] leading-none ${
                isToday
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 font-medium"
              }`}
            >
              {day.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
