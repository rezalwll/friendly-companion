import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { termsPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/terms")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/terms",
      title: termsPage.seoTitle[locale],
      description: termsPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={termsPage} />,
});
