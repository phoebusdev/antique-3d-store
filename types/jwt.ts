import { z } from 'zod'

// T013: JWT download token payload interface
export const DownloadTokenSchema = z.object({
  modelId: z.string(),
  purchaseId: z.string().startsWith('pi_'), // Stripe Payment Intent ID
  customerEmail: z.string().email(),
  expiresAt: z.number().int().positive(),
  iat: z.number().int().positive(),
  downloadCount: z.number().int().min(0).max(10).default(0),
})

export type DownloadTokenPayload = z.infer<typeof DownloadTokenSchema>
