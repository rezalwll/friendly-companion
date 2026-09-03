import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getProject } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";

const projectQuery = (slug: string) =>
  queryOptions({ queryKey: ["project", slug], queryFn: () => getProject({ data: { slug } }) });

export const Route = createFileRoute("/$lang/portfolio/$slug")({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(projectQuery(params.slug));
    if (!project) throw notFound();
    return project;
  },
  head: ({ params, loaderData }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    if (!loaderData) {
      return buildHead({
        locale,
        path: `/portfolio/${params.slug}`,
        title: locale === "fa" ? "پروژه یافت نشد | رای‌کد" : "Project not found | RYCODE",
        description: locale === "fa" ? "این صفحه در دسترس نیست." : "This page is unavailable.",
        noindex: true,
      });
    }
    return buildHead({
      locale,
      path: `/portfolio/${params.slug}`,
      title: `${pickLocale(loaderData, "title", locale)} | RYCODE`,
      description: pickLocale(loaderData, "summary", locale),
      type: "article",
    });
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { lang, t } = useLocale();
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectQuery(slug));
  if (!data) return null;

  const metrics = (data.metrics as { label_fa?: string; label_en?: string; value?: string }[]) ?? [];
  const technologies = (data.technologies as string[] | null) ?? [];

  return (
    <>
      <PageHero
        eyebrow={`${pickLocale(data, "industry", lang)} · ${data.project_type}`}
        title={pickLocale(data, "title", lang)}
        subtitle={pickLocale(data, "summary", lang)}
      />
      <Section>
        {metrics.length > 0 && (
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.value} className="rounded-3xl border border-border p-7 text-center">
                <div className="font-display text-3xl font-bold text-primary">{metric.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {lang === "fa" ? metric.label_fa : metric.label_en}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-8">
            {(["challenge", "solution", "result"] as const).map((key) => {
              const text = pickLocale(data, key, lang);
              if (!text) return null;
              const heading =
                key === "challenge"
                  ? lang === "fa"
                    ? "چالش"
                    : "The challenge"
                  : key === "solution"
                    ? lang === "fa"
                      ? "راه‌حل"
                      : "The solution"
                    : lang === "fa"
                      ? "نتیجه"
                      : "The result";
              return (
                <section key={key}>
                  <h2 className="text-lg font-semibold">{heading}</h2>
                  <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">{text}</p>
                </section>
              );
            })}
          </div>

          <aside className="flex h-fit flex-col gap-6 rounded-3xl border border-border bg-[var(--surface-raised)] p-7">
            {data.client_name ? (
              <div>
                <h2 className="text-sm font-semibold">{lang === "fa" ? "کارفرما" : "Client"}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{data.client_name}</p>
              </div>
            ) : null}
            {technologies.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold">{lang === "fa" ? "تکنولوژی" : "Technology"}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {technologies.map((item) => (
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
