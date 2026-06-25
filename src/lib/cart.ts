// ─── Cart Store ───────────────────────────────────────────────────────────────
// Pure localStorage-based cart. No backend needed.
// Import useCart() in any component to read/write the cart.

import { useState, useEffect, useCallback } from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;        // "Free Size" for accessories
  quantity: number;
  productUrl: string;  // used in WhatsApp message
};

const STORAGE_KEY = "fno_cart";
const WHATSAPP_NUMBER = "919322520682"; // 91 + number, no spaces or dashes

// ── helpers ──────────────────────────────────────────────────────────────────

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ── hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // hydrate from localStorage on mount (avoids SSR mismatch)
  useEffect(() => {
    setItems(readCart());
  }, []);

  const sync = useCallback((next: CartItem[]) => {
    writeCart(next);
    setItems(next);
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === item.productId && i.size === item.size,
        );
        const next = existing
          ? prev.map((i) =>
              i.productId === item.productId && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            )
          : [...prev, { ...item, quantity: 1 }];
        writeCart(next);
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback(
    (productId: number, size: string) => {
      setItems((prev) => {
        const next = prev.filter(
          (i) => !(i.productId === productId && i.size === size),
        );
        writeCart(next);
        return next;
      });
    },
    [],
  );

  const updateQty = useCallback(
    (productId: number, size: string, quantity: number) => {
      setItems((prev) => {
        const next =
          quantity < 1
            ? prev.filter(
                (i) => !(i.productId === productId && i.size === size),
              )
            : prev.map((i) =>
                i.productId === productId && i.size === size
                  ? { ...i, quantity }
                  : i,
              );
        writeCart(next);
        return next;
      });
    },
    [],
  );

  const clearCart = useCallback(() => sync([]), [sync]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQty, clearCart, total, count };
}

// ── WhatsApp checkout builder ─────────────────────────────────────────────────

export function buildWhatsAppUrl(items: CartItem[], promoCode?: string, discount?: number): string {
  if (items.length === 0) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const lines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name}${item.size !== "Free Size" ? ` (Size: ${item.size})` : ""} × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}\n   🔗 ${item.productUrl}`,
    )
    .join("\n\n");

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const finalTotal = discount ? subtotal - discount : subtotal;

  const promoLine = promoCode && discount
    ? `\n🏷️ *Promo Code: ${promoCode}* → -₹${discount.toLocaleString("en-IN")}`
    : promoCode && !discount
    ? `\n🏷️ *Promo Code: ${promoCode}* (Free Accessory — please apply in store)`
    : "";

  const message =
    `Hi FNO Jaripatka! 👋 I'd like to place an order:\n\n` +
    `${lines}\n\n` +
    `💰 Subtotal: ₹${subtotal.toLocaleString("en-IN")}` +
    promoLine +
    `\n💰 *Total: ₹${finalTotal.toLocaleString("en-IN")}*\n\n` +
    `Please confirm availability and share payment details. Thank you! 🙏`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── promo code ────────────────────────────────────────────────────────────────

export const PROMO_KEY = "fno_promo";

export type PromoData = {
  code: string;
  offer: string;
  used: boolean;
};

export function getStoredPromo(): PromoData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROMO_KEY);
    return raw ? (JSON.parse(raw) as PromoData) : null;
  } catch {
    return null;
  }
}

/** Returns discount amount in rupees given a cart total, or null if invalid code */
export function applyPromo(code: string, total: number): { discount: number; offer: string } | null {
  const promo = getStoredPromo();
  if (!promo || promo.used) return null;
  if (promo.code.trim().toUpperCase() !== code.trim().toUpperCase()) return null;

  const offer = promo.offer;
  let discount = 0;

  if (offer.includes("10%"))        discount = Math.round(total * 0.10);
  else if (offer.includes("5%"))    discount = Math.round(total * 0.05);
  else if (offer.includes("₹100"))  discount = 100;
  else if (offer.includes("₹50"))   discount = 50;
  else if (offer.includes("Free Accessory")) discount = 0; // handled manually in store

  return { discount, offer };
}

export function markPromoUsed() {
  const promo = getStoredPromo();
  if (!promo) return;
  localStorage.setItem(PROMO_KEY, JSON.stringify({ ...promo, used: true }));
}

// ── size helpers ──────────────────────────────────────────────────────────────

export const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof CLOTHING_SIZES)[number];

/** Categories that need a size selector */
export const SIZED_CATEGORIES = ["dresses", "tops", "co-ords", "skirts", "new-arrivals"];
