"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { addToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { toast } from "sonner";
import QuantityBox from "./product-quantity";
import { useCart } from "../cart-context";

interface AddToCartFormProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[];
    stock: number;
  };
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshCartCount } = useCart();

  const increment = () => setQuantity((prev) => Math.min(prev + 1, product.stock));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const outOfStock = product.stock <= 0;

  const handleAddToCart = async () => {
    if (outOfStock || quantity <= 0) return;

    setIsLoading(true);
    
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      qty: quantity,
      image: product.images[0],
      price: product.price,
    };

    try {
      const result = await addToCart(cartItem);
      
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
        setQuantity(1); // Reset quantity after successful add
        
        // Refresh cart count in context
        await refreshCartCount();
        // Trigger cart update event
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <QuantityBox
        initialQuantity={quantity}
        onQuantityChange={setQuantity}
        onIncrement={increment}
        onDecrement={decrement}
      />

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={outOfStock || isLoading}
        className="
          h-12 w-full sm:w-auto sm:min-w-[200px]
          rounded-full
          bg-[#89613F] hover:bg-[#724e31]
          text-white text-[16px] font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isLoading ? "Adding..." : outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
