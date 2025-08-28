/*
  # Facebook Ad Scraper Database Schema

  1. New Tables
    - `searches`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `link` (text, Facebook link to scrape)
      - `country` (text, target country)
      - `keywords_used` (text, search keywords)
      - `count` (integer, number of results to fetch)
      - `status` (text, search status: pending/completed/failed)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `search_results`
      - `id` (uuid, primary key)
      - `search_id` (uuid, foreign key to searches)
      - `ad_library_url` (text, Facebook ad library URL)
      - `targeted_audience_country` (text, ad target country)
      - `product_link` (text, advertised product URL)
      - `starting_advertising_date` (text, when ad started)
      - `page_profile_url` (text, advertiser page URL)
      - `store_name` (text, advertiser store name)
      - `reach` (text, ad reach metrics)
      - `page_like_count` (text, page likes)
      - `keywords_used` (text, keywords found in ad)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Users can only access searches and results they created

  3. Performance
    - Add indexes on frequently queried columns
    - Add trigger for automatic updated_at timestamp updates
*/

-- Create searches table
CREATE TABLE IF NOT EXISTS public.searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  link text NOT NULL,
  country text NOT NULL,
  keywords_used text NOT NULL,
  count integer DEFAULT 10 NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create search_results table
CREATE TABLE IF NOT EXISTS public.search_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id uuid REFERENCES public.searches(id) ON DELETE CASCADE NOT NULL,
  ad_library_url text,
  targeted_audience_country text,
  product_link text,
  starting_advertising_date text,
  page_profile_url text,
  store_name text,
  reach text,
  page_like_count text,
  keywords_used text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own searches" ON public.searches;
DROP POLICY IF EXISTS "Users can insert their own searches" ON public.searches;
DROP POLICY IF EXISTS "Users can update their own searches" ON public.searches;
DROP POLICY IF EXISTS "Users can delete their own searches" ON public.searches;
DROP POLICY IF EXISTS "Users can view results from their own searches" ON public.search_results;
DROP POLICY IF EXISTS "Users can insert results for their own searches" ON public.search_results;
DROP POLICY IF EXISTS "Users can update results from their own searches" ON public.search_results;
DROP POLICY IF EXISTS "Users can delete results from their own searches" ON public.search_results;

-- Create policies for searches table
CREATE POLICY "Users can view their own searches"
  ON public.searches
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own searches"
  ON public.searches
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own searches"
  ON public.searches
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own searches"
  ON public.searches
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for search_results table
CREATE POLICY "Users can view results from their own searches"
  ON public.search_results
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert results for their own searches"
  ON public.search_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update results from their own searches"
  ON public.search_results
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete results from their own searches"
  ON public.search_results
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_searches_user_id ON public.searches(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_status ON public.searches(status);
CREATE INDEX IF NOT EXISTS idx_searches_created_at ON public.searches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_results_search_id ON public.search_results(search_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on searches table
DROP TRIGGER IF EXISTS trigger_searches_updated_at ON public.searches;
CREATE TRIGGER trigger_searches_updated_at
  BEFORE UPDATE ON public.searches
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();