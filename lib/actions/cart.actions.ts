"use server";

import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { JsonValue } from "@prisma/client/runtime/library";
import { Decimal } from "@prisma/client/runtime/library";

// Serialized cart type for client components
type SerializedCart = {
  id: string;
  userId: string | null;
  sessionCartId: string;
  items: JsonValue[];
  itemsPrice: string;
  totalPrice: string;
  shippingPrice: string;
  taxPrice: string;
  createdAt: string;
  updatedAt: string;
};

// Raw cart type from Prisma
type PrismaCart = {
  id: string;
  userId: string | null;
  sessionCartId: string;
  items: JsonValue[];
  itemsPrice: Decimal;
  totalPrice: Decimal;
  shippingPrice: Decimal;
  taxPrice: Decimal;
  createdAt: Date;
  updatedAt: Date;
};

// Helper function to serialize cart data
function serializeCart(cart: PrismaCart): SerializedCart {
  return {
    ...cart,
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
    createdAt: cart.createdAt.toISOString(),
    updatedAt: cart.updatedAt.toISOString(),
  };
}

// Get or create cart for user/session
export async function getCart(): Promise<SerializedCart | null> {
  const session = await auth();
  const cookieStore = await cookies();
  
  let cart;
  
  if (session?.user?.id) {
    // Logged in user - find by userId
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id }
    });
  } else {
    // Guest user - find by sessionCartId
    const sessionCartId = cookieStore.get("sessionCartId")?.value;
    if (sessionCartId) {
      cart = await prisma.cart.findFirst({
        where: { sessionCartId }
      });
    }
  }

  // Serialize the cart data to make it safe for client components
  if (cart) {
    return serializeCart(cart);
  }

  return null;
}

// Add item to cart
export async function addToCart(item: CartItem) {
  try {
    const session = await auth();
    const cookieStore = await cookies();
    
    let cartData = await getCart();
    
    if (!cartData) {
      // Create new cart
      const sessionCartId = cookieStore.get("sessionCartId")?.value || randomUUID();
      
      const newCart = await prisma.cart.create({
        data: {
          userId: session?.user?.id || null,
          sessionCartId,
          items: [item],
          itemsPrice: item.price,
          shippingPrice: "0",
          taxPrice: "0",
          totalPrice: item.price,
        }
      });
      
      if (!session?.user?.id) {
        cookieStore.set("sessionCartId", sessionCartId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30 // 30 days
        });
      }
      
      cartData = serializeCart(newCart);
    } else {
      // Update existing cart
      const existingItems = cartData.items as CartItem[];
      const existingItemIndex = existingItems.findIndex(
        (existingItem) => existingItem.productId === item.productId
      );
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        updatedItems = existingItems.map((existingItem, index) =>
          index === existingItemIndex
            ? { ...existingItem, qty: existingItem.qty + item.qty }
            : existingItem
        );
      } else {
        // Add new item
        updatedItems = [...existingItems, item];
      }
      
      const itemsPrice = updatedItems.reduce(
        (acc, item) => acc + Number(item.price) * item.qty,
        0
      );
      
      const updatedCart = await prisma.cart.update({
        where: { id: cartData.id },
        data: {
          items: updatedItems,
          itemsPrice: itemsPrice.toString(),
          totalPrice: itemsPrice.toString(), // Will need to add shipping + tax later
        }
      });
      
      cartData = serializeCart(updatedCart);
    }
    
    return { success: true, cart: cartData };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "Failed to add item to cart" };
  }
}

// Update item quantity in cart
export async function updateCartItemQuantity(productId: string, qty: number) {
  try {
    const cartData = await getCart();
    
    if (!cartData) {
      return { success: false, message: "Cart not found" };
    }
    
    const existingItems = cartData.items as CartItem[];
    const updatedItems = existingItems.map((item) =>
      item.productId === productId ? { ...item, qty } : item
    ).filter(item => item.qty > 0); // Remove items with 0 quantity
    
    const itemsPrice = updatedItems.reduce(
      (acc, item) => acc + Number(item.price) * item.qty,
      0
    );
    
    const updatedCart = await prisma.cart.update({
      where: { id: cartData.id },
      data: {
        items: updatedItems,
        itemsPrice: itemsPrice.toString(),
        totalPrice: itemsPrice.toString(),
      }
    });
    
    return { success: true, cart: serializeCart(updatedCart) };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { success: false, message: "Failed to update cart item" };
  }
}

// Remove item from cart
export async function removeFromCart(productId: string) {
  try {
    const cartData = await getCart();
    
    if (!cartData) {
      return { success: false, message: "Cart not found" };
    }
    
    const existingItems = cartData.items as CartItem[];
    const updatedItems = existingItems.filter(
      (item) => item.productId !== productId
    );
    
    const itemsPrice = updatedItems.reduce(
      (acc, item) => acc + Number(item.price) * item.qty,
      0
    );
    
    const updatedCart = await prisma.cart.update({
      where: { id: cartData.id },
      data: {
        items: updatedItems,
        itemsPrice: itemsPrice.toString(),
        totalPrice: itemsPrice.toString(),
      }
    });
    
    return { success: true, cart: serializeCart(updatedCart) };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false, message: "Failed to remove item from cart" };
  }
}

// Clear entire cart
export async function clearCart() {
  try {
    const cartData = await getCart();
    
    if (!cartData) {
      return { success: false, message: "Cart not found" };
    }
    
    const updatedCart = await prisma.cart.update({
      where: { id: cartData.id },
      data: {
        items: [],
        itemsPrice: "0",
        totalPrice: "0",
        shippingPrice: "0",
        taxPrice: "0",
      }
    });
    
    return { success: true, cart: serializeCart(updatedCart) };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, message: "Failed to clear cart" };
  }
}

// Get cart item count
export async function getCartItemCount() {
  try {
    const cartData = await getCart();
    
    if (!cartData) {
      return 0;
    }
    
    const items = cartData.items as CartItem[];
    return items.reduce((total, item) => total + item.qty, 0);
  } catch (error) {
    console.error("Error getting cart item count:", error);
    return 0;
  }
}
