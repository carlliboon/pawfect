"use client";

import { useState, useTransition } from "react";
import { updateCartItemQuantity } from "@/lib/actions/cart.actions";
import { Button, Input } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useCart } from "../cart-context";

interface CartQuantityBoxProps {
  productId: string;
  initialQuantity: number;
}

export default function CartQuantityBox({
  productId,
  initialQuantity,
}: CartQuantityBoxProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refreshCartCount } = useCart();

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 0) return;
    
    setQuantity(newQuantity);
    
    startTransition(async () => {
      const result = await updateCartItemQuantity(productId, newQuantity);
      if (result.success) {
        // Refresh cart count in context
        await refreshCartCount();
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('cart-updated'));
        router.refresh();
      } else {
        // Revert the quantity if update failed
        setQuantity(initialQuantity);
        console.error("Failed to update cart:", result.message);
      }
    });
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  };

  const decrement = () => {
    const newQuantity = Math.max(quantity - 1, 0);
    updateQuantity(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 w-[100px]">
      <div className="flex items-center border rounded-md overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={decrement}
          disabled={isPending}
          className="rounded-none border-0 hover:bg-transparent"
        >
          -
        </Button>

        <Input
          id={`quantity-${productId}`}
          type="text"
          value={quantity}
          onChange={handleInputChange}
          disabled={isPending}
          className="text-center border-0 rounded-none shadow-none px-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={increment}
          disabled={isPending}
          className="rounded-none border-0 hover:bg-transparent"
        >
          +
        </Button>
      </div>
    </div>
  );
}
