import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/hooks/use-locale";

type Node = { id: string; x: number; y: number; label: { fa: string; en: string } };

const nodes: Node[] = [
  { id: "client", x: 12, y: 20, label: { fa: "کلاینت", en: "Client" } },
  { id: "edge", x: 38, y: 10, label: { fa: "لبه / CDN", en: "Edge / CDN" } },
  { id: "api", x: 50, y: 42, label: { fa: "API", en: "API" } },
  { id: "auth", x: 22, y: 62, label: { fa: "احراز هویت", en: "Auth" } },
  { id: "db", x: 78, y: 30, label: { fa: "پایگاه داده", en: "Database" } },
  { id: "jobs", x: 72, y: 72, label: { fa: "پردازش پس‌زمینه", en: "Workers" } },
  { id: "ai", x: 44, y: 84, label: { fa: "سرویس هوش مصنوعی", en: "AI service" } },
];

const edges: [string, string][] = [
  ["client", "edge"],
  ["edge", "api"],
  ["client", "auth"],
  ["auth", "api"],
  ["api", "db"],
  ["api", "jobs"],
  ["jobs", "db"],
  ["api", "ai"],
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

/**
 * Animated system-architecture diagram. Data flows along the edges to suggest
 * a running production system rather than a decorative developer illustration.
 */
export function HeroVisual() {
  const { lang } = useLocale();
  const [active, setActive] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % edges.length), 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] border border-border bg-[var(--surface-raised)] shadow-frame"
      role="img"
      aria-label={
        lang === "fa"
          ? "نمودار معماری یک سیستم نرم‌افزاری در حال اجرا"
          : "Diagram of a running software system architecture"
      }
    >
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <g>
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="var(--color-border)"
              strokeWidth="0.15"
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="100"
              stroke="var(--color-border)"
              strokeWidth="0.15"
            />
          ))}
        </g>
        {edges.map(([from, to], index) => {
          const a = byId(from);
          const b = byId(to);
          const isActive = index === active;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#edgeGrad)"
                strokeWidth={isActive ? 0.7 : 0.35}
                style={{ transition: "stroke-width 600ms var(--ease-cinematic)" }}
              />
              {isActive && (
                <circle r="1.1" fill="var(--color-primary)">
                  <animate attributeName="cx" from={a.x} to={b.x} dur="1.2s" fill="freeze" />
                  <animate attributeName="cy" from={a.y} to={b.y} dur="1.2s" fill="freeze" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background/85 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap shadow-soft backdrop-blur-sm"
          style={{ insetInlineStart: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label[lang]}
        </div>
      ))}

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3 text-[11px] backdrop-blur-md">
        <span className="font-mono text-muted-foreground">uptime 99.98%</span>
        <span className="font-mono text-muted-foreground">p95 142ms</span>
        <span className="flex items-center gap-1.5 font-mono text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden />
          live
        </span>
      </div>
    </div>
  );
}
