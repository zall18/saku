import { db } from "@/lib/db";
import { startOfToday, startOfMonth, getDailyBudget, getDayLabel } from "@/lib/utils";
import { DEFAULT_SHORTCUTS } from "@/lib/constants";
import { getAuthUser } from "@/lib/supabase/server";
import type { DashboardSummary, DailyBreakdown, TransactionData, ShortcutData } from "./transaction-types";

/**
 * Get active user ID or fallback
 */
async function getCurrentUserId(): Promise<string | null> {
  const user = await getAuthUser();
  return user?.id ?? null;
}

/**
 * Get all transactions for today for current user
 */
export async function getTodayTransactions(): Promise<TransactionData[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const today = startOfToday();
    return await db.transaction.findMany({
      where: {
        userId,
        createdAt: { gte: today },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("getTodayTransactions error:", err);
    return [];
  }
}

/**
 * Get recent transactions (last N) for current user
 */
export async function getRecentTransactions(
  limit: number = 20
): Promise<TransactionData[]> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    return await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch (err) {
    console.error("getRecentTransactions error:", err);
    return [];
  }
}

/**
 * Get total spent today for current user
 */
export async function getTodayTotal(): Promise<number> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return 0;

    const today = startOfToday();
    const result = await db.transaction.aggregate({
      where: {
        userId,
        createdAt: { gte: today },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Get total spent this month for current user
 */
export async function getMonthlyTotal(): Promise<number> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return 0;

    const monthStart = startOfMonth();
    const result = await db.transaction.aggregate({
      where: {
        userId,
        createdAt: { gte: monthStart },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Get budget for current month for current user
 */
export async function getCurrentBudget(): Promise<number> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return 1500000;

    const now = new Date();
    const budget = await db.budget.findUnique({
      where: {
        userId_month_year: {
          userId,
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
  const userId = await getCurrentUserId();

  if (!userId) {
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
            userId,
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
 * Get all active shortcuts (presets or user-specific)
 */
export async function getShortcuts(): Promise<ShortcutData[]> {
  try {
    const userId = await getCurrentUserId();

    const shortcuts = await db.shortcut.findMany({
      where: {
        isActive: true,
        OR: [{ userId: null }, ...(userId ? [{ userId }] : [])],
      },
      orderBy: { sortOrder: "asc" },
    });

    if (shortcuts.length > 0) return shortcuts;
    return DEFAULT_SHORTCUTS;
  } catch {
    return DEFAULT_SHORTCUTS;
  }
}

/**
 * Get all shortcuts (including inactive) for settings page
 */
export async function getAllShortcuts(): Promise<ShortcutData[]> {
  try {
    const userId = await getCurrentUserId();

    const shortcuts = await db.shortcut.findMany({
      where: {
        OR: [{ userId: null }, ...(userId ? [{ userId }] : [])],
      },
      orderBy: { sortOrder: "asc" },
    });

    if (shortcuts.length > 0) return shortcuts;
    return DEFAULT_SHORTCUTS;
  } catch {
    return DEFAULT_SHORTCUTS;
  }
}

/**
 * Get budget for a specific month for current user
 */
export async function getBudget(month: number, year: number) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return null;

    return await db.budget.findUnique({
      where: {
        userId_month_year: { userId, month, year },
      },
    });
  } catch {
    return null;
  }
}
