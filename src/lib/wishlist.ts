// ─── Wishlist Store ───────────────────────────────────────────────────────────
// localStorage-based wishlist. Import useWishlist() anywhere.

import { useState, useEffect, useCallback } from "react";

const KEY = "fno_wishlist";

export type WishlistItem = {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
};

function load(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: WishlistItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(load());
  }, []);

  const isWishlisted = useCallback(
    (productId: number) => items.some((i) => i.productId === productId),
    [items],
  );

  const toggle = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.productId === item.productId);
      const next = exists
        ? prev.filter((i) => i.productId !== item.productId)
        : [...prev, item];
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((productId: number) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      save(next);
      return next;
    });
  }, []);

  return { items, count: items.length, isWishlisted, toggle, remove };
}
