'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Eye, ArrowRight, Shield, TrendingUp, Target } from 'lucide-react'
 
interface Hero3DProps {
  onGetStarted: () => void
}

export function Hero3D({ onGetStarted }: Hero3DProps) {
  return (
    <Card className="w-full h-[800px] bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-slate-950/98 relative overflow-hidden border-slate-700/50 backdrop-blur-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="url(#gradient-fill)"
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.15),transparent_50%)] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.12),transparent_50%)] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,200,255,0.1),transparent_50%)] animate-pulse"></div>
      </div>

      {/* Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="gradient-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: "#ef4444", stopOpacity: 0.3}} />
            <stop offset="50%" style={{stopColor: "#a855f7", stopOpacity: 0.3}} />
            <stop offset="100%" style={{stopColor: "#3b82f6", stopOpacity: 0.3}} />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="flex h-full relative z-10">
        {/* Left Content - Premium Copy */}
        <div className="flex-1 p-12 relative z-20 flex flex-col justify-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 border border-red-500/20 rounded-full px-6 py-3 mb-8 w-fit">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-semibold text-sm">Trusted by Elite Marketers Worldwide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
              Dominate Your
            </span>
            <span className="block bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Competition
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Uncover your competitors' <span className="text-transparent bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text font-bold">winning ad strategies</span>, 
            steal their best campaigns, and scale your business to <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-bold">7-figure success</span>.
          </p>

          {/* Feature Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
              <span className="text-slate-300 font-medium">50M+ ads analyzed daily</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              <span className="text-slate-300 font-medium">Real-time competitor tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
              <span className="text-slate-300 font-medium">Advanced targeting insights</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
              <span className="text-slate-300 font-medium">Performance analytics</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <button
              onClick={onGetStarted}
              className="group relative px-12 py-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-red-500/30 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Eye className="w-6 h-6" />
              Start Spying Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="flex flex-col gap-2">
              <div className="text-slate-400 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Free 14-day trial • No credit card required
              </div>
              <div className="text-slate-500 text-sm">
                Cancel anytime • 99.9% uptime guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Scene */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
          
          {/* Overlay Stats */}
          <div className="absolute top-8 right-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                50M+
              </div>
              <div className="text-slate-400 text-sm font-medium">Ads Tracked</div>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                200+
              </div>
              <div className="text-slate-400 text-sm font-medium">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}