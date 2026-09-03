import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useAdminNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatMoney } from "@/lib/i18n";
import type { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

const statuses: OrderStatus[] = ["draft", "active", "on_hold", "completed", "cancelled"];

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const { lang } = useLocale();
  const nav = useAdminNav();
  const queryClient = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () =>
      (await supabase.from("orders").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const update = useMutation({
    mutationFn: async (input: { id: string; status?: OrderStatus; progress?: number }) => {
      const patch: { status?: OrderStatus; progress?: number } = {};
      if (input.status) patch.status = input.status;
      if (typeof input.progress === "number") patch.progress = input.progress;
      const { error } = await supabase.from("orders").update(patch).eq("id", input.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "پروژه‌ها" : "Orders"}
      subtitle={lang === "fa" ? "مدیریت وضعیت و پیشرفت پروژه‌ها." : "Manage delivery status and progress."}
      nav={nav}
    >
      <Panel>
        {(orders ?? []).length === 0 ? (
          <EmptyState text={lang === "fa" ? "پروژه‌ای ثبت نشده است." : "No orders yet."} />
        ) : (
          <ul className="divide-y divide-border">
            {(orders ?? []).map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold">{order.title}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="mt-1 font-mono text-xs text-muted-foreground">
                    {order.reference} · {formatMoney(lang, Number(order.total_amount))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    {lang === "fa" ? "پیشرفت" : "Progress"}
                    <input
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={order.progress}
                      onBlur={(event) =>
                        update.mutate({ id: order.id, progress: Math.max(0, Math.min(100, Number(event.target.value))) })
                      }
                      className="w-20 rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    />
                  </label>
                  <select
                    value={order.status}
                    onChange={(event) => update.mutate({ id: order.id, status: event.target.value as OrderStatus })}
                    className="rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </DashboardShell>
  );
}
