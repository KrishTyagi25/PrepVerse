import React, { useEffect } from 'react'
import { useScrollReveal }  from '../../hooks/useScrollReveal'
import { useCanvasBg }      from '../../hooks/useCanvasBg'
import { useCursor }        from '../../hooks/useCursor'
import { Navbar }           from '../../components/layout/Navbar'
import { HeroSection }      from './HeroSection'
import { Ticker, RolesSection } from './RolesSection'
import { StatsSection, HowItWorks } from './StatsSection'
import { DSAPracticeSection, FeaturesSection } from './PracticeSection'
import { InterviewSection } from './InterviewSection'
import { CommunitySection, TestimonialsSection, CTASection, Footer } from './CommunitySection'

export default function LandingPage() {
  useScrollReveal()
  useCanvasBg('bg-canvas')
  useCursor()

  return (
    <div className="relative min-h-screen">
      {/* Fixed animated canvas background */}
      <canvas id="bg-canvas" className="fixed inset-0 z-0 pointer-events-none"/>

      {/* Cursor */}
      <div id="cur-dot"  className="fixed z-[9999] pointer-events-none"/>
      <div id="cur-ring" className="fixed z-[9998] pointer-events-none"/>

      {/* All content above canvas */}
      <div className="relative z-10">
        <Navbar/>
        <HeroSection/>
        <Ticker/>
        <RolesSection/>
        <StatsSection/>
        <DSAPracticeSection/>
        <FeaturesSection/>
        <HowItWorks/>
        <InterviewSection/>
        <CommunitySection/>
        <TestimonialsSection/>
        <CTASection/>
        <Footer/>
      </div>
    </div>
  )
}