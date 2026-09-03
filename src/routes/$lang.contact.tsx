import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { Field, SubmitButton, TextArea, TextInput } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";
import { contactSchema, submitContact } from "@/lib/leads.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/contact")({
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/contact",
      title: locale === "fa" ? "تماس با رای‌کد" : "Contact RYCODE",
      description:
        locale === "fa"
          ? "برای مشاوره فنی، برآورد پروژه یا همکاری با تیم رای‌کد تماس بگیرید."
          : "Get in touch for technical consultation, a project estimate or partnership.",
    });
  },
  component: ContactPage,
});

function ContactPage() {
  const { lang, t } = useLocale();
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      locale: lang,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("pending");
    try {
      await send({ data: parsed.data });
      setStatus("done");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow={t("navContact")}
        title={lang === "fa" ? "با ما صحبت کنید" : "Talk to us"}
        subtitle={
          lang === "fa"
            ? "پیام شما در کمتر از یک روز کاری پاسخ داده می‌شود."
            : "We reply to every message within one business day."
        }
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-3xl border border-border p-7 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={lang === "fa" ? "نام و نام خانوادگی" : "Full name"} required error={errors["name"]}>
                <TextInput name="name" required maxLength={100} autoComplete="name" />
              </Field>
              <Field label={lang === "fa" ? "ایمیل" : "Email"} required error={errors["email"]}>
                <TextInput name="email" type="email" required maxLength={255} autoComplete="email" dir="ltr" />
              </Field>
              <Field label={lang === "fa" ? "شماره تماس" : "Phone"} error={errors["phone"]}>
                <TextInput name="phone" maxLength={40} autoComplete="tel" dir="ltr" />
              </Field>
              <Field label={lang === "fa" ? "موضوع" : "Subject"} error={errors["subject"]}>
                <TextInput name="subject" maxLength={140} />
              </Field>
            </div>
            <Field label={lang === "fa" ? "پیام" : "Message"} required error={errors["message"]}>
              <TextArea name="message" required maxLength={4000} />
            </Field>
            <div className="flex flex-wrap items-center gap-4">
              <SubmitButton pending={status === "pending"}>
                {status === "pending" ? t("loading") : t("send")}
              </SubmitButton>
              {status === "done" && (
                <span className="text-sm text-primary" role="status">
                  {lang === "fa" ? "پیام شما ثبت شد." : "Your message has been received."}
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-destructive" role="alert">
                  {t("errorTitle")}
                </span>
              )}
            </div>
          </form>

          <aside className="flex h-fit flex-col gap-5 rounded-3xl border border-border bg-[var(--surface-raised)] p-7">
            <h2 className="text-lg font-semibold">{lang === "fa" ? "راه‌های ارتباطی" : "Other channels"}</h2>
            <a href="mailto:hello@rycode.ir" className="flex items-center gap-3 text-sm hover:text-primary">
              <Mail className="h-4 w-4" aria-hidden /> hello@rycode.ir
            </a>
            <a href="tel:+982100000000" className="flex items-center gap-3 text-sm hover:text-primary" dir="ltr">
              <Phone className="h-4 w-4" aria-hidden /> +98 21 0000 0000
            </a>
            <p className="flex items-start gap-3 text-sm text-muted-foreground">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {lang === "fa"
                ? "مشتریان فعلی می‌توانند از سامانه تیکت در پنل کاربری استفاده کنند."
                : "Existing clients can use the ticket system inside their dashboard."}
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
