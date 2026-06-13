import { createRequestHandler } from "@shopify/remix-oxygen";
import * as build from "virtual:react-router/server-build";

export interface Env {
  PUBLIC_SHOPIFY_STORE_DOMAIN: string;
  PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: string;
  SESSION_SECRET: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _executionContext: ExecutionContext,
  ): Promise<Response> {
    if (env.PUBLIC_SHOPIFY_STORE_DOMAIN) {
      process.env.PUBLIC_SHOPIFY_STORE_DOMAIN = env.PUBLIC_SHOPIFY_STORE_DOMAIN;
    }
    if (env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      process.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN =
        env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    }
    if (env.SESSION_SECRET) {
      process.env.SESSION_SECRET = env.SESSION_SECRET;
    }

    const handleRequest = createRequestHandler({ build });
    return handleRequest(request);
  },
};
