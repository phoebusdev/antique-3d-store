import { getAllModels } from '@/app/_lib/models'
import GalleryClient from '@/app/_components/GalleryClient'

// T024: Gallery page with model grid and filtering
export default function HomePage() {
  const models = getAllModels(true) // Only published models

  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="mb-4">Historical Antique Collection</h1>
        <p className="text-lg text-muted max-w-3xl">
          Museum-quality 3D models of authentic historical furniture. Each piece is meticulously scanned and optimized for both digital visualization and CNC fabrication.
        </p>
      </div>

      {models.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-muted">No models available at this time.</p>
        </div>
      ) : (
        <GalleryClient initialModels={models} />
      )}
    </div>
  )
}
