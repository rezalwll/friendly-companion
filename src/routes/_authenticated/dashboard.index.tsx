import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatCard, StatusBadge } from "@/components/dashboard/shell";
import { useDashboardNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate, formatMoney } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { lang } = useLocale();
  const nav = useDashboardNav();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const [orders, requests, tickets, installments] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("project_requests").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("tickets").select("*").order("updated_at", { ascending: false }).limit(5),
        supabase.from("installments").select("*").order("due_on").limit(5),
      ]);
      return {
        orders: orders.data ?? [],
        requests: requests.data ?? [],
        tickets: tickets.data ?? [],
        installments: installments.data ?? [],
      };
    },
  });

  const openOrders = data?.orders.filter((o) => o.status !== "completed" && o.status !== "cancelled").length ?? 0;
  const dueInstallments = data?.installments.filter((i) => i.status !== "paid").length ?? 0;
  const openTickets = data?.tickets.filter((t) => t.status !== "closed").length ?? 0;

  return (
    <DashboardShell
      title={lang === "fa" ? "پنل کاربری" : "Dashboard"}
      subtitle={
        lang === "fa" ? "وضعیت پروژه‌ها، اقساط و پشتیبانی شما." : "Your projects, installments and support at a glance."
      }
      nav={nav}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={lang === "fa" ? "پروژه‌های فعال" : "Active projects"} value={openOrders} />
        <StatCard label={lang === "fa" ? "اقساط سررسیدنشده" : "Pending installments"} value={dueInstallments} />
        <StatCard label={lang === "fa" ? "تیکت‌های باز" : "Open tickets"} value={openTickets} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title={lang === "fa" ? "پروژه‌ها" : "Projects"}>
          {isLoading ? (
            <EmptyState text={lang === "fa" ? "در حال بارگذاری…" : "Loading…"} />
          ) : data && data.orders.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {data.orders.slice(0, 5).map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <div className="text-sm font-medium">{order.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.reference} · {order.progress}%
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState text={lang === "fa" ? "هنوز پروژه‌ای ثبت نشده است." : "No projects yet."} />
          )}
        </Panel>

        <Panel title={lang === "fa" ? "اقساط پیش‌رو" : "Upcoming installments"}>
          {data && data.installments.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {data.installments.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <div className="text-sm font-medium">{formatMoney(lang, Number(item.amount))}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(lang, item.due_on)}</div>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState text={lang === "fa" ? "قسطی ثبت نشده است." : "No installments recorded."} />
          )}
        </Panel>

        <Panel title={lang === "fa" ? "درخواست‌های اخیر" : "Recent requests"}>
          {data && data.requests.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {data.requests.map((request) => (
                <li key={request.id} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <div className="text-sm font-medium">{request.category}</div>
                    <div className="font-mono text-xs text-muted-foreground">{request.reference}</div>
                  </div>
                  <StatusBadge status={request.status} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState text={lang === "fa" ? "درخواستی ثبت نشده است." : "No requests yet."} />
          )}
        </Panel>

        <Panel title={lang === "fa" ? "پشتیبانی" : "Support"}>
          <p className="text-sm text-muted-foreground">
            {lang === "fa"
              ? "برای هر پروژه می‌توانید تیکت پشتیبانی ثبت کنید."
              : "You can open a support ticket for any project."}
          </p>
          <Link
            to="/dashboard/tickets"
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {lang === "fa" ? "مشاهده تیکت‌ها" : "View tickets"}
          </Link>
        </Panel>
      </div>
    </DashboardShell>
  );
}
