import React from 'react'
import { Eye, Download, ChevronDown, ChevronRight } from 'lucide-react'

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

interface HistoryItemProps {
  search: SearchWithResults
  isExpanded: boolean
  onToggleExpanded: (searchId: string) => void
  onViewResults: (results: any[]) => void
  onExportResults: (search: SearchWithResults) => void
  children?: React.ReactNode
}

export function HistoryItem({
  search,
  isExpanded,
  onToggleExpanded,
  onViewResults,
  onExportResults,
  children
}: HistoryItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(search.status)}`}>
                {search.status}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(search.created_at).toLocaleDateString()} at {new Date(search.created_at).toLocaleTimeString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Country:</span>
                <p className="text-gray-900">{search.country}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Keywords:</span>
                <p className="text-gray-900">{search.keywords_used}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Count:</span>
                <p className="text-gray-900">{search.count}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Results:</span>
                <p className="text-gray-900">{search.search_results.length}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {search.status === 'completed' && search.search_results.length > 0 && (
              <>
                <button
                  onClick={() => onToggleExpanded(search.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Expand Results"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={() => onViewResults(search.search_results)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Results"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onExportResults(search)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Export CSV"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && children}
    </div>
  )
}