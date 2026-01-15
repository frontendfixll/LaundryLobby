'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Building2, User, Mail, Phone, Lock, MapPin, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui'

interface BillingPlan {
  _id: string
  name: string
  displayName: string
  description?: string
  price: {
    monthly: number
    yearly: number
  }
  features: Record<string, boolean | number>
  trialDays?: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function SignupPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = params.planId as string
  const cancelled = searchParams.get('cancelled')

  const [plan, setPlan] = useState<BillingPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      line1: '',
      city: '',
      state: '',
      pincode: ''
    }
  })

  useEffect(() => {
    fetchPlan()
  }, [planId])

  const fetchPlan = async () => {
    try {
      const response = await fetch(`${API_URL}/public/billing/plans`)
      const data = await response.json()
      if (data.success) {
        const foundPlan = data.data.plans.find((p: BillingPlan) => p._id === planId)
        if (foundPlan) {
          setPlan(foundPlan)
        } else {
          setError('Plan not found')
        }
      }
    } catch (err) {
      setError('Failed to load plan details')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
    if (!formData.businessName.trim()) return 'Business name is required'
    if (!formData.ownerName.trim()) return 'Owner name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Please enter a valid email'
    if (!formData.phone.trim()) return 'Phone number is required'
    if (formData.phone.length < 10) return 'Please enter a valid phone number'
    if (!formData.password) return 'Password is required'
    if (formData.password.length < 8) return 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/public/signup/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          ownerName: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
          planId: planId,
          billingCycle
        })
      })

      const data = await response.json()

      if (data.success) {
        // For free plans, redirect to success page directly
        if (data.data.loginUrl) {
          router.push(`/signup/success?free=true&email=${encodeURIComponent(formData.email)}`)
        } else {
          // Redirect to Stripe checkout
          window.location.href = data.data.checkoutUrl
        }
      } else {
        setError(data.message || 'Failed to create account')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatPrice = (amount: number) => {
    if (amount === 0) return 'Free'
    return `₹${amount.toLocaleString()}`
  }

  const calculateTotal = () => {
    if (!plan) return { subtotal: 0, tax: 0, total: 0 }
    const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly
    const tax = Math.round(price * 0.18)
    return { subtotal: price, tax, total: price + tax }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--background))]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--background))] p-4">
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-4">Plan Not Found</h1>
        <p className="text-[rgb(var(--foreground-muted))] mb-6">The selected plan could not be found.</p>
        <Link href="/pricing">
          <Button>View All Plans</Button>
        </Link>
      </div>
    )
  }

  const pricing = calculateTotal()

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/pricing" className="inline-flex items-center text-[rgb(var(--foreground-muted))] hover:text-[rgb(var(--foreground))] mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pricing
        </Link>

        {cancelled && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            Payment was cancelled. You can try again when you&apos;re ready.
          </div>
        )}

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3"
          >
            <div className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-6 md:p-8">
              <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
                Create Your Account
              </h1>
              <p className="text-[rgb(var(--foreground-muted))] mb-6">
                Get started with the {plan.displayName} plan
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Business Info */}
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Your Laundry Business Name"
                      className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Owner Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                      Owner Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Your Full Name"
                        className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Min 8 characters"
                        className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                        className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1">
                    Business Address (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-[rgb(var(--foreground-muted))]" />
                    <input
                      type="text"
                      name="address.line1"
                      value={formData.address.line1}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                      className="w-full px-4 py-3 border border-[rgb(var(--border))] rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full py-3"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : pricing.total === 0 ? (
                    'Create Free Account'
                  ) : (
                    `Continue to Payment - ${formatPrice(pricing.total)}`
                  )}
                </Button>

                <p className="text-xs text-center text-[rgb(var(--foreground-muted))]">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <div className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
                Order Summary
              </h2>

              {/* Plan Info */}
              <div className="p-4 bg-[rgb(var(--muted))] rounded-lg mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-[rgb(var(--foreground))]">{plan.displayName} Plan</h3>
                    <p className="text-sm text-[rgb(var(--foreground-muted))]">{plan.description}</p>
                  </div>
                </div>
              </div>

              {/* Billing Cycle Toggle */}
              {plan.price.monthly > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                    Billing Cycle
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        billingCycle === 'monthly'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-[rgb(var(--border))] text-[rgb(var(--foreground-muted))]'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('yearly')}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        billingCycle === 'yearly'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-[rgb(var(--border))] text-[rgb(var(--foreground-muted))]'
                      }`}
                    >
                      Yearly
                      {plan.price.yearly < plan.price.monthly * 12 && (
                        <span className="block text-xs text-green-600">
                          Save {Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100)}%
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-[rgb(var(--border))]">
                <div className="flex justify-between text-sm">
                  <span className="text-[rgb(var(--foreground-muted))]">Subtotal</span>
                  <span className="text-[rgb(var(--foreground))]">{formatPrice(pricing.subtotal)}</span>
                </div>
                {pricing.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[rgb(var(--foreground-muted))]">GST (18%)</span>
                    <span className="text-[rgb(var(--foreground))]">{formatPrice(pricing.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold pt-2 border-t border-[rgb(var(--border))]">
                  <span className="text-[rgb(var(--foreground))]">Total</span>
                  <span className="text-[rgb(var(--foreground))]">
                    {formatPrice(pricing.total)}
                    {pricing.total > 0 && (
                      <span className="text-sm font-normal text-[rgb(var(--foreground-muted))]">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Trial Info */}
              {plan.trialDays && plan.trialDays > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">{plan.trialDays}-day free trial included</span>
                  </div>
                </div>
              )}

              {/* Features Preview */}
              <div className="mt-4 pt-4 border-t border-[rgb(var(--border))]">
                <h4 className="text-sm font-medium text-[rgb(var(--foreground))] mb-2">Includes:</h4>
                <ul className="space-y-1 text-sm text-[rgb(var(--foreground-muted))]">
                  {plan.features.wash_fold && <li className="flex items-center gap-2"><Check className="h-3 w-3 text-green-500" /> Wash & Fold</li>}
                  {plan.features.dry_cleaning && <li className="flex items-center gap-2"><Check className="h-3 w-3 text-green-500" /> Dry Cleaning</li>}
                  {plan.features.campaigns && <li className="flex items-center gap-2"><Check className="h-3 w-3 text-green-500" /> Campaigns</li>}
                  {plan.features.loyalty_points && <li className="flex items-center gap-2"><Check className="h-3 w-3 text-green-500" /> Loyalty Points</li>}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
