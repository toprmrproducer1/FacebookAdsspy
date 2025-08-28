import React, { useState } from 'react'
import { Header } from './Header'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'
import { SearchHistory } from './SearchHistory'
import { UniversalDatabase } from './UniversalDatabase'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'search' | 'history' | 'universal'>('search')
  const [currentResults, setCurrentResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [currentSearchId, setCurrentSearchId] = useState<string | null>(null)

  const handleSearchStart = (searchId: string) => {
    setCurrentSearchId(searchId)
    setLoading(true)
    setCurrentResults([])
  }

  const handleSearchComplete = (results: any[]) => {
    setCurrentResults(results)
    setLoading(false)
    setCurrentSearchId(null)
  }

  const handleViewResults = (results: any[]) => {
    setCurrentResults(results)
    setActiveTab('search')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,200,255,0.05),transparent_50%)]"></div>
      
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 relative z-10">
        {activeTab === 'search' ? (
          <div className="space-y-10">
            <div>
              <SearchForm 
                onSearchStart={handleSearchStart}
                onSearchComplete={handleSearchComplete}
              />
            </div>
            <div>
              <SearchResults 
                results={currentResults}
                loading={loading}
              />
            </div>
          </div>
        ) : activeTab === 'history' ? (
          <SearchHistory onViewResults={handleViewResults} />
        ) : (
          <UniversalDatabase />
        )}
      </main>
    </div>
  )
}