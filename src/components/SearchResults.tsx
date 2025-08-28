import React from 'react'
import { Target } from 'lucide-react'
import { SearchResultsTable } from './tables/SearchResultsTable'
import { EmptyState } from './tables/EmptyState'
import { LoadingState } from './tables/LoadingState'

interface SearchResultsProps {
  results: any[]
  loading: boolean
}

export function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return <LoadingState message="Processing your search..." />
  }

  if (results.length === 0) {
    return <EmptyState title="No Results Found" description="Try adjusting your search parameters or keywords." />
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-8 flex items-center gap-3">
        <Target className="w-6 h-6 text-blue-400" />
        Search Results ({results.length})
      </h3>

      <div className="overflow-x-auto">
        <SearchResultsTable results={results} />
      </div>
    </div>
  )
}