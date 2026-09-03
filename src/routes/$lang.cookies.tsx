import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { cookiesPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/cookies")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/cookies",
      title: cookiesPage.seoTitle[locale],
      description: cookiesPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={cookiesPage} />,
});
