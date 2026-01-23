/**
 * Add-ons API client for frontend-marketing
 * For business owners who want to purchase add-ons with their plans
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface AddOn {
  _id: string
  name: string
  slug: string
  displayName: string
  description: string
  shortDescription?: string
  category: 'capacity' | 'feature' | 'usage' | 'branding' | 'integration' | 'support'
  subcategory?: string
  tags: string[]
  pricing: {
    monthly?: number
    yearly?: number
    oneTime?: number
    formattedPricing?: {
      monthly?: string
      yearly?: string
      oneTime?: string
      savings?: number
    }
  }
  billingCycle: 'monthly' | 'yearly' | 'one-time' | 'usage-based'
  config: any
  icon: string
  color: string
  images?: any[]
  benefits: string[]
  features: string[]
  useCases: string[]
  status: 'draft' | 'active' | 'hidden' | 'deprecated'
  isPopular: boolean
  isRecommended: boolean
  isFeatured: boolean
  trialDays: number
  maxQuantity: number
  showOnMarketplace: boolean
  eligibilityRules?: any
  createdAt: string
  updatedAt: string
}

export interface AddOnFilters {
  category?: string
  search?: string
  sortBy?: 'popular' | 'price_low' | 'price_high' | 'newest' | 'name'
  limit?: number
  page?: number
  priceRange?: string
  featured?: boolean
}

export interface AddOnResponse {
  success: boolean
  data: {
    addOns: AddOn[]
    pagination?: {
      page: number
      pages: number
      total: number
      limit: number
    }
    filters?: {
      categories: string[]
      sortOptions: Array<{ value: string; label: string }>
      priceRanges: Array<{ value: string; label: string }>
    }
  }
  message?: string
}

/**
 * Fetch marketplace add-ons (public endpoint)
 */
export async function fetchMarketplaceAddOns(filters: AddOnFilters = {}): Promise<AddOnResponse> {
  try {
    const params = new URLSearchParams()
    
    if (filters.category) params.append('category', filters.category)
    if (filters.search) params.append('search', filters.search)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.limit) params.append('limit', filters.limit.toString())
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.priceRange) params.append('priceRange', filters.priceRange)
    if (filters.featured !== undefined) params.append('featured', filters.featured.toString())

    const url = `${API_BASE}/public/addons/marketplace?${params.toString()}`
    console.log('🔍 Fetching add-ons from:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ Add-ons API response:', data)

    return data
  } catch (error) {
    console.error('❌ Failed to fetch add-ons:', error)
    
    // Return error instead of mock data - let the UI handle the error state
    throw new Error(`Failed to fetch add-ons: ${error.message}`)
  }
}

/**
 * Fetch single add-on details (public endpoint)
 */
export async function fetchAddOnDetails(addOnId: string): Promise<{ success: boolean; data: { addOn: AddOn } }> {
  try {
    const url = `${API_BASE}/public/addons/${addOnId}`
    console.log('🔍 Fetching add-on details from:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ Add-on details response:', data)

    return data
  } catch (error) {
    console.error('❌ Failed to fetch add-on details:', error)
    throw error
  }
}

/**
 * Mock data for fallback (matches backend structure)
 */
function getMockAddOns(filters: AddOnFilters = {}): AddOn[] {
  const mockAddOns: AddOn[] = [
    {
      _id: '1',
      name: 'extra-branch',
      slug: 'extra-branch',
      displayName: 'Extra Branch',
      description: 'Add additional branch locations to expand your business reach and manage multiple locations from a single dashboard.',
      shortDescription: 'Expand with additional branches',
      category: 'capacity',
      subcategory: 'locations',
      tags: ['branch', 'location', 'expansion', 'multi-location'],
      pricing: {
        monthly: 499,
        yearly: 4990,
        formattedPricing: {
          monthly: '₹499',
          yearly: '₹4,990',
          savings: 17
        }
      },
      billingCycle: 'monthly',
      config: {
        limits: { branches: 1 },
        features: []
      },
      icon: 'building',
      color: '#3B82F6',
      images: [],
      benefits: ['Scale your business', 'Manage multiple locations', 'Unified reporting'],
      features: ['Multi-location management', 'Centralized dashboard', 'Branch-wise analytics', 'Staff management'],
      useCases: ['Chain expansion', 'Franchise management', 'Multi-city operations'],
      status: 'active',
      isPopular: true,
      isRecommended: false,
      isFeatured: true,
      trialDays: 7,
      maxQuantity: 10,
      showOnMarketplace: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      _id: '2',
      name: 'campaign-manager',
      slug: 'campaign-manager',
      displayName: 'Campaign Manager',
      description: 'Create and manage promotional campaigns, discount coupons, and email marketing to boost customer engagement and sales.',
      shortDescription: 'Advanced marketing campaigns',
      category: 'feature',
      subcategory: 'marketing',
      tags: ['campaigns', 'marketing', 'promotions', 'coupons'],
      pricing: {
        monthly: 799,
        yearly: 7990,
        formattedPricing: {
          monthly: '₹799',
          yearly: '₹7,990',
          savings: 17
        }
      },
      billingCycle: 'monthly',
      config: {
        features: [
          { key: 'campaigns', value: true },
          { key: 'coupons', value: true },
          { key: 'email_marketing', value: true }
        ]
      },
      icon: 'megaphone',
      color: '#8B5CF6',
      images: [],
      benefits: ['Increase customer retention', 'Boost sales', 'Targeted marketing'],
      features: ['Discount coupons', 'Promotional campaigns', 'Email marketing', 'Campaign analytics'],
      useCases: ['Seasonal promotions', 'Customer retention', 'New customer acquisition'],
      status: 'active',
      isPopular: true,
      isRecommended: true,
      isFeatured: true,
      trialDays: 14,
      maxQuantity: 1,
      showOnMarketplace: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      _id: '3',
      name: 'sms-pack-1000',
      slug: 'sms-pack-1000',
      displayName: 'SMS Pack (1000)',
      description: 'Send SMS notifications to customers for order updates, delivery alerts, and promotional messages.',
      shortDescription: '1000 SMS credits',
      category: 'usage',
      subcategory: 'communication',
      tags: ['sms', 'notifications', 'communication', 'alerts'],
      pricing: {
        oneTime: 300,
        formattedPricing: {
          oneTime: '₹300'
        }
      },
      billingCycle: 'usage-based',
      config: {
        usage: {
          unit: 'sms_credits',
          amount: 1000
        }
      },
      icon: 'message-square',
      color: '#F59E0B',
      images: [],
      benefits: ['Better communication', 'Reduced support calls', 'Customer satisfaction'],
      features: ['Order notifications', 'Delivery alerts', 'Promotional SMS', 'Delivery confirmations'],
      useCases: ['Order updates', 'Marketing campaigns', 'Customer service'],
      status: 'active',
      isPopular: true,
      isRecommended: false,
      isFeatured: false,
      trialDays: 0,
      maxQuantity: 100,
      showOnMarketplace: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      _id: '4',
      name: 'loyalty-program',
      slug: 'loyalty-program',
      displayName: 'Loyalty & Rewards',
      description: 'Build customer loyalty with points system, reward tiers, and referral programs to increase repeat business.',
      shortDescription: 'Customer loyalty system',
      category: 'feature',
      subcategory: 'customer-retention',
      tags: ['loyalty', 'rewards', 'points', 'referrals'],
      pricing: {
        monthly: 599,
        yearly: 5990,
        formattedPricing: {
          monthly: '₹599',
          yearly: '₹5,990',
          savings: 17
        }
      },
      billingCycle: 'monthly',
      config: {
        features: [
          { key: 'loyalty_points', value: true },
          { key: 'reward_tiers', value: true },
          { key: 'referral_program', value: true }
        ]
      },
      icon: 'gift',
      color: '#8B5CF6',
      images: [],
      benefits: ['Customer retention', 'Repeat business', 'Word-of-mouth marketing'],
      features: ['Points system', 'Reward tiers', 'Referral program', 'Loyalty analytics'],
      useCases: ['Customer retention', 'Repeat purchases', 'Brand advocacy'],
      status: 'active',
      isPopular: true,
      isRecommended: false,
      isFeatured: false,
      trialDays: 14,
      maxQuantity: 1,
      showOnMarketplace: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      _id: '5',
      name: 'custom-domain',
      slug: 'custom-domain',
      displayName: 'Custom Domain',
      description: 'Use your own domain name for your laundry platform to enhance brand recognition and customer trust.',
      shortDescription: 'Your own domain (yourname.com)',
      category: 'branding',
      subcategory: 'domain',
      tags: ['domain', 'branding', 'custom', 'professional'],
      pricing: {
        yearly: 999,
        formattedPricing: {
          yearly: '₹999'
        }
      },
      billingCycle: 'yearly',
      config: {
        features: [
          { key: 'custom_domain', value: true },
          { key: 'ssl_certificate', value: true }
        ]
      },
      icon: 'globe',
      color: '#EC4899',
      images: [],
      benefits: ['Professional appearance', 'Brand recognition', 'Customer trust'],
      features: ['Custom domain setup', 'SSL certificate', 'DNS management', 'Email forwarding'],
      useCases: ['Brand building', 'Professional image', 'Customer trust'],
      status: 'active',
      isPopular: false,
      isRecommended: false,
      isFeatured: false,
      trialDays: 0,
      maxQuantity: 1,
      showOnMarketplace: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      _id: '6',
      name: 'priority-support',
      slug: 'priority-support',
      displayName: 'Priority Support',
      description: 'Get priority support with faster response times, phone support, and dedicated assistance for your business.',
      shortDescription: '24/7 priority support',
      category: 'support',
      subcategory: 'customer-service',
      tags: ['support', 'priority', '24/7', 'assistance'],
      pricing: {
        monthly: 999,
        yearly: 9990,
        formattedPricing: {
          monthly: '₹999',
          yearly: '₹9,990',
          savings: 17
        }
      },
      billingCycle: 'monthly',
      config: {
        features: [
          { key: 'priority_support', value: true },
          { key: 'phone_support', value: true },
          { key: 'dedicated_manager', value: true }
        ]
      },
      icon: 'headphones',
      color: '#10B981',
      images: [],
      benefits: ['Faster resolution', 'Peace of mind', 'Business continuity'],
      features: ['24/7 support', 'Priority queue', 'Phone support', 'Dedicated manager'],
      useCases: ['Critical business operations', 'High-volume businesses', 'Enterprise needs'],
      status: 'active',
      isPopular: false,
      isRecommended: true,
      isFeatured: false,
      trialDays: 7,
      maxQuantity: 1,
      showOnMarketplace: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]

  // Apply filters
  let filtered = mockAddOns

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(addon => addon.category === filters.category)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(addon => 
      addon.displayName.toLowerCase().includes(searchLower) ||
      addon.description.toLowerCase().includes(searchLower) ||
      addon.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  if (filters.featured) {
    filtered = filtered.filter(addon => addon.isFeatured)
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
        break
      case 'price_low':
        filtered.sort((a, b) => {
          const priceA = a.pricing.monthly || a.pricing.yearly || a.pricing.oneTime || 0
          const priceB = b.pricing.monthly || b.pricing.yearly || b.pricing.oneTime || 0
          return priceA - priceB
        })
        break
      case 'price_high':
        filtered.sort((a, b) => {
          const priceA = a.pricing.monthly || a.pricing.yearly || a.pricing.oneTime || 0
          const priceB = b.pricing.monthly || b.pricing.yearly || b.pricing.oneTime || 0
          return priceB - priceA
        })
        break
      case 'name':
        filtered.sort((a, b) => a.displayName.localeCompare(b.displayName))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }
  }

  return filtered
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format add-on price for display
 */
export function formatAddOnPrice(pricing: AddOn['pricing']): string {
  if (pricing.monthly) {
    return `${formatCurrency(pricing.monthly)}/month`
  }
  if (pricing.yearly) {
    return `${formatCurrency(pricing.yearly)}/year`
  }
  if (pricing.oneTime) {
    return `${formatCurrency(pricing.oneTime)} one-time`
  }
  return 'Contact us'
}

/**
 * Get add-on category display info
 */
export function getCategoryInfo(category: string) {
  const categoryMap = {
    capacity: { label: 'Capacity', color: '#3B82F6', description: 'Scale your business with additional resources' },
    feature: { label: 'Features', color: '#8B5CF6', description: 'Unlock advanced features for your operations' },
    usage: { label: 'Usage', color: '#F59E0B', description: 'Pay-as-you-use services and communications' },
    branding: { label: 'Branding', color: '#EC4899', description: 'Customize your platform with your brand' },
    integration: { label: 'Integration', color: '#6366F1', description: 'Connect with third-party tools and services' },
    support: { label: 'Support', color: '#10B981', description: 'Enhanced support and assistance' }
  }

  return categoryMap[category as keyof typeof categoryMap] || { 
    label: category, 
    color: '#6B7280', 
    description: 'Additional features and capabilities' 
  }
}