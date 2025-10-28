import Link from 'next/link'

// Hero section for architectural stone ornament demo
export default function Hero() {
  return (
    <section className="border-b border-foreground/10">
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Architectural Stone Elements: Post-Labor Economics
          </h1>

          {/* Subhead */}
          <p className="text-xl md:text-2xl text-muted mb-8 leading-relaxed">
            Once CNC machines are paid off, converting worthless rock into UNESCO-quality architectural elements costs material only. Supply for building projects at any scale. Cure glass-cube architecture with economics.
          </p>

          {/* Body content */}
          <div className="space-y-4 text-base text-muted mb-10">
            <p>
              Stone is materially infinite and free. Historical limitation was labor cost. CNC automation eliminates labor.
            </p>
            <p>
              Result: Cathedral-quality ornament becomes economically viable for any project. This is a demonstration of understanding how automation changes fundamental cost structures, using architectural stone as illustration.
            </p>
          </div>

          {/* Automation insight */}
          <div className="card bg-primary/5 border-primary/20 mb-10">
            <div className="text-sm text-primary font-semibold mb-3">Why This Matters</div>
            <div className="space-y-2 text-sm text-muted">
              <p>
                <strong className="text-foreground">Recognizing second-order consequences.</strong> Not "CNC makes carving faster" — that's first-order. Second-order: "Labor elimination makes stone optimal again, enabling architectural styles economically impossible for 150 years."
              </p>
              <p>
                <strong className="text-foreground">Identifying arbitrage opportunities.</strong> Free material (stone, rock) + eliminated labor cost = economic inversion. Industries can be restructured around this shift.
              </p>
              <p>
                <strong className="text-foreground">Technical implementation capability.</strong> Photogrammetry → CAD → CNC pipeline. From UNESCO site to fabricated element. Strategic vision: cure architectural degradation via economics, not aesthetics.
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
