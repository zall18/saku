"use server";

import { db } from "@/lib/db";
import { refresh } from "next/cache";
import { getAuthUser } from "@/lib/supabase/server";

/**
 * Create a new transaction from manual input
 */
export async function createTransaction(formData: FormData) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

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
        userId: user.id,
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
    return { error: "Gagal menyimpan transaksi ke database." };
  }
}

/**
 * Create a transaction from a shortcut (1-tap)
 */
export async function createQuickTransaction(shortcutId: string) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  try {
    const shortcut = await db.shortcut.findUnique({
      where: { id: shortcutId },
    });

    if (!shortcut) {
      return { error: "Shortcut tidak ditemukan." };
    }

    await db.transaction.create({
      data: {
        userId: user.id,
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
    return { error: "Gagal mencatat transaksi cepat." };
  }
}

/**
 * Delete a transaction (only for owner)
 */
export async function deleteTransaction(id: string) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  try {
    await db.transaction.deleteMany({
      where: { id, userId: user.id },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    return { error: "Gagal menghapus transaksi." };
  }
}

/**
 * Update or create budget for a specific month for current user
 */
export async function updateBudget(formData: FormData) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  const amount = parseInt(String(formData.get("amount")).replace(/[^\d]/g, ""), 10);
  const month = parseInt(String(formData.get("month")), 10);
  const year = parseInt(String(formData.get("year")), 10);

  if (!amount || amount <= 0) {
    return { error: "Nominal budget harus diisi" };
  }

  try {
    await db.budget.upsert({
      where: {
        userId_month_year: {
          userId: user.id,
          month,
          year,
        },
      },
      update: { amount },
      create: {
        userId: user.id,
        month,
        year,
        amount,
      },
    });

    refresh();
    return { success: true };
  } catch (error) {
    console.error("Failed to update budget:", error);
    return { error: "Gagal memperbarui budget." };
  }
}

/**
 * Create a new shortcut for current user
 */
export async function createShortcut(formData: FormData) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  const label = formData.get("label") as string;
  const icon = formData.get("icon") as string;
  const amount = parseInt(String(formData.get("amount")).replace(/[^\d]/g, ""), 10);
  const category = formData.get("category") as string;
  const paymentSource = formData.get("paymentSource") as string;

  if (!label || !icon || !amount || !category || !paymentSource) {
    return { error: "Semua field harus diisi" };
  }

  try {
    const maxSort = await db.shortcut.aggregate({
      where: {
        OR: [{ userId: null }, { userId: user.id }],
      },
      _max: { sortOrder: true },
    });

    await db.shortcut.create({
      data: {
        userId: user.id,
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
    return { error: "Gagal membuat shortcut." };
  }
}

/**
 * Delete a shortcut
 */
export async function deleteShortcut(id: string) {
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

  try {
    // If it's a user shortcut, delete it; if preset, can toggle inactive
    await db.shortcut.deleteMany({
      where: { id, userId: user.id },
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
  const user = await getAuthUser();
  if (!user) {
    return { error: "Sesi telah berakhir. Silakan login kembali." };
  }

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
