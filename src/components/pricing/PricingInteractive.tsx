'use client'

import { useState } from 'react'
import { PricingSlider } from './PricingSlider'
import { FeatureComparison } from './FeatureComparison'

interface BillingPlan {
  _id: string
  name: string
  displayName: string
  description?: string
  price: { monthly: number; yearly: number }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any
  isPopular?: boolean
  badge?: string
}

export function PricingInteractive({ plans }: { plans: BillingPlan[] }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <>
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center rounded-full bg-[rgb(var(--muted))] p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                : 'text-[rgb(var(--foreground-muted))] hover:text-[rgb(var(--foreground))]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              billingCycle === 'yearly'
                ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                : 'text-[rgb(var(--foreground-muted))] hover:text-[rgb(var(--foreground))]'
            }`}
          >
            Yearly
            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
              Save up to 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="mb-12">
        <PricingSlider plans={plans} billingCycle={billingCycle} />
      </div>

      {/* Feature Comparison Table */}
      <div className="mb-12">
        <FeatureComparison plans={plans} billingCycle={billingCycle} />
      </div>
    </>
  )
}
