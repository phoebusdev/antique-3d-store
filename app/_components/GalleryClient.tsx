'use client'

import { useState, useMemo } from 'react'
import { AntiqueModel } from '@/types/models'
import ModelCard from '@/app/_components/ModelCard'
import ModelFilters, { FilterState } from '@/app/_components/ModelFilters'
import { Suspense } from 'react'

// T032-T035: Client-side gallery with filtering and search
interface GalleryClientProps {
  initialModels: AntiqueModel[]
}

export default function GalleryClient({ initialModels }: GalleryClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest',
    priceRange: [0, 10000],
    searchQuery: '',
  })

  const filteredModels = useMemo(() => {
    let filtered = [...initialModels]

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (model) =>
          model.name.toLowerCase().includes(query) ||
          model.era.toLowerCase().includes(query) ||
          model.provenance.toLowerCase().includes(query)
      )
    }

    // Apply price range filter
    filtered = filtered.filter(
      (model) => model.price >= filters.priceRange[0] && model.price <= filters.priceRange[1]
    )

    // Apply sorting
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'era':
        filtered.sort((a, b) => a.era.localeCompare(b.era))
        break
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        break
    }

    return filtered
  }, [initialModels, filters])

  return (
    <div>
      <ModelFilters onFilterChange={setFilters} />

      {filteredModels.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg text-muted">No models match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model) => (
            <Suspense
              key={model.id}
              fallback={
                <div className="card animate-pulse">
                  <div className="aspect-square bg-foreground/5 rounded-sm mb-4" />
                  <div className="h-6 bg-foreground/5 rounded-sm mb-2" />
                  <div className="h-4 bg-foreground/5 rounded-sm w-2/3" />
                </div>
              }
            >
              <ModelCard model={model} />
            </Suspense>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="mt-8 text-center text-sm text-muted">
        Showing {filteredModels.length} of {initialModels.length} models
      </div>
    </div>
  )
}
