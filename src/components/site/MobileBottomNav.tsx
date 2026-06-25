import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function MobileBottomNav() {
  const { count } = useCart();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 sm:hidden bg-white border-t border-border">
      <div className="grid grid-cols-4 h-16">

        <Link
          to="/"
          className="flex flex-col items-center justify-center gap-1 text-ink/40 transition-colors"
          activeProps={{ className: "flex flex-col items-center justify-center gap-1 text-rose" }}
          activeOptions={{ exact: true }}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] tracking-wide">Home</span>
        </Link>

        <Link
          to="/category/$slug"
          params={{ slug: "dresses" }}
          className="flex flex-col items-center justify-center gap-1 text-ink/40 transition-colors"
          activeProps={{ className: "flex flex-col items-center justify-center gap-1 text-rose" }}
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[10px] tracking-wide">Categories</span>
        </Link>

        <Link
          to="/wishlist"
          className="flex flex-col items-center justify-center gap-1 text-ink/40 transition-colors"
          activeProps={{ className: "flex flex-col items-center justify-center gap-1 text-rose" }}
          activeOptions={{ exact: true }}
        >
          <Heart className="h-5 w-5" />
          <span className="text-[10px] tracking-wide">Wishlist</span>
        </Link>

        <Link
          to="/cart"
          className="flex flex-col items-center justify-center gap-1 text-ink/40 transition-colors relative"
          activeProps={{ className: "flex flex-col items-center justify-center gap-1 text-rose relative" }}
          activeOptions={{ exact: true }}
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-medium">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wide">Cart</span>
        </Link>

      </div>
    </nav>
  );
}
