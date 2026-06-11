import { Link, useLocation } from "react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "~/context/CartContext";

const logoUrl = "/images/image_1780773350168.webp";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="transition-all duration-300 bg-[#0A0A0A]">
        <div className="px-8 md:px-12 flex items-center h-16 md:h-20">
          <nav className="hidden md:flex items-center space-x-8 w-1/3">
            <Link
              to="/collections"
              className="text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
            >
              Collections
            </Link>
            <a
              href="/#story"
              className="text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
            >
              About
            </a>
          </nav>

          <button
            className="md:hidden text-white mr-auto"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <img
                src={logoUrl}
                alt="La'maan London"
                className="mix-blend-lighten"
                style={{ width: "auto", height: "48px", objectFit: "contain" }}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-5 ml-auto">
            <button className="text-white/70 hover:text-white transition-colors hidden md:block">
              <Search className="w-4 h-4" />
            </button>
            <Link
              to="/cart"
              className="text-white/70 hover:text-white transition-colors relative flex items-center"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#B59410] text-[#0A0A0A] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col p-8 md:hidden">
          <div className="flex justify-between items-center mb-16">
            <img
              src={logoUrl}
              alt="La'maan London"
              style={{ width: "160px", height: "auto", objectFit: "contain" }}
            />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col space-y-8">
            <Link
              to="/"
              className="text-3xl font-serif text-white hover:text-[#B59410] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="text-3xl font-serif text-white hover:text-[#B59410] transition-colors"
            >
              Collections
            </Link>
            <a
              href="/#story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-serif text-white hover:text-[#B59410] transition-colors"
            >
              About
            </a>
            <Link
              to="/cart"
              className="text-3xl font-serif text-white hover:text-[#B59410] transition-colors"
            >
              Bag {totalCount > 0 ? `(${totalCount})` : ""}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
