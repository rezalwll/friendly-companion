import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { privacyPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/privacy")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/privacy",
      title: privacyPage.seoTitle[locale],
      description: privacyPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={privacyPage} />,
});
