
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('super_admin','admin','support','editor','customer');
CREATE TYPE public.content_status AS ENUM ('draft','scheduled','published','archived');
CREATE TYPE public.request_status AS ENUM ('new','reviewing','quoted','accepted','rejected','converted','closed');
CREATE TYPE public.order_status AS ENUM ('draft','pending','active','on_hold','completed','cancelled');
CREATE TYPE public.payment_mode AS ENUM ('full','installment');
CREATE TYPE public.payment_status AS ENUM ('unpaid','pending','paid','failed','refunded');
CREATE TYPE public.ticket_status AS ENUM ('open','in_progress','waiting_customer','resolved','closed');
CREATE TYPE public.ticket_priority AS ENUM ('low','normal','high','urgent');

-- ============ HELPERS ============
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  locale TEXT NOT NULL DEFAULT 'fa',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    AND role IN ('super_admin','admin','support','editor'));
$$;

CREATE OR REPLACE FUNCTION public.can_manage_ops(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    AND role IN ('super_admin','admin'));
$$;

CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    AND role IN ('super_admin','admin','editor'));
$$;

CREATE OR REPLACE FUNCTION public.can_support(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    AND role IN ('super_admin','admin','support'));
$$;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid() OR public.can_manage_ops(auth.uid()));
CREATE POLICY "roles read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ CONTENT ============
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'general',
  icon TEXT,
  title_fa TEXT NOT NULL, title_en TEXT NOT NULL,
  excerpt_fa TEXT, excerpt_en TEXT,
  body_fa TEXT, body_en TEXT,
  benefits_fa JSONB NOT NULL DEFAULT '[]', benefits_en JSONB NOT NULL DEFAULT '[]',
  capabilities_fa JSONB NOT NULL DEFAULT '[]', capabilities_en JSONB NOT NULL DEFAULT '[]',
  tech_stack JSONB NOT NULL DEFAULT '[]',
  seo_title_fa TEXT, seo_title_en TEXT, seo_desc_fa TEXT, seo_desc_en TEXT,
  status public.content_status NOT NULL DEFAULT 'published',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title_fa TEXT NOT NULL, title_en TEXT NOT NULL,
  client_name TEXT, industry_fa TEXT, industry_en TEXT,
  project_type TEXT,
  summary_fa TEXT, summary_en TEXT,
  problem_fa TEXT, problem_en TEXT,
  solution_fa TEXT, solution_en TEXT,
  results_fa TEXT, results_en TEXT,
  metrics JSONB NOT NULL DEFAULT '[]',
  technologies JSONB NOT NULL DEFAULT '[]',
  services JSONB NOT NULL DEFAULT '[]',
  timeline_fa TEXT, timeline_en TEXT,
  cover_url TEXT,
  status public.content_status NOT NULL DEFAULT 'published',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects ON DELETE CASCADE,
  url TEXT NOT NULL, caption_fa TEXT, caption_en TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  name_fa TEXT NOT NULL, name_en TEXT NOT NULL,
  role_fa TEXT, role_en TEXT, bio_fa TEXT, bio_en TEXT, avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_fa TEXT NOT NULL, name_en TEXT NOT NULL,
  description_fa TEXT, description_en TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_fa TEXT NOT NULL, name_en TEXT NOT NULL
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.blog_categories ON DELETE SET NULL,
  author_id UUID REFERENCES public.authors ON DELETE SET NULL,
  locale TEXT NOT NULL DEFAULT 'fa',
  title_fa TEXT NOT NULL, title_en TEXT NOT NULL,
  excerpt_fa TEXT, excerpt_en TEXT,
  body_fa TEXT, body_en TEXT,
  cover_url TEXT,
  reading_minutes INT NOT NULL DEFAULT 5,
  seo_title_fa TEXT, seo_title_en TEXT, seo_desc_fa TEXT, seo_desc_en TEXT,
  canonical_url TEXT,
  status public.content_status NOT NULL DEFAULT 'published',
  featured BOOLEAN NOT NULL DEFAULT false,
  views INT NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.blog_post_tags (
  post_id UUID NOT NULL REFERENCES public.blog_posts ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.blog_tags ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fa TEXT NOT NULL, name_en TEXT NOT NULL,
  role_fa TEXT, role_en TEXT,
  quote_fa TEXT NOT NULL, quote_en TEXT NOT NULL,
  avatar_url TEXT, project_id UUID REFERENCES public.projects ON DELETE SET NULL,
  status public.content_status NOT NULL DEFAULT 'published',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope TEXT NOT NULL DEFAULT 'general',
  question_fa TEXT NOT NULL, question_en TEXT NOT NULL,
  answer_fa TEXT NOT NULL, answer_en TEXT NOT NULL,
  status public.content_status NOT NULL DEFAULT 'published',
  sort_order INT NOT NULL DEFAULT 0
);

-- content grants + RLS
DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['services','projects','project_media','authors','blog_categories','blog_tags','blog_posts','blog_post_tags','testimonials','faqs'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "content editor manage" ON public.%I FOR ALL TO authenticated USING (public.can_edit_content(auth.uid())) WITH CHECK (public.can_edit_content(auth.uid()))', t);
  END LOOP;
END $$;

CREATE POLICY "public services" ON public.services FOR SELECT USING (status = 'published');
CREATE POLICY "public projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "public project media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "public authors" ON public.authors FOR SELECT USING (true);
CREATE POLICY "public categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "public tags" ON public.blog_tags FOR SELECT USING (true);
CREATE POLICY "public post tags" ON public.blog_post_tags FOR SELECT USING (true);
CREATE POLICY "public posts" ON public.blog_posts FOR SELECT USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));
CREATE POLICY "public testimonials" ON public.testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "public faqs" ON public.faqs FOR SELECT USING (status = 'published');

CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ COMMERCE ============
CREATE TABLE public.project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  reference TEXT NOT NULL DEFAULT concat('RQ-', upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  full_name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  preferred_contact TEXT NOT NULL DEFAULT 'email',
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  existing_url TEXT,
  budget_range TEXT,
  timeline TEXT,
  needs_consultation BOOLEAN NOT NULL DEFAULT false,
  needs_installments BOOLEAN NOT NULL DEFAULT false,
  attachments JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  locale TEXT NOT NULL DEFAULT 'fa',
  status public.request_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.project_requests TO anon;
GRANT SELECT, INSERT, UPDATE ON public.project_requests TO authenticated;
GRANT ALL ON public.project_requests TO service_role;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit request" ON public.project_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "own requests read" ON public.project_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.can_manage_ops(auth.uid()));
CREATE POLICY "ops manage requests" ON public.project_requests FOR UPDATE TO authenticated USING (public.can_manage_ops(auth.uid()));
CREATE TRIGGER requests_updated BEFORE UPDATE ON public.project_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  request_id UUID REFERENCES public.project_requests ON DELETE SET NULL,
  reference TEXT NOT NULL DEFAULT concat('OR-', upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  title TEXT NOT NULL,
  description TEXT,
  currency TEXT NOT NULL DEFAULT 'IRR',
  total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  payment_mode public.payment_mode NOT NULL DEFAULT 'full',
  status public.order_status NOT NULL DEFAULT 'pending',
  progress INT NOT NULL DEFAULT 0,
  starts_on DATE, due_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  title TEXT NOT NULL, quantity INT NOT NULL DEFAULT 1,
  unit_price NUMERIC(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  number TEXT NOT NULL DEFAULT concat('INV-', upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'IRR',
  status public.payment_status NOT NULL DEFAULT 'unpaid',
  issued_on DATE NOT NULL DEFAULT current_date,
  due_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  sequence INT NOT NULL DEFAULT 1,
  amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  due_on DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  status public.payment_status NOT NULL DEFAULT 'unpaid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders ON DELETE CASCADE,
  installment_id UUID REFERENCES public.installments ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'IRR',
  method TEXT NOT NULL DEFAULT 'bank_transfer',
  reference TEXT,
  status public.payment_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['orders','invoices','installments','payments'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "own read" ON public.%I FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.can_manage_ops(auth.uid()))', t);
    EXECUTE format('CREATE POLICY "ops manage" ON public.%I FOR ALL TO authenticated USING (public.can_manage_ops(auth.uid())) WITH CHECK (public.can_manage_ops(auth.uid()))', t);
  END LOOP;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order items read" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.can_manage_ops(auth.uid()))));
CREATE POLICY "order items manage" ON public.order_items FOR ALL TO authenticated
  USING (public.can_manage_ops(auth.uid())) WITH CHECK (public.can_manage_ops(auth.uid()));

CREATE TRIGGER orders_updated BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ SUPPORT ============
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders ON DELETE SET NULL,
  reference TEXT NOT NULL DEFAULT concat('TK-', upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  subject TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  priority public.ticket_priority NOT NULL DEFAULT 'normal',
  status public.ticket_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.tickets TO authenticated;
GRANT ALL ON public.tickets TO service_role;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tickets read" ON public.tickets FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.can_support(auth.uid()));
CREATE POLICY "own tickets create" ON public.tickets FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "tickets update" ON public.tickets FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.can_support(auth.uid()));
CREATE TRIGGER tickets_updated BEFORE UPDATE ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  body TEXT NOT NULL,
  attachments JSONB NOT NULL DEFAULT '[]',
  is_staff BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ticket_messages TO authenticated;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ticket messages read" ON public.ticket_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND (t.user_id = auth.uid() OR public.can_support(auth.uid()))));
CREATE POLICY "ticket messages write" ON public.ticket_messages FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid() AND EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND (t.user_id = auth.uid() OR public.can_support(auth.uid()))));

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL, body TEXT, link TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "own notifications update" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
  subject TEXT, message TEXT NOT NULL, locale TEXT NOT NULL DEFAULT 'fa',
  handled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "ops read contact" ON public.contact_messages FOR SELECT TO authenticated USING (public.can_manage_ops(auth.uid()));
CREATE POLICY "ops update contact" ON public.contact_messages FOR UPDATE TO authenticated USING (public.can_manage_ops(auth.uid()));

CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE, locale TEXT NOT NULL DEFAULT 'fa',
  confirmed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon;
GRANT SELECT, INSERT ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "ops read subs" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.can_manage_ops(auth.uid()));

-- ============ OPS ============
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "ops settings" ON public.site_settings FOR ALL TO authenticated USING (public.can_manage_ops(auth.uid())) WITH CHECK (public.can_manage_ops(auth.uid()));

CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  path TEXT, referrer TEXT, locale TEXT, device TEXT, country TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  session_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.analytics_events TO anon;
GRANT SELECT, INSERT ON public.analytics_events TO authenticated;
GRANT ALL ON public.analytics_events TO service_role;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone track" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "ops read analytics" ON public.analytics_events FOR SELECT TO authenticated USING (public.can_manage_ops(auth.uid()));
CREATE INDEX analytics_events_created_idx ON public.analytics_events (created_at DESC);

CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users ON DELETE SET NULL,
  action TEXT NOT NULL, entity TEXT, entity_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ops read logs" ON public.activity_logs FOR SELECT TO authenticated USING (public.can_manage_ops(auth.uid()));
CREATE POLICY "staff write logs" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (actor_id = auth.uid());

-- ============ STORAGE ============
CREATE POLICY "public media read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "editors upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.can_edit_content(auth.uid()));
CREATE POLICY "editors delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.can_edit_content(auth.uid()));
CREATE POLICY "own attachments read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'attachments' AND (owner = auth.uid() OR public.is_staff(auth.uid())));
CREATE POLICY "own attachments write" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'attachments' AND owner = auth.uid());

-- ============ SEED ============
INSERT INTO public.site_settings (key, value) VALUES
('company', '{"name_fa":"رای‌کد","name_en":"RYCODE","domain":"rycode.ir","description_fa":"استودیوی مهندسی نرم‌افزار و فناوری دیجیتال","description_en":"Premium software engineering & digital technology studio"}'),
('contact', '{"phone":"—","email":"hello@rycode.ir","address_fa":"آدرس در انتظار تکمیل","address_en":"Address to be provided","hours_fa":"شنبه تا چهارشنبه، ۹ تا ۱۸","hours_en":"Sat–Wed, 9:00–18:00"}'),
('social', '{"instagram":"","linkedin":"","telegram":"","whatsapp":"","github":""}'),
('seo', '{"title_fa":"رای‌کد | مهندسی نرم‌افزار","title_en":"RYCODE | Software Engineering","desc_fa":"از ایده تا محصول؛ می‌سازیم، بهینه می‌کنیم و حل می‌کنیم.","desc_en":"From idea to production — we build, optimize and solve."}');

INSERT INTO public.services (slug, category, icon, title_fa, title_en, excerpt_fa, excerpt_en, benefits_fa, benefits_en, capabilities_fa, capabilities_en, tech_stack, featured, sort_order) VALUES
('web-development','web','Globe','طراحی و توسعه وب','Web Development','وب‌سایت شرکتی، فروشگاهی و وب‌اپلیکیشن اختصاصی با معماری تمیز و کارایی بالا.','Corporate sites, e-commerce and custom web applications with clean architecture.','["افزایش نرخ تبدیل","سرعت بارگذاری زیر یک ثانیه","معماری قابل توسعه"]','["Higher conversion","Sub-second load times","Scalable architecture"]','["وب‌سایت شرکتی","فروشگاه اینترنتی","وب‌اپلیکیشن اختصاصی","پنل مدیریت"]','["Corporate websites","E-commerce","Custom web apps","Admin panels"]','["TypeScript","React","Next.js","Node.js","PostgreSQL"]',true,1),
('mobile-development','mobile','Smartphone','توسعه اپلیکیشن موبایل','Mobile Development','اپلیکیشن‌های نیتیو و کراس‌پلتفرم با تجربه کاربری دقیق و عملکرد پایدار.','Native and cross-platform apps with precise UX and stable performance.','["حضور در هر دو پلتفرم","تجربه کاربری روان","انتشار مدیریت‌شده"]','["iOS and Android","Fluid UX","Managed release process"]','["اپ نیتیو","کراس‌پلتفرم","اتصال به API","اعلان‌ها"]','["Native apps","Cross-platform","API integration","Push notifications"]','["Flutter","React Native","Swift","Kotlin"]',true,2),
('custom-software','software','Code2','نرم‌افزار اختصاصی','Custom Software','سیستم‌های سازمانی، ابزارهای داخلی و نرم‌افزارهای اختصاصی با PHP و Python.','Enterprise systems, internal tools and bespoke software in PHP and Python.','["تطبیق کامل با فرآیند شما","کاهش کار دستی","مالکیت کامل کد"]','["Fits your exact process","Less manual work","Full code ownership"]','["سیستم سازمانی","ابزار داخلی","یکپارچه‌سازی","گزارش‌گیری"]','["Enterprise systems","Internal tools","Integrations","Reporting"]','["Python","Django","PHP","Laravel","PostgreSQL"]',true,3),
('seo','seo','Search','سئو و سئوی تکنیکال','SEO & Technical SEO','سئوی تکنیکال، ساختار محتوا و بهبود واقعی رتبه و ترافیک ارگانیک.','Technical SEO, content architecture and measurable organic growth.','["ترافیک ارگانیک پایدار","ایندکس صحیح","بهبود Core Web Vitals"]','["Sustainable organic traffic","Correct indexing","Better Core Web Vitals"]','["ممیزی تکنیکال","داده ساختاریافته","معماری اطلاعات","سئوی بین‌المللی"]','["Technical audit","Structured data","Information architecture","International SEO"]','["Lighthouse","Search Console","Schema.org"]',true,4),
('automation','automation','Workflow','اتوماسیون و اکسل','Automation & Excel','اتوماسیون فرآیندهای تکراری، راهکارهای اکسل و اتصال سرویس‌ها به یکدیگر.','Automating repetitive processes, Excel solutions and service integrations.','["حذف کار تکراری","کاهش خطای انسانی","صرفه‌جویی در زمان"]','["No more repetitive work","Fewer human errors","Time savings"]','["اتوماسیون فرآیند","اسکریپت اکسل","اتصال سرویس‌ها","گزارش خودکار"]','["Process automation","Excel scripting","Service integration","Automated reporting"]','["Python","Pandas","VBA","Zapier","REST"]',false,5),
('ai-solutions','ai','Sparkles','راهکارهای هوش مصنوعی','AI Solutions','دستیارهای هوشمند، جست‌وجوی معنایی و افزودن قابلیت‌های AI به محصولات موجود.','Intelligent assistants, semantic search and AI features inside existing products.','["تجربه کاربری هوشمند","تحلیل داده سریع‌تر","مزیت رقابتی"]','["Smarter UX","Faster data analysis","Competitive edge"]','["چت‌بات اختصاصی","جست‌وجوی معنایی","پردازش اسناد","پیشنهاددهنده"]','["Custom chatbots","Semantic search","Document processing","Recommenders"]','["OpenAI","Embeddings","Vector DB","Python"]',true,6),
('maintenance','maintenance','ShieldCheck','نگهداری و مدرن‌سازی','Maintenance & Modernization','نگهداری پروژه‌های موجود، مهاجرت از معماری قدیمی و پایداری بلندمدت.','Maintaining existing projects, migrating legacy stacks and long-term stability.','["پایداری سرویس","کاهش بدهی فنی","مهاجرت بدون توقف"]','["Service stability","Less technical debt","Zero-downtime migration"]','["نگهداری ماهانه","بازنویسی تدریجی","ارتقای نسخه","مانیتورینگ"]','["Monthly maintenance","Incremental rewrite","Version upgrades","Monitoring"]','["Docker","CI/CD","Sentry","PostgreSQL"]',false,7),
('bug-fixing','support','Bug','رفع باگ و عیب‌یابی','Bug Fixing & Debugging','ورود سریع به پروژه‌های مشکل‌دار، ریشه‌یابی دقیق و رفع پایدار خطا.','Fast entry into troubled projects, precise root-cause analysis and durable fixes.','["حل سریع بحران","ریشه‌یابی واقعی","جلوگیری از تکرار"]','["Fast incident resolution","True root cause","Prevents recurrence"]','["عیب‌یابی تولید","بهینه‌سازی کوئری","رفع نشت حافظه","بازبینی کد"]','["Production debugging","Query optimization","Memory leak fixes","Code review"]','["Profilers","APM","PostgreSQL","Node.js"]',false,8),
('consulting','consulting','Compass','مشاوره فنی','Technical Consulting','انتخاب معماری، بررسی تیم و نقشه راه فنی برای تصمیم‌های پرهزینه.','Architecture selection, team review and technical roadmaps for costly decisions.','["تصمیم درست از ابتدا","کاهش ریسک","نقشه راه شفاف"]','["Right decision upfront","Lower risk","Clear roadmap"]','["ممیزی معماری","انتخاب تکنولوژی","نقشه راه","بررسی کد"]','["Architecture audit","Tech selection","Roadmapping","Code review"]','["—"]',false,9);

INSERT INTO public.projects (slug, title_fa, title_en, client_name, industry_fa, industry_en, project_type, summary_fa, summary_en, problem_fa, problem_en, solution_fa, solution_en, results_fa, results_en, metrics, technologies, services, timeline_fa, timeline_en, featured, sort_order) VALUES
('airik-commerce','پلتفرم فروشگاهی آیریک','Airik Commerce Platform','آیریک','خرده‌فروشی','Retail','E-commerce','بازطراحی کامل فروشگاه اینترنتی با تمرکز بر سرعت و نرخ تبدیل.','A full rebuild of an online store focused on speed and conversion.','فروشگاه قدیمی روی معماری مونولیت کند بود و در پیک فروش از دسترس خارج می‌شد.','The legacy monolith was slow and went down during sales peaks.','مهاجرت به معماری مدرن، کش لایه‌ای و بازطراحی مسیر خرید.','Migration to a modern stack, layered caching and a redesigned checkout path.','نرخ تبدیل بیش از سه برابر شد و زمان بارگذاری به زیر یک ثانیه رسید.','Conversion tripled and load time dropped below one second.','[{"label_fa":"نرخ تبدیل","label_en":"Conversion","value":"3.2x"},{"label_fa":"زمان بارگذاری","label_en":"Load time","value":"0.8s"},{"label_fa":"پایداری","label_en":"Uptime","value":"99.98%"}]','["Next.js","TypeScript","PostgreSQL","Redis"]','["web-development","seo"]','۴ ماه','4 months',true,1),
('parssanat-automation','سامانه اتوماسیون پارس‌صنعت','ParsSanat Automation Suite','هلدینگ پارس‌صنعت','صنعتی','Industrial','Custom Software','جایگزینی فرآیندهای اکسل‌محور با یک سامانه یکپارچه سازمانی.','Replacing spreadsheet-driven processes with one integrated enterprise system.','ده‌ها فایل اکسل موازی، داده‌های ناسازگار و گزارش‌گیری دستی هفتگی.','Dozens of parallel spreadsheets, inconsistent data and weekly manual reporting.','طراحی مدل داده واحد، اتوماسیون گردش کار و داشبورد مدیریتی بلادرنگ.','A single data model, workflow automation and a real-time management dashboard.','۷۰٪ کاهش کار دستی و گزارش‌گیری از هفتگی به لحظه‌ای رسید.','Manual work down 70% and reporting moved from weekly to real time.','[{"label_fa":"کار دستی","label_en":"Manual work","value":"-70%"},{"label_fa":"زمان گزارش","label_en":"Reporting","value":"Real-time"},{"label_fa":"کاربر فعال","label_en":"Active users","value":"340"}]','["Python","Django","PostgreSQL","Docker"]','["custom-software","automation"]','۷ ماه','7 months',true,2),
('navidpay-app','اپلیکیشن پرداخت نویدپی','NavidPay Mobile App','نویدپی','فین‌تک','Fintech','Mobile','اپلیکیشن پرداخت با تمرکز بر امنیت و سادگی تجربه کاربری.','A payments app built around security and a radically simple UX.','نسخه قبلی امتیاز پایین و نرخ رها کردن بالا در مرحله احراز هویت داشت.','The previous version had low ratings and heavy drop-off during onboarding.','بازطراحی کامل جریان ورود، احراز هویت بیومتریک و بهینه‌سازی عملکرد.','A rebuilt onboarding flow, biometric authentication and performance tuning.','امتیاز کاربران به ۴٫۸ رسید و رها کردن ثبت‌نام نصف شد.','User rating reached 4.8 and signup drop-off was halved.','[{"label_fa":"امتیاز کاربران","label_en":"Rating","value":"4.8"},{"label_fa":"رها کردن ثبت‌نام","label_en":"Drop-off","value":"-52%"},{"label_fa":"تراکنش ماهانه","label_en":"Monthly tx","value":"1.2M"}]','["Flutter","Dart","Node.js"]','["mobile-development"]','۵ ماه','5 months',true,3),
('mehrdaru-seo','رشد ارگانیک مهردارو','Mehrdaru Organic Growth','مهردارو','سلامت','Healthcare','SEO','برنامه سئوی تکنیکال و محتوایی برای یک پلتفرم سلامت.','A technical and content SEO programme for a healthcare platform.','صفحات محصول ایندکس نمی‌شدند و ترافیک ارگانیک راکد بود.','Product pages were not indexed and organic traffic had plateaued.','بازسازی معماری اطلاعات، داده ساختاریافته و رفع مشکلات خزش.','Rebuilt information architecture, structured data and crawl-issue remediation.','ترافیک ارگانیک در ۹ ماه ۴٫۱ برابر شد.','Organic traffic grew 4.1x in nine months.','[{"label_fa":"ترافیک ارگانیک","label_en":"Organic traffic","value":"4.1x"},{"label_fa":"صفحات ایندکس‌شده","label_en":"Indexed pages","value":"+12k"},{"label_fa":"کلمات صفحه اول","label_en":"Page-1 keywords","value":"860"}]','["Next.js","Schema.org","Search Console"]','["seo","web-development"]','۹ ماه','9 months',false,4);

INSERT INTO public.blog_categories (slug, name_fa, name_en, description_fa, description_en, sort_order) VALUES
('engineering','مهندسی نرم‌افزار','Engineering','معماری، کیفیت کد و تصمیم‌های فنی.','Architecture, code quality and technical decisions.',1),
('seo','سئو','SEO','سئوی تکنیکال و رشد ارگانیک.','Technical SEO and organic growth.',2),
('product','محصول','Product','از ایده تا محصول قابل عرضه.','From idea to shippable product.',3),
('ai','هوش مصنوعی','AI','کاربردهای عملی هوش مصنوعی در محصول.','Practical AI in real products.',4);

INSERT INTO public.authors (name_fa, name_en, role_fa, role_en, bio_fa, bio_en) VALUES
('تیم مهندسی رای‌کد','RYCODE Engineering','تیم فنی','Engineering Team','نوشته‌های تیم مهندسی رای‌کد درباره‌ی ساخت نرم‌افزار جدی.','Notes from the RYCODE engineering team on building serious software.');

INSERT INTO public.blog_posts (slug, category_id, author_id, title_fa, title_en, excerpt_fa, excerpt_en, body_fa, body_en, reading_minutes, featured)
SELECT 'modular-architecture-halves-maintenance', c.id, a.id,
 'چرا معماری ماژولار هزینه نگهداری را نصف می‌کند',
 'Why modular architecture halves maintenance cost',
 'وقتی مرزهای ماژول درست تعریف شوند، تغییر یک بخش دیگر کل سیستم را نمی‌لرزاند.',
 'When module boundaries are drawn correctly, changing one part stops shaking the whole system.',
 E'بیشتر پروژه‌هایی که برای بازنویسی به ما سپرده می‌شوند، مشکل تکنولوژی ندارند؛ مشکل مرز دارند.\n\nوقتی هر تغییر کوچک نیازمند لمس ده فایل در پنج بخش نامرتبط باشد، هزینه نگهداری به‌صورت نمایی رشد می‌کند. راه‌حل، ابزار جدید نیست — تعریف صریح مرزهاست.\n\nما در رای‌کد سه قانون ساده را اعمال می‌کنیم: هر ماژول یک مسئولیت روشن دارد، وابستگی‌ها یک‌طرفه هستند، و قرارداد بین ماژول‌ها تایپ‌شده است.',
 E'Most projects handed to us for a rewrite do not have a technology problem. They have a boundary problem.\n\nWhen every small change requires touching ten files across five unrelated areas, maintenance cost grows exponentially. The fix is not a new framework — it is explicit boundaries.\n\nAt RYCODE we apply three simple rules: every module owns one clear responsibility, dependencies flow one way, and contracts between modules are typed.',
 7, true
FROM public.blog_categories c, public.authors a WHERE c.slug='engineering' LIMIT 1;

INSERT INTO public.blog_posts (slug, category_id, author_id, title_fa, title_en, excerpt_fa, excerpt_en, body_fa, body_en, reading_minutes)
SELECT 'technical-seo-for-spa', c.id, a.id,
 'سئوی تکنیکال برای وب‌اپلیکیشن‌های تک‌صفحه‌ای',
 'Technical SEO for single-page applications',
 'رندر سمت سرور تنها نیمی از ماجراست؛ نیم دیگر ساختار URL و داده ساختاریافته است.',
 'Server rendering is only half the story; the other half is URL structure and structured data.',
 E'یک SPA بدون رندر سمت سرور برای موتور جست‌وجو تقریباً نامرئی است، اما فقط افزودن SSR کافی نیست.\n\nهر مسیر باید عنوان، توضیح و URL کانونیکال مستقل داشته باشد. داده ساختاریافته باید در همان پاسخ اولیه سرور موجود باشد، نه بعد از هیدریشن.',
 E'A SPA without server rendering is nearly invisible to search engines, but adding SSR alone is not enough.\n\nEvery route needs its own title, description and canonical URL. Structured data must exist in the initial server response, not after hydration.',
 6
FROM public.blog_categories c, public.authors a WHERE c.slug='seo' LIMIT 1;

INSERT INTO public.blog_posts (slug, category_id, author_id, title_fa, title_en, excerpt_fa, excerpt_en, body_fa, body_en, reading_minutes)
SELECT 'ai-features-that-earn-their-cost', c.id, a.id,
 'قابلیت‌های هوش مصنوعی که هزینه خود را برمی‌گردانند',
 'AI features that actually earn their cost',
 'AI وقتی ارزش دارد که یک کار مشخص و تکراری را حذف کند، نه وقتی به محصول چسبانده شود.',
 'AI is worth it when it removes a specific repetitive task — not when it is bolted onto a product.',
 E'قبل از افزودن هر قابلیت هوش مصنوعی، یک سؤال بپرسید: کدام کار انسانی دقیقاً حذف می‌شود؟\n\nاگر پاسخ روشن نیست، آن قابلیت یک هزینه است نه یک مزیت.',
 E'Before adding any AI feature, ask one question: which human task does it remove, exactly?\n\nIf the answer is unclear, that feature is a cost, not an advantage.',
 5
FROM public.blog_categories c, public.authors a WHERE c.slug='ai' LIMIT 1;

INSERT INTO public.testimonials (name_fa, name_en, role_fa, role_en, quote_fa, quote_en, sort_order) VALUES
('سارا مهرآیین','Sara Mehraeen','مدیر فناوری، هلدینگ پارس‌صنعت','CTO, ParsSanat Holding','تیم رای‌کد جایی وارد شد که دو پیمانکار قبلی شکست خورده بودند. معماری را بازنویسی کردند و سامانه امروز بدون خطا کار می‌کند.','RYCODE stepped in where two previous vendors had failed. They rewrote the architecture and the system now runs flawlessly.',1),
('امیر رستگار','Amir Rastegar','بنیان‌گذار، آیریک','Founder, Airik','سرعت سایت و نرخ تبدیل بعد از بازطراحی قابل مقایسه با قبل نیست. گزارش‌دهی‌شان هم دقیق و شفاف بود.','Site speed and conversion after the rebuild are not comparable to before. Their reporting was precise and transparent too.',2),
('نگار فتحی','Negar Fathi','مدیر محصول، نویدپی','Head of Product, NavidPay','دقت مهندسی و انضباط تحویل‌شان چیزی است که در بازار ایران کم دیده‌ام.','Their engineering rigour and delivery discipline are rare in this market.',3);

INSERT INTO public.faqs (scope, question_fa, question_en, answer_fa, answer_en, sort_order) VALUES
('general','رای‌کد چه نوع پروژه‌هایی می‌پذیرد؟','What kind of projects does RYCODE take on?','از وب‌سایت و اپلیکیشن تا نرم‌افزار سازمانی، اتوماسیون، سئو و رفع باگ پروژه‌های موجود. اگر مسئله فنی است، معمولاً می‌توانیم کمک کنیم.','From websites and apps to enterprise software, automation, SEO and fixing existing projects. If the problem is technical, we can usually help.',1),
('general','چقدر طول می‌کشد تا پاسخ بگیرم؟','How fast will I get a response?','کمتر از ۲۴ ساعت کاری پس از ثبت درخواست، یک تحلیل فنی اولیه و برآورد دریافت می‌کنید.','Within one business day of submitting a request you receive an initial technical analysis and estimate.',2),
('pricing','قیمت‌گذاری چگونه انجام می‌شود؟','How is pricing determined?','بر اساس دامنه کار، پیچیدگی فنی و مدت پروژه. برای پروژه‌های مشخص قیمت ثابت و برای کارهای بلندمدت مدل زمان و مواد پیشنهاد می‌شود.','Based on scope, technical complexity and duration. Fixed price for well-defined projects, time and materials for long-term work.',3),
('installments','پرداخت قسطی چه شرایطی دارد؟','What are the terms for installment payments?','پرداخت مرحله‌ای بسته به دامنه پروژه، مبلغ قرارداد، مدت اجرا و تأیید نهایی ممکن است در دسترس باشد. شرایط برای هر پروژه جداگانه بررسی می‌شود.','Staged payment may be available depending on project scope, contract amount, duration and approval. Terms are reviewed per project.',4),
('installments','آیا پیش‌پرداخت لازم است؟','Is a deposit required?','در طرح‌های پرداخت مرحله‌ای معمولاً یک پیش‌پرداخت در ابتدای کار تعیین می‌شود و باقی مبلغ در اقساط مشخص با سررسید مشخص پرداخت می‌گردد.','Staged plans normally include an upfront deposit, with the remainder split into defined installments with fixed due dates.',5),
('general','آیا پروژه‌های نیمه‌کاره را تحویل می‌گیرید؟','Do you take over unfinished projects?','بله. ابتدا یک ممیزی فنی انجام می‌دهیم و بعد مشخص می‌کنیم که ادامه دادن به‌صرفه است یا بازنویسی تدریجی.','Yes. We start with a technical audit, then determine whether continuing or an incremental rewrite is more economical.',6),
('general','مالکیت کد با چه کسی است؟','Who owns the code?','پس از تسویه نهایی، مالکیت کامل کد و مخزن به کارفرما منتقل می‌شود.','After final settlement, full ownership of the code and repository transfers to the client.',7),
('support','پس از تحویل چه پشتیبانی‌ای ارائه می‌شود؟','What support is provided after delivery?','یک دوره پشتیبانی گارانتی برای رفع باگ و امکان قرارداد نگهداری ماهانه برای توسعه و پایش مستمر.','A warranty period for bug fixes, plus an optional monthly maintenance contract for ongoing development and monitoring.',8);
