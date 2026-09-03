import type { ReactNode } from "react";
import { Container, Eyebrow, Section } from "@/components/site/section";
import { useLocale } from "@/hooks/use-locale";
import type { PageDef } from "@/lib/page-content";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string | undefined;
  title: string;
  subtitle?: string | undefined;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <Container className="relative flex flex-col items-start gap-5 py-16 sm:py-24">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

/** Renders a fully bilingual static page defined in src/lib/static-pages.ts */
export function StaticPage({ def, children }: { def: PageDef; children?: ReactNode }) {
  const { lang } = useLocale();

  return (
    <>
      <PageHero eyebrow={def.eyebrow[lang]} title={def.title[lang]} subtitle={def.subtitle[lang]} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {def.blocks.map((block) => (
            <article
              key={block.title.en}
              className="rounded-3xl border border-border bg-[var(--surface-raised)] p-7 sm:p-8"
            >
              <h2 className="text-lg font-semibold">{block.title[lang]}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.body[lang]}</p>
              {block.points ? (
                <ul className="mt-4 flex flex-col gap-2">
                  {block.points[lang].map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
        {children}
      </Section>
    </>
  );
}
