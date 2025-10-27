'use client'

import Link from 'next/link'
import { AntiqueModel } from '@/types/models'
import ModelPreview from '@/app/_components/ModelPreview'

// T025: ModelCard component with 3D preview
interface ModelCardProps {
  model: AntiqueModel
}

export default function ModelCard({ model }: ModelCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(model.price / 100)

  const formattedFileSize = (model.fileSize / 1024 / 1024).toFixed(1)
  const formattedVertices = new Intl.NumberFormat('en-US').format(model.vertices)

  return (
    <Link href={`/model/${model.id}`} className="group">
      <article className="card hover:border-primary/50 transition-all duration-300">
        {/* T026: 3D preview */}
        <div className="aspect-square bg-background rounded-sm mb-4 overflow-hidden border border-foreground/10">
          <ModelPreview modelUrl={model.fileUrl} />
        </div>

        {/* Model information */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              {model.name}
            </h3>
            <p className="text-sm text-muted">{model.era}</p>
          </div>

          {/* T027: Price display */}
          <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
            <span className="text-2xl font-semibold text-primary">{formattedPrice}</span>
            <span className="text-sm text-subtle">Digital Download</span>
          </div>

          {/* T028: Model metadata */}
          <div className="grid grid-cols-3 gap-2 text-xs text-muted pt-2">
            <div>
              <div className="text-subtle">Vertices</div>
              <div className="font-mono">{formattedVertices}</div>
            </div>
            <div>
              <div className="text-subtle">File Size</div>
              <div className="font-mono">{formattedFileSize} MB</div>
            </div>
            <div>
              <div className="text-subtle">Format</div>
              <div className="font-mono">GLB</div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
