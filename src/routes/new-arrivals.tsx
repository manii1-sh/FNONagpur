import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getProductsByCategory } from "@/lib/products";
import { ShoppingBag, Heart, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — FNO Jaripatka" },
      { name: "description", content: "Fresh styles just landed at FNO Jaripatka boutique in Nagpur. Be the first to grab the latest drops." },
    ],
  }),
  loader: () => ({
    products: getProductsByCategory("new-arrivals"),
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  const { products } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink/60">
          <Link to="/" className="hover:text-rose transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium">New Arrivals</span>
        </div>
      </div>

      {/* Hero banner */}
      <div className="bg-rose-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 text-rose text-xs tracking-[0.3em] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Just Landed
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-ink">New Arrivals</h1>
          <p className="text-sm text-ink/60 max-w-md">
            Fresh styles added every week. Be the first to shop the latest from FNO Jaripatka.
          </p>
          {products.length > 0 && (
            <span className="text-xs text-ink/40">
              {products.length} new item{products.length !== 1 ? "s" : ""} available
            </span>
          )}
        </div>
      </div>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {products.length === 0 ? (
            <div className="text-center py-20 text-ink/50">
              <Sparkles className="mx-auto h-12 w-12 mb-4 text-rose/40" />
              <p className="text-lg font-display">New drops coming soon!</p>
              <p className="text-sm mt-2 max-w-xs mx-auto">
                We're adding new styles every week. Check back soon or visit us in store.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-ink text-white px-6 py-2.5 text-xs tracking-widest hover:bg-rose transition-colors rounded-xl"
              >
                <ShoppingBag className="h-4 w-4" /> SHOP ALL
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {products.map((product) => (
                <div key={product.id} className="group relative flex flex-col">

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
                    {/* Always show "New" badge on this page */}
                    <span className="absolute top-2 left-2 bg-rose text-white text-[10px] tracking-widest px-2 py-0.5 rounded-full">
                      New
                    </span>
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
            </div>
          )}
        </div>
      </section>

      {/* Explore other categories */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs tracking-widest text-ink/50 mb-4">
            EXPLORE MORE
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(["dresses", "tops", "shirts", "accessories"] as const).map((slug) => (
              <Link
                key={slug}
                to="/category/$slug"
                params={{ slug }}
                className="border border-rose/40 text-ink text-xs px-5 py-2 rounded-full hover:bg-rose hover:text-white hover:border-rose transition-colors capitalize"
              >
                {slug.charAt(0).toUpperCase() + slug.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
