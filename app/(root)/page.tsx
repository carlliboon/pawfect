import { ProductList } from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const latestProductRaw = await getLatestProducts();
  const latestProduct = latestProductRaw.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating?.toString?.() ?? "",
    shippingDetails: product.shippingDetails ?? "",
    returnPolicy: product.returnPolicy ?? "",
  }));

  return (
    <>
      <ProductList data={latestProduct} title="Newest Arrivals" limit={6} />
    </>
  );
}
