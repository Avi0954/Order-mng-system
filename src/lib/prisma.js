import { PrismaClient } from "@prisma/client";

// In Next.js dev mode, hot reloading reinstantiates modules, which can create
// multiple database connection pools and exhaust Postgres connections.
// Attaching the Prisma Client instance to globalThis persists it across reloads.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
