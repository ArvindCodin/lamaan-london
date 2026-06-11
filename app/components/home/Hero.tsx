import { motion } from "framer-motion";
import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.webp"
          alt="La'maan London luxury candle"
          className="w-full h-full object-cover opacity-85 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
        <div className="absolute inset-0 bg-[#0A0A0A]/25" />
      </div>

      <div className="relative z-10 text-center px-4 w-full pb-14 md:pb-20">
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Light before
        </motion.h1>
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#B59410] leading-tight italic mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          they arrive.
        </motion.h1>
        <motion.p
          className="text-white/70 font-sans tracking-[0.2em] uppercase text-[11px] max-w-xs mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Luxury black matte ceramic vessels.<br />Intimate, minimal, and impossibly elegant.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link
            to="/collections"
            className="inline-block bg-[#B59410] text-[#0A0A0A] px-9 py-4 text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-[#D4AF37] transition-colors duration-300 min-w-[210px] text-center"
          >
            Shop the Collection
          </Link>
          <Link
            to="/scent-quiz"
            className="inline-block border border-white/35 text-white px-9 py-4 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 min-w-[210px] text-center"
          >
            Find Your Scent
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8"
        >
          <Link
            to="/product-video"
            className="inline-block border-b border-white/35 text-white pb-1 text-[10px] tracking-[0.25em] uppercase hover:text-[#B59410] hover:border-[#B59410] transition-colors duration-300"
          >
            Watch the Film
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
