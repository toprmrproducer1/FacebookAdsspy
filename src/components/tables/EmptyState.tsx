import React from 'react'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description: string
  className?: string
}

export function EmptyState({ 
  icon: Icon = Search, 
  title, 
  description, 
  className = "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8" 
}: EmptyStateProps) {
  return (
    <div className={className}>
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-600/50">
          <Icon className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 text-lg">{description}</p>
      </div>
    </div>
  )
}