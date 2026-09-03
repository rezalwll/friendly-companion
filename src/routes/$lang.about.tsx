import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { aboutPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/about",
      title: aboutPage.seoTitle[locale],
      description: aboutPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={aboutPage} />,
});
