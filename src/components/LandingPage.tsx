import React from 'react'
import { Eye, ArrowRight } from 'lucide-react'
import { HeroSection } from './landing/HeroSection'
import { FeaturesSection } from './landing/FeaturesSection'
import { TestimonialSection } from './landing/TestimonialSection'
import { CTASection } from './landing/CTASection'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.15),transparent_50%)] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,200,255,0.1),transparent_50%)] animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  FACEBOOK ADSSPY PRO
                </h1>
                <p className="text-xs text-slate-400">Competitor Intelligence Platform</p>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white rounded-2xl font-semibold shadow-2xl shadow-red-500/25 hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection onGetStarted={onGetStarted} />

    </div>
  )
}