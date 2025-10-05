import React, { useState, useEffect } from 'react'
import { Database, Eye, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { DatabaseFilters } from './database/DatabaseFilters'
import { ColumnSelector } from './database/ColumnSelector'
import { SortControls } from './database/SortControls'
import { SearchResultsTable } from './tables/SearchResultsTable'
import { EmptyState } from './tables/EmptyState'
import { LoadingState } from './tables/LoadingState'

interface UniversalResult {
  id: string
  search_id: string
  ad_library_url: string | null
  targeted_audience_country: string | null
  product_link: string | null
  starting_advertising_date: string | null
  page_profile_url: string | null
  store_name: string | null
  reach: string | null
  page_like_count: string | null
  keywords_used: string | null
  created_at: string
  search: {
    link: string
    country: string
    keywords_used: string
    created_at: string
  }
}

const availableColumns = [
  { key: 'ad_library_url', label: 'AD Library URL', icon: Database },
  { key: 'ad_archive_id', label: 'Ad ID', icon: Database },
  { key: 'store_name', label: 'Store Name', icon: Database },
  { key: 'page_profile_url', label: 'Page Profile URL', icon: Database },
  { key: 'page_like_count', label: 'Page Likes', icon: Database },
  { key: 'category', label: 'Category', icon: Database },
  { key: 'targeted_audience_country', label: 'Country', icon: Database },
  { key: 'starting_advertising_date', label: 'Start Date', icon: Database },
  { key: 'end_date', label: 'End Date', icon: Database },
  { key: 'reach', label: 'Reach', icon: Database },
  { key: 'spend', label: 'Spend', icon: Database },
  { key: 'publisher_platform', label: 'Platforms', icon: Database },
  { key: 'cta_text', label: 'CTA Text', icon: Database },
  { key: 'display_format', label: 'Format', icon: Database },
  { key: 'title', label: 'Title', icon: Database },
  { key: 'product_link', label: 'Product Link', icon: Database },
  { key: 'is_active', label: 'Active Status', icon: Database },
  { key: 'keywords_used', label: 'Keywords', icon: Database },
]

export function UniversalDatabase() {
  const [results, setResults] = useState<UniversalResult[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [filterCountry, setFilterCountry] = useState('')
  const [filterKeywords, setFilterKeywords] = useState('')
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'ad_library_url', 'ad_archive_id', 'store_name', 'page_profile_url', 'page_like_count', 'category',
    'targeted_audience_country', 'starting_advertising_date', 'end_date', 'reach', 'spend',
    'publisher_platform', 'cta_text', 'display_format', 'title', 'product_link', 'is_active', 'keywords_used'
  ])
  const [showColumnSelector, setShowColumnSelector] = useState(false)

  useEffect(() => {
    loadAllResults()
  }, [])

  const loadAllResults = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('search_results')
        .select(`
          *,
          searches!inner (
            link,
            country,
            keywords_used,
            created_at,
            user_id
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      setResults(data || [])
    } catch (error) {
      console.error('Error loading universal results:', error)
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

  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(col => col !== columnKey)
        : [...prev, columnKey]
    )
  }

  const exportToCSV = () => {
    const headers = visibleColumns.map(col => 
      availableColumns.find(c => c.key === col)?.label || col
    )

    const rows = filteredAndSortedResults.map(result => 
      visibleColumns.map(col => {
        switch (col) {
          case 'ad_library_url': return result.ad_library_url || ''
          case 'store_name': return result.store_name || ''
          case 'targeted_audience_country': return result.targeted_audience_country || ''
          case 'starting_advertising_date': return result.starting_advertising_date || ''
          case 'page_profile_url': return result.page_profile_url || ''
          case 'page_like_count': return result.page_like_count || ''
          case 'reach': return result.reach || ''
          case 'product_link': return result.product_link || ''
          case 'keywords_used': return result.keywords_used || ''
          default: return ''
        }
      })
    )

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `universal-database-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredAndSortedResults = results
    .filter(result => {
      const matchesCountry = !filterCountry || 
        (result.targeted_audience_country && result.targeted_audience_country.toLowerCase().includes(filterCountry.toLowerCase()))
      const matchesKeywords = !filterKeywords || 
        (result.keywords_used && result.keywords_used.toLowerCase().includes(filterKeywords.toLowerCase()))
      return matchesCountry && matchesKeywords
    })
    .sort((a, b) => {
      if (!sortField) return 0
      
      let aValue = ''
      let bValue = ''
      
      switch (sortField) {
        case 'reach':
          aValue = a.reach || '0'
          bValue = b.reach || '0'
          // Handle different reach formats (numbers, strings with commas, ranges like "1,000-5,000")
          const parseReach = (reach: string) => {
            if (!reach || reach === '0') return 0
            // If it's a range, take the lower number
            if (reach.includes('-')) {
              const range = reach.split('-')[0].replace(/[^0-9]/g, '')
              return parseInt(range) || 0
            }
            // Remove commas, letters, and other non-numeric characters
            const cleaned = reach.replace(/[^0-9]/g, '')
            return parseInt(cleaned) || 0
          }
          const aNum = parseReach(aValue.toString())
          const bNum = parseReach(bValue.toString())
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
        case 'page_like_count':
          const parseLikes = (likes: string | number) => {
            if (!likes) return 0
            const cleaned = likes.toString().replace(/[^0-9]/g, '')
            return parseInt(cleaned) || 0
          }
          const aLikes = parseLikes(a.page_like_count || '0')
          const bLikes = parseLikes(b.page_like_count || '0')
          return sortDirection === 'asc' ? aLikes - bLikes : bLikes - aLikes
        case 'starting_advertising_date':
          aValue = a.starting_advertising_date || ''
          bValue = b.starting_advertising_date || ''
          // Try to parse as dates for proper chronological sorting
          const parseDate = (dateStr: string) => {
            if (!dateStr) return new Date(0)
            const parsed = new Date(dateStr)
            return isNaN(parsed.getTime()) ? new Date(0) : parsed
          }
          const aDate = parseDate(aValue)
          const bDate = parseDate(bValue)
          return sortDirection === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
        case 'created_at':
          const aCreated = new Date(a.created_at)
          const bCreated = new Date(b.created_at)
          return sortDirection === 'asc' ? aCreated.getTime() - bCreated.getTime() : bCreated.getTime() - aCreated.getTime()
        default:
          aValue = (a as any)[sortField]?.toString() || ''
          bValue = (b as any)[sortField]?.toString() || ''
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
    })

  const countries = [...new Set(results.map(r => r.targeted_audience_country).filter(Boolean))].sort()

  if (loading) {
    return <LoadingState message="Loading universal database..." className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8" />
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Universal Database ({filteredAndSortedResults.length} results)
        </h3>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowColumnSelector(!showColumnSelector)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            Columns
          </button>
          <SortControls
            sortField={sortField}
            setSortField={setSortField}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <DatabaseFilters
        filterCountry={filterCountry}
        setFilterCountry={setFilterCountry}
        filterKeywords={filterKeywords}
        setFilterKeywords={setFilterKeywords}
        countries={countries}
      />

      {showColumnSelector && (
        <ColumnSelector
          columns={availableColumns}
          visibleColumns={visibleColumns}
          toggleColumnVisibility={toggleColumnVisibility}
        />
      )}

      {filteredAndSortedResults.length === 0 ? (
        <EmptyState 
          icon={Database}
          title="No Results Found"
          description="No search results match your current filters."
          className="text-center py-12"
        />
      ) : (
        <SearchResultsTable results={filteredAndSortedResults} />
      )}
    </div>
  )
}