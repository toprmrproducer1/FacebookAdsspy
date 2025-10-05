import React, { useState } from 'react'
import { Eye, LogOut, User, BarChart3, Database } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { UserProfile } from './UserProfile'

interface HeaderProps {
  activeTab: 'search' | 'history' | 'universal'
  onTabChange: (tab: 'search' | 'history' | 'universal') => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { user, signOut } = useAuth()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
    <header className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                FACEBOOK ADSSPY PRO
              </h1>
              <p className="text-sm text-slate-400">Advanced advertising intelligence</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => onTabChange('search')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Eye className="w-5 h-5" />
              Search
            </button>
            <button
              onClick={() => onTabChange('history')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              History
            </button>
            <button
              onClick={() => onTabChange('universal')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'universal'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Database className="w-5 h-5" />
              Universal DB
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-2xl px-4 py-2 transition-all duration-300"
            >
              <User className="w-5 h-5 text-slate-400" />
              {user?.email}
            </button>
            <button
              onClick={signOut}
              className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300 border border-transparent hover:border-red-500/20"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>

    {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  )
}