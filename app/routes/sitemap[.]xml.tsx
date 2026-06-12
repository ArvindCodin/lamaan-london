import type { LoaderFunctionArgs } from "react-router";
import { STATIC_PRODUCTS } from "~/lib/products";
import { storefrontRequest } from "~/lib/shopify.server";

/**
 * /sitemap.xml
 *
 * Dynamically generated XML sitemap for La'maan London.
 * - Static URLs are always included.
 * - Product handles come from the Shopify Storefront API when available,
 *   falling back to STATIC_PRODUCTS so the sitemap is never empty.
 *
 * Optimised for:
 *   luxury candles UK · luxury scented candles UK · premium candles London
 *   British candle brand · luxury home fragrance UK · artisan candles UK
 *   hand poured candles UK · elegant candle gifts UK · luxury candle gifts London
 *   premium home fragrance London
 */

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

function buildSitemap(urls: SitemapURL[]): string {
  const entries = urls
    .map((u) => {
      const lines = [`  <url>`, `    <loc>${u.loc}</loc>`];
      if (u.lastmod) lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
      if (u.changefreq) lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority) lines.push(`    <priority>${u.priority}</priority>`);
      lines.push(`  </url>`);
      return lines.join("\n");
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    entries,
    `</urlset>`,
  ].join("\n");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticUrls: SitemapURL[] = [
    { loc: `${origin}/`,              changefreq: "weekly",  priority: "1.0", lastmod: today },
    { loc: `${origin}/collections`,   changefreq: "weekly",  priority: "0.9", lastmod: today },
    { loc: `${origin}/privacy-policy`,   changefreq: "yearly",  priority: "0.3" },
    { loc: `${origin}/returns-shipping`, changefreq: "yearly",  priority: "0.3" },
    { loc: `${origin}/terms-of-service`, changefreq: "yearly",  priority: "0.3" },
  ];

  // ── Product pages ─────────────────────────────────────────────────────────
  // Try Shopify Storefront API first; fall back to the static product list.
  let productHandles: string[] = [];

  try {
    const data = await storefrontRequest<{
      products: { nodes: Array<{ handle: string }> };
    }>(
      `#graphql
      query SitemapProducts {
        products(first: 50) {
          nodes { handle }
        }
      }`,
    );
    if (data?.products?.nodes?.length) {
      productHandles = data.products.nodes.map((p) => p.handle);
    }
  } catch {
    // Storefront API unavailable — fall through to static list
  }

  if (productHandles.length === 0) {
    productHandles = STATIC_PRODUCTS.map((p) => p.handle);
  }

  const productUrls: SitemapURL[] = productHandles.map((handle) => ({
    loc: `${origin}/products/${handle}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: today,
  }));

  // ── Build & return ─────────────────────────────────────────────────────────
  const xml = buildSitemap([...staticUrls, ...productUrls]);

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
