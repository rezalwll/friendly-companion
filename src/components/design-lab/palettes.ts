import type { DirectionTokens } from "@/lib/rycode-content";

export type Palette = {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  onPrimary: string;
  accent: string;
};

export type DirectionDef = DirectionTokens & {
  light: Palette;
  dark: Palette;
  radius: string;
  font: string;
};

const NAVY = "#0B1B3A";
const NAVY_DEEP = "#060F24";
const ROYAL = "#1B45B4";
const CYAN = "#22C7FF";

export const directions: DirectionDef[] = [
  {
    id: "A",
    name: "Executive Tech Luxury",
    nameFa: "لوکس اجرایی",
    summary:
      "اعتماد شرکتی در بالاترین سطح: تایپوگرافی بزرگ، فضای سخاوتمند، سطوح سرمه‌ای و حرکات بسیار دقیق.",
    radius: "14px",
    font: "var(--font-fa), var(--font-display)",
    light: {
      bg: "#F7F8FB", surface: "#FFFFFF", surface2: "#EEF2F9", text: NAVY_DEEP,
      muted: "#5A6786", border: "#DFE5F0", primary: NAVY, onPrimary: "#FFFFFF", accent: ROYAL,
    },
    dark: {
      bg: NAVY_DEEP, surface: "#0C1730", surface2: "#122145", text: "#EEF3FF",
      muted: "#93A3C4", border: "rgba(255,255,255,0.09)", primary: "#FFFFFF", onPrimary: NAVY_DEEP, accent: "#5B8BFF",
    },
    system: {
      primary: "Navy #0B1B3A", accent: "Royal #1B45B4", background: "Off-white #F7F8FB / Navy #060F24",
      typography: "IranYekan + Space Grotesk · مقیاس بزرگ و کنتراست وزنی",
      radius: "14px — نرم ولی رسمی", shadow: "سایه‌های عمیق و کم‌رنگ، تک‌لایه",
      button: "دکمه‌های توپر با ارتفاع بلند و حاشیه ظریف", card: "کارت‌های تمیز با خط جداکننده افقی",
      animation: "فید و حرکت ۸ پیکسلی، ایزینگ آرام (۶۰۰ms)",
    },
    swatches: [
      { label: "Navy", value: NAVY }, { label: "Royal", value: ROYAL },
      { label: "Slate", value: "#5A6786" }, { label: "Paper", value: "#F7F8FB" },
    ],
  },
  {
    id: "B",
    name: "Futuristic Engineering",
    nameFa: "مهندسی آینده‌نگر",
    summary:
      "رابط تکنیکال با گریدهای ظریف، برچسب‌های مونواسپیس و لهجه‌ی فیروزه‌ای — تجربی اما شیک.",
    radius: "4px",
    font: "var(--font-fa), var(--font-mono)",
    light: {
      bg: "#F2F5F9", surface: "#FFFFFF", surface2: "#E7EDF5", text: "#08111F",
      muted: "#5D6B80", border: "#D5DEEA", primary: "#08111F", onPrimary: "#EAFBFF", accent: "#0093C7",
    },
    dark: {
      bg: "#05090F", surface: "#0A121C", surface2: "#0F1A28", text: "#DDEAF5",
      muted: "#7C90A8", border: "rgba(34,199,255,0.18)", primary: CYAN, onPrimary: "#04121A", accent: CYAN,
    },
    system: {
      primary: "Ink #05090F", accent: "Electric Cyan #22C7FF", background: "گرید تکنیکال روی سطوح تیره",
      typography: "IranYekan + JetBrains Mono برای برچسب‌ها و داده",
      radius: "4px — لبه‌های دقیق مهندسی", shadow: "بدون سایه؛ عمق با خط و درخشش فیروزه‌ای",
      button: "دکمه‌های خطی با گوشه‌نما و هاور درخشان", card: "کارت‌های گرید با هدر داده‌ای",
      animation: "ترنزیشن‌های سریع ۱۵۰ms، اسکن‌لاین و شمارنده",
    },
    swatches: [
      { label: "Ink", value: "#05090F" }, { label: "Cyan", value: CYAN },
      { label: "Steel", value: "#7C90A8" }, { label: "Grid", value: "#0F1A28" },
    ],
  },
  {
    id: "C",
    name: "Minimal Swiss Technology",
    nameFa: "مینیمال سوئیسی",
    summary:
      "گرید تحریریه، تایپوگرافی قدرتمند، سفیدی فراوان و رنگ محدود — حس استودیوی طراحی سطح بالا.",
    radius: "0px",
    font: "var(--font-fa), var(--font-display)",
    light: {
      bg: "#FFFFFF", surface: "#FFFFFF", surface2: "#F3F3F1", text: "#111214",
      muted: "#6B6F76", border: "#111214", primary: "#111214", onPrimary: "#FFFFFF", accent: ROYAL,
    },
    dark: {
      bg: "#0E0F11", surface: "#0E0F11", surface2: "#17181B", text: "#F4F4F2",
      muted: "#9BA0A8", border: "#F4F4F2", primary: "#F4F4F2", onPrimary: "#0E0F11", accent: CYAN,
    },
    system: {
      primary: "Ink #111214", accent: "Royal Blue #1B45B4", background: "کاغذ سفید / مشکی مات",
      typography: "IranYekan + Space Grotesk · مقیاس تحریریه با تراکینگ منفی",
      radius: "0px — گوشه‌های تیز", shadow: "بدون سایه؛ فقط خطوط ۱ پیکسلی",
      button: "دکمه‌های مستطیل با زیرخط متحرک", card: "سلول‌های گرید بدون پس‌زمینه",
      animation: "ماسک متنی و ریول عمودی، بسیار خویشتن‌دار",
    },
    swatches: [
      { label: "Ink", value: "#111214" }, { label: "Paper", value: "#F3F3F1" },
      { label: "Royal", value: ROYAL }, { label: "Cyan", value: CYAN },
    ],
  },
  {
    id: "D",
    name: "Cinematic Digital Studio",
    nameFa: "استودیوی سینمایی",
    summary:
      "قاب‌های بزرگ، لایه‌های نوری ملایم و روایت بصری — نمایش نمونه‌کار مثل یک تیزر.",
    radius: "24px",
    font: "var(--font-fa), var(--font-sans)",
    light: {
      bg: "#F5F6F8", surface: "#FFFFFF", surface2: "#E9EDF4", text: "#0A1224",
      muted: "#586279", border: "#E1E6EF", primary: ROYAL, onPrimary: "#FFFFFF", accent: "#00A6D6",
    },
    dark: {
      bg: "#070A12", surface: "rgba(255,255,255,0.04)", surface2: "rgba(255,255,255,0.07)", text: "#F0F4FF",
      muted: "#9AA6C0", border: "rgba(255,255,255,0.10)", primary: CYAN, onPrimary: "#05121B", accent: "#6FA8FF",
    },
    system: {
      primary: "Royal #1B45B4", accent: "Cyan #22C7FF", background: "شب سینمایی با هاله‌های نرم",
      typography: "IranYekan + Sora · تیترهای بسیار بزرگ",
      radius: "24px — قاب‌های سینمایی", shadow: "سایه‌های نرم و گسترده با هاله رنگی",
      button: "دکمه‌های کپسولی با هاله هنگام هاور", card: "قاب‌های تصویری تمام‌عرض با پوشش تدریجی",
      animation: "پارالاکس اسکرول و ریول تدریجی (۹۰۰ms)",
    },
    swatches: [
      { label: "Royal", value: ROYAL }, { label: "Cyan", value: CYAN },
      { label: "Midnight", value: "#070A12" }, { label: "Mist", value: "#E9EDF4" },
    ],
  },
];
