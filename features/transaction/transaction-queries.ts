import { db } from "@/lib/db";
import { startOfToday, startOfMonth, getDailyBudget, getDayLabel } from "@/lib/utils";
import { DEFAULT_SHORTCUTS } from "@/lib/constants";
import type { DashboardSummary, DailyBreakdown, TransactionData, ShortcutData } from "./transaction-types";

/**
 * Check if the database URL is configured
 */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL || "";
  return Boolean(url && !url.includes("YOUR_PROJECT_REF"));
}

/**
 * Check if the database is configured and reachable
 */
export async function isDatabaseConnected(): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false;
  }
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all transactions for today, sorted by most recent first
 */
export async function getTodayTransactions(): Promise<TransactionData[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const today = startOfToday();
    return await db.transaction.findMany({
      where: { createdAt: { gte: today } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

/**
 * Get recent transactions (last N)
 */
export async function getRecentTransactions(
  limit: number = 20
): Promise<TransactionData[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    return await db.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

/**
 * Get total spent today
 */
export async function getTodayTotal(): Promise<number> {
  if (!isDatabaseConfigured()) return 0;
  try {
    const today = startOfToday();
    const result = await db.transaction.aggregate({
      where: { createdAt: { gte: today } },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Get total spent this month
 */
export async function getMonthlyTotal(): Promise<number> {
  if (!isDatabaseConfigured()) return 0;
  try {
    const monthStart = startOfMonth();
    const result = await db.transaction.aggregate({
      where: { createdAt: { gte: monthStart } },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Get budget for current month
 */
export async function getCurrentBudget(): Promise<number> {
  if (!isDatabaseConfigured()) return 1500000;
  try {
    const now = new Date();
    const budget = await db.budget.findUnique({
      where: {
        month_year: {
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
      },
    });
    return budget?.amount ?? 1500000;
  } catch {
    return 1500000;
  }
}

/**
 * Get full dashboard summary
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [todayTotal, monthlyTotal, monthlyBudget] = await Promise.all([
    getTodayTotal(),
    getMonthlyTotal(),
    getCurrentBudget(),
  ]);

  const now = new Date();
  const dailyBudgetAmount = getDailyBudget(
    monthlyBudget,
    now.getMonth() + 1,
    now.getFullYear()
  );

  return {
    todayTotal,
    monthlyTotal,
    monthlyBudget,
    dailyBudget: dailyBudgetAmount,
    dailyRemaining: Math.max(0, dailyBudgetAmount - todayTotal),
    monthlyRemaining: Math.max(0, monthlyBudget - monthlyTotal),
    percentUsed: monthlyBudget > 0 ? Math.round((monthlyTotal / monthlyBudget) * 100) : 0,
  };
}

/**
 * Get daily spending breakdown for the last N days (for bar chart)
 */
export async function getDailyBreakdown(days: number = 7): Promise<DailyBreakdown[]> {
  const result: DailyBreakdown[] = [];
  const now = new Date();

  if (!isDatabaseConfigured()) {
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      result.push({
        date: date.toISOString().split("T")[0],
        total: 0,
        label: getDayLabel(date),
      });
    }
    return result;
  }

  try {
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      let total = 0;
      try {
        const aggregate = await db.transaction.aggregate({
          where: {
            createdAt: {
              gte: date,
              lt: nextDate,
            },
          },
          _sum: { amount: true },
        });
        total = aggregate._sum.amount ?? 0;
      } catch {
        total = 0;
      }

      result.push({
        date: date.toISOString().split("T")[0],
        total,
        label: getDayLabel(date),
      });
    }
  } catch {
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      result.push({
        date: date.toISOString().split("T")[0],
        total: 0,
        label: getDayLabel(date),
      });
    }
  }

  return result;
}

/**
 * Get all active shortcuts, sorted
 */
export async function getShortcuts(): Promise<ShortcutData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_SHORTCUTS;
  try {
    const shortcuts = await db.shortcut.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    if (shortcuts.length > 0) return shortcuts;
    return DEFAULT_SHORTCUTS;
  } catch {
    return DEFAULT_SHORTCUTS;
  }
}

/**
 * Get all shortcuts (including inactive), for settings page
 */
export async function getAllShortcuts(): Promise<ShortcutData[]> {
  if (!isDatabaseConfigured()) return DEFAULT_SHORTCUTS;
  try {
    const shortcuts = await db.shortcut.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (shortcuts.length > 0) return shortcuts;
    return DEFAULT_SHORTCUTS;
  } catch {
    return DEFAULT_SHORTCUTS;
  }
}

/**
 * Get budget for a specific month
 */
export async function getBudget(month: number, year: number) {
  if (!isDatabaseConfigured()) return null;
  try {
    return await db.budget.findUnique({
      where: { month_year: { month, year } },
    });
  } catch {
    return null;
  }
}
