import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40";

export function Field({
  label,
  hint,
  error,
  children,
  required,
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  required?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </span>
      {children}
      {hint && !error ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, className)} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, "min-h-32 resize-y", className)} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(base, className)}>
      {children}
    </select>
  );
}

export function SubmitButton({
  children,
  pending,
  className,
}: {
  children: React.ReactNode;
  pending?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-shadow duration-500 hover:shadow-glow disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}
