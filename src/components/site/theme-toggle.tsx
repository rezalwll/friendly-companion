import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "@/components/theme-provider";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

const options: { mode: ThemeMode; Icon: typeof Sun; labelKey: "themeLight" | "themeDark" | "themeSystem" }[] = [
  { mode: "light", Icon: Sun, labelKey: "themeLight" },
  { mode: "dark", Icon: Moon, labelKey: "themeDark" },
  { mode: "system", Icon: Monitor, labelKey: "themeSystem" },
];

export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const { t } = useLocale();

  return (
    <div
      role="radiogroup"
      aria-label={t("theme")}
      className="flex items-center gap-0.5 rounded-full border border-border bg-secondary/60 p-0.5"
    >
      {options.map(({ mode: m, Icon, labelKey }) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          aria-label={t(labelKey)}
          title={t(labelKey)}
          onClick={() => setMode(m)}
          className={cn(
            "rounded-full p-1.5 text-muted-foreground transition-colors",
            mode === m && "bg-background text-foreground shadow-soft",
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </button>
      ))}
    </div>
  );
}
