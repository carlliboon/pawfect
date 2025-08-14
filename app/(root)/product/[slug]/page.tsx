import { ProductPrice } from "@/components/shared/product/product-price";
import QuantityBox from "@/components/shared/product/product-quantity";
import { Button } from "@/components/ui";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { ProductGalleryWW } from "./product-gallery-ww";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const outOfStock = product.stock <= 0;

  return (
    <section className="py-6 lg:py-10">
      {/* same container width as header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left: Gallery (wider). Right: Details */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-12 items-start">
          {/* Gallery with arrows + thumbs */}
          <ProductGalleryWW images={product.images} />

          {/* Details */}
          <div className="w-full">
            {/* Title / Rating / Price */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-[34px] lg:text-[36px] font-semibold leading-tight">
                {product.name}
              </h1>

              {/* tiny brand/category line to mimic reference site */}
              <p className="text-[13px] text-gray-500">
                {product.brand} · {product.category}
              </p>

              {/* rating line */}
              <div className="flex items-center gap-2 text-gray-800">
                <span className="text-lg">★★★★★</span>
                <span className="text-sm text-gray-600">
                  ({product.numReviews})
                </span>
              </div>

              {/* price – prominent */}
              <div className="text-2xl sm:text-3xl font-semibold">
                {outOfStock ? (
                  <span className="text-red-500">Out of stock</span>
                ) : (
                  <ProductPrice value={Number(product.price)} />
                )}
              </div>
            </div>

            {/* Description (open, larger, no accordion) */}
            <div className="mt-5 text-[15px] sm:text-base lg:text-[15px] leading-7 text-gray-700">
              <p>{product.description}</p>
              {product.shippingDetails && (
                <p className="mt-3">{product.shippingDetails}</p>
              )}
              {product.returnPolicy && (
                <p className="mt-3">{product.returnPolicy}</p>
              )}
            </div>

            {/* Quantity + Add to Cart (like reference: small qty + big CTA) */}
            <form className="mt-6 flex items-baseline-last gap-5">
              <div className="w-[88px]">
                <QuantityBox />
              </div>
              <Button
                disabled={outOfStock}
                className="
                  h-12 sm:h-12
                  flex-1
                  rounded-full
                  bg-[#89613F] hover:bg-[#724e31]
                  text-white text-[18px] font-semibold
                "
              >
                Add to Cart
              </Button>
            </form>

            {/* trust badges area (optional slot) */}
            {/* <Badges /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
