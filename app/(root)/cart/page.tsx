import { getCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { ProductPrice } from "@/components/shared/product/product-price";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import CartQuantityBox from "@/components/shared/product/cart-quantity-box";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const items = cart.items as CartItem[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center space-x-4 pb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <Link href={`/product/${item.slug}`} className="hover:underline">
                  <div className="flex gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <h4>x{item.qty}</h4>
                  </div>
                  </Link>
                  <CartQuantityBox 
                    productId={item.productId}
                    initialQuantity={item.qty}
                  />
                  {/* <p className="text-gray-500">Quantity: {item.qty}</p> */}
                </div>
                <div className="text-right">
                  <ProductPrice value={Number(item.price)} />
                  <p className="text-sm text-gray-500">
                    Total: ${(Number(item.price) * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${Number(cart.itemsPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${Number(cart.shippingPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${Number(cart.taxPrice).toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${Number(cart.totalPrice).toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-6">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
