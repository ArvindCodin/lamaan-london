import { Link } from "react-router";

const logoUrl = "/images/image_1780773350168.webp";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#B59410]/30 pt-16 pb-8 px-8 md:px-16 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <img
              src={logoUrl}
              alt="La'maan London"
              className="mix-blend-lighten mb-6"
              style={{ width: "160px", height: "58px", objectFit: "cover", objectPosition: "center 65%" }}
            />
            <p className="font-serif text-white/50 text-base mb-6 max-w-xs leading-relaxed">
              Four signature scents. Matte black ceramic. Made in London.
            </p>
            <a
              href="https://instagram.com/lamaan.ldn"
              target="_blank"
              rel="noreferrer"
              className="text-[#B59410] text-[10px] tracking-[0.25em] uppercase hover:text-white transition-colors"
            >
              @lamaan.ldn on Instagram
            </a>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-white/60 hover:text-white transition-colors text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <a href="/#story" className="text-white/60 hover:text-white transition-colors text-sm">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy-policy" className="text-white/60 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-shipping" className="text-white/60 hover:text-white transition-colors text-sm">
                  Returns &amp; Shipping
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-white/60 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/8 gap-4">
          <p className="text-white/30 text-[11px] tracking-wider">
            © 2025 La'maan London. All rights reserved.
          </p>
          <div className="flex space-x-5 items-center text-white/25 text-[11px] font-medium tracking-widest">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
