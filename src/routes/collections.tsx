import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { products, CATEGORY_LABELS, CATEGORY_SLUGS, type CategorySlug } from "@/lib/products";
import { ShoppingBag, Heart, ChevronRight, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — FNO Jaripatka" },
      { name: "description", content: "Explore all curated collections at FNO Jaripatka — Dresses, Tops, Shirts, Skirts, Accessories & New Arrivals." },
    ],
  }),
  loader: () => {
    // Build a map of category → first 4 products (preview)
    const grouped = CATEGORY_SLUGS.map((slug) => ({
      slug,
      label: CATEGORY_LABELS[slug],
      items: products.filter((p) => p.category === slug).slice(0, 4),
      total: products.filter((p) => p.category === slug).length,
    }));
    return { grouped };
  },
  component: CollectionsPage,
});

function CollectionsPage() {
  const { grouped } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink/60">
          <Link to="/" className="hover:text-rose transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium">Collections</span>
        </div>
      </div>

      {/* Page header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4 text-center">
        <h1 className="font-display text-4xl sm:text-5xl text-ink">Our Collections</h1>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-rose/40" />
          <span className="text-rose">🎀</span>
          <span className="h-px w-10 bg-rose/40" />
        </div>
        <p className="mt-4 text-sm text-ink/60 max-w-md mx-auto">
          Handpicked styles across every category — browse the full collection or dive into what you love.
        </p>
      </div>

      {/* One section per category */}
      <div className="pb-10 sm:pb-16 space-y-14 sm:space-y-20">
        {grouped.map(({ slug, label, items, total }) => (
          <section key={slug} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-ink">{label}</h2>
                <p className="text-xs text-ink/40 mt-0.5">{total} item{total !== 1 ? "s" : ""}</p>
              </div>
              <Link
                to="/category/$slug"
                params={{ slug }}
                className="flex items-center gap-1 text-xs text-rose hover:underline shrink-0"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="bg-cream rounded-2xl py-10 text-center text-ink/40 text-sm">
                Coming soon — check back next week!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {items.map((product) => (
                  <div key={product.id} className="group flex flex-col">

                    {/* Image */}
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

                    {/* Info */}
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
                ))}

                {/* "See more" card — if category has more than 4 */}
                {total > 4 && (
                  <Link
                    to="/category/$slug"
                    params={{ slug }}
                    className="flex flex-col items-center justify-center rounded-xl bg-rose-soft aspect-[3/4] border border-rose/20 hover:bg-rose hover:text-white group transition-colors"
                  >
                    <ArrowRight className="h-6 w-6 text-rose group-hover:text-white transition-colors" />
                    <span className="mt-2 text-xs font-medium text-rose group-hover:text-white transition-colors text-center px-3">
                      +{total - 4} more in {label}
                    </span>
                  </Link>
                )}
              </div>
            )}

          </section>
        ))}
      </div>

    </SiteLayout>
  );
}
