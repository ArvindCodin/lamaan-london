import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { motion } from "framer-motion";
import { Hero } from "~/components/home/Hero";
import { MarqueeBanner } from "~/components/home/MarqueeBanner";
import { StorySection } from "~/components/home/StorySection";
import { PriceSection } from "~/components/home/PriceSection";
import { FeaturesSection } from "~/components/home/FeaturesSection";
import { PhilosophySection } from "~/components/home/PhilosophySection";
import { SubscribeSection } from "~/components/home/SubscribeSection";
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
  { title: "La'maan London — Luxury Candles" },
  {
    name: "description",
    content:
      "Four signature scents. Matte black ceramic. Crafted in London. Discover quiet luxury.",
  },
];

export async function loader(_: LoaderFunctionArgs) {
  try {
    const data = await storefrontRequest<{ products: { nodes: ShopifyProduct[] } }>(
      PRODUCTS_QUERY,
    );
    if (data?.products?.nodes?.length) {
      return { products: data.products.nodes.map(normalizeShopifyProduct) };
    }
  } catch {
    // fall through to static
  }
  return { products: STATIC_PRODUCTS };
}

export default function Home() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <MarqueeBanner />

      <section className="bg-[#0A0A0A] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#B59410] text-[10px] tracking-[0.35em] uppercase mb-3">
              The Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
              Four Scents. One London.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {products.map((product: NormalizedProduct, i: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-7 md:p-9">
                    <h3 className="font-serif text-white text-2xl md:text-3xl mb-1.5 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-[#B59410] text-sm tracking-wider">
                      {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: product.currency,
                      }).format(product.price)}
                    </p>
                  </div>
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 border border-white/30 px-3 py-1.5">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              to="/collections"
              className="inline-block border border-white/20 text-white px-10 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300"
            >
              View All Scents
            </Link>
          </motion.div>
        </div>
      </section>

      <StorySection />
      <PriceSection />
      <FeaturesSection />
      <PhilosophySection />
      <SubscribeSection />
    </motion.div>
  );
}
