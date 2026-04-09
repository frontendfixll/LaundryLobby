'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Users,
  Zap,
  TrendingUp,
  Globe,
  Package,
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  Loader2,
  Search,
  X,
  Lock,
  Unlock,
  Crown,
  Eye,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Target,
  Code,
  Headphones,
  Building,
  Gift,
  MessageCircle
} from 'lucide-react'
import { Button, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

// ─── Types ───────────────────────────────────────────────────────────

interface AddOn {
  _id: string
  name: string
  slug: string
  displayName: string
  description: string
  shortDescription?: string
  category: 'capacity' | 'feature' | 'usage' | 'branding' | 'integration' | 'support'
  pricing: {
    monthly?: number
    yearly?: number
    oneTime?: number
  }
  features: string[]
  benefits: string[]
  useCases?: string[]
  isPopular: boolean
  isRecommended: boolean
  isFeatured?: boolean
  icon: string
  color: string
  status: string
  showOnMarketplace: boolean
  trialDays?: number
  billingCycle?: string
  eligibility?: {
    plans?: string[]
  }
}

// ─── Constants ───────────────────────────────────────────────────────

const categoryIcons: Record<string, any> = {
  capacity: Package,
  feature: Zap,
  usage: TrendingUp,
  branding: Globe,
  integration: Code,
  support: Shield
}

const categoryColors: Record<string, string> = {
  capacity: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  feature: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  usage: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  branding: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  integration: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  support: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
}

const addonIconMap: Record<string, any> = {
  building: Building,
  users: Users,
  target: Target,
  star: Gift,
  'message-square': MessageSquare,
  'message-circle': MessageCircle,
  code: Code,
  globe: Globe,
  headphones: Headphones
}

const planHierarchy = ['free', 'basic', 'standard', 'premium', 'enterprise']

function getMinPlan(plans?: string[]): string {
  if (!plans || plans.length === 0) return 'free'
  for (const p of planHierarchy) {
    if (plans.includes(p)) return p
  }
  return plans[0]
}

function formatPrice(pricing: any) {
  if (!pricing) return 'Contact us'
  if (pricing.monthly && pricing.monthly > 0) return `₹${pricing.monthly.toLocaleString('en-IN')}`
  if (pricing.yearly && pricing.yearly > 0) return `₹${pricing.yearly.toLocaleString('en-IN')}`
  if (pricing.oneTime && pricing.oneTime > 0) return `₹${pricing.oneTime.toLocaleString('en-IN')}`
  return 'Free'
}

function formatPricePeriod(pricing: any) {
  if (!pricing) return ''
  if (pricing.monthly && pricing.monthly > 0) return '/month'
  if (pricing.yearly && pricing.yearly > 0) return '/year'
  if (pricing.oneTime && pricing.oneTime > 0) return ' one-time'
  return ''
}

// ─── Plan Badge Component ────────────────────────────────────────────

function PlanBadge({ plans }: { plans?: string[] }) {
  const minPlan = getMinPlan(plans)
  const isFreePlan = minPlan === 'free'

  if (isFreePlan) {
    return (
      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Works on Free Plan
      </Badge>
    )
  }

  const planLabels: Record<string, string> = {
    basic: 'Requires Basic+',
    standard: 'Requires Standard+',
    premium: 'Requires Premium+',
    enterprise: 'Enterprise Only'
  }

  return (
    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200">
      <Lock className="h-3 w-3 mr-1" />
      {planLabels[minPlan] || minPlan}
    </Badge>
  )
}

// ─── Detail Modal ────────────────────────────────────────────────────

function AddOnDetailModal({ addon, onClose }: { addon: AddOn; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing'>('overview')
  const IconComponent = addonIconMap[addon.icon] || categoryIcons[addon.category] || Package
  const minPlan = getMinPlan(addon.eligibility?.plans)
  const isFreePlan = minPlan === 'free'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={addon.displayName}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: addon.color + '20' }}>
              <IconComponent className="h-8 w-8" style={{ color: addon.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{addon.displayName}</h2>
                {addon.isPopular && (
                  <Badge className="bg-orange-100 text-orange-800">
                    <Star className="h-3 w-3 mr-1" /> Popular
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{addon.shortDescription || addon.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <PlanBadge plans={addon.eligibility?.plans} />
                <Badge className={categoryColors[addon.category]}>{addon.category}</Badge>
                {addon.trialDays && addon.trialDays > 0 && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {addon.trialDays}-day free trial
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['overview', 'features', 'pricing'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About this add-on</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{addon.description}</p>
              </div>

              {addon.benefits && addon.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h3>
                  <div className="grid gap-3">
                    {addon.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {addon.useCases && addon.useCases.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Use Cases</h3>
                  <div className="flex flex-wrap gap-2">
                    {addon.useCases.map((useCase, i) => (
                      <Badge key={i} variant="outline" className="text-gray-600 dark:text-gray-400 py-1.5 px-3">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">What&apos;s Included</h3>
              <div className="grid gap-3">
                {addon.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Pricing Options</h3>
              <div className="grid gap-4">
                {addon.pricing.monthly && addon.pricing.monthly > 0 && (
                  <div className="flex items-center justify-between p-4 border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Monthly</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Billed monthly, cancel anytime</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{addon.pricing.monthly.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/mo</span>
                    </div>
                  </div>
                )}
                {addon.pricing.yearly && addon.pricing.yearly > 0 && (
                  <div className="flex items-center justify-between p-4 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-xl relative">
                    {addon.pricing.monthly && (
                      <Badge className="absolute -top-2.5 right-4 bg-green-600 text-white">
                        Save {Math.round((1 - (addon.pricing.yearly / 12) / addon.pricing.monthly) * 100)}%
                      </Badge>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Yearly</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Billed annually</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{addon.pricing.yearly.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/yr</span>
                    </div>
                  </div>
                )}
                {addon.pricing.oneTime && addon.pricing.oneTime > 0 && (
                  <div className="flex items-center justify-between p-4 border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">One-time</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Pay once, use forever</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{addon.pricing.oneTime.toLocaleString('en-IN')}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Plan Requirements</h4>
                <div className="flex items-center gap-2">
                  <PlanBadge plans={addon.eligibility?.plans} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isFreePlan
                      ? 'No plan upgrade needed — works on all plans including Free'
                      : `Requires ${minPlan.charAt(0).toUpperCase() + minPlan.slice(1)} plan or higher to purchase`
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPrice(addon.pricing)}
                <span className="text-sm font-normal text-gray-500">{formatPricePeriod(addon.pricing)}</span>
              </div>
              {addon.trialDays && addon.trialDays > 0 && (
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {addon.trialDays}-day free trial included
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <a href={`/contact?addon=${addon.name}&plan=free`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Add-On Card ─────────────────────────────────────────────────────

function AddOnCard({ addon, onLearnMore }: { addon: AddOn; onLearnMore: (addon: AddOn) => void }) {
  const IconComponent = addonIconMap[addon.icon] || categoryIcons[addon.category] || Package
  const minPlan = getMinPlan(addon.eligibility?.plans)
  const isFreePlan = minPlan === 'free'

  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col border-gray-200 dark:border-gray-700">
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ backgroundColor: addon.color }} />

      {/* Badges */}
      <div className="absolute top-5 right-4 z-10 flex flex-col gap-1.5 items-end">
        {addon.isPopular && (
          <Badge className="bg-orange-100 text-orange-800 shadow-sm">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        {addon.isRecommended && (
          <Badge className="bg-green-100 text-green-800 shadow-sm">
            Recommended
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2 pt-5">
        <div className="flex items-start gap-3">
          <div
            className="p-3 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0"
            style={{ backgroundColor: addon.color + '20' }}
          >
            <IconComponent className="h-6 w-6" style={{ color: addon.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1 truncate">{addon.displayName}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {addon.shortDescription || addon.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col pt-2">
        {/* Plan + Category Badges */}
        <div className="flex flex-wrap gap-2">
          <PlanBadge plans={addon.eligibility?.plans} />
          <Badge variant="secondary" className={categoryColors[addon.category]}>
            {addon.category}
          </Badge>
          {addon.trialDays && addon.trialDays > 0 && (
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200">
              {addon.trialDays}d trial
            </Badge>
          )}
        </div>

        {/* Key Features */}
        {addon.features && addon.features.length > 0 && (
          <div className="space-y-1.5">
            {addon.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
            {addon.features.length > 3 && (
              <div className="text-xs text-gray-400 dark:text-gray-500 pl-6">
                +{addon.features.length - 3} more features
              </div>
            )}
          </div>
        )}

        {/* Pricing + CTA */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPrice(addon.pricing)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatPricePeriod(addon.pricing)}
                {addon.pricing.yearly && addon.pricing.monthly && (
                  <span className="ml-1 text-green-600 dark:text-green-400 font-medium">
                    (Save {Math.round((1 - (addon.pricing.yearly / 12) / addon.pricing.monthly) * 100)}% yearly)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <a href={`/contact?addon=${addon.name}&plan=free`} className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-md transition-all">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onLearnMore(addon)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Showcase Component ─────────────────────────────────────────

export function AddOnsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAddOn, setSelectedAddOn] = useState<AddOn | null>(null)
  const [planFilter, setPlanFilter] = useState<'all' | 'free'>('all')

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/addons/marketplace`)
        if (!response.ok) throw new Error('Failed to fetch add-ons')
        const data = await response.json()
        if (data.success) {
          setAddOns(data.data.addOns || [])
        } else {
          throw new Error(data.message || 'Failed to fetch add-ons')
        }
      } catch (err) {
        console.error('Error fetching add-ons:', err)
        setError(err instanceof Error ? err.message : 'Failed to load add-ons')
      } finally {
        setLoading(false)
      }
    }
    fetchAddOns()
  }, [])

  const categories = [
    { id: 'all', label: 'All Add-ons', count: addOns.length },
    { id: 'capacity', label: 'Capacity', count: addOns.filter(a => a.category === 'capacity').length },
    { id: 'feature', label: 'Features', count: addOns.filter(a => a.category === 'feature').length },
    { id: 'usage', label: 'Usage', count: addOns.filter(a => a.category === 'usage').length },
    { id: 'branding', label: 'Branding', count: addOns.filter(a => a.category === 'branding').length },
    { id: 'integration', label: 'Integration', count: addOns.filter(a => a.category === 'integration').length },
    { id: 'support', label: 'Support', count: addOns.filter(a => a.category === 'support').length }
  ].filter(c => c.id === 'all' || c.count > 0)

  const filteredAddOns = addOns
    .filter(addon => selectedCategory === 'all' || addon.category === selectedCategory)
    .filter(addon => {
      if (planFilter === 'free') {
        return addon.eligibility?.plans?.includes('free')
      }
      return true
    })
    .filter(addon => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        addon.displayName.toLowerCase().includes(q) ||
        addon.description.toLowerCase().includes(q) ||
        addon.category.toLowerCase().includes(q)
      )
    })

  const freeAddOnsCount = addOns.filter(a => a.eligibility?.plans?.includes('free')).length
  const displayedAddOns = showAll ? filteredAddOns : filteredAddOns.slice(0, 6)

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600 dark:text-gray-400">Loading add-ons...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading add-ons: {error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    )
  }

  if (addOns.length === 0) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Add-ons Available</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new add-ons!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-20 bg-gray-50 dark:bg-gray-900" id="marketplace">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our Add-ons Marketplace
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
              Choose from our collection of add-ons designed to enhance every aspect of your laundry business
            </p>

            {/* Free Plan Highlight Banner */}
            {freeAddOnsCount > 0 && (
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 px-5 py-2.5 rounded-full text-sm font-medium">
                <Crown className="h-4 w-4" />
                {freeAddOnsCount} add-ons available without upgrading your plan!
              </div>
            )}
          </div>

          {/* Search + Plan Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search add-ons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                aria-label="Search add-ons"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={planFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setPlanFilter('all')}
              >
                All Plans
              </Button>
              <Button
                variant={planFilter === 'free' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setPlanFilter('free')}
                className={planFilter === 'free' ? '' : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400'}
              >
                <Unlock className="h-3.5 w-3.5 mr-1.5" />
                Free Plan
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2" role="tablist" aria-label="Add-on categories">
            {categories.map((category) => {
              const CatIcon = category.id !== 'all' ? categoryIcons[category.id] : null
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => { setSelectedCategory(category.id); setShowAll(false) }}
                  className="flex items-center gap-1.5 whitespace-nowrap"
                  role="tab"
                  aria-selected={selectedCategory === category.id}
                >
                  {CatIcon && <CatIcon className="h-3.5 w-3.5" />}
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-xs">{category.count}</Badge>
                </Button>
              )
            })}
          </div>

          {/* Results count */}
          {(searchQuery || planFilter !== 'all') && (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredAddOns.length} add-on{filteredAddOns.length !== 1 ? 's' : ''}
                {searchQuery && <> for &quot;{searchQuery}&quot;</>}
                {planFilter === 'free' && <> on Free Plan</>}
              </p>
            </div>
          )}

          {/* Add-ons Grid */}
          {filteredAddOns.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No add-ons found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setPlanFilter('all'); setSelectedCategory('all') }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {displayedAddOns.map((addon) => (
                <AddOnCard
                  key={addon._id}
                  addon={addon}
                  onLearnMore={setSelectedAddOn}
                />
              ))}
            </div>
          )}

          {/* Show More */}
          {filteredAddOns.length > 6 && (
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="px-8"
              >
                {showAll ? (
                  <>Show Less <ChevronUp className="ml-2 h-4 w-4" /></>
                ) : (
                  <>Show All {filteredAddOns.length} Add-ons <ChevronDown className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          )}

        </div>
      </section>

      {/* Detail Modal */}
      {selectedAddOn && (
        <AddOnDetailModal addon={selectedAddOn} onClose={() => setSelectedAddOn(null)} />
      )}
    </>
  )
}
