'use client'

import { useEffect, useRef, useState } from 'react'

interface DifferentialScrollSectionProps {
  title: string
  titleClassName?: string
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  className?: string
}

export default function DifferentialScrollSection({
  title,
  titleClassName = '',
  leftContent,
  rightContent,
  className = '',
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
          // Negative sectionTop means we've scrolled past the top
          const scrolled = Math.max(0, -sectionTop)

          // Apply parallax: left column moves slower (0.6x speed)
          // So it needs to move 0.4 (1 - 0.6) in opposite direction
          const parallaxOffset = scrolled * 0.4

          leftColumn.style.transform = `translateY(${parallaxOffset}px)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <section ref={sectionRef} className={`mb-16 ${className}`}>
      {/* Sticky Section Title */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-4 mb-6 border-b border-foreground/10">
        <h2 className={`text-2xl font-bold ${titleClassName}`}>
          {title}
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 md:gap-12">
        {/* Left Column - Headings (slower scroll) */}
        <div
          ref={leftColumnRef}
          className="space-y-6"
          style={{ willChange: isMobile ? 'auto' : 'transform' }}
        >
          {leftContent}
        </div>

        {/* Right Column - Content (normal scroll) */}
        <div className="space-y-6">
          {rightContent}
        </div>
      </div>
    </section>
  )
}
