const STOREFRONT_API_VERSION = "2026-04";
const FETCH_TIMEOUT_MS = 10_000;

function getShopifyConfig(): { shopDomain: string; storefrontAccessToken: string } | null {
  const shopDomain = process.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!shopDomain || !storefrontAccessToken) return null;
  return { shopDomain, storefrontAccessToken };
}

export async function storefrontRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  const config = getShopifyConfig();
  if (!config) return null;

  try {
    const resp = await fetch(
      `https://${config.shopDomain}/api/${STOREFRONT_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": config.storefrontAccessToken,
        },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    );
    const json = await resp.json() as { data?: T; errors?: unknown[] };
    if (json.errors?.length) return null;
    return json.data ?? null;
  } catch {
    return null;
  }
}

// ─── Product Types ─────────────────────────────────────────────────────────

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  images: { nodes: Array<{ url: string; altText: string | null }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: Array<{ id: string; title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean }> };
  metafields: Array<{ key: string; value: string } | null>;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      cost: { totalAmount: { amount: string; currencyCode: string }; amountPerQuantity: { amount: string; currencyCode: string } };
      merchandise: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        product: { handle: string; title: string; featuredImage: { url: string; altText: string | null } | null };
      };
    }>;
  };
};

// ─── Queries & Mutations ────────────────────────────────────────────────────

export const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 20) {
      nodes {
        id
        handle
        title
        description
        featuredImage { url altText }
        images(first: 10) { nodes { url altText } }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 10) { nodes { id title availableForSale price { amount currencyCode } } }
        metafields(identifiers: [
          { namespace: "custom", key: "fragrance_top" }
          { namespace: "custom", key: "fragrance_heart" }
          { namespace: "custom", key: "fragrance_base" }
          { namespace: "custom", key: "short_description" }
          { namespace: "custom", key: "burn_time" }
          { namespace: "custom", key: "weight" }
        ]) { key value }
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      featuredImage { url altText }
      images(first: 10) { nodes { url altText } }
      priceRange { minVariantPrice { amount currencyCode } }
      variants(first: 10) { nodes { id title availableForSale price { amount currencyCode } } }
      metafields(identifiers: [
        { namespace: "custom", key: "fragrance_top" }
        { namespace: "custom", key: "fragrance_heart" }
        { namespace: "custom", key: "fragrance_base" }
        { namespace: "custom", key: "short_description" }
        { namespace: "custom", key: "burn_time" }
        { namespace: "custom", key: "weight" }
      ]) { key value }
    }
  }
`;

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
  lines(first: 50) {
    nodes {
      id
      quantity
      cost { totalAmount { amount currencyCode } amountPerQuantity { amount currencyCode } }
      merchandise {
        ... on ProductVariant {
          id title price { amount currencyCode }
          product { handle title featuredImage { url altText } }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { ${CART_FRAGMENT} }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FRAGMENT} }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `#graphql
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FRAGMENT} }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `#graphql
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FRAGMENT} }
      userErrors { field message }
    }
  }
`;

export const CART_QUERY = `#graphql
  query Cart($id: ID!) {
    cart(id: $id) { ${CART_FRAGMENT} }
  }
`;

// ─── Customer Types & Mutations ─────────────────────────────────────────────

export type ShopifyCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orders: {
    nodes: Array<{
      id: string;
      orderNumber: number;
      processedAt: string;
      financialStatus: string;
      fulfillmentStatus: string;
      totalPriceV2: { amount: string; currencyCode: string };
      lineItems: {
        nodes: Array<{
          title: string;
          quantity: number;
          variant: {
            price: { amount: string; currencyCode: string };
            image: { url: string; altText: string | null } | null;
          } | null;
        }>;
      };
    }>;
  };
};

export const CUSTOMER_LOGIN_MUTATION = `#graphql
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

export const CUSTOMER_LOGOUT_MUTATION = `#graphql
  mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

export const CUSTOMER_QUERY = `#graphql
  query Customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id firstName lastName email
      orders(first: 10, reverse: true) {
        nodes {
          id orderNumber processedAt financialStatus fulfillmentStatus
          totalPriceV2 { amount currencyCode }
          lineItems(first: 5) {
            nodes {
              title quantity
              variant { price { amount currencyCode } image { url altText } }
            }
          }
        }
      }
    }
  }
`;
