import { cn } from "@/lib/utils";

export const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const formattedPrice = Number(value).toFixed(2); // Format to 2 decimal places
  const [number, decimal] = formattedPrice.split(".");

  return (
    <>
      <p className={cn("text-2xl", className)}>
        <span className="text-xs align-super">$</span>
        {number}
        <span className="text-xs align-super">.{decimal}</span>
      </p>
    </>
  );
};
