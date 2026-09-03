import { ArrowLeft } from "lucide-react";
import type { Palette } from "./palettes";
import { finalCta, hero, nav, posts, projects, services, stats, tech, testimonial } from "@/lib/rycode-content";
import logo from "@/assets/rycode-logo.png.asset.json";

export default function DirectionC({ p }: { p: Palette }) {
  const line = `1px solid ${p.border}`;
  return (
    <div dir="rtl" style={{ background: p.bg, color: p.text, fontFamily: "var(--font-fa)" }}>
      <header className="hidden md:flex items-baseline justify-between px-10 py-6" style={{ borderBottom: line }}>
        <div className="flex items-baseline gap-3">
          <img src={logo.url} alt="RYCODE" className="h-6 w-6 object-contain self-center" />
          <span className="text-xl font-extrabold tracking-[-0.04em]">RYCODE</span>
          <span className="text-xs" style={{ color: p.muted }}>رای‌کد</span>
        </div>
        <nav className="flex gap-10 text-sm">
          {nav.map((n) => <span key={n.en} className="border-b border-transparent hover:border-current pb-1">{n.fa}</span>)}
        </nav>
      </header>

      <div className="md:hidden mx-auto my-5 w-[320px] flex items-baseline justify-between px-4 py-3" style={{ borderBottom: line, borderTop: line }}>
        <span className="text-lg font-extrabold tracking-tight">RYCODE</span>
        <span className="text-xs">منو ↓</span>
      </div>

      {/* Hero — editorial grid */}
      <section className="grid md:grid-cols-12 px-6 md:px-10 pt-16 md:pt-24 pb-20 gap-y-10">
        <div className="md:col-span-8">
          <h1 className="text-[2.6rem] md:text-[5rem] leading-[1.05] font-extrabold tracking-[-0.045em]">
            {hero.headline}
          </h1>
        </div>
        <div className="md:col-span-4 md:pt-4 md:border-r md:pr-8" style={{ borderColor: p.border }}>
          <p className="text-xs tracking-[0.25em] mb-4" style={{ color: p.muted }}>EST. 2015 — TEHRAN</p>
          <p className="text-sm leading-7" style={{ color: p.muted }}>{hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 items-start">
            <button className="px-6 py-3 text-sm font-semibold w-full" style={{ background: p.primary, color: p.onPrimary }}>{hero.cta1}</button>
            <button className="text-sm inline-flex items-center gap-2 border-b pb-1" style={{ borderColor: p.text }}>
              {hero.cta2} <ArrowLeft size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Services as index list */}
      <section className="px-6 md:px-10 pb-20" style={{ borderTop: line }}>
        {services.map((s, i) => (
          <div key={s.en} className="grid md:grid-cols-12 gap-4 py-7 items-baseline" style={{ borderBottom: line }}>
            <span className="md:col-span-1 text-xs" style={{ color: p.muted }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="md:col-span-4 text-xl md:text-2xl font-bold tracking-tight">{s.fa}</h3>
            <span className="md:col-span-3 text-xs tracking-widest" style={{ color: p.accent }}>{s.en.toUpperCase()}</span>
            <p className="md:col-span-4 text-sm leading-7" style={{ color: p.muted }}>{s.desc}</p>
          </div>
        ))}
      </section>

      {/* Work */}
      <section className="px-6 md:px-10 pb-20 grid md:grid-cols-3 gap-10">
        {projects.map((pr) => (
          <article key={pr.title}>
            <div className="aspect-[4/3] mb-4" style={{ background: p.surface2, border: line }} />
            <h3 className="text-lg font-bold tracking-tight">{pr.title}</h3>
            <p className="text-xs mt-1" style={{ color: p.muted }}>{pr.cat}</p>
            <p className="text-xs mt-2" style={{ color: p.accent }}>{pr.metric}</p>
          </article>
        ))}
      </section>

      {/* Tech + stats */}
      <section className="px-6 md:px-10 py-14" style={{ borderTop: line, borderBottom: line }}>
        <div className="grid md:grid-cols-12 gap-8">
          <p className="md:col-span-3 text-xs tracking-[0.25em]" style={{ color: p.muted }}>TECHNOLOGY</p>
          <div className="md:col-span-9 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {tech.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {stats.map((s) => (
          <div key={s.l}>
            <p className="text-4xl md:text-6xl font-extrabold tracking-[-0.05em]">{s.v}</p>
            <p className="mt-2 text-xs" style={{ color: p.muted }}>{s.l}</p>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-10 pb-20 grid md:grid-cols-12 gap-8" style={{ borderTop: line, paddingTop: "3.5rem" }}>
        <blockquote className="md:col-span-7 text-2xl md:text-[2rem] leading-[1.6] font-medium tracking-tight">
          «{testimonial.quote}»
          <footer className="mt-6 text-xs font-normal" style={{ color: p.muted }}>{testimonial.name}، {testimonial.role}</footer>
        </blockquote>
        <div className="md:col-span-5 space-y-6">
          {posts.map((b) => (
            <div key={b.title} className="pb-5" style={{ borderBottom: line }}>
              <p className="text-[11px] tracking-widest mb-2" style={{ color: p.muted }}>{b.tag} — {b.date}</p>
              <h4 className="text-lg font-bold tracking-tight leading-7">{b.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* UI kit */}
      <section className="px-6 md:px-10 pb-20 grid md:grid-cols-2 gap-10" style={{ borderTop: line, paddingTop: "3rem" }}>
        <div>
          <p className="text-xs tracking-[0.25em] mb-5" style={{ color: p.muted }}>FORM</p>
          <input placeholder="نام" className="w-full px-0 py-3 text-sm mb-4 bg-transparent outline-none"
            style={{ borderBottom: line, color: p.text }} />
          <input placeholder="ایمیل" className="w-full px-0 py-3 text-sm mb-6 bg-transparent outline-none"
            style={{ borderBottom: line, color: p.text }} />
          <button className="px-8 py-3 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary }}>ارسال درخواست</button>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-[-0.045em]">H1 — سوئیسی</h1>
          <h3 className="text-xl font-bold tracking-tight">H3 — تیتر بخش</h3>
          <p className="text-sm leading-7" style={{ color: p.muted }}>بدنه متن با گرید ۱۲ ستونی و خطوط یک‌پیکسلی؛ بدون سایه، بدون گوشه گرد.</p>
          <div className="flex gap-4 pt-2">
            <button className="px-6 py-3 text-sm" style={{ background: p.primary, color: p.onPrimary }}>Primary</button>
            <button className="px-6 py-3 text-sm" style={{ border: line }}>Secondary</button>
            <button className="text-sm border-b pb-1" style={{ borderColor: p.accent, color: p.accent }}>Link</button>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20" style={{ background: p.primary, color: p.onPrimary }}>
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-[-0.05em] max-w-3xl">{finalCta.title}</h2>
        <p className="mt-5 text-sm opacity-75">{finalCta.sub}</p>
        <button className="mt-9 px-8 py-3 text-sm font-semibold" style={{ background: p.onPrimary, color: p.primary }}>{finalCta.cta}</button>
      </section>

      <footer className="px-6 md:px-10 py-10 grid md:grid-cols-3 gap-6 text-xs" style={{ color: p.muted }}>
        <span>RYCODE — رای‌کد</span>
        <span>rycode.ir</span>
        <span>© ۱۴۰۵ تمامی حقوق محفوظ است</span>
      </footer>
    </div>
  );
}
