import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("cart", "routes/cart.tsx"),
  route("collections", "routes/collections.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),
  route("product-video", "routes/product-video.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("returns-shipping", "routes/returns-shipping.tsx"),
  route("scent-quiz", "routes/scent-quiz.tsx"),
  route("terms-of-service", "routes/terms-of-service.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
