import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getService } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";

const serviceQuery = (slug: string) =>
  queryOptions({ queryKey: ["service", slug], queryFn: () => getService({ data: { slug } }) });

export const Route = createFileRoute("/$lang/services/$slug")({
  loader: async ({ context, params }) => {
    const service = await context.queryClient.ensureQueryData(serviceQuery(params.slug));
    if (!service) throw notFound();
    return service;
  },
  head: ({ params, loaderData }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    if (!loaderData) {
      return buildHead({
        locale,
        path: `/services/${params.slug}`,
        title: locale === "fa" ? "خدمت یافت نشد | رای‌کد" : "Service not found | RYCODE",
        description: locale === "fa" ? "این صفحه در دسترس نیست." : "This page is unavailable.",
        noindex: true,
      });
    }
    const title = pickLocale(loaderData, "seo_title", locale) || pickLocale(loaderData, "title", locale);
    const description =
      pickLocale(loaderData, "seo_desc", locale) || pickLocale(loaderData, "excerpt", locale);
    return buildHead({ locale, path: `/services/${params.slug}`, title, description });
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { lang, t } = useLocale();
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(serviceQuery(slug));
  if (!data) return null;

  const benefits = (pickLocale(data, "benefits", lang) as unknown as string[] | null) ?? [];
  const capabilities = (pickLocale(data, "capabilities", lang) as unknown as string[] | null) ?? [];
  const stack = (data.tech_stack as string[] | null) ?? [];

  return (
    <>
      <PageHero
        eyebrow={data.category}
        title={pickLocale(data, "title", lang)}
        subtitle={pickLocale(data, "excerpt", lang)}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-8">
            <p className="text-base leading-relaxed whitespace-pre-line text-muted-foreground">
              {pickLocale(data, "body", lang)}
            </p>
            {capabilities.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold">
                  {lang === "fa" ? "چه چیزی تحویل می‌گیرید" : "What you get"}
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {capabilities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-border bg-[var(--surface-raised)] p-7">
            {benefits.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold">{lang === "fa" ? "مزیت‌ها" : "Benefits"}</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {benefits.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {stack.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold">{lang === "fa" ? "تکنولوژی" : "Technology"}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <li key={item} className="rounded-full border border-border px-3 py-1.5 font-mono text-xs">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link
              to="/$lang/request"
              params={{ lang }}
              search={{ service: data.slug }}
              className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-shadow duration-500 hover:shadow-glow"
            >
              {t("startProject")}
            </Link>
          </aside>
        </div>
      </Section>
    </>
  );
}
