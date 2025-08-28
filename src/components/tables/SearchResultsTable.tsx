import React from 'react'
import { ExternalLink, Search, Target, Calendar, Eye, DollarSign, Users, Image as ImageIcon, Hash } from 'lucide-react'
import { SearchResultsRow } from './SearchResultsRow'

interface InputSearchResult {
  // Main fields
  ad_archive_id?: string
  page_id?: string
  is_active?: boolean
  reach_estimate?: number | null
  spend?: string | number | null
  currency?: string
  end_date?: number
  start_date?: number
  start_date_formatted?: string
  end_date_formatted?: string
  publisher_platform?: string[]
  collation_count?: number
  ad_library_url?: string
  targeted_countries_clean?: string
  targeted_or_reached_countries?: string[]
  
  // Snapshot data
  snapshot?: {
    page_name?: string
    page_profile_uri?: string
    page_profile_picture_url?: string
    caption?: string
    cta_text?: string
    display_format?: string
    link_url?: string
    link_description?: string
    title?: string
    page_categories?: string[]
    page_like_count?: number
    body?: {
      text?: string
    }
  }
  
  // Advertiser data
  advertiser?: {
    ad_library_page_info?: {
      page_info?: {
        likes?: number
        page_category?: string
        page_verification?: string
        ig_followers?: number | null
        ig_username?: string | null
        page_profile_uri?: string
        page_name?: string
      }
    }
  }
  
  // EU reach data
  aaa_info?: {
    eu_total_reach?: number
  }
  
  // Legacy format support
  keywords_used?: string
  id?: string
  targeted_audience_country?: string
  starting_advertising_date?: string
  page_profile_url?: string
  store_name?: string
  reach?: string | number
  page_like_count?: string | number
}

interface SearchResultsTableProps {
  results: InputSearchResult[]
}

export function SearchResultsTable({ results }: SearchResultsTableProps) {
  return (
    <div className="overflow-x-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
          <tr>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[200px] border-b border-gray-300">
              <ExternalLink className="w-4 h-4 inline mr-1" />
              AD Library URL
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <Hash className="w-4 h-4 inline mr-1" />
              Ad ID
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[150px] border-b border-gray-300">
              Store Name
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[200px] border-b border-gray-300">
              <ExternalLink className="w-4 h-4 inline mr-1" />
              Page Profile URL
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <Users className="w-4 h-4 inline mr-1" />
              Page Likes
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              Category
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              Country
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <Calendar className="w-4 h-4 inline mr-1" />
              Start Date
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <Calendar className="w-4 h-4 inline mr-1" />
              End Date
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <Eye className="w-4 h-4 inline mr-1" />
              Reach
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Spend
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              Platforms
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              CTA Text
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Format
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[200px] border-b border-gray-300">
              Title
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[200px] border-b border-gray-300">
              <ExternalLink className="w-4 h-4 inline mr-1" />
              Product Link
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              Active Status
            </th>
            <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-300">
              Keywords
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <SearchResultsRow key={index} result={result} />
          ))}
        </tbody>
      </table>
    </div>
  )
}