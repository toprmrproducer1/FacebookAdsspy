import React from 'react'

interface Column {
  key: string
  label: string
  icon: React.ElementType
}

interface ColumnSelectorProps {
  columns: Column[]
  visibleColumns: string[]
  toggleColumnVisibility: (columnKey: string) => void
}

export function ColumnSelector({ columns, visibleColumns, toggleColumnVisibility }: ColumnSelectorProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Select Columns to Display</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {columns.map(column => (
          <label key={column.key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={visibleColumns.includes(column.key)}
              onChange={() => toggleColumnVisibility(column.key)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <column.icon className="w-4 h-4 text-gray-400" />
            {column.label}
          </label>
        ))}
      </div>
    </div>
  )
}