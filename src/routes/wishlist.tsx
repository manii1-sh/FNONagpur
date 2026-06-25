import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useWishlist } from "@/lib/wishlist";
import { Heart, ShoppingBag, Trash2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{ title: "Wishlist — FNO Jaripatka" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, remove } = useWishlist();

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink/60">
          <Link to="/" className="hover:text-rose transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium">Wishlist</span>
        </div>
      </div>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-ink">My Wishlist</h1>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-rose/40" />
              <span className="text-rose">🎀</span>
              <span className="h-px w-10 bg-rose/40" />
            </div>
            {items.length > 0 && (
              <p className="mt-3 text-xs text-ink/50">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
            )}
          </div>

          {/* Empty state */}
          {items.length === 0 ? (
            <div className="text-center py-16 text-ink/50">
              <Heart className="mx-auto h-14 w-14 text-rose/30 mb-4" />
              <p className="text-lg font-display text-ink">Nothing saved yet</p>
              <p className="text-sm mt-1 max-w-xs mx-auto">
                Tap the heart on any product to save it here.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-ink text-white px-6 py-2.5 text-xs tracking-widest hover:bg-rose transition-colors rounded-xl"
              >
                <ShoppingBag className="h-4 w-4" /> BROWSE SHOP
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
              {items.map((item) => (
                <div key={item.productId} className="group relative flex flex-col">

                  {/* Image */}
                  <Link
                    to="/product/$id"
                    params={{ id: String(item.productId) }}
                    className="relative overflow-hidden rounded-xl bg-cream aspect-[3/4] block"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Remove from wishlist */}
                    <button
                      aria-label="Remove from wishlist"
                      onClick={(e) => { e.preventDefault(); remove(item.productId); }}
                      className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-rose hover:bg-rose hover:text-white transition shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </Link>

                  {/* Info */}
                  <div className="mt-2.5 flex flex-col flex-1 px-0.5">
                    <Link
                      to="/product/$id"
                      params={{ id: String(item.productId) }}
                      className="text-sm font-medium text-ink leading-snug line-clamp-1 hover:text-rose transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold text-ink">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-ink/40 line-through">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <Link
                      to="/product/$id"
                      params={{ id: String(item.productId) }}
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
    </SiteLayout>
  );
}
