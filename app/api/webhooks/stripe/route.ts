import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/app/_lib/stripe'
import { generateDownloadToken } from '@/app/_lib/jwt'
import { PaymentIntentMetadata } from '@/types/stripe'
import Stripe from 'stripe'

// T056: Stripe webhook handler for payment fulfillment
export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSuccess(paymentIntent)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook event:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const metadata = paymentIntent.metadata as unknown as PaymentIntentMetadata

  console.log('Payment succeeded:', {
    paymentIntentId: paymentIntent.id,
    modelId: metadata.modelId,
    customerEmail: metadata.customerEmail,
    amount: paymentIntent.amount,
  })

  // T057: Generate download token
  const downloadToken = generateDownloadToken({
    modelId: metadata.modelId,
    purchaseId: paymentIntent.id,
    customerEmail: metadata.customerEmail,
    downloadCount: 0,
  })

  // T058: Send email with download link (MVP: log to console)
  const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/download/${metadata.modelId}?token=${downloadToken}`

  console.log('Download link generated:', {
    customerEmail: metadata.customerEmail,
    downloadUrl,
    expiresIn: '24 hours',
  })

  // TODO: Send email via SendGrid/Resend
  // await sendDownloadEmail({
  //   to: metadata.customerEmail,
  //   modelName: metadata.modelId,
  //   downloadUrl,
  // })

  // TODO: Store purchase record in database
  // await db.purchases.create({
  //   paymentIntentId: paymentIntent.id,
  //   modelId: metadata.modelId,
  //   customerEmail: metadata.customerEmail,
  //   amount: paymentIntent.amount,
  //   downloadToken,
  //   createdAt: new Date(),
  // })
}
