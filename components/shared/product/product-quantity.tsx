"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

export default function QuantityBox() {
  const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col gap-2 mt-4 w-[100px]">
      {/* Outer border + radius */}
      <div className="flex items-center border rounded-md overflow-hidden">
        {/* Minus button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={decrement}
          className="rounded-none border-0 hover:bg-transparent"
        >
          -
        </Button>

        {/* Quantity input */}
        <Input
          id="quantity"
          type="text"
          value={quantity}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            if (!isNaN(newQuantity)) {
              setQuantity(newQuantity);
            }
          }}
          className="text-center border-0 rounded-none shadow-none px-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
        />

        {/* Plus button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={increment}
          className="rounded-none border-0 hover:bg-transparent"
        >
          +
        </Button>
      </div>
    </div>
  );
}
