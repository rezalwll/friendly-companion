import { Link } from "@tanstack/react-router";
import logo from "@/assets/rycode-logo.png.asset.json";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Logo({
  lang,
  className,
  compact = false,
}: {
  lang: Locale;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/$lang"
      params={{ lang }}
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="RYCODE"
    >
      <img
        src={logo.url}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight">RYCODE</span>
          <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
            {lang === "fa" ? "رای‌کد" : "SOFTWARE STUDIO"}
          </span>
        </span>
      )}
    </Link>
  );
}
