import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/rycode-logo.png.asset.json";
import { brand } from "@/lib/rycode-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RYCODE — استودیوی مهندسی نرم‌افزار و فناوری" },
      { name: "description", content: "رای‌کد (RYCODE): طراحی و توسعه وب، اپلیکیشن موبایل، نرم‌افزار اختصاصی، API، اتوماسیون و راهکارهای هوش مصنوعی." },
      { property: "og:title", content: "RYCODE — استودیوی مهندسی نرم‌افزار" },
      { property: "og:description", content: "مسائل سختِ نرم‌افزاری، مهندسی‌شده حل می‌شوند." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy-950 px-6 text-center"
      style={{ fontFamily: "var(--font-fa)" }}>
      <img src={logo.url} alt="لوگوی RYCODE" className="h-20 w-20 object-contain" />
      <h1 className="text-4xl font-extrabold tracking-tight text-white">{brand.name} · {brand.fa}</h1>
      <p className="max-w-xl text-sm leading-7 text-white/60">{brand.tagline} — فاز فعلی: بررسی و انتخاب جهت طراحی.</p>
      <Link to="/design-lab" className="rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-navy-950">
        ورود به آزمایشگاه طراحی
      </Link>
    </main>
  );
}
