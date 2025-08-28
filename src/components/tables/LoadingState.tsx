import React from 'react'

interface LoadingStateProps {
  message?: string
  className?: string
}

export function LoadingState({ 
  message = "Loading...", 
  className = "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8" 
}: LoadingStateProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gradient-to-r from-blue-500 to-purple-500"></div>
        <span className="ml-4 text-slate-300 text-lg">{message}</span>
      </div>
    </div>
  )
}