import { motion } from "framer-motion";
import { Link } from "react-router";

export function PriceSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] min-h-[85vh] flex items-end">
      <div className="absolute inset-0">
        <img
          src="/images/image_1780773361753.webp"
          alt="La'maan London candle vessel"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/50 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/30" />
      </div>

      <div className="relative z-10 px-10 md:px-20 pb-16 md:pb-24 pt-32 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#B59410] tracking-[0.4em] text-[10px] uppercase mb-6">The Vessel</p>

          <div className="flex items-start leading-none mb-6">
            <span className="font-serif text-2xl text-[#B59410] mt-4 mr-1">£</span>
            <span className="font-serif text-[110px] md:text-[140px] text-[#B59410] leading-none tracking-tight">
              35
            </span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-white mb-5 leading-snug">
            The price of a perfect evening.
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm mb-10">
            Every La'maan candle is poured into a hand-finished matte black ceramic vessel. The kind you keep long after the wax is gone.
          </p>
          <Link
            to="/collections"
            className="inline-block bg-[#B59410] text-[#0A0A0A] px-9 py-4 text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
