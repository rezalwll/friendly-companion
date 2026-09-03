import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import { getFaqs } from "@/lib/public-content.functions";
import { buildHead, jsonLd } from "@/lib/seo";
import { isLocale, pickLocale, type Locale } from "@/lib/i18n";

const faqQuery = queryOptions({ queryKey: ["faqs"], queryFn: () => getFaqs({ data: {} }) });

export const Route = createFileRoute("/$lang/faq")({
  loader: ({ context }) => context.queryClient.ensureQueryData(faqQuery),
  head: ({ params, loaderData }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    const head = buildHead({
      locale,
      path: "/faq",
      title: locale === "fa" ? "سؤالات متداول | رای‌کد" : "Frequently asked questions | RYCODE",
      description:
        locale === "fa"
          ? "پاسخ سؤالات رایج درباره قیمت، زمان تحویل، پرداخت اقساطی، پشتیبانی و مالکیت کد."
          : "Answers about pricing, timelines, installments, support and code ownership.",
    });
    const faqs = loaderData ?? [];
    return {
      ...head,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: pickLocale(faq, "question", locale),
            acceptedAnswer: { "@type": "Answer", text: pickLocale(faq, "answer", locale) },
          })),
        }),
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  const { lang, t } = useLocale();
  const { data: faqs } = useSuspenseQuery(faqQuery);
  const scopes = Array.from(new Set(faqs.map((faq) => faq.scope ?? "general")));

  return (
    <>
      <PageHero
        eyebrow={t("navFaq")}
        title={t("faqTitle")}
        subtitle={
          lang === "fa"
            ? "اگر پاسخ سؤال شما اینجا نبود، از طریق صفحه تماس بپرسید."
            : "If your question isn't answered here, ask us on the contact page."
        }
      />
      <Section>
        <div className="flex flex-col gap-12">
          {scopes.map((scope) => (
            <div key={scope}>
              <h2 className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">{scope}</h2>
              <div className="flex flex-col gap-3">
                {faqs
                  .filter((faq) => (faq.scope ?? "general") === scope)
                  .map((faq) => (
                    <details key={faq.id} className="rounded-2xl border border-border p-5">
                      <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
                        {pickLocale(faq, "question", lang)}
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {pickLocale(faq, "answer", lang)}
                      </p>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
