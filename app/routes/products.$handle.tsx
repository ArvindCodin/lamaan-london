import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check, ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  storefrontRequest,
  PRODUCT_QUERY,
  type ShopifyProduct,
} from "~/lib/shopify.server";
import {
  STATIC_PRODUCTS,
  normalizeShopifyProduct,
  type NormalizedProduct,
} from "~/lib/products";
import { useCart } from "~/context/CartContext";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.product ? `${data.product.title} — La'maan London` : "La'maan London" },
  { name: "description", content: data?.product?.description ?? "Luxury candle by La'maan London." },
];

export async function loader({ params }: LoaderFunctionArgs) {
  const handle = params.handle;
  if (!handle) throw new Response("Not Found", { status: 404 });

  try {
    const data = await storefrontRequest<{ product: ShopifyProduct | null }>(
      PRODUCT_QUERY,
      { handle },
    );
    if (data?.product) {
      const allData = await storefrontRequest<{ products: { nodes: ShopifyProduct[] } }>(
        `#graphql
          query AllProducts { products(first: 20) { nodes { id handle title description featuredImage { url altText } images(first:1) { nodes { url altText } } priceRange { minVariantPrice { amount currencyCode } } variants(first: 1) { nodes { id title availableForSale price { amount currencyCode } } } metafields(identifiers: [{ namespace: "custom", key: "short_description" }]) { key value } } } }
        `,
      );
      const allProducts = allData?.products?.nodes?.map(normalizeShopifyProduct) ?? STATIC_PRODUCTS;
      return { product: normalizeShopifyProduct(data.product), allProducts };
    }
  } catch {
    // fall through to static
  }

  const product = STATIC_PRODUCTS.find((p) => p.handle === handle);
  if (!product) throw new Response("Not Found", { status: 404 });
  return { product, allProducts: STATIC_PRODUCTS };
}

export default function ProductDetail() {
  const { product, allProducts } = useLoaderData<typeof loader>();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const { addToBag } = useCart();

  const others = allProducts.filter((p: NormalizedProduct) => p.id !== product.id);
  const images = product.images.length > 0 ? product.images : ["/images/white-musk.webp"];

  const handleAdd = () => {
    addToBag(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const prevImg = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % images.length);

  return (
    <motion.div
      key={product.handle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen"
    >
      <div className="pt-24 md:pt-28 px-6 md:px-12">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-[10px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3 h-3" />
          All Scents
        </Link>
      </div>

      <div className="px-6 md:px-12 py-10 md:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#0F0F0F] group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={`${product.title} — view ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#0A0A0A]/70 border border-white/10 text-white/60 hover:text-white hover:bg-[#0A0A0A]/90 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#0A0A0A]/70 border border-white/10 text-white/60 hover:text-white hover:bg-[#0A0A0A]/90 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 left-6 bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 px-4 py-3">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#B59410] mb-0.5">
                  La'maan London
                </p>
                <p className="font-serif text-white text-sm">{product.title}</p>
              </div>

              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-[#0A0A0A]/70 border border-white/10 px-2.5 py-1">
                  <span className="text-[10px] text-white/50 tracking-widest">
                    {activeImg + 1} / {images.length}
                  </span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-1 aspect-square overflow-hidden transition-all duration-300 ${
                      i === activeImg
                        ? "ring-1 ring-[#B59410] opacity-100"
                        : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.title} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:sticky lg:top-28 flex flex-col"
          >
            <div className="mb-8 pb-8 border-b border-white/10">
              <p className="text-[#B59410] text-[10px] tracking-[0.35em] uppercase mb-4">
                Signature Scent
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl text-white">
                  {new Intl.NumberFormat("en-GB", { style: "currency", currency: product.currency }).format(product.price)}
                </span>
                <span className="text-white/40 text-sm">
                  · {product.weight} · {product.burnTime} burn
                </span>
              </div>
            </div>

            <p className="font-serif text-[#B09070] text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8 bg-[#111111] p-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
                Fragrance Notes
              </p>
              <div className="space-y-4">
                {[
                  { label: "Top", notes: product.fragranceNotes.top, delay: "4s" },
                  { label: "Heart", notes: product.fragranceNotes.heart, delay: "2h" },
                  { label: "Base", notes: product.fragranceNotes.base, delay: "6h+" },
                ].map((tier) => (
                  <div key={tier.label} className="flex items-start gap-4">
                    <div className="flex flex-col items-center w-12 flex-shrink-0">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#B59410] block mb-0.5">
                        {tier.label}
                      </span>
                      <span className="text-[9px] text-white/25 block">{tier.delay}</span>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-white/70 text-sm leading-relaxed">{tier.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-8 mb-8 text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-8">
              <div>
                <span className="block text-white/25 mb-1">Vessel</span>
                Matte Black Ceramic
              </div>
              <div>
                <span className="block text-white/25 mb-1">Burn Time</span>
                {product.burnTime}
              </div>
              <div>
                <span className="block text-white/25 mb-1">Weight</span>
                {product.weight}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center border border-white/20 bg-transparent text-white w-full sm:w-32 flex-shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-4 hover:bg-white/5 transition-colors"
                  disabled={added}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-4 hover:bg-white/5 transition-colors"
                  disabled={added}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 ${
                  added
                    ? "bg-[#B59410] text-[#0A0A0A]"
                    : "bg-white text-[#0A0A0A] hover:bg-[#B59410] hover:text-white"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Added to Bag
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <AnimatePresence>
              {added && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Link
                    to="/cart"
                    className="block text-center text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors py-2 border border-white/10 hover:border-white/30"
                  >
                    View Bag →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[10px] tracking-wider text-white/25 uppercase text-center mt-4">
              Free UK delivery on orders over £50
            </p>
          </motion.div>
        </div>
      </div>

      {others.length > 0 && (
        <div className="border-t border-white/8 px-6 md:px-12 py-12 max-w-7xl mx-auto">
          <p className="text-[#B59410] text-[10px] tracking-[0.3em] uppercase mb-8 text-center">
            Other Scents
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {others.map((p: NormalizedProduct, i: number) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/products/${p.handle}`}
                  className="block group relative overflow-hidden aspect-[3/4]"
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="font-serif text-white text-base leading-tight">{p.title}</p>
                    <p className="text-[#B59410] text-xs mt-0.5">
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: p.currency }).format(p.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
