import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

const staticPaths = [
  "",
  "/services",
  "/portfolio",
  "/blog",
  "/about",
  "/why",
  "/technologies",
  "/process",
  "/pricing",
  "/installments",
  "/careers",
  "/faq",
  "/contact",
  "/request",
  "/privacy",
  "/terms",
  "/cookies",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = ["fa", "en"].flatMap((lang) =>
          staticPaths.map((path) => `${SITE_URL}/${lang}${path}`),
        );
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
