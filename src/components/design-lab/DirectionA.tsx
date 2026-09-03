import { ArrowLeft, Check, Menu } from "lucide-react";
import type { Palette } from "./palettes";
import { finalCta, hero, nav, posts, projects, services, stats, tech, testimonial } from "@/lib/rycode-content";
import logo from "@/assets/rycode-logo.png.asset.json";

export default function DirectionA({ p }: { p: Palette }) {
  const r = "14px";
  return (
    <div dir="rtl" style={{ background: p.bg, color: p.text, fontFamily: "var(--font-fa)" }} className="overflow-hidden">
      {/* Desktop navbar */}
      <header className="hidden md:flex items-center justify-between px-10 py-5" style={{ borderBottom: `1px solid ${p.border}` }}>
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="RYCODE" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold tracking-tight">RYCODE</span>
        </div>
        <nav className="flex items-center gap-8 text-sm" style={{ color: p.muted }}>
          {nav.map((n) => <span key={n.en}>{n.fa}</span>)}
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-sm px-4 py-2" style={{ color: p.text }}>ورود مشتریان</button>
          <button className="text-sm px-5 py-2.5 font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: r }}>
            درخواست پروژه
          </button>
        </div>
      </header>

      {/* Mobile navbar concept */}
      <div className="md:hidden mx-auto my-6 w-[320px]" style={{ border: `1px solid ${p.border}`, borderRadius: r, background: p.surface }}>
        <div className="flex items-center justify-between px-4 py-3">
          <Menu size={18} style={{ color: p.muted }} />
          <span className="font-bold">RYCODE</span>
          <img src={logo.url} alt="" className="h-6 w-6 object-contain" />
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-16 py-16 md:py-28 max-w-6xl">
        <p className="text-xs tracking-[0.3em] mb-6" style={{ color: p.accent }}>{hero.eyebrow}</p>
        <h1 className="text-[2.4rem] md:text-[4.2rem] leading-[1.15] font-extrabold tracking-tight max-w-4xl">
          {hero.headline}
        </h1>
        <p className="mt-7 text-base md:text-lg max-w-2xl leading-8" style={{ color: p.muted }}>{hero.sub}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="px-7 py-4 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: r }}>
            {hero.cta1}
          </button>
          <button className="px-7 py-4 text-sm font-semibold inline-flex items-center gap-2" style={{ border: `1px solid ${p.border}`, borderRadius: r }}>
            {hero.cta2} <ArrowLeft size={16} />
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-16 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">خدمات مهندسی</h2>
        <div className="grid gap-px md:grid-cols-3" style={{ background: p.border }}>
          {services.map((s) => (
            <div key={s.en} className="p-8" style={{ background: p.surface }}>
              <p className="text-[11px] tracking-widest mb-3" style={{ color: p.accent }}>{s.en.toUpperCase()}</p>
              <h3 className="text-lg font-bold mb-3">{s.fa}</h3>
              <p className="text-sm leading-7" style={{ color: p.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio + tech */}
      <section className="px-6 md:px-16 pb-20 grid gap-8 md:grid-cols-3">
        {projects.map((pr) => (
          <article key={pr.title} style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }} className="overflow-hidden">
            <div className="h-36" style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.accent})` }} />
            <div className="p-6">
              <p className="text-[11px] mb-2" style={{ color: p.muted }}>{pr.cat}</p>
              <h3 className="font-bold mb-3">{pr.title}</h3>
              <p className="text-sm font-semibold" style={{ color: p.accent }}>{pr.metric}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="px-6 md:px-16 pb-20">
        <p className="text-xs tracking-widest mb-5" style={{ color: p.muted }}>TECHNOLOGY STACK</p>
        <div className="flex flex-wrap gap-3">
          {tech.map((t) => (
            <span key={t} className="px-4 py-2 text-xs" style={{ border: `1px solid ${p.border}`, borderRadius: r, color: p.muted }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 py-14" style={{ background: p.surface2 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-3xl md:text-5xl font-extrabold tracking-tight">{s.v}</p>
              <p className="mt-2 text-sm" style={{ color: p.muted }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial + blog */}
      <section className="px-6 md:px-16 py-20 grid gap-10 md:grid-cols-2">
        <blockquote className="text-xl md:text-2xl leading-[2.2rem] font-medium">
          «{testimonial.quote}»
          <footer className="mt-6 text-sm font-normal" style={{ color: p.muted }}>
            {testimonial.name} — {testimonial.role}
          </footer>
        </blockquote>
        <div className="grid gap-4">
          {posts.map((b) => (
            <div key={b.title} className="p-6" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
              <p className="text-[11px] mb-2" style={{ color: p.accent }}>{b.tag} · {b.date}</p>
              <h4 className="font-bold leading-7">{b.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* UI kit */}
      <section className="px-6 md:px-16 pb-20 grid gap-6 md:grid-cols-2">
        <div className="p-8" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
          <p className="text-xs mb-4" style={{ color: p.muted }}>فرم درخواست پروژه</p>
          <input placeholder="نام و نام خانوادگی" className="w-full px-4 py-3 text-sm mb-3 outline-none"
            style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: r, color: p.text }} />
          <input placeholder="ایمیل یا شماره تماس" className="w-full px-4 py-3 text-sm mb-3 outline-none"
            style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: r, color: p.text }} />
          <button className="w-full py-3 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: r }}>ارسال</button>
        </div>
        <div className="p-8 space-y-4" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
          <h1 className="text-3xl font-extrabold tracking-tight">تیتر اصلی H1</h1>
          <h3 className="text-lg font-bold">تیتر فرعی H3</h3>
          <p className="text-sm leading-7" style={{ color: p.muted }}>متن بدنه با فونت ایران‌یکان و ارتفاع خط سخاوتمند برای خوانایی بالا.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="px-5 py-2.5 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: r }}>Primary</button>
            <button className="px-5 py-2.5 text-sm" style={{ border: `1px solid ${p.border}`, borderRadius: r }}>Secondary</button>
            <button className="px-5 py-2.5 text-sm inline-flex items-center gap-2" style={{ color: p.accent }}><Check size={15} /> Ghost</button>
          </div>
        </div>
      </section>

      {/* CTA + footer */}
      <section className="mx-6 md:mx-16 mb-16 p-10 md:p-16 text-center" style={{ background: p.primary, color: p.onPrimary, borderRadius: r }}>
        <h2 className="text-2xl md:text-4xl font-extrabold">{finalCta.title}</h2>
        <p className="mt-4 text-sm opacity-80">{finalCta.sub}</p>
        <button className="mt-8 px-8 py-4 text-sm font-semibold" style={{ background: p.onPrimary, color: p.primary, borderRadius: r }}>{finalCta.cta}</button>
      </section>

      <footer className="px-6 md:px-16 py-10 flex flex-wrap gap-6 justify-between text-sm" style={{ borderTop: `1px solid ${p.border}`, color: p.muted }}>
        <span>© ۱۴۰۵ RYCODE · رای‌کد — rycode.ir</span>
        <div className="flex gap-6">{nav.slice(0, 4).map((n) => <span key={n.en}>{n.fa}</span>)}</div>
      </footer>
    </div>
  );
}
