import { Header } from "@/components/shared/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/shared/cart-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1 wrapper">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
