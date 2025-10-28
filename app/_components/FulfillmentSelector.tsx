'use client'

import { useState } from 'react'
import {
  FULFILLMENT_PARTNERS,
  FulfillmentOption,
  FulfillmentPartner,
} from '@/types/fulfillment'

interface FulfillmentSelectorProps {
  basePrice: number
  onSelectionChange: (option: FulfillmentOption, partnerId?: string, finalPrice?: number) => void
}

export default function FulfillmentSelector({
  basePrice,
  onSelectionChange,
}: FulfillmentSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<FulfillmentOption>('digital')
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | undefined>()

  const handleOptionChange = (option: FulfillmentOption) => {
    setSelectedOption(option)
    if (option === 'digital') {
      setSelectedPartnerId(undefined)
      onSelectionChange('digital', undefined, basePrice)
    } else {
      // Reset partner selection when switching to fabrication
      setSelectedPartnerId(undefined)
      onSelectionChange('fabrication', undefined, basePrice)
    }
  }

  const handlePartnerChange = (partnerId: string) => {
    setSelectedPartnerId(partnerId)
    const partner = FULFILLMENT_PARTNERS.find((p) => p.id === partnerId)
    if (partner) {
      const finalPrice = Math.round(basePrice * partner.priceMultiplier)
      onSelectionChange('fabrication', partnerId, finalPrice)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  const selectedPartner = selectedPartnerId
    ? FULFILLMENT_PARTNERS.find((p) => p.id === selectedPartnerId)
    : null

  return (
    <div className="card">
      <h2 className="text-xl mb-6">Fulfillment Options</h2>

      <div className="text-sm text-muted mb-6 p-3 bg-primary/5 border border-primary/20 rounded">
        <strong className="text-foreground">For project-scale orders (50+ pieces):</strong> Contact directly for volume pricing and production scheduling.
      </div>

      <div className="space-y-4">
        {/* Option A: Digital Files Only */}
        <label
          className={`block p-4 border-2 rounded cursor-pointer transition-colors ${
            selectedOption === 'digital'
              ? 'border-primary bg-primary/5'
              : 'border-foreground/10 hover:border-foreground/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="fulfillment"
              value="digital"
              checked={selectedOption === 'digital'}
              onChange={() => handleOptionChange('digital')}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold mb-1">Option A: Digital Files Only</div>
              <div className="text-sm text-muted space-y-1">
                <p>For architects/developers with existing CNC relationships</p>
                <p className="font-mono text-xs">
                  Full toolpath library: 3-axis, 4-axis, 5-axis G-code
                </p>
                <p className="font-mono text-xs">
                  CAD-editable: STEP format, scale/adapt as needed
                </p>
                <p className="text-subtle">Acquire toolpaths immediately after order</p>
              </div>
              <div className="mt-2 text-lg font-semibold text-primary">
                {formatPrice(basePrice)}
              </div>
            </div>
          </div>
        </label>

        {/* Option B: Fabrication + Delivery */}
        <label
          className={`block p-4 border-2 rounded cursor-pointer transition-colors ${
            selectedOption === 'fabrication'
              ? 'border-primary bg-primary/5'
              : 'border-foreground/10 hover:border-foreground/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="fulfillment"
              value="fabrication"
              checked={selectedOption === 'fabrication'}
              onChange={() => handleOptionChange('fabrication')}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="font-semibold mb-1">Option B: CNC Partner Network</div>
              <div className="text-sm text-muted mb-3">
                Full-service fabrication partners: material sourcing, CNC fabrication, delivery
              </div>

              {/* Partner selection - only shown when fabrication is selected */}
              {selectedOption === 'fabrication' && (
                <div className="space-y-3 ml-0 mt-4">
                  {FULFILLMENT_PARTNERS.map((partner) => {
                    const partnerPrice = Math.round(basePrice * partner.priceMultiplier)
                    return (
                      <label
                        key={partner.id}
                        className={`block p-3 border rounded cursor-pointer transition-colors ${
                          selectedPartnerId === partner.id
                            ? 'border-primary/50 bg-primary/10'
                            : 'border-foreground/10 hover:border-foreground/20'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            name="partner"
                            value={partner.id}
                            checked={selectedPartnerId === partner.id}
                            onChange={() => handlePartnerChange(partner.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <div className="font-semibold">{partner.name}</div>
                                <div className="text-xs text-muted">{partner.location}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-mono font-semibold">
                                  {formatPrice(partnerPrice)}
                                </div>
                                <div className="text-xs text-subtle">
                                  {partner.priceMultiplier}× base
                                </div>
                              </div>
                            </div>
                            <div className="text-xs space-y-1 text-muted">
                              <div>
                                <span className="text-subtle">Materials:</span>{' '}
                                {partner.materials.join(', ')}
                              </div>
                              <div>
                                <span className="text-subtle">Lead time:</span> {partner.leadTime}
                              </div>
                              <div>
                                <span className="text-subtle">Equipment:</span> {partner.equipment}
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    )
                  })}

                  <div className="text-xs text-subtle italic mt-3 p-3 bg-background/50 rounded border border-foreground/10">
                    Note: Fulfillment partnerships are in development. This is a demo interface.
                  </div>
                </div>
              )}
            </div>
          </div>
        </label>
      </div>

      {/* Summary */}
      {selectedOption === 'fabrication' && selectedPartner && (
        <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Selected partner:</span>
              <span className="font-semibold">{selectedPartner.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Estimated delivery:</span>
              <span className="font-semibold">{selectedPartner.leadTime}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-primary/30">
              <span className="text-muted">Total price:</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(Math.round(basePrice * selectedPartner.priceMultiplier))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
