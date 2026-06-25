import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, SectionTitle } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — FNO Jaripatka" },
      { name: "description", content: "FNO Jaripatka is a trendy boutique in Nagpur offering handpicked styles and personalized service." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <SectionTitle>About FNO Jaripatka</SectionTitle>
          <p className="text-ink/70 leading-relaxed">
            FNO Jaripatka is your neighborhood boutique in Nagpur, bringing together trendy
            outfits, premium fabrics, and a personalized shopping experience. Every piece is
            handpicked to help you elevate your style effortlessly.
          </p>
        </div>
      </section>
    </SiteLayout>
  ),
});
