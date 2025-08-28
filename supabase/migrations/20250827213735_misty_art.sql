/*
  # Add EU Total Reach column

  1. Changes
    - Add `eu_total_reach` column to store EU-specific reach data separately from general reach estimate
    - Keep existing `reach` column for reach_estimate or general reach data
    - This allows us to display both EU Total Reach and Reach Estimate as separate columns

  2. Data Structure
    - `eu_total_reach` (text) - Stores EU-specific reach data from aaa_info.eu_total_reach
    - `reach` (text) - Stores reach_estimate or general reach data
*/

ALTER TABLE search_results ADD COLUMN IF NOT EXISTS eu_total_reach text;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_search_results_eu_total_reach ON search_results (eu_total_reach);