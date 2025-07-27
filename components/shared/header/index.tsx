import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import ModeToggle from "./mode-toggle";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex align-middle justify-between py-2 px-4">
        <div className="flex-start ">
          <Link
            href="/"
            className="flex flex-start items-center gap-2 align-middle"
          >
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} Logo`}
              width={48}
              height={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="space-x-2 align-baseline flex items-center">
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
        </div>
      </div>
    </header>
  );
};
