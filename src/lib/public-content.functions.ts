import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublicServerClient } from "./supabase-public";

const SERVICE_COLUMNS =
  "id, slug, category, icon, title_fa, title_en, excerpt_fa, excerpt_en, body_fa, body_en, benefits_fa, benefits_en, capabilities_fa, capabilities_en, tech_stack, seo_title_fa, seo_title_en, seo_desc_fa, seo_desc_en, featured, sort_order";

const PROJECT_LIST_COLUMNS =
  "id, slug, title_fa, title_en, client_name, industry_fa, industry_en, project_type, summary_fa, summary_en, metrics, technologies, services, cover_url, featured, sort_order";

const POST_LIST_COLUMNS =
  "id, slug, title_fa, title_en, excerpt_fa, excerpt_en, cover_url, reading_minutes, featured, published_at, category_id";

export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("services")
    .select(SERVICE_COLUMNS)
    .eq("status", "published")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getService = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    const supabase = createPublicServerClient();
    const { data } = await supabase
      .from("services")
      .select(SERVICE_COLUMNS)
      .eq("slug", input.slug)
      .eq("status", "published")
      .maybeSingle();
    return data;
  });

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_LIST_COLUMNS)
    .eq("status", "published")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    const supabase = createPublicServerClient();
    const { data } = await supabase
      .from("projects")
      .select("*, project_media(url, caption_fa, caption_en, sort_order)")
      .eq("slug", input.slug)
      .eq("status", "published")
      .maybeSingle();
    return data;
  });

export const getPosts = createServerFn({ method: "GET" })
  .inputValidator((input: { category?: string; limit?: number } | undefined) =>
    z
      .object({ category: z.string().max(120).optional(), limit: z.number().int().max(50).optional() })
      .parse(input ?? {}),
  )
  .handler(async ({ data: input }) => {
    const supabase = createPublicServerClient();
    let query = supabase
      .from("blog_posts")
      .select(`${POST_LIST_COLUMNS}, blog_categories(slug, name_fa, name_en)`)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(input.limit ?? 24);
    if (input.category) {
      const { data: cat } = await supabase
        .from("blog_categories")
        .select("id")
        .eq("slug", input.category)
        .maybeSingle();
      query = query.eq("category_id", cat?.id ?? "00000000-0000-0000-0000-000000000000");
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().max(160) }).parse(input))
  .handler(async ({ data: input }) => {
    const supabase = createPublicServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*, blog_categories(slug, name_fa, name_en), authors(name_fa, name_en, role_fa, role_en, avatar_url)")
      .eq("slug", input.slug)
      .eq("status", "published")
      .maybeSingle();
    return data;
  });

export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const { data } = await supabase.from("blog_categories").select("*").order("sort_order");
  return data ?? [];
});

export const getFaqs = createServerFn({ method: "GET" })
  .inputValidator((input: { scope?: string } | undefined) =>
    z.object({ scope: z.string().max(40).optional() }).parse(input ?? {}),
  )
  .handler(async ({ data: input }) => {
    const supabase = createPublicServerClient();
    let query = supabase.from("faqs").select("*").eq("status", "published").order("sort_order");
    if (input.scope) query = query.eq("scope", input.scope);
    const { data } = await query;
    return data ?? [];
  });

export const getTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order");
  return data ?? [];
});

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  const map: Record<string, Record<string, string>> = {};
  for (const row of data ?? []) {
    const value = (row.value ?? {}) as Record<string, unknown>;
    const flat: Record<string, string> = {};
    for (const [k, v] of Object.entries(value)) flat[k] = typeof v === "string" ? v : String(v ?? "");
    map[row.key] = flat;
  }
  return map;
});

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const [services, projects, posts, testimonials, faqs] = await Promise.all([
    supabase.from("services").select(SERVICE_COLUMNS).eq("status", "published").order("sort_order"),
    supabase
      .from("projects")
      .select(PROJECT_LIST_COLUMNS)
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order"),
    supabase
      .from("blog_posts")
      .select(POST_LIST_COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3),
    supabase.from("testimonials").select("*").eq("status", "published").order("sort_order"),
    supabase.from("faqs").select("*").eq("status", "published").eq("scope", "general").order("sort_order").limit(6),
  ]);
  return {
    services: services.data ?? [],
    projects: projects.data ?? [],
    posts: posts.data ?? [],
    testimonials: testimonials.data ?? [],
    faqs: faqs.data ?? [],
  };
});

export const searchSite = createServerFn({ method: "GET" })
  .inputValidator((input: { q: string }) => z.object({ q: z.string().trim().max(120) }).parse(input))
  .handler(async ({ data: input }) => {
    if (!input.q) return { services: [], projects: [], posts: [] };
    const supabase = createPublicServerClient();
    const like = `%${input.q.replace(/[%_]/g, "")}%`;
    const [services, projects, posts] = await Promise.all([
      supabase
        .from("services")
        .select("slug, title_fa, title_en, excerpt_fa, excerpt_en")
        .eq("status", "published")
        .or(`title_fa.ilike.${like},title_en.ilike.${like},excerpt_fa.ilike.${like},excerpt_en.ilike.${like}`)
        .limit(10),
      supabase
        .from("projects")
        .select("slug, title_fa, title_en, summary_fa, summary_en")
        .eq("status", "published")
        .or(`title_fa.ilike.${like},title_en.ilike.${like},summary_fa.ilike.${like},summary_en.ilike.${like}`)
        .limit(10),
      supabase
        .from("blog_posts")
        .select("slug, title_fa, title_en, excerpt_fa, excerpt_en")
        .eq("status", "published")
        .or(`title_fa.ilike.${like},title_en.ilike.${like},excerpt_fa.ilike.${like},excerpt_en.ilike.${like}`)
        .limit(10),
    ]);
    return {
      services: services.data ?? [],
      projects: projects.data ?? [],
      posts: posts.data ?? [],
    };
  });
