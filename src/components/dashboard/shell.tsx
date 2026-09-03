import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { LangSwitcher } from "@/components/site/lang-switcher";
import { useLocale } from "@/hooks/use-locale";

export type NavItem = { to: NonNullable<LinkProps["to"]>; label: string };

export function DashboardShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle?: string;
  nav: NavItem[];
  children: ReactNode;
}) {
  const { lang, t } = useLocale();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/$lang/auth", params: { lang }, replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-sunken)] lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 border-b border-border bg-background p-6 lg:w-72 lg:border-e lg:border-b-0">
        <Logo lang={lang} />
        <nav className="flex flex-wrap gap-1 lg:flex-col">
          {nav.map((item) => (
            <Link
              key={String(item.to)}
              to={item.to}
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/dashboard" || String(item.to) === "/admin" }}
              className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <ThemeToggle />
            <LangSwitcher />
          </div>
          <Link
            to="/$lang"
            params={{ lang }}
            className="rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            {t("goHome")}
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            {t("signOut")}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
        </header>
        {children}
      </main>
    </div>
  );
}

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-background p-6 sm:p-7">
      {title ? <h2 className="mb-4 text-base font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-6">
      <div className="font-display text-3xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] whitespace-nowrap">
      {status}
    </span>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <p className="py-6 text-sm text-muted-foreground">{text}</p>;
}
