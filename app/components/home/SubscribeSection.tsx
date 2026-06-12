import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[#080808] py-24 md:py-32 px-8 text-center border-t border-white/5">
      <div className="max-w-xl mx-auto">
        <motion.p
          className="text-[#B59410] tracking-[0.4em] text-[10px] uppercase mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Stay Close
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Be First to Know
        </motion.h2>

        <motion.p
          className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          New collections, limited editions, and stories from the studio — delivered to your inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {submitted ? (
            <div className="py-4">
              <p className="text-[#B59410] font-serif text-lg">Thank you. Welcome to La'maan.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center border-b border-white/20 max-w-sm mx-auto group focus-within:border-white/50 transition-colors duration-300"
            >
              <svg className="w-4 h-4 text-white/25 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder-white/30 text-sm py-4 outline-none"
                required
              />
              <button
                type="submit"
                className="text-white/30 hover:text-[#B59410] transition-colors duration-300 ml-3 flex-shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-white/20 text-[10px] tracking-wider uppercase mt-6">
            By subscribing you agree to our{" "}
            <Link
              to="/privacy-policy"
              className="hover:text-white/40 transition-colors border-b border-white/15"
            >
              Privacy Policy
            </Link>
            . No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
