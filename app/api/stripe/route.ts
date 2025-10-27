import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/app/_lib/stripe'
import { getModelById } from '@/app/_lib/models'
import { PaymentIntentMetadata } from '@/types/stripe'
import { z } from 'zod'

// T055: Create Payment Intent API endpoint
const CreatePaymentIntentSchema = z.object({
  modelId: z.string(),
  customerEmail: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { modelId, customerEmail } = CreatePaymentIntentSchema.parse(body)

    // Validate model exists and is published
    const model = getModelById(modelId)
    if (!model || !model.published) {
      return NextResponse.json(
        { error: 'Model not found or not available' },
        { status: 404 }
      )
    }

    // Create metadata for fulfillment routing
    const metadata: PaymentIntentMetadata = {
      modelId: model.id,
      deliveryType: 'digital',
      fulfillmentType: 'digital_download',
      format: 'glb',
      dimensions: model.dimensions,
      customerEmail,
      manufacturingRequired: 'false',
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: model.price,
      currency: 'usd',
      metadata: metadata as unknown as Record<string, string>,
      description: `${model.name} - Digital Download`,
      receipt_email: customerEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
