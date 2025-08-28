/*
# Add missing columns to search_results table

1. New Columns Added
   - `ad_archive_id` (text) - The unique ad identifier
   - `category` (text) - Page category information
   - `end_date` (text) - When the ad stopped running
   - `spend` (text) - Ad spend information
   - `currency` (text) - Currency used for spend
   - `publisher_platform` (text[]) - Array of platforms (Facebook, Instagram, etc.)
   - `cta_text` (text) - Call-to-action button text
   - `display_format` (text) - Ad format (video, image, etc.)
   - `title` (text) - Ad title/headline
   - `is_active` (boolean) - Whether the ad is currently active
   - `raw_data` (jsonb) - Store complete raw response for future extensibility

2. Data Enhancement
   - Preserves all rich data from API responses
   - Enables consistent display across Search, History, and Universal Database
   - Future-proofs the schema with raw_data storage

3. Backward Compatibility
   - All new columns are nullable to maintain existing data
   - Default values provided where appropriate
*/

-- Add missing columns to search_results table
ALTER TABLE search_results 
ADD COLUMN IF NOT EXISTS ad_archive_id text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS end_date text,
ADD COLUMN IF NOT EXISTS spend text,
ADD COLUMN IF NOT EXISTS currency text,
ADD COLUMN IF NOT EXISTS publisher_platform text[],
ADD COLUMN IF NOT EXISTS cta_text text,
ADD COLUMN IF NOT EXISTS display_format text,
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT NULL,
ADD COLUMN IF NOT EXISTS raw_data jsonb;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_search_results_ad_archive_id ON search_results (ad_archive_id);
CREATE INDEX IF NOT EXISTS idx_search_results_is_active ON search_results (is_active);
CREATE INDEX IF NOT EXISTS idx_search_results_category ON search_results (category);
CREATE INDEX IF NOT EXISTS idx_search_results_publisher_platform ON search_results USING GIN (publisher_platform);