"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { useCart } from "../cart-context";

export default function CartButton() {
  const { itemCount, isLoading } = useCart();

  return (
    <Button asChild variant="ghost" className="relative">
      <Link href="/cart" className="flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" />
        <span className="hidden sm:inline">Cart</span>
        {!isLoading && itemCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#89613F] hover:bg-[#724e31]"
            variant="default"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
