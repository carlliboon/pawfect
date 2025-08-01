"use server";

import { PrismaClient } from "../generated/prisma";
import { toPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: LATEST_PRODUCTS_LIMIT,
    });
    return toPlainObject(products);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
