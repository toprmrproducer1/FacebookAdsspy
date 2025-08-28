import React from 'react'
import { Target, TrendingUp, Globe, Zap, BarChart3, Lock } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: "Advanced Targeting",
    description: "Discover exactly who your competitors are targeting with detailed audience breakdowns and demographics.",
    gradient: "from-red-500 to-purple-500",
    hoverColor: "hover:border-red-500/30 hover:shadow-red-500/10"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Analyze reach, engagement, and spending data to identify winning campaigns and optimize your strategy.",
    gradient: "from-purple-500 to-blue-500",
    hoverColor: "hover:border-purple-500/30 hover:shadow-purple-500/10"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Access ad intelligence from 200+ countries and discover opportunities in new markets worldwide.",
    gradient: "from-blue-500 to-red-500",
    hoverColor: "hover:border-blue-500/30 hover:shadow-blue-500/10"
  },
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description: "Get instant alerts when competitors launch new campaigns or change their ad strategies.",
    gradient: "from-red-500 to-purple-500",
    hoverColor: "hover:border-red-500/30 hover:shadow-red-500/10"
  },
  {
    icon: BarChart3,
    title: "Advanced Filters",
    description: "Filter by industry, spend, reach, duration, and more to find the exact ads you need to analyze.",
    gradient: "from-purple-500 to-blue-500",
    hoverColor: "hover:border-purple-500/30 hover:shadow-purple-500/10"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level security with encrypted data storage and secure API access for your peace of mind.",
    gradient: "from-blue-500 to-red-500",
    hoverColor: "hover:border-blue-500/30 hover:shadow-blue-500/10"
  }
]

export function FeaturesSection() {
  return (
    <section className="relative z-10 py-32 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Everything you need to dominate your competition and scale your ad campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 ${feature.hoverColor} transition-all duration-300 hover:shadow-2xl`}>
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}