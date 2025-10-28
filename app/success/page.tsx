'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getModelById } from '@/app/_lib/models'
import { AntiqueModel } from '@/types/models'

// T060: Success page component with download instructions
function SuccessPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [model, setModel] = useState<AntiqueModel | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string>('')

  useEffect(() => {
    const modelId = searchParams.get('modelId')
    const piId = searchParams.get('payment_intent')

    if (!modelId) {
      router.push('/')
      return
    }

    const foundModel = getModelById(modelId)
    if (!foundModel) {
      router.push('/')
      return
    }

    setModel(foundModel)
    setPaymentIntentId(piId || '')
  }, [searchParams, router])

  if (!model) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="mb-4">Order Confirmed</h1>
          <p className="text-lg text-muted">
            Thank you for your purchase. Your digital files are ready for download.
          </p>
        </div>

        {/* Order details */}
        <div className="card mb-8">
          <h2 className="text-xl mb-4">Order Details</h2>
          <div className="space-y-3 pb-4 border-b border-foreground/10">
            <div className="flex justify-between">
              <span className="text-muted">Element</span>
              <span className="font-medium">{model.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Format</span>
              <span className="font-mono text-sm">GLB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">File Size</span>
              <span className="font-mono text-sm">
                {(model.fileSize / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
            {paymentIntentId && (
              <div className="flex justify-between">
                <span className="text-muted">Transaction ID</span>
                <span className="font-mono text-xs">{paymentIntentId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Download instructions */}
        <div className="card mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-xl mb-4">Next Steps</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="font-medium mb-1">Check your email</p>
                <p className="text-sm text-muted">
                  We've sent a download link to your email address. The link is valid for 24 hours.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="font-medium mb-1">Download your files</p>
                <p className="text-sm text-muted">
                  Click the download link in the email. You have 10 downloads available.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="font-medium mb-1">Use your files</p>
                <p className="text-sm text-muted">
                  Import the GLB file into your 3D software, visualization tool, or send to CNC fabrication.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Support information */}
        <div className="card mb-8">
          <h2 className="text-xl mb-4">Need Assistance?</h2>
          <p className="text-sm text-muted mb-4">
            If you don't receive the email within 10 minutes, please check your spam folder or contact support.
          </p>
          <div className="flex gap-4">
            <a href="mailto:support@antique3d.com" className="text-sm text-primary hover:underline">
              support@antique3d.com
            </a>
            <span className="text-muted">•</span>
            <span className="text-sm text-muted">Monday-Friday, 9am-5pm EST</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn btn-primary flex-1">
            Browse More Elements
          </Link>
          <Link href={`/model/${model.id}`} className="btn btn-ghost flex-1">
            View Element Details
          </Link>
        </div>

        {/* Receipt notice */}
        <p className="text-xs text-center text-muted mt-8">
          A receipt has been sent to your email address
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  )
}
