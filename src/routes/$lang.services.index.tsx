import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getServices } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";

const servicesQuery = queryOptions({ queryKey: ["services"], queryFn: () => getServices() });

export const Route = createFileRoute("/$lang/services/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/services",
      title:
        locale === "fa"
          ? "خدمات مهندسی نرم‌افزار | رای‌کد"
          : "Software engineering services | RYCODE",
      description:
        locale === "fa"
          ? "طراحی وب، اپلیکیشن موبایل، نرم‌افزار اختصاصی، API، اتوماسیون، سئو، نگهداری و راهکارهای هوش مصنوعی."
          : "Web development, mobile apps, custom software, APIs, automation, SEO, maintenance and AI solutions.",
    });
  },
  component: ServicesPage,
});

function ServicesPage() {
  const { lang, t } = useLocale();
  const { data: services } = useSuspenseQuery(servicesQuery);
  const Arrow = lang === "fa" ? ArrowLeft : ArrowRight;

  const groups = Array.from(new Set(services.map((s) => s.category)));

  return (
    <>
      <PageHero eyebrow={t("navServices")} title={t("servicesTitle")} subtitle={t("servicesSub")} />
      <Section>
        <div className="flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group}>
              <h2 className="mb-6 font-mono text-xs tracking-widest text-muted-foreground uppercase">{group}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((s) => s.category === group)
                  .map((service) => (
                    <Link
                      key={service.id}
                      to="/$lang/services/$slug"
                      params={{ lang, slug: service.slug }}
                      className="group flex flex-col gap-3 rounded-3xl border border-border bg-[var(--surface-raised)] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-frame"
                    >
                      <h3 className="text-lg font-semibold">{pickLocale(service, "title", lang)}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {pickLocale(service, "excerpt", lang)}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-primary">
                        {t("viewDetails")}
                        <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
