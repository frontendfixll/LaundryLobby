'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, CreditCard, AlertCircle, Clock, CheckCircle2, Shield, Loader2 } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface PaymentLinkData {
  token: string
  status: 'pending' | 'paid' | 'expired' | 'cancelled'
  plan: {
    name: string
    displayName: string
    features?: {
      maxOrders: number
      maxStaff: number
      maxCustomers: number
      maxBranches: number
    }
  }
  billingCycle: 'monthly' | 'yearly'
  amount: {
    subtotal: number
    tax: number
    discount: number
    total: number
  }
  currency: string
  expiresAt: string
  lead: {
    name: string
    email: string
    businessName: string
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = params.token as string
  const cancelled = searchParams.get('cancelled')

  const [paymentData, setPaymentData] = useState<PaymentLinkData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchPaymentDetails()
  }, [token])

  useEffect(() => {
    if (cancelled) {
      setError('Payment was cancelled. You can try again.')
    }
  }, [cancelled])

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/public/pay/${token}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentData(data.data)
      } else {
        setError(data.message || 'Payment link not found')
      }
    } catch (err) {
      setError('Failed to load payment details')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!paymentData || paymentData.status !== 'pending') return

    setProcessing(true)
    setError(null)

    try {
      // Create Stripe Checkout Session
      const response = await fetch(`${API_URL}/public/pay/${token}/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await response.json()
      
      if (!data.success) {
        setError(data.message || 'Failed to create checkout session')
        setProcessing(false)
        return
      }

      // Redirect to Stripe Checkout URL directly (preferred method)
      if (data.data.url) {
        window.location.href = data.data.url
        return
      }

      // Fallback: Use Stripe.js redirectToCheckout
      const stripe = await stripePromise
      if (stripe && data.data.sessionId) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.data.sessionId
        })
        
        if (stripeError) {
          setError(stripeError.message || 'Failed to redirect to checkout')
          setProcessing(false)
        }
      } else {
        setError('Stripe not loaded. Please refresh and try again.')
        setProcessing(false)
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError('Payment processing failed. Please try again.')
      setProcessing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatLimit = (value: number) => {
    if (value === -1) return 'Unlimited'
    return value.toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error && !paymentData) {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
            Payment Link Invalid
          </h1>
          <p className="text-[rgb(var(--foreground-muted))] mb-6">{error}</p>
          <Button onClick={() => router.push('/contact')}>
            Contact Support
          </Button>
        </div>
      </div>
    )
  }

  if (paymentData?.status === 'paid') {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
            Already Paid
          </h1>
          <p className="text-[rgb(var(--foreground-muted))]">
            This payment has already been completed.
          </p>
        </div>
      </div>
    )
  }

  if (paymentData?.status === 'expired') {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
            Link Expired
          </h1>
          <p className="text-[rgb(var(--foreground-muted))] mb-6">
            This payment link has expired. Please contact our team for a new link.
          </p>
          <Button onClick={() => router.push('/contact')}>
            Contact Us
          </Button>
        </div>
      </div>
    )
  }

  if (paymentData?.status === 'cancelled') {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
            Link Cancelled
          </h1>
          <p className="text-[rgb(var(--foreground-muted))] mb-6">
            This payment link has been cancelled. Please contact our team if you need assistance.
          </p>
          <Button onClick={() => router.push('/contact')}>
            Contact Us
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] py-12 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[rgb(var(--card))] rounded-2xl p-6 border border-[rgb(var(--border))] shadow-lg"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
              Complete Your Payment
            </h1>
            <p className="text-[rgb(var(--foreground-muted))] mt-1">
              Secure payment powered by Stripe
            </p>
          </div>

          {/* Business Info */}
          <div className="mb-6 pb-6 border-b border-[rgb(var(--border))]">
            <p className="text-sm text-[rgb(var(--foreground-muted))]">Billing to</p>
            <p className="font-medium text-[rgb(var(--foreground))]">{paymentData?.lead.businessName}</p>
            <p className="text-sm text-[rgb(var(--foreground-secondary))]">{paymentData?.lead.email}</p>
          </div>

          {/* Plan Details */}
          <div className="mb-6 pb-6 border-b border-[rgb(var(--border))]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-medium text-[rgb(var(--foreground))]">
                  {paymentData?.plan.displayName} Plan
                </p>
                <p className="text-sm text-[rgb(var(--foreground-muted))]">
                  {paymentData?.billingCycle === 'yearly' ? 'Annual' : 'Monthly'} billing
                </p>
              </div>
              <p className="font-medium text-[rgb(var(--foreground))]">
                {formatCurrency(paymentData?.amount.subtotal || 0)}
              </p>
            </div>

            {paymentData?.plan.features && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[rgb(var(--foreground-secondary))]">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{formatLimit(paymentData.plan.features.maxOrders)} orders/month</span>
                </div>
                <div className="flex items-center gap-2 text-[rgb(var(--foreground-secondary))]">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{formatLimit(paymentData.plan.features.maxStaff)} staff members</span>
                </div>
                <div className="flex items-center gap-2 text-[rgb(var(--foreground-secondary))]">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{formatLimit(paymentData.plan.features.maxBranches)} branches</span>
                </div>
              </div>
            )}
          </div>

          {/* Amount Breakdown */}
          <div className="space-y-2 text-sm mb-6">
            <div className="flex justify-between text-[rgb(var(--foreground-secondary))]">
              <span>Subtotal</span>
              <span>{formatCurrency(paymentData?.amount.subtotal || 0)}</span>
            </div>
            {(paymentData?.amount.discount || 0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(paymentData?.amount.discount || 0)}</span>
              </div>
            )}
            <div className="flex justify-between text-[rgb(var(--foreground-secondary))]">
              <span>GST (18%)</span>
              <span>{formatCurrency(paymentData?.amount.tax || 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-[rgb(var(--foreground))] pt-2 border-t border-[rgb(var(--border))]">
              <span>Total</span>
              <span>{formatCurrency(paymentData?.amount.total || 0)}</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Pay Button */}
          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full"
            size="lg"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Redirecting to Stripe...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay {formatCurrency(paymentData?.amount.total || 0)}
              </>
            )}
          </Button>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[rgb(var(--foreground-muted))]">
            <Shield className="h-4 w-4" />
            <span>Secured by Stripe • 256-bit encryption</span>
          </div>

          {/* Test Mode Notice */}
          {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test') && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
                <strong>Test Mode:</strong> Use card 4242 4242 4242 4242, any future date, any CVC
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
