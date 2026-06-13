import type { ActionFunctionArgs, MetaFunction } from "react-router";
import { redirect, Link, useFetcher } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "~/context/CartContext";
import {
  storefrontRequest,
  CART_CREATE_MUTATION,
  type ShopifyCart,
} from "~/lib/shopify.server";
import { getCartSession } from "~/lib/session.server";

export const meta: MetaFunction = () => [
  { title: "Your Bag — La'maan London" },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "checkout") {
    const itemsJson = formData.get("items") as string;
    const items: Array<{ variantId: string; quantity: number }> = JSON.parse(itemsJson || "[]");

    if (!items.length) return { error: "Cart is empty" };

    const cartSession = await getCartSession(request);

    const lines = items
      .filter((item) => item.variantId)
      .map((item) => ({ merchandiseId: item.variantId, quantity: item.quantity }));

    if (!lines.length) {
      return { error: "No Shopify products connected yet. Connect Shopify to enable checkout." };
    }

    try {
      const data = await storefrontRequest<{ cartCreate: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(
        CART_CREATE_MUTATION,
        { lines },
      );

      if (data?.cartCreate?.cart?.checkoutUrl) {
        cartSession.setCartId(data.cartCreate.cart.id);
        return redirect(data.cartCreate.cart.checkoutUrl, {
          headers: { "Set-Cookie": await cartSession.commit() },
        });
      }

      const err = data?.cartCreate?.userErrors?.[0]?.message;
      return { error: err ?? "Could not create Shopify cart." };
    } catch {
      return { error: "Shopify is not connected yet. Connect it in the Integrations tab to enable checkout." };
    }
  }

  return { error: "Unknown action" };
}

export default function CartPage() {
  const { items, updateQuantity, removeFromBag, subtotal } = useCart();
  const fetcher = useFetcher<typeof action>();

  const handleCheckout = () => {
    const checkoutItems = items.map((item) => ({
      variantId: item.product.variantId,
      quantity: item.quantity,
    }));

    const formData = new FormData();
    formData.set("intent", "checkout");
    formData.set("items", JSON.stringify(checkoutItems));
    fetcher.submit(formData, { method: "POST" });
  };

  const checkoutError = fetcher.data && "error" in fetcher.data ? fetcher.data.error : null;
  const isCheckingOut = fetcher.state !== "idle";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen pt-28 md:pt-36 pb-24 text-white"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <p className="text-[#B59410] text-[10px] tracking-[0.35em] uppercase mb-2">
              La'maan London
            </p>
            <h1 className="font-serif text-4xl md:text-5xl">Your Bag</h1>
          </div>
          {items.length > 0 && (
            <p className="text-white/40 text-sm">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-24"
          >
            <ShoppingBag className="w-10 h-10 text-white/15 mx-auto mb-6" />
            <p className="font-serif text-2xl text-white/50 mb-2">Your bag is empty</p>
            <p className="text-white/30 text-sm mb-10">Add a scent to begin.</p>
            <Link
              to="/collections"
              className="inline-block bg-[#B59410] text-[#0A0A0A] px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
            >
              Shop the Collection
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex gap-6 py-7 border-b border-white/8"
                  >
                    <Link to={`/products/${item.product.handle}`} className="flex-shrink-0">
                      <div className="w-20 h-28 md:w-24 md:h-32 bg-[#0F0F0F] overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <Link to={`/products/${item.product.handle}`}>
                          <h3 className="font-serif text-xl text-white hover:text-[#B59410] transition-colors leading-tight">
                            {item.product.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromBag(item.product.id)}
                          className="flex-shrink-0 ml-4 text-white/25 hover:text-white/60 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-white/40 text-sm mb-1">
                        Matte Black Ceramic · {item.product.weight}
                      </p>
                      <p className="text-[#B59410] text-sm mb-5">
                        {new Intl.NumberFormat("en-GB", { style: "currency", currency: item.product.currency }).format(item.product.price)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/15">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-white/5 transition-colors"
                          >
                            <Minus className="w-3 h-3 text-white/60" />
                          </button>
                          <span className="w-8 text-center text-sm text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-white/5 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-white/60" />
                          </button>
                        </div>
                        <p className="font-serif text-white text-lg">
                          {new Intl.NumberFormat("en-GB", { style: "currency", currency: item.product.currency }).format(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-8">
                <Link
                  to="/collections"
                  className="text-[10px] tracking-[0.2em] uppercase text-white/35 hover:text-white/60 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-[#0F0F0F] border border-white/8 p-8 sticky top-28">
                <h2 className="font-serif text-2xl mb-7">Order Summary</h2>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>
                      Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                      {items.reduce((s, i) => s + i.quantity, 0) === 1 ? "item" : "items"})
                    </span>
                    <span className="text-white">
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span className="text-white/40 text-xs">Calculated at checkout</span>
                  </div>
                  {subtotal >= 50 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex justify-between text-[#B59410] text-xs"
                    >
                      <span>Free UK Delivery</span>
                      <span>✓</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between items-baseline border-t border-white/10 pt-5 mb-7">
                  <span className="text-white/60 text-sm uppercase tracking-widest text-[10px]">
                    Total
                  </span>
                  <span className="font-serif text-2xl text-white">
                    {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(subtotal)}
                  </span>
                </div>

                {checkoutError && (
                  <p className="text-red-400 text-xs mb-3 text-center leading-relaxed">
                    {checkoutError}
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#B59410] text-[#0A0A0A] py-4 text-[10px] tracking-[0.25em] font-semibold uppercase hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 mb-3 disabled:opacity-60"
                >
                  {isCheckingOut ? "Redirecting…" : "Proceed to Checkout"}
                  {!isCheckingOut && <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                {subtotal < 50 && (
                  <p className="text-center text-[10px] text-white/25 mt-3">
                    Add £{(50 - subtotal).toFixed(2)} more for free UK delivery
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
