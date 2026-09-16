import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultShortcuts = [
  {
    label: "Makan Siang",
    icon: "🍚",
    amount: 15000,
    category: "daily",
    subCategory: "makan_siang",
    paymentSource: "qris",
    sortOrder: 1,
  },
  {
    label: "Kopi",
    icon: "☕",
    amount: 12000,
    category: "daily",
    subCategory: "kopi",
    paymentSource: "qris",
    sortOrder: 2,
  },
  {
    label: "Shuttle",
    icon: "🚐",
    amount: 25000,
    category: "transport",
    subCategory: "shuttle",
    paymentSource: "cash",
    sortOrder: 3,
  },
  {
    label: "Laundry",
    icon: "👕",
    amount: 15000,
    category: "daily",
    subCategory: "laundry",
    paymentSource: "cash",
    sortOrder: 4,
  },
  {
    label: "Jajan",
    icon: "🍡",
    amount: 10000,
    category: "daily",
    subCategory: "jajan",
    paymentSource: "qris",
    sortOrder: 5,
  },
  {
    label: "Game",
    icon: "🎮",
    amount: 15000,
    category: "entertainment",
    subCategory: "game",
    paymentSource: "ewallet",
    sortOrder: 6,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Seed shortcuts
  for (const shortcut of defaultShortcuts) {
    await prisma.shortcut.upsert({
      where: { id: shortcut.label.toLowerCase().replace(/\s+/g, "_") },
      update: shortcut,
      create: {
        id: shortcut.label.toLowerCase().replace(/\s+/g, "_"),
        ...shortcut,
      },
    });
  }

  // Seed default budget for current month
  const now = new Date();
  await prisma.budget.upsert({
    where: {
      month_year: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    },
    update: {},
    create: {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      amount: 1500000, // Rp 1.500.000 default
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
