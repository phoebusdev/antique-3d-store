import { getAllModels } from '@/app/_lib/models'
import GalleryClient from '@/app/_components/GalleryClient'
import Hero from '@/app/_components/Hero'

// T024: Gallery page with model grid and filtering
export default function HomePage() {
  const models = getAllModels(true) // Only published models

  return (
    <>
      <Hero />

      <div id="gallery" className="container-custom py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Digital Catalog</h2>
          <p className="text-lg text-muted max-w-3xl">
            High-resolution scans of architectural stone ornament from UNESCO heritage sites.
            Each element is CNC-ready with multiple file formats (STL, OBJ, G-code, STEP).
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
    </>
  )
}
