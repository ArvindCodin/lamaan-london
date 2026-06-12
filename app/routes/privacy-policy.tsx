import type { MetaFunction } from "react-router";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — La'maan London" },
];

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] min-h-screen pt-32 pb-24 text-white"
    >
      <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-p:text-white/70 prose-headings:font-serif prose-headings:font-normal prose-h1:text-4xl prose-h2:text-2xl prose-a:text-[#B59410] hover:prose-a:text-white prose-a:transition-colors">
        <h1 className="mb-2">Privacy Policy</h1>
        <p className="text-sm text-white/50 uppercase tracking-widest mb-12">Last updated: January 2025</p>
        <h2>Information We Collect</h2>
        <p>At La'maan London, we collect information that you provide directly to us when you make a purchase, create an account, subscribe to our newsletter, or communicate with us. This information may include your name, email address, shipping and billing address, phone number, and payment details.</p>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders, including sending order confirmations and tracking information.</li>
          <li>Communicate with you about products, services, offers, and events.</li>
          <li>Improve and optimize our website and customer experience.</li>
          <li>Detect and prevent fraud and abuse.</li>
        </ul>
        <h2>Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, delivering orders, and communicating with you, provided they agree to keep your information confidential.</p>
        <h2>Cookies</h2>
        <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our audience comes from. You can manage your cookie preferences through your browser settings.</p>
        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to access, correct, update, or delete your personal information. If you wish to exercise any of these rights, please contact us using the details provided below.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@lamaan.ldn or write to us at our London address.</p>
      </div>
    </motion.div>
  );
}
