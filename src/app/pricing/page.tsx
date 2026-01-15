'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, X, Zap, Building2, Rocket, Crown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { VideoHero } from '@/components/shared'

interface BillingPlan {
  _id: string
  name: string
  displayName: string
  description?: string
  price: {
    monthly: number
    yearly: number
  }
  features: {
    max_orders: number
    max_staff: number
    max_customers: number
    max_branches: number
    custom_domain: boolean
    advanced_analytics: boolean
    api_access: boolean
    white_label: boolean
    priority_support: boolean
    custom_branding: boolean
  }
}

const planIcons: Record<string, typeof Zap> = {
  free: Zap,
  basic: Building2,
  pro: Rocket,
  enterprise: Crown
}

const planColors: Record<string, { bg: string; border: string; badge: string }> = {
  free: { 
    bg: 'bg-neutral-50 dark:bg-neutral-800/50', 
    border: 'border-neutral-200 dark:border-neutral-700',
    badge: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
  },
  basic: { 
    bg: 'bg-blue-50 dark:bg-blue-900/20', 
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
  },
  pro: { 
    bg: 'bg-purple-50 dark:bg-purple-900/20', 
    border: 'border-purple-300 dark:border-purple-700',
    badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
  },
  enterprise: { 
    bg: 'bg-amber-50 dark:bg-amber-900/20', 
    border: 'border-amber-300 dark:border-amber-700',
    badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function PricingPage() {
  const [plans, setPlans] = useState<BillingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/public/billing/plans`)
      const data = await response.json()
      if (data.success) {
        setPlans(data.data.plans)
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (amount: number) => {
    if (amount === 0) return 'Free'
    if (amount === -1) return 'Custom'
    return `₹${amount.toLocaleString()}`
  }

  const formatLimit = (value: number | undefined) => {
    if (value === undefined || value === null) return '0'
    if (value === -1) return 'Unlimited'
    return value.toLocaleString()
  }

  const getYearlySavings = (plan: BillingPlan) => {
    if (plan.price.monthly === 0 || plan.price.yearly === 0) return 0
    return Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100)
  }

  const getGridClass = () => {
    const count = plans.length
    if (count === 1) return 'grid grid-cols-1 justify-items-center max-w-sm mx-auto'
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 justify-items-center max-w-2xl mx-auto'
    if (count === 3) return 'grid grid-cols-1 md:grid-cols-3 justify-items-center max-w-4xl mx-auto'
    if (count === 4) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center'
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center'
  }

  return (
    <>
      <VideoHero
        videoSrc="/videos/hero-bg.mp4"
        videoPoster="/videos/hero-poster.jpg"
        size="sm"
        title={
          <>
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </>
        }
        subtitle="Choose the plan that fits your business. No hidden fees, cancel anytime."
      />

      <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center rounded-full bg-[rgb(var(--muted))] p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                    : 'text-[rgb(var(--foreground-muted))] hover:text-[rgb(var(--foreground))]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                    : 'text-[rgb(var(--foreground-muted))] hover:text-[rgb(var(--foreground))]'
                }`}
              >
                Yearly
                <span className="text-xs bg-secondary-100 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-300 px-2 py-0.5 rounded-full">
                  Save up to 20%
                </span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className={`${getGridClass()} gap-6`}>
              {plans.map((plan, index) => {
                const Icon = planIcons[plan.name] || Zap
                const colors = planColors[plan.name] || planColors.free
                const isPopular = plan.name === 'pro'
                const savings = getYearlySavings(plan)

                return (
                  <motion.div
                    key={plan._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 flex flex-col transition-colors duration-300 w-full max-w-[300px] ${
                      isPopular ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary-600 dark:bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.badge} mb-4`}>
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{plan.displayName}</span>
                      </div>
                      
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-[rgb(var(--foreground))]">
                          {formatPrice(billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly)}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-[rgb(var(--foreground-muted))] ml-1">
                            /{billingCycle === 'yearly' ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      
                      {billingCycle === 'yearly' && savings > 0 && (
                        <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                          Save {savings}% with yearly billing
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 mb-6 pb-6 border-b border-[rgb(var(--border))]">
                      <LimitRow label="Orders/month" value={formatLimit(plan.features?.max_orders)} />
                      <LimitRow label="Staff members" value={formatLimit(plan.features?.max_staff)} />
                      <LimitRow label="Customers" value={formatLimit(plan.features?.max_customers)} />
                      <LimitRow label="Branches" value={formatLimit(plan.features?.max_branches)} />
                    </div>

                    <div className="space-y-3 flex-1">
                      <FeatureRow label="Custom Branding" enabled={plan.features?.custom_branding ?? false} />
                      <FeatureRow label="Custom Domain" enabled={plan.features?.custom_domain ?? false} />
                      <FeatureRow label="Advanced Analytics" enabled={plan.features?.advanced_analytics ?? false} />
                      <FeatureRow label="API Access" enabled={plan.features?.api_access ?? false} />
                      <FeatureRow label="White Label" enabled={plan.features?.white_label ?? false} />
                      <FeatureRow label="Priority Support" enabled={plan.features?.priority_support ?? false} />
                    </div>

                    <Link href={`/signup/${plan._id}?cycle=${billingCycle}`} className="mt-6">
                      <Button 
                        className="w-full" 
                        variant={isPopular ? 'primary' : 'outline'}
                      >
                        {plan.price.monthly === 0 ? 'Get Started Free' : 'Buy Now'}
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-[rgb(var(--foreground-secondary))]">
              Need a custom plan for your enterprise?{' '}
              <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[rgb(var(--background-secondary))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-sm text-[rgb(var(--foreground))]">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--foreground-secondary))]">
              Start with a free demo and see how LaundryLobby can transform your business.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function LimitRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[rgb(var(--foreground-muted))]">{label}</span>
      <span className="font-medium text-[rgb(var(--foreground))]">{value}</span>
    </div>
  )
}

function FeatureRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {enabled ? (
        <Check className="h-4 w-4 text-secondary-500 dark:text-secondary-400 flex-shrink-0" />
      ) : (
        <X className="h-4 w-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0" />
      )}
      <span className={enabled ? 'text-[rgb(var(--foreground))]' : 'text-[rgb(var(--foreground-muted))]'}>
        {label}
      </span>
    </div>
  )
}
