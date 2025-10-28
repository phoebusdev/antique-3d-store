import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Roadmap | CarveNC Implementation Path',
  description: 'Development roadmap from demonstration site to full-scale CNC stone fabrication facility',
}

export default function RoadmapPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          <span className="font-display">Carve</span><span className="font-modern font-light tracking-wider">NC</span> Roadmap
        </h1>
        <p className="text-xl text-muted mb-12">
          Development path from demonstration site to full-scale production facility
        </p>

        {/* Current State */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <h2 className="text-2xl font-bold">Phase 0: Current State (Demonstration)</h2>
          </div>

          <div className="space-y-6 ml-6 border-l-2 border-foreground/10 pl-8">
            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">What This Site Actually Is</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• <strong className="text-foreground">Technology:</strong> Next.js 14, React Three Fiber, TypeScript</li>
                <li>• <strong className="text-foreground">3D Models:</strong> AI-generated via Meshy.ai (manual prompt-based generation)</li>
                <li>• <strong className="text-foreground">Purpose:</strong> Technical demonstration of concept and economics</li>
                <li>• <strong className="text-foreground">Functionality:</strong> Full e-commerce flow (Stripe integration), 3D viewer, responsive design</li>
                <li>• <strong className="text-foreground">Infrastructure:</strong> Vercel deployment, ready for production traffic</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Current Limitations</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Models are AI-generated placeholders, not real scans</li>
                <li>• No actual CNC fabrication partnerships</li>
                <li>• Manual model generation process</li>
                <li>• Limited catalog size (proof of concept)</li>
              </ul>
            </div>

            <div className="card bg-background/50">
              <h3 className="text-lg font-semibold mb-3">What's Already Production-Ready</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• E-commerce infrastructure (checkout, payment processing)</li>
                <li>• 3D model viewer and gallery system</li>
                <li>• Responsive design for all devices</li>
                <li>• SEO optimization and metadata</li>
                <li>• Performance optimization (code splitting, lazy loading)</li>
                <li>• Analytics-ready architecture</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Phase 1 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-foreground/30"></div>
            <h2 className="text-2xl font-bold">Phase 1: API-Driven Model Generation</h2>
            <span className="text-sm text-muted">3-6 months</span>
          </div>

          <div className="space-y-6 ml-6 border-l-2 border-foreground/10 pl-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Technical Implementation</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• <strong className="text-foreground">Meshy.ai API Integration:</strong> Automate 3D model generation</li>
                <li>• <strong className="text-foreground">Prompt Library:</strong> Curated architectural element descriptions</li>
                <li>• <strong className="text-foreground">Batch Processing:</strong> Generate 100+ models from template prompts</li>
                <li>• <strong className="text-foreground">Quality Control:</strong> Automated filtering for geometry issues</li>
                <li>• <strong className="text-foreground">Storage:</strong> S3/CDN for model files</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Catalog Expansion</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-2">Element Types</div>
                  <ul className="space-y-1 text-muted">
                    <li>• Gothic capitals (50+ variations)</li>
                    <li>• Renaissance friezes (30+ variations)</li>
                    <li>• Baroque ornaments (40+ variations)</li>
                    <li>• Classical columns (20+ orders)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Target</div>
                  <ul className="space-y-1 text-muted">
                    <li>• 200+ catalog items</li>
                    <li>• Multiple scales per element</li>
                    <li>• Searchable by period/style</li>
                    <li>• Filter by complexity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card bg-amber-500/5 border-amber-500/20">
              <h3 className="text-lg font-semibold mb-3">Investment Required</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Meshy.ai API costs:</span>
                  <span className="font-mono">$500-1,000/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Storage/CDN:</span>
                  <span className="font-mono">$100-200/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Development time:</span>
                  <span className="font-mono">80-120 hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-foreground/30"></div>
            <h2 className="text-2xl font-bold">Phase 2: Real Photogrammetry + CNC Partners</h2>
            <span className="text-sm text-muted">6-12 months</span>
          </div>

          <div className="space-y-6 ml-6 border-l-2 border-foreground/10 pl-8">
            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">The Transformation to Real Models</h3>
              <p className="text-sm text-muted mb-3">
                Replace AI-generated placeholders with actual high-resolution scans of UNESCO heritage sites.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Photogrammetry Pipeline</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-2">Equipment</div>
                  <ul className="space-y-1 text-muted ml-4">
                    <li>• <strong>Polycam Pro:</strong> $30/month (mobile-first solution)</li>
                    <li>• <strong>Alternative:</strong> DSLR + RealityCapture ($3,500 perpetual license)</li>
                    <li>• <strong>Future:</strong> DJI drone with RTK for large-scale captures</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Processing</div>
                  <ul className="space-y-1 text-muted ml-4">
                    <li>• Cloud processing: RealityCapture or Metashape</li>
                    <li>• Mesh cleanup: Blender automation scripts</li>
                    <li>• Optimization: Reduce polygons while preserving detail</li>
                    <li>• CAD conversion: Mesh to STEP format (Fusion 360)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">CNC Partner Network</h3>
              <p className="text-sm text-muted mb-3">
                Establish relationships with existing CNC stone fabricators for fulfillment.
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-1">Partner Requirements</div>
                  <ul className="space-y-1 text-muted ml-4">
                    <li>• 4-axis or 5-axis CNC stone mills</li>
                    <li>• Material sourcing capabilities (limestone, sandstone)</li>
                    <li>• Quality control and finishing</li>
                    <li>• Shipping/logistics handling</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Business Model</div>
                  <ul className="space-y-1 text-muted ml-4">
                    <li>• Revenue share: 30-40% to partner for fabrication</li>
                    <li>• We provide: toolpaths, customer, marketing</li>
                    <li>• Partner provides: material, fabrication, shipping</li>
                    <li>• Quality guarantee and warranty handling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Site Updates Required</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Replace AI models with photogrammetry scans</li>
                <li>• Add detailed provenance information (site, date, photographer)</li>
                <li>• Implement lead time calculator based on partner capacity</li>
                <li>• Add material selection (limestone type, finish)</li>
                <li>• Geographic shipping calculator</li>
                <li>• Partner attribution and profiles</li>
              </ul>
            </div>

            <div className="card bg-amber-500/5 border-amber-500/20">
              <h3 className="text-lg font-semibold mb-3">Investment Required</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Polycam Pro subscription:</span>
                  <span className="font-mono">$30/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Travel to heritage sites:</span>
                  <span className="font-mono">$3,000-5,000 per trip</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Processing software:</span>
                  <span className="font-mono">$200-500/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Partner onboarding:</span>
                  <span className="font-mono">3-5 partners needed</span>
                </div>
                <div className="flex justify-between border-t border-foreground/10 pt-2">
                  <span className="text-foreground font-semibold">Total phase investment:</span>
                  <span className="font-mono font-semibold">$15,000-25,000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 3 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-foreground/30"></div>
            <h2 className="text-2xl font-bold">Phase 3: First In-House CNC Equipment</h2>
            <span className="text-sm text-muted">12-24 months</span>
          </div>

          <div className="space-y-6 ml-6 border-l-2 border-foreground/10 pl-8">
            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">Equipment Acquisition Strategy</h3>
              <p className="text-sm text-muted">
                Start with entry-level industrial CNC, validate demand, prove economics before scaling.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Equipment Options</h3>
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded border border-foreground/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-foreground">Entry Level: 3-Axis CNC Router</div>
                      <div className="text-xs text-subtle">ShopBot, Laguna, CNC-Step</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold">$25,000-50,000</div>
                      <div className="text-xs text-muted">Used market available</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted space-y-1">
                    <p><strong className="text-foreground">Pros:</strong> Low cost, proven tech, large bed (4'×8' typical)</p>
                    <p><strong className="text-foreground">Cons:</strong> Limited to 3-axis, slower, requires more manual finishing</p>
                    <p><strong className="text-foreground">Capacity:</strong> 8-12 simple pieces/month</p>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded border border-primary/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-foreground">Recommended: 5-Axis Stone Mill</div>
                      <div className="text-xs text-subtle">Intermac, Biesse, SCM (used/refurbished)</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-primary">$100,000-200,000</div>
                      <div className="text-xs text-muted">$250-400k new</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted space-y-1">
                    <p><strong className="text-foreground">Pros:</strong> Full 5-axis capability, faster, better detail, less finishing</p>
                    <p><strong className="text-foreground">Cons:</strong> Higher capital, more complex operation</p>
                    <p><strong className="text-foreground">Capacity:</strong> 30-50 complex pieces/month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Facility Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-2">Space</div>
                  <ul className="space-y-1 text-muted">
                    <li>• Minimum 2,000 sq ft</li>
                    <li>• 3-phase 220V power (50+ amps)</li>
                    <li>• Concrete slab foundation</li>
                    <li>• Dust collection system</li>
                    <li>• Material storage area</li>
                    <li>• Finishing/shipping area</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Supporting Equipment</div>
                  <ul className="space-y-1 text-muted">
                    <li>• Industrial dust collector: $10-20k</li>
                    <li>• Material handling (forklift): $15-25k</li>
                    <li>• Diamond tooling inventory: $5-10k</li>
                    <li>• Finishing tools: $3-5k</li>
                    <li>• Safety equipment: $2-3k</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Operating Costs</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Facility lease (2,000-3,000 sq ft):</span>
                  <span className="font-mono">$3,000-6,000/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Utilities (power, water):</span>
                  <span className="font-mono">$800-1,500/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Operator (skilled CNC tech):</span>
                  <span className="font-mono">$45-65k/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Material (bulk blocks):</span>
                  <span className="font-mono">$400-800/piece</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tooling replacement:</span>
                  <span className="font-mono">$500-1,000/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Insurance:</span>
                  <span className="font-mono">$300-600/month</span>
                </div>
              </div>
            </div>

            <div className="card bg-amber-500/5 border-amber-500/20">
              <h3 className="text-lg font-semibold mb-3">Total Phase Investment</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-2">One-Time Capital</div>
                  <div className="space-y-1 ml-4">
                    <div className="flex justify-between">
                      <span className="text-muted">CNC equipment (used 5-axis):</span>
                      <span className="font-mono">$100,000-200,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Supporting equipment:</span>
                      <span className="font-mono">$35,000-63,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Facility improvements:</span>
                      <span className="font-mono">$20,000-40,000</span>
                    </div>
                    <div className="flex justify-between border-t border-foreground/10 pt-1 font-semibold">
                      <span className="text-foreground">Total capital:</span>
                      <span className="font-mono">$155,000-303,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-2">Monthly Operating</div>
                  <div className="space-y-1 ml-4">
                    <div className="flex justify-between">
                      <span className="text-muted">Fixed costs:</span>
                      <span className="font-mono">$8,000-13,000/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Variable (per piece):</span>
                      <span className="font-mono">$400-1,000/piece</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">Economics After Capital Payoff</h3>
              <p className="text-sm text-muted mb-3">
                Target: 30 pieces/month at $12,000-18,000 each = $360,000-540,000/month revenue
              </p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted">Variable cost per piece:</span>
                  <span className="font-mono">$5,700 (material + machine time)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Selling price:</span>
                  <span className="font-mono">$12,000-18,000</span>
                </div>
                <div className="flex justify-between border-t border-primary/20 pt-2 font-semibold text-primary">
                  <span>Margin per piece:</span>
                  <span className="font-mono">$6,300-12,300</span>
                </div>
                <div className="flex justify-between font-semibold text-primary">
                  <span>Monthly margin (30 pieces):</span>
                  <span className="font-mono">$189,000-369,000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 4 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-foreground/30"></div>
            <h2 className="text-2xl font-bold">Phase 4: Scale Production Facility</h2>
            <span className="text-sm text-muted">24-48 months</span>
          </div>

          <div className="space-y-6 ml-6 border-l-2 border-foreground/10 pl-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Multi-Machine Production</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• <strong className="text-foreground">3-5 CNC mills:</strong> Parallel production, specialized by complexity</li>
                <li>• <strong className="text-foreground">10,000+ sq ft facility:</strong> Dedicated production zones</li>
                <li>• <strong className="text-foreground">Team of 5-8:</strong> CNC operators, finishers, logistics</li>
                <li>• <strong className="text-foreground">Capacity:</strong> 150-200 pieces/month</li>
                <li>• <strong className="text-foreground">Revenue potential:</strong> $1.8M-3.6M/month</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Process Automation</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Automated material handling and loading</li>
                <li>• Lights-out manufacturing (24/7 operation)</li>
                <li>• Automated quality inspection (vision systems)</li>
                <li>• Robotic finishing for standard operations</li>
                <li>• Integrated inventory and shipping systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Phase 5 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-foreground/30"></div>
            <h2 className="text-2xl font-bold">Phase 5: Quarry Integration</h2>
            <span className="text-sm text-muted">48+ months</span>
          </div>

          <div className="space-y-6 ml-6 border-l-2 border-foreground/10 pl-8">
            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">The Final Form</h3>
              <p className="text-sm text-muted">
                Fabrication facility adjacent to quarry. Eliminate transportation costs, access material at extraction cost.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Strategic Location</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-foreground mb-1">Primary Targets</div>
                  <ul className="space-y-1 text-muted ml-4">
                    <li>• <strong>Indiana Limestone Belt:</strong> Bloomington, IN (highest quality architectural limestone)</li>
                    <li>• <strong>Texas Hill Country:</strong> Austin area (abundant limestone, lower cost)</li>
                    <li>• <strong>Georgia Marble:</strong> Tate, GA (marble for premium elements)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Economics</div>
                  <ul className="space-y-1 text-muted ml-4">
                    <li>• Material cost: $200-400/ton vs $800-1,200/block retail</li>
                    <li>• Zero transportation from quarry to fabrication</li>
                    <li>• Direct quarry relationships for quality selection</li>
                    <li>• Access to material rejected by dimension stone market (perfect for ornament)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">Full Vertical Integration</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Material sourcing at extraction cost</li>
                <li>• In-house photogrammetry team traveling to UNESCO sites</li>
                <li>• Automated CAD/CAM pipeline</li>
                <li>• Multiple parallel production lines</li>
                <li>• Integrated shipping and logistics</li>
                <li>• Material cost: $200-400 per piece vs $400-800 retail</li>
              </ul>
            </div>

            <div className="card bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">Long-Term Economics</h3>
              <div className="text-sm space-y-3">
                <p className="text-muted">
                  At scale, with quarry integration and capital amortized, production cost approaches material cost alone.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Material (quarry direct):</span>
                    <span className="font-mono">$250-350</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Machine time (amortized):</span>
                    <span className="font-mono">$50/hour × 100h = $5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Labor (setup/finishing):</span>
                    <span className="font-mono">$200-300</span>
                  </div>
                  <div className="flex justify-between border-t border-primary/20 pt-2">
                    <span className="text-foreground font-semibold">Total cost per piece:</span>
                    <span className="font-mono font-semibold">$5,450-5,650</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary">
                    <span>Margin at $12,000 sale:</span>
                    <span className="font-mono">$6,350-6,550 (53-55%)</span>
                  </div>
                </div>
                <p className="text-muted italic pt-3 border-t border-primary/20">
                  This is the endgame: transforming $250 of abundant natural stone into $12,000 architectural elements through automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-foreground/10 pb-2">
            Investment Summary by Phase
          </h2>

          <div className="space-y-3">
            <div className="card bg-background/50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Phase 1: API Automation</div>
                  <div className="text-xs text-muted">Scale catalog, validate demand</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">$5,000-10,000</div>
                  <div className="text-xs text-muted">+ $600-1,200/month</div>
                </div>
              </div>
            </div>

            <div className="card bg-background/50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Phase 2: Real Models + Partners</div>
                  <div className="text-xs text-muted">Photogrammetry, CNC network</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">$15,000-25,000</div>
                  <div className="text-xs text-muted">+ $200-500/month</div>
                </div>
              </div>
            </div>

            <div className="card bg-primary/5 border-primary/20">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-primary">Phase 3: First CNC</div>
                  <div className="text-xs text-muted">In-house production begins</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold">$155,000-303,000</div>
                  <div className="text-xs text-muted">+ $8-13k/month operating</div>
                </div>
              </div>
            </div>

            <div className="card bg-background/50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Phase 4: Scale Production</div>
                  <div className="text-xs text-muted">3-5 machines, team of 8</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">$500,000-1,000,000</div>
                  <div className="text-xs text-muted">$1.8-3.6M/month revenue potential</div>
                </div>
              </div>
            </div>

            <div className="card bg-background/50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Phase 5: Quarry Integration</div>
                  <div className="text-xs text-muted">Full vertical integration</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">$2,000,000-5,000,000</div>
                  <div className="text-xs text-muted">Material cost approaches zero</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="border-t border-foreground/10 pt-8">
          <Link href="/about" className="btn btn-ghost">
            ← Back to About
          </Link>
        </div>
      </div>
    </div>
  )
}
