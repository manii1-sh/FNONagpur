// Central product catalogue for FNO Jaripatka
// Add / remove products here — the category pages pick them up automatically.

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: CategorySlug;
  image: string;
  badge?: string;
  description?: string;
  hasSizes?: boolean;
};

export const CATEGORY_SLUGS = [
  "dresses",
  "tops",
  "shirts",
  "accessories",
  "bags",
  "new-arrivals",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  "dresses": "Dresses",
  "tops": "Tops",
  "shirts": "Shirts",
  "accessories": "Accessories",
  "bags": "Bags",
  "new-arrivals": "New Arrivals",
};

// ─── Local asset imports ───────────────────────────────────────────────────────

// Dresses
import D1 from "@/assets/D1.webp";
import D2 from "@/assets/D2.webp";
import D4 from "@/assets/D4.webp";
import D5 from "@/assets/D5.webp";
import D6 from "@/assets/D6.webp";
import D7 from "@/assets/D7.webp";

// Tops (T1–T17)
import T1 from "@/assets/T1.webp";
import T2 from "@/assets/T2.webp";
import T3 from "@/assets/T3.jpeg";
import T4 from "@/assets/T4.jpeg";
import T5 from "@/assets/T5.jpeg";
import T6 from "@/assets/T6.jpeg";
import T7 from "@/assets/T7.webp";
import T8 from "@/assets/T8.jpeg";
import T9 from "@/assets/T9.jpeg";
import T10 from "@/assets/T10.webp";
import T11 from "@/assets/T11.webp";
import T12 from "@/assets/T12.webp";
import T13 from "@/assets/T13.webp";
import T14 from "@/assets/T14.webp";
import T15 from "@/assets/T15.webp";
import T16 from "@/assets/T16.jpeg";
import T17 from "@/assets/T17.jpeg";

// Shirts
import S1 from "@/assets/S1.webp";
import S2 from "@/assets/S2.webp";
import S3 from "@/assets/S3.jpeg";
import S4 from "@/assets/S4.jpeg";
import S5 from "@/assets/S5.jpeg";
import S6 from "@/assets/S6.jpeg";

// Bags
import B1 from "@/assets/B1.webp";
import B2 from "@/assets/B2.webp";
import B3 from "@/assets/B3.webp";
import B4 from "@/assets/B4.webp";
import B5 from "@/assets/B5.jpeg";
import B7 from "@/assets/B7.jpg";
import B8 from "@/assets/B8.jpg";
import B9 from "@/assets/B9.webp";
import B10 from "@/assets/B10.jpeg";
import B11 from "@/assets/B11.jpg";
import B12 from "@/assets/B12.jpg";
import B13 from "@/assets/B13.jpg";

// New Arrivals
import NA1 from "@/assets/NewArrivals(1).jpeg";
import NA2 from "@/assets/NewArrivals(2).jpeg";
import NA3 from "@/assets/NewArrivals(3).webp";
import NA4 from "@/assets/NewArrivals(4).jpeg";
import NA5 from "@/assets/NewArrivals(5).jpeg";
import NA6 from "@/assets/NewArrivals(6).jpeg";
import NA7 from "@/assets/NewArrivals(7).jpeg";

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [

  // ── DRESSES (1–6) ──────────────────────────────────────────────────────────
  { id: 1,  name: "D1", price: 1299, originalPrice: 1799, category: "dresses", image: D1, badge: "Sale", description: "Elegant dress perfect for every occasion." },
  { id: 2,  name: "D2", price: 999,  category: "dresses", image: D2, badge: "Hot" },
  { id: 3,  name: "D3", price: 1499, originalPrice: 1999, category: "dresses", image: D4, badge: "Sale" },
  { id: 4,  name: "D4", price: 1699, category: "dresses", image: D5 },
  { id: 5,  name: "D5", price: 1399, category: "dresses", image: D6 },
  { id: 6,  name: "D6", price: 1599, category: "dresses", image: D7 },

  // ── TOPS (7–23) ────────────────────────────────────────────────────────────
  { id: 7,  name: "T1",  price: 599, category: "tops", image: T1,  badge: "New" },
  { id: 8,  name: "T2",  price: 799, originalPrice: 1099, category: "tops", image: T2, badge: "Sale" },
  { id: 9,  name: "T3",  price: 549, category: "tops", image: T3 },
  { id: 10, name: "T4",  price: 649, category: "tops", image: T4,  badge: "Hot" },
  { id: 11, name: "T5",  price: 599, category: "tops", image: T5 },
  { id: 12, name: "T6",  price: 699, category: "tops", image: T6,  badge: "New" },
  { id: 13, name: "T7",  price: 749, category: "tops", image: T7 },
  { id: 14, name: "T8",  price: 849, originalPrice: 1199, category: "tops", image: T8, badge: "Sale" },
  { id: 15, name: "T9",  price: 599, category: "tops", image: T9,  badge: "New" },
  { id: 16, name: "T10", price: 649, category: "tops", image: T10 },
  { id: 17, name: "T11", price: 699, originalPrice: 999, category: "tops", image: T11, badge: "Sale" },
  { id: 18, name: "T12", price: 749, category: "tops", image: T12, badge: "Hot" },
  { id: 19, name: "T13", price: 549, category: "tops", image: T13 },
  { id: 20, name: "T14", price: 799, originalPrice: 1099, category: "tops", image: T14, badge: "Sale" },
  { id: 21, name: "T15", price: 649, category: "tops", image: T15, badge: "New" },
  { id: 22, name: "T16", price: 699, category: "tops", image: T16 },
  { id: 23, name: "T17", price: 649, category: "tops", image: T17, badge: "New" },

  // ── SHIRTS (24–29) ─────────────────────────────────────────────────────────
  { id: 24, name: "S1", price: 899,  category: "shirts", image: S1, badge: "New" },
  { id: 25, name: "S2", price: 999,  originalPrice: 1299, category: "shirts", image: S2, badge: "Sale" },
  { id: 26, name: "S3", price: 849,  category: "shirts", image: S3 },
  { id: 27, name: "S4", price: 949,  category: "shirts", image: S4, badge: "Hot" },
  { id: 28, name: "S5", price: 799,  originalPrice: 1099, category: "shirts", image: S5, badge: "Sale" },
  { id: 29, name: "S6", price: 1099, category: "shirts", image: S6 },

  // ── ACCESSORIES (30–33) ────────────────────────────────────────────────────
  // No accessory images available yet — category hidden until real photos are added

  // ── BAGS (34–45) ───────────────────────────────────────────────────────────
  { id: 34, name: "B1",  price: 899,  category: "bags", image: B1,  badge: "New",  hasSizes: false },
  { id: 35, name: "B2",  price: 999,  originalPrice: 1299, category: "bags", image: B2, badge: "Sale", hasSizes: false },
  { id: 36, name: "B3",  price: 1099, category: "bags", image: B3,  hasSizes: false },
  { id: 37, name: "B4",  price: 799,  category: "bags", image: B4,  badge: "Hot",  hasSizes: false },
  { id: 38, name: "B5",  price: 1199, originalPrice: 1599, category: "bags", image: B5, badge: "Sale", hasSizes: false },
  { id: 39, name: "B6",  price: 949,  category: "bags", image: B7,  hasSizes: false },
  { id: 40, name: "B7",  price: 1099, category: "bags", image: B8,  badge: "New",  hasSizes: false },
  { id: 41, name: "B8",  price: 849,  category: "bags", image: B9,  hasSizes: false },
  { id: 42, name: "B9",  price: 999,  originalPrice: 1399, category: "bags", image: B10, badge: "Sale", hasSizes: false },
  { id: 43, name: "B10", price: 1299, category: "bags", image: B11, badge: "Hot",  hasSizes: false },
  { id: 44, name: "B11", price: 749,  category: "bags", image: B12, hasSizes: false },
  { id: 45, name: "B12", price: 1149, category: "bags", image: B13, badge: "New",  hasSizes: false },

  // ── NEW ARRIVALS (46–52) ───────────────────────────────────────────────────
  { id: 46, name: "New Arrival 1", price: 1299, category: "new-arrivals", image: NA1, badge: "New" },
  { id: 47, name: "New Arrival 2", price: 999,  category: "new-arrivals", image: NA2, badge: "New" },
  { id: 48, name: "New Arrival 3", price: 1499, originalPrice: 1999, category: "new-arrivals", image: NA3, badge: "New" },
  { id: 49, name: "New Arrival 4", price: 849,  category: "new-arrivals", image: NA4, badge: "New" },
  { id: 50, name: "New Arrival 5", price: 1199, category: "new-arrivals", image: NA5, badge: "New" },
  { id: 51, name: "New Arrival 6", price: 699,  category: "new-arrivals", image: NA6, badge: "New" },
  { id: 52, name: "New Arrival 7", price: 1399, originalPrice: 1799, category: "new-arrivals", image: NA7, badge: "New" },

];

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
