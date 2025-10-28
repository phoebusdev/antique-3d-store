'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AntiqueModel } from '@/types/models'
import ModelViewer from '@/app/_components/ModelViewer'
import ErrorBoundary from '@/app/_components/ErrorBoundary'

// T037: Model detail client component with purchase flow
interface ModelDetailClientProps {
  model: AntiqueModel
}

export default function ModelDetailClient({ model }: ModelDetailClientProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(model.price / 100)

  const formattedFileSize = (model.fileSize / 1024 / 1024).toFixed(1)
  const formattedVertices = new Intl.NumberFormat('en-US').format(model.vertices)

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      // Store model info for checkout page
      sessionStorage.setItem('checkoutModel', JSON.stringify(model))
      router.push(`/checkout/${model.id}`)
    } catch (error) {
      console.error('Error initiating checkout:', error)
      alert('Unable to proceed to checkout. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="container-custom py-12">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-8 text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
      >
        <span>←</span> Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* T038: Full 3D viewer */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="aspect-square bg-background rounded-sm border border-foreground/10 overflow-hidden">
            <ErrorBoundary
              fallback={
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted">Unable to load 3D viewer</p>
                </div>
              }
            >
              <ModelViewer modelUrl={model.fileUrl} />
            </ErrorBoundary>
          </div>
          <p className="text-xs text-muted mt-4 text-center">
            Click and drag to rotate • Scroll to zoom • Right-click to pan
          </p>
        </div>

        {/* T039: Model information and purchase */}
        <div className="space-y-8">
          <div>
            <h1 className="mb-2">{model.name}</h1>
            <p className="text-lg text-primary font-mono">{model.era}</p>
          </div>

          {/* T040: Price and purchase button */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-semibold text-primary">{formattedPrice}</span>
              <span className="text-sm text-muted">One-time purchase</span>
            </div>
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? 'Processing...' : 'Purchase Element'}
            </button>
            <p className="text-xs text-muted mt-4 text-center">
              Secure payment processing by Stripe
            </p>
          </div>

          {/* T041: Provenance */}
          <div>
            <h2 className="text-xl mb-3">Provenance</h2>
            <p className="text-muted leading-relaxed">{model.provenance}</p>
          </div>

          {/* T042: Technical specifications */}
          <div>
            <h2 className="text-xl mb-4">Technical Specifications</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-subtle mb-1">Dimensions</dt>
                <dd className="font-mono text-sm">{model.dimensions}</dd>
              </div>
              <div>
                <dt className="text-sm text-subtle mb-1">Format</dt>
                <dd className="font-mono text-sm">GLB (binary glTF)</dd>
              </div>
              <div>
                <dt className="text-sm text-subtle mb-1">Vertices</dt>
                <dd className="font-mono text-sm">{formattedVertices}</dd>
              </div>
              <div>
                <dt className="text-sm text-subtle mb-1">File Size</dt>
                <dd className="font-mono text-sm">{formattedFileSize} MB</dd>
              </div>
            </dl>
          </div>

          {/* T043: What's included */}
          <div>
            <h2 className="text-xl mb-4">What's Included</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted">High-resolution 3D model in GLB format</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted">Optimized for web viewing and 3D printing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted">CNC-ready geometry with accurate scaling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted">Permanent download access (10 downloads)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted">Commercial use license included</span>
              </li>
            </ul>
          </div>

          {/* T044: Usage rights */}
          <div className="card bg-foreground/5">
            <h3 className="text-sm font-semibold mb-2">License & Usage Rights</h3>
            <p className="text-sm text-muted">
              This model is licensed for personal and commercial use. You may use it for 3D printing,
              CNC fabrication, digital visualization, or as reference material. Redistribution of the
              digital files is not permitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
