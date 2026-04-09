'use client'

import { Button } from '@/components/ui'
import { CreditCard, Rocket } from 'lucide-react'
import Link from 'next/link'

interface DirectCheckoutProps {
  planName: string
  planDisplayName: string
  billingCycle: 'monthly' | 'yearly'
  price: number
  isPopular?: boolean
  className?: string
}

export function DirectCheckout({
  planName,
  billingCycle,
  price,
  isPopular = false,
  className = ""
}: DirectCheckoutProps) {
  const isFree = price === 0

  // For free plans → /signup/free (direct account creation)
  // For paid plans → /signup/[planName] (signup form → Stripe → account creation)
  const signupUrl = isFree
    ? `/signup/free`
    : `/signup/${planName}?billing=${billingCycle}`

  return (
    <div className="space-y-2">
      <Link href={signupUrl} className="block">
        <Button
          className={`w-full ${isPopular ? 'bg-gradient-to-r from-purple-400 to-purple-600 hover:shadow-lg' : ''} ${className}`}
          variant={isPopular ? 'primary' : 'outline'}
          size="lg"
        >
          {isFree ? (
            <>
              <Rocket className="h-4 w-4 mr-2" />
              Start Free
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Get Started - ₹{price.toLocaleString()}/{billingCycle === 'yearly' ? 'yr' : 'mo'}
            </>
          )}
        </Button>
      </Link>

      {price > 0 && (
        <p className="text-xs text-center text-[rgb(var(--foreground-muted))]">
          Secure payment via Stripe • Cancel anytime
        </p>
      )}
    </div>
  )
}
