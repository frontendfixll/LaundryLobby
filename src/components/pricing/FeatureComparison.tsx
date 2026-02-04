'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui'

interface BillingPlan {
  _id: string
  name: string
  displayName: string
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
}

interface FeatureComparisonProps {
  plans: BillingPlan[]
  billingCycle: 'monthly' | 'yearly'
}

interface FeatureCategory {
  name: string
  icon: string
  features: {
    key: string
    name: string
    description: string
    type: 'boolean' | 'limit'
  }[]
}

const featureCategories: FeatureCategory[] = [
  {
    name: 'Usage Limits',
    icon: '📊',
    features: [
      { key: 'max_orders', name: 'Orders per month', description: 'Maximum number of orders you can process monthly', type: 'limit' },
      { key: 'max_staff', name: 'Staff members', description: 'Number of staff accounts you can create', type: 'limit' },
      { key: 'max_customers', name: 'Customer database', description: 'Maximum customers in your database', type: 'limit' },
      { key: 'max_branches', name: 'Branch locations', description: 'Number of physical locations you can manage', type: 'limit' },
    ]
  },
  {
    name: 'Core Features',
    icon: '🚀',
    features: [
      { key: 'mobile_app', name: 'Mobile App', description: 'Dedicated mobile app for customers and staff', type: 'boolean' },
      { key: 'inventory_management', name: 'Inventory Management', description: 'Track supplies, chemicals, and equipment', type: 'boolean' },
      { key: 'multi_location', name: 'Multi-location Support', description: 'Manage multiple branches from one dashboard', type: 'boolean' },
      { key: 'custom_reports', name: 'Custom Reports', description: 'Create personalized business reports', type: 'boolean' },
    ]
  },
  {
    name: 'Branding & Customization',
    icon: '🎨',
    features: [
      { key: 'custom_branding', name: 'Custom Branding', description: 'Add your logo and brand colors', type: 'boolean' },
      { key: 'custom_domain', name: 'Custom Domain', description: 'Use your own domain (e.g., yourlaundry.com)', type: 'boolean' },
      { key: 'white_label', name: 'White Label Solution', description: 'Remove LaundryLobby branding completely', type: 'boolean' },
    ]
  },
  {
    name: 'Marketing & Growth',
    icon: '📢',
    features: [
      { key: 'campaigns', name: 'Marketing Campaigns', description: 'Create and manage promotional campaigns', type: 'boolean' },
      { key: 'loyalty_points', name: 'Loyalty Program', description: 'Reward customers with points and discounts', type: 'boolean' },
      { key: 'sms_notifications', name: 'SMS Notifications', description: 'Send automated SMS updates to customers', type: 'boolean' },
      { key: 'email_marketing', name: 'Email Marketing', description: 'Send newsletters and promotional emails', type: 'boolean' },
    ]
  },
  {
    name: 'Analytics & Reporting',
    icon: '📈',
    features: [
      { key: 'advanced_analytics', name: 'Advanced Analytics', description: 'Detailed business insights and trends', type: 'boolean' },
      { key: 'api_access', name: 'API Access', description: 'Integrate with third-party tools and services', type: 'boolean' },
    ]
  },
  {
    name: 'Integrations & Support',
    icon: '🛠️',
    features: [
      { key: 'pos_integration', name: 'POS Integration', description: 'Connect with point-of-sale systems', type: 'boolean' },
      { key: 'accounting_integration', name: 'Accounting Integration', description: 'Sync with QuickBooks, Tally, etc.', type: 'boolean' },
      { key: 'priority_support', name: 'Priority Support', description: '24/7 priority customer support', type: 'boolean' },
    ]
  }
]

export function FeatureComparison({ plans, billingCycle }: FeatureComparisonProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Usage Limits'])
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyHeaderRef = useRef<HTMLDivElement>(null)

  // Sort plans in correct order and filter out unwanted plans
  const sortedPlans = [...plans]
    .filter(plan => ['free', 'basic', 'pro', 'enterprise'].includes(plan.name.toLowerCase()))
    .sort((a, b) => {
      const order = { free: 0, basic: 1, pro: 2, enterprise: 3 }
      const aName = a.name.toLowerCase() as keyof typeof order
      const bName = b.name.toLowerCase() as keyof typeof order
      return (order[aName] || 999) - (order[bName] || 999)
    })

  // Sticky header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && containerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        
        // Try to detect the page header height dynamically
        const pageHeader = document.querySelector('header') || document.querySelector('nav') || document.querySelector('.header')
        const pageHeaderHeight = pageHeader ? pageHeader.getBoundingClientRect().height : 80
        
        // Check if header has scrolled past the page header
        const shouldStick = headerRect.top <= pageHeaderHeight && containerRect.bottom > pageHeaderHeight + 100
        setIsHeaderSticky(shouldStick)
        
        // Update sticky header position dynamically
        if (shouldStick && stickyHeaderRef.current) {
          stickyHeaderRef.current.style.top = `${pageHeaderHeight}px`
        }
      }
    }

    // Add throttling for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    // Also run once on mount to set initial state
    handleScroll()
    
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    )
  }

  const formatLimit = (value: number | undefined) => {
    if (value === undefined || value === null) return '0'
    if (value === -1) return 'Unlimited'
    return value.toLocaleString()
  }

  const formatPrice = (amount: number) => {
    if (amount === 0) return 'Free'
    if (amount === -1) return 'Custom'
    return `₹${amount.toLocaleString()}`
  }

  const getFeatureValue = (plan: BillingPlan, featureKey: string, type: 'boolean' | 'limit') => {
    const value = (plan.features as any)?.[featureKey]
    
    if (type === 'limit') {
      return formatLimit(value)
    }
    
    return value === true
  }

  // If no valid plans found, don't render the component
  if (sortedPlans.length === 0) {
    return null
  }

  const PlanHeader = ({ className = "", isSticky = false }: { className?: string, isSticky?: boolean }) => (
    <div className={`grid gap-3 p-3 bg-gray-50 dark:bg-gray-800 border-b feature-comparison-scroll ${className}`} style={{ gridTemplateColumns: `180px repeat(${sortedPlans.length}, 1fr)` }}>
      <div className="font-semibold text-gray-900 dark:text-white text-xs">Features</div>
      {sortedPlans.map((plan) => (
        <div key={plan._id} className="text-center">
          <div className="font-bold text-sm text-gray-900 dark:text-white">{plan.displayName}</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {plan.price.monthly > 0 ? `/${billingCycle === 'yearly' ? 'year' : 'month'}` : ''}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden relative feature-comparison-container">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3">
        <h3 className="text-lg font-bold mb-1">📋 Complete Feature Comparison</h3>
        <p className="text-blue-100 text-xs">Compare all features across our plans to find the perfect fit</p>
      </div>

      {/* Sticky Header - Fixed Position below page header */}
      {isHeaderSticky && (
        <div 
          ref={stickyHeaderRef}
          className="feature-comparison-sticky-header"
        >
          <div className="max-w-7xl mx-auto px-3">
            <div className="overflow-x-auto feature-comparison-scroll">
              <div className="min-w-full">
                <PlanHeader isSticky={true} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plans Header - Normal Position */}
      <div className="overflow-x-auto feature-comparison-scroll">
        <div className="min-w-full">
          <div ref={headerRef}>
            <PlanHeader />
          </div>

          {/* Feature Categories */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">>
            {featureCategories.map((category, categoryIndex) => {
              const isExpanded = expandedCategories.includes(category.name)
              
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full px-3 py-2.5 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{category.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-xs">{category.name}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>

                  {/* Category Features */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {category.features.map((feature, featureIndex) => (
                        <div
                          key={feature.key}
                          className={`grid gap-3 p-2.5 ${
                            featureIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                          }`}
                          style={{ gridTemplateColumns: `180px repeat(${sortedPlans.length}, 1fr)` }}
                        >
                          {/* Feature Name & Description */}
                          <div className="flex items-start gap-2">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-xs">{feature.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                                {feature.description}
                              </div>
                            </div>
                            <Info className="h-3 w-3 text-gray-400 flex-shrink-0 mt-0.5" />
                          </div>

                          {/* Feature Values for Each Plan */}
                          {sortedPlans.map((plan) => {
                            const value = getFeatureValue(plan, feature.key, feature.type)
                            
                            return (
                              <div key={plan._id} className="flex justify-center items-center">
                                {feature.type === 'boolean' ? (
                                  value ? (
                                    <Check className="h-3.5 w-3.5 text-green-500" />
                                  ) : (
                                    <X className="h-3.5 w-3.5 text-gray-300" />
                                  )
                                ) : (
                                  <span className="font-medium text-gray-900 dark:text-white text-xs">
                                    {value}
                                  </span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <div className="text-center">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
            🤔 Still not sure which plan is right for you?
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs">
            Get a personalized recommendation based on your business needs
          </p>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            💬 Talk to Our Experts
          </Button>
        </div>
      </div>
    </div>
  )
}