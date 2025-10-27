import { AntiqueModel, AntiqueModelSchema } from '@/types/models'

// T014: Hardcoded antique models for MVP
export const MODELS: AntiqueModel[] = [
  {
    id: 'madonna-and-child',
    name: 'Madonna and Child',
    era: 'Renaissance Italy 15th Century',
    provenance: 'Carved marble relief depicting the Virgin Mary and infant Jesus. Attributed to a workshop in Florence during the height of the Renaissance. Features classical drapery and serene facial expressions characteristic of the period.',
    dimensions: '24" H x 18" W x 6" D',
    vertices: 250000,
    fileSize: 15000000,
    fileUrl: '/models/Madonna_and_Child_wit_1027185650_generate.glb',
    price: 12900,
    published: true,
    thumbnailUrl: '/images/madonna-and-child.jpg',
    createdAt: new Date('2025-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2025-01-15T10:00:00Z').toISOString(),
  },
  {
    id: 'religious-marble-relief',
    name: 'Religious Marble Relief',
    era: 'Gothic Period 14th Century',
    provenance: 'Elaborate marble relief panel from a medieval cathedral in Northern France. Features intricate Gothic architectural elements and religious iconography. Recovered during 19th century cathedral restoration.',
    dimensions: '36" H x 28" W x 8" D',
    vertices: 320000,
    fileSize: 18000000,
    fileUrl: '/models/Religious_Marble_Reli_1027183744_generate.glb',
    price: 15600,
    published: true,
    thumbnailUrl: '/images/religious-marble-relief.jpg',
    createdAt: new Date('2025-01-16T11:30:00Z').toISOString(),
    updatedAt: new Date('2025-01-16T11:30:00Z').toISOString(),
  },
  {
    id: 'statue-of-grace',
    name: 'Statue of Grace',
    era: 'Baroque Period 17th Century',
    provenance: 'Marble sculpture from a private chapel in Rome. Depicts an angel with flowing robes and outstretched wings. Exhibits the dramatic movement and emotional intensity characteristic of Baroque sculpture.',
    dimensions: '48" H x 22" W x 20" D',
    vertices: 280000,
    fileSize: 16000000,
    fileUrl: '/models/Statue_of_Grace_1027181656_generate.glb',
    price: 18900,
    published: true,
    thumbnailUrl: '/images/statue-of-grace.jpg',
    createdAt: new Date('2025-01-14T09:15:00Z').toISOString(),
    updatedAt: new Date('2025-01-14T09:15:00Z').toISOString(),
  },
  {
    id: 'medieval-knight',
    name: 'Statue of a Medieval Knight',
    era: 'Medieval Period 13th Century',
    provenance: 'Stone effigy of a crusader knight from a Gothic cathedral in England. Features period-accurate armor and heraldic details. Originally part of a tomb monument for a noble family.',
    dimensions: '72" H x 24" W x 18" D',
    vertices: 180000,
    fileSize: 9700000,
    fileUrl: '/models/Statue_of_a_Medieval__1027180930_generate.glb',
    price: 9800,
    published: true,
    thumbnailUrl: '/images/medieval-knight.jpg',
    createdAt: new Date('2025-01-17T14:20:00Z').toISOString(),
    updatedAt: new Date('2025-01-17T14:20:00Z').toISOString(),
  },
  {
    id: 'warriors-majesty',
    name: "Warrior's Majesty",
    era: 'Classical Roman 2nd Century AD',
    provenance: 'Marble statue of a Roman military commander discovered in archaeological excavations near Pompeii. Depicts the subject in ceremonial armor with detailed musculature and commanding pose typical of Roman imperial portraiture.',
    dimensions: '66" H x 28" W x 24" D',
    vertices: 220000,
    fileSize: 12000000,
    fileUrl: '/models/Warrior_s_Majesty_1027191655_generate.glb',
    price: 14500,
    published: true,
    thumbnailUrl: '/images/warriors-majesty.jpg',
    createdAt: new Date('2025-01-18T16:45:00Z').toISOString(),
    updatedAt: new Date('2025-01-18T16:45:00Z').toISOString(),
  },
  {
    id: 'classical-relief-panel',
    name: 'Classical Relief Panel',
    era: 'Hellenistic Period 3rd Century BC',
    provenance: 'Marble relief panel from a Greek temple in Asia Minor. Features intricate acanthus leaf patterns and mythological scenes. Part of the frieze decoration from the Temple of Athena. Museum catalog DP317611.',
    dimensions: '42" H x 36" W x 6" D',
    vertices: 190000,
    fileSize: 8500000,
    fileUrl: '/models/DP317611_jpg_1027234314_generate.glb',
    price: 11200,
    published: true,
    thumbnailUrl: '/images/classical-relief-panel.jpg',
    createdAt: new Date('2025-01-19T09:00:00Z').toISOString(),
    updatedAt: new Date('2025-01-19T09:00:00Z').toISOString(),
  },
  {
    id: 'ancient-funerary-stele',
    name: 'Ancient Funerary Stele',
    era: 'Archaic Greek 6th Century BC',
    provenance: 'Limestone funerary monument from Athens depicting a standing warrior figure. Features archaic smile and detailed armor rendition typical of early Greek sculpture. Metropolitan Museum catalog DP_18129.',
    dimensions: '54" H x 20" W x 10" D',
    vertices: 210000,
    fileSize: 9400000,
    fileUrl: '/models/DP_18129_001_jpg_1027234238_generate.glb',
    price: 16800,
    published: true,
    thumbnailUrl: '/images/ancient-funerary-stele.jpg',
    createdAt: new Date('2025-01-19T10:30:00Z').toISOString(),
    updatedAt: new Date('2025-01-19T10:30:00Z').toISOString(),
  },
  {
    id: 'baroque-architectural-element',
    name: 'Baroque Architectural Element',
    era: 'Italian Baroque 18th Century',
    provenance: 'Ornate marble architectural fragment from Palazzo Barberini in Rome. Features elaborate scrollwork, cherub heads, and floral motifs characteristic of late Baroque decoration. Catalog reference CDI47-101-23.',
    dimensions: '48" H x 32" W x 12" D',
    vertices: 280000,
    fileSize: 16000000,
    fileUrl: '/models/cdi47_101_23_jpg_1027234110_generate.glb',
    price: 13900,
    published: true,
    thumbnailUrl: '/images/baroque-architectural-element.jpg',
    createdAt: new Date('2025-01-19T11:15:00Z').toISOString(),
    updatedAt: new Date('2025-01-19T11:15:00Z').toISOString(),
  },
  {
    id: 'architectural-frieze',
    name: 'Architectural Frieze Fragment',
    era: 'Roman Imperial 1st Century AD',
    provenance: 'Marble frieze section from a Roman public building, likely a forum or basilica. Depicts processional scene with toga-clad figures and ceremonial objects. Exhibits fine detail work and classical proportions.',
    dimensions: '30" H x 60" W x 8" D',
    vertices: 160000,
    fileSize: 6100000,
    fileUrl: '/models/frieze_1_jpg_1027234347_generate.glb',
    price: 10500,
    published: true,
    thumbnailUrl: '/images/architectural-frieze.jpg',
    createdAt: new Date('2025-01-19T12:00:00Z').toISOString(),
    updatedAt: new Date('2025-01-19T12:00:00Z').toISOString(),
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
