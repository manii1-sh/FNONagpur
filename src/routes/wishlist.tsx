import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{ title: "Wishlist — FNO Jaripatka" }],
  }),
  component: () => (
    <SiteLayout>
      <section className="py-20 flex flex-col items-center justify-center text-center px-4">
        <Heart className="h-14 w-14 text-rose/40 mb-4" />
        <h2 className="font-display text-2xl text-ink mb-2">Your Wishlist</h2>
        <p className="text-sm text-ink/50">You haven't saved any items yet.</p>
        <a
          href="/category/new-arrivals"
          className="mt-6 inline-flex bg-ink text-white px-6 py-2.5 text-xs tracking-widest hover:bg-rose transition-colors"
        >
          BROWSE NEW ARRIVALS
        </a>
      </section>
    </SiteLayout>
  ),
});
