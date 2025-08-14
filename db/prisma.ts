import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma";

// Use HTTP/fetch (faster in serverless) – no ws needed
neonConfig.poolQueryViaFetch = true;

function createPrisma() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });

  // Build the extended client (your Decimal→string transforms)
  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        price: { compute: (p) => p.price.toString() },
        rating: { compute: (p) => p.rating.toString() },
      },
    },
  });
}

// Infer the correct extended type
export type PrismaClientX = ReturnType<typeof createPrisma>;

// Store the extended type on globalThis (singleton)
const g = globalThis as unknown as { prisma?: PrismaClientX };

export const prisma: PrismaClientX = g.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  g.prisma = prisma;
}
