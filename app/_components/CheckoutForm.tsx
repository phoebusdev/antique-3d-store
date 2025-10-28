'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

// T054: Stripe checkout form with PaymentElement
interface CheckoutFormProps {
  modelId: string
  onEmailChange?: (email: string) => void
}

export default function CheckoutForm({ modelId, onEmailChange }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    if (onEmailChange) {
      onEmailChange(newEmail)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (!email) {
      setErrorMessage('Please enter your email address')
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success?modelId=${modelId}`,
          receipt_email: email,
        },
      })

      if (error) {
        setErrorMessage(error.message || 'Payment failed. Please try again.')
        setIsProcessing(false)
      }
    } catch (err) {
      console.error('Payment error:', err)
      setErrorMessage('An unexpected error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="your@email.com"
          required
          className="input w-full"
          disabled={isProcessing}
        />
        <p className="text-xs text-muted mt-2">
          Receipt and download link will be sent to this email
        </p>
      </div>

      {/* Stripe Payment Element */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Card Details
        </label>
        <PaymentElement />
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 rounded-sm bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn btn-primary w-full"
      >
        {isProcessing ? 'Processing...' : 'Complete Order'}
      </button>

      {/* Test card info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 rounded-sm bg-foreground/5 border border-foreground/10">
          <p className="text-xs text-muted font-mono mb-2">Test Card:</p>
          <p className="text-xs text-muted font-mono">4242 4242 4242 4242</p>
          <p className="text-xs text-muted font-mono">Any future date, any CVC</p>
        </div>
      )}
    </form>
  )
}
