import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getModelById } from '@/app/_lib/models'
import CheckoutClient from '@/app/_components/CheckoutClient'

// T051: Checkout page with Stripe Elements
interface Props {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'Checkout | Antique 3D Store',
  description: 'Complete your purchase securely with Stripe',
}

export default function CheckoutPage({ params }: Props) {
  const model = getModelById(params.id)

  if (!model || !model.published) {
    notFound()
  }

  return <CheckoutClient model={model} />
}
