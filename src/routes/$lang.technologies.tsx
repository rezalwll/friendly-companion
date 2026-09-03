import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { technologiesPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/technologies")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/technologies",
      title: technologiesPage.seoTitle[locale],
      description: technologiesPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={technologiesPage} />,
});
