/*
  # Create searches and search_results tables

  1. New Tables
    - `searches`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `link` (text, Facebook link to scrape)
      - `country` (text, target country)
      - `keywords_used` (text, keywords for search)
      - `count` (integer, number of results to return)
      - `status` (enum: pending, completed, failed)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `search_results`
      - `id` (uuid, primary key)
      - `search_id` (uuid, references searches)
      - `ad_library_url` (text, nullable)
      - `targeted_audience_country` (text, nullable)
      - `product_link` (text, nullable)
      - `starting_advertising_date` (text, nullable)
      - `page_profile_url` (text, nullable)
      - `store_name` (text, nullable)
      - `reach` (text, nullable)
      - `page_like_count` (text, nullable)
      - `keywords_used` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to access their own data

  3. Indexes
    - Performance indexes for common queries
*/

-- Create searches table
CREATE TABLE IF NOT EXISTS searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  link text NOT NULL,
  country text NOT NULL,
  keywords_used text NOT NULL,
  count integer DEFAULT 10 NOT NULL,
  status text CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create search_results table
CREATE TABLE IF NOT EXISTS search_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id uuid REFERENCES searches(id) ON DELETE CASCADE NOT NULL,
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
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_results ENABLE ROW LEVEL SECURITY;

-- Create policies for searches table
CREATE POLICY "Users can view their own searches"
  ON searches
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own searches"
  ON searches
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own searches"
  ON searches
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for search_results table
CREATE POLICY "Users can view their own search results"
  ON search_results
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create search results for their searches"
  ON search_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM searches
      WHERE searches.id = search_results.search_id
      AND searches.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS searches_user_id_idx ON searches(user_id);
CREATE INDEX IF NOT EXISTS searches_status_idx ON searches(status);
CREATE INDEX IF NOT EXISTS searches_created_at_idx ON searches(created_at DESC);
CREATE INDEX IF NOT EXISTS search_results_search_id_idx ON search_results(search_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for searches table
DROP TRIGGER IF EXISTS update_searches_updated_at ON searches;
CREATE TRIGGER update_searches_updated_at
  BEFORE UPDATE ON searches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();