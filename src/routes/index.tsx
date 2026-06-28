import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, SectionTitle } from "@/components/site/SiteLayout";
import { Shirt, ShieldCheck, Heart, Store, Sparkles, BadgeCheck, Users, UserCog } from "lucide-react";
import { type CategorySlug } from "@/lib/products";
import { LINKS as SOCIAL } from "@/lib/social";
import { SpinWheel } from "@/components/site/SpinWheel";
import hero from "@/assets/hero.webp";
import rack from "@/assets/rack.jpg";
import cDresses from "@/assets/cat-dresses.jpg";
import cTops from "@/assets/cat-tops.jpg";
import cCoords from "@/assets/cat-coords.jpg";
import cAcc from "@/assets/cat-accessories.jpg";
import cNew from "@/assets/cat-new.jpg";
import D5 from "@/assets/D5.webp";
import store from "@/assets/store.webp";
import D1 from "@/assets/D1.webp";
import D2 from "@/assets/D2.webp";
import D3 from "@/assets/D3.webp";
import D7 from "@/assets/D7.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FNO Jaripatka — Trendy Boutique in Nagpur" },
      { name: "description", content: "Trendy outfits, elegant choices. Shop dresses, tops, shirts, skirts & accessories at FNO Jaripatka boutique in Nagpur." },
      { property: "og:title", content: "FNO Jaripatka — Trendy Boutique in Nagpur" },
      { property: "og:description", content: "Trendy outfits. Elegant choices. Just for you." },
    ],
  }),
  component: Home,
});

const categories: { label: string; img: string; slug: CategorySlug }[] = [
  { label: "Dresses",     img: cDresses, slug: "dresses" },
  { label: "Tops",        img: cTops,    slug: "tops" },
  { label: "Shirts",      img: cCoords,  slug: "shirts" },
  { label: "Accessories", img: cAcc,     slug: "accessories" },
  { label: "New Arrivals",img: cNew,     slug: "new-arrivals" },
];

const features = [
  { icon: Shirt, title: "Trendy Collections", sub: "Handpicked just for you" },
  { icon: ShieldCheck, title: "Premium Quality", sub: "Comfort meets style" },
  { icon: Heart, title: "Affordable Fashion", sub: "Look good, feel great" },
  { icon: Store, title: "Local Store", sub: "Proudly in Jaripatka, Nagpur" },
];

const whys = [
  { icon: Sparkles, title: "Fashion Forward", sub: "Stay ahead with the latest trends" },
  { icon: BadgeCheck, title: "Quality Assured", sub: "Premium fabrics & finishing" },
  { icon: Users, title: "Trusted by Many", sub: "Loved by our happy customers" },
  { icon: UserCog, title: "Personalized Service", sub: "We help you find your perfect fit" },
];

const gallery = [store, D5, D2, D3, D7, D1];

function Home() {
  return (
    <SiteLayout>
      <SpinWheel />

      {/* Announcement bar — homepage only */}
      <div className="w-full bg-rose text-white text-center py-2 text-[11px] sm:text-xs tracking-wide font-medium">
        🛍️ Only In-Store Pickup Available — No Home Delivery
      </div>

      {/* Hero */}
      <section className="relative">
        <img src={hero} alt="FNO boutique interior" width={1600} height={900} className="w-full h-[460px] sm:h-[560px] object-cover" />
        <div className="absolute inset-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-xl">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-ink">
                Elevate<br />Your Style<br />Effortlessly.
              </h1>
              <p className="mt-5 text-ink/70 text-base">Trendy Outfits. Elegant Choices.<br />Just for You.</p>
              <Link to="/shop" className="mt-7 inline-flex items-center bg-ink text-white px-7 py-3 text-sm tracking-widest hover:bg-rose transition-colors">
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-rose-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-rose shrink-0">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{f.title}</div>
                <div className="text-xs text-ink/60">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <SectionTitle>Shop By Category</SectionTitle>
          </div>

          {/* Mobile — horizontal scroll (app-style) */}
          <div className="flex sm:hidden gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide snap-x snap-mandatory">
            {categories.map((c) => (
              <Link
                key={c.label}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex flex-col items-center gap-2 shrink-0 snap-start"
              >
                <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-rose/20 active:ring-rose transition">
                  <img
                    src={c.img}
                    alt={c.label}
                    loading="lazy"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-ink font-medium text-center w-20 leading-tight">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop — 6-column grid */}
          <div className="hidden sm:grid grid-cols-6 gap-6 px-0">
            {categories.map((c) => (
              <Link
                key={c.label}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group text-center"
              >
                <div className="aspect-square rounded-full overflow-hidden ring-1 ring-rose/20 group-hover:ring-rose transition">
                  <img
                    src={c.img}
                    alt={c.label}
                    loading="lazy"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3 text-sm text-ink">{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh styles banner */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-cream overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center">
            <img src={rack} alt="Fresh styles" loading="lazy" width={1200} height={700} className="w-full h-72 md:h-[420px] object-cover" />
            <div className="p-8 md:p-14 relative">
              <span className="text-xs tracking-[0.3em] text-rose">NEW COLLECTION</span>
              <h3 className="mt-3 font-display text-4xl md:text-5xl text-ink leading-tight">Fresh Styles<br />Just Landed!</h3>
              <p className="mt-4 text-ink/65 text-sm max-w-sm">Explore our latest collection and find your new favorite look.</p>
              <Link to="/new-arrivals" className="mt-7 inline-flex bg-ink text-white px-7 py-3 text-xs tracking-widest hover:bg-rose transition-colors">
                EXPLORE NOW
              </Link>
              <div className="pointer-events-none absolute right-6 bottom-6 text-rose/30 text-7xl">❀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-16 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>Why Choose FNO Jaripatka?</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whys.map((w) => (
              <div key={w.title} className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-rose-soft flex items-center justify-center text-rose shrink-0">
                  <w.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-ink">{w.title}</div>
                  <div className="text-sm text-ink/60 mt-1">{w.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From our store */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle>From Our Store</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {gallery.map((src, i) => (
              <a key={i} href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden rounded-md group">
                <img src={src} alt={`Store photo ${i + 1}`} loading="lazy" width={400} height={500} className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <svg className="absolute top-2 right-2 h-4 w-4 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-rose text-rose px-6 py-3 rounded-full text-xs tracking-widest hover:bg-rose hover:text-white transition">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg> FOLLOW US ON INSTAGRAM
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
