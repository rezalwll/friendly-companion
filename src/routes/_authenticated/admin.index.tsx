import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Panel, StatCard, StatusBadge } from "@/components/dashboard/shell";
import { useAdminNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const { lang } = useLocale();
  const nav = useAdminNav();

  const { data } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [requests, orders, tickets, contacts] = await Promise.all([
        supabase.from("project_requests").select("id, reference, category, status, created_at").order("created_at", { ascending: false }).limit(6),
        supabase.from("orders").select("id, status", { count: "exact" }),
        supabase.from("tickets").select("id, status", { count: "exact" }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      return {
        recentRequests: requests.data ?? [],
        openOrders: (orders.data ?? []).filter((o) => o.status !== "completed" && o.status !== "cancelled").length,
        openTickets: (tickets.data ?? []).filter((t) => t.status !== "closed" && t.status !== "resolved").length,
        contacts: contacts.count ?? 0,
        requestCount: requests.data?.length ?? 0,
      };
    },
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "پنل مدیریت" : "Admin panel"}
      subtitle={lang === "fa" ? "نمای کلی عملیات رای‌کد." : "Operational overview for RYCODE."}
      nav={nav}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={lang === "fa" ? "درخواست‌های اخیر" : "Recent requests"} value={String(data?.requestCount ?? 0)} />
        <StatCard label={lang === "fa" ? "پروژه‌های فعال" : "Active orders"} value={String(data?.openOrders ?? 0)} />
        <StatCard label={lang === "fa" ? "تیکت‌های باز" : "Open tickets"} value={String(data?.openTickets ?? 0)} />
        <StatCard label={lang === "fa" ? "پیام‌های تماس" : "Contact messages"} value={String(data?.contacts ?? 0)} />
      </div>

      <div className="mt-4" /><Panel title={lang === "fa" ? "آخرین درخواست‌ها" : "Latest requests"}>
        <ul className="divide-y divide-border">
          {(data?.recentRequests ?? []).map((request) => (
            <li key={request.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <div className="text-sm font-medium">{request.category}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  {request.reference} · {formatDate(lang, request.created_at)}
                </div>
              </div>
              <StatusBadge status={request.status} />
            </li>
          ))}
        </ul>
      </Panel>
    </DashboardShell>
  );
}
