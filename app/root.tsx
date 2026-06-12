import type { LinksFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { CartProvider } from "~/context/CartContext";
import { Toaster } from "~/components/ui/toaster";
import { AnnouncementBar } from "~/components/AnnouncementBar";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { BackToTop } from "~/components/BackToTop";
import styles from "~/styles/app.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap",
  },
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export default function App() {
  const location = useLocation();
  const isFilmRoute = location.pathname === "/product-video";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0A0A0A]">
        <CartProvider>
          {isFilmRoute ? (
            <>
              <Outlet />
              <Toaster />
            </>
          ) : (
            <div className="flex flex-col min-h-screen bg-[#0A0A0A]">
              <div className="fixed top-0 left-0 right-0 z-50">
                <AnnouncementBar />
                <Navbar />
              </div>
              <main className="flex-grow flex flex-col">
                <Outlet />
              </main>
              <Footer />
              <BackToTop />
              <Toaster />
            </div>
          )}
        </CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0A0A0A] text-white flex items-center justify-center min-h-screen">
        <div className="text-center px-6">
          <p className="text-[#B59410] text-[10px] tracking-[0.35em] uppercase mb-4">Error</p>
          <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
          <a href="/" className="text-white/50 hover:text-white text-sm transition-colors">
            Return home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
