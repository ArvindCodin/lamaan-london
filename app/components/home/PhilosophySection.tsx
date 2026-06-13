import { motion } from "framer-motion";

export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] min-h-[65vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/images/philosophy-flame.webp"
          alt=""
          className="w-full h-full object-cover object-center opacity-55 scale-105"
          style={{ filter: "brightness(0.45) contrast(1.15) saturate(0.9)" }}
        />
        <div className="absolute inset-0 bg-[#050505]/65" />
        {/* Warm gold glow from center */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 45%, rgba(181,148,16,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/70" />
      </div>

      <div className="relative z-10 px-8 py-28 md:py-36 text-center max-w-2xl mx-auto">
        <motion.p
          className="text-[#B59410] tracking-[0.4em] text-[10px] uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Philosophy
        </motion.p>

        <motion.div
          className="mx-auto mb-10"
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #B59410, transparent)", opacity: 0.5 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        />

        <motion.blockquote
          className="font-serif text-xl md:text-2xl lg:text-3xl text-white/85 italic leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          "A candle is not purchased.
          <br />
          <span className="text-[#B59410]">It is chosen.</span>
          <br />
          Like a perfume, it speaks before you do."
        </motion.blockquote>

        <motion.div
          className="mx-auto mb-6"
          style={{ width: 24, height: 1, backgroundColor: "#B59410", opacity: 0.3 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />

        <motion.p
          className="text-white/25 tracking-[0.3em] text-[10px] uppercase font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          — La'maan London, Crafted in Mayfair
        </motion.p>
      </div>
    </section>
  );
}
