"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCartItemCount } from "@/lib/actions/cart.actions";

interface CartContextType {
  itemCount: number;
  isLoading: boolean;
  refreshCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCartCount = async () => {
    try {
      setIsLoading(true);
      const count = await getCartItemCount();
      setItemCount(count);
    } catch (error) {
      console.error("Error loading cart count:", error);
      setItemCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    refreshCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      refreshCartCount();
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("focus", handleCartUpdate);
    
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("focus", handleCartUpdate);
    };
  }, []);

  return (
    <CartContext.Provider value={{ itemCount, isLoading, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
