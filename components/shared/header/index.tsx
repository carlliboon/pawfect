import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt={`${APP_NAME} Logo`}
            width={48}
            height={48}
            priority={true}
          />
          <span className="hidden sm:block font-bold text-2xl ml-2">
            {APP_NAME}
          </span>
        </Link>

        {/* Menu */}
        <Menu />
      </div>
    </header>
  );
};
