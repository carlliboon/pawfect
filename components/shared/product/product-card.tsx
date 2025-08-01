"use client";

import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "./product-price";
import { Product } from "@/types";

export const ProductCard = (product: Product) => {
  return (
    <Link href={`/products/${product.slug}`} className="block">
      <Card
        key={product.id}
        className="w-[260px] h-[400px] flex flex-col justify-between shadow-lg pt-0 transform transition-transform duration-600 hover:scale-105 hover:shadow-xl cursor-pointer"
      >
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={300}
            priority={true}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />
          <CardHeader className="flex flex-col gap-1 px-4 pt-3 pb-1">
            <span className="text-xs text-gray-500">{product.brand}</span>
            <CardTitle className="text-base leading-tight line-clamp-2">
              {product.name}
            </CardTitle>
          </CardHeader>
        </div>

        <CardFooter className="flex justify-between items-center px-4 mt-auto">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const fillPercent = Math.max(
                0,
                Math.min(1, Number(product.rating) - i)
              );
              return (
                <span key={i} className="relative inline-block h-4 w-4">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {fillPercent > 0 && (
                    <span
                      className="absolute top-0 left-0 h-4 overflow-hidden"
                      style={{ width: `${fillPercent * 100}%` }}
                    >
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </span>
                  )}
                </span>
              );
            })}
            <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
          </div>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <span className="text-red-500 text-sm">Out of Stock</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
