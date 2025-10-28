import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Architectural Stone Ornament',
  description: 'Understanding the economic and technical shift that makes CNC stone carving viable for architectural ornament',
}

export default function AboutPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">
          Architectural Stone Ornament: Economic & Technical Analysis
        </h1>

        {/* Section 0: Understanding the Automation Insight */}
        <section className="mb-16">
          <div className="card bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Understanding the Automation Insight
            </h2>

            <div className="space-y-6 text-base text-muted">
              <p className="text-lg text-foreground">
                This use case is emblematic of downstream consequences of automation that most fail to recognize. Three compounding factors create radical market discontinuity:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    1. Automation Eliminates Labor Cost → Economic Fundamentals Invert
                  </h3>
                  <p>
                    For 150 years, stone ornament was economically unviable. Not because stone became expensive—it remained cheap—but because skilled labor became expensive. Industrial materials (concrete, steel, synthetics) won not on material merit but on labor efficiency: high processing cost, low assembly labor.
                  </p>
                  <p className="mt-2">
                    CNC automation eliminates 90%+ of labor cost. This doesn't make stone "competitive again"—it makes stone <em>cheaper than the alternatives</em>. The economic calculation that drove 150 years of material choice reverses. What was economically impossible becomes economically optimal.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    2. AI Eliminates Design Cost → Masterpieces at Zero Marginal Cost
                  </h3>
                  <p>
                    Chartres Cathedral capitals. Versailles ornamental friezes. Renaissance palazzo details. These were commissioned by kings and popes—representing peak human artistry refined over centuries. The design labor was infinite (guilds, apprenticeships, generational knowledge transfer).
                  </p>
                  <p className="mt-2">
                    3D scanning + AI makes this available at zero marginal cost. Not "inspired by" or "in the style of"—the actual masterpieces, dimensionally accurate to 0.1mm, ready for CNC fabrication. The best design work ever produced is now free. This is not incremental improvement—it's the elimination of an entire cost category that previously determined what was buildable.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    3. Legacy Companies Cannot Adapt → New Entrant Advantage
                  </h3>
                  <p>
                    Existing building material companies cannot exploit this. They have established supply chains, inventory systems, sales processes, and pricing models built around industrial materials. Transitioning to stone ornament requires:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Rebuilding procurement (quarries instead of factories)</li>
                    <li>Retraining sales (architectural specification vs. commodity pricing)</li>
                    <li>Restructuring inventory (custom fabrication vs. stock items)</li>
                    <li>Rethinking margins (material cost vs. processing margin)</li>
                  </ul>
                  <p className="mt-2">
                    This is not a feature request or process improvement. It requires business model transformation that destroys existing value chains. Companies with stone infrastructure (like those building structural stone buildings: 15 Clerkenwell Close, Perraudin's projects) prove the concept but cannot scale without abandoning their current business.
                  </p>
                  <p className="mt-2">
                    New entrants start with the correct constraints: zero labor cost (CNC), zero design cost (public domain scanning), material-only pricing. This is why automation creates second-order market opportunities that incumbents cannot address—even when they see it coming.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-background/50 border-l-4 border-primary">
                <p className="font-semibold text-foreground mb-2">The Pattern:</p>
                <p className="text-sm">
                  When automation eliminates a major cost category, it doesn't just make existing products cheaper—it makes previously uneconomical products optimal. When AI eliminates design cost, it doesn't just make new designs cheaper—it makes historical masterpieces free. When these combine, market structure inverts in ways that require complete business model reconstruction. Incumbents cannot adapt because adaptation means abandoning their entire value chain. New entrants win by building around the new reality from inception.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Economic Shift */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            1. Economic Shift
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Pre-Industrial (&lt;1850)</h3>
              <div className="card bg-background/50">
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-subtle mb-1">Material</div>
                    <div className="font-semibold">Cheap</div>
                    <div className="text-sm text-muted">Quarrying is extraction</div>
                  </div>
                  <div>
                    <div className="text-sm text-subtle mb-1">Labor</div>
                    <div className="font-semibold">Cheap/Free</div>
                    <div className="text-sm text-muted">Apprentice system, forced labor</div>
                  </div>
                  <div>
                    <div className="text-sm text-subtle mb-1">Result</div>
                    <div className="font-semibold">Optimal</div>
                    <div className="text-sm text-muted">Stone for everything</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-amber-500">Industrial Era (1850-2020)</h3>
              <div className="card bg-background/50">
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-subtle mb-1">Material</div>
                    <div className="font-semibold">Still Cheap</div>
                    <div className="text-sm text-muted">Extraction remains inexpensive</div>
                  </div>
                  <div>
                    <div className="text-sm text-subtle mb-1">Labor</div>
                    <div className="font-semibold text-red-400">Expensive</div>
                    <div className="text-sm text-muted">Skilled artisans command high wages</div>
                  </div>
                  <div>
                    <div className="text-sm text-subtle mb-1">Result</div>
                    <div className="font-semibold">Shift Away</div>
                    <div className="text-sm text-muted">Steel, concrete (high processing, low assembly labor)</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">CNC Era (2020+)</h3>
              <div className="card bg-background/50 border-primary/30">
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-subtle mb-1">Material</div>
                    <div className="font-semibold">Still Cheap</div>
                    <div className="text-sm text-muted">No change in extraction cost</div>
                  </div>
                  <div>
                    <div className="text-sm text-subtle mb-1">Labor</div>
                    <div className="font-semibold text-primary">Eliminated</div>
                    <div className="text-sm text-muted">Automation via CNC</div>
                  </div>
                  <div>
                    <div className="text-sm text-subtle mb-1">Result</div>
                    <div className="font-semibold text-primary">Optimal Again</div>
                    <div className="text-sm text-muted">Stone becomes economically viable</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-foreground/10 text-sm text-muted">
                  <strong>Key insight:</strong> This is a second-order consequence of automation that existing
                  companies struggle with (transitioning established workflows) but new companies can exploit from inception.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Current Reality - Structural Stone */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            2. Current Reality: Structural Stone
          </h2>

          <p className="text-lg text-muted mb-6">
            Load-bearing structural stone buildings are being built today. If structural applications
            are viable, ornamental applications are trivial by comparison.
          </p>

          <div className="space-y-4">
            <div className="card bg-background/50">
              <h3 className="font-semibold text-lg mb-2">15 Clerkenwell Close</h3>
              <div className="text-sm space-y-1">
                <div><span className="text-subtle">Location:</span> London, UK</div>
                <div><span className="text-subtle">Architect:</span> Amin Taha / Groupwork</div>
                <div><span className="text-subtle">Description:</span> Six-story building with load-bearing limestone exoskeleton</div>
              </div>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold text-lg mb-2">Wine Museum</h3>
              <div className="text-sm space-y-1">
                <div><span className="text-subtle">Location:</span> Corsica</div>
                <div><span className="text-subtle">Architect:</span> Gilles Perraudin</div>
                <div><span className="text-subtle">Description:</span> Structural stone with minimal reinforcement</div>
              </div>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold text-lg mb-2">Additional Projects</h3>
              <div className="text-sm space-y-1">
                <div><span className="text-subtle">Practitioners:</span> Carl Fredrik Svenstedt, Webb Yates Engineers</div>
                <div><span className="text-subtle">Trend:</span> Multiple contemporary projects demonstrating structural stone viability</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded text-sm">
            <strong>Reference:</strong> Polycor -
            <a
              href="https://www.polycor.com/blog/a-return-to-form-the-renaissance-of-structural-stone/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              "A Return to Form: The Renaissance of Structural Stone"
            </a>
          </div>
        </section>

        {/* Section 3: Technical Pipeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            3. Technical Pipeline
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">Acquisition</h3>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>High-resolution 3D scanning of historical elements</li>
                <li>Photogrammetry or laser scanning</li>
                <li>UNESCO sites, cathedrals, historical buildings</li>
                <li>Dimensional accuracy to 0.1mm</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">Processing</h3>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>Mesh cleanup and optimization</li>
                <li>CAD conversion (STEP files)</li>
                <li>Toolpath generation for CNC (G-code)</li>
                <li>Multiple variants (3-axis, 5-axis)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">Fabrication</h3>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>Material sourcing (limestone, sandstone, marble - all cheap and abundant)</li>
                <li>CNC milling (40-200 hours depending on complexity)</li>
                <li>Diamond-tipped tooling</li>
                <li>Optional hand finishing</li>
              </ul>
            </div>

            <div className="card bg-primary/5 border-primary/30">
              <h3 className="text-lg font-semibold mb-3">Economics Example: Chartres Cathedral Jamb Figure</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-subtle mb-2">CNC Method</div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span>Material (limestone block):</span>
                      <span>$800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CNC time (120h @ $50/hr):</span>
                      <span>$6,000</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary pt-2 border-t border-foreground/10">
                      <span>Total:</span>
                      <span>$6,800</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-subtle mb-2">Manual Carving</div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span>Labor (800h @ $100/hr):</span>
                      <span className="text-red-400">$80,000</span>
                    </div>
                    <div className="flex justify-between font-bold text-red-400 pt-2 border-t border-foreground/10">
                      <span>Savings:</span>
                      <span>90%+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Material Reality */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            4. Material Reality
          </h2>

          <p className="text-lg text-muted mb-6">
            Stone is functionally infinite. The material constraint is not scarcity but transportation.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-background/50">
              <h3 className="font-semibold mb-2">Abundance</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted ml-4">
                <li>Limestone, sandstone quarries globally abundant</li>
                <li>No processing required (vs steel smelting, concrete mixing)</li>
                <li>Extraction cost minimal</li>
              </ul>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold mb-2">Environmental</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted ml-4">
                <li>Zero embodied carbon</li>
                <li>Concrete: 8% global CO₂ emissions</li>
                <li>Transportation is only significant cost</li>
                <li>Solution: Use local quarries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Design Library */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            5. Design Library
          </h2>

          <p className="text-lg text-muted mb-6">
            The design work is already done. Centuries of architectural refinement are
            available in the public domain.
          </p>

          <div className="space-y-4">
            <div className="card bg-background/50">
              <div className="font-semibold mb-2">Existing Resources</div>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted ml-4">
                <li>Centuries of architectural refinement</li>
                <li>UNESCO heritage sites documented</li>
                <li>Public domain (most historical work &gt;100 years old)</li>
                <li>Just need scanning/digitization</li>
                <li>No new design labor required</li>
              </ul>
            </div>

            <div className="card bg-background/50">
              <div className="font-semibold mb-2">Practical Implications</div>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted ml-4">
                <li>Chartres, Notre-Dame, Amiens cathedrals</li>
                <li>Renaissance palazzos</li>
                <li>Baroque churches</li>
                <li>Gothic civic buildings</li>
                <li>All available for digitization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Application */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            6. Application
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">Who This Is For</h3>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>New construction incorporating historical ornament</li>
                <li>Restoration projects (matching existing elements)</li>
                <li>Custom residential architecture</li>
                <li>Commercial buildings seeking aesthetic differentiation</li>
                <li>Anyone building with stone who can access CNC</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">What This Enables</h3>
              <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                <li>Cathedral-quality ornament at material cost</li>
                <li>Historically accurate reproduction</li>
                <li>Custom sizing/adaptation (CAD files are editable)</li>
                <li>Mix-and-match elements from different periods/regions</li>
              </ul>
            </div>

            <div className="card bg-primary/5 border-primary/30">
              <h3 className="font-semibold mb-3">Economic Reality</h3>
              <p className="text-sm text-muted mb-3">
                A carved stone capital that would have cost $80,000 in manual labor can now be
                produced for $6,800 in CNC time + material. The design work was completed centuries
                ago. The material is abundant and cheap. The only cost is machine time.
              </p>
              <p className="text-sm text-muted">
                This fundamentally changes what is economically possible in architectural ornament.
              </p>
            </div>
          </div>
        </section>

        {/* Back to catalog */}
        <div className="border-t border-foreground/10 pt-8 text-center">
          <a href="/" className="btn btn-primary text-lg px-8 py-3">
            Browse Catalog
          </a>
        </div>
      </div>
    </div>
  )
}
