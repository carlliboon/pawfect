"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

interface QuantityBoxProps {
  initialQuantity?: number;
  value?: number; // External value control
  onQuantityChange?: (quantity: number) => void;
  onIncrement?: (quantity: number) => void;
  onDecrement?: (quantity: number) => void;
  disabled?: boolean;
}

export default function QuantityBox({
  initialQuantity = 0,
  value,
  onQuantityChange,
  onIncrement,
  onDecrement,
  disabled = false,
}: QuantityBoxProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Use external value if provided, otherwise use internal state
  const currentQuantity = value !== undefined ? value : quantity;

  const increment = () => {
    const newQuantity = currentQuantity + 1;
    if (value === undefined) {
      setQuantity(newQuantity);
    }
    onIncrement?.(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const decrement = () => {
    const newQuantity = Math.max(currentQuantity - 1, 0);
    if (value === undefined) {
      setQuantity(newQuantity);
    }
    onDecrement?.(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (!isNaN(newQuantity)) {
      if (value === undefined) {
        setQuantity(newQuantity);
      }
      onQuantityChange?.(newQuantity);
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
          disabled={disabled}
          className="rounded-none border-0 hover:bg-transparent"
        >
          -
        </Button>

        <Input
          id="quantity"
          type="text"
          value={currentQuantity}
          onChange={handleInputChange}
          disabled={disabled}
          className="text-center border-0 rounded-none shadow-none px-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={increment}
          disabled={disabled}
          className="rounded-none border-0 hover:bg-transparent"
        >
          +
        </Button>
      </div>
    </div>
  );
}
