'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loadStripe } from '@stripe/stripe-js'
import { X, CreditCard, Loader2, Building2, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const quickCheckoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
})

type QuickCheckoutForm = z.infer<typeof quickCheckoutSchema>

interface QuickCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planDisplayName: string
  billingCycle: 'monthly' | 'yearly'
  price: number
  features?: {
    max_orders: number
    max_staff: number
    max_customers: number
    max_branches: number
  }
}

export function QuickCheckoutModal({
  isOpen,
  onClose,
  planName,
  planDisplayName,
  billingCycle,
  price,
  features
}: QuickCheckoutModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<QuickCheckoutForm>({
    resolver: zodResolver(quickCheckoutSchema)
  })

  const handleQuickCheckout = async (data: QuickCheckoutForm) => {
    setLoading(true)
    setError(null)

    try {
      // Create checkout session with customer info
      const response = await fetch(`${API_URL}/public/create-quick-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          billingCycle,
          customerInfo: data,
          successUrl: `${window.location.origin}/success?plan=${planName}`,
          cancelUrl: `${window.location.origin}/pricing?cancelled=true`,
          metadata: {
            source: 'quick_buy_modal',
            plan: planName,
            billing_cycle: billingCycle
          }
        }),
      })

      const result = await response.json()

      if (!result.success) {
        setError(result.message || 'Failed to create checkout session')
        setLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      if (result.data.url) {
        window.location.href = result.data.url
      } else {
        const stripe = await stripePromise
        if (stripe && result.data.sessionId) {
          const stripeResult = await (stripe as any).redirectToCheckout({
            sessionId: result.data.sessionId
          })

          if (stripeResult.error) {
            setError(stripeResult.error.message || 'Failed to redirect to checkout')
            setLoading(false)
          }
        }
      }
    } catch (err) {
      console.error('Quick checkout error:', err)
      setError('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  const formatLimit = (value: number) => {
    if (value === -1) return 'Unlimited'
    return value.toLocaleString()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[rgb(var(--card))] rounded-2xl p-6 w-full max-w-md border border-[rgb(var(--border))] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[rgb(var(--foreground))]">
            Quick Checkout
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[rgb(var(--muted))] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="mb-6 p-4 bg-[rgb(var(--muted))] rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[rgb(var(--foreground))]">
              {planDisplayName} Plan
            </h3>
            <span className="text-lg font-bold text-[rgb(var(--foreground))]">
              ₹{price.toLocaleString()}/{billingCycle === 'yearly' ? 'year' : 'month'}
            </span>
          </div>

          {features && (
            <div className="text-sm text-[rgb(var(--foreground-muted))] space-y-1">
              <p>• {formatLimit(features.max_orders)} orders/month</p>
              <p>• {formatLimit(features.max_staff)} staff members</p>
              <p>• {formatLimit(features.max_branches)} branches</p>
            </div>
          )}
        </div>

        {/* Quick Form */}
        <form onSubmit={handleSubmit(handleQuickCheckout)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
              <User className="h-4 w-4 inline mr-1" />
              Your Name
            </label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
              <Mail className="h-4 w-4 inline mr-1" />
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
              <Building2 className="h-4 w-4 inline mr-1" />
              Business Name
            </label>
            <input
              {...register('businessName')}
              className="w-full px-3 py-2 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your Laundry Business"
            />
            {errors.businessName && (
              <p className="text-sm text-red-600 mt-1">{errors.businessName.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ₹{price.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-center text-[rgb(var(--foreground-muted))] mt-4">
          Secure payment via Stripe • 256-bit encryption
        </p>
      </div>
    </div>
  )
}