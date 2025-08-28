import React, { useState } from 'react'
import { User, Settings, CreditCard, BarChart3, Download, Mail, Phone, MapPin, Calendar, Crown, Zap } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface UserProfileProps {
  onClose: () => void
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'settings'>('overview')

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600/20 via-purple-600/20 to-blue-600/20 p-8 border-b border-slate-700/50">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                Profile Dashboard
              </h1>
              <p className="text-slate-400 text-lg">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 font-semibold text-sm">PRO MEMBER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-700/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-8 py-4 font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-red-500/20 to-purple-500/20 text-red-400 border-b-2 border-red-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-8 py-4 font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'billing'
                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border-b-2 border-purple-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Billing
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-8 py-4 font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    <h3 className="text-lg font-semibold text-white">Searches Used</h3>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    847 / 1000
                  </div>
                  <p className="text-slate-400 text-sm mt-1">This month</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-green-500" />
                    <h3 className="text-lg font-semibold text-white">Ads Discovered</h3>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    12,450
                  </div>
                  <p className="text-slate-400 text-sm mt-1">Total tracked</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Download className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">Exports</h3>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    89
                  </div>
                  <p className="text-slate-400 text-sm mt-1">CSV downloads</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'New search completed', details: '10 ads found for "fitness equipment"', time: '2 hours ago' },
                    { action: 'Data export', details: 'Downloaded 156 competitor ads as CSV', time: '1 day ago' },
                    { action: 'Search completed', details: '25 ads found for "skincare products"', time: '2 days ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-slate-400 text-sm">{activity.details}</p>
                      </div>
                      <span className="text-slate-500 text-sm">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-8">
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Crown className="w-6 h-6 text-yellow-500" />
                      Professional Plan
                    </h3>
                    <p className="text-slate-400">Unlimited competitor intelligence</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      $97<span className="text-lg">/mo</span>
                    </div>
                    <p className="text-slate-400 text-sm">Next billing: Jan 15, 2024</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Plan Features</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Unlimited searches</li>
                      <li>• Real-time monitoring</li>
                      <li>• Advanced analytics</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">Usage This Month</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Searches</span>
                        <span className="text-white">847 / ∞</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Exports</span>
                        <span className="text-white">89 / ∞</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                  <CreditCard className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-slate-400 text-sm">Expires 12/25</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              {/* Account Settings */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Account Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                      <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-white">{user?.email}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Member Since</label>
                      <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-white">December 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-xl border border-red-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <button
                    onClick={signOut}
                    className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}