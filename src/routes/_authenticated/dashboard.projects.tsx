import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useDashboardNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate, formatMoney } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const { lang } = useLocale();
  const nav = useDashboardNav();

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await supabase.from("orders").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "پروژه‌ها" : "Projects"}
      subtitle={lang === "fa" ? "وضعیت و پیشرفت قراردادهای شما." : "Status and progress of your engagements."}
      nav={nav}
    >
      <div className="grid gap-4">
        {(orders ?? []).map((order) => (
          <Panel key={order.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">{order.title}</h2>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{order.reference}</p>
                {order.description ? (
                  <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{order.description}</p>
                ) : null}
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Meta label={lang === "fa" ? "مبلغ قرارداد" : "Contract value"} value={formatMoney(lang, Number(order.total_amount))} />
              <Meta
                label={lang === "fa" ? "تحویل" : "Due"}
                value={order.due_on ? formatDate(lang, order.due_on) : "—"}
              />
              <Meta label={lang === "fa" ? "روش پرداخت" : "Payment mode"} value={order.payment_mode} />
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>{lang === "fa" ? "پیشرفت" : "Progress"}</span>
                <span>{order.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${order.progress}%` }} />
              </div>
            </div>
          </Panel>
        ))}
        {(orders ?? []).length === 0 && (
          <Panel>
            <EmptyState text={lang === "fa" ? "هنوز پروژه‌ای برای شما ثبت نشده است." : "No projects assigned yet."} />
          </Panel>
        )}
      </div>
    </DashboardShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
