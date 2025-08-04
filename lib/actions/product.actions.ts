"use server";

import { prisma } from "@/db/prisma";
import { toPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
export async function getLatestProducts() {
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

// Get single product by it's slug

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
