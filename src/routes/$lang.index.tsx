import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/section";
import { HeroVisual } from "@/components/site/hero-visual";
import { useLocale } from "@/hooks/use-locale";
import { getHomeData } from "@/lib/public-content.functions";
import { buildHead, jsonLd, SITE_URL } from "@/lib/seo";
import { formatDate, isLocale, pickLocale, type Locale } from "@/lib/i18n";
import { processSteps, stats, techStack, whyPoints, engagementModels } from "@/lib/page-content";

const homeQuery = queryOptions({ queryKey: ["home"], queryFn: () => getHomeData() });

export const Route = createFileRoute("/$lang/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery),
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    const head = buildHead({
      locale,
      path: "",
      title:
        locale === "fa"
          ? "رای‌کد | مهندسی نرم‌افزار، وب، موبایل و اتوماسیون"
          : "RYCODE | Software Engineering, Web, Mobile & Automation",
      description:
        locale === "fa"
          ? "رای‌کد وب‌سایت، اپلیکیشن، نرم‌افزار اختصاصی، API، اتوماسیون و راهکارهای هوش مصنوعی می‌سازد و پروژه‌های موجود را بهینه می‌کند."
          : "RYCODE builds websites, apps, custom software, APIs, automation and AI solutions — and optimizes what you already run.",
    });
    return {
      ...head,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "RYCODE",
          alternateName: "رای‌کد",
          url: SITE_URL,
          description:
            locale === "fa"
              ? "استودیوی مهندسی نرم‌افزار و فناوری دیجیتال"
              : "Premium software engineering and digital technology studio",
        }),
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { lang, t } = useLocale();
  const { data } = useSuspenseQuery(homeQuery);
  const Arrow = lang === "fa" ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden />
        <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div className="flex flex-col items-start gap-7">
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              {t("heroHeadline")}
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("heroSub")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/$lang/request"
                params={{ lang }}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow duration-500 hover:shadow-glow"
              >
                {t("startProject")}
                <Arrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
              </Link>
              <Link
                to="/$lang/portfolio"
                params={{ lang }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                {t("viewWork")}
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-[var(--surface-sunken)] py-8">
        <Container>
          <p className="mb-6 text-center text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {t("trustedTitle")}
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label.en} className="text-center">
                <div className="font-display text-3xl font-bold sm:text-4xl">{s.value[lang]}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <Section id="services">
        <SectionHeading eyebrow={t("navServices")} title={t("servicesTitle")} subtitle={t("servicesSub")} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service) => (
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
      </Section>

      {/* FEATURED WORK */}
      <Section tone="sunken">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("navPortfolio")}
            title={t("featuredWorkTitle")}
            subtitle={t("featuredWorkSub")}
          />
          <Link
            to="/$lang/portfolio"
            params={{ lang }}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {data.projects.map((project) => {
            const metrics = (project.metrics as { label_fa?: string; label_en?: string; value?: string }[]) ?? [];
            return (
              <Link
                key={project.id}
                to="/$lang/portfolio/$slug"
                params={{ lang, slug: project.slug }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-[var(--surface-raised)] transition-all duration-500 hover:-translate-y-1 hover:shadow-frame"
              >
                <div
                  className="relative aspect-16/10 w-full overflow-hidden"
                  style={{ backgroundImage: "var(--gradient-frame)" }}
                >
                  <div className="absolute inset-0 bg-hero-glow opacity-70" aria-hidden />
                  <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
                    {((project.technologies as string[]) ?? []).slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">
                    {pickLocale(project, "industry", lang)} · {project.project_type}
                  </span>
                  <h3 className="text-lg font-semibold">{pickLocale(project, "title", lang)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pickLocale(project, "summary", lang)}
                  </p>
                  {metrics[0] ? (
                    <div className="mt-auto flex items-baseline gap-2 pt-3">
                      <span className="font-display text-2xl font-bold text-primary">{metrics[0].value}</span>
                      <span className="text-xs text-muted-foreground">
                        {lang === "fa" ? metrics[0].label_fa : metrics[0].label_en}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* WHY */}
      <Section>
        <SectionHeading eyebrow={t("navWhy")} title={t("whyTitle")} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point) => (
            <div key={point.title.en} className="rounded-3xl border border-border p-7">
              <CheckCircle2 className="mb-4 h-5 w-5 text-primary" aria-hidden />
              <h3 className="text-base font-semibold">{point.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.body[lang]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TECH */}
      <Section tone="sunken">
        <SectionHeading eyebrow={t("navTechnologies")} title={t("techTitle")} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <div key={group.group.en} className="rounded-3xl border border-border bg-[var(--surface-raised)] p-6">
              <h3 className="text-sm font-semibold text-muted-foreground">{group.group[lang]}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-border px-3 py-1.5 font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHeading eyebrow={t("navProcess")} title={t("processTitle")} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <li key={step.n} className="rounded-3xl border border-border p-7">
              <span className="font-mono text-sm text-primary">{step.n}</span>
              <h3 className="mt-3 text-base font-semibold">{step.title[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body[lang]}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* INSTALLMENTS */}
      <Section tone="sunken">
        <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-[var(--surface-raised)] p-8 sm:p-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow={t("navInstallments")}
              title={t("installmentsTitle")}
              subtitle={t("installmentsSub")}
            />
            <Link
              to="/$lang/installments"
              params={{ lang }}
              className="w-fit rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              {t("viewDetails")}
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {engagementModels[0]?.points[lang].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {point}
              </li>
            ))}
            <li className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {lang === "fa"
                ? "پیش‌پرداخت، تعداد اقساط و سررسیدها در قرارداد مشخص می‌شود."
                : "Deposit, number of installments and due dates are fixed in the contract."}
            </li>
          </ul>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeading eyebrow={t("testimonialsTitle")} title={t("testimonialsTitle")} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {data.testimonials.map((item) => (
            <figure key={item.id} className="flex flex-col gap-5 rounded-3xl border border-border p-7">
              <Quote className="h-5 w-5 text-primary" aria-hidden />
              <blockquote className="text-sm leading-relaxed">{pickLocale(item, "quote", lang)}</blockquote>
              <figcaption className="mt-auto">
                <div className="text-sm font-semibold">{pickLocale(item, "name", lang)}</div>
                <div className="text-xs text-muted-foreground">{pickLocale(item, "role", lang)}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* BLOG */}
      <Section tone="sunken">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t("navBlog")} title={t("blogTitle")} />
          <Link
            to="/$lang/blog"
            params={{ lang }}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {data.posts.map((post) => (
            <Link
              key={post.id}
              to="/$lang/blog/$slug"
              params={{ lang, slug: post.slug }}
              className="group flex flex-col gap-3 rounded-3xl border border-border bg-[var(--surface-raised)] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-frame"
            >
              <span className="text-xs text-muted-foreground">
                {post.published_at ? formatDate(lang, post.published_at) : ""} ·{" "}
                {post.reading_minutes} {lang === "fa" ? "دقیقه" : "min"}
              </span>
              <h3 className="text-base font-semibold">{pickLocale(post, "title", lang)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{pickLocale(post, "excerpt", lang)}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow={t("navFaq")} title={t("faqTitle")} />
        <div className="mt-10 flex flex-col gap-3">
          {data.faqs.map((faq) => (
            <details key={faq.id} className="group rounded-2xl border border-border p-5">
              <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
                {pickLocale(faq, "question", lang)}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pickLocale(faq, "answer", lang)}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section tone="sunken">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-[var(--surface-raised)] p-10 text-center sm:p-16">
          <div className="absolute inset-0 bg-hero-glow" aria-hidden />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">{t("ctaTitle")}</h2>
            <p className="max-w-xl text-pretty text-muted-foreground">{t("ctaSub")}</p>
            <Link
              to="/$lang/request"
              params={{ lang }}
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow duration-500 hover:shadow-glow"
            >
              {t("startProject")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
