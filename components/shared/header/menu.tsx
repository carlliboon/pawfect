import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3 py-2">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart className="h-6 w-6" />
            Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href="/sign-in">
            <UserIcon className="h-6 w-6" />
            Sign In
          </Link>
        </Button>
      </nav>
      <nav className="flex md:hidden align-middle">
        <ModeToggle />
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start px-2">
            <SheetTitle></SheetTitle>
            <Button asChild variant="ghost">
              <Link href="/cart" className="flex items-center">
                <ShoppingCart className="h-6 w-6" />
                Cart
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/sign-in" className="flex items-center">
                <UserIcon className="h-6 w-6" />
                Sign In
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
