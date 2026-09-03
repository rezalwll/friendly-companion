import type { Locale } from "./i18n";

export type Bi = Record<Locale, string>;
export type BiList = Record<Locale, string[]>;

export type Block = { title: Bi; body: Bi; points?: BiList };

export type PageDef = {
  eyebrow: Bi;
  title: Bi;
  subtitle: Bi;
  seoTitle: Bi;
  seoDescription: Bi;
  blocks: Block[];
};

export const stats: { value: Bi; label: Bi }[] = [
  { value: { fa: "۲۴۰+", en: "240+" }, label: { fa: "پروژه تحویل‌شده", en: "Projects delivered" } },
  { value: { fa: "۱۱", en: "11" }, label: { fa: "سال تجربه مهندسی", en: "Years of engineering" } },
  { value: { fa: "۹۸٪", en: "98%" }, label: { fa: "رضایت کارفرما", en: "Client satisfaction" } },
  { value: { fa: "۳۶", en: "36" }, label: { fa: "متخصص همکار", en: "Specialists" } },
];

export const techStack: { group: Bi; items: string[] }[] = [
  { group: { fa: "فرانت‌اند", en: "Frontend" }, items: ["TypeScript", "React", "Next.js", "Vue", "Tailwind CSS"] },
  { group: { fa: "بک‌اند", en: "Backend" }, items: ["Node.js", "Python", "Django", "PHP", "Laravel", "Go"] },
  { group: { fa: "داده", en: "Data" }, items: ["PostgreSQL", "MySQL", "Redis", "ClickHouse", "Elasticsearch"] },
  { group: { fa: "موبایل", en: "Mobile" }, items: ["Flutter", "React Native", "Swift", "Kotlin"] },
  { group: { fa: "زیرساخت", en: "Infrastructure" }, items: ["Docker", "Kubernetes", "AWS", "Cloudflare", "CI/CD"] },
  { group: { fa: "هوش مصنوعی", en: "AI" }, items: ["OpenAI", "Embeddings", "Vector DB", "LangChain"] },
];

export const processSteps: { n: string; title: Bi; body: Bi }[] = [
  {
    n: "01",
    title: { fa: "کشف و تحلیل", en: "Discovery" },
    body: {
      fa: "مسئله کسب‌وکار، محدودیت‌ها و معیار موفقیت را روشن می‌کنیم؛ نه فقط لیست امکانات.",
      en: "We clarify the business problem, constraints and success metric — not just a feature list.",
    },
  },
  {
    n: "02",
    title: { fa: "معماری و برآورد", en: "Architecture & estimate" },
    body: {
      fa: "معماری فنی، انتخاب تکنولوژی، برنامه زمانی و برآورد شفاف هزینه ارائه می‌شود.",
      en: "Technical architecture, technology choices, a schedule and a transparent estimate.",
    },
  },
  {
    n: "03",
    title: { fa: "طراحی تجربه", en: "Experience design" },
    body: {
      fa: "جریان کاربر و رابط کاربری با در نظر گرفتن هر دو جهت RTL و LTR طراحی می‌شود.",
      en: "User flows and interface designed with both RTL and LTR in mind from day one.",
    },
  },
  {
    n: "04",
    title: { fa: "توسعه تکرارشونده", en: "Iterative delivery" },
    body: {
      fa: "تحویل در بازه‌های کوتاه، محیط پیش‌نمایش زنده و گزارش پیشرفت هفتگی.",
      en: "Short delivery cycles, a live preview environment and weekly progress reports.",
    },
  },
  {
    n: "05",
    title: { fa: "تست و سخت‌سازی", en: "Testing & hardening" },
    body: {
      fa: "تست عملکرد، امنیت، دسترس‌پذیری و پایداری پیش از انتشار.",
      en: "Performance, security, accessibility and reliability testing before release.",
    },
  },
  {
    n: "06",
    title: { fa: "انتشار و نگهداری", en: "Launch & maintenance" },
    body: {
      fa: "انتشار کنترل‌شده، مانیتورینگ و امکان قرارداد نگهداری بلندمدت.",
      en: "Controlled rollout, monitoring and an optional long-term maintenance contract.",
    },
  },
];

export const whyPoints: { title: Bi; body: Bi }[] = [
  {
    title: { fa: "مهندسی، نه صرفاً طراحی", en: "Engineering, not just design" },
    body: {
      fa: "تصمیم‌های معماری را مستند می‌کنیم و کد را طوری می‌نویسیم که دو سال بعد هم قابل توسعه باشد.",
      en: "We document architectural decisions and write code that is still extensible two years later.",
    },
  },
  {
    title: { fa: "شفافیت کامل", en: "Full transparency" },
    body: {
      fa: "دسترسی به مخزن کد، محیط پیش‌نمایش و گزارش پیشرفت از روز اول.",
      en: "Repository access, a preview environment and progress reporting from day one.",
    },
  },
  {
    title: { fa: "طیف کامل خدمات", en: "Full-spectrum capability" },
    body: {
      fa: "یک تیم برای وب، موبایل، بک‌اند، داده، سئو، اتوماسیون و هوش مصنوعی.",
      en: "One team for web, mobile, backend, data, SEO, automation and AI.",
    },
  },
  {
    title: { fa: "ورود به پروژه‌های مشکل‌دار", en: "We take on troubled projects" },
    body: {
      fa: "پروژه‌های نیمه‌کاره یا قدیمی را ممیزی می‌کنیم و مسیر نجات واقعی می‌دهیم.",
      en: "We audit unfinished or legacy projects and give a realistic recovery path.",
    },
  },
  {
    title: { fa: "دوزبانه از پایه", en: "Bilingual by design" },
    body: {
      fa: "محصولات فارسی و انگلیسی با پشتیبانی واقعی RTL و LTR، نه ترجمه سطحی.",
      en: "Persian and English products with genuine RTL and LTR support, not surface translation.",
    },
  },
  {
    title: { fa: "مالکیت کد با شماست", en: "You own the code" },
    body: {
      fa: "پس از تسویه، مالکیت کامل کد و مخزن به کارفرما منتقل می‌شود.",
      en: "After settlement, full ownership of code and repository transfers to you.",
    },
  },
];

export const engagementModels: { title: Bi; body: Bi; best: Bi; points: BiList }[] = [
  {
    title: { fa: "پروژه با قیمت ثابت", en: "Fixed-price project" },
    body: {
      fa: "برای پروژه‌هایی با دامنه مشخص و خروجی روشن.",
      en: "For projects with a defined scope and a clear deliverable.",
    },
    best: { fa: "وب‌سایت، اپلیکیشن، ماژول مشخص", en: "Websites, apps, well-defined modules" },
    points: {
      fa: ["برآورد شفاف پیش از شروع", "تحویل مرحله‌ای", "امکان پرداخت مرحله‌ای"],
      en: ["Transparent estimate upfront", "Staged delivery", "Staged payment possible"],
    },
  },
  {
    title: { fa: "تیم اختصاصی", en: "Dedicated team" },
    body: {
      fa: "برای محصولاتی که مسیر توسعه بلندمدت دارند.",
      en: "For products with a long-term development roadmap.",
    },
    best: { fa: "استارتاپ‌ها و محصولات در حال رشد", en: "Startups and growing products" },
    points: {
      fa: ["ظرفیت ماهانه مشخص", "اولویت‌بندی مشترک", "گزارش هفتگی"],
      en: ["Defined monthly capacity", "Shared prioritisation", "Weekly reporting"],
    },
  },
  {
    title: { fa: "نگهداری و پشتیبانی", en: "Maintenance & support" },
    body: {
      fa: "برای نگهداری، رفع باگ و توسعه تدریجی سیستم‌های موجود.",
      en: "For maintaining, fixing and incrementally improving existing systems.",
    },
    best: { fa: "پروژه‌های در حال بهره‌برداری", en: "Systems already in production" },
    points: {
      fa: ["زمان پاسخ تضمین‌شده", "مانیتورینگ", "ساعت توسعه ماهانه"],
      en: ["Guaranteed response time", "Monitoring", "Monthly development hours"],
    },
  },
  {
    title: { fa: "مشاوره و ممیزی", en: "Consulting & audit" },
    body: {
      fa: "برای تصمیم‌های پرهزینه فنی پیش از شروع یا در میانه راه.",
      en: "For costly technical decisions, before starting or mid-course.",
    },
    best: { fa: "انتخاب معماری، نجات پروژه", en: "Architecture choice, project rescue" },
    points: {
      fa: ["ممیزی کد و معماری", "گزارش مکتوب", "نقشه راه اجرایی"],
      en: ["Code and architecture audit", "Written report", "Actionable roadmap"],
    },
  },
];
