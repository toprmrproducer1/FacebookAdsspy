import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
  throw new Error('Missing Supabase environment variables. Please click "Connect to Supabase" to set up your database connection.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      searches: {
        Row: {
          id: string
          user_id: string
          link: string
          country: string
          keywords_used: string
          count: number
          status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          link: string
          country: string
          keywords_used: string
          count?: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          link?: string
          country?: string
          keywords_used?: string
          count?: number
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
      search_results: {
        Row: {
          id: string
          search_id: string
          ad_library_url: string | null
          ad_archive_id: string | null
          targeted_audience_country: string | null
          product_link: string | null
          starting_advertising_date: string | null
          end_date: string | null
          page_profile_url: string | null
          store_name: string | null
          reach: string | null
          page_like_count: string | null
          category: string | null
          spend: string | null
          currency: string | null
          publisher_platform: string[] | null
          cta_text: string | null
          display_format: string | null
          title: string | null
          is_active: boolean | null
          keywords_used: string | null
          raw_data: any | null
          created_at: string
        }
        Insert: {
          id?: string
          search_id: string
          ad_library_url?: string | null
          ad_archive_id?: string | null
          targeted_audience_country?: string | null
          product_link?: string | null
          starting_advertising_date?: string | null
          end_date?: string | null
          page_profile_url?: string | null
          store_name?: string | null
          reach?: string | null
          page_like_count?: string | null
          category?: string | null
          spend?: string | null
          currency?: string | null
          publisher_platform?: string[] | null
          cta_text?: string | null
          display_format?: string | null
          title?: string | null
          is_active?: boolean | null
          keywords_used?: string | null
          raw_data?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          search_id?: string
          ad_library_url?: string | null
          ad_archive_id?: string | null
          targeted_audience_country?: string | null
          product_link?: string | null
          starting_advertising_date?: string | null
          end_date?: string | null
          page_profile_url?: string | null
          store_name?: string | null
          reach?: string | null
          page_like_count?: string | null
          category?: string | null
          spend?: string | null
          currency?: string | null
          publisher_platform?: string[] | null
          cta_text?: string | null
          display_format?: string | null
          title?: string | null
          is_active?: boolean | null
          keywords_used?: string | null
          raw_data?: any | null
          created_at?: string
        }
      }
    }
  }
}