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
  "earrings",
  "necklaces",
  "bracelets",
  "rings",
  "perfumes",
  "accessories",
  "bags",
  "new-arrivals",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

// Sub-categories that live under Accessories — not shown as top-level filters
export const ACCESSORY_SUB_SLUGS: CategorySlug[] = [
  "earrings", "necklaces", "bracelets", "rings", "perfumes", "bags",
];

// Top-level slugs shown in Shop filter chips & homepage category circles
export const TOP_LEVEL_SLUGS = CATEGORY_SLUGS.filter(
  (s) => !ACCESSORY_SUB_SLUGS.includes(s),
) as CategorySlug[];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  "dresses":    "Dresses",
  "tops":       "Tops",
  "shirts":     "Shirts",
  "earrings":   "Earrings",
  "necklaces":  "Necklaces",
  "bracelets":  "Bracelets",
  "rings":      "Rings",
  "perfumes":   "Perfumes",
  "accessories":"Accessories",
  "bags":       "Bags",
  "new-arrivals":"New Arrivals",
};

// ─── Local asset imports ───────────────────────────────────────────────────────

// Dresses
import D1 from "@/assets/D1.webp";
import D2 from "@/assets/D2.webp";
import D3 from "@/assets/D3.webp";
import D4 from "@/assets/D4.webp";
import D5 from "@/assets/D5.webp";
import D6 from "@/assets/D6.webp";
import D7 from "@/assets/D7.webp";
import D7j from "@/assets/D7.jpeg";
import D8  from "@/assets/D8.jpeg";
import D9  from "@/assets/D9.jpeg";
import D10 from "@/assets/D10.jpeg";
import D11 from "@/assets/D11.jpeg";

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

// Earrings (E1–E6 + EE1–EE12)
import E1 from "@/assets/E1.webp";
import E2 from "@/assets/E2.webp";
import E3 from "@/assets/E3.webp";
import E4 from "@/assets/E4.webp";
import E5 from "@/assets/E5.webp";
import E6 from "@/assets/E6.webp";
import EE1 from "@/assets/EARING  (1).webp";
import EE2 from "@/assets/EARING  (2).webp";
import EE3 from "@/assets/EARING  (3).webp";
import EE4 from "@/assets/EARING  (4).webp";
import EE5 from "@/assets/EARING  (5).webp";
import EE6 from "@/assets/EARING  (6).webp";
import EE7 from "@/assets/EARING  (7).webp";
import EE8 from "@/assets/EARING  (8).webp";
import EE9 from "@/assets/EARING  (9).webp";
import EE10 from "@/assets/EARING  (10).webp";
import EE11 from "@/assets/EARING  (11).webp";
import EE12 from "@/assets/EARING  (12).webp";

// Necklaces (N1–N10)
import N1 from "@/assets/N (1).webp";
import N2 from "@/assets/N (2).webp";
import N3 from "@/assets/N (3).webp";
import N4 from "@/assets/N (4).webp";
import N5 from "@/assets/N (5).webp";
import N6 from "@/assets/N (6).webp";
import N7 from "@/assets/N (7).webp";
import N8 from "@/assets/N (8).webp";
import N9 from "@/assets/N (9).webp";
import N10 from "@/assets/N (10).webp";

// Bracelets (BR1–BR14)
import BR1  from "@/assets/BRACELET (1).webp";
import BR2  from "@/assets/BRACELET (2).webp";
import BR3  from "@/assets/BRACELET (3).webp";
import BR4  from "@/assets/BRACELET (4).webp";
import BR5  from "@/assets/BRACELET (5).webp";
import BR6  from "@/assets/BRACELET (6).webp";
import BR7  from "@/assets/BRACELET (7).webp";
import BR8  from "@/assets/BRACELET (8).webp";
import BR9  from "@/assets/BRACELET (9).webp";
import BR10 from "@/assets/BRACELET (10).webp";
import BR11 from "@/assets/BRACELET (11).webp";
import BR13 from "@/assets/BRACELET (13).webp";
import BR15 from "@/assets/BRACELET (15).webp";
import BR16 from "@/assets/BRACELET (16).webp";

// Rings (RI1–RI12)
import RI1 from "@/assets/RI1.webp";
import RI2 from "@/assets/RI2.webp";
import RI3 from "@/assets/RI3.webp";
import RI4 from "@/assets/RI4.webp";
import RI5 from "@/assets/RI5.webp";
import RI6 from "@/assets/RI6.webp";
import RI7 from "@/assets/RI7.webp";
import RI8 from "@/assets/RI8.webp";
import RI9 from "@/assets/RI9.webp";
import RI10 from "@/assets/RI10.webp";
import RI11 from "@/assets/RI11.webp";
import RI12 from "@/assets/RI12.webp";

// Perfumes (P1–P4)
import P1 from "@/assets/P1.webp";
import P2 from "@/assets/P2.webp";
import P3 from "@/assets/P3.webp";
import P4 from "@/assets/P4.webp";

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
import KIT1   from "@/assets/KIT1.webp";
import KIT2   from "@/assets/KIT2.webp";
import PANDA1 from "@/assets/PANDA1.webp";

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [

  // ── DRESSES (1–6) ──────────────────────────────────────────────────────────
  { id: 1,   name: "D1",  price: 1, originalPrice: 1799, category: "dresses", image: D1,  badge: "Sale", description: "Elegant dress perfect for every occasion." },
  { id: 2,   name: "D2",  price: 1,  originalPrice: 1799, category: "dresses", image: D2,  badge: "Hot" },
  { id: 3,   name: "D3",  price: 1, originalPrice: 1999, category: "dresses", image: D4,  badge: "Sale" },
  { id: 4,   name: "D4",  price: 2380, originalPrice: 3400, category: "dresses", image: D5 },
  { id: 5,   name: "D5",  price: 1, originalPrice: 1799, category: "dresses", image: D6 },
  { id: 6,   name: "D6",  price: 1, originalPrice: 1799, category: "dresses", image: D7 },
  { id: 116, name: "D7",  price: 1, originalPrice: 1799, category: "dresses", image: D8,  badge: "New" },
  { id: 117, name: "D8",  price: 2499, originalPrice: 3499, category: "dresses", image: D9,  badge: "New" },
  { id: 118, name: "D9",  price: 2169, originalPrice: 3099, category: "dresses", image: D10, badge: "New" },
  { id: 119, name: "D10", price: 2345, originalPrice: 3350, category: "dresses", image: D11, badge: "New" },
  { id: 120, name: "D11", price: 3199, originalPrice: 2239, category: "dresses", image: D7j, badge: "New" },

  // ── TOPS (7–23) ────────────────────────────────────────────────────────────
  { id: 7,  name: "T1",  price: 490, originalPrice: 700, category: "tops", image: T1,  badge: "New" },
  { id: 8,  name: "T2",  price: 752, originalPrice: 1075, category: "tops", image: T2, badge: "Sale" },
  { id: 9,  name: "T3",  price: 1099,originalPrice: 1570,  category: "tops", image: T3 },
  { id: 10, name: "T4",  price: 608,originalPrice: 869,  category: "tops", image: T4,  badge: "Hot" },
  { id: 11, name: "T5",  price: 532, originalPrice: 760, category: "tops", image: T5 },
  { id: 12, name: "T6",  price: 420, originalPrice: 600, category: "tops", image: T6,  badge: "New" },
  { id: 13, name: "T7",  price: 770, originalPrice: 1100, category: "tops", image: T7 },
  { id: 14, name: "T8",  price: 420, originalPrice: 600, category: "tops", image: T8, badge: "Sale" },
  { id: 15, name: "T9",  price: 1, originalPrice: 1099, category: "tops", image: T9,  badge: "New" },
  { id: 16, name: "T10", price: 1, originalPrice: 1099, category: "tops", image: T10 },
  { id: 17, name: "T11", price: 1, originalPrice: 999, category: "tops", image: T11, badge: "Sale" },
  { id: 18, name: "T12", price: 1, originalPrice: 1099, category: "tops", image: T12, badge: "Hot" },
  { id: 19, name: "T13", price: 1, originalPrice: 1099, category: "tops", image: T13 },
  { id: 20, name: "T14", price: 1, originalPrice: 1099, category: "tops", image: T14, badge: "Sale" },
  { id: 21, name: "T15", price: 1399, originalPrice: 1999, category: "tops", image: T15, badge: "New" },
  { id: 22, name: "T16", price: 699, originalPrice: 999, category: "tops", image: T16 },
  { id: 23, name: "T17", price: 476, originalPrice: 680, category: "tops", image: T17, badge: "New" },

  // ── SHIRTS (24–29) ─────────────────────────────────────────────────────────
  { id: 24, name: "S1", price: 1399,  originalPrice: 1999,category: "shirts", image: S1, badge: "New" },
  { id: 25, name: "S2", price: 1749,  originalPrice: 2499, category: "shirts", image: S2, badge: "Sale" },
  { id: 26, name: "S3", price: 839,  originalPrice: 1199,category: "shirts", image: S3 },
  { id: 27, name: "S4", price: 909, originalPrice: 1299,category: "shirts", image: S4, badge: "Hot" },
  { id: 28, name: "S5", price: 826,  originalPrice: 1180, category: "shirts", image: S5, badge: "Sale" },
  { id: 29, name: "S6", price: 1056, originalPrice: 1509,category: "shirts", image: S6 },

  // ── ACCESSORIES — empty for now, add real images soon ──────────────────────

  // ── EARRINGS (30–47) ──────────────────────────────────────────────────────
  { id: 30, name: "Earring 1",  price: 340, category: "earrings", image: E1,   badge: "New", hasSizes: false },
  { id: 31, name: "Earring 2",  price: 350, category: "earrings", image: E2,   hasSizes: false },
  { id: 32, name: "Earring 3",  price: 399, category: "earrings", image: E3,   badge: "Hot", hasSizes: false },
  { id: 33, name: "Earring 4",  price: 380, category: "earrings", image: E4,   hasSizes: false },
  { id: 34, name: "Earring 5",  price: 360, category: "earrings", image: E5,   badge: "New", hasSizes: false },
  { id: 35, name: "Earring 6",  price: 250, category: "earrings", image: E6,   hasSizes: false },
  { id: 87, name: "Earring 7",  price: 320, category: "earrings", image: EE1,  badge: "New", hasSizes: false },
  { id: 88, name: "Earring 8",  price: 320, category: "earrings", image: EE2,  hasSizes: false },
  { id: 89, name: "Earring 9",  price: 230, category: "earrings", image: EE3,  hasSizes: false },
  { id: 90, name: "Earring 10", price: 250, category: "earrings", image: EE4,  badge: "Hot", hasSizes: false },
  { id: 91, name: "Earring 11", price: 250, category: "earrings", image: EE5,  hasSizes: false },
  { id: 92, name: "Earring 12", price: 350, category: "earrings", image: EE6,  hasSizes: false },
  { id: 93, name: "Earring 13", price: 230, category: "earrings", image: EE7,  badge: "New", hasSizes: false },
  { id: 94, name: "Earring 14", price: 320, category: "earrings", image: EE8,  hasSizes: false },
  { id: 95, name: "Earring 15", price: 320, category: "earrings", image: EE9,  hasSizes: false },
  { id: 96, name: "Earring 16", price: 250, category: "earrings", image: EE10, badge: "Hot", hasSizes: false },
  { id: 97, name: "Earring 17", price: 495, category: "earrings", image: EE11, hasSizes: false },
  { id: 98, name: "Earring 18", price: 250, category: "earrings", image: EE12, hasSizes: false },

  // ── NECKLACES (36–45) ─────────────────────────────────────────────────────
  { id: 36, name: "Necklace 1",  price: 210, category: "necklaces", image: N1,  badge: "New", hasSizes: false },
  { id: 37, name: "Necklace 2",  price: 280, category: "necklaces", image: N2,  hasSizes: false },
  { id: 38, name: "Necklace 3",  price: 280, category: "necklaces", image: N3,  badge: "Hot", hasSizes: false },
  { id: 39, name: "Necklace 4",  price: 350, category: "necklaces", image: N4,  hasSizes: false },
  { id: 40, name: "Necklace 5",  price: 449, category: "necklaces", image: N5,  badge: "New", hasSizes: false },
  { id: 41, name: "Necklace 6",  price: 280, category: "necklaces", image: N6,  hasSizes: false },
  { id: 42, name: "Necklace 7",  price: 495, category: "necklaces", image: N7,  hasSizes: false },
  { id: 43, name: "Necklace 8",  price: 280, category: "necklaces", image: N8,  badge: "Hot", hasSizes: false },
  { id: 44, name: "Necklace 9",  price: 510, category: "necklaces", image: N9,  hasSizes: false },
  { id: 45, name: "Necklace 10", price: 510, category: "necklaces", image: N10, badge: "New", hasSizes: false },

  // ── BRACELETS (99–112) ───────────────────────────────────────────────────
  { id: 99,  name: "Bracelet 1",  price: 449, category: "bracelets", image: BR1,  badge: "New", hasSizes: false },
  { id: 100, name: "Bracelet 2",  price: 1000, category: "bracelets", image: BR2,  hasSizes: false },
  { id: 101, name: "Bracelet 3",  price: 560, category: "bracelets", image: BR3,  badge: "Hot", hasSizes: false },
  { id: 102, name: "Bracelet 4",  price: 499, category: "bracelets", image: BR4,  hasSizes: false },
  { id: 103, name: "Bracelet 5",  price: 199, category: "bracelets", image: BR5,  badge: "New", hasSizes: false },
  { id: 104, name: "Bracelet 6",  price: 399, category: "bracelets", image: BR6,  hasSizes: false },
  { id: 105, name: "Bracelet 7",  price: 449, category: "bracelets", image: BR7,  hasSizes: false },
  { id: 106, name: "Bracelet 8",  price: 550, category: "bracelets", image: BR8,  badge: "Hot", hasSizes: false },
  { id: 107, name: "Bracelet 9",  price: 550, category: "bracelets", image: BR9,  hasSizes: false },
  { id: 108, name: "Bracelet 10", price: 499, category: "bracelets", image: BR10, badge: "New", hasSizes: false },
  { id: 109, name: "Bracelet 11", price: 350, category: "bracelets", image: BR11, hasSizes: false },
  { id: 110, name: "Bracelet 12", price: 499, category: "bracelets", image: BR13, hasSizes: false },
  { id: 111, name: "Bracelet 13", price: 350, category: "bracelets", image: BR15, badge: "New", hasSizes: false },
  { id: 112, name: "Bracelet 14", price: 320, category: "bracelets", image: BR16, hasSizes: false },

  // ── RINGS (46–57) ─────────────────────────────────────────────────────────
  { id: 46, name: "Ring 1",  price: 200, category: "rings", image: RI1,  badge: "New", hasSizes: false },
  { id: 47, name: "Ring 2",  price: 350, category: "rings", image: RI2,  hasSizes: false },
  { id: 48, name: "Ring 3",  price: 300, category: "rings", image: RI3,  badge: "Hot", hasSizes: false },
  { id: 49, name: "Ring 4",  price: 350, category: "rings", image: RI4,  hasSizes: false },
  { id: 50, name: "Ring 5",  price: 350, category: "rings", image: RI5,  badge: "New", hasSizes: false },
  { id: 51, name: "Ring 6",  price: 250, category: "rings", image: RI6,  hasSizes: false },
  { id: 52, name: "Ring 7",  price: 350, category: "rings", image: RI7,  hasSizes: false },
  { id: 53, name: "Ring 8",  price: 180, category: "rings", image: RI8,  badge: "Hot", hasSizes: false },
  { id: 54, name: "Ring 9",  price: 180, category: "rings", image: RI9,  hasSizes: false },
  { id: 55, name: "Ring 10", price: 180, category: "rings", image: RI10, badge: "New", hasSizes: false },
  { id: 56, name: "Ring 11", price: 180, category: "rings", image: RI11, hasSizes: false },
  { id: 57, name: "Ring 12", price: 300, category: "rings", image: RI12, hasSizes: false },

  // ── PERFUMES (58–61) ──────────────────────────────────────────────────────
  { id: 58, name: "Perfume 1", price: 3299, category: "perfumes", image: P1, badge: "New", hasSizes: false },
  { id: 59, name: "Perfume 2", price: 1599, category: "perfumes", image: P2, hasSizes: false },
  { id: 60, name: "Perfume 3", price: 3299, category: "perfumes", image: P3, badge: "Hot", hasSizes: false },
  { id: 61, name: "Perfume 4", price: 1599, category: "perfumes", image: P4, hasSizes: false },

  // ── BAGS (62–73) ──────────────────────────────────────────────────────────
  { id: 62, name: "B1",  price: 2799,  originalPrice: 3499,category: "bags", image: B1,  badge: "New",  hasSizes: false },
  { id: 63, name: "B2",  price: 1999,  originalPrice: 2499, category: "bags", image: B2, badge: "Sale", hasSizes: false },
  { id: 64, name: "B3",  price: 1279, originalPrice: 1599,category: "bags", image: B3,  hasSizes: false },
  { id: 65, name: "B4",  price: 1199,  originalPrice: 1499,category: "bags", image: B4,  badge: "Hot",  hasSizes: false },
  { id: 66, name: "B5",  price: 1199, originalPrice: 1499, category: "bags", image: B5, badge: "Sale", hasSizes: false },
  { id: 67, name: "B6",  price: 1199,  originalPrice: 1499,category: "bags", image: B7,  hasSizes: false },
  { id: 68, name: "B7",  price: 3199, originalPrice: 3999,category: "bags", image: B8,  badge: "New",  hasSizes: false },
  { id: 69, name: "B8",  price: 1,  originalPrice: 1299,category: "bags", image: B9,  hasSizes: false },
  { id: 70, name: "B9",  price: 1199,  originalPrice: 1499, category: "bags", image: B10, badge: "Sale", hasSizes: false },
  { id: 71, name: "B10", price: 880, originalPrice: 1100,category: "bags", image: B11, badge: "Hot",  hasSizes: false },
  { id: 72, name: "B11", price: 1999,  originalPrice: 2499,category: "bags", image: B12, hasSizes: false },
  { id: 73, name: "B12", price: 2239, originalPrice: 2799,category: "bags", image: B13, badge: "New",  hasSizes: false },

  // ── NEW ARRIVALS (74–87) ──────────────────────────────────────────────────
  { id: 74, name: "Elegant Pink Dress",    price: 1, originalPrice: 1999 , category: "new-arrivals", image: D1,  badge: "New" },
  { id: 75, name: "Classic Black Dress",   price: 1,  originalPrice: 1999 , category: "new-arrivals", image: D2,  badge: "New" },
  { id: 76, name: "Floral Print Dress",    price: 2555, originalPrice: 3650, category: "new-arrivals", image: D3, badge: "New" },
  { id: 77, name: "Burgundy Blazer Dress", price: 2380, originalPrice: 3400 , category: "new-arrivals", image: D5,  badge: "New" },
  { id: 78, name: "Minimalist Dress",      price: 1,  originalPrice: 1999 , category: "new-arrivals", image: D6,  badge: "New" },

  { id: 79, name: "Evening Dress",         price: 1599, originalPrice: 1999 , category: "new-arrivals", image: D7,  badge: "New" },
  { id: 80, name: "New Arrival 1",         price: 1299, originalPrice: 1999 , category: "new-arrivals", image: NA1, badge: "New" },
  { id: 81, name: "New Arrival 2",         price: 999,  originalPrice: 1999 , category: "new-arrivals", image: NA2, badge: "New" },
  { id: 82, name: "New Arrival 3",         price: 1750, originalPrice: 2500, category: "new-arrivals", image: NA3, badge: "New" },
  { id: 83, name: "New Arrival 4",         price: 2449,   originalPrice: 3499 ,category: "new-arrivals", image: NA4, badge: "New" },
  { id: 84, name: "New Arrival 5",         price: 2379, originalPrice: 3399 , category: "new-arrivals", image: NA5, badge: "New" },
  { id: 85, name: "New Arrival 6",         price: 1225,  originalPrice: 1750 , category: "new-arrivals", image: NA6, badge: "New" },
  { id: 86, name: "New Arrival 7",         price: 2169, originalPrice: 3099, category: "new-arrivals", image: NA7,    badge: "New" },
  { id: 113, name: "New Arrival 8",          price: 500, originalPrice: 1999 , category: "new-arrivals", image: KIT1,   badge: "New" },
  { id: 114, name: "New Arrival 9",    price: 380,  originalPrice: 1999 , category: "new-arrivals", image: KIT2,   badge: "New" },
  { id: 115, name: "New Arrival 10",           price: 850,  originalPrice: 1999 , category: "new-arrivals", image: PANDA1, badge: "New" },

];

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
