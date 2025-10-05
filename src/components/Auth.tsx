import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Eye as EyeIcon, Loader2, Eye, EyeOff } from 'lucide-react'

export function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password)

    if (error) {
      if (error.message.includes('User already registered') || error.message.includes('user_already_exists')) {
        setError('This email is already registered. Please sign in instead.')
        setIsLogin(true)
      } else {
        setError(error.message)
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,200,255,0.08),transparent_50%)]"></div>
      
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl mb-6 shadow-2xl shadow-blue-500/30">
            <EyeIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-3">
            FACEBOOK ADSSPY PRO
          </h1>
          <p className="text-slate-400 text-lg">Competitor Intelligence Platform</p>
        </div>

        {/* Auth Form */}
        <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex mb-8 bg-slate-800/50 rounded-2xl p-1.5 backdrop-blur-sm border border-slate-600/30">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                isLogin 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin 
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl text-sm backdrop-blur-sm">
                {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white py-5 px-6 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/25 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>{isLogin ? 'Sign In to Dashboard' : 'Create Account'}</span>
              </button>
            </form>
          </div>
        </div>

        {!isLogin && (
          <p className="text-center text-sm text-slate-400 mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        )}
        </div>
    </div>
  )
}