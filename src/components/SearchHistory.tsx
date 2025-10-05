import React, { useState, useEffect } from 'react'
import { Clock, Search } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { HistoryFilters } from './history/HistoryFilters'
import { HistoryItem } from './history/HistoryItem'
import { SearchResultsTable } from './tables/SearchResultsTable'
import { EmptyState } from './tables/EmptyState'
import { LoadingState } from './tables/LoadingState'

interface SearchWithResults {
  id: string
  link: string
  country: string
  keywords_used: string
  count: number
  status: string
  created_at: string
  search_results: any[]
}

interface SearchHistoryProps {
  onViewResults: (results: any[]) => void
}

export function SearchHistory({ onViewResults }: SearchHistoryProps) {
  const [searches, setSearches] = useState<SearchWithResults[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')
  const [sortField, setSortField] = useState<string>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedSearchForTable, setSelectedSearchForTable] = useState<SearchWithResults | null>(null)
  const [expandedSearch, setExpandedSearch] = useState<string | null>(null)

  useEffect(() => {
    loadSearches()
  }, [filter, sortField, sortDirection])

  const loadSearches = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('searches')
        .select(`
          *,
          search_results (*)
        `)

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      // Add sorting
      const ascending = sortDirection === 'asc'
      query = query.order(sortField, { ascending })

      const { data, error } = await query

      if (error) throw error
      setSearches(data || [])
    } catch (error) {
      console.error('Error loading searches:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const exportResults = (search: SearchWithResults) => {
    const headers = [
      'AD Library Url',
      'Ad ID',
      'Store Name',
      'Targeted Audience(Country)',
      'Starting Advertising Date',
      'End Date',
      'Page Profile Url',
      'Page Likes',
      'Reach',
      'Spend',
      'Platforms',
      'CTA Text',
      'Display Format',
      'Title',
      'Product Link',
      'Active Status',
      'Keywords used'
    ]

    const rows = search.search_results.map(result => [
      result.ad_library_url || result.id || '',
      result.ad_archive_id || '',
      result.snapshot?.page_name || result.advertiser?.ad_library_page_info?.page_info?.page_name || result.store_name || '',
      result.targeted_countries_clean || result.targeted_audience_country || (result.targeted_or_reached_countries && result.targeted_or_reached_countries.length > 0 ? result.targeted_or_reached_countries.join(', ') : '') || '',
      result.start_date_formatted || (result.start_date ? new Date(result.start_date * 1000).toLocaleDateString() : '') || result.starting_advertising_date || '',
      result.end_date_formatted || (result.end_date ? new Date(result.end_date * 1000).toLocaleDateString() : '') || '',
      result.snapshot?.page_profile_uri || result.advertiser?.ad_library_page_info?.page_info?.page_profile_uri || result.page_profile_url || '',
      result.advertiser?.ad_library_page_info?.page_info?.likes || result.snapshot?.page_like_count || result.page_like_count || '',
      result.aaa_info?.eu_total_reach || result.reach_estimate || result.reach || '',
      result.spend ? `${result.spend} ${result.currency || ''}`.trim() : '',
      result.publisher_platform && result.publisher_platform.length > 0 ? result.publisher_platform.join(', ') : '',
      result.snapshot?.cta_text || '',
      result.snapshot?.display_format || '',
      result.snapshot?.title || '',
      result.snapshot?.link_url || result.product_link || '',
      result.is_active !== undefined ? (result.is_active ? 'Active' : 'Inactive') : '',
      result.keywords_used || ''
    ])

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `facebook-ad-search-${search.id.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleExpanded = (searchId: string) => {
    setExpandedSearch(expandedSearch === searchId ? null : searchId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <LoadingState message="Loading search history..." className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8" />
  }

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Search History
          </h3>
        </div>

        <HistoryFilters
          filter={filter}
          setFilter={setFilter}
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
        />

        {searches.length === 0 ? (
          <EmptyState 
            icon={Search}
            title="No searches yet"
            description="Start your first search to see results here."
            className="text-center py-12"
          />
        ) : (
          <div className="space-y-4">
            {searches.map((search) => (
              <HistoryItem
                key={search.id}
                search={search}
                isExpanded={expandedSearch === search.id}
                onToggleExpanded={toggleExpanded}
                onViewResults={onViewResults}
                onExportResults={exportResults}
              >
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Search Results ({search.search_results.length})</h4>
                    <div className="bg-white rounded-lg overflow-hidden">
                      <SearchResultsTable results={search.search_results} />
                    </div>
                  </div>
                </div>
              </HistoryItem>
            ))}
          </div>
        )}
      </div>
    </>
  )
}