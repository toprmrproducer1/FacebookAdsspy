import React from 'react'
import { Eye, ArrowRight, Shield } from 'lucide-react'
import { Hero3D } from '../ui/hero-3d'

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative z-10 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <Hero3D onGetStarted={onGetStarted} />
      </div>
    </section>
  )
}