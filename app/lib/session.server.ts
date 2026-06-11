import { createCookieSessionStorage } from "react-router";

const SECRET = process.env.SESSION_SECRET ?? "lamaan-london-hydrogen-secret-key";

export const cartSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__lmn_cart",
    secrets: [SECRET],
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  },
});

export async function getCartSession(request: Request) {
  const session = await cartSessionStorage.getSession(request.headers.get("Cookie"));
  return {
    getCartId: () => session.get("cartId") as string | undefined,
    setCartId: (cartId: string) => session.set("cartId", cartId),
    destroyCartId: () => session.unset("cartId"),
    commit: () => cartSessionStorage.commitSession(session),
  };
}

// ─── Customer session ────────────────────────────────────────────────────────

export const customerSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__lmn_customer",
    secrets: [SECRET],
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  },
});

export async function getCustomerSession(request: Request) {
  const session = await customerSessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  return {
    getAccessToken: () => session.get("accessToken") as string | undefined,
    setAccessToken: (token: string) => session.set("accessToken", token),
    destroy: () => customerSessionStorage.destroySession(session),
    commit: () => customerSessionStorage.commitSession(session),
  };
}
