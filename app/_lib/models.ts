import { AntiqueModel, AntiqueModelSchema } from '@/types/models'

// T014: Hardcoded antique models for MVP
export const MODELS: AntiqueModel[] = [
  {
    id: 'victorian-desk',
    name: 'Victorian Writing Desk',
    era: '1880s Victorian England',
    provenance: 'Originally from the estate of Lord Ashworth, Surrey. Crafted by renowned cabinetmaker Thomas Brighton. Features original brass hardware and hand-tooled leather inlay.',
    dimensions: '38" H x 48" W x 24" D',
    vertices: 145000,
    fileSize: 2800000,
    fileUrl: '/models/victorian-desk.glb',
    price: 4900,
    published: true,
    thumbnailUrl: '/images/victorian-desk.jpg',
    createdAt: new Date('2025-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2025-01-15T10:00:00Z').toISOString(),
  },
  {
    id: 'art-deco-chair',
    name: 'Art Deco Armchair',
    era: '1925 French Art Deco',
    provenance: 'Designed by Jacques-Émile Ruhlmann for the 1925 Exposition Internationale. Part of a limited salon set commissioned for a Parisian apartment. Features exotic macassar ebony veneer.',
    dimensions: '32" H x 26" W x 28" D',
    vertices: 98000,
    fileSize: 1900000,
    fileUrl: '/models/art-deco-chair.glb',
    price: 3200,
    published: true,
    thumbnailUrl: '/images/art-deco-chair.jpg',
    createdAt: new Date('2025-01-16T11:30:00Z').toISOString(),
    updatedAt: new Date('2025-01-16T11:30:00Z').toISOString(),
  },
  {
    id: 'ming-vase',
    name: 'Ming Dynasty Vase',
    era: '1420-1435 Ming Dynasty',
    provenance: 'Xuande period blue-and-white porcelain. Discovered in a private collection in Guangzhou. Authentication certificate from Beijing Palace Museum. Depicts traditional dragon motif.',
    dimensions: '16" H x 8" W x 8" D',
    vertices: 210000,
    fileSize: 3500000,
    fileUrl: '/models/ming-vase.glb',
    price: 8900,
    published: true,
    thumbnailUrl: '/images/ming-vase.jpg',
    createdAt: new Date('2025-01-14T09:15:00Z').toISOString(),
    updatedAt: new Date('2025-01-14T09:15:00Z').toISOString(),
  },
  {
    id: 'baroque-mirror',
    name: 'Baroque Gilt Mirror',
    era: '1690s Italian Baroque',
    provenance: 'Venetian carved giltwood mirror from Palazzo Contarini. Original mercury glass with beveled edges. Hand-carved frame featuring acanthus leaves and cherub motifs.',
    dimensions: '52" H x 34" W x 4" D',
    vertices: 178000,
    fileSize: 3100000,
    fileUrl: '/models/baroque-mirror.glb',
    price: 5600,
    published: true,
    thumbnailUrl: '/images/baroque-mirror.jpg',
    createdAt: new Date('2025-01-17T14:20:00Z').toISOString(),
    updatedAt: new Date('2025-01-17T14:20:00Z').toISOString(),
  },
  {
    id: 'shaker-table',
    name: 'Shaker Drop-Leaf Table',
    era: '1840s American Shaker',
    provenance: 'Crafted at Mount Lebanon Shaker Community, New York. Tiger maple construction with original butterfly hinges. Exemplifies Shaker principles of simplicity and utility.',
    dimensions: '29" H x 42" W x 36" D',
    vertices: 82000,
    fileSize: 1600000,
    fileUrl: '/models/shaker-table.glb',
    price: 2800,
    published: true,
    thumbnailUrl: '/images/shaker-table.jpg',
    createdAt: new Date('2025-01-18T16:45:00Z').toISOString(),
    updatedAt: new Date('2025-01-18T16:45:00Z').toISOString(),
  },
]

// T015: Helper functions for model management
export function getAllModels(publishedOnly = true): AntiqueModel[] {
  return publishedOnly ? MODELS.filter((m) => m.published) : MODELS
}

export function getModelById(id: string): AntiqueModel | null {
  return MODELS.find((m) => m.id === id) || null
}

export function saveModel(model: AntiqueModel): void {
  const existingIndex = MODELS.findIndex((m) => m.id === model.id)

  // Validate model against schema
  AntiqueModelSchema.parse(model)

  if (existingIndex >= 0) {
    MODELS[existingIndex] = {
      ...model,
      updatedAt: new Date().toISOString(),
    }
  } else {
    MODELS.push({
      ...model,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }
}
