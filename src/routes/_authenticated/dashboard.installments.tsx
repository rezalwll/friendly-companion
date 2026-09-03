import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, EmptyState, Panel, StatusBadge } from "@/components/dashboard/shell";
import { useDashboardNav } from "@/components/dashboard/nav";
import { useLocale } from "@/hooks/use-locale";
import { formatDate, formatMoney } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/dashboard/installments")({
  component: InstallmentsPage,
});

function InstallmentsPage() {
  const { lang } = useLocale();
  const nav = useDashboardNav();

  const { data } = useQuery({
    queryKey: ["billing"],
    queryFn: async () => {
      const [installments, invoices, payments] = await Promise.all([
        supabase.from("installments").select("*").order("due_on"),
        supabase.from("invoices").select("*").order("issued_on", { ascending: false }),
        supabase.from("payments").select("*").order("created_at", { ascending: false }),
      ]);
      return {
        installments: installments.data ?? [],
        invoices: invoices.data ?? [],
        payments: payments.data ?? [],
      };
    },
  });

  return (
    <DashboardShell
      title={lang === "fa" ? "اقساط و فاکتورها" : "Installments & invoices"}
      subtitle={
        lang === "fa"
          ? "سررسیدها، مبالغ و وضعیت پرداخت‌های شما."
          : "Your due dates, amounts and payment status."
      }
      nav={nav}
    >
      <div className="grid gap-4">
        <Panel title={lang === "fa" ? "اقساط" : "Installments"}>
          {(data?.installments ?? []).length === 0 ? (
            <EmptyState text={lang === "fa" ? "قسطی ثبت نشده است." : "No installments recorded."} />
          ) : (
            <ul className="divide-y divide-border">
              {data?.installments.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <div className="text-sm font-medium">
                      #{item.sequence} · {formatMoney(lang, Number(item.amount))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang === "fa" ? "سررسید: " : "Due: "}
                      {formatDate(lang, item.due_on)}
                      {item.paid_at ? ` · ${lang === "fa" ? "پرداخت‌شده" : "paid"} ${formatDate(lang, item.paid_at)}` : ""}
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={lang === "fa" ? "فاکتورها" : "Invoices"}>
          {(data?.invoices ?? []).length === 0 ? (
            <EmptyState text={lang === "fa" ? "فاکتوری صادر نشده است." : "No invoices issued."} />
          ) : (
            <ul className="divide-y divide-border">
              {data?.invoices.map((invoice) => (
                <li key={invoice.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <div className="font-mono text-sm font-medium">{invoice.number}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(lang, invoice.issued_on)} · {formatMoney(lang, Number(invoice.amount))}
                    </div>
                  </div>
                  <StatusBadge status={invoice.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={lang === "fa" ? "پرداخت‌ها" : "Payments"}>
          {(data?.payments ?? []).length === 0 ? (
            <EmptyState text={lang === "fa" ? "پرداختی ثبت نشده است." : "No payments recorded."} />
          ) : (
            <ul className="divide-y divide-border">
              {data?.payments.map((payment) => (
                <li key={payment.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{formatMoney(lang, Number(payment.amount))}</div>
                    <div className="text-xs text-muted-foreground">
                      {payment.method} · {formatDate(lang, payment.created_at)}
                    </div>
                  </div>
                  <StatusBadge status={payment.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </DashboardShell>
  );
}
