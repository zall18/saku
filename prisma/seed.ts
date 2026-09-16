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
    userId: null,
  },
  {
    label: "Kopi",
    icon: "☕",
    amount: 12000,
    category: "daily",
    subCategory: "kopi",
    paymentSource: "qris",
    sortOrder: 2,
    userId: null,
  },
  {
    label: "Shuttle",
    icon: "🚐",
    amount: 25000,
    category: "transport",
    subCategory: "shuttle",
    paymentSource: "cash",
    sortOrder: 3,
    userId: null,
  },
  {
    label: "Laundry",
    icon: "👕",
    amount: 15000,
    category: "daily",
    subCategory: "laundry",
    paymentSource: "cash",
    sortOrder: 4,
    userId: null,
  },
  {
    label: "Jajan",
    icon: "🍡",
    amount: 10000,
    category: "daily",
    subCategory: "jajan",
    paymentSource: "qris",
    sortOrder: 5,
    userId: null,
  },
  {
    label: "Game",
    icon: "🎮",
    amount: 15000,
    category: "entertainment",
    subCategory: "game",
    paymentSource: "ewallet",
    sortOrder: 6,
    userId: null,
  },
];

async function main() {
  console.log("🌱 Seeding shortcuts to database...");

  for (const shortcut of defaultShortcuts) {
    const id = shortcut.label.toLowerCase().replace(/\s+/g, "_");
    await prisma.shortcut.upsert({
      where: { id },
      update: shortcut,
      create: {
        id,
        ...shortcut,
      },
    });
  }

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
