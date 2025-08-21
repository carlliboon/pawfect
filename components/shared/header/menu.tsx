import ModeToggle from "./mode-toggle";
import { EllipsisVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import UserButton from "./user-button";
import CartButton from "./cart-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3 py-2">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <CartButton />
        <UserButton />
      </nav>
      <nav className="flex md:hidden align-middle">
        <ModeToggle />
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start px-2">
            <SheetTitle></SheetTitle>
            <CartButton />
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
