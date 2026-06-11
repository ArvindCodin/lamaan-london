import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const messages = [
  "FREE UK DELIVERY ON ORDERS OVER £50",
  "NEW: BLACK OUD & VANILLA IS BACK IN STOCK",
  "CRAFTED IN LONDON",
  "FOUR SIGNATURE SCENTS",
  "FREE UK DELIVERY ON ORDERS OVER £50",
  "NEW: BLACK OUD & VANILLA IS BACK IN STOCK",
  "CRAFTED IN LONDON",
  "FOUR SIGNATURE SCENTS",
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden bg-[#0A0A0A]"
        >
          <div className="relative h-9 flex items-center overflow-hidden">
            <div className="flex overflow-hidden whitespace-nowrap w-full">
              <motion.div
                className="flex shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
                }}
              >
                {[...messages, ...messages].map((msg, i) => (
                  <span
                    key={i}
                    className="flex items-center text-[10px] tracking-[0.25em] uppercase text-[#B59410] px-6"
                  >
                    {msg}
                    <span className="ml-6 text-[#B59410]/40">·</span>
                  </span>
                ))}
              </motion.div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors z-10 flex-shrink-0"
              aria-label="Close announcement"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {/* Thin gold divider between announcement bar and navigation */}
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent 0%, #B59410 20%, #B59410 80%, transparent 100%)", opacity: 0.28 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
