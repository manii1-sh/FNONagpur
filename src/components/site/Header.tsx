import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-rose-soft flex items-center justify-center">
            <span className="font-display text-base sm:text-lg text-ink">F</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-xl sm:text-2xl text-ink tracking-wide">
              FNO <span className="text-rose">🎀</span>
            </div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground">JARIPATKA</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-ink/80 hover:text-ink transition-colors"
              activeProps={{ className: "text-sm text-ink font-medium border-b-2 border-ink pb-1" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-3 sm:gap-4 text-ink">
          <button aria-label="Search" className="hover:text-rose">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Wishlist" className="hidden sm:block hover:text-rose">
            <Heart className="h-5 w-5" />
          </button>
          {/* Cart with live count */}
          <Link to="/cart" aria-label="Cart" className="relative hover:text-rose">
            <ShoppingBag className="h-5 w-5" />
            <span className={`absolute -top-2 -right-2 bg-rose text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center transition-transform ${count > 0 ? "scale-100" : "scale-75 opacity-60"}`}>
              {count > 9 ? "9+" : count}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}
