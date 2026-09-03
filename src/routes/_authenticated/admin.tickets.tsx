import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useAdminNav } from "@/components/dashboard/nav";
import { SubmitButton, TextArea } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/i18n";
import type { Database } from "@/integrations/supabase/types";

type TicketStatus = Database["public"]["Enums"]["ticket_status"];

const statuses: TicketStatus[] = ["open", "in_progress", "waiting_customer", "resolved", "closed"];

export const Route = createFileRoute("/_authenticated/admin/tickets")({
  component: AdminTickets,
});

function AdminTickets() {
  const { lang } = useLocale();
  const nav = useAdminNav();
  const queryClient = useQueryClient();
  const [openTicket, setOpenTicket] = useState<string | null>(null);

  const { data: tickets } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () =>
      (await supabase.from("tickets").select("*").order("updated_at", { ascending: false })).data ?? [],
  });

  const { data: messages } = useQuery({
    queryKey: ["admin-ticket-messages", openTicket],
    enabled: !!openTicket,
    queryFn: async () =>
      (await supabase.from("ticket_messages").select("*").eq("ticket_id", openTicket!).order("created_at")).data ?? [],
  });

  const setStatus = useMutation({
    mutationFn: async (input: { id: string; status: TicketStatus }) => {
      const { error } = await supabase.from("tickets").update({ status: input.status }).eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-tickets"] }),
  });

  const reply = useMutation({
    mutationFn: async (input: { ticketId: string; body: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("no session");
      const { error } = await supabase
        .from("ticket_messages")
        .insert({ ticket_id: input.ticketId, author_id: userId, body: input.body, is_staff: true });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-ticket-messages", openTicket] }),
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "تیکت‌ها" : "Tickets"}
      subtitle={lang === "fa" ? "پاسخ‌گویی به درخواست‌های پشتیبانی." : "Respond to customer support requests."}
      nav={nav}
    >
      <Panel>
        {(tickets ?? []).length === 0 ? (
          <EmptyState text={lang === "fa" ? "تیکتی وجود ندارد." : "No tickets."} />
        ) : (
          <ul className="divide-y divide-border">
            {(tickets ?? []).map((ticket) => (
              <li key={ticket.id} className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenTicket(openTicket === ticket.id ? null : ticket.id)}
                    className="text-start"
                  >
                    <div className="text-sm font-medium">{ticket.subject}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {ticket.reference} · {ticket.priority} · {formatDate(lang, ticket.updated_at)}
                    </div>
                  </button>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={ticket.status} />
                    <select
                      value={ticket.status}
                      onChange={(event) => setStatus.mutate({ id: ticket.id, status: event.target.value as TicketStatus })}
                      className="rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {openTicket === ticket.id && (
                  <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border p-4">
                    {(messages ?? []).map((message) => (
                      <div
                        key={message.id}
                        className={
                          message.is_staff
                            ? "rounded-xl bg-primary/10 p-3 text-sm"
                            : "rounded-xl bg-secondary p-3 text-sm"
                        }
                      >
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
    </DashboardShell>
  );
}
