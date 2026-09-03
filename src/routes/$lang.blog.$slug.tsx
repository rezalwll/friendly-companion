import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/page-shell";
import { Container, Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getPost } from "@/lib/public-content.functions";
import { buildHead, jsonLd } from "@/lib/seo";
import { formatDate, isLocale, pickLocale, type Locale } from "@/lib/i18n";

const postQuery = (slug: string) =>
  queryOptions({ queryKey: ["post", slug], queryFn: () => getPost({ data: { slug } }) });

export const Route = createFileRoute("/$lang/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    if (!loaderData) {
      return buildHead({
        locale,
        path: `/blog/${params.slug}`,
        title: locale === "fa" ? "مقاله یافت نشد | رای‌کد" : "Article not found | RYCODE",
        description: locale === "fa" ? "این مقاله در دسترس نیست." : "This article is unavailable.",
        noindex: true,
      });
    }
    const title = pickLocale(loaderData, "seo_title", locale) || pickLocale(loaderData, "title", locale);
    const description =
      pickLocale(loaderData, "seo_desc", locale) || pickLocale(loaderData, "excerpt", locale);
    const head = buildHead({ locale, path: `/blog/${params.slug}`, title, description, type: "article" });
    return {
      ...head,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: pickLocale(loaderData, "title", locale),
          description,
          datePublished: loaderData.published_at,
          inLanguage: locale,
          publisher: { "@type": "Organization", name: "RYCODE" },
        }),
      ],
    };
  },
  component: PostDetail,
});

function PostDetail() {
  const { lang } = useLocale();
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(postQuery(slug));
  if (!data) return null;

  const author = data.authors as { name_fa?: string; name_en?: string; role_fa?: string; role_en?: string } | null;
  const body = pickLocale(data, "body", lang);

  return (
    <>
      <PageHero
        eyebrow={data.published_at ? formatDate(lang, data.published_at) : undefined}
        title={pickLocale(data, "title", lang)}
        subtitle={pickLocale(data, "excerpt", lang)}
      />
      <Section>
        <Container className="max-w-3xl px-0">
          <article className="flex flex-col gap-5 text-base leading-loose text-muted-foreground">
            {body.split("\n\n").map((paragraph, index) =>
              paragraph.startsWith("## ") ? (
                <h2 key={index} className="mt-4 text-xl font-semibold text-foreground">
                  {paragraph.replace("## ", "")}
                </h2>
              ) : (
                <p key={index}>{paragraph}</p>
              ),
            )}
          </article>
          {author ? (
            <div className="mt-12 rounded-3xl border border-border p-6">
              <div className="text-sm font-semibold">{lang === "fa" ? author.name_fa : author.name_en}</div>
              <div className="text-xs text-muted-foreground">{lang === "fa" ? author.role_fa : author.role_en}</div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
