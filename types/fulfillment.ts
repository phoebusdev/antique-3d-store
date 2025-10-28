// CNC stone carving fulfillment partners (mock data for demo)
export interface FulfillmentPartner {
  id: string
  name: string
  location: string
  materials: string[]
  leadTime: string
  priceMultiplier: number
  equipment: string
}

export const FULFILLMENT_PARTNERS: FulfillmentPartner[] = [
  {
    id: 'precision-stone-works',
    name: 'Precision Stone Works',
    location: 'Texas, USA',
    materials: ['Texas Limestone', 'Oklahoma Sandstone'],
    leadTime: '6-8 weeks',
    priceMultiplier: 3.2,
    equipment: '5-axis CNC, finishing by hand',
  },
  {
    id: 'heritage-carving',
    name: 'Heritage Carving Co.',
    location: 'Carrara, Italy',
    materials: ['Carrara Marble', 'Travertine'],
    leadTime: '10-12 weeks',
    priceMultiplier: 4.5,
    equipment: '5-axis CNC, traditional finishing',
  },
  {
    id: 'stone-artisan-cnc',
    name: 'Stone Artisan CNC',
    location: 'Vermont, USA',
    materials: ['Vermont Marble', 'Canadian Limestone'],
    leadTime: '8-10 weeks',
    priceMultiplier: 3.8,
    equipment: '6-axis robotic mill',
  },
  {
    id: 'direct-quarry',
    name: 'Direct Quarry Fabrication',
    location: 'Indiana, USA',
    materials: ['Indiana Limestone (buff, grey)'],
    leadTime: '5-7 weeks',
    priceMultiplier: 2.9,
    equipment: '4-axis CNC, bulk production',
  },
]

export type FulfillmentOption = 'digital' | 'fabrication'

export interface FulfillmentSelection {
  option: FulfillmentOption
  partnerId?: string
}
