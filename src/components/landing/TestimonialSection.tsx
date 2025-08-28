import React from 'react'
import { Star, Users } from 'lucide-react'

export function TestimonialSection() {
  return (
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl text-slate-200 mb-6 font-light italic">
            "Facebook AdsSpy Pro has revolutionized our marketing strategy. We've increased our ROAS by 340% in just 3 months!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">Sarah Johnson</div>
              <div className="text-slate-400">Marketing Director, TechCorp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}