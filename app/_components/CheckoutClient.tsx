'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { AntiqueModel } from '@/types/models'
import CheckoutForm from '@/app/_components/CheckoutForm'

// T052: Initialize Stripe with public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

interface CheckoutClientProps {
  model: AntiqueModel
}

export default function CheckoutClient({ model }: CheckoutClientProps) {
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>('')

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(model.price / 100)

  // T053: Create Payment Intent on mount
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            modelId: model.id,
            customerEmail: customerEmail || 'guest@example.com',
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create payment intent')
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Error creating payment intent:', err)
        setError('Unable to initialize checkout. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [model.id, customerEmail])

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => router.back()} className="btn btn-ghost">
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || !clientSecret) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted">Initializing secure checkout...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
        >
          <span>←</span> Back to Model
        </button>

        <h1 className="mb-8">Checkout</h1>

        <div className="grid gap-8">
          {/* Order summary */}
          <div className="card">
            <h2 className="text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-foreground/10">
              <div>
                <p className="font-semibold">{model.name}</p>
                <p className="text-sm text-muted">{model.era}</p>
                <p className="text-xs text-subtle mt-1">Digital Download (GLB format)</p>
              </div>
              <p className="text-xl font-semibold text-primary">{formattedPrice}</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">Subtotal</span>
              <span>{formattedPrice}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-muted">Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg mt-4 pt-4 border-t border-foreground/10">
              <span>Total</span>
              <span className="text-primary">{formattedPrice}</span>
            </div>
          </div>

          {/* Stripe payment form */}
          <div className="card">
            <h2 className="text-xl mb-6">Payment Details</h2>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#00d9ff',
                    colorBackground: '#0a0a0a',
                    colorText: '#f5f5f5',
                    colorDanger: '#ff4444',
                    fontFamily: 'Inter, sans-serif',
                    borderRadius: '2px',
                  },
                },
              }}
            >
              <CheckoutForm
                modelId={model.id}
                onEmailChange={setCustomerEmail}
              />
            </Elements>
          </div>

          {/* Security notice */}
          <div className="text-center">
            <p className="text-xs text-muted">
              🔒 Secure payment powered by Stripe. Your payment information is encrypted and never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
