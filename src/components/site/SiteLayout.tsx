import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {/* pb-16 on mobile so content doesn't hide behind the fixed bottom nav */}
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl sm:text-4xl text-ink">{children}</h2>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="h-px w-10 bg-rose/40" />
        <span className="text-rose">🎀</span>
        <span className="h-px w-10 bg-rose/40" />
      </div>
    </div>
  );
}
