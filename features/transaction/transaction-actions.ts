"use server";

import { db } from "@/lib/db";
import { refresh } from "next/cache";

/**
 * Create a new transaction from manual input
 */
export async function createTransaction(formData: FormData) {
  const amount = parseInt(String(formData.get("amount")).replace(/[^\d]/g, ""), 10);
  const description = formData.get("description") as string | null;
  const category = formData.get("category") as string;
  const paymentSource = formData.get("paymentSource") as string;

  if (!amount || amount <= 0) {
    return { error: "Nominal harus diisi" };
  }
  if (!category) {
    return { error: "Kategori harus dipilih" };
  }
  if (!paymentSource) {
    return { error: "Sumber dana harus dipilih" };
  }

  try {
    await db.transaction.create({
      data: {
        amount,
        description: description || null,
        category,
        paymentSource,
      },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return { error: "Gagal menyimpan transaksi. Pastikan koneksi database Supabase sudah dikonfigurasi di .env" };
  }
}

/**
 * Create a transaction from a shortcut (1-tap)
 */
export async function createQuickTransaction(shortcutId: string) {
  try {
    const shortcut = await db.shortcut.findUnique({
      where: { id: shortcutId },
    });

    if (!shortcut) {
      return { error: "Shortcut tidak ditemukan di database" };
    }

    await db.transaction.create({
      data: {
        amount: shortcut.amount,
        description: shortcut.label,
        category: shortcut.category,
        subCategory: shortcut.subCategory,
        paymentSource: shortcut.paymentSource,
      },
    });

    refresh();
    return { success: true, label: shortcut.label, amount: shortcut.amount };
  } catch (error) {
    console.error("Failed to create quick transaction:", error);
    return { error: "Gagal mencatat transaksi cepat. Pastikan database Supabase terhubung." };
  }
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id: string) {
  try {
    await db.transaction.delete({
      where: { id },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    return { error: "Gagal menghapus transaksi." };
  }
}

/**
 * Update or create budget for a specific month
 */
export async function updateBudget(formData: FormData) {
  const amount = parseInt(String(formData.get("amount")).replace(/[^\d]/g, ""), 10);
  const month = parseInt(String(formData.get("month")), 10);
  const year = parseInt(String(formData.get("year")), 10);

  if (!amount || amount <= 0) {
    return { error: "Nominal budget harus diisi" };
  }

  try {
    await db.budget.upsert({
      where: { month_year: { month, year } },
      update: { amount },
      create: { month, year, amount },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to update budget:", error);
    return { error: "Gagal memperbarui budget. Pastikan database Supabase terhubung." };
  }
}

/**
 * Create a new shortcut
 */
export async function createShortcut(formData: FormData) {
  const label = formData.get("label") as string;
  const icon = formData.get("icon") as string;
  const amount = parseInt(String(formData.get("amount")).replace(/[^\d]/g, ""), 10);
  const category = formData.get("category") as string;
  const paymentSource = formData.get("paymentSource") as string;

  if (!label || !icon || !amount || !category || !paymentSource) {
    return { error: "Semua field harus diisi" };
  }

  try {
    const maxSort = await db.shortcut.aggregate({ _max: { sortOrder: true } });

    await db.shortcut.create({
      data: {
        label,
        icon,
        amount,
        category,
        paymentSource,
        sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
      },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to create shortcut:", error);
    return { error: "Gagal membuat shortcut. Pastikan database Supabase terhubung." };
  }
}

/**
 * Delete a shortcut
 */
export async function deleteShortcut(id: string) {
  try {
    await db.shortcut.delete({
      where: { id },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete shortcut:", error);
    return { error: "Gagal menghapus shortcut." };
  }
}

/**
 * Toggle shortcut active status
 */
export async function toggleShortcut(id: string) {
  try {
    const shortcut = await db.shortcut.findUnique({ where: { id } });
    if (!shortcut) return { error: "Shortcut tidak ditemukan" };

    await db.shortcut.update({
      where: { id },
      data: { isActive: !shortcut.isActive },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle shortcut:", error);
    return { error: "Gagal mengubah status shortcut." };
  }
}
