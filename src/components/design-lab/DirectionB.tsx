import { ArrowLeft, Menu, Terminal } from "lucide-react";
import type { Palette } from "./palettes";
import { finalCta, hero, nav, posts, projects, services, stats, tech, testimonial } from "@/lib/rycode-content";
import logo from "@/assets/rycode-logo.png.asset.json";

export default function DirectionB({ p }: { p: Palette }) {
  const r = "4px";
  const grid = {
    backgroundImage: `linear-gradient(${p.border} 1px, transparent 1px), linear-gradient(90deg, ${p.border} 1px, transparent 1px)`,
    backgroundSize: "48px 48px",
  };
  const mono = { fontFamily: "var(--font-mono)" } as const;

  return (
    <div dir="rtl" style={{ background: p.bg, color: p.text, fontFamily: "var(--font-fa)" }}>
      <header className="hidden md:grid grid-cols-[auto_1fr_auto] items-center gap-8 px-8 py-4" style={{ borderBottom: `1px solid ${p.border}` }}>
        <div className="flex items-center gap-2">
          <img src={logo.url} alt="RYCODE" className="h-7 w-7 object-contain" />
          <span className="font-bold" style={mono}>RYCODE<span style={{ color: p.accent }}>_</span></span>
        </div>
        <nav className="flex gap-6 text-xs justify-center" style={{ ...mono, color: p.muted }}>
          {nav.map((n, i) => <span key={n.en}>{String(i + 1).padStart(2, "0")} / {n.en}</span>)}
        </nav>
        <button className="px-4 py-2 text-xs" style={{ ...mono, border: `1px solid ${p.accent}`, color: p.accent, borderRadius: r }}>
          START_PROJECT
        </button>
      </header>

      <div className="md:hidden mx-auto my-5 w-[320px] flex items-center justify-between px-4 py-3"
        style={{ border: `1px solid ${p.border}`, background: p.surface, borderRadius: r }}>
        <span style={{ ...mono, color: p.accent }} className="text-xs">RYCODE_</span>
        <Menu size={18} style={{ color: p.muted }} />
      </div>

      {/* Hero */}
      <section className="relative px-6 md:px-12 py-20 md:py-28" style={grid}>
        <div className="max-w-4xl">
          <p className="text-[11px] mb-6" style={{ ...mono, color: p.accent }}>// SYSTEMS · APIS · AUTOMATION · AI</p>
          <h1 className="text-[2.2rem] md:text-[3.6rem] font-extrabold leading-[1.2]">{hero.headline}</h1>
          <p className="mt-6 max-w-xl text-sm leading-7" style={{ color: p.muted }}>{hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="px-6 py-3 text-xs font-bold" style={{ ...mono, background: p.accent, color: p.onPrimary, borderRadius: r }}>{hero.cta1}</button>
            <button className="px-6 py-3 text-xs inline-flex items-center gap-2" style={{ ...mono, border: `1px solid ${p.border}`, borderRadius: r }}>
              {hero.cta2} <ArrowLeft size={14} />
            </button>
          </div>
        </div>
        <div className="mt-12 max-w-lg p-4 text-[11px] leading-6" style={{ ...mono, background: p.surface, border: `1px solid ${p.border}`, borderRadius: r, color: p.muted }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: p.accent }}><Terminal size={13} /> build.log</div>
          <div>› deploy rycode/platform ........ <span style={{ color: p.accent }}>OK</span></div>
          <div>› lighthouse performance ........ <span style={{ color: p.accent }}>99</span></div>
          <div>› uptime 90d .................... <span style={{ color: p.accent }}>99.98%</span></div>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-6 md:px-12 py-16">
        <p className="text-[11px] mb-6" style={{ ...mono, color: p.accent }}>[ SERVICES ]</p>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: p.border }}>
          {services.map((s, i) => (
            <div key={s.en} className="p-7" style={{ background: p.bg }}>
              <div className="flex justify-between text-[10px] mb-4" style={{ ...mono, color: p.muted }}>
                <span>{String(i + 1).padStart(2, "0")}</span><span>{s.en}</span>
              </div>
              <h3 className="font-bold mb-2">{s.fa}</h3>
              <p className="text-xs leading-6" style={{ color: p.muted }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-12 pb-16 grid md:grid-cols-3 gap-4">
        {projects.map((pr) => (
          <article key={pr.title} style={{ border: `1px solid ${p.border}`, background: p.surface, borderRadius: r }}>
            <div className="h-32 relative overflow-hidden" style={{ ...grid, backgroundColor: p.surface2 }}>
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: p.accent }} />
            </div>
            <div className="p-5">
              <p className="text-[10px] mb-2" style={{ ...mono, color: p.accent }}>{pr.cat}</p>
              <h3 className="font-bold text-sm mb-2">{pr.title}</h3>
              <p className="text-xs" style={{ color: p.muted }}>{pr.metric}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Tech + stats */}
      <section className="px-6 md:px-12 py-12" style={{ borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}` }}>
        <div className="flex flex-wrap gap-2 mb-12">
          {tech.map((t) => (
            <span key={t} className="px-3 py-1.5 text-[11px]" style={{ ...mono, border: `1px solid ${p.border}`, color: p.muted, borderRadius: r }}>{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.l} style={{ borderRight: `2px solid ${p.accent}` }} className="pr-4">
              <p className="text-3xl font-extrabold" style={mono}>{s.v}</p>
              <p className="text-xs mt-1" style={{ color: p.muted }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 grid md:grid-cols-2 gap-8">
        <div className="p-8" style={{ border: `1px solid ${p.accent}`, borderRadius: r }}>
          <p className="text-[11px] mb-4" style={{ ...mono, color: p.accent }}>{"<testimonial />"}</p>
          <p className="leading-8 text-sm">{testimonial.quote}</p>
          <p className="mt-5 text-xs" style={{ color: p.muted }}>{testimonial.name} · {testimonial.role}</p>
        </div>
        <div className="grid gap-4">
          {posts.map((b) => (
            <div key={b.title} className="p-6" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
              <p className="text-[10px] mb-2" style={{ ...mono, color: p.accent }}>{b.tag} — {b.date}</p>
              <h4 className="text-sm font-bold leading-6">{b.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* UI kit */}
      <section className="px-6 md:px-12 pb-16 grid md:grid-cols-2 gap-4">
        <div className="p-7" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
          <input placeholder="name@company.ir" className="w-full px-4 py-3 text-xs mb-3 outline-none"
            style={{ ...mono, background: p.bg, border: `1px solid ${p.border}`, color: p.text, borderRadius: r }} />
          <textarea placeholder="شرح فنی پروژه..." rows={3} className="w-full px-4 py-3 text-xs mb-3 outline-none resize-none"
            style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.text, borderRadius: r }} />
          <button className="px-6 py-3 text-xs font-bold" style={{ ...mono, background: p.accent, color: p.onPrimary, borderRadius: r }}>SUBMIT →</button>
        </div>
        <div className="p-7 space-y-3" style={{ background: p.surface, border: `1px solid ${p.border}`, borderRadius: r }}>
          <h1 className="text-2xl font-extrabold">تیتر H1 مهندسی</h1>
          <p className="text-xs leading-6" style={{ color: p.muted }}>متن بدنه فشرده با برچسب‌های مونواسپیس.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button className="px-4 py-2 text-[11px] font-bold" style={{ ...mono, background: p.accent, color: p.onPrimary, borderRadius: r }}>PRIMARY</button>
            <button className="px-4 py-2 text-[11px]" style={{ ...mono, border: `1px solid ${p.accent}`, color: p.accent, borderRadius: r }}>OUTLINE</button>
            <button className="px-4 py-2 text-[11px]" style={{ ...mono, color: p.muted }}>GHOST</button>
          </div>
        </div>
      </section>

      <section className="mx-6 md:mx-12 mb-14 p-12 text-center" style={{ border: `1px solid ${p.accent}`, borderRadius: r, ...grid }}>
        <h2 className="text-2xl md:text-3xl font-extrabold">{finalCta.title}</h2>
        <p className="mt-3 text-xs" style={{ color: p.muted }}>{finalCta.sub}</p>
        <button className="mt-7 px-7 py-3 text-xs font-bold" style={{ ...mono, background: p.accent, color: p.onPrimary, borderRadius: r }}>{finalCta.cta}</button>
      </section>

      <footer className="px-6 md:px-12 py-8 text-[11px] flex flex-wrap justify-between gap-4" style={{ ...mono, borderTop: `1px solid ${p.border}`, color: p.muted }}>
        <span>RYCODE.IR © 2026 — ALL SYSTEMS OPERATIONAL</span>
        <span style={{ color: p.accent }}>[ status: online ]</span>
      </footer>
    </div>
  );
}
