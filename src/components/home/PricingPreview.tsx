'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Building2, Rocket, Crown } from 'lucide-react'
import { Button } from '@/components/ui'
import { mockBillingPlans } from '@/lib/mockData'

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export function PricingPreview() {
  const [plans, setPlans] = useState<BillingPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      console.log('🔍 Fetching plans from:', `${API_URL}/public/billing/plans`);
      const response = await fetch(`${API_URL}/public/billing/plans`)
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json()
      console.log('✅ API Response received:', data);
      
      if (data.success && data.data?.plans) {
        // Show only first 3 plans for preview
        setPlans(data.data.plans.slice(0, 3))
        console.log('📊 Plans loaded for preview:', data.data.plans.slice(0, 3).length);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Failed to fetch plans:', error)
      console.log('🔄 Using fallback mock data...');
      // Use mock data as fallback (first 3 plans)
      setPlans(mockBillingPlans.slice(0, 3))
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

  const getKeyFeatures = (plan: BillingPlan) => {
    const features = []
    
    if (plan.features?.max_orders) {
      features.push(`${formatLimit(plan.features.max_orders)} orders/month`)
    }
    if (plan.features?.max_staff) {
      features.push(`${formatLimit(plan.features.max_staff)} staff members`)
    }
    if (plan.features?.custom_branding) {
      features.push('Custom branding')
    }
    if (plan.features?.advanced_analytics) {
      features.push('Advanced analytics')
    }
    if (plan.features?.priority_support) {
      features.push('Priority support')
    }
    
    return features.slice(0, 4) // Show max 4 features
  }

  return (
    <section className="section-padding bg-[rgb(var(--background-secondary))] transition-colors duration-300">
      <div className="container-marketing">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-sm text-[rgb(var(--foreground))] mb-4"
          >
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[rgb(var(--foreground-secondary))] max-w-2xl mx-auto"
          >
            Choose the plan that fits your business size. Start free and upgrade as you grow.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {plans.map((plan, index) => {
                const Icon = planIcons[plan.name] || Zap
                const isPopular = plan.name === 'pro'
                const keyFeatures = getKeyFeatures(plan)

                return (
                  <motion.div
                    key={plan._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      isPopular 
                        ? 'border-primary-300 dark:border-primary-600 ring-2 ring-primary-500/20 scale-105' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          ⭐ Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <Icon className={`h-6 w-6 ${isPopular ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'}`} />
                        <h3 className="text-xl font-bold text-[rgb(var(--foreground))]">{plan.displayName}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-[rgb(var(--foreground))]">
                          {formatPrice(plan.price.monthly)}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-[rgb(var(--foreground-muted))] ml-1">/month</span>
                        )}
                      </div>

                      {plan.description && (
                        <p className="text-sm text-[rgb(var(--foreground-muted))]">{plan.description}</p>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      {keyFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                          <span className="text-[rgb(var(--foreground))]">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={`/contact?plan=${plan.name}`}>
                      <Button 
                        className={`w-full ${isPopular ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700' : ''}`}
                        variant={isPopular ? 'primary' : 'outline'}
                      >
                        {plan.price.monthly === 0 ? '🚀 Start Free' : '💼 Get Started'}
                      </Button>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-[rgb(var(--foreground-muted))] mb-6">
                Need more details? Compare all features and find the perfect plan for your business.
              </p>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="group">
                  📋 View All Plans & Features
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}