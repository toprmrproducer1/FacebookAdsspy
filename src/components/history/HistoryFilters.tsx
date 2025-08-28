import React from 'react'
import { Filter } from 'lucide-react'

interface HistoryFiltersProps {
  filter: 'all' | 'completed' | 'pending' | 'failed'
  setFilter: (filter: 'all' | 'completed' | 'pending' | 'failed') => void
  sortField: string
  setSortField: (field: string) => void
  sortDirection: 'asc' | 'desc'
  setSortDirection: (direction: 'asc' | 'desc') => void
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
}

export function HistoryFilters({
  filter,
  setFilter,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  showAdvancedFilters,
  setShowAdvancedFilters
}: HistoryFiltersProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <Filter className="w-4 h-4" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm"
              >
                <option value="all">All Searches</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm"
              >
                <option value="created_at">Date Created</option>
                <option value="country">Country</option>
                <option value="keywords_used">Keywords</option>
                <option value="count">Results Count</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Direction</label>
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  )
}