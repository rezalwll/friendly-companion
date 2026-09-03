import { useLocale } from "@/hooks/use-locale";
import type { NavItem } from "./shell";

export function useDashboardNav(): NavItem[] {
  const { lang } = useLocale();
  return [
    { to: "/dashboard", label: lang === "fa" ? "نمای کلی" : "Overview" },
    { to: "/dashboard/projects", label: lang === "fa" ? "پروژه‌ها" : "Projects" },
    { to: "/dashboard/requests", label: lang === "fa" ? "درخواست‌ها" : "Requests" },
    { to: "/dashboard/installments", label: lang === "fa" ? "اقساط و فاکتورها" : "Installments" },
    { to: "/dashboard/tickets", label: lang === "fa" ? "پشتیبانی" : "Support" },
    { to: "/dashboard/profile", label: lang === "fa" ? "پروفایل" : "Profile" },
  ];
}

export function useAdminNav(): NavItem[] {
  const { lang } = useLocale();
  return [
    { to: "/admin", label: lang === "fa" ? "نمای کلی" : "Overview" },
    { to: "/admin/requests", label: lang === "fa" ? "درخواست‌ها" : "Requests" },
    { to: "/admin/orders", label: lang === "fa" ? "پروژه‌ها" : "Orders" },
    { to: "/admin/tickets", label: lang === "fa" ? "تیکت‌ها" : "Tickets" },
    { to: "/admin/messages", label: lang === "fa" ? "پیام‌ها" : "Messages" },
    { to: "/dashboard", label: lang === "fa" ? "پنل کاربری" : "Client dashboard" },
  ];
}
