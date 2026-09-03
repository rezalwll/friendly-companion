import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getProjects } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const projectsQuery = queryOptions({ queryKey: ["projects"], queryFn: () => getProjects() });

export const Route = createFileRoute("/$lang/portfolio/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/portfolio",
      title: locale === "fa" ? "نمونه‌کارها و مطالعات موردی | رای‌کد" : "Work & case studies | RYCODE",
      description:
        locale === "fa"
          ? "مطالعه موردی پروژه‌های وب، موبایل، نرم‌افزار سازمانی و اتوماسیون با نتایج قابل اندازه‌گیری."
          : "Case studies across web, mobile, enterprise software and automation with measurable outcomes.",
    });
  },
  component: PortfolioPage,
});

function PortfolioPage() {
  const { lang, t } = useLocale();
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const [filter, setFilter] = useState<string>("all");

  const types = Array.from(new Set(projects.map((p) => p.project_type ?? "")));
  const visible = filter === "all" ? projects : projects.filter((p) => (p.project_type ?? "") === filter);

  return (
    <>
      <PageHero eyebrow={t("navPortfolio")} title={t("featuredWorkTitle")} subtitle={t("featuredWorkSub")} />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          {["all", ...types].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                filter === type
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary",
              )}
            >
              {type === "all" ? (lang === "fa" ? "همه" : "All") : type}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((project) => {
            const metrics = (project.metrics as { label_fa?: string; label_en?: string; value?: string }[]) ?? [];
            return (
              <Link
                key={project.id}
                to="/$lang/portfolio/$slug"
                params={{ lang, slug: project.slug }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-[var(--surface-raised)] transition-all duration-500 hover:-translate-y-1 hover:shadow-frame"
              >
                <div className="relative aspect-16/9" style={{ backgroundImage: "var(--gradient-frame)" }}>
                  <div className="absolute inset-0 bg-hero-glow opacity-70" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <span className="text-xs text-muted-foreground">
                    {pickLocale(project, "industry", lang)} · {project.project_type}
                  </span>
                  <h2 className="text-lg font-semibold">{pickLocale(project, "title", lang)}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pickLocale(project, "summary", lang)}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-4 pt-4">
                    {metrics.slice(0, 2).map((metric) => (
                      <div key={metric.value}>
                        <div className="font-display text-xl font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {lang === "fa" ? metric.label_fa : metric.label_en}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
