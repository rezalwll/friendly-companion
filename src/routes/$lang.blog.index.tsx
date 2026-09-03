import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getCategories, getPosts } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { formatDate, isLocale, pickLocale, type Locale } from "@/lib/i18n";

const postsQuery = queryOptions({ queryKey: ["posts", "all"], queryFn: () => getPosts({ data: {} }) });
const categoriesQuery = queryOptions({ queryKey: ["categories"], queryFn: () => getCategories() });

export const Route = createFileRoute("/$lang/blog/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(postsQuery),
      context.queryClient.ensureQueryData(categoriesQuery),
    ]);
  },
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/blog",
      title: locale === "fa" ? "مقالات مهندسی نرم‌افزار | رای‌کد" : "Engineering articles | RYCODE",
      description:
        locale === "fa"
          ? "مقالاتی درباره معماری نرم‌افزار، کارایی، سئوی تکنیکال، اتوماسیون و هوش مصنوعی."
          : "Articles on software architecture, performance, technical SEO, automation and AI.",
    });
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { lang, t } = useLocale();
  const { data: posts } = useSuspenseQuery(postsQuery);
  const { data: categories } = useSuspenseQuery(categoriesQuery);

  return (
    <>
      <PageHero
        eyebrow={t("navBlog")}
        title={t("blogTitle")}
        subtitle={
          lang === "fa"
            ? "آنچه در پروژه‌های واقعی یاد گرفته‌ایم، بدون شعار."
            : "What we've learned on real projects, without the marketing gloss."
        }
      />
      <Section>
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/$lang/blog/category/$slug"
                params={{ lang, slug: category.slug }}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
              >
                {pickLocale(category, "name", lang)}
              </Link>
            ))}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              to="/$lang/blog/$slug"
              params={{ lang, slug: post.slug }}
              className="group flex flex-col gap-3 rounded-3xl border border-border bg-[var(--surface-raised)] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-frame"
            >
              <span className="text-xs text-muted-foreground">
                {post.published_at ? formatDate(lang, post.published_at) : ""} · {post.reading_minutes}{" "}
                {lang === "fa" ? "دقیقه" : "min"}
              </span>
              <h2 className="text-base font-semibold">{pickLocale(post, "title", lang)}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{pickLocale(post, "excerpt", lang)}</p>
              <span className="mt-auto pt-3 text-sm font-medium text-primary">{t("readMore")}</span>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-sm text-muted-foreground">{t("empty")}</p>}
        </div>
      </Section>
    </>
  );
}
