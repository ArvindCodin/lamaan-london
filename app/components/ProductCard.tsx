import { motion } from "framer-motion";
import { Link } from "react-router";
import type { NormalizedProduct } from "~/lib/products";

export function ProductCard({ product }: { product: NormalizedProduct }) {
  return (
    <motion.div
      className="group relative flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/products/${product.handle}`}
        className="block relative aspect-[3/4] bg-[#0F0F0F] mb-6 overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="flex flex-col items-center text-center">
        <Link
          to={`/products/${product.handle}`}
          className="font-serif text-2xl text-white mb-2 hover:text-[#B59410] transition-colors"
        >
          {product.title}
        </Link>
        <p className="text-[#B09070] text-sm mb-4">{product.shortDescription}</p>
        <p className="text-white/80 font-sans text-sm tracking-wider">
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: product.currency,
          }).format(product.price)}
        </p>
      </div>
    </motion.div>
  );
}
