const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "System Administrator",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user seeded:", adminUser.email);

  // 2. Seed Seller User
  const sellerUser = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      email: "seller@example.com",
      name: "Standard Seller Account",
      password: hashedPassword,
      role: "SELLER",
    },
  });
  console.log("Seller user seeded:", sellerUser.email);

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during database seed execution:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
