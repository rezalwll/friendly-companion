import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel } from "@/components/dashboard/shell";
import { useAdminNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const { lang } = useLocale();
  const nav = useAdminNav();

  const { data } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const [contacts, subscribers] = await Promise.all([
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(100),
      ]);
      return { contacts: contacts.data ?? [], subscribers: subscribers.data ?? [] };
    },
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "پیام‌ها" : "Messages"}
      subtitle={lang === "fa" ? "پیام‌های تماس و مشترکان خبرنامه." : "Contact messages and newsletter subscribers."}
      nav={nav}
    >
      <div className="grid gap-4">
        <Panel title={lang === "fa" ? "پیام‌های تماس" : "Contact messages"}>
          {(data?.contacts ?? []).length === 0 ? (
            <EmptyState text={lang === "fa" ? "پیامی وجود ندارد." : "No messages."} />
          ) : (
            <ul className="divide-y divide-border">
              {data?.contacts.map((message) => (
                <li key={message.id} className="py-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold">{message.name}</span>
                    <span className="text-xs text-muted-foreground" dir="ltr">
                      {message.email}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(lang, message.created_at)}</span>
                  </div>
                  {message.subject ? <div className="mt-1 text-sm font-medium">{message.subject}</div> : null}
                  <p className="mt-2 text-sm text-muted-foreground">{message.message}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={lang === "fa" ? "مشترکان خبرنامه" : "Newsletter subscribers"}>
          {(data?.subscribers ?? []).length === 0 ? (
            <EmptyState text={lang === "fa" ? "مشترکی وجود ندارد." : "No subscribers."} />
          ) : (
            <ul className="divide-y divide-border">
              {data?.subscribers.map((subscriber) => (
                <li key={subscriber.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span dir="ltr">{subscriber.email}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(lang, subscriber.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </DashboardShell>
  );
}
