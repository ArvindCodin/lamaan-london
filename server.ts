import { createRequestHandler } from "@shopify/hydrogen";
import * as serverBuild from "virtual:react-router/server-build";

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
    const handleRequest = createRequestHandler({
      build: serverBuild,
      mode: "production",
      getLoadContext: () => ({ env }),
    });
    return handleRequest(request);
  },
};
