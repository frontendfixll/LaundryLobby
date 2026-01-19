'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Users, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui'
import { VideoHero } from '@/components/shared'
import { PricingSlider, FeatureComparison } from '@/components/pricing'
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
    campaigns: boolean
    loyalty_points: boolean
    inventory_management: boolean
    multi_location: boolean
    custom_reports: boolean
    mobile_app: boolean
    sms_notifications: boolean
    email_marketing: boolean
    pos_integration: boolean
    accounting_integration: boolean
  }
  isPopular?: boolean
  badge?: string
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
      console.log('🔍 Fetching plans from:', `${API_URL}/public/billing/plans`);
      const response = await fetch(`${API_URL}/public/billing/plans`)
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json()
      console.log('✅ API Response received:', data);
      
      if (data.success && data.data?.plans) {
        // Sort plans in correct order and mark popular
        const sortedPlans = data.data.plans
          .map((plan: BillingPlan) => ({
            ...plan,
            isPopular: plan.name === 'pro',
            badge: plan.name === 'pro' ? 'Most Popular' : plan.name === 'enterprise' ? 'Best Value' : undefined
          }))
          .sort((a: BillingPlan, b: BillingPlan) => {
            const order = { free: 0, basic: 1, pro: 2, enterprise: 3 }
            return (order[a.name as keyof typeof order] || 999) - (order[b.name as keyof typeof order] || 999)
          })
        
        setPlans(sortedPlans)
        console.log('📊 Plans loaded and sorted:', sortedPlans.length);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('❌ Failed to fetch plans:', error)
      console.log('🔄 Using fallback mock data...');
      // Sort mock data as well
      const sortedMockPlans = [...mockBillingPlans].sort((a, b) => {
        const order = { free: 0, basic: 1, pro: 2, enterprise: 3 }
        return (order[a.name as keyof typeof order] || 999) - (order[b.name as keyof typeof order] || 999)
      })
      setPlans(sortedMockPlans)
    } finally {
      setLoading(false)
    }
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

      {/* Billing Cycle Toggle */}
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
                <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
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
            <>
              {/* Pricing Slider */}
              <div className="mb-16">
                <PricingSlider plans={plans} billingCycle={billingCycle} />
              </div>

              {/* What's Included Section */}
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
                    🎯 What's Included in Every Plan
                  </h2>
                  <p className="text-lg text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
                    All plans include our core laundry management features. Higher plans unlock advanced capabilities.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FeatureCard
                    icon="🏪"
                    title="Order Management"
                    description="Complete order tracking from pickup to delivery"
                    included="All Plans"
                  />
                  <FeatureCard
                    icon="👥"
                    title="Customer Database"
                    description="Manage customer information and preferences"
                    included="All Plans"
                  />
                  <FeatureCard
                    icon="📱"
                    title="Mobile Access"
                    description="Access your dashboard from any device"
                    included="All Plans"
                  />
                  <FeatureCard
                    icon="🔒"
                    title="Secure & Reliable"
                    description="Bank-level security with 99.9% uptime"
                    included="All Plans"
                  />
                </div>
              </div>

              {/* Feature Comparison Table */}
              <div className="mb-16">
                <FeatureComparison plans={plans} billingCycle={billingCycle} />
              </div>
            </>
          )}

          {/* Business Benefits */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
                🚀 Why Choose LaundryLobby?
              </h2>
              <p className="text-lg text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
                Join thousands of laundry businesses that have transformed their operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BenefitCard
                icon={<TrendingUp className="h-8 w-8 text-green-500" />}
                title="Increase Revenue"
                description="Average 30% revenue increase in first 6 months"
                stat="30% ↗️"
              />
              <BenefitCard
                icon={<Users className="h-8 w-8 text-blue-500" />}
                title="Happy Customers"
                description="Improve customer satisfaction with better service"
                stat="95% 😊"
              />
              <BenefitCard
                icon={<Sparkles className="h-8 w-8 text-purple-500" />}
                title="Save Time"
                description="Automate routine tasks and focus on growth"
                stat="5hrs/day ⏰"
              />
              <BenefitCard
                icon={<Shield className="h-8 w-8 text-amber-500" />}
                title="Reduce Errors"
                description="Minimize mistakes with automated processes"
                stat="90% ✅"
              />
            </div>
          </div>

          {/* Enterprise Section */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-4">
                🏢 Need a Custom Enterprise Solution?
              </h3>
              <p className="text-[rgb(var(--foreground-muted))] mb-6 max-w-2xl mx-auto">
                For large chains, franchises, or businesses with unique requirements, we offer custom enterprise solutions with dedicated support, custom integrations, and flexible pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact?plan=enterprise">
                  <Button size="lg" className="bg-gradient-to-r from-primary-600 to-secondary-600">
                    💼 Contact Sales
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline">
                    📋 View All Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[rgb(var(--background-secondary))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-sm text-[rgb(var(--foreground))]">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--foreground-secondary))]">
              Start with a free demo and see how LaundryLobby can transform your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="group">
                  🚀 Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact?plan=free">
                <Button size="lg" variant="outline">
                  💡 Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, title, description, included }: {
  icon: string
  title: string
  description: string
  included: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2">{title}</h3>
      <p className="text-sm text-[rgb(var(--foreground-muted))] mb-3">{description}</p>
      <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
        {included}
      </span>
    </div>
  )
}

function BenefitCard({ icon, title, description, stat }: {
  icon: React.ReactNode
  title: string
  description: string
  stat: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2">{title}</h3>
      <p className="text-sm text-[rgb(var(--foreground-muted))] mb-3">{description}</p>
      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{stat}</div>
    </div>
  )
}
