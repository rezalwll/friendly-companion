export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr";
}

type Entry = { fa: string; en: string };

export const t = {
  // brand
  brandName: { fa: "رای‌کد", en: "RYCODE" },
  brandLatin: { fa: "RYCODE", en: "RYCODE" },
  tagline: {
    fa: "از ایده تا محصول؛ می‌سازیم، بهینه می‌کنیم و حل می‌کنیم.",
    en: "From idea to production — we build, optimize and solve.",
  },

  // nav
  navHome: { fa: "خانه", en: "Home" },
  navServices: { fa: "خدمات", en: "Services" },
  navPortfolio: { fa: "نمونه‌کارها", en: "Portfolio" },
  navAbout: { fa: "درباره ما", en: "About" },
  navWhy: { fa: "چرا رای‌کد", en: "Why RYCODE" },
  navTechnologies: { fa: "تکنولوژی‌ها", en: "Technologies" },
  navProcess: { fa: "فرآیند کار", en: "Process" },
  navPricing: { fa: "مدل همکاری", en: "Pricing" },
  navInstallments: { fa: "پرداخت قسطی", en: "Installments" },
  navBlog: { fa: "مقالات", en: "Blog" },
  navFaq: { fa: "سؤالات متداول", en: "FAQ" },
  navContact: { fa: "تماس", en: "Contact" },
  navSupport: { fa: "پشتیبانی", en: "Support" },
  navCareers: { fa: "همکاری با ما", en: "Careers" },
  navSearch: { fa: "جست‌وجو", en: "Search" },
  navMore: { fa: "بیشتر", en: "More" },

  // actions
  startProject: { fa: "شروع پروژه", en: "Start a Project" },
  viewWork: { fa: "مشاهده نمونه‌کارها", en: "View Our Work" },
  readMore: { fa: "ادامه مطلب", en: "Read more" },
  viewDetails: { fa: "جزئیات", en: "View details" },
  viewAll: { fa: "مشاهده همه", en: "View all" },
  send: { fa: "ارسال", en: "Send" },
  submit: { fa: "ثبت", en: "Submit" },
  next: { fa: "بعدی", en: "Next" },
  back: { fa: "قبلی", en: "Back" },
  cancel: { fa: "انصراف", en: "Cancel" },
  save: { fa: "ذخیره", en: "Save" },
  signIn: { fa: "ورود", en: "Sign in" },
  signUp: { fa: "ثبت‌نام", en: "Create account" },
  signOut: { fa: "خروج", en: "Sign out" },
  dashboard: { fa: "پنل کاربری", en: "Dashboard" },
  adminPanel: { fa: "پنل مدیریت", en: "Admin" },

  // states
  loading: { fa: "در حال بارگذاری…", en: "Loading…" },
  empty: { fa: "چیزی برای نمایش نیست", en: "Nothing to show yet" },
  errorTitle: { fa: "مشکلی پیش آمد", en: "Something went wrong" },
  errorBody: {
    fa: "این صفحه بارگذاری نشد. دوباره تلاش کنید یا به خانه برگردید.",
    en: "This page didn't load. Try again or head back home.",
  },
  tryAgain: { fa: "تلاش دوباره", en: "Try again" },
  goHome: { fa: "بازگشت به خانه", en: "Go home" },
  notFoundTitle: { fa: "صفحه پیدا نشد", en: "Page not found" },
  notFoundBody: {
    fa: "آدرسی که دنبال آن بودید وجود ندارد یا جابه‌جا شده است.",
    en: "The address you were looking for doesn't exist or has moved.",
  },

  // theme / lang
  theme: { fa: "پوسته", en: "Theme" },
  themeLight: { fa: "روشن", en: "Light" },
  themeDark: { fa: "تیره", en: "Dark" },
  themeSystem: { fa: "سیستم", en: "System" },
  language: { fa: "زبان", en: "Language" },

  // home
  heroEyebrow: { fa: "استودیوی مهندسی نرم‌افزار", en: "Software engineering studio" },
  heroHeadline: {
    fa: "ایده شما، مهندسی ما — از اولین خط کد تا محصول نهایی",
    en: "Your idea, our engineering — from first commit to production",
  },
  heroSub: {
    fa: "رای‌کد وب‌سایت، اپلیکیشن، نرم‌افزار اختصاصی، API، اتوماسیون و راهکارهای هوش مصنوعی می‌سازد؛ پروژه‌های موجود را بهینه می‌کند و مسائل فنی سختی را حل می‌کند که جای دیگری زمین مانده‌اند.",
    en: "RYCODE builds websites, apps, custom software, APIs, automation and AI solutions — optimizes existing products and solves the hard technical problems others left behind.",
  },
  trustedTitle: { fa: "اعتماد تیم‌هایی که کیفیت برایشان مهم است", en: "Trusted by teams that care about quality" },
  servicesTitle: { fa: "چه کارهایی انجام می‌دهیم", en: "What we do" },
  servicesSub: {
    fa: "یک تیم، طیف کاملی از خدمات مهندسی نرم‌افزار.",
    en: "One team, the full spectrum of software engineering.",
  },
  featuredWorkTitle: { fa: "نمونه‌کارهای منتخب", en: "Selected work" },
  featuredWorkSub: {
    fa: "مطالعه موردی پروژه‌هایی که نتیجه قابل اندازه‌گیری داشته‌اند.",
    en: "Case studies with measurable outcomes.",
  },
  whyTitle: { fa: "چرا رای‌کد", en: "Why RYCODE" },
  techTitle: { fa: "تکنولوژی‌هایی که با آن‌ها می‌سازیم", en: "The stack we build with" },
  processTitle: { fa: "فرآیند کار ما", en: "How we work" },
  statsTitle: { fa: "عملکرد در یک نگاه", en: "Performance at a glance" },
  installmentsTitle: { fa: "پرداخت مرحله‌ای پروژه", en: "Staged project payments" },
  installmentsSub: {
    fa: "برای پروژه‌های واجد شرایط، امکان پرداخت مرحله‌ای بسته به دامنه کار، مبلغ قرارداد، مدت اجرا و تأیید نهایی وجود دارد.",
    en: "For eligible projects, staged payment may be available depending on scope, contract amount, duration and approval.",
  },
  testimonialsTitle: { fa: "نظر کارفرمایان", en: "What clients say" },
  blogTitle: { fa: "آخرین مقالات", en: "Latest articles" },
  faqTitle: { fa: "سؤالات متداول", en: "Frequently asked questions" },
  ctaTitle: { fa: "پروژه‌ات را برای ما توضیح بده", en: "Tell us about your project" },
  ctaSub: {
    fa: "کمتر از یک روز کاری، تحلیل فنی اولیه و برآورد دریافت می‌کنی.",
    en: "Within one business day you receive an initial technical analysis and estimate.",
  },

  // footer
  footerRights: { fa: "تمامی حقوق محفوظ است.", en: "All rights reserved." },
  footerCompany: { fa: "شرکت", en: "Company" },
  footerLegal: { fa: "قوانین", en: "Legal" },
  footerServices: { fa: "خدمات", en: "Services" },
  newsletterTitle: { fa: "خبرنامه فنی", en: "Engineering newsletter" },
  newsletterSub: {
    fa: "ماهی یک ایمیل، بدون تبلیغات.",
    en: "One email a month, no marketing noise.",
  },
  emailPlaceholder: { fa: "ایمیل شما", en: "Your email" },
  subscribe: { fa: "عضویت", en: "Subscribe" },
  privacy: { fa: "حریم خصوصی", en: "Privacy Policy" },
  terms: { fa: "قوانین و مقررات", en: "Terms & Conditions" },
  cookies: { fa: "سیاست کوکی", en: "Cookie Policy" },
} satisfies Record<string, Entry>;

export type TKey = keyof typeof t;

export function tr(locale: Locale, key: TKey): string {
  return t[key][locale];
}

export function makeT(locale: Locale) {
  return (key: TKey) => t[key][locale];
}

/** Pick the localized field of a bilingual DB row: pickLocale(row, "title", locale) */
export function pickLocale<T extends Record<string, unknown>>(
  row: T,
  field: string,
  locale: Locale,
): string {
  const value = row[`${field}_${locale}`] ?? row[`${field}_${defaultLocale}`];
  return typeof value === "string" ? value : "";
}

export function formatNumber(locale: Locale, value: number) {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(value);
}

export function formatDate(locale: Locale, value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatMoney(locale: Locale, amount: number, currency = "IRR") {
  const n = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(amount);
  const unit = currency === "IRR" ? (locale === "fa" ? "تومان" : "IRR") : currency;
  return `${n} ${unit}`;
}
