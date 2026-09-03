import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  children,
  id,
  tone = "default",
}: {
  className?: string;
  children: ReactNode;
  id?: string;
  tone?: "default" | "sunken";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "sunken" && "bg-[var(--surface-sunken)]",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-4", align === "center" && "mx-auto text-center items-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className="text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</Tag>
      {subtitle ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
