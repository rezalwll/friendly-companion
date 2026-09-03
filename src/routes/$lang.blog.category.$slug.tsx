import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getPosts } from "@/lib/public-content.functions";
import { buildHead } from "@/lib/seo";
import { formatDate, isLocale, pickLocale, type Locale } from "@/lib/i18n";

const categoryPostsQuery = (slug: string) =>
  queryOptions({ queryKey: ["posts", slug], queryFn: () => getPosts({ data: { category: slug } }) });

export const Route = createFileRoute("/$lang/blog/category/$slug")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(categoryPostsQuery(params.slug)),
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: `/blog/category/${params.slug}`,
      title:
        locale === "fa"
          ? `مقالات دسته ${params.slug} | رای‌کد`
          : `${params.slug} articles | RYCODE`,
      description:
        locale === "fa"
          ? "مقالات فنی رای‌کد در این دسته‌بندی."
          : "RYCODE technical articles in this category.",
    });
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { lang, t } = useLocale();
  const { slug } = Route.useParams();
  const { data: posts } = useSuspenseQuery(categoryPostsQuery(slug));
  const category = posts[0]?.blog_categories;

  return (
    <>
      <PageHero
        eyebrow={t("navBlog")}
        title={category ? pickLocale(category, "name", lang) : slug}
        subtitle={lang === "fa" ? "مقالات این دسته‌بندی" : "Articles in this category"}
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              to="/$lang/blog/$slug"
              params={{ lang, slug: post.slug }}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-[var(--surface-raised)] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-frame"
            >
              <span className="text-xs text-muted-foreground">
                {post.published_at ? formatDate(lang, post.published_at) : ""}
              </span>
              <h2 className="text-base font-semibold">{pickLocale(post, "title", lang)}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{pickLocale(post, "excerpt", lang)}</p>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-sm text-muted-foreground">{t("empty")}</p>}
        </div>
      </Section>
    </>
  );
}
