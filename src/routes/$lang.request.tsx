import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-shell";
import { Section } from "@/components/site/section";
import { Field, Select, SubmitButton, TextArea, TextInput } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";
import { requestSchema, submitProjectRequest } from "@/lib/leads.functions";
import { buildHead } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ service: z.string().max(120).optional() });

export const Route = createFileRoute("/$lang/request")({
  validateSearch: searchSchema,
  head: ({ params }) => {
    const locale = (isLocale(params.lang) ? params.lang : "fa") as Locale;
    return buildHead({
      locale,
      path: "/request",
      title: locale === "fa" ? "ثبت درخواست پروژه | رای‌کد" : "Submit a project request | RYCODE",
      description:
        locale === "fa"
          ? "پروژه خود را در چند مرحله توضیح دهید و کمتر از یک روز کاری تحلیل فنی و برآورد دریافت کنید."
          : "Describe your project in a few steps and get a technical analysis and estimate within one business day.",
    });
  },
  component: RequestPage,
});

const categories = [
  { value: "website", fa: "وب‌سایت", en: "Website" },
  { value: "ecommerce", fa: "فروشگاه اینترنتی", en: "E-commerce" },
  { value: "webapp", fa: "وب‌اپلیکیشن", en: "Web application" },
  { value: "mobile", fa: "اپلیکیشن موبایل", en: "Mobile app" },
  { value: "custom-software", fa: "نرم‌افزار اختصاصی", en: "Custom software" },
  { value: "api", fa: "API و یکپارچه‌سازی", en: "API & integration" },
  { value: "automation", fa: "اتوماسیون و اکسل", en: "Automation & Excel" },
  { value: "seo", fa: "سئو و کارایی", en: "SEO & performance" },
  { value: "maintenance", fa: "نگهداری و رفع باگ", en: "Maintenance & bug fixing" },
  { value: "ai", fa: "راهکار هوش مصنوعی", en: "AI solution" },
  { value: "other", fa: "سایر", en: "Other" },
];

const budgets = ["<50m", "50-150m", "150-400m", "400m+", "unknown"];
const timelines = ["asap", "1-3-months", "3-6-months", "flexible"];

const budgetLabel: Record<string, { fa: string; en: string }> = {
  "<50m": { fa: "کمتر از ۵۰ میلیون تومان", en: "Under 50M IRT" },
  "50-150m": { fa: "۵۰ تا ۱۵۰ میلیون تومان", en: "50–150M IRT" },
  "150-400m": { fa: "۱۵۰ تا ۴۰۰ میلیون تومان", en: "150–400M IRT" },
  "400m+": { fa: "بیش از ۴۰۰ میلیون تومان", en: "Over 400M IRT" },
  unknown: { fa: "هنوز مشخص نیست", en: "Not sure yet" },
};
const timelineLabel: Record<string, { fa: string; en: string }> = {
  asap: { fa: "در اسرع وقت", en: "As soon as possible" },
  "1-3-months": { fa: "۱ تا ۳ ماه", en: "1–3 months" },
  "3-6-months": { fa: "۳ تا ۶ ماه", en: "3–6 months" },
  flexible: { fa: "انعطاف‌پذیر", en: "Flexible" },
};

type FormState = z.input<typeof requestSchema>;

function RequestPage() {
  const { lang, t } = useLocale();
  const { service } = Route.useSearch();
  const send = useServerFn(submitProjectRequest);

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormState>({
    full_name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    preferred_contact: "email",
    category: service ?? "website",
    description: "",
    existing_url: "",
    budget_range: "",
    timeline: "",
    needs_consultation: false,
    needs_installments: false,
    notes: "",
    locale: lang,
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const steps = [
    { fa: "نوع پروژه", en: "Project type" },
    { fa: "جزئیات", en: "Details" },
    { fa: "بودجه و زمان", en: "Budget & timeline" },
    { fa: "اطلاعات تماس", en: "Contact details" },
  ];

  async function submit() {
    const parsed = requestSchema.safeParse({ ...form, locale: lang });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("pending");
    try {
      const result = await send({ data: parsed.data });
      setReference(result.reference);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <>
        <PageHero
          eyebrow={t("startProject")}
          title={lang === "fa" ? "درخواست شما ثبت شد" : "Your request has been submitted"}
          subtitle={
            lang === "fa"
              ? "تیم ما درخواست را بررسی می‌کند و کمتر از یک روز کاری با شما تماس می‌گیرد."
              : "Our team will review it and get back to you within one business day."
          }
        />
        <Section>
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-border p-8">
            {reference ? (
              <p className="text-sm">
                {lang === "fa" ? "کد پیگیری: " : "Reference: "}
                <span className="font-mono font-semibold text-primary">{reference}</span>
              </p>
            ) : null}
            <Link
              to="/$lang"
              params={{ lang }}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              {t("goHome")}
            </Link>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={t("startProject")}
        title={lang === "fa" ? "پروژه‌ات را توضیح بده" : "Tell us about your project"}
        subtitle={
          lang === "fa"
            ? "چهار مرحله کوتاه. هرچه دقیق‌تر بنویسید، برآورد دقیق‌تری دریافت می‌کنید."
            : "Four short steps. The more precise your input, the more precise the estimate."
        }
      />
      <Section>
        <ol className="mb-10 flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <li
              key={label.en}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                index === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : index < step
                    ? "border-border text-primary"
                    : "border-border text-muted-foreground",
              )}
            >
              {index < step ? <Check className="h-3.5 w-3.5" aria-hidden /> : <span>{index + 1}</span>}
              {label[lang]}
            </li>
          ))}
        </ol>

        <div className="flex max-w-2xl flex-col gap-5 rounded-3xl border border-border p-7 sm:p-9">
          {step === 0 && (
            <>
              <Field label={lang === "fa" ? "دسته‌بندی پروژه" : "Project category"} required error={errors["category"]}>
                <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item[lang]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field
                label={lang === "fa" ? "آدرس سایت یا سیستم فعلی" : "Existing site or system URL"}
                hint={lang === "fa" ? "اگر پروژه موجود دارید" : "If you already have one"}
                error={errors["existing_url"]}
              >
                <TextInput
                  dir="ltr"
                  value={form.existing_url}
                  onChange={(e) => set("existing_url", e.target.value)}
                  maxLength={300}
                />
              </Field>
            </>
          )}

          {step === 1 && (
            <Field
              label={lang === "fa" ? "توضیح پروژه" : "Project description"}
              required
              hint={lang === "fa" ? "حداقل ۲۰ کاراکتر" : "At least 20 characters"}
              error={errors["description"]}
            >
              <TextArea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                maxLength={6000}
                className="min-h-48"
              />
            </Field>
          )}

          {step === 2 && (
            <>
              <Field label={lang === "fa" ? "بودجه تقریبی" : "Approximate budget"} error={errors["budget_range"]}>
                <Select value={form.budget_range} onChange={(e) => set("budget_range", e.target.value)}>
                  <option value="">{lang === "fa" ? "انتخاب کنید" : "Select"}</option>
                  {budgets.map((value) => (
                    <option key={value} value={value}>
                      {budgetLabel[value]?.[lang]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={lang === "fa" ? "بازه زمانی" : "Timeline"} error={errors["timeline"]}>
                <Select value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                  <option value="">{lang === "fa" ? "انتخاب کنید" : "Select"}</option>
                  {timelines.map((value) => (
                    <option key={value} value={value}>
                      {timelineLabel[value]?.[lang]}
                    </option>
                  ))}
                </Select>
              </Field>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.needs_installments ?? false}
                  onChange={(e) => set("needs_installments", e.target.checked)}
                  className="h-4 w-4 rounded border-border"
                />
                {lang === "fa" ? "به پرداخت اقساطی نیاز دارم" : "I would like an installment plan"}
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.needs_consultation ?? false}
                  onChange={(e) => set("needs_consultation", e.target.checked)}
                  className="h-4 w-4 rounded border-border"
                />
                {lang === "fa" ? "جلسه مشاوره فنی می‌خواهم" : "I'd like a technical consultation call"}
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={lang === "fa" ? "نام و نام خانوادگی" : "Full name"} required error={errors["full_name"]}>
                  <TextInput value={form.full_name} onChange={(e) => set("full_name", e.target.value)} maxLength={100} />
                </Field>
                <Field label={lang === "fa" ? "شرکت" : "Company"} error={errors["company"]}>
                  <TextInput value={form.company} onChange={(e) => set("company", e.target.value)} maxLength={120} />
                </Field>
                <Field label={lang === "fa" ? "ایمیل" : "Email"} required error={errors["email"]}>
                  <TextInput
                    dir="ltr"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    maxLength={255}
                  />
                </Field>
                <Field label={lang === "fa" ? "شماره تماس" : "Phone"} error={errors["phone"]}>
                  <TextInput dir="ltr" value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={40} />
                </Field>
                <Field label={lang === "fa" ? "کشور" : "Country"} error={errors["country"]}>
                  <TextInput value={form.country} onChange={(e) => set("country", e.target.value)} maxLength={80} />
                </Field>
                <Field label={lang === "fa" ? "روش ارتباط ترجیحی" : "Preferred contact"}>
                  <Select
                    value={form.preferred_contact}
                    onChange={(e) => set("preferred_contact", e.target.value as FormState["preferred_contact"])}
                  >
                    <option value="email">{lang === "fa" ? "ایمیل" : "Email"}</option>
                    <option value="phone">{lang === "fa" ? "تماس تلفنی" : "Phone"}</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                  </Select>
                </Field>
              </div>
              <Field label={lang === "fa" ? "توضیح اضافه" : "Additional notes"} error={errors["notes"]}>
                <TextArea value={form.notes} onChange={(e) => set("notes", e.target.value)} maxLength={2000} />
              </Field>
            </>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                {t("back")}
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-shadow duration-500 hover:shadow-glow"
              >
                {t("next")}
              </button>
            ) : (
              <SubmitButton pending={status === "pending"}>
                {status === "pending" ? t("loading") : t("submit")}
              </SubmitButton>
            )}
            {status === "error" && (
              <span className="text-sm text-destructive" role="alert">
                {t("errorTitle")}
              </span>
            )}
            {Object.keys(errors).length > 0 && (
              <span className="text-sm text-destructive" role="alert">
                {lang === "fa" ? "برخی فیلدها کامل نیستند." : "Some fields need attention."}
              </span>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
