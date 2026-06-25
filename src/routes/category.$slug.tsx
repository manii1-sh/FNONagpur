import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout, SectionTitle } from "@/components/site/SiteLayout";
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  getProductsByCategory,
  type CategorySlug,
} from "@/lib/products";
import { ShoppingBag, Heart, ChevronRight, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const label = CATEGORY_LABELS[params.slug as CategorySlug] ?? params.slug;
    return {
      meta: [
        { title: `${label} — FNO Jaripatka` },
        { name: "description", content: `Shop ${label} at FNO Jaripatka boutique in Nagpur.` },
      ],
    };
  },
  loader: ({ params }) => {
    const slug = params.slug as CategorySlug;
    if (!CATEGORY_SLUGS.includes(slug)) throw notFound();
    const categoryProducts = getProductsByCategory(slug);
    // If accessories, also load bags preview
    const bagsPreview = slug === "accessories" ? getProductsByCategory("bags").slice(0, 4) : [];
    const bagsTotal = slug === "accessories" ? getProductsByCategory("bags").length : 0;
    return { slug, products: categoryProducts, bagsPreview, bagsTotal };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center text-ink/60">
        Category not found.{" "}
        <Link to="/" className="text-rose underline">Go home</Link>
      </div>
    </SiteLayout>
  ),
});

function ProductCard({ product }: { product: ReturnType<typeof getProductsByCategory>[number] }) {
  return (
    <div className="group relative flex flex-col">
      <Link
        to="/product/$id"
        params={{ id: String(product.id) }}
        className="relative overflow-hidden rounded-xl bg-cream aspect-[3/4] block"
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
  );
}

function CategoryPage() {
  const { slug, products, bagsPreview, bagsTotal } = Route.useLoaderData();
  const label = CATEGORY_LABELS[slug];

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink/60">
          <Link to="/" className="hover:text-rose transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium">{label}</span>
        </div>
      </div>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>{label}</SectionTitle>

          {products.length === 0 ? (
            <div className="text-center py-20 text-ink/50">
              <ShoppingBag className="mx-auto h-12 w-12 mb-4 text-rose/40" />
              <p className="text-lg">New arrivals coming soon!</p>
              <p className="text-sm mt-1">Visit our store in Jaripatka, Nagpur.</p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center bg-ink text-white px-6 py-2.5 text-xs tracking-widest hover:bg-rose transition-colors"
              >
                BACK TO HOME
              </Link>
            </div>
          ) : (
            <>
              <p className="text-center text-xs text-ink/50 -mt-6 mb-8">
                {products.length} item{products.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Bags sub-section (only on Accessories page) ── */}
      {slug === "accessories" && bagsTotal > 0 && (
        <section className="pb-10 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <span className="flex-1 h-px bg-border" />
              <span className="text-rose text-sm">👜</span>
              <span className="flex-1 h-px bg-border" />
            </div>

            {/* Sub-section header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-ink">Bags</h2>
                <p className="text-xs text-ink/40 mt-0.5">{bagsTotal} item{bagsTotal !== 1 ? "s" : ""}</p>
              </div>
              <Link
                to="/category/$slug"
                params={{ slug: "bags" }}
                className="flex items-center gap-1 text-xs text-rose hover:underline"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Preview grid — first 4 bags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {bagsPreview.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {/* "See all bags" tile */}
              {bagsTotal > 4 && (
                <Link
                  to="/category/$slug"
                  params={{ slug: "bags" }}
                  className="flex flex-col items-center justify-center rounded-xl bg-rose-soft aspect-[3/4] border border-rose/20 hover:bg-rose hover:text-white group transition-colors"
                >
                  <ArrowRight className="h-6 w-6 text-rose group-hover:text-white transition-colors" />
                  <span className="mt-2 text-xs font-medium text-rose group-hover:text-white transition-colors text-center px-3">
                    +{bagsTotal - 4} more bags
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Browse other categories */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs tracking-widest text-ink/50 mb-4">
            BROWSE OTHER CATEGORIES
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_SLUGS.filter((s) => s !== slug).map((s) => (
              <Link
                key={s}
                to="/category/$slug"
                params={{ slug: s }}
                className="border border-rose/40 text-ink text-xs px-5 py-2 rounded-full hover:bg-rose hover:text-white hover:border-rose transition-colors"
              >
                {CATEGORY_LABELS[s]}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
