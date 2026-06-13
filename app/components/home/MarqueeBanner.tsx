import { motion } from "framer-motion";

const items = [
  "WHITE MUSK",
  "LAVENDER",
  "ROSE",
  "BLACK OUD & VANILLA",
  "MATTE BLACK CERAMIC",
  "£35",
  "CRAFTED IN LONDON",
  "WHITE MUSK",
  "LAVENDER",
  "ROSE",
  "BLACK OUD & VANILLA",
  "MATTE BLACK CERAMIC",
  "£35",
  "CRAFTED IN LONDON",
];

export function MarqueeBanner() {
  return (
    <div className="bg-[#0A0A0A] border-y border-white/8 py-5 overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 24, ease: "linear" },
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center font-serif text-base md:text-lg text-[#B59410] uppercase tracking-[0.15em] px-7"
          >
            {item}
            <span className="ml-7 text-white/20">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
