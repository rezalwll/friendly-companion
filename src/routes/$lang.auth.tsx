import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { Field, SubmitButton, TextInput } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const credentials = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
  full_name: z.string().trim().max(100).optional(),
});

export const Route = createFileRoute("/$lang/auth")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/auth",
      title: locale === "fa" ? "ورود و ثبت‌نام | رای‌کد" : "Sign in | RYCODE",
      description:
        locale === "fa"
          ? "به پنل کاربری رای‌کد وارد شوید تا پروژه‌ها، اقساط و تیکت‌های خود را مدیریت کنید."
          : "Sign in to the RYCODE dashboard to manage projects, installments and tickets.",
      noindex: true,
    });
  },
  component: AuthPage,
});

function AuthPage() {
  const { lang, t } = useLocale();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState<"idle" | "pending">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = credentials.safeParse({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      full_name: String(form.get("full_name") ?? ""),
    });
    if (!parsed.success) {
      setError(lang === "fa" ? "ایمیل یا رمز عبور معتبر نیست (حداقل ۸ کاراکتر)." : "Invalid email or password (min 8 characters).");
      return;
    }
    setError(null);
    setMessage(null);
    setStatus("pending");

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setStatus("idle");
      if (signInError) {
        setError(lang === "fa" ? "ورود ناموفق بود. اطلاعات را بررسی کنید." : "Sign in failed. Check your details.");
        return;
      }
      void navigate({ to: "/dashboard", replace: true });
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/${lang}/auth`,
        data: { full_name: parsed.data.full_name ?? "" },
      },
    });
    setStatus("idle");
    if (signUpError) {
      setError(lang === "fa" ? "ثبت‌نام انجام نشد. شاید این ایمیل قبلاً ثبت شده باشد." : "Sign up failed. This email may already exist.");
      return;
    }
    setMessage(
      lang === "fa"
        ? "حساب ساخته شد. اگر تأیید ایمیل فعال باشد، لینک تأیید برای شما ارسال شده است."
        : "Account created. If email confirmation is enabled, check your inbox for the link.",
    );
  }

  async function signInWithGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(lang === "fa" ? "ورود با گوگل انجام نشد." : "Google sign-in failed.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/dashboard", replace: true });
  }

  return (
    <>
      <PageHero
        eyebrow={t("dashboard")}
        title={mode === "signin" ? t("signIn") : t("signUp")}
        subtitle={
          lang === "fa"
            ? "با حساب کاربری، پروژه‌ها، فاکتورها، اقساط و تیکت‌های پشتیبانی خود را مدیریت کنید."
            : "Manage your projects, invoices, installments and support tickets in one place."
        }
      />
      <Section>
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl border border-border p-7 sm:p-9">
          <div className="grid grid-cols-2 gap-1 rounded-full border border-border p-1">
            {(["signin", "signup"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  mode === value ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {value === "signin" ? t("signIn") : t("signUp")}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            {lang === "fa" ? "ورود با گوگل" : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {lang === "fa" ? "یا" : "or"}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <Field label={lang === "fa" ? "نام و نام خانوادگی" : "Full name"}>
                <TextInput name="full_name" maxLength={100} autoComplete="name" />
              </Field>
            )}
            <Field label={lang === "fa" ? "ایمیل" : "Email"} required>
              <TextInput name="email" type="email" required dir="ltr" autoComplete="email" maxLength={255} />
            </Field>
            <Field
              label={lang === "fa" ? "رمز عبور" : "Password"}
              required
              hint={lang === "fa" ? "حداقل ۸ کاراکتر" : "At least 8 characters"}
            >
              <TextInput
                name="password"
                type="password"
                required
                dir="ltr"
                minLength={8}
                maxLength={72}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </Field>
            <SubmitButton pending={status === "pending"} className="w-full">
              {status === "pending" ? t("loading") : mode === "signin" ? t("signIn") : t("signUp")}
            </SubmitButton>
          </form>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-primary" role="status">
              {message}
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
