import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 6 6 9 6 12a6 6 0 0 0 12 0c0-3-2-6-6-10z"/>
        <path d="M12 12v4"/>
      </svg>
    ),
    title: "Hand-Finished Vessels",
    description: "Our signature matte black ceramic is designed to anchor a room. Heavy, tactile, and uncompromisingly minimal.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/>
        <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7"/>
        <path d="M8 9c.5-1.5 2-3 4-3"/>
        <path d="M7 15c-.5 1-1 2-1 3"/>
        <path d="M17 15c.5 1 1 2 1 3"/>
      </svg>
    ),
    title: "Botanically Blended",
    description: "We use pure essential oils, absolutes, and fine fragrance synthetics for a clean, expansive scent throw that lingers.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0 0 16"/>
        <path d="M12 2a8 8 0 0 1 0 16"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <path d="M12 11v5"/>
      </svg>
    ),
    title: "London Crafted",
    description: "Conceived in Mayfair, perfected in our studios. Every scent profile is an olfactory portrait of the city's quietest, most luxurious corners.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#F5F0E8] py-20 md:py-28 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <div className="flex justify-center mb-6 text-[#B59410]">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-[#0A0A0A] mb-4 leading-snug">
                {feature.title}
              </h3>
              <p className="text-[#5a4a3a]/70 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
