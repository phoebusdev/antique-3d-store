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
          <h2 className="text-2xl font-bold mb-4">Element Catalog</h2>
          <p className="text-lg text-muted max-w-3xl">
            High-resolution digital scans of architectural stone elements from UNESCO World Heritage sites.
            Each piece is CNC-ready, CAD-editable, and scalable. Applicable to building projects at any scale—from custom residential work to commercial developments and civic infrastructure. Volume pricing available for orders of 10+ pieces.
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
