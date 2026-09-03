import type { PageDef } from "./page-content";

export const aboutPage: PageDef = {
  eyebrow: { fa: "درباره رای‌کد", en: "About RYCODE" },
  title: {
    fa: "یک استودیوی مهندسی، نه یک آژانس سفارش‌پذیر",
    en: "An engineering studio, not an order-taking agency",
  },
  subtitle: {
    fa: "رای‌کد از سال ۱۳۹۳ در حال ساخت وب‌سایت، اپلیکیشن و نرم‌افزار اختصاصی برای کسب‌وکارهای ایرانی و بین‌المللی است. تمرکز ما روی مسائلی است که راه‌حل ساده ندارند.",
    en: "Since 2014 RYCODE has built websites, applications and custom software for Iranian and international businesses. We focus on the problems that have no easy answer.",
  },
  seoTitle: { fa: "درباره ما | رای‌کد", en: "About us | RYCODE" },
  seoDescription: {
    fa: "با تیم، ارزش‌ها و روش کاری رای‌کد آشنا شوید؛ استودیوی مهندسی نرم‌افزار و فناوری دیجیتال.",
    en: "Meet the team, values and working method behind RYCODE, a software engineering and digital technology studio.",
  },
  blocks: [
    {
      title: { fa: "چه کسانی هستیم", en: "Who we are" },
      body: {
        fa: "تیمی متشکل از مهندسان نرم‌افزار، طراحان تجربه کاربری، متخصصان داده و کارشناسان زیرساخت که با هم یک واحد تحویل واحد را تشکیل می‌دهند.",
        en: "A team of software engineers, experience designers, data specialists and infrastructure engineers operating as a single delivery unit.",
      },
    },
    {
      title: { fa: "چه کاری انجام می‌دهیم", en: "What we do" },
      body: {
        fa: "از وب‌سایت شرکتی و فروشگاه اینترنتی تا سامانه‌های سازمانی، اپلیکیشن موبایل، API، اتوماسیون فرآیندها و راهکارهای مبتنی بر هوش مصنوعی.",
        en: "From corporate sites and online stores to enterprise systems, mobile apps, APIs, process automation and AI-driven solutions.",
      },
    },
    {
      title: { fa: "چگونه کار می‌کنیم", en: "How we work" },
      body: {
        fa: "هر پروژه با تحلیل مسئله شروع می‌شود، نه با انتخاب تکنولوژی. سپس معماری، برآورد شفاف و تحویل مرحله‌ای.",
        en: "Every project starts with the problem, not the technology. Then architecture, a transparent estimate and staged delivery.",
      },
      points: {
        fa: ["گزارش پیشرفت هفتگی", "محیط پیش‌نمایش زنده", "دسترسی به مخزن کد"],
        en: ["Weekly progress reports", "Live preview environment", "Repository access"],
      },
    },
    {
      title: { fa: "ارزش‌های ما", en: "Our values" },
      body: {
        fa: "صداقت فنی بر خوش‌بینی فروش ارجح است. اگر پروژه‌ای شدنی نیست یا راه ساده‌تری دارد، همان را می‌گوییم.",
        en: "Technical honesty over sales optimism. If a project is not feasible, or has a simpler path, we say so.",
      },
    },
  ],
};

export const whyPage: PageDef = {
  eyebrow: { fa: "چرا رای‌کد", en: "Why RYCODE" },
  title: { fa: "دلیل انتخاب یک تیم مهندسی جدی", en: "Why choose a serious engineering team" },
  subtitle: {
    fa: "تفاوت بین یک پروژه‌ای که کار می‌کند و پروژه‌ای که سه سال بعد هم قابل توسعه است، در تصمیم‌های مهندسی روز اول است.",
    en: "The difference between software that works and software still extensible three years later is decided on day one.",
  },
  seoTitle: { fa: "چرا رای‌کد | مزیت مهندسی", en: "Why RYCODE | Engineering advantage" },
  seoDescription: {
    fa: "شفافیت، معماری تمیز، مالکیت کد و طیف کامل خدمات فنی؛ دلایل انتخاب رای‌کد.",
    en: "Transparency, clean architecture, code ownership and full-spectrum capability — why clients choose RYCODE.",
  },
  blocks: [
    {
      title: { fa: "کیفیت قابل ممیزی", en: "Auditable quality" },
      body: {
        fa: "کد با استاندارد مشخص، بازبینی همتا و تست نوشته می‌شود. هر تصمیم معماری مستند است.",
        en: "Code written to a defined standard with peer review and tests. Every architectural decision is documented.",
      },
    },
    {
      title: { fa: "بدون قفل شدن به پیمانکار", en: "No vendor lock-in" },
      body: {
        fa: "مالکیت کامل کد و زیرساخت با شماست و مستندات انتقال ارائه می‌شود.",
        en: "You keep full ownership of code and infrastructure, with handover documentation included.",
      },
    },
    {
      title: { fa: "تخصص عمیق، نه سطحی", en: "Depth, not breadth alone" },
      body: {
        fa: "برای هر حوزه — بک‌اند، موبایل، داده، سئو — متخصص اختصاصی داریم.",
        en: "Dedicated specialists for backend, mobile, data and SEO rather than generalists stretched thin.",
      },
    },
    {
      title: { fa: "پاسخگویی واقعی", en: "Real accountability" },
      body: {
        fa: "زمان پاسخ مشخص، سامانه تیکت اختصاصی و مدیر پروژه ثابت برای هر مشتری.",
        en: "Defined response times, a dedicated ticketing system and a consistent project manager for every client.",
      },
    },
  ],
};

export const technologiesPage: PageDef = {
  eyebrow: { fa: "تکنولوژی", en: "Technology" },
  title: { fa: "پشته فناوری ما", en: "Our technology stack" },
  subtitle: {
    fa: "تکنولوژی را بر اساس نیاز پروژه انتخاب می‌کنیم، نه بر اساس علاقه شخصی. این ابزارهایی است که با آن‌ها روزانه کار می‌کنیم.",
    en: "We pick technology to fit the project, not personal preference. These are the tools we work with every day.",
  },
  seoTitle: { fa: "تکنولوژی‌ها | رای‌کد", en: "Technologies | RYCODE" },
  seoDescription: {
    fa: "React، Next.js، Node.js، Python، Django، PHP، Laravel، PostgreSQL، Docker، AWS و ابزارهای هوش مصنوعی.",
    en: "React, Next.js, Node.js, Python, Django, PHP, Laravel, PostgreSQL, Docker, AWS and AI tooling.",
  },
  blocks: [
    {
      title: { fa: "معیار انتخاب تکنولوژی", en: "How we choose" },
      body: {
        fa: "بلوغ اکوسیستم، در دسترس بودن نیروی متخصص، هزینه نگهداری بلندمدت و تناسب با مقیاس واقعی پروژه.",
        en: "Ecosystem maturity, talent availability, long-term maintenance cost and fit with the project's real scale.",
      },
    },
    {
      title: { fa: "کارایی و مقیاس", en: "Performance and scale" },
      body: {
        fa: "کش چندلایه، بهینه‌سازی کوئری، صف‌های پردازش و مانیتورینگ از ابتدا در معماری دیده می‌شود.",
        en: "Layered caching, query optimisation, processing queues and monitoring are part of the architecture from the start.",
      },
    },
    {
      title: { fa: "امنیت", en: "Security" },
      body: {
        fa: "اعتبارسنجی سمت سرور، کنترل دسترسی سطح ردیف، مدیریت امن کلیدها و بازبینی وابستگی‌ها.",
        en: "Server-side validation, row-level access control, safe secret management and dependency review.",
      },
    },
    {
      title: { fa: "هوش مصنوعی کاربردی", en: "Applied AI" },
      body: {
        fa: "جست‌وجوی معنایی، دستیار پشتیبانی، استخراج داده از اسناد و اتوماسیون تصمیم — جایی که واقعاً ارزش می‌سازد.",
        en: "Semantic search, support assistants, document extraction and decision automation — where it truly adds value.",
      },
    },
  ],
};

export const processPage: PageDef = {
  eyebrow: { fa: "فرآیند کاری", en: "Process" },
  title: { fa: "از ایده تا سیستم پایدار", en: "From idea to a stable system" },
  subtitle: {
    fa: "فرآیند شش‌مرحله‌ای ما طوری طراحی شده که در هر مرحله چیزی قابل مشاهده و قابل ارزیابی تحویل بگیرید.",
    en: "Our six-stage process is built so that every stage delivers something you can see and evaluate.",
  },
  seoTitle: { fa: "فرآیند کاری | رای‌کد", en: "Our process | RYCODE" },
  seoDescription: {
    fa: "کشف، معماری، طراحی، توسعه تکرارشونده، تست و انتشار؛ روش اجرای پروژه در رای‌کد.",
    en: "Discovery, architecture, design, iterative delivery, testing and launch — how RYCODE runs projects.",
  },
  blocks: [
    {
      title: { fa: "شفافیت در هر مرحله", en: "Transparency at each stage" },
      body: {
        fa: "در پایان هر مرحله خروجی مکتوب، پیش‌نمایش زنده و نقطه تصمیم مشخص دارید.",
        en: "Each stage ends with a written deliverable, a live preview and a clear decision point.",
      },
    },
    {
      title: { fa: "مدیریت تغییر", en: "Change management" },
      body: {
        fa: "تغییر دامنه پروژه طبیعی است؛ تأثیر آن بر زمان و هزینه پیش از اجرا به‌صورت مکتوب اعلام می‌شود.",
        en: "Scope changes are normal; their impact on time and cost is stated in writing before we act on them.",
      },
    },
    {
      title: { fa: "کیفیت تضمین‌شده", en: "Quality assurance" },
      body: {
        fa: "تست خودکار، بازبینی کد، بررسی دسترس‌پذیری و سنجش کارایی پیش از هر انتشار.",
        en: "Automated tests, code review, accessibility checks and performance measurement before every release.",
      },
    },
    {
      title: { fa: "پس از انتشار", en: "After launch" },
      body: {
        fa: "دوره گارانتی رفع باگ، آموزش تیم شما و امکان قرارداد نگهداری بلندمدت.",
        en: "A bug-fix warranty period, training for your team and an optional long-term maintenance contract.",
      },
    },
  ],
};

export const pricingPage: PageDef = {
  eyebrow: { fa: "همکاری و قیمت‌گذاری", en: "Engagement & pricing" },
  title: { fa: "مدل همکاری متناسب با پروژه شما", en: "An engagement model that fits your project" },
  subtitle: {
    fa: "قیمت نهایی پس از تحلیل نیازمندی‌ها اعلام می‌شود. برآورد اولیه رایگان است و کمتر از ۲۴ ساعت زمان می‌برد.",
    en: "Final pricing follows requirements analysis. The initial estimate is free and takes less than 24 hours.",
  },
  seoTitle: { fa: "قیمت‌گذاری و مدل همکاری | رای‌کد", en: "Pricing & engagement models | RYCODE" },
  seoDescription: {
    fa: "پروژه با قیمت ثابت، تیم اختصاصی، قرارداد نگهداری و مشاوره فنی؛ مدل‌های همکاری رای‌کد.",
    en: "Fixed-price projects, dedicated teams, maintenance contracts and technical consulting at RYCODE.",
  },
  blocks: [
    {
      title: { fa: "چه چیزی قیمت را تعیین می‌کند", en: "What drives the price" },
      body: {
        fa: "پیچیدگی منطق کسب‌وکار، تعداد یکپارچه‌سازی‌ها، حجم داده، سطح طراحی اختصاصی و الزامات امنیتی.",
        en: "Business-logic complexity, number of integrations, data volume, level of bespoke design and security requirements.",
      },
    },
    {
      title: { fa: "برآورد شفاف", en: "Transparent estimates" },
      body: {
        fa: "برآورد به تفکیک ماژول ارائه می‌شود تا بدانید هزینه دقیقاً کجا صرف می‌شود.",
        en: "Estimates are broken down per module so you know exactly where the budget goes.",
      },
    },
    {
      title: { fa: "پرداخت مرحله‌ای", en: "Staged payment" },
      body: {
        fa: "پرداخت به تحویل مرحله‌ای گره می‌خورد؛ امکان تعریف اقساط نیز وجود دارد.",
        en: "Payments are tied to staged delivery, and installment plans can be arranged.",
      },
    },
    {
      title: { fa: "بدون هزینه پنهان", en: "No hidden costs" },
      body: {
        fa: "هزینه‌های شخص ثالث مثل هاست، دامنه و سرویس‌های خارجی از ابتدا جداگانه اعلام می‌شود.",
        en: "Third-party costs such as hosting, domains and external services are itemised from the outset.",
      },
    },
  ],
};

export const installmentsPage: PageDef = {
  eyebrow: { fa: "پرداخت اقساطی", en: "Installments" },
  title: { fa: "پروژه‌ات را اقساطی شروع کن", en: "Start your project on an installment plan" },
  subtitle: {
    fa: "برای پروژه‌های واجد شرایط، امکان پرداخت اقساطی با پیش‌پرداخت و سررسیدهای مشخص در قرارداد وجود دارد. اقساط در پنل کاربری قابل پیگیری است.",
    en: "For eligible projects we offer installment plans with a deposit and contractual due dates. Installments are tracked in your dashboard.",
  },
  seoTitle: { fa: "پرداخت اقساطی پروژه | رای‌کد", en: "Project installment plans | RYCODE" },
  seoDescription: {
    fa: "شرایط، مراحل و نحوه پیگیری اقساط پروژه‌های نرم‌افزاری در رای‌کد.",
    en: "Terms, steps and tracking for installment payments on RYCODE software projects.",
  },
  blocks: [
    {
      title: { fa: "شرایط استفاده", en: "Eligibility" },
      body: {
        fa: "پروژه‌هایی با دامنه مشخص و مدت اجرای بیش از یک ماه معمولاً واجد شرایط هستند.",
        en: "Projects with a defined scope and a delivery timeline longer than one month are typically eligible.",
      },
    },
    {
      title: { fa: "ساختار پرداخت", en: "Payment structure" },
      body: {
        fa: "پیش‌پرداخت در شروع، اقساط در سررسیدهای توافق‌شده و تسویه در تحویل نهایی.",
        en: "A deposit at kickoff, installments on agreed due dates and settlement at final delivery.",
      },
      points: {
        fa: ["پیش‌پرداخت از ۲۰٪", "اقساط ماهانه یا مرحله‌ای", "سررسید مشخص در قرارداد"],
        en: ["Deposit from 20%", "Monthly or milestone installments", "Due dates fixed in the contract"],
      },
    },
    {
      title: { fa: "پیگیری در پنل", en: "Tracking in your dashboard" },
      body: {
        fa: "وضعیت هر قسط، مبلغ، سررسید و رسید پرداخت در پنل کاربری قابل مشاهده است.",
        en: "Status, amount, due date and payment receipt for each installment are visible in your dashboard.",
      },
    },
    {
      title: { fa: "مالکیت و تحویل", en: "Ownership and delivery" },
      body: {
        fa: "پروژه در طول اجرا در محیط پیش‌نمایش در دسترس است و مالکیت کامل کد پس از تسویه منتقل می‌شود.",
        en: "The project stays available in a preview environment during delivery; full code ownership transfers on settlement.",
      },
    },
  ],
};

export const careersPage: PageDef = {
  eyebrow: { fa: "همکاری با ما", en: "Careers" },
  title: { fa: "به تیم مهندسی رای‌کد بپیوندید", en: "Join the RYCODE engineering team" },
  subtitle: {
    fa: "به دنبال افرادی هستیم که کیفیت برایشان یک ارزش شخصی است، نه یک الزام سازمانی.",
    en: "We look for people for whom quality is a personal value, not an organisational requirement.",
  },
  seoTitle: { fa: "فرصت‌های شغلی | رای‌کد", en: "Careers | RYCODE" },
  seoDescription: {
    fa: "فرصت‌های همکاری در تیم مهندسی نرم‌افزار رای‌کد؛ فرانت‌اند، بک‌اند، موبایل و داده.",
    en: "Opportunities with the RYCODE engineering team across frontend, backend, mobile and data.",
  },
  blocks: [
    {
      title: { fa: "نحوه همکاری", en: "How we work together" },
      body: {
        fa: "همکاری تمام‌وقت، پاره‌وقت و پروژه‌ای؛ حضوری یا دورکاری بسته به نقش.",
        en: "Full-time, part-time and project-based collaboration; on-site or remote depending on the role.",
      },
    },
    {
      title: { fa: "حوزه‌های مورد نیاز", en: "Areas we hire for" },
      body: {
        fa: "توسعه فرانت‌اند و بک‌اند، موبایل، مهندسی داده، DevOps، طراحی محصول و سئوی تکنیکال.",
        en: "Frontend and backend development, mobile, data engineering, DevOps, product design and technical SEO.",
      },
    },
    {
      title: { fa: "فرآیند استخدام", en: "Hiring process" },
      body: {
        fa: "بررسی رزومه، گفت‌وگوی فنی، یک تمرین کوتاه واقعی و مصاحبه نهایی.",
        en: "CV review, a technical conversation, one short realistic exercise and a final interview.",
      },
    },
    {
      title: { fa: "ارسال درخواست", en: "Apply" },
      body: {
        fa: "رزومه و نمونه‌کار خود را از طریق فرم تماس برای ما ارسال کنید؛ همه درخواست‌ها بررسی می‌شوند.",
        en: "Send your CV and portfolio through the contact form; every application is reviewed.",
      },
    },
  ],
};

export const privacyPage: PageDef = {
  eyebrow: { fa: "حریم خصوصی", en: "Privacy" },
  title: { fa: "سیاست حریم خصوصی", en: "Privacy policy" },
  subtitle: {
    fa: "این سند توضیح می‌دهد چه داده‌هایی جمع‌آوری می‌شود، چرا، و شما چه کنترلی روی آن دارید.",
    en: "This document explains what data we collect, why, and what control you have over it.",
  },
  seoTitle: { fa: "سیاست حریم خصوصی | رای‌کد", en: "Privacy policy | RYCODE" },
  seoDescription: {
    fa: "نحوه جمع‌آوری، استفاده و نگهداری اطلاعات کاربران در رای‌کد.",
    en: "How RYCODE collects, uses and stores user information.",
  },
  blocks: [
    {
      title: { fa: "داده‌هایی که جمع‌آوری می‌کنیم", en: "Data we collect" },
      body: {
        fa: "اطلاعات حساب کاربری، محتوای درخواست پروژه و تیکت‌های پشتیبانی، و آمار بازدید به‌صورت تجمیعی.",
        en: "Account information, the content of project requests and support tickets, and aggregated visit analytics.",
      },
    },
    {
      title: { fa: "استفاده از داده", en: "How we use data" },
      body: {
        fa: "صرفاً برای ارائه خدمات، پاسخ به درخواست‌ها و بهبود کیفیت سایت. داده شما فروخته نمی‌شود.",
        en: "Only to deliver services, respond to requests and improve the site. We do not sell your data.",
      },
    },
    {
      title: { fa: "نگهداری و امنیت", en: "Retention and security" },
      body: {
        fa: "داده‌ها رمزنگاری‌شده نگهداری می‌شوند و دسترسی به آن‌ها بر پایه نقش محدود است.",
        en: "Data is stored encrypted and access is restricted on a role basis.",
      },
    },
    {
      title: { fa: "حقوق شما", en: "Your rights" },
      body: {
        fa: "می‌توانید درخواست مشاهده، اصلاح یا حذف اطلاعات حساب خود را از طریق پشتیبانی ثبت کنید.",
        en: "You can request access to, correction of, or deletion of your account data through support.",
      },
    },
  ],
};

export const termsPage: PageDef = {
  eyebrow: { fa: "قوانین", en: "Terms" },
  title: { fa: "شرایط و قوانین استفاده", en: "Terms of service" },
  subtitle: {
    fa: "استفاده از وب‌سایت و سرویس‌های رای‌کد به معنای پذیرش این شرایط است.",
    en: "Using the RYCODE website and services means accepting these terms.",
  },
  seoTitle: { fa: "شرایط و قوانین | رای‌کد", en: "Terms of service | RYCODE" },
  seoDescription: {
    fa: "شرایط استفاده از خدمات، تعهدات طرفین و مالکیت فکری در قراردادهای رای‌کد.",
    en: "Service terms, mutual obligations and intellectual property in RYCODE agreements.",
  },
  blocks: [
    {
      title: { fa: "دامنه خدمات", en: "Scope of services" },
      body: {
        fa: "دامنه دقیق هر پروژه در قرارداد جداگانه تعریف می‌شود و بر این سند اولویت دارد.",
        en: "The precise scope of each project is defined in a separate contract, which takes precedence over this document.",
      },
    },
    {
      title: { fa: "تعهدات کارفرما", en: "Client obligations" },
      body: {
        fa: "ارائه به‌موقع محتوا، دسترسی‌های لازم و بازخورد در بازه‌های توافق‌شده.",
        en: "Timely provision of content, required access and feedback within agreed windows.",
      },
    },
    {
      title: { fa: "مالکیت فکری", en: "Intellectual property" },
      body: {
        fa: "پس از تسویه کامل، مالکیت کد و دارایی‌های تولیدشده به کارفرما منتقل می‌شود.",
        en: "On full settlement, ownership of the code and produced assets transfers to the client.",
      },
    },
    {
      title: { fa: "محدودیت مسئولیت", en: "Limitation of liability" },
      body: {
        fa: "مسئولیت ما محدود به مبلغ قرارداد است و شامل خسارات غیرمستقیم نمی‌شود.",
        en: "Our liability is limited to the contract value and excludes indirect damages.",
      },
    },
  ],
};

export const cookiesPage: PageDef = {
  eyebrow: { fa: "کوکی‌ها", en: "Cookies" },
  title: { fa: "سیاست کوکی", en: "Cookie policy" },
  subtitle: {
    fa: "ما از حداقل کوکی ممکن استفاده می‌کنیم؛ بدون ردیابی تبلیغاتی شخص ثالث.",
    en: "We use the minimum number of cookies possible, with no third-party advertising trackers.",
  },
  seoTitle: { fa: "سیاست کوکی | رای‌کد", en: "Cookie policy | RYCODE" },
  seoDescription: {
    fa: "کوکی‌های ضروری، تنظیمات کاربر و آمار بازدید در وب‌سایت رای‌کد.",
    en: "Essential cookies, user preferences and visit analytics on the RYCODE website.",
  },
  blocks: [
    {
      title: { fa: "کوکی‌های ضروری", en: "Essential cookies" },
      body: {
        fa: "برای ورود به حساب کاربری و حفظ نشست لازم هستند و قابل غیرفعال‌سازی نیستند.",
        en: "Required for signing in and maintaining your session; these cannot be disabled.",
      },
    },
    {
      title: { fa: "تنظیمات کاربر", en: "Preferences" },
      body: {
        fa: "زبان و حالت روشن/تاریک به‌صورت محلی در مرورگر شما ذخیره می‌شود.",
        en: "Language and light/dark mode are stored locally in your browser.",
      },
    },
    {
      title: { fa: "آمار بازدید", en: "Analytics" },
      body: {
        fa: "آمار به‌صورت تجمیعی و بدون شناسه شخصی ثبت می‌شود.",
        en: "Analytics are recorded in aggregate, without personal identifiers.",
      },
    },
    {
      title: { fa: "مدیریت کوکی", en: "Managing cookies" },
      body: {
        fa: "می‌توانید کوکی‌ها را از تنظیمات مرورگر پاک کنید؛ در این صورت باید دوباره وارد حساب شوید.",
        en: "You can clear cookies from your browser settings; you will then need to sign in again.",
      },
    },
  ],
};
