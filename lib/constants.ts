export const CATEGORIES = {
  daily: { label: "Kebutuhan Harian", icon: "🍚", color: "#10b981" },
  transport: { label: "Transportasi", icon: "🚐", color: "#3b82f6" },
  entertainment: { label: "Hiburan Digital", icon: "🎮", color: "#a855f7" },
} as const;

export const PAYMENT_SOURCES = {
  qris: { label: "QRIS", icon: "📱" },
  brimo: { label: "BRImo", icon: "🏦" },
  cash: { label: "Tunai", icon: "💵" },
  ewallet: { label: "E-Wallet", icon: "💳" },
  dana: { label: "DANA", icon: "💙" },
  gopay: { label: "GoPay", icon: "💚" },
} as const;

export const CATEGORY_OPTIONS = Object.entries(CATEGORIES).map(
  ([value, data]) => ({
    value,
    ...data,
  })
);

export const PAYMENT_SOURCE_OPTIONS = Object.entries(PAYMENT_SOURCES).map(
  ([value, data]) => ({
    value,
    ...data,
  })
);

export const APP_NAME = "Saku";
export const APP_DESCRIPTION = "Pengatur keuangan harian — cepat, simpel, fokus.";
export const DEFAULT_CURRENCY = "IDR";

export const DEFAULT_SHORTCUTS = [
  {
    id: "makan_siang",
    label: "Makan Siang",
    icon: "🍚",
    amount: 15000,
    category: "daily",
    subCategory: "makan_siang",
    paymentSource: "qris",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "kopi",
    label: "Kopi",
    icon: "☕",
    amount: 12000,
    category: "daily",
    subCategory: "kopi",
    paymentSource: "qris",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "shuttle",
    label: "Shuttle",
    icon: "🚐",
    amount: 25000,
    category: "transport",
    subCategory: "shuttle",
    paymentSource: "cash",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "laundry",
    label: "Laundry",
    icon: "👕",
    amount: 15000,
    category: "daily",
    subCategory: "laundry",
    paymentSource: "cash",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "jajan",
    label: "Jajan",
    icon: "🍡",
    amount: 10000,
    category: "daily",
    subCategory: "jajan",
    paymentSource: "qris",
    sortOrder: 5,
    isActive: true,
  },
  {
    id: "game",
    label: "Game",
    icon: "🎮",
    amount: 15000,
    category: "entertainment",
    subCategory: "game",
    paymentSource: "ewallet",
    sortOrder: 6,
    isActive: true,
  },
];
