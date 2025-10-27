'use client'

import { useState } from 'react'

// T032: Model filtering and sorting component
interface ModelFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'era' | 'newest'
  priceRange: [number, number]
  searchQuery: string
}

export default function ModelFilters({ onFilterChange }: ModelFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest',
    priceRange: [0, 100000], // Updated to $1000 max to include all models
    searchQuery: '',
  })

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    const newFilters = { ...filters, sortBy }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSearchChange = (searchQuery: string) => {
    const newFilters = { ...filters, searchQuery }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* T033: Search input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name, era, or provenance..."
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="input w-full"
          aria-label="Search models"
        />
      </div>

      {/* Sort dropdown */}
      <div className="md:w-48">
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
          className="input w-full cursor-pointer"
          aria-label="Sort by"
        >
          <option value="newest">Newest First</option>
          <option value="name">Name A-Z</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="era">Era</option>
        </select>
      </div>
    </div>
  )
}
