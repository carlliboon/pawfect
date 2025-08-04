import { ProductPrice } from "@/components/shared/product/product-price";
import QuantityBox from "@/components/shared/product/product-quantity";
import {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/shared/product/product-gallery";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-3">
            <ProductGallery images={product.images} />
          </div>
          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-xs text-gray-500 font-light">
                {product.brand} {product.category}
              </h1>
              <h1 className="font-semibold text-2xl">{product.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center mt-3">
                {product.stock > 0 ? (
                  <ProductPrice value={Number(product.price)} />
                ) : (
                  <span className=" text-red-500">Out of stock</span>
                )}
              </div>
              <p className="text-sm">
                {product.rating} of {product.numReviews} Reviews
              </p>
            </div>
            <QuantityBox />
            <div className="w-max">
              <form className="flex gap-2 mt-10">
                <Button
                  variant="outline"
                  disabled={product.stock <= 0 && true}
                  className="w-full min-h-[50px]"
                >
                  Add To Cart
                </Button>
                <Button
                  disabled={product.stock <= 0 && true}
                  className="w-full min-h-[50px]"
                >
                  Buy Now
                </Button>
              </form>
            </div>
            <Accordion
              type="single"
              collapsible
              defaultValue="product-information"
              className="mt-14 w-[450px]"
            >
              {product.description && (
                <AccordionItem value="product-information">
                  <AccordionTrigger>Product Information</AccordionTrigger>
                  <AccordionContent>
                    <p>{product.description}</p>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.shippingDetails && (
                <AccordionItem value="shipping-details">
                  <AccordionTrigger>Shipping Details</AccordionTrigger>
                  <AccordionContent>
                    <p>{product.description}</p>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.returnPolicy && (
                <AccordionItem value="return-policy">
                  <AccordionTrigger>Return Policy</AccordionTrigger>
                  <AccordionContent>
                    <p>{product.description}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
