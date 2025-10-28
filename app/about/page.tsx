import type { Metadata } from 'next'
import DifferentialScrollSection from '@/app/_components/DifferentialScrollSection'

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
        <DifferentialScrollSection
          title="Understanding the Automation Insight"
          titleClassName="text-primary"
          leftContent={
            <>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Mechanism
                </h3>
                <p className="text-sm text-subtle mt-1">Labor Cost Elimination → Economic Inversion</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Proof
                </h3>
                <p className="text-sm text-subtle mt-1">Structural Stone Buildings</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  AI Factor
                </h3>
                <p className="text-sm text-subtle mt-1">Design Cost Elimination</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Incumbent Constraint
                </h3>
                <p className="text-sm text-subtle mt-1">Value Chain Destruction</p>
              </div>
            </>
          }
          rightContent={
            <>
              <div className="text-base text-muted">
                <p>
                  Stone remained materially cheap for 150 years. Labor became expensive. Industrial materials (concrete, steel) won on labor efficiency—high processing cost, minimal assembly labor. CNC eliminates 90%+ of labor cost. Stone becomes cheaper than alternatives. The economic calculation reverses.
                </p>
              </div>

              <div className="text-base text-muted">
                <p>
                  <strong>15 Clerkenwell Close</strong> (London, Amin Taha): Six-story load-bearing limestone exoskeleton. <strong>Wine Museum</strong> (Corsica, Gilles Perraudin): Structural stone with minimal reinforcement. <strong>Multiple projects</strong> by Carl Fredrik Svenstedt, Webb Yates Engineers. If structural applications are viable, ornamental applications are trivial.
                </p>
              </div>

              <div className="text-base text-muted">
                <p>
                  Chartres Cathedral capitals. Versailles friezes. Renaissance palazzo details. Commissioned by royals, refined over centuries. 3D scanning makes these available at zero marginal cost—dimensionally accurate to 0.1mm, CNC-ready. Not "inspired by"—the actual masterpieces. Best artistry ever produced, now free.
                </p>
              </div>

              <div className="text-base text-muted space-y-3">
                <p>
                  Building material companies have supply chains, inventory, sales, and pricing built around industrial materials. Exploiting this requires: quarry procurement (not factories), specification sales (not commodity), custom fabrication (not stock), material-only margins (not processing markup).
                </p>
                <p>
                  Stone infrastructure exists (15 Clerkenwell, Perraudin prove it) but cannot scale without abandoning existing business. Not a feature request—requires business model replacement. New entrants start with correct constraints: zero labor (CNC), zero design (scanning), material-only pricing.
                </p>
                <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary">
                  <p className="font-semibold text-foreground mb-2">Pattern:</p>
                  <p className="text-sm">
                    Automation eliminating major cost categories makes previously uneconomical products optimal. AI eliminating design cost makes historical masterpieces free. Combined, market structure inverts requiring complete business model reconstruction. Incumbents fail because adaptation destroys value chains. New entrants exploit second-order consequences from inception.
                  </p>
                </div>
              </div>
            </>
          }
        />

        {/* Section 1: Economic Fundamentals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            1. Economic Fundamentals
          </h2>

          <div className="space-y-8">
            {/* Capital Investment Model Comparison */}
            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-4 text-primary">Traditional Manufacturing vs CNC Stone Model</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-subtle mb-2">Traditional Manufacturing</div>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><strong className="text-foreground">High fixed costs:</strong> Equipment investment</li>
                    <li><strong className="text-foreground">High variable costs:</strong> Labor per unit scales linearly</li>
                    <li><strong className="text-foreground">Unit economics:</strong> Constrained by labor scaling</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-subtle mb-2">CNC Stone Model</div>
                  <ul className="space-y-2 text-sm text-muted">
                    <li><strong className="text-foreground">High fixed costs:</strong> CNC machines (one-time)</li>
                    <li><strong className="text-foreground">Near-zero variable costs:</strong> Post capital payoff</li>
                    <li><strong className="text-foreground">Unit economics:</strong> Material cost only ($400-800/piece)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-background/50 border-l-4 border-primary">
                <p className="font-semibold text-foreground mb-2">The Insight:</p>
                <p className="text-sm text-muted">
                  "Once CNC machines are paid off, this business converts worthless rock into architectural elements at material cost alone. Variable cost per piece approaches zero. This is what happens when labor—historically the dominant cost—is eliminated from production."
                </p>
              </div>
            </div>

            {/* Historical Timeline */}
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
                  <strong>Key insight:</strong> Functionally infinite margin after capital recovery. This is a second-order consequence of automation that existing companies struggle to accommodate but new entrants can exploit from inception.
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

        {/* Section 3: Technology Stack & Roadmap */}
        <DifferentialScrollSection
          title="3. Technology Stack & Roadmap"
          leftContent={
            <>
              <h3 className="text-lg font-semibold text-primary">Acquisition</h3>
              <h3 className="text-lg font-semibold text-primary">Processing</h3>
              <h3 className="text-lg font-semibold text-primary">Fabrication</h3>
              <h3 className="text-lg font-semibold text-primary">Roadmap</h3>
            </>
          }
          rightContent={
            <>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Photogrammetry Pipeline</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4 text-sm">
                  <li><strong className="text-foreground">Current:</strong> Manual high-res 3D scanning of UNESCO sites</li>
                  <li><strong className="text-foreground">Roadmap:</strong> Automated drone-based capture (DJI enterprise, 40MP sensors)</li>
                  <li>Structure-from-Motion processing (RealityCapture, Metashape)</li>
                  <li>Sub-millimeter accuracy at scale</li>
                  <li><strong className="text-foreground">Target:</strong> 1000+ elements scanned per site visit</li>
                  <li><strong className="text-foreground">Economics:</strong> $2000/site visit → 1000 models = $2/model acquisition cost</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-foreground">CAD Pipeline</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4 text-sm">
                  <li>Mesh cleanup (MeshLab, Blender)</li>
                  <li>Solid model conversion (STEP format)</li>
                  <li>Parametric scaling (adaptable dimensions)</li>
                  <li>Multi-axis toolpath generation (Fusion 360, Mastercam)</li>
                  <li>Optimization for 3-axis, 4-axis, 5-axis CNC</li>
                  <li>Automated G-code generation</li>
                  <li><strong className="text-foreground">Timeline:</strong> Current 8 hours/model → Roadmap &lt;1 hour/model (automated)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-foreground">CNC Operations</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4 text-sm">
                  <li><strong className="text-foreground">Current:</strong> Partner network (demonstrated via checkout flow)</li>
                  <li><strong className="text-foreground">Roadmap:</strong> In-house production facility</li>
                  <li>Material sourcing: Direct quarry relationships (Indiana limestone, Texas limestone)</li>
                  <li>Bulk purchasing: $200-400/ton vs $800-1200/block retail</li>
                  <li>Diamond-tipped tooling, dust collection, material handling</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-foreground">In-House Production Economics</h4>
                <div className="card bg-primary/5 border-primary/30 mt-4">
                  <div className="text-sm space-y-4">
                    <div>
                      <div className="font-semibold text-foreground mb-2">Phase 1: Partner Network (Current)</div>
                      <p className="text-muted">Validate demand via partner fabrication. Establish pricing, lead times, quality standards. Build order volume.</p>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-2">Phase 2: Equipment Acquisition</div>
                      <ul className="text-muted space-y-1 ml-4">
                        <li>• 5-axis CNC mill: $250,000-400,000 (Biesse, SCM, Intermac)</li>
                        <li>• Capacity: 40-60 pieces/month at 80-120 hours/piece</li>
                        <li>• Total capital: ~$300,000</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-2">Phase 3: Production Economics (Post-Payoff)</div>
                      <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <div className="font-mono text-xs space-y-1">
                            <div className="flex justify-between">
                              <span>Material (bulk block):</span>
                              <span>$400</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Machine time (100h @ $50/hr):</span>
                              <span>$5,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Labor (setup/finish):</span>
                              <span>$300</span>
                            </div>
                            <div className="flex justify-between font-bold text-primary pt-2 border-t border-foreground/10">
                              <span>Total variable cost:</span>
                              <span>$5,700</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-xs space-y-1">
                            <div className="flex justify-between">
                              <span>Selling price:</span>
                              <span className="text-primary">$12,000-18,000</span>
                            </div>
                            <div className="flex justify-between font-bold text-primary pt-2">
                              <span>Margin per piece:</span>
                              <span>$6,300-12,300</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mt-3 italic">
                        "Once machines are paid off, we're converting $400 of worthless rock into $12,000 architectural elements with $5,000 in machine time. No skilled artisan labor. Unlimited scaling potential."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        />

        {/* Section 4: Scale Application */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            4. Scale Application: Building Projects
          </h2>

          <p className="text-lg text-muted mb-6">
            This isn't about selling decorative pieces to homeowners. This is about supplying building projects at scale.
          </p>

          <div className="space-y-6">
            <div className="card bg-background/50">
              <h3 className="font-semibold mb-3 text-primary">Residential Projects</h3>
              <div className="text-sm space-y-2 text-muted">
                <p><strong className="text-foreground">Example:</strong> 40-unit apartment building with stone facade</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>200 carved elements per building</li>
                  <li>Traditional cost: $4M in manual carving labor</li>
                  <li>CNC cost: $1.2M (material + machine time)</li>
                  <li><strong className="text-primary">Savings: $2.8M per project</strong></li>
                </ul>
              </div>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold mb-3 text-primary">Commercial/Civic Projects</h3>
              <div className="text-sm space-y-2 text-muted">
                <p><strong className="text-foreground">Applications:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Municipal buildings, libraries, museums</li>
                  <li>Stone structural members with integrated ornament</li>
                  <li>Load-bearing columns that are also sculptures</li>
                  <li>Every beam, every lintel, every arch — carved</li>
                </ul>
              </div>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold mb-3 text-primary">Public Works</h3>
              <div className="text-sm space-y-2 text-muted">
                <p><strong className="text-foreground">Infrastructure:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Parks, plazas, monuments</li>
                  <li>Transit stations, streetscapes</li>
                  <li>Infrastructure that isn't brutalist concrete</li>
                  <li>Civic beauty at civic budget</li>
                </ul>
              </div>
            </div>

            <div className="card bg-primary/5 border-primary/30">
              <h3 className="font-semibold mb-3">The Vision</h3>
              <p className="text-sm text-muted">
                Cure glass-cube architecture with economics, not aesthetics. Stone structural members where every piece is a bas-relief masterpiece. Not luxury — baseline. Material is infinite. Labor eliminated. Capital cost amortizes. Result: UNESCO-quality ornament as standard, not exception.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="card bg-background/50">
                <h3 className="font-semibold mb-2 text-sm">Material Abundance</h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted ml-4">
                  <li>Limestone, sandstone quarries globally abundant</li>
                  <li>Stone is functionally worthless until carved</li>
                  <li>No processing required (vs steel smelting, concrete mixing)</li>
                </ul>
              </div>

              <div className="card bg-background/50">
                <h3 className="font-semibold mb-2 text-sm">Environmental</h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted ml-4">
                  <li>Zero embodied carbon</li>
                  <li>Concrete: 8% global CO₂ emissions</li>
                  <li>Solution: Use local quarries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why This Matters (Portfolio Context) */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            5. Why This Matters (Portfolio Context)
          </h2>

          <div className="space-y-6">
            <div className="card bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-3 text-primary">What This Demonstrates</h3>
              <p className="text-sm text-muted mb-4">
                This project shows understanding that automation doesn't just make things cheaper — it changes which materials and methods become economically optimal.
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-foreground">Industrial era:</div>
                  <div className="text-muted">Labor expensive → minimize labor (steel/concrete, simple forms)</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Automation era:</div>
                  <div className="text-muted">Labor eliminated → material optimization (stone, complex forms)</div>
                </div>
              </div>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold mb-3">The Pattern</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted ml-4">
                <li>Free/cheap resource (stone, rock, raw material)</li>
                <li>Historically constrained by labor cost</li>
                <li>Automation eliminates constraint</li>
                <li>Resource becomes viable for complex applications</li>
                <li><strong className="text-foreground">Entire industries can be restructured around this shift</strong></li>
              </ul>
            </div>

            <div className="card bg-background/50">
              <h3 className="font-semibold mb-3">Other Applications of This Pattern</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted ml-4">
                <li><strong className="text-foreground">Agriculture:</strong> Labor → robots, marginal land becomes viable</li>
                <li><strong className="text-foreground">Manufacturing:</strong> Complex geometries previously too labor-intensive</li>
                <li><strong className="text-foreground">Construction:</strong> On-site fabrication, custom everything</li>
                <li>Any industry where material is cheap but labor is dominant cost</li>
              </ul>
            </div>

            <div className="card bg-primary/5 border-primary/30">
              <h3 className="font-semibold mb-3">The Skill Being Demonstrated</h3>
              <p className="text-sm text-muted italic">
                "Recognizing second-order consequences. Not 'CNC makes carving faster' — that's first-order. Second-order: 'Labor elimination makes stone optimal again, enabling architectural styles economically impossible for 150 years.' That's the level of thinking automation requires."
              </p>
            </div>

            <div className="mt-6 p-4 bg-background/50 rounded border border-foreground/10">
              <h3 className="font-semibold mb-2 text-sm">Design Library: Historical Resources</h3>
              <p className="text-xs text-muted mb-3">
                The design work is already done. Centuries of architectural refinement available in the public domain.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-muted">
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Chartres, Notre-Dame, Amiens cathedrals</li>
                  <li>Renaissance palazzos</li>
                  <li>Baroque churches</li>
                </ul>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Gothic civic buildings</li>
                  <li>UNESCO heritage sites documented</li>
                  <li>Public domain (most work &gt;100 years old)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Application */}
        <DifferentialScrollSection
          title="6. Application"
          leftContent={
            <>
              <h3 className="text-lg font-semibold text-primary">Who This Is For</h3>
              <h3 className="text-lg font-semibold text-primary">What This Enables</h3>
            </>
          }
          rightContent={
            <>
              <div>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>New construction incorporating historical ornament</li>
                  <li>Restoration projects (matching existing elements)</li>
                  <li>Custom residential architecture</li>
                  <li>Commercial buildings seeking aesthetic differentiation</li>
                  <li>Anyone building with stone who can access CNC</li>
                </ul>
              </div>

              <div>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Cathedral-quality ornament at material cost</li>
                  <li>Historically accurate reproduction</li>
                  <li>Custom sizing/adaptation (CAD files are editable)</li>
                  <li>Mix-and-match elements from different periods/regions</li>
                </ul>

                <div className="card bg-primary/5 border-primary/30 mt-8">
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
            </>
          }
        />

        {/* Back to catalog */}
        <div className="border-t border-foreground/10 pt-8 text-center">
          <a href="/" className="btn btn-primary text-lg px-8 py-3">
            Browse Elements
          </a>
        </div>
      </div>
    </div>
  )
}
