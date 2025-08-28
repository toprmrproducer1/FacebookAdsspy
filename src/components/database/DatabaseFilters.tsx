import React from 'react'

interface DatabaseFiltersProps {
  filterCountry: string
  setFilterCountry: (value: string) => void
  filterKeywords: string
  setFilterKeywords: (value: string) => void
  countries: string[]
}

export function DatabaseFilters({
  filterCountry,
  setFilterCountry,
  filterKeywords,
  setFilterKeywords,
  countries
}: DatabaseFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Country</label>
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm"
        >
          <option value="">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Keywords</label>
        <input
          type="text"
          value={filterKeywords}
          onChange={(e) => setFilterKeywords(e.target.value)}
          placeholder="Search keywords..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none text-sm"
        />
      </div>
    </div>
  )
}