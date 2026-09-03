export const brand = {
  name: "RYCODE",
  fa: "رای‌کد",
  domain: "rycode.ir",
  tagline: "استودیوی مهندسی نرم‌افزار و فناوری دیجیتال",
  taglineEn: "Premium software engineering & digital technology studio",
};

export const nav = [
  { fa: "خدمات", en: "Services" },
  { fa: "نمونه‌کارها", en: "Work" },
  { fa: "تکنولوژی", en: "Technology" },
  { fa: "مقالات", en: "Insights" },
  { fa: "درباره ما", en: "About" },
  { fa: "تماس", en: "Contact" },
];

export const hero = {
  eyebrow: "RYCODE · رای‌کد",
  headline: "مسائل سختِ نرم‌افزاری، مهندسی‌شده حل می‌شوند",
  headlineEn: "Hard software problems, engineered properly.",
  sub: "طراحی و توسعه وب‌سایت‌های سطح بالا، اپلیکیشن موبایل، نرم‌افزار اختصاصی، API، اتوماسیون و راهکارهای مبتنی بر هوش مصنوعی — برای کسب‌وکارهایی که کیفیت برایشان مهم است.",
  cta1: "ثبت درخواست پروژه",
  cta2: "مشاهده نمونه‌کارها",
};

export const services = [
  { fa: "طراحی و توسعه وب", en: "Web Engineering", desc: "وب‌سایت شرکتی، فروشگاهی و وب‌اپلیکیشن اختصاصی با معماری تمیز." },
  { fa: "اپلیکیشن موبایل", en: "Mobile Apps", desc: "اپلیکیشن‌های نیتیو و کراس‌پلتفرم با تجربه کاربری دقیق." },
  { fa: "نرم‌افزار اختصاصی", en: "Custom Software", desc: "توسعه PHP و Python، سیستم‌های سازمانی و پنل‌های مدیریتی." },
  { fa: "API و یکپارچه‌سازی", en: "APIs & Integrations", desc: "طراحی API، اتصال سرویس‌ها و اتوماسیون فرآیندهای کسب‌وکار." },
  { fa: "سئو و بهینه‌سازی", en: "SEO & Performance", desc: "سئوی تکنیکال، بهبود Core Web Vitals و سرعت واقعی." },
  { fa: "نگهداری و مدرن‌سازی", en: "Maintenance & Modernization", desc: "رفع باگ، نگهداری پروژه‌های قدیمی و مهاجرت به معماری جدید." },
];

export const projects = [
  { title: "پلتفرم فروشگاهی آیریک", cat: "E-commerce · Next.js", metric: "۳٫۲× افزایش نرخ تبدیل" },
  { title: "سامانه اتوماسیون پارس‌صنعت", cat: "Custom Software · Python", metric: "۷۰٪ کاهش کار دستی" },
  { title: "اپلیکیشن بانکی نویدپی", cat: "Mobile · Flutter", metric: "۴٫۸ امتیاز کاربران" },
];

export const tech = [
  "TypeScript", "React", "Next.js", "Node.js", "Python", "Django",
  "PHP / Laravel", "PostgreSQL", "Redis", "Docker", "AWS", "OpenAI",
];

export const stats = [
  { v: "۲۴۰+", l: "پروژه تحویل‌شده" },
  { v: "۱۱", l: "سال تجربه مهندسی" },
  { v: "۹۸٪", l: "رضایت کارفرما" },
  { v: "۳۶", l: "متخصص همکار" },
];

export const testimonial = {
  quote: "تیم رای‌کد جایی وارد شد که دو پیمانکار قبلی شکست خورده بودند. معماری را بازنویسی کردند و سامانه امروز بدون خطا کار می‌کند.",
  name: "سارا مهرآیین",
  role: "مدیر فناوری، هلدینگ پارس‌صنعت",
};

export const posts = [
  { tag: "Engineering", title: "چرا معماری ماژولار هزینه نگهداری را نصف می‌کند", date: "۱۲ شهریور" },
  { tag: "SEO", title: "سئوی تکنیکال برای وب‌اپلیکیشن‌های SPA", date: "۴ شهریور" },
];

export const finalCta = {
  title: "پروژه‌ات را برای ما توضیح بده",
  sub: "کمتر از ۲۴ ساعت، تحلیل فنی و برآورد اولیه دریافت می‌کنی.",
  cta: "شروع همکاری",
};

export type DirectionTokens = {
  id: "A" | "B" | "C" | "D";
  name: string;
  nameFa: string;
  summary: string;
  system: {
    primary: string;
    accent: string;
    background: string;
    typography: string;
    radius: string;
    shadow: string;
    button: string;
    card: string;
    animation: string;
  };
  swatches: { label: string; value: string }[];
};
