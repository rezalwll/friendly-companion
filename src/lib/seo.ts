import type { Locale } from "./i18n";

export const SITE_URL = "https://rycode.ir";

type MetaArg = {
  locale: Locale;
  title: string;
  description: string;
  path: string; // path after the locale prefix, e.g. "/services"
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function buildHead({ locale, title, description, path, image, type = "website", noindex }: MetaArg) {
  const url = `${SITE_URL}/${locale}${path}`;
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:locale", content: locale === "fa" ? "fa_IR" : "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex" });

  return {
    meta,
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "fa", href: `${SITE_URL}/fa${path}` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en${path}` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/fa${path}` },
    ],
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}
