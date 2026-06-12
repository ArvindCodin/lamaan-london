import { createContext, useContext, useState, ReactNode } from "react";
import type { NormalizedProduct } from "~/lib/products";
import { useToast } from "~/hooks/use-toast";

export interface CartItem {
  product: NormalizedProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToBag: (product: NormalizedProduct, quantity: number) => void;
  removeFromBag: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToBag = (product: NormalizedProduct, quantity: number) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { product, quantity }];
    });
    toast({
      title: "Added to Bag",
      description: `${quantity}× ${product.title} added to your bag.`,
    });
  };

  const removeFromBag = (productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(productId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, addToBag, removeFromBag, updateQuantity, totalCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
