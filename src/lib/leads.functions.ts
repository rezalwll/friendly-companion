import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublicServerClient } from "./supabase-public";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(140).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(["fa", "en"]).default("fa"),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createPublicServerClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      locale: data.locale,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const requestSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  preferred_contact: z.enum(["email", "phone", "whatsapp", "telegram"]).default("email"),
  category: z.string().trim().min(1).max(60),
  description: z.string().trim().min(20).max(6000),
  existing_url: z.string().trim().max(300).optional().or(z.literal("")),
  budget_range: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  needs_consultation: z.boolean().default(false),
  needs_installments: z.boolean().default(false),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  locale: z.enum(["fa", "en"]).default("fa"),
});


export const submitProjectRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => requestSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createPublicServerClient();
    const { data: row, error } = await supabase
      .from("project_requests")
      .insert({
        full_name: data.full_name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        preferred_contact: data.preferred_contact,
        category: data.category,
        description: data.description,
        existing_url: data.existing_url || null,
        budget_range: data.budget_range || null,
        timeline: data.timeline || null,
        needs_consultation: data.needs_consultation,
        needs_installments: data.needs_installments,
        notes: data.notes || null,
        locale: data.locale,
        // Never trust a client-supplied owner id; staff link the request later.
        user_id: null,

      })
      .select("reference")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { ok: true, reference: row?.reference ?? null };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({ email: z.string().trim().email().max(255), locale: z.enum(["fa", "en"]).default("fa") })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const supabase = createPublicServerClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: data.email, locale: data.locale });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true };
  });

export const trackEvent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        event_type: z.string().max(60),
        path: z.string().max(300).optional(),
        referrer: z.string().max(300).optional(),
        locale: z.string().max(5).optional(),
        device: z.string().max(20).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const supabase = createPublicServerClient();
    await supabase.from("analytics_events").insert({
      event_type: data.event_type,
      path: data.path ?? null,
      referrer: data.referrer ?? null,
      locale: data.locale ?? null,
      device: data.device ?? null,
    });
    return { ok: true };
  });
