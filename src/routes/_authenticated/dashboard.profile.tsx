import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell, Panel } from "@/components/dashboard/shell";
import { useDashboardNav } from "@/components/dashboard/nav";
import { Field, Select, SubmitButton, TextInput } from "@/components/site/form-fields";
import { useLocale } from "@/hooks/use-locale";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { lang } = useLocale();
  const nav = useDashboardNav();
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const id = userData.user?.id;
      if (!id) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
      return data ?? { id, email: userData.user?.email ?? "", full_name: "", company: "", phone: "", country: "", locale: lang };
    },
  });

  const save = useMutation({
    mutationFn: async (values: Record<string, string>) => {
      const { data: userData } = await supabase.auth.getUser();
      const id = userData.user?.id;
      if (!id) throw new Error("no session");
      const { error } = await supabase.from("profiles").upsert({
        id,
        full_name: values["full_name"] ?? null,
        company: values["company"] ?? null,
        phone: values["phone"] ?? null,
        country: values["country"] ?? null,
        locale: values["locale"] ?? lang,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setSaved(true);
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    const form = new FormData(event.currentTarget);
    save.mutate({
      full_name: String(form.get("full_name") ?? "").slice(0, 100),
      company: String(form.get("company") ?? "").slice(0, 120),
      phone: String(form.get("phone") ?? "").slice(0, 40),
      country: String(form.get("country") ?? "").slice(0, 80),
      locale: String(form.get("locale") ?? lang),
    });
  }

  return (
    <DashboardShell
      title={lang === "fa" ? "پروفایل" : "Profile"}
      subtitle={lang === "fa" ? "اطلاعات حساب کاربری شما." : "Your account information."}
      nav={nav}
    >
      <Panel>
        <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-4">
          <Field label={lang === "fa" ? "ایمیل" : "Email"}>
            <TextInput value={profile?.email ?? ""} readOnly dir="ltr" className="opacity-70" />
          </Field>
          <Field label={lang === "fa" ? "نام و نام خانوادگی" : "Full name"}>
            <TextInput name="full_name" defaultValue={profile?.full_name ?? ""} maxLength={100} />
          </Field>
          <Field label={lang === "fa" ? "شرکت" : "Company"}>
            <TextInput name="company" defaultValue={profile?.company ?? ""} maxLength={120} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={lang === "fa" ? "شماره تماس" : "Phone"}>
              <TextInput name="phone" defaultValue={profile?.phone ?? ""} dir="ltr" maxLength={40} />
            </Field>
            <Field label={lang === "fa" ? "کشور" : "Country"}>
              <TextInput name="country" defaultValue={profile?.country ?? ""} maxLength={80} />
            </Field>
          </div>
          <Field label={lang === "fa" ? "زبان ترجیحی" : "Preferred language"}>
            <Select name="locale" defaultValue={profile?.locale ?? lang}>
              <option value="fa">فارسی</option>
              <option value="en">English</option>
            </Select>
          </Field>
          <SubmitButton pending={save.isPending} className="self-start">
            {lang === "fa" ? "ذخیره" : "Save"}
          </SubmitButton>
          {saved && (
            <p className="text-sm text-primary" role="status">
              {lang === "fa" ? "ذخیره شد." : "Saved."}
            </p>
          )}
        </form>
      </Panel>
    </DashboardShell>
  );
}
