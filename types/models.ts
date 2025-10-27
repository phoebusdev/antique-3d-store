import { z } from 'zod'

// T011: AntiqueModel interface and Zod validation schema
export const AntiqueModelSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1).max(100),
  era: z.string().min(1).max(50),
  provenance: z.string().min(1).max(500),
  dimensions: z.string().regex(/^\d+"?\s*[HWD]/, "Must start with dimensions like '38\" H'"),
  vertices: z.number().int().min(1000).max(500000),
  fileSize: z.number().int().min(1).max(10485760),
  fileUrl: z.string().regex(/^\/models\/[a-z0-9-]+\.glb$/),
  price: z.number().int().min(100).max(100000),
  published: z.boolean().default(false),
  thumbnailUrl: z.string().regex(/^\/images\/[a-z0-9-]+\.(jpg|png|webp)$/).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
})

export type AntiqueModel = z.infer<typeof AntiqueModelSchema>
