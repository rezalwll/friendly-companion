import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, useRoles } from "@/hooks/use-auth";
import { useLocale } from "@/hooks/use-locale";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { lang } = useLocale();
  const { user } = useAuth();
  const { isStaff, loading } = useRoles(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isStaff) {
      void navigate({ to: "/dashboard", replace: true });
    }
  }, [loading, isStaff, navigate]);

  if (loading || !isStaff) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        {lang === "fa" ? "در حال بررسی دسترسی…" : "Checking access…"}
      </div>
    );
  }

  return <Outlet />;
}
