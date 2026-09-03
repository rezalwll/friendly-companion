import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, LayoutDashboard, Menu, Search, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitcher } from "./lang-switcher";
import { Container } from "./section";
import { useLocale } from "@/hooks/use-locale";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import type { TKey } from "@/lib/i18n";

type NavItem = { to: string; key: TKey };

const primaryNav: NavItem[] = [
  { to: "/$lang/services", key: "navServices" },
  { to: "/$lang/portfolio", key: "navPortfolio" },
  { to: "/$lang/process", key: "navProcess" },
  { to: "/$lang/pricing", key: "navPricing" },
  { to: "/$lang/blog", key: "navBlog" },
  { to: "/$lang/contact", key: "navContact" },
];

const moreNav: NavItem[] = [
  { to: "/$lang/about", key: "navAbout" },
  { to: "/$lang/why", key: "navWhy" },
  { to: "/$lang/technologies", key: "navTechnologies" },
  { to: "/$lang/installments", key: "navInstallments" },
  { to: "/$lang/faq", key: "navFaq" },
  { to: "/$lang/support", key: "navSupport" },
  { to: "/$lang/careers", key: "navCareers" },
];

export function SiteHeader() {
  const { lang, t } = useLocale();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-500",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Logo lang={lang} />

        <nav aria-label={t("navMore")} className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={{ lang }}
              activeProps={{ className: "text-foreground" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t("navMore")}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} aria-hidden />
            </button>
            {moreOpen && (
              <div className="absolute end-0 top-full mt-2 w-56 rounded-2xl border border-border bg-popover p-2 shadow-frame">
                {moreNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    params={{ lang }}
                    className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/$lang/search"
            params={{ lang }}
            aria-label={t("navSearch")}
            className="hidden rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Search className="h-4 w-4" aria-hidden />
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="hidden md:block">
            <LangSwitcher />
          </div>
          {user ? (
            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:inline-flex"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden />
              {t("dashboard")}
            </Link>
          ) : (
            <Link
              to="/$lang/auth"
              params={{ lang }}
              className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:inline-flex"
            >
              {t("signIn")}
            </Link>
          )}
          <Link
            to="/$lang/request"
            params={{ lang }}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-glow lg:inline-flex"
          >
            {t("startProject")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="rounded-full border border-border p-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <Container className="flex flex-col gap-1 py-5">
            {[...primaryNav, ...moreNav].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                params={{ lang }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ThemeToggle />
              <LangSwitcher />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to={user ? "/dashboard" : "/$lang/auth"}
                params={{ lang }}
                className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium"
              >
                {user ? t("dashboard") : t("signIn")}
              </Link>
              <Link
                to="/$lang/request"
                params={{ lang }}
                className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                {t("startProject")}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
