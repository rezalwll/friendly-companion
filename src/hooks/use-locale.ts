import { useParams } from "@tanstack/react-router";
import { defaultLocale, dirOf, isLocale, makeT, type Locale } from "@/lib/i18n";

export function useLocale(): { lang: Locale; dir: "rtl" | "ltr"; t: ReturnType<typeof makeT> } {
  const params = useParams({ strict: false }) as { lang?: string };
  const lang = params.lang && isLocale(params.lang) ? params.lang : defaultLocale;
  return { lang, dir: dirOf(lang), t: makeT(lang) };
}

export type { Locale };
