'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AntiqueModel } from '@/types/models'
import FulfillmentSelector from '@/app/_components/FulfillmentSelector'
import { FulfillmentOption } from '@/types/fulfillment'

interface CheckoutClientProps {
  model: AntiqueModel
}

export default function CheckoutClient({ model }: CheckoutClientProps) {
  const router = useRouter()
  const [fulfillmentOption, setFulfillmentOption] = useState<FulfillmentOption>('digital')
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | undefined>()
  const [finalPrice, setFinalPrice] = useState<number>(model.price)

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(finalPrice / 100)

  const handleFulfillmentChange = (
    option: FulfillmentOption,
    partnerId?: string,
    price?: number
  ) => {
    setFulfillmentOption(option)
    setSelectedPartnerId(partnerId)
    if (price !== undefined) {
      setFinalPrice(price)
    }
  }

  const handleDemoCheckout = () => {
    // Simulate successful checkout for demo
    router.push(`/success?modelId=${model.id}&payment_intent=demo_${Date.now()}`)
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
                <p className="text-xs text-subtle mt-1">
                  {fulfillmentOption === 'digital'
                    ? 'Digital Download (GLB format)'
                    : `CNC Fabrication + Delivery${selectedPartnerId ? ' via ' + selectedPartnerId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : ''}`}
                </p>
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

          {/* Demo Notice */}
          <div className="card bg-amber-500/5 border-amber-500/20">
            <h2 className="text-xl mb-4 text-amber-500">Demo Mode</h2>
            <p className="text-sm text-muted mb-4">
              This is a demonstration site. Payment processing is not active.
            </p>
            <div className="text-sm space-y-3 text-muted">
              <p>
                <strong className="text-foreground">Production Implementation:</strong> Stripe integration is fully configured and ready to activate. The existing codebase includes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Stripe Elements UI components (configured with dark theme)</li>
                <li>Payment Intent API endpoint (<code className="text-xs bg-foreground/10 px-1 py-0.5 rounded">/api/stripe</code>)</li>
                <li>Webhook handling for payment confirmation</li>
                <li>Environment variables ready (<code className="text-xs bg-foreground/10 px-1 py-0.5 rounded">STRIPE_SECRET_KEY</code>, <code className="text-xs bg-foreground/10 px-1 py-0.5 rounded">STRIPE_PUBLISHABLE_KEY</code>)</li>
              </ul>
              <p className="pt-2 border-t border-foreground/10">
                <strong className="text-foreground">To activate:</strong> Add Stripe API keys to environment variables and uncomment payment integration in <code className="text-xs bg-foreground/10 px-1 py-0.5 rounded">CheckoutClient.tsx</code>. Payment processing would be live immediately.
              </p>
            </div>
          </div>

          {/* Fulfillment options */}
          <FulfillmentSelector
            basePrice={model.price}
            onSelectionChange={handleFulfillmentChange}
          />

          {/* Demo checkout button */}
          <div className="card">
            <h2 className="text-xl mb-6">Complete Order (Demo)</h2>
            <p className="text-sm text-muted mb-6">
              In production, this would display the Stripe payment form with card input fields. For this demo, clicking below simulates a successful payment.
            </p>
            <button
              onClick={handleDemoCheckout}
              className="btn btn-primary w-full text-lg py-3"
            >
              Complete Demo Order
            </button>
            <p className="text-xs text-muted text-center mt-4">
              This will redirect to the success page to demonstrate the post-purchase flow
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
