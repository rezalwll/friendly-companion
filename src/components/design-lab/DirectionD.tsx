import { ArrowLeft, Play } from "lucide-react";
import type { Palette } from "./palettes";
import { finalCta, hero, nav, posts, projects, services, stats, tech, testimonial } from "@/lib/rycode-content";
import logo from "@/assets/rycode-logo.png.asset.json";

export default function DirectionD({ p }: { p: Palette }) {
  const r = "24px";
  const glow = `radial-gradient(60% 60% at 70% 20%, ${p.accent}22, transparent 70%), radial-gradient(50% 50% at 20% 80%, ${p.primary}25, transparent 70%)`;
  return (
    <div dir="rtl" style={{ background: p.bg, color: p.text, fontFamily: "var(--font-fa)" }}>
      <header className="hidden md:flex items-center justify-between mx-8 mt-6 px-6 py-3"
        style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: "999px", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="RYCODE" className="h-7 w-7 object-contain" />
          <span className="font-bold tracking-tight">RYCODE</span>
        </div>
        <nav className="flex gap-7 text-sm" style={{ color: p.muted }}>{nav.map((n) => <span key={n.en}>{n.fa}</span>)}</nav>
        <button className="px-5 py-2 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: "999px" }}>
          شروع پروژه
        </button>
      </header>

      <div className="md:hidden mx-auto my-5 w-[320px] flex items-center justify-between px-5 py-3"
        style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: "999px" }}>
        <span className="font-bold text-sm">RYCODE</span>
        <span className="text-xs" style={{ color: p.accent }}>منو</span>
      </div>

      {/* Cinematic hero */}
      <section className="relative mx-4 md:mx-8 mt-6 overflow-hidden px-6 md:px-16 py-24 md:py-36 text-center"
        style={{ borderRadius: r, background: `${p.surface2}`, backgroundImage: glow, border: `1px solid ${p.border}` }}>
        <p className="text-xs tracking-[0.35em] mb-6" style={{ color: p.accent }}>RYCODE · رای‌کد</p>
        <h1 className="mx-auto max-w-4xl text-[2.5rem] md:text-[4.6rem] font-extrabold leading-[1.15] tracking-tight">
          {hero.headline}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-sm md:text-base leading-8" style={{ color: p.muted }}>{hero.sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: "999px", boxShadow: `0 20px 60px -20px ${p.primary}` }}>
            {hero.cta1}
          </button>
          <button className="px-8 py-4 text-sm inline-flex items-center gap-2" style={{ border: `1px solid ${p.border}`, borderRadius: "999px" }}>
            <Play size={14} /> {hero.cta2}
          </button>
        </div>
      </section>

      {/* Featured project — cinematic frame */}
      <section className="mx-4 md:mx-8 mt-6 grid md:grid-cols-3 gap-4">
        {projects.map((pr, i) => (
          <article key={pr.title} className={`relative overflow-hidden ${i === 0 ? "md:col-span-2" : ""}`}
            style={{ borderRadius: r, border: `1px solid ${p.border}`, background: p.surface }}>
            <div className="h-56" style={{ backgroundImage: `linear-gradient(160deg, ${p.primary}, ${p.accent})`, opacity: 0.85 }} />
            <div className="p-7">
              <p className="text-xs mb-2" style={{ color: p.accent }}>{pr.cat}</p>
              <h3 className="text-xl font-bold">{pr.title}</h3>
              <p className="mt-2 text-sm" style={{ color: p.muted }}>{pr.metric}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Services */}
      <section className="px-6 md:px-12 py-20">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">توانمندی‌های ما</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.en} className="p-8" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r, boxShadow: `0 30px 60px -40px ${p.primary}` }}>
              <p className="text-[11px] mb-3 tracking-widest" style={{ color: p.accent }}>{s.en.toUpperCase()}</p>
              <h3 className="text-lg font-bold mb-3">{s.fa}</h3>
              <p className="text-sm leading-7" style={{ color: p.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech marquee-ish */}
      <section className="mx-4 md:mx-8 px-8 py-10 flex flex-wrap gap-3 justify-center"
        style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
        {tech.map((t) => (
          <span key={t} className="px-4 py-2 text-xs" style={{ background: p.surface2, borderRadius: "999px", color: p.muted }}>{t}</span>
        ))}
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.l}>
            <p className="text-4xl md:text-5xl font-extrabold" style={{ color: p.accent }}>{s.v}</p>
            <p className="mt-2 text-sm" style={{ color: p.muted }}>{s.l}</p>
          </div>
        ))}
      </section>

      {/* Testimonial */}
      <section className="mx-4 md:mx-8 px-8 md:px-16 py-16 text-center"
        style={{ borderRadius: r, backgroundImage: glow, background: p.surface2, border: `1px solid ${p.border}` }}>
        <p className="mx-auto max-w-3xl text-xl md:text-2xl leading-[2.3rem] font-medium">«{testimonial.quote}»</p>
        <p className="mt-6 text-sm" style={{ color: p.muted }}>{testimonial.name} — {testimonial.role}</p>
      </section>

      {/* Blog + kit */}
      <section className="px-6 md:px-12 py-20 grid md:grid-cols-2 gap-6">
        {posts.map((b) => (
          <div key={b.title} className="overflow-hidden" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
            <div className="h-32" style={{ backgroundImage: `linear-gradient(120deg, ${p.accent}, ${p.primary})`, opacity: 0.7 }} />
            <div className="p-7">
              <p className="text-xs mb-2" style={{ color: p.accent }}>{b.tag} · {b.date}</p>
              <h4 className="text-lg font-bold leading-8">{b.title}</h4>
            </div>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-12 pb-20 grid md:grid-cols-2 gap-6">
        <div className="p-8" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
          <input placeholder="نام شما" className="w-full px-5 py-3.5 text-sm mb-3 outline-none"
            style={{ background: p.surface2, border: `1px solid ${p.border}`, borderRadius: "999px", color: p.text }} />
          <input placeholder="ایمیل" className="w-full px-5 py-3.5 text-sm mb-4 outline-none"
            style={{ background: p.surface2, border: `1px solid ${p.border}`, borderRadius: "999px", color: p.text }} />
          <button className="w-full py-3.5 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: "999px" }}>ارسال</button>
        </div>
        <div className="p-8 space-y-4" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
          <h1 className="text-3xl font-extrabold tracking-tight">تیتر سینمایی H1</h1>
          <p className="text-sm leading-7" style={{ color: p.muted }}>بدنه متن با فضای نرم، هاله‌های رنگی و قاب‌های گرد.</p>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: "999px" }}>Primary</button>
            <button className="px-6 py-3 text-sm" style={{ border: `1px solid ${p.border}`, borderRadius: "999px" }}>Secondary</button>
            <button className="px-6 py-3 text-sm inline-flex items-center gap-2" style={{ color: p.accent }}>Ghost <ArrowLeft size={15} /></button>
          </div>
        </div>
      </section>

      <section className="mx-4 md:mx-8 mb-10 px-8 py-20 text-center" style={{ borderRadius: r, backgroundImage: glow, background: p.surface2, border: `1px solid ${p.border}` }}>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">{finalCta.title}</h2>
        <p className="mt-4 text-sm" style={{ color: p.muted }}>{finalCta.sub}</p>
        <button className="mt-9 px-9 py-4 text-sm font-semibold" style={{ background: p.primary, color: p.onPrimary, borderRadius: "999px", boxShadow: `0 25px 70px -25px ${p.accent}` }}>{finalCta.cta}</button>
      </section>

      <footer className="px-6 md:px-12 py-10 flex flex-wrap justify-between gap-6 text-sm" style={{ borderTop: `1px solid ${p.border}`, color: p.muted }}>
        <span>RYCODE · رای‌کد — rycode.ir</span>
        <div className="flex gap-6">{nav.slice(0, 4).map((n) => <span key={n.en}>{n.fa}</span>)}</div>
      </footer>
    </div>
  );
}
