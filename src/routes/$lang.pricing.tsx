import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { pricingPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/pricing")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/pricing",
      title: pricingPage.seoTitle[locale],
      description: pricingPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={pricingPage} />,
});
