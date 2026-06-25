import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getProductById, CATEGORY_LABELS } from "@/lib/products";
import { useCart, CLOTHING_SIZES, buildWhatsAppUrl } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { ShoppingBag, Heart, ChevronRight, CheckCircle2, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const product = getProductById(Number(params.id));
    return {
      meta: [
        { title: product ? `${product.name} — FNO Jaripatka` : "Product — FNO Jaripatka" },
        { name: "description", content: product?.description ?? `Shop ${product?.name} at FNO Jaripatka boutique in Nagpur.` },
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProductById(Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center text-ink/60">
        Product not found.{" "}
        <Link to="/" className="text-rose underline">Go home</Link>
      </div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const { isWishlisted, toggle: toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const needsSize = product.hasSizes !== false;
  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/product/${product.id}`
      : `/product/${product.id}`;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  function validateSize(): boolean {
    if (needsSize && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return false;
    }
    return true;
  }

  function handleAddToCart() {
    if (!validateSize()) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: needsSize ? selectedSize : "Free Size",
      productUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!validateSize()) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: needsSize ? selectedSize : "Free Size",
      productUrl,
    });
    navigate({ to: "/cart" });
  }

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink/60 flex-wrap">
          <Link to="/" className="hover:text-rose">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-rose">
            {categoryLabel}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      <section className="py-6 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

            {/* ── Product Image ── */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-rose text-white text-[11px] tracking-widest px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {/* Wishlist icon on image */}
              <button
                aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleWishlist({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  category: product.category,
                })}
                className={`absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow transition ${
                  isWishlisted(product.id) ? "text-rose" : "text-ink hover:text-rose"
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-rose" : ""}`} />
              </button>
            </div>

            {/* ── Product Info ── */}
            <div className="flex flex-col">
              <p className="text-xs tracking-widest text-rose uppercase">{categoryLabel}</p>
              <h1 className="font-display text-3xl sm:text-4xl text-ink mt-1 leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-semibold text-ink">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-ink/40 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-rose/10 text-rose text-xs font-semibold px-2 py-0.5 rounded-full">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.description && (
                <p className="mt-4 text-sm text-ink/65 leading-relaxed">
                  {product.description}
                </p>
              )}

              <div className="mt-4 h-px bg-border" />

              {/* Size selector */}
              {needsSize && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-ink">Select Size</span>
                    {sizeError && (
                      <span className="text-xs text-rose animate-pulse">
                        Please select a size
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {CLOTHING_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 w-12 rounded-lg border text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "border-rose bg-rose text-white shadow-sm"
                            : sizeError
                            ? "border-rose/60 text-ink/60"
                            : "border-border text-ink hover:border-rose"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="mt-6 flex flex-col gap-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                    added
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-ink text-ink hover:bg-ink hover:text-white"
                  }`}
                >
                  {added ? (
                    <><CheckCircle2 className="h-4 w-4" /> Added to Cart!</>
                  ) : (
                    <><ShoppingBag className="h-4 w-4" /> Add to Cart</>
                  )}
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-rose text-white text-sm font-medium hover:bg-rose/90 transition-colors shadow-sm"
                >
                  <ShoppingBag className="h-4 w-4" /> Buy Now
                </button>

                {/* Direct WhatsApp enquiry */}
                {needsSize && !selectedSize ? (
                  <button
                    onClick={() => { setSizeError(true); setTimeout(() => setSizeError(false), 2000); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/50 text-white text-sm font-medium cursor-not-allowed"
                  >
                    <MessageCircle className="h-4 w-4" /> Select a size to enquire
                  </button>
                ) : (
                  <a
                    href={buildWhatsAppUrl([{
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: needsSize ? selectedSize : "Free Size",
                      quantity: 1,
                      productUrl,
                    }])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#22c55e] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
                  </a>
                )}
              </div>

              {/* Trust badges removed — in-store pickup only, no delivery/returns */}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
