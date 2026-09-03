import { useRouter, useRouterState } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = { fa: "فارسی", en: "English" };

export function LangSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const { lang, t } = useLocale();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function switchTo(next: Locale) {
    if (next === lang) return;
    const rest = pathname.replace(/^\/(fa|en)/, "") || "";
    void router.navigate({ to: `/${next}${rest}`, replace: false });
  }

  return (
    <div
      role="radiogroup"
      aria-label={t("language")}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-border bg-secondary/60 p-0.5",
        className,
      )}
    >
      <Languages className="mx-1.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={lang === code}
          onClick={() => switchTo(code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors",
            lang === code && "bg-background text-foreground shadow-soft",
          )}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}
