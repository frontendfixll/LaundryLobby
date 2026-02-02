'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, X, Zap, Building2, Rocket, Crown, Star } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { DirectCheckout } from './DirectCheckout'
import { QuickCheckoutModal } from './QuickCheckoutModal'

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

interface PricingSliderProps {
  plans: BillingPlan[]
  billingCycle: 'monthly' | 'yearly'
}

const planIcons: Record<string, typeof Zap> = {
  free: Zap,
  basic: Building2,
  pro: Rocket,
  enterprise: Crown
}

const planColors: Record<string, { bg: string; border: string; badge: string; gradient: string }> = {
  free: {
    bg: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    border: 'border-gray-200 dark:border-gray-700',
    badge: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    gradient: 'from-gray-400 to-gray-600'
  },
  basic: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    gradient: 'from-blue-400 to-blue-600'
  },
  pro: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    border: 'border-purple-300 dark:border-purple-700',
    badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
    gradient: 'from-purple-400 to-purple-600'
  },
  enterprise: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
    border: 'border-amber-300 dark:border-amber-700',
    badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
    gradient: 'from-amber-400 to-amber-600'
  }
}

export function PricingSlider({ plans, billingCycle }: PricingSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showQuickModal, setShowQuickModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Filter and sort plans in correct order: free, basic, pro, enterprise
  const sortedPlans = [...plans]
    .filter(plan => ['free', 'basic', 'pro', 'enterprise'].includes(plan.name.toLowerCase()))
    .sort((a, b) => {
      const order = { free: 0, basic: 1, pro: 2, enterprise: 3 }
      const aName = a.name.toLowerCase() as keyof typeof order
      const bName = b.name.toLowerCase() as keyof typeof order
      return (order[aName] || 999) - (order[bName] || 999)
    })

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

  const handleQuickBuy = (plan: BillingPlan) => {
    setSelectedPlan(plan)
    setShowQuickModal(true)
  }

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
    if (scrollRef.current) {
      const cardWidth = 320 // Card width + gap
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const newIndex = Math.min(sortedPlans.length - 1, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  // Show all plans in a single row for desktop, slider for mobile
  const showAsSlider = sortedPlans.length > 4

  return (
    <div className="relative">
      {/* Navigation Arrows - only show if needed */}
      {showAsSlider && (
        <>
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all lg:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            disabled={currentIndex >= sortedPlans.length - 3}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all lg:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Plans Display */}
      <div className={`${showAsSlider ? 'lg:grid lg:grid-cols-4 lg:gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
        <div
          ref={scrollRef}
          className={`${showAsSlider ? 'flex gap-6 overflow-x-auto scrollbar-hide pb-4 lg:contents' : 'contents'}`}
          style={showAsSlider ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
        >
          {sortedPlans.map((plan, index) => {
            const Icon = planIcons[plan.name.toLowerCase()] || Zap
            const colors = planColors[plan.name.toLowerCase()] || planColors.free
            const isPopular = plan.isPopular || plan.name.toLowerCase() === 'pro'
            const savings = getYearlySavings(plan)

            return (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 flex flex-col transition-all duration-300 ${showAsSlider ? 'min-w-[300px] max-w-[300px] lg:min-w-0 lg:max-w-none' : ''} hover:shadow-xl hover:scale-105 ${isPopular ? 'ring-2 ring-primary-500 dark:ring-primary-400 transform scale-105' : ''
                  }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className={`bg-gradient-to-r ${colors.gradient} text-white text-xs font-medium px-4 py-1 rounded-full flex items-center gap-1`}>
                      <Star className="h-3 w-3 fill-current" />
                      {plan.badge || 'Most Popular'}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.badge} mb-4`}>
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{plan.displayName}</span>
                  </div>

                  {plan.description && (
                    <p className="text-sm text-[rgb(var(--foreground-muted))] mb-4">{plan.description}</p>
                  )}

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
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
                      💰 Save {savings}% with yearly billing
                    </p>
                  )}
                </div>

                {/* Limits Section */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[rgb(var(--border))]">
                  <h4 className="font-semibold text-sm text-[rgb(var(--foreground))] mb-3">� Usage Limits</h4>
                  <LimitRow label="Orders/month" value={formatLimit(plan.features?.max_orders)} />
                  <LimitRow label="Staff members" value={formatLimit(plan.features?.max_staff)} />
                  <LimitRow label="Customers" value={formatLimit(plan.features?.max_customers)} />
                  <LimitRow label="Branches" value={formatLimit(plan.features?.max_branches)} />
                </div>

                {/* Core Features */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[rgb(var(--border))]">
                  <h4 className="font-semibold text-sm text-[rgb(var(--foreground))] mb-3">🚀 Core Features</h4>
                  <FeatureRow label="Order Management" enabled={true} />
                  <FeatureRow label="Customer Database" enabled={true} />
                  <FeatureRow label="Basic Reports" enabled={true} />
                  <FeatureRow label="Mobile App" enabled={plan.features?.mobile_app ?? false} />
                </div>

                {/* Advanced Features */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[rgb(var(--border))]">
                  <h4 className="font-semibold text-sm text-[rgb(var(--foreground))] mb-3">⭐ Advanced Features</h4>
                  <FeatureRow label="Custom Branding" enabled={plan.features?.custom_branding ?? false} />
                  <FeatureRow label="Custom Domain" enabled={plan.features?.custom_domain ?? false} />
                  <FeatureRow label="Advanced Analytics" enabled={plan.features?.advanced_analytics ?? false} />
                  <FeatureRow label="API Access" enabled={plan.features?.api_access ?? false} />
                  <FeatureRow label="White Label" enabled={plan.features?.white_label ?? false} />
                </div>

                {/* Marketing Features */}
                <div className="space-y-3 mb-6 pb-6 border-b border-[rgb(var(--border))]">
                  <h4 className="font-semibold text-sm text-[rgb(var(--foreground))] mb-3">� Marketing & Growth</h4>
                  <FeatureRow label="Campaigns" enabled={plan.features?.campaigns ?? false} />
                  <FeatureRow label="Loyalty Program" enabled={plan.features?.loyalty_points ?? false} />
                  <FeatureRow label="SMS Notifications" enabled={plan.features?.sms_notifications ?? false} />
                  <FeatureRow label="Email Marketing" enabled={plan.features?.email_marketing ?? false} />
                </div>

                {/* Support & Integration */}
                <div className="space-y-3 flex-1 mb-6">
                  <h4 className="font-semibold text-sm text-[rgb(var(--foreground))] mb-3">🛠️ Support & Integration</h4>
                  <FeatureRow label="Priority Support" enabled={plan.features?.priority_support ?? false} />
                  <FeatureRow label="POS Integration" enabled={plan.features?.pos_integration ?? false} />
                  <FeatureRow label="Accounting Integration" enabled={plan.features?.accounting_integration ?? false} />
                  <FeatureRow label="Multi-location" enabled={plan.features?.multi_location ?? false} />
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mt-auto">
                  {/* Direct Checkout Button */}
                  <DirectCheckout
                    planName={plan.name}
                    planDisplayName={plan.displayName}
                    billingCycle={billingCycle}
                    price={billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                    isPopular={isPopular}
                  />
                  
                  {/* Alternative: Contact Sales for paid plans */}
                  {plan.price.monthly > 0 && (
                    <Link href={`/contact?plan=${plan.name}`} className="block">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Or contact sales
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Dots Indicator - only show for mobile slider */}
      {showAsSlider && (
        <div className="flex justify-center mt-6 gap-2 lg:hidden">
          {Array.from({ length: Math.max(1, sortedPlans.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                  ? 'bg-primary-600 w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      )}

      {/* Quick Checkout Modal */}
      {selectedPlan && (
        <QuickCheckoutModal
          isOpen={showQuickModal}
          onClose={() => setShowQuickModal(false)}
          planName={selectedPlan.name}
          planDisplayName={selectedPlan.displayName}
          billingCycle={billingCycle}
          price={billingCycle === 'yearly' ? selectedPlan.price.yearly : selectedPlan.price.monthly}
          features={selectedPlan.features}
        />
      )}
    </div>
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
        <Check className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
      ) : (
        <X className="h-4 w-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
      )}
      <span className={enabled ? 'text-[rgb(var(--foreground))]' : 'text-[rgb(var(--foreground-muted))] line-through'}>
        {label}
      </span>
    </div>
  )
}