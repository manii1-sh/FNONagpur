import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart, buildWhatsAppUrl } from "@/lib/cart";
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — FNO Jaripatka" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQty, total, count, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <SiteLayout>
        <section className="py-20 flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag className="h-16 w-16 text-rose/30 mb-4" />
          <h2 className="font-display text-2xl text-ink mb-2">Your cart is empty</h2>
          <p className="text-sm text-ink/50 mb-6">Add items to your cart and they'll show up here.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 text-xs tracking-widest hover:bg-rose transition-colors rounded-xl"
          >
            <ShoppingBag className="h-4 w-4" /> START SHOPPING
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center gap-1.5 text-xs text-ink/60">
          <Link to="/" className="hover:text-rose">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink font-medium">Cart ({count} item{count !== 1 ? "s" : ""})</span>
        </div>
      </div>

      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-display text-2xl sm:text-3xl text-ink mb-6">
            My Cart
            <span className="ml-2 text-sm font-sans font-normal text-ink/50">
              {count} item{count !== 1 ? "s" : ""}
            </span>
          </h1>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-border"
              >
                {/* Image */}
                <Link to="/product/$id" params={{ id: String(item.productId) }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 sm:h-28 sm:w-24 object-cover rounded-xl shrink-0"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    to="/product/$id"
                    params={{ id: String(item.productId) }}
                    className="font-medium text-ink text-sm leading-snug hover:text-rose transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  {item.size !== "Free Size" && (
                    <span className="inline-block mt-1 text-[11px] border border-border rounded px-2 py-0.5 text-ink/60">
                      Size: {item.size}
                    </span>
                  )}
                  <div className="mt-2 font-semibold text-ink">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    <span className="text-xs font-normal text-ink/40 ml-1">
                      (₹{item.price.toLocaleString("en-IN")} each)
                    </span>
                  </div>

                  {/* Qty + remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                        className="h-8 w-8 flex items-center justify-center text-ink hover:bg-rose-soft transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center text-ink hover:bg-rose-soft transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-ink/30 hover:text-rose transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-cream rounded-2xl p-5 border border-border mb-6">
            <h3 className="font-display text-lg text-ink mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex justify-between text-ink/70">
                  <span className="line-clamp-1 flex-1 pr-4">
                    {item.name}
                    {item.size !== "Free Size" && ` (${item.size})`}
                    {item.quantity > 1 && ` × ${item.quantity}`}
                  </span>
                  <span className="shrink-0 font-medium text-ink">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between font-semibold text-ink">
              <span>Total</span>
              <span className="text-lg">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* WhatsApp Checkout */}
          <a
            href={buildWhatsAppUrl(items)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl text-sm font-semibold hover:bg-[#22c55e] transition-colors shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            Order via WhatsApp — ₹{total.toLocaleString("en-IN")}
          </a>

          <p className="text-center text-xs text-ink/40 mt-3">
            WhatsApp will open with your order details pre-filled.
            The store will confirm & share payment link.
          </p>

          {/* Clear cart */}
          <button
            onClick={clearCart}
            className="w-full mt-4 text-xs text-ink/30 hover:text-rose transition py-2"
          >
            Clear cart
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}
