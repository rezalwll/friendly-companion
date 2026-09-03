import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useAdminNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate } from "@/lib/i18n";
import type { Database } from "@/integrations/supabase/types";

type RequestStatus = Database["public"]["Enums"]["request_status"];

const statuses: RequestStatus[] = ["new", "reviewing", "quoted", "accepted", "rejected", "converted", "closed"];

export const Route = createFileRoute("/_authenticated/admin/requests")({
  component: AdminRequests,
});

function AdminRequests() {
  const { lang } = useLocale();
  const nav = useAdminNav();
  const queryClient = useQueryClient();

  const { data: requests } = useQuery({
    queryKey: ["admin-requests"],
    queryFn: async () =>
      (await supabase.from("project_requests").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const update = useMutation({
    mutationFn: async (input: { id: string; status: RequestStatus }) => {
      const { error } = await supabase.from("project_requests").update({ status: input.status }).eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-requests"] }),
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "درخواست‌های پروژه" : "Project requests"}
      subtitle={lang === "fa" ? "بررسی و مدیریت لیدهای ورودی." : "Review and triage incoming leads."}
      nav={nav}
    >
      <Panel>
        {(requests ?? []).length === 0 ? (
          <EmptyState text={lang === "fa" ? "درخواستی وجود ندارد." : "No requests."} />
        ) : (
          <ul className="divide-y divide-border">
            {(requests ?? []).map((request) => (
              <li key={request.id} className="flex flex-wrap items-start justify-between gap-4 py-4">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold">{request.full_name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{request.reference}</span>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
                    {request.email}
                    {request.phone ? ` · ${request.phone}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{request.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {request.category} · {request.budget_range ?? "—"} · {formatDate(lang, request.created_at)}
                  </p>
                </div>
                <select
                  value={request.status}
                  onChange={(event) => update.mutate({ id: request.id, status: event.target.value as RequestStatus })}
                  className="rounded-xl border border-input bg-background px-3 py-2 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DashboardShell>
  );
}
