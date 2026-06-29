import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { products, CATEGORY_LABELS, TOP_LEVEL_SLUGS, ACCESSORY_SUB_SLUGS, type CategorySlug } from "@/lib/products";
import { ShoppingBag, Heart, ChevronRight, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — FNO Jaripatka" },
      { name: "description", content: "Browse our full collection of trendy clothing and accessories at FNO Jaripatka, Nagpur." },
    ],
  }),
  component: ShopPage,
});

type FilterSlug = CategorySlug | "all";
type AccSubFilter = CategorySlug | "all-accessories";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹299", min: 0, max: 299 },
  { label: "₹300 – ₹599", min: 300, max: 599 },
  { label: "₹600 – ₹999", min: 600, max: 999 },
  { label: "₹1000 – ₹1499", min: 1000, max: 1499 },
  { label: "₹1500+", min: 1500, max: Infinity },
];

const ACC_SUBS: { slug: CategorySlug; label: string; emoji: string }[] = [
  { slug: "earrings",  label: "Earrings",  emoji: "💎" },
  { slug: "necklaces", label: "Necklaces", emoji: "📿" },
  { slug: "bracelets", label: "Bracelets", emoji: "🪬" },
  { slug: "rings",     label: "Rings",     emoji: "💍" },
  { slug: "perfumes",  label: "Perfumes",  emoji: "🌸" },
  { slug: "bags",      label: "Bags",      emoji: "👜" },
];

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return { open, setOpen, ref };
}

function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<FilterSlug>("all");
  const [accSub, setAccSub] = useState<AccSubFilter>("all-accessories");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);

  const price  = useDropdown();
  const accDd  = useDropdown();

  const isAccessories = activeFilter === "accessories";

  const filtered = (() => {
    let list = products;

    if (activeFilter === "accessories") {
      if (accSub === "all-accessories") {
        list = list.filter((p) => p.category === "accessories" || ACCESSORY_SUB_SLUGS.includes(p.category));
      } else {
        list = list.filter((p) => p.category === accSub);
      }
    } else if (activeFilter !== "all") {
      list = list.filter((p) => p.category === activeFilter);
    }

    if (priceRange.max !== Infinity || priceRange.min > 0) {
      list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }
    return list;
  })();

  const accessoryCount = products.filter(
    (p) => p.category === "accessories" || ACCESSORY_SUB_SLUGS.includes(p.category),
  ).length;

  function getFilterLabel(slug: CategorySlug): string {
    if (slug === "accessories") return `Accessories (${accessoryCount})`;
    return `${CATEGORY_LABELS[slug]} (${products.filter((p) => p.category === slug).length})`;
  }

  function getAccSubLabel(): string {
    if (accSub === "all-accessories") return "All Accessories";
    const found = ACC_SUBS.find((s) => s.slug === accSub);
    return found ? `${found.emoji} ${found.label}` : "All Accessories";
  }

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink/60">
          <Link to="/" className="hover:text-rose transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium">Shop</span>
        </div>
      </div>

      {/* Page header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-2 text-center">
        <h1 className="font-display text-4xl sm:text-5xl text-ink">Shop All</h1>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-rose/40" />
          <span className="text-rose">🎀</span>
          <span className="h-px w-10 bg-rose/40" />
        </div>
        <p className="mt-3 text-sm text-ink/60 max-w-md mx-auto">
          Browse our complete collection — dresses, tops, shirts, accessories and more.
        </p>
      </div>

      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Category filter chips */}
          <div className="flex items-center gap-2 mb-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-ink/40 shrink-0" />
            <span className="text-xs text-ink/40 shrink-0">Filter:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            <button
              onClick={() => { setActiveFilter("all"); setAccSub("all-accessories"); }}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeFilter === "all"
                  ? "bg-ink text-white border-ink"
                  : "border-border text-ink/60 hover:border-rose hover:text-rose"
              }`}
            >
              All ({products.length})
            </button>
            {TOP_LEVEL_SLUGS.map((slug) => (
              <button
                key={slug}
                onClick={() => { setActiveFilter(slug); setAccSub("all-accessories"); }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeFilter === slug
                    ? "bg-rose text-white border-rose"
                    : "border-border text-ink/60 hover:border-rose hover:text-rose"
                }`}
              >
                {getFilterLabel(slug)}
              </button>
            ))}
          </div>

          {/* Result count + dropdowns row */}
          <div className="flex items-center justify-between mt-4 mb-5 gap-2 flex-wrap">
            <p className="text-xs text-ink/40">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
              {activeFilter !== "all" && (
                <> in <span className="text-rose">
                  {isAccessories && accSub !== "all-accessories"
                    ? ACC_SUBS.find((s) => s.slug === accSub)?.label
                    : CATEGORY_LABELS[activeFilter as CategorySlug]}
                </span></>
              )}
            </p>

            <div className="flex items-center gap-2">
              {/* Accessory sub-category dropdown — only when Accessories is active */}
              {isAccessories && (
                <div className="relative" ref={accDd.ref}>
                  <button
                    onClick={() => accDd.setOpen((o) => !o)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      accSub !== "all-accessories"
                        ? "bg-rose text-white border-rose"
                        : "border-border text-ink/60 hover:border-rose hover:text-rose"
                    }`}
                  >
                    {getAccSubLabel()}
                    <ChevronDown className={`h-3 w-3 transition-transform ${accDd.open ? "rotate-180" : ""}`} />
                  </button>

                  {accDd.open && (
                    <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-border rounded-xl shadow-lg py-1 min-w-[160px]">
                      <button
                        onClick={() => { setAccSub("all-accessories"); accDd.setOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                          accSub === "all-accessories"
                            ? "text-rose font-semibold bg-rose/5"
                            : "text-ink/70 hover:bg-cream hover:text-rose"
                        }`}
                      >
                        All Accessories
                      </button>
                      {ACC_SUBS.map((sub) => (
                        <button
                          key={sub.slug}
                          onClick={() => { setAccSub(sub.slug); accDd.setOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                            accSub === sub.slug
                              ? "text-rose font-semibold bg-rose/5"
                              : "text-ink/70 hover:bg-cream hover:text-rose"
                          }`}
                        >
                          {sub.emoji} {sub.label} ({products.filter((p) => p.category === sub.slug).length})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Price dropdown */}
              <div className="relative" ref={price.ref}>
                <button
                  onClick={() => price.setOpen((o) => !o)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    priceRange.label !== "All Prices"
                      ? "bg-rose text-white border-rose"
                      : "border-border text-ink/60 hover:border-rose hover:text-rose"
                  }`}
                >
                  ₹ {priceRange.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${price.open ? "rotate-180" : ""}`} />
                </button>

                {price.open && (
                  <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-border rounded-xl shadow-lg py-1 min-w-[150px]">
                    {PRICE_RANGES.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => { setPriceRange(range); price.setOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                          priceRange.label === range.label
                            ? "text-rose font-semibold bg-rose/5"
                            : "text-ink/70 hover:bg-cream hover:text-rose"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                <Link
                  to="/product/$id"
                  params={{ id: String(product.id) }}
                  className="relative overflow-hidden rounded-xl bg-cream aspect-[3/4] sm:aspect-[2/3] block"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-rose text-white text-[10px] tracking-widest px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <button
                    aria-label="Add to wishlist"
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-ink/50 hover:text-rose transition shadow-sm"
                  >
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </Link>

                <div className="mt-2.5 flex flex-col flex-1 px-0.5">
                  <span className="text-[10px] text-rose tracking-wide uppercase">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  <Link
                    to="/product/$id"
                    params={{ id: String(product.id) }}
                    className="text-sm font-medium text-ink leading-snug line-clamp-1 hover:text-rose transition-colors"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-ink">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xs text-ink/40 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-rose font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>
                  <Link
                    to="/product/$id"
                    params={{ id: String(product.id) }}
                    className="mt-2.5 flex items-center justify-center gap-1.5 border border-ink/20 text-ink text-xs py-2 rounded-lg hover:border-rose hover:text-rose transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
