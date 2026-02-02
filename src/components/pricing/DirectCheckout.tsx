'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui'
import { CreditCard, Loader2 } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

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
  planDisplayName, 
  billingCycle, 
  price, 
  isPopular = false,
  className = ""
}: DirectCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDirectCheckout = async () => {
    if (price === 0) {
      // For free plans, redirect to signup
      window.location.href = `/signup?plan=${planName}`
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create direct checkout session
      const response = await fetch(`${API_URL}/public/create-direct-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          billingCycle,
          successUrl: `${window.location.origin}/success?plan=${planName}`,
          cancelUrl: `${window.location.origin}/pricing?cancelled=true`,
          metadata: {
            source: 'direct_buy_now',
            plan: planName,
            billing_cycle: billingCycle
          }
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.message || 'Failed to create checkout session')
        setLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      if (data.data.url) {
        window.location.href = data.data.url
      } else {
        // Fallback to Stripe.js redirect
        const stripe = await stripePromise
        if (stripe && data.data.sessionId) {
          const result = await stripe.redirectToCheckout({
            sessionId: data.data.sessionId
          })
          
          if (result.error) {
            setError(result.error.message || 'Failed to redirect to checkout')
            setLoading(false)
          }
        }
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleDirectCheckout}
        disabled={loading}
        className={`w-full ${isPopular ? 'bg-gradient-to-r from-purple-400 to-purple-600 hover:shadow-lg' : ''} ${className}`}
        variant={isPopular ? 'primary' : 'outline'}
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {price === 0 ? (
              '🚀 Start Free'
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                💳 Buy Now - ₹{price.toLocaleString()}
              </>
            )}
          </>
        )}
      </Button>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
      
      {price > 0 && (
        <p className="text-xs text-center text-[rgb(var(--foreground-muted))]">
          Secure payment via Stripe • Cancel anytime
        </p>
      )}
    </div>
  )
}