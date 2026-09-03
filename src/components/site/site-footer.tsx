import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Logo } from "./logo";
import { Container } from "./section";
import { useLocale } from "@/hooks/use-locale";
import { subscribeNewsletter } from "@/lib/leads.functions";
import type { TKey } from "@/lib/i18n";

const companyLinks: { to: string; key: TKey }[] = [
  { to: "/$lang/about", key: "navAbout" },
  { to: "/$lang/why", key: "navWhy" },
  { to: "/$lang/process", key: "navProcess" },
  { to: "/$lang/technologies", key: "navTechnologies" },
  { to: "/$lang/careers", key: "navCareers" },
  { to: "/$lang/contact", key: "navContact" },
];

const serviceLinks: { to: string; key: TKey }[] = [
  { to: "/$lang/services", key: "navServices" },
  { to: "/$lang/portfolio", key: "navPortfolio" },
  { to: "/$lang/pricing", key: "navPricing" },
  { to: "/$lang/installments", key: "navInstallments" },
  { to: "/$lang/blog", key: "navBlog" },
  { to: "/$lang/support", key: "navSupport" },
];

const legalLinks: { to: string; key: TKey }[] = [
  { to: "/$lang/privacy", key: "privacy" },
  { to: "/$lang/terms", key: "terms" },
  { to: "/$lang/cookies", key: "cookies" },
  { to: "/$lang/faq", key: "navFaq" },
];

export function SiteFooter() {
  const { lang, t } = useLocale();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const subscribe = useServerFn(subscribeNewsletter);

  async function onSubscribe(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      toast.error(lang === "fa" ? "ایمیل معتبر وارد کنید" : "Enter a valid email");
      return;
    }
    setBusy(true);
    try {
      await subscribe({ data: { email, locale: lang } });
      setEmail("");
      toast.success(lang === "fa" ? "عضویت شما ثبت شد" : "You're subscribed");
    } catch {
      toast.error(lang === "fa" ? "ثبت نشد، دوباره تلاش کنید" : "Could not subscribe, try again");
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="border-t border-border bg-[var(--surface-sunken)]">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo lang={lang} />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("tagline")}</p>
            <form onSubmit={onSubscribe} className="flex max-w-sm flex-col gap-2">
              <label htmlFor="footer-email" className="text-sm font-semibold">
                {t("newsletterTitle")}
              </label>
              <p className="text-xs text-muted-foreground">{t("newsletterSub")}</p>
              <div className="mt-1 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  maxLength={255}
                  className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {t("subscribe")}
                </button>
              </div>
            </form>
          </div>

          <FooterColumn title={t("footerCompany")} links={companyLinks} lang={lang} />
          <FooterColumn title={t("footerServices")} links={serviceLinks} lang={lang} />
          <FooterColumn title={t("footerLegal")} links={legalLinks} lang={lang} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} RYCODE · rycode.ir — {t("footerRights")}
          </p>
          <p>{lang === "fa" ? "ساخته‌شده با دقت مهندسی" : "Built with engineering rigour"}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  lang,
}: {
  title: string;
  links: { to: string; key: TKey }[];
  lang: "fa" | "en";
}) {
  const { t } = useLocale();
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              params={{ lang }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
