'use client'

import React, { useState, useEffect } from 'react'
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
  Filter,
  Loader2
} from 'lucide-react'
import { Button, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

const categoryIcons = {
  capacity: Package,
  feature: CheckCircle,
  usage: TrendingUp,
  branding: Globe,
  integration: Package,
  support: Shield
}

const categoryColors = {
  capacity: 'bg-blue-100 text-blue-800',
  feature: 'bg-purple-100 text-purple-800',
  usage: 'bg-orange-100 text-orange-800',
  branding: 'bg-pink-100 text-pink-800',
  integration: 'bg-indigo-100 text-indigo-800',
  support: 'bg-green-100 text-green-800'
}

// Helper function to format price
const formatPrice = (pricing: any) => {
  if (!pricing) return 'Contact us'

  if (pricing.monthly && pricing.monthly > 0) {
    return `₹${pricing.monthly}/month`
  }
  if (pricing.yearly && pricing.yearly > 0) {
    return `₹${pricing.yearly}/year`
  }
  if (pricing.oneTime && pricing.oneTime > 0) {
    return `₹${pricing.oneTime} one-time`
  }
  return 'Contact us'
}

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
  isPopular: boolean
  isRecommended: boolean
  icon: string
  color: string
  status: string
  showOnMarketplace: boolean
}

export function AddOnsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch add-ons from API
  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/addons/marketplace`)

        if (!response.ok) {
          throw new Error('Failed to fetch add-ons')
        }

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

  // Calculate categories with counts
  const categories = [
    { id: 'all', label: 'All Add-ons', count: addOns.length },
    { id: 'capacity', label: 'Capacity', count: addOns.filter(a => a.category === 'capacity').length },
    { id: 'feature', label: 'Features', count: addOns.filter(a => a.category === 'feature').length },
    { id: 'usage', label: 'Usage', count: addOns.filter(a => a.category === 'usage').length },
    { id: 'branding', label: 'Branding', count: addOns.filter(a => a.category === 'branding').length },
    { id: 'integration', label: 'Integration', count: addOns.filter(a => a.category === 'integration').length },
    { id: 'support', label: 'Support', count: addOns.filter(a => a.category === 'support').length }
  ]

  const filteredAddOns = addOns.filter(addon =>
    selectedCategory === 'all' || addon.category === selectedCategory
  )

  const displayedAddOns = showAll ? filteredAddOns : filteredAddOns.slice(0, 6)

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading add-ons...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading add-ons: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (addOns.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Add-ons Available</h3>
            <p className="text-gray-600">Check back later for new add-ons!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Add-ons Marketplace
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive collection of add-ons designed to enhance every aspect of your laundry business
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.id !== 'all' && categoryIcons[category.id as keyof typeof categoryIcons] && (
                (() => {
                  const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
                  return <IconComponent className="h-4 w-4" />;
                })()
              )}
              {category.label}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Add-ons Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {displayedAddOns.map((addon) => (
            <AddOnCard key={addon._id} addon={addon} />
          ))}
        </div>

        {/* Show More Button */}
        {filteredAddOns.length > 6 && !showAll && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
              className="px-8"
            >
              Show All {filteredAddOns.length} Add-ons
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Categories Overview */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categoryIcons).map(([category, IconComponent]) => {
            const categoryCount = addOns.filter(a => a.category === category).length;
            if (categoryCount === 0) return null; // Don't show empty categories

            return (
              <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${categoryColors[category as keyof typeof categoryColors].replace('text-', 'bg-').replace('800', '100')}`}>
                      <IconComponent className="h-6 w-6" style={{
                        color: categoryColors[category as keyof typeof categoryColors].includes('blue') ? '#3B82F6' :
                          categoryColors[category as keyof typeof categoryColors].includes('purple') ? '#8B5CF6' :
                            categoryColors[category as keyof typeof categoryColors].includes('orange') ? '#F59E0B' :
                              categoryColors[category as keyof typeof categoryColors].includes('pink') ? '#EC4899' :
                                categoryColors[category as keyof typeof categoryColors].includes('indigo') ? '#6366F1' : '#10B981'
                      }} />
                    </div>
                    <div>
                      <CardTitle className="capitalize">{category} Add-ons</CardTitle>
                      <CardDescription>
                        {categoryCount} available
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {category === 'capacity' && 'Scale your business with additional resources and limits'}
                    {category === 'feature' && 'Unlock advanced features to enhance your operations'}
                    {category === 'usage' && 'Pay-as-you-use services for communication and notifications'}
                    {category === 'branding' && 'Customize your platform with your own brand identity'}
                    {category === 'integration' && 'Connect with third-party tools and services'}
                    {category === 'support' && 'Get enhanced support and assistance for your business'}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedCategory(category)}
                  >
                    View {category} Add-ons
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}

interface AddOnCardProps {
  addon: AddOn
}

function AddOnCard({ addon }: AddOnCardProps) {
  const IconComponent = categoryIcons[addon.category as keyof typeof categoryIcons]

  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      {/* Popular Badge */}
      {addon.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-orange-100 text-orange-800">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* Recommended Badge */}
      {addon.isRecommended && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-green-100 text-green-800">
            Recommended
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div
            className="p-3 rounded-xl group-hover:scale-110 transition-transform"
            style={{ backgroundColor: addon.color + '20' }}
          >
            <IconComponent className="h-6 w-6" style={{ color: addon.color }} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{addon.displayName}</CardTitle>
            <CardDescription className="text-sm">
              {addon.shortDescription || addon.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-gray-600">{addon.description}</p>

        {/* Category Badge */}
        <div>
          <Badge
            variant="secondary"
            className={categoryColors[addon.category as keyof typeof categoryColors]}
          >
            {addon.category}
          </Badge>
        </div>

        {/* Key Features */}
        {addon.features && addon.features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
            <ul className="space-y-1">
              {addon.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pricing */}
        <div className="pt-4 border-t mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(addon.pricing)}
              </div>
              {addon.pricing.yearly && addon.pricing.monthly && (
                <div className="text-sm text-gray-500">
                  Save {Math.round((1 - (addon.pricing.yearly / 12) / addon.pricing.monthly) * 100)}% yearly
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full group-hover:bg-blue-700 transition-colors">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}