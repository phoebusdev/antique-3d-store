import Stripe from 'stripe'

// T012: Stripe types and Payment Intent metadata interface
export interface PaymentIntentMetadata {
  modelId: string
  deliveryType: 'digital' | 'physical'
  fulfillmentType: 'digital_download' | 'cnc_fabrication'
  format: 'glb'
  dimensions: string
  customerEmail: string
  manufacturingRequired: string // 'false' or 'true' (Stripe metadata must be strings)
  orderId?: string
}

export type PaymentIntentResponse = {
  clientSecret: string
  amount: number
}

export type CreatePaymentIntentRequest = {
  modelId: string
  customerEmail: string
}

export type StripePaymentIntent = Stripe.PaymentIntent
export type StripeCheckoutSession = Stripe.Checkout.Session
