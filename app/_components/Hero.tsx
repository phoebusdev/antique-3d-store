import Link from 'next/link'

// Hero section for architectural stone ornament demo
export default function Hero() {
  return (
    <section className="border-b border-foreground/10">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Architectural Stone Ornament: CNC-Ready Historical Elements
          </h1>

          {/* Body content */}
          <div className="space-y-6 text-lg text-muted mb-10">
            <p>
              Stone is materially cheap. Labor was the cost. CNC eliminates labor cost.
            </p>
            <p>
              If structural stone buildings are viable now (15 Clerkenwell Close, Perraudin's work),
              ornamental applications are trivial by comparison.
            </p>
            <p>
              High-resolution scans of UNESCO architectural elements. Download CNC-ready files
              or select a fabrication partner.
            </p>
          </div>

          {/* Automation insight */}
          <div className="card bg-primary/5 border-primary/20 mb-10">
            <div className="text-sm text-primary font-semibold mb-3">Why This Matters</div>
            <div className="space-y-3 text-sm text-muted">
              <p>
                <strong className="text-foreground">Automation eliminates labor cost,</strong> fundamentally changing what's economically viable. Stone ornament becomes cheaper than the industrial alternatives (concrete, synthetic materials) it replaced.
              </p>
              <p>
                <strong className="text-foreground">AI eliminates design cost.</strong> Masterpieces commissioned by royals—the best artistry ever produced—are available at zero marginal cost through 3D scanning. No new design labor required.
              </p>
              <p>
                <strong className="text-foreground">Legacy companies cannot adapt.</strong> This requires rebuilding around radically different market constraints. New entrants exploit second-order automation consequences that existing workflows cannot accommodate.
              </p>
            </div>
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
                90%+ labor cost elimination
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Link
              href="/about"
              className="btn btn-primary text-lg px-8 py-3"
            >
              Learn More
            </Link>
            <Link
              href="#gallery"
              className="btn btn-ghost text-lg px-8 py-3"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
