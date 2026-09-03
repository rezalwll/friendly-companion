# RYCODE — Production Platform Plan (Direction D)

Direction D (Cinematic Digital Studio) is locked as the design system: deep navy surfaces, electric cyan accent, soft glows, large framing, pill controls, 24px radius, IranYekan (FA) + Sora/Space Grotesk (EN).

Note: the reported `src/lib/utils.ts(8,7)` TypeScript error is stale — the current file has only 6 lines and typechecks clean. No fix needed.

## 1. Information architecture

Localized routes with a language prefix: `/fa/...` (default, RTL) and `/en/...` (LTR). `/` redirects to the preferred locale. Every page defines its own `head()` with title, description, OG tags, canonical and hreflang.

```text
/{lang}/                     home
/{lang}/services             /{lang}/services/{slug}
/{lang}/portfolio            /{lang}/portfolio/{slug}
/{lang}/about  why  technologies  process
/{lang}/pricing  installments
/{lang}/request              multi-step project wizard
/{lang}/blog   /blog/category/{slug}   /blog/{slug}   /search
/{lang}/faq  contact  support  careers
/{lang}/privacy  terms  cookies
/{lang}/auth (login/register/forgot)   /{lang}/reset-password
/dashboard/...               customer area (auth gated)
/admin/...                   staff area (role gated)
/sitemap.xml  /robots.txt
```

Marketing, dashboard and admin get three separate shells; admin is visually distinct but on-brand.

## 2. Database architecture

Postgres via Lovable Cloud. UUID keys, `created_at`/`updated_at` everywhere, RLS on every table, explicit grants.

- Identity: `profiles`, `app_role` enum (`super_admin`, `admin`, `support`, `editor`, `customer`), `user_roles`, `has_role()` security-definer function.
- Content: `services`, `projects`, `project_media`, `testimonials`, `faqs`, `blog_posts`, `blog_categories`, `blog_tags`, `blog_post_tags`, `authors`. Bilingual columns (`title_fa`/`title_en`, …) plus per-locale slugs.
- Commerce: `project_requests`, `orders`, `order_items`, `payments`, `installments`, `invoices`.
- Service: `tickets`, `ticket_messages`, `notifications`, `contact_messages`, `newsletter_subscribers`.
- Ops: `site_settings`, `analytics_events`, `activity_logs`, storage buckets for media and request attachments.

RLS shape: public content readable by `anon` only when `status = 'published'`; customer rows scoped to `auth.uid()`; staff access through `has_role()`. Roles never live on `profiles`.

## 3. Auth & authorization

Email/password with verification, forgot/reset, optional Google sign-in via the managed broker. Protected UI lives under the managed `_authenticated` layout; every server function that touches private data re-checks auth server-side (`requireSupabaseAuth`) and admin functions re-check role via `has_role()`. No client-side role trust.

## 4. Implementation phases

1. **Foundation** — Cloud enabled, design tokens for Direction D, i18n layer + language switcher, theme (light/dark/system, persisted), shared layout/nav/footer, UI primitives, loading/empty/error states.
2. **Database & auth** — full schema migration with grants + RLS + seed content, auth pages, profile creation trigger, role system.
3. **Marketing site** — home, services + detail, portfolio + case study detail, about/why/technologies/process, pricing, installments, FAQ, contact, careers, legal, 404/500.
4. **Lead engine** — multi-step project request wizard with validation and file upload, contact form, newsletter, admin notification, confirmation.
5. **Blog & SEO** — article/category/tag/author rendering, TOC, reading time, search, sitemap.xml, robots, hreflang, JSON-LD (Article, FAQ, Breadcrumb).
6. **Customer dashboard** — overview, projects, requests, orders, invoices, installments, tickets, messages, files, notifications, settings.
7. **Admin panel** — dashboard metrics plus CRUD for every entity above, media library, site settings, SEO settings, navigation/footer, translations, activity logs.
8. **Analytics & polish** — privacy-conscious event capture and reporting, accessibility pass, performance pass, responsive QA on all breakpoints.

Each phase is built, typechecked and verified in the browser before the next begins.

## 5. External services

- Lovable Cloud (database, auth, storage, server functions) — enabled in phase 1.
- Transactional email for verification/notifications — built-in Cloud email; a custom sending domain can be added later.
- Payments: no gateway is wired. Installments are tracked as records with manual/admin-confirmed status. Iranian gateways (Zarinpal etc.) need your merchant credentials and can be added afterwards.
- Real contact details, social links and portfolio content stay as clearly marked placeholders until you supply them.

## 6. Notes

This is a large build. I will implement it phase by phase and report at each checkpoint rather than dumping everything at once.
