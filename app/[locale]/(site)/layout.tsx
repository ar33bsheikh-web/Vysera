import Header from '../../../components/header/Header';
import Footer from '../../../components/footer';
import { getCart } from '../../../lib/shopify';
import { getCartId } from '../../../actions/cart';
import { Toaster } from '../../../components/ui/toaster';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartId = await getCartId();
  const cart = cartId ? await getCart(cartId) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header cart={cart} />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}