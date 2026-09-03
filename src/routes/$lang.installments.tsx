import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/page-shell";
import { installmentsPage } from "@/lib/static-pages";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/installments")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/installments",
      title: installmentsPage.seoTitle[locale],
      description: installmentsPage.seoDescription[locale],
    });
  },
  component: () => <StaticPage def={installmentsPage} />,
});
