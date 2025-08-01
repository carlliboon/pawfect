import { ProductCard } from "./product-card";
import { Product } from "@/types";

export const ProductList = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  // Limit the number of products displayed if a limit is provided
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          {title}
        </h2>

        {limitedData.length > 0 ? (
          <div
            className="flex flex-wrap justify-start gap-6"
            suppressHydrationWarning
          >
            {limitedData.map((product: Product) => (
              <div
                key={product.slug}
                className="w-[250px] transition-transform transform hover:scale-[1.03]"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No products available at the moment. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
};
