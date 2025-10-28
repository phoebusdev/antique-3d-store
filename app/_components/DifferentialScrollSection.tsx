'use client'

import { useEffect, useRef, useState } from 'react'

interface DifferentialScrollSectionProps {
  title: string
  titleClassName?: string
  leftContent: React.ReactNode
  rightContent: React.ReactNode
}

export default function DifferentialScrollSection({
  title,
  titleClassName = '',
  leftContent,
  rightContent,
}: DifferentialScrollSectionProps) {
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Only apply parallax on desktop
    if (isMobile || !leftColumnRef.current || !sectionRef.current) return

    const leftColumn = leftColumnRef.current
    const section = sectionRef.current

    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (!leftColumn || !section) return

        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const viewportHeight = window.innerHeight

        // Only apply effect when section is in viewport
        if (sectionTop < viewportHeight && rect.bottom > 0) {
          // Calculate how much we've scrolled through this section
          const scrolled = Math.max(0, -sectionTop)

          // Apply DRAMATIC parallax: left column moves much slower (0.3x speed)
          // So it needs to move 0.7 (1 - 0.3) in opposite direction
          const parallaxOffset = scrolled * 0.7

          leftColumn.style.transform = `translateY(${parallaxOffset}px)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <section ref={sectionRef} className="mb-48 relative">
      {/* Sticky Section Title - spans full width above columns */}
      <div className="sticky top-0 z-20 bg-background py-6 mb-12 border-b border-foreground/10">
        <h2 className={`text-3xl font-bold ${titleClassName}`}>
          {title}
        </h2>
      </div>

      {/* Two Column Layout - completely separate */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-20 relative">
        {/* Left Column - Subheadings (slow scroll) */}
        <div
          ref={leftColumnRef}
          className="space-y-16 md:text-right relative z-0"
          style={{ willChange: isMobile ? 'auto' : 'transform' }}
        >
          {leftContent}
        </div>

        {/* Right Column - Content (normal scroll) */}
        <div className="space-y-16 relative z-0">
          {rightContent}
        </div>
      </div>
    </section>
  )
}
