import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { motion } from "framer-motion";
import { MarqueeBanner } from "~/components/home/MarqueeBanner";
import {
  storefrontRequest,
  PRODUCTS_QUERY,
  type ShopifyProduct,
} from "~/lib/shopify.server";
import {
  STATIC_PRODUCTS,
  normalizeShopifyProduct,
  type NormalizedProduct,
} from "~/lib/products";

export const meta: MetaFunction = () => [
  { title: "Collections — La'maan London" },
  { name: "description", content: "Four signature candle scents. Matte black ceramic. Crafted in London." },
];

export async function loader(_: LoaderFunctionArgs) {
  try {
    const data = await storefrontRequest<{ products: { nodes: ShopifyProduct[] } }>(PRODUCTS_QUERY);
    if (data?.products?.nodes?.length) {
      return { products: data.products.nodes.map(normalizeShopifyProduct) };
    }
  } catch {
    // fall through
  }
  return { products: STATIC_PRODUCTS };
}

export default function Collections() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen"
    >
      <div className="pt-32 pb-12 px-8 md:px-16 border-b border-white/8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#B59410] text-[10px] tracking-[0.35em] uppercase mb-4">La'maan London</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4">
            All Signature Scents
          </h1>
          <p className="text-white/40 text-sm max-w-lg leading-relaxed">
            Four distinct fragrances, each designed to transform your space into a sanctuary of quiet luxury.
          </p>
        </div>
      </div>

      <MarqueeBanner />

      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {products.map((product: NormalizedProduct, i: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link
                to={`/products/${product.handle}`}
                className="block relative group overflow-hidden aspect-[4/5]"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <h3 className="font-serif text-white text-3xl md:text-4xl mb-2 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-[#B59410] text-sm tracking-widest mb-4">
                    {new Intl.NumberFormat("en-GB", { style: "currency", currency: product.currency }).format(product.price)}
                  </p>
                  <p className="text-white/50 text-xs tracking-wider max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="absolute top-6 right-6">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-white/60 border border-white/20 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Product
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
