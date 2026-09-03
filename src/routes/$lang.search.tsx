import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { TextInput } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";
import { searchSite } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";

const searchParams = z.object({ q: z.string().max(120).optional() });

export const Route = createFileRoute("/$lang/search")({
  validateSearch: searchParams,
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/search",
      title: locale === "fa" ? "جست‌وجو | رای‌کد" : "Search | RYCODE",
      description:
        locale === "fa" ? "جست‌وجو در خدمات، نمونه‌کارها و مقالات رای‌کد." : "Search RYCODE services, work and articles.",
      noindex: true,
    });
  },
  component: SearchPage,
});

function SearchPage() {
  const { lang, t } = useLocale();
  const navigate = useNavigate();
  const { q } = Route.useSearch();
  const term = q ?? "";

  const { data, isFetching } = useQuery({
    queryKey: ["search", term],
    queryFn: () => searchSite({ data: { q: term } }),
    enabled: term.trim().length > 1,
  });

  return (
    <>
      <PageHero title={t("navSearch")} />
      <Section>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const value = String(new FormData(event.currentTarget).get("q") ?? "");
            void navigate({ to: "/$lang/search", params: { lang }, search: { q: value } });
          }}
          className="mb-10 flex max-w-xl gap-3"
        >
          <TextInput
            name="q"
            defaultValue={term}
            maxLength={120}
            placeholder={lang === "fa" ? "چه چیزی را جست‌وجو می‌کنید؟" : "What are you looking for?"}
            aria-label={t("navSearch")}
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {t("navSearch")}
          </button>
        </form>

        {isFetching && <p className="text-sm text-muted-foreground">{t("loading")}</p>}

        {data && (
          <div className="flex flex-col gap-10">
            <ResultGroup title={t("navServices")}>
              {data.services.map((item) => (
                <Link
                  key={item.slug}
                  to="/$lang/services/$slug"
                  params={{ lang, slug: item.slug }}
                  className="rounded-2xl border border-border p-5 transition-colors hover:bg-secondary"
                >
                  <div className="text-sm font-semibold">{pickLocale(item, "title", lang)}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{pickLocale(item, "excerpt", lang)}</p>
                </Link>
              ))}
            </ResultGroup>
            <ResultGroup title={t("navPortfolio")}>
              {data.projects.map((item) => (
                <Link
                  key={item.slug}
                  to="/$lang/portfolio/$slug"
                  params={{ lang, slug: item.slug }}
                  className="rounded-2xl border border-border p-5 transition-colors hover:bg-secondary"
                >
                  <div className="text-sm font-semibold">{pickLocale(item, "title", lang)}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{pickLocale(item, "summary", lang)}</p>
                </Link>
              ))}
            </ResultGroup>
            <ResultGroup title={t("navBlog")}>
              {data.posts.map((item) => (
                <Link
                  key={item.slug}
                  to="/$lang/blog/$slug"
                  params={{ lang, slug: item.slug }}
                  className="rounded-2xl border border-border p-5 transition-colors hover:bg-secondary"
                >
                  <div className="text-sm font-semibold">{pickLocale(item, "title", lang)}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{pickLocale(item, "excerpt", lang)}</p>
                </Link>
              ))}
            </ResultGroup>
          </div>
        )}
      </Section>
    </>
  );
}

function ResultGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  if (items.filter(Boolean).length === 0) return null;
  return (
    <section>
      <h2 className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">{children}</div>
    </section>
  );
}
