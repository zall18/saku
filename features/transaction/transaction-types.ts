export type Category = "daily" | "transport" | "entertainment";

export type PaymentSource =
  | "qris"
  | "brimo"
  | "cash"
  | "ewallet"
  | "dana"
  | "gopay";

export interface TransactionInput {
  amount: number;
  description?: string;
  category: Category;
  subCategory?: string;
  paymentSource: PaymentSource;
}

export interface ShortcutData {
  id: string;
  label: string;
  icon: string;
  amount: number;
  category: string;
  subCategory: string | null;
  paymentSource: string;
  sortOrder: number;
  isActive: boolean;
}

export interface BudgetData {
  id: string;
  month: number;
  year: number;
  amount: number;
}

export interface TransactionData {
  id: string;
  amount: number;
  description: string | null;
  category: string;
  subCategory: string | null;
  paymentSource: string;
  createdAt: Date;
}

export interface DashboardSummary {
  todayTotal: number;
  monthlyTotal: number;
  monthlyBudget: number;
  dailyBudget: number;
  dailyRemaining: number;
  monthlyRemaining: number;
  percentUsed: number;
}

export interface DailyBreakdown {
  date: string;
  total: number;
  label: string;
}
