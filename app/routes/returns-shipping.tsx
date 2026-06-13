import type { MetaFunction } from "react-router";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => [
  { title: "Returns & Shipping — La'maan London" },
];

export default function ReturnsShipping() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen pt-32 pb-24 text-white"
    >
      <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-p:text-white/70 prose-headings:font-serif prose-headings:font-normal prose-h1:text-4xl prose-h2:text-2xl">
        <h1 className="mb-12">Returns &amp; Shipping</h1>
        <h2>UK Delivery</h2>
        <p>We aim to dispatch all orders within 1-2 business days.</p>
        <ul>
          <li><strong>Standard Delivery:</strong> £3.95 (3-5 business days)</li>
          <li><strong>Free Delivery:</strong> On all UK orders over £50</li>
        </ul>
        <h2>International Shipping</h2>
        <p>We ship globally. International shipping rates are calculated at checkout based on the destination and total weight of the order. Please note that customers are responsible for any customs duties or taxes applicable in their region.</p>
        <h2>Returns</h2>
        <p>We accept returns within a 14-day return window from the date you receive your order. To be eligible for a return, the candle must be unused, unlit, and in its original packaging. We cannot accept returns on products that have been used or damaged after delivery.</p>
        <h2>How to Return</h2>
        <p>To initiate a return, please contact our customer service team at returns@lamaan.ldn with your order number. We will provide you with a return authorization and instructions on how to send your item back to us. Customers are responsible for return shipping costs unless the item arrived damaged or incorrect.</p>
        <h2>Refunds</h2>
        <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed within 5-7 business days to your original method of payment.</p>
      </div>
    </motion.div>
  );
}
