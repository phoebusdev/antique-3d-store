import Link from 'next/link'

// Hero section for architectural stone ornament demo
export default function Hero() {
  return (
    <section className="border-b border-foreground/10">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            <span className="font-display">Carve</span><span className="font-modern font-light tracking-wider">NC</span>: Architectural Stone Elements
          </h1>

          {/* Subhead */}
          <p className="text-xl md:text-2xl text-muted mb-8 leading-relaxed">
            CNC automation transforms abundant natural stone into precision architectural elements at material cost. Bringing UNESCO-quality ornament to building projects at any scale through the economics of automation.
          </p>

          {/* Body content */}
          <div className="space-y-4 text-base text-muted mb-10">
            <p>
              Stone resources are abundant and accessible. Historically, ornamental stonework was constrained by labor costs. CNC automation fundamentally changes this equation.
            </p>
            <p>
              The result: Cathedral-quality architectural ornament becomes economically viable for contemporary projects. Labor elimination makes stone architecturally optimal again, enabling ornamental styles that have been economically unfeasible for 150 years.
            </p>
          </div>

          {/* Cost comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="card bg-background/50">
              <div className="text-sm text-subtle mb-2">Traditional Method</div>
              <div className="text-2xl font-bold mb-2 font-mono">Manual carving</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Time:</span>
                  <span className="font-mono">800 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Cost:</span>
                  <span className="font-mono text-red-400">$80,000</span>
                </div>
              </div>
            </div>

            <div className="card bg-background/50 border-primary/30">
              <div className="text-sm text-primary mb-2">CNC Automation</div>
              <div className="text-2xl font-bold mb-2 font-mono">CNC carving</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Time:</span>
                  <span className="font-mono">120 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Cost:</span>
                  <span className="font-mono text-primary">$6,000</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-foreground/10 text-xs text-primary">
                90%+ reduction in labor costs
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Link
              href="/about"
              className="btn btn-primary text-lg px-8 py-3"
            >
              View Economics
            </Link>
            <Link
              href="#gallery"
              className="btn btn-ghost text-lg px-8 py-3"
            >
              Browse Elements
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
