import type { LoaderFunctionArgs } from "react-router";

/**
 * /robots.txt
 *
 * Served as a loader response so it works correctly on Oxygen regardless
 * of whether static file serving is active. Mirrors public/robots.txt.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const host = new URL(request.url).origin;

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Block non-public paths",
    "Disallow: /cart",
    "Disallow: /account",
    "Disallow: /account/",
    "Disallow: /api/",
    "",
    `# Sitemap`,
    `Sitemap: ${host}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
