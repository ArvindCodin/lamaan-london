import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => [{ title: "Not Found — La'maan London" }];

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen flex items-center justify-center text-white"
    >
      <div className="text-center px-6">
        <p className="text-[#B59410] text-[10px] tracking-[0.35em] uppercase mb-4">404</p>
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Page Not Found</h1>
        <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block border border-white/20 text-white px-10 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Return Home
        </Link>
      </div>
    </motion.div>
  );
}
