import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { directions } from "@/components/design-lab/palettes";
import DirectionA from "@/components/design-lab/DirectionA";
import DirectionB from "@/components/design-lab/DirectionB";
import DirectionC from "@/components/design-lab/DirectionC";
import DirectionD from "@/components/design-lab/DirectionD";

export const Route = createFileRoute("/design-lab")({
  head: () => ({
    meta: [
      { title: "آزمایشگاه طراحی RYCODE — چهار جهت بصری" },
      { name: "description", content: "مقایسه چهار جهت طراحی پریمیوم برای وب‌سایت و پلتفرم رای‌کد (RYCODE)." },
      { property: "og:title", content: "آزمایشگاه طراحی RYCODE" },
      { property: "og:description", content: "چهار جهت طراحی پریمیوم برای برند رای‌کد." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DesignLab,
});

const views = { A: DirectionA, B: DirectionB, C: DirectionC, D: DirectionD } as const;

function DesignLab() {
  const [id, setId] = useState<"A" | "B" | "C" | "D">("A");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const def = directions.find((d) => d.id === id)!;
  const View = views[id];
  const palette = def[mode];

  return (
    <div dir="rtl" className="min-h-screen bg-neutral-100 dark:bg-neutral-950" style={{ fontFamily: "var(--font-fa)" }}>
      {/* Sticky selector */}
      <div className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight text-neutral-900">RYCODE · Design Lab</span>
            <span className="hidden text-xs text-neutral-500 sm:inline">{def.nameFa} — {def.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-neutral-300">
              {directions.map((d) => (
                <button key={d.id} onClick={() => setId(d.id)}
                  className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
                    id === d.id ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                  }`}>
                  {d.id}
                </button>
              ))}
            </div>
            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-medium text-neutral-700">
              {mode === "dark" ? <Moon size={14} /> : <Sun size={14} />}
              {mode === "dark" ? "دارک" : "لایت"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <p className="mb-6 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">{def.summary}</p>

        {/* Design system panel */}
        <div className="mb-6 grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest text-neutral-500">COLORS</p>
            <div className="flex gap-2">
              {def.swatches.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="h-10 w-10 rounded-lg border border-black/10" style={{ background: s.value }} />
                  <p className="mt-1 text-[10px] text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>
            <dl className="mt-4 space-y-1 text-xs text-neutral-600">
              <div>اصلی: {def.system.primary}</div>
              <div>اکسنت: {def.system.accent}</div>
              <div>پس‌زمینه: {def.system.background}</div>
            </dl>
          </div>
          <dl className="space-y-2 text-xs text-neutral-600">
            <div><span className="font-bold text-neutral-900">تایپوگرافی: </span>{def.system.typography}</div>
            <div><span className="font-bold text-neutral-900">شعاع گوشه: </span>{def.system.radius}</div>
            <div><span className="font-bold text-neutral-900">فلسفه سایه: </span>{def.system.shadow}</div>
          </dl>
          <dl className="space-y-2 text-xs text-neutral-600">
            <div><span className="font-bold text-neutral-900">دکمه: </span>{def.system.button}</div>
            <div><span className="font-bold text-neutral-900">کارت: </span>{def.system.card}</div>
            <div><span className="font-bold text-neutral-900">انیمیشن: </span>{def.system.animation}</div>
          </dl>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-2xl border border-neutral-300 shadow-2xl">
          <View p={palette} />
        </div>

        {/* Side-by-side light/dark thumbnails */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {(["light", "dark"] as const).map((m) => (
            <div key={m}>
              <p className="mb-2 text-xs font-bold tracking-widest text-neutral-500">
                {m === "light" ? "LIGHT MODE" : "DARK MODE"}
              </p>
              <div className="h-[420px] overflow-hidden rounded-xl border border-neutral-300">
                <div className="origin-top-right scale-[0.5]" style={{ width: "200%" }}>
                  <View p={def[m]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
