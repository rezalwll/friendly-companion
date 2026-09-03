export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity: string | null
          entity_id: string | null
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          country: string | null
          created_at: string
          device: string | null
          event_type: string
          id: string
          locale: string | null
          metadata: Json
          path: string | null
          referrer: string | null
          session_hash: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          device?: string | null
          event_type: string
          id?: string
          locale?: string | null
          metadata?: Json
          path?: string | null
          referrer?: string | null
          session_hash?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          device?: string | null
          event_type?: string
          id?: string
          locale?: string | null
          metadata?: Json
          path?: string | null
          referrer?: string | null
          session_hash?: string | null
        }
        Relationships: []
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio_en: string | null
          bio_fa: string | null
          created_at: string
          id: string
          name_en: string
          name_fa: string
          role_en: string | null
          role_fa: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio_en?: string | null
          bio_fa?: string | null
          created_at?: string
          id?: string
          name_en: string
          name_fa: string
          role_en?: string | null
          role_fa?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio_en?: string | null
          bio_fa?: string | null
          created_at?: string
          id?: string
          name_en?: string
          name_fa?: string
          role_en?: string | null
          role_fa?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          description_en: string | null
          description_fa: string | null
          id: string
          name_en: string
          name_fa: string
          slug: string
          sort_order: number
        }
        Insert: {
          description_en?: string | null
          description_fa?: string | null
          id?: string
          name_en: string
          name_fa: string
          slug: string
          sort_order?: number
        }
        Update: {
          description_en?: string | null
          description_fa?: string | null
          id?: string
          name_en?: string
          name_fa?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          body_en: string | null
          body_fa: string | null
          canonical_url: string | null
          category_id: string | null
          cover_url: string | null
          created_at: string
          excerpt_en: string | null
          excerpt_fa: string | null
          featured: boolean
          id: string
          locale: string
          published_at: string | null
          reading_minutes: number
          seo_desc_en: string | null
          seo_desc_fa: string | null
          seo_title_en: string | null
          seo_title_fa: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title_en: string
          title_fa: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string | null
          body_en?: string | null
          body_fa?: string | null
          canonical_url?: string | null
          category_id?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_fa?: string | null
          featured?: boolean
          id?: string
          locale?: string
          published_at?: string | null
          reading_minutes?: number
          seo_desc_en?: string | null
          seo_desc_fa?: string | null
          seo_title_en?: string | null
          seo_title_fa?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title_en: string
          title_fa: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string | null
          body_en?: string | null
          body_fa?: string | null
          canonical_url?: string | null
          category_id?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_fa?: string | null
          featured?: boolean
          id?: string
          locale?: string
          published_at?: string | null
          reading_minutes?: number
          seo_desc_en?: string | null
          seo_desc_fa?: string | null
          seo_title_en?: string | null
          seo_title_fa?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title_en?: string
          title_fa?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          id: string
          name_en: string
          name_fa: string
          slug: string
        }
        Insert: {
          id?: string
          name_en: string
          name_fa: string
          slug: string
        }
        Update: {
          id?: string
          name_en?: string
          name_fa?: string
          slug?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          handled: boolean
          id: string
          locale: string
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          handled?: boolean
          id?: string
          locale?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          handled?: boolean
          id?: string
          locale?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer_en: string
          answer_fa: string
          id: string
          question_en: string
          question_fa: string
          scope: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          answer_en: string
          answer_fa: string
          id?: string
          question_en: string
          question_fa: string
          scope?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          answer_en?: string
          answer_fa?: string
          id?: string
          question_en?: string
          question_fa?: string
          scope?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: []
      }
      installments: {
        Row: {
          amount: number
          created_at: string
          due_on: string
          id: string
          order_id: string
          paid_at: string | null
          sequence: number
          status: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          due_on: string
          id?: string
          order_id: string
          paid_at?: string | null
          sequence?: number
          status?: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_on?: string
          id?: string
          order_id?: string
          paid_at?: string | null
          sequence?: number
          status?: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          currency: string
          due_on: string | null
          id: string
          issued_on: string
          number: string
          order_id: string
          status: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          due_on?: string | null
          id?: string
          issued_on?: string
          number?: string
          order_id: string
          status?: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          due_on?: string | null
          id?: string
          issued_on?: string
          number?: string
          order_id?: string
          status?: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          confirmed: boolean
          created_at: string
          email: string
          id: string
          locale: string
        }
        Insert: {
          confirmed?: boolean
          created_at?: string
          email: string
          id?: string
          locale?: string
        }
        Update: {
          confirmed?: boolean
          created_at?: string
          email?: string
          id?: string
          locale?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          quantity: number
          title: string
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          quantity?: number
          title: string
          unit_price?: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          quantity?: number
          title?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          description: string | null
          due_on: string | null
          id: string
          payment_mode: Database["public"]["Enums"]["payment_mode"]
          progress: number
          reference: string
          request_id: string | null
          starts_on: string | null
          status: Database["public"]["Enums"]["order_status"]
          title: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          description?: string | null
          due_on?: string | null
          id?: string
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          progress?: number
          reference?: string
          request_id?: string | null
          starts_on?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          title: string
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          description?: string | null
          due_on?: string | null
          id?: string
          payment_mode?: Database["public"]["Enums"]["payment_mode"]
          progress?: number
          reference?: string
          request_id?: string | null
          starts_on?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          title?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "project_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          installment_id: string | null
          method: string
          order_id: string | null
          paid_at: string | null
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          installment_id?: string | null
          method?: string
          order_id?: string | null
          paid_at?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          installment_id?: string | null
          method?: string
          order_id?: string | null
          paid_at?: string | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_installment_id_fkey"
            columns: ["installment_id"]
            isOneToOne: false
            referencedRelation: "installments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          locale: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          caption_en: string | null
          caption_fa: string | null
          created_at: string
          id: string
          project_id: string
          sort_order: number
          url: string
        }
        Insert: {
          caption_en?: string | null
          caption_fa?: string | null
          created_at?: string
          id?: string
          project_id: string
          sort_order?: number
          url: string
        }
        Update: {
          caption_en?: string | null
          caption_fa?: string | null
          created_at?: string
          id?: string
          project_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_requests: {
        Row: {
          attachments: Json
          budget_range: string | null
          category: string
          company: string | null
          country: string | null
          created_at: string
          description: string
          email: string
          existing_url: string | null
          full_name: string
          id: string
          locale: string
          needs_consultation: boolean
          needs_installments: boolean
          notes: string | null
          phone: string | null
          preferred_contact: string
          reference: string
          status: Database["public"]["Enums"]["request_status"]
          timeline: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attachments?: Json
          budget_range?: string | null
          category: string
          company?: string | null
          country?: string | null
          created_at?: string
          description: string
          email: string
          existing_url?: string | null
          full_name: string
          id?: string
          locale?: string
          needs_consultation?: boolean
          needs_installments?: boolean
          notes?: string | null
          phone?: string | null
          preferred_contact?: string
          reference?: string
          status?: Database["public"]["Enums"]["request_status"]
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attachments?: Json
          budget_range?: string | null
          category?: string
          company?: string | null
          country?: string | null
          created_at?: string
          description?: string
          email?: string
          existing_url?: string | null
          full_name?: string
          id?: string
          locale?: string
          needs_consultation?: boolean
          needs_installments?: boolean
          notes?: string | null
          phone?: string | null
          preferred_contact?: string
          reference?: string
          status?: Database["public"]["Enums"]["request_status"]
          timeline?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_name: string | null
          cover_url: string | null
          created_at: string
          featured: boolean
          id: string
          industry_en: string | null
          industry_fa: string | null
          metrics: Json
          problem_en: string | null
          problem_fa: string | null
          project_type: string | null
          results_en: string | null
          results_fa: string | null
          services: Json
          slug: string
          solution_en: string | null
          solution_fa: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          summary_en: string | null
          summary_fa: string | null
          technologies: Json
          timeline_en: string | null
          timeline_fa: string | null
          title_en: string
          title_fa: string
          updated_at: string
        }
        Insert: {
          client_name?: string | null
          cover_url?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          industry_en?: string | null
          industry_fa?: string | null
          metrics?: Json
          problem_en?: string | null
          problem_fa?: string | null
          project_type?: string | null
          results_en?: string | null
          results_fa?: string | null
          services?: Json
          slug: string
          solution_en?: string | null
          solution_fa?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary_en?: string | null
          summary_fa?: string | null
          technologies?: Json
          timeline_en?: string | null
          timeline_fa?: string | null
          title_en: string
          title_fa: string
          updated_at?: string
        }
        Update: {
          client_name?: string | null
          cover_url?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          industry_en?: string | null
          industry_fa?: string | null
          metrics?: Json
          problem_en?: string | null
          problem_fa?: string | null
          project_type?: string | null
          results_en?: string | null
          results_fa?: string | null
          services?: Json
          slug?: string
          solution_en?: string | null
          solution_fa?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary_en?: string | null
          summary_fa?: string | null
          technologies?: Json
          timeline_en?: string | null
          timeline_fa?: string | null
          title_en?: string
          title_fa?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          benefits_en: Json
          benefits_fa: Json
          body_en: string | null
          body_fa: string | null
          capabilities_en: Json
          capabilities_fa: Json
          category: string
          created_at: string
          excerpt_en: string | null
          excerpt_fa: string | null
          featured: boolean
          icon: string | null
          id: string
          seo_desc_en: string | null
          seo_desc_fa: string | null
          seo_title_en: string | null
          seo_title_fa: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          tech_stack: Json
          title_en: string
          title_fa: string
          updated_at: string
        }
        Insert: {
          benefits_en?: Json
          benefits_fa?: Json
          body_en?: string | null
          body_fa?: string | null
          capabilities_en?: Json
          capabilities_fa?: Json
          category?: string
          created_at?: string
          excerpt_en?: string | null
          excerpt_fa?: string | null
          featured?: boolean
          icon?: string | null
          id?: string
          seo_desc_en?: string | null
          seo_desc_fa?: string | null
          seo_title_en?: string | null
          seo_title_fa?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          tech_stack?: Json
          title_en: string
          title_fa: string
          updated_at?: string
        }
        Update: {
          benefits_en?: Json
          benefits_fa?: Json
          body_en?: string | null
          body_fa?: string | null
          capabilities_en?: Json
          capabilities_fa?: Json
          category?: string
          created_at?: string
          excerpt_en?: string | null
          excerpt_fa?: string | null
          featured?: boolean
          icon?: string | null
          id?: string
          seo_desc_en?: string | null
          seo_desc_fa?: string | null
          seo_title_en?: string | null
          seo_title_fa?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          tech_stack?: Json
          title_en?: string
          title_fa?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name_en: string
          name_fa: string
          project_id: string | null
          quote_en: string
          quote_fa: string
          role_en: string | null
          role_fa: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name_en: string
          name_fa: string
          project_id?: string | null
          quote_en: string
          quote_fa: string
          role_en?: string | null
          role_fa?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name_en?: string
          name_fa?: string
          project_id?: string | null
          quote_en?: string
          quote_fa?: string
          role_en?: string | null
          role_fa?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          attachments: Json
          author_id: string
          body: string
          created_at: string
          id: string
          is_staff: boolean
          ticket_id: string
        }
        Insert: {
          attachments?: Json
          author_id: string
          body: string
          created_at?: string
          id?: string
          is_staff?: boolean
          ticket_id: string
        }
        Update: {
          attachments?: Json
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          is_staff?: boolean
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          category: string
          created_at: string
          id: string
          order_id: string | null
          priority: Database["public"]["Enums"]["ticket_priority"]
          reference: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          order_id?: string | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          reference?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          order_id?: string | null
          priority?: Database["public"]["Enums"]["ticket_priority"]
          reference?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content: { Args: { _user_id: string }; Returns: boolean }
      can_manage_ops: { Args: { _user_id: string }; Returns: boolean }
      can_support: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "support" | "editor" | "customer"
      content_status: "draft" | "scheduled" | "published" | "archived"
      order_status:
        | "draft"
        | "pending"
        | "active"
        | "on_hold"
        | "completed"
        | "cancelled"
      payment_mode: "full" | "installment"
      payment_status: "unpaid" | "pending" | "paid" | "failed" | "refunded"
      request_status:
        | "new"
        | "reviewing"
        | "quoted"
        | "accepted"
        | "rejected"
        | "converted"
        | "closed"
      ticket_priority: "low" | "normal" | "high" | "urgent"
      ticket_status:
        | "open"
        | "in_progress"
        | "waiting_customer"
        | "resolved"
        | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "support", "editor", "customer"],
      content_status: ["draft", "scheduled", "published", "archived"],
      order_status: [
        "draft",
        "pending",
        "active",
        "on_hold",
        "completed",
        "cancelled",
      ],
      payment_mode: ["full", "installment"],
      payment_status: ["unpaid", "pending", "paid", "failed", "refunded"],
      request_status: [
        "new",
        "reviewing",
        "quoted",
        "accepted",
        "rejected",
        "converted",
        "closed",
      ],
      ticket_priority: ["low", "normal", "high", "urgent"],
      ticket_status: [
        "open",
        "in_progress",
        "waiting_customer",
        "resolved",
        "closed",
      ],
    },
  },
} as const
