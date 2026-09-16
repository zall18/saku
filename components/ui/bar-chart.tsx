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
    <div className="flex items-end gap-1.5 h-28 w-full">
      {data.map((day, i) => {
        const height = maxValue > 0 ? (day.total / maxValue) * 100 : 0;
        const isOverBudget = day.total > dailyBudget;
        const isToday = i === data.length - 1;

        return (
          <div
            key={day.date}
            className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
          >
            {/* Amount label on hover / for today */}
            {day.total > 0 && (
              <span
                className={`text-[10px] saku-mono leading-none ${
                  isToday
                    ? "text-saku-text"
                    : "text-saku-text-muted"
                }`}
              >
                {formatCurrencyShort(day.total)}
              </span>
            )}

            {/* Bar */}
            <div className="w-full relative flex-1 flex items-end">
              {/* Budget line */}
              {dailyBudget > 0 && (
                <div
                  className="absolute w-full border-t border-dashed border-saku-text-muted/30"
                  style={{
                    bottom: `${(dailyBudget / maxValue) * 100}%`,
                  }}
                />
              )}

              <div
                className={`
                  w-full rounded-t-[4px] min-h-[2px]
                  saku-animate-bar-grow
                  transition-colors duration-300
                  ${
                    isOverBudget
                      ? "bg-gradient-to-t from-saku-expense-dim to-saku-expense"
                      : isToday
                        ? "bg-gradient-to-t from-saku-accent-dim to-saku-accent"
                        : "bg-gradient-to-t from-saku-accent-dim/40 to-saku-accent/50"
                  }
                `}
                style={{
                  height: `${Math.max(height, day.total > 0 ? 4 : 0)}%`,
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            </div>

            {/* Day label */}
            <span
              className={`text-[10px] leading-none ${
                isToday
                  ? "text-saku-accent font-semibold"
                  : "text-saku-text-muted"
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
