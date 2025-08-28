import React from 'react'
import { Eye, ArrowRight } from 'lucide-react'

interface CTASectionProps {
  onGetStarted: () => void
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="relative z-10 py-32 bg-gradient-to-r from-red-600/10 via-purple-600/10 to-blue-600/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Ready to Dominate?
          </span>
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Join thousands of successful marketers who use Facebook AdsSpy Pro to stay ahead of the competition.
        </p>
        <button
          onClick={onGetStarted}
          className="group relative px-16 py-8 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white rounded-3xl font-bold text-2xl shadow-2xl shadow-red-500/30 hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-4 mx-auto overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Eye className="w-8 h-8" />
          Start Your Free Trial
          <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </button>
        <p className="text-slate-400 mt-6">No credit card required • 7-day free trial • Cancel anytime</p>
      </div>
    </section>
  )
}