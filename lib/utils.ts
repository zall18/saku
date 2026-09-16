/**
 * Format angka ke Rupiah: 15000 → "Rp 15.000"
 */
export function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Format angka ke shorthand: 15000 → "15rb"
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}jt`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}rb`;
  }
  return String(amount);
}

/**
 * Format Date ke waktu: "12:30"
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Format Date ke tanggal pendek: "16 Sep"
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

/**
 * Format Date ke tanggal lengkap: "Selasa, 16 September 2026"
 */
export function formatDateFull(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Jumlah hari dalam bulan tertentu
 */
export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Hitung budget harian dari budget bulanan
 */
export function getDailyBudget(
  monthlyBudget: number,
  month: number,
  year: number
): number {
  const days = getDaysInMonth(month, year);
  return Math.round(monthlyBudget / days);
}

/**
 * Awal hari ini (00:00:00) dalam timezone lokal
 */
export function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

/**
 * Awal bulan ini
 */
export function startOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

/**
 * Parse string nominal: "15.000" → 15000, "15000" → 15000
 */
export function parseAmount(value: string): number {
  const cleaned = value.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10) || 0;
}

/**
 * Format input nominal: "15000" → "15.000"
 */
export function formatAmountInput(value: string): string {
  const num = parseAmount(value);
  if (num === 0) return "";
  return num.toLocaleString("id-ID");
}

/**
 * Hitung persentase (0-100), clamped
 */
export function calcPercent(used: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.round((used / total) * 100), 100);
}

/**
 * Dapatkan label hari: "Sen", "Sel", etc.
 */
export function getDayLabel(date: Date): string {
  return date.toLocaleDateString("id-ID", { weekday: "short" });
}
