import type { MetaFunction } from "react-router";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => [
  { title: "Terms of Service — La'maan London" },
];

export default function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen pt-32 pb-24 text-white"
    >
      <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-p:text-white/70 prose-headings:font-serif prose-headings:font-normal prose-h1:text-4xl prose-h2:text-2xl">
        <h1 className="mb-12">Terms of Service</h1>
        <p>Welcome to La'maan London. These Terms of Service govern your use of our website and your purchase of our products. By accessing our website or purchasing products from us, you agree to be bound by these terms.</p>
        <h2>1. Products and Pricing</h2>
        <p>All products are subject to availability. We reserve the right to limit the quantities of any products we offer, or to discontinue products at any time without notice. Prices for our products are subject to change without notice. All prices are listed in GBP (£).</p>
        <h2>2. Order Acceptance</h2>
        <p>We reserve the right to refuse or cancel any order you place with us. In the event that we make a change to or cancel an order, we will attempt to notify you by contacting the email and/or billing address provided at the time the order was made.</p>
        <h2>3. Intellectual Property</h2>
        <p>All content on this site, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of La'maan London and is protected by United Kingdom and international copyright laws. You may not reproduce, distribute, or use any content without our express written permission.</p>
        <h2>4. Product Use and Safety</h2>
        <p>Our candles are designed to burn safely when instructions are followed. Please refer to the safety label on the base of each candle. La'maan London is not responsible for any damage or injury resulting from the improper use of our products. Never leave a burning candle unattended.</p>
        <h2>5. Limitation of Liability</h2>
        <p>La'maan London shall not be liable for any direct, indirect, incidental, punitive, or consequential damages that result from your use of, or inability to use, our website or products.</p>
        <h2>6. Governing Law</h2>
        <p>These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of the United Kingdom.</p>
        <h2>7. Changes to Terms</h2>
        <p>We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes.</p>
      </div>
    </motion.div>
  );
}
