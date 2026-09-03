import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useDashboardNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard/requests")({
  component: RequestsPage,
});

function RequestsPage() {
  const { lang } = useLocale();
  const nav = useDashboardNav();

  const { data: requests } = useQuery({
    queryKey: ["my-requests"],
    queryFn: async () =>
      (await supabase.from("project_requests").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "درخواست‌های پروژه" : "Project requests"}
      subtitle={
        lang === "fa"
          ? "درخواست‌هایی که ثبت کرده‌اید و وضعیت بررسی آن‌ها."
          : "Requests you submitted and their review status."
      }
      nav={nav}
    >
      <Panel>
        {(requests ?? []).length === 0 ? (
          <EmptyState text={lang === "fa" ? "درخواستی ثبت نشده است." : "No requests yet."} />
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {(requests ?? []).map((request) => (
              <li key={request.id} className="flex flex-wrap items-start justify-between gap-4 py-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{request.category}</span>
                    <span className="font-mono text-xs text-muted-foreground">{request.reference}</span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{request.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{formatDate(lang, request.created_at)}</p>
                </div>
                <StatusBadge status={request.status} />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DashboardShell>
  );
}
