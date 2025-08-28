import React from 'react'
import { SortAsc, SortDesc } from 'lucide-react'

interface SortControlsProps {
  sortField: string
  setSortField: (field: string) => void
  sortDirection: 'asc' | 'desc'
  setSortDirection: (direction: 'asc' | 'desc') => void
}

export function SortControls({ sortField, setSortField, sortDirection, setSortDirection }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={sortField}
        onChange={(e) => {
          setSortField(e.target.value)
          setSortDirection('desc')
        }}
        className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm bg-white"
      >
        <option value="">Sort by...</option>
        <option value="created_at">Date</option>
        <option value="reach">Reach</option>
        <option value="page_like_count">Page Likes</option>
        <option value="starting_advertising_date">Start Date</option>
        <option value="store_name">Store Name</option>
        <option value="targeted_audience_country">Country</option>
      </select>
      {sortField && (
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
          className="px-3 py-1.5 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm bg-white"
        >
          <option value="desc">
            {sortField === 'reach' || sortField === 'page_like_count' ? 'Highest First' : 
             sortField === 'starting_advertising_date' || sortField === 'created_at' ? 'Newest First' :
             'Z to A'}
          </option>
          <option value="asc">
            {sortField === 'reach' || sortField === 'page_like_count' ? 'Lowest First' : 
             sortField === 'starting_advertising_date' || sortField === 'created_at' ? 'Oldest First' :
             'A to Z'}
          </option>
        </select>
      )}
    </div>
  )
}