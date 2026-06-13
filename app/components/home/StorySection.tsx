import { motion } from "framer-motion";
import { Link } from "react-router";

export function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#080808]">
      {/* Background image with rich depth */}
      <div className="absolute inset-0">
        <img
          src="/images/london-interior.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.22) saturate(0.75)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-transparent to-[#050505]/90" />
        <div className="absolute inset-0 bg-[#0A0A0A]/45" />
        {/* Subtle gold vignette from center */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(181,148,16,0.05) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Candle accent images — left and right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src="/images/candle-tumbler-nobg.webp"
          alt=""
          className="absolute left-0 bottom-0 w-[22vw] max-w-[200px] object-contain opacity-0"
          style={{ filter: "drop-shadow(0 0 40px rgba(181,148,16,0.15))" }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 0.12, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />
        <motion.img
          src="/images/candle-39mm-nobg.webp"
          alt=""
          className="absolute right-0 bottom-0 w-[18vw] max-w-[160px] object-contain"
          style={{ filter: "drop-shadow(0 0 40px rgba(181,148,16,0.15))" }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />
      </div>

      <div className="relative z-10 py-28 md:py-44 px-8 md:px-16 text-center">
        {/* Gold rule top */}
        <motion.div
          className="mx-auto mb-8"
          style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #B59410, transparent)" }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="text-[#B59410] tracking-[0.4em] text-[10px] uppercase mb-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          La'maan London
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider leading-tight mb-2">
            Scents of
          </h2>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#B59410] italic leading-tight mb-10">
            London
          </h2>
        </motion.div>

        <motion.p
          className="text-white/50 text-sm md:text-base max-w-md mx-auto leading-loose mb-4 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          A candle is not a product. It is the first impression of a room, the memory of a moment, the silent language of hospitality.
        </motion.p>

        <motion.p
          className="text-white/30 text-xs md:text-sm max-w-xs mx-auto leading-relaxed mb-12 tracking-wider italic font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          We craft for those who understand the difference.
        </motion.p>

        {/* Three qualities */}
        <motion.div
          className="flex items-center justify-center gap-8 md:gap-14 mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {["Matte Black Ceramic", "45 Hour Burn", "London Crafted"].map((q, i) => (
            <div key={i} className="text-center">
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/25">{q}</p>
            </div>
          ))}
        </motion.div>

        {/* Gold rule */}
        <motion.div
          className="mx-auto mb-10"
          style={{ width: 32, height: 1, backgroundColor: "#B59410", opacity: 0.35 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/collections"
            className="text-[#B59410] text-[11px] tracking-[0.3em] uppercase border-b border-[#B59410]/35 pb-0.5 hover:border-[#B59410] transition-colors duration-300"
          >
            Discover the Collection →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
