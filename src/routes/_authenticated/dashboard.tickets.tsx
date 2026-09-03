import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useDashboardNav } from "@/components/dashboard/nav";
import { Field, Select, SubmitButton, TextArea, TextInput } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard/tickets")({
  component: TicketsPage,
});

function TicketsPage() {
  const { lang } = useLocale();
  const nav = useDashboardNav();
  const queryClient = useQueryClient();
  const [openTicket, setOpenTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () =>
      (await supabase.from("tickets").select("*").order("updated_at", { ascending: false })).data ?? [],
  });

  const { data: messages } = useQuery({
    queryKey: ["ticket-messages", openTicket],
    enabled: !!openTicket,
    queryFn: async () =>
      (
        await supabase
          .from("ticket_messages")
          .select("*")
          .eq("ticket_id", openTicket!)
          .order("created_at")
      ).data ?? [],
  });

  const createTicket = useMutation({
    mutationFn: async (input: { subject: string; category: string; priority: string; body: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("no session");
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          user_id: userId,
          subject: input.subject,
          category: input.category,
          priority: input.priority as "low" | "normal" | "high" | "urgent",
        })
        .select("id")
        .single();
      if (ticketError) throw ticketError;
      const { error: messageError } = await supabase
        .from("ticket_messages")
        .insert({ ticket_id: ticket.id, author_id: userId, body: input.body });
      if (messageError) throw messageError;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
    onError: () => setError(lang === "fa" ? "ثبت تیکت انجام نشد." : "Could not create the ticket."),
  });

  const reply = useMutation({
    mutationFn: async (input: { ticketId: string; body: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("no session");
      const { error: replyError } = await supabase
        .from("ticket_messages")
        .insert({ ticket_id: input.ticketId, author_id: userId, body: input.body });
      if (replyError) throw replyError;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ticket-messages", openTicket] }),
  });

  function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const subject = String(form.get("subject") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    if (subject.length < 3 || body.length < 10) {
      setError(lang === "fa" ? "موضوع و متن پیام را کامل کنید." : "Please complete subject and message.");
      return;
    }
    createTicket.mutate({
      subject: subject.slice(0, 160),
      category: String(form.get("category") ?? "general"),
      priority: String(form.get("priority") ?? "normal"),
      body: body.slice(0, 4000),
    });
    event.currentTarget.reset();
  }

  return (
    <DashboardShell
      title={lang === "fa" ? "پشتیبانی" : "Support"}
      subtitle={lang === "fa" ? "تیکت ثبت کنید و پاسخ تیم را دنبال کنید." : "Open a ticket and follow our replies."}
      nav={nav}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel title={lang === "fa" ? "تیکت جدید" : "New ticket"}>
          <form onSubmit={onCreate} className="flex flex-col gap-4">
            <Field label={lang === "fa" ? "موضوع" : "Subject"} required>
              <TextInput name="subject" maxLength={160} required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={lang === "fa" ? "دسته" : "Category"}>
                <Select name="category" defaultValue="general">
                  <option value="general">{lang === "fa" ? "عمومی" : "General"}</option>
                  <option value="technical">{lang === "fa" ? "فنی" : "Technical"}</option>
                  <option value="billing">{lang === "fa" ? "مالی" : "Billing"}</option>
                </Select>
              </Field>
              <Field label={lang === "fa" ? "اولویت" : "Priority"}>
                <Select name="priority" defaultValue="normal">
                  <option value="low">{lang === "fa" ? "کم" : "Low"}</option>
                  <option value="normal">{lang === "fa" ? "عادی" : "Normal"}</option>
                  <option value="high">{lang === "fa" ? "زیاد" : "High"}</option>
                  <option value="urgent">{lang === "fa" ? "فوری" : "Urgent"}</option>
                </Select>
              </Field>
            </div>
            <Field label={lang === "fa" ? "شرح مشکل" : "Message"} required>
              <TextArea name="body" maxLength={4000} required />
            </Field>
            <SubmitButton pending={createTicket.isPending}>
              {lang === "fa" ? "ثبت تیکت" : "Create ticket"}
            </SubmitButton>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </form>
        </Panel>

        <Panel title={lang === "fa" ? "تیکت‌های شما" : "Your tickets"}>
          {(tickets ?? []).length === 0 ? (
            <EmptyState text={lang === "fa" ? "تیکتی ثبت نشده است." : "No tickets yet."} />
          ) : (
            <ul className="divide-y divide-border">
              {(tickets ?? []).map((ticket) => (
                <li key={ticket.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenTicket(openTicket === ticket.id ? null : ticket.id)}
                    className="flex w-full items-center justify-between gap-4 text-start"
                  >
                    <div>
                      <div className="text-sm font-medium">{ticket.subject}</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {ticket.reference} · {formatDate(lang, ticket.updated_at)}
                      </div>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </button>

                  {openTicket === ticket.id && (
                    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border p-4">
                      {(messages ?? []).map((message) => (
                        <div key={message.id} className="rounded-xl bg-secondary p-3 text-sm">
                          <p className="whitespace-pre-line">{message.body}</p>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {formatDate(lang, message.created_at)}
                          </span>
                        </div>
                      ))}
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          const value = String(new FormData(event.currentTarget).get("reply") ?? "").trim();
                          if (value.length < 2) return;
                          reply.mutate({ ticketId: ticket.id, body: value.slice(0, 4000) });
                          event.currentTarget.reset();
                        }}
                        className="flex flex-col gap-3"
                      >
                        <TextArea name="reply" maxLength={4000} className="min-h-24" />
                        <SubmitButton pending={reply.isPending} className="self-start">
                          {lang === "fa" ? "ارسال پاسخ" : "Send reply"}
                        </SubmitButton>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </DashboardShell>
  );
}
