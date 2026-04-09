'use client'

import React, { useState, useEffect } from 'react'
import {
  Package,
  Zap,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Crown,
  Sparkles
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'

const features = [
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Add-ons activate immediately after purchase — zero setup needed'
  },
  {
    icon: Crown,
    title: 'Free Plan Friendly',
    description: 'Many add-ons work on the Free plan — start growing without upgrading'
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'Professional-grade features backed by enterprise security standards'
  }
]

const popularAddOns = [
  {
    name: 'Campaigns & Marketing',
    category: 'Feature',
    price: '₹799/month',
    description: 'Boost retention with targeted campaigns, coupons & banners',
    popular: true,
    freePlan: true,
    features: ['Discount Coupons', 'Email Campaigns', 'Banner Management', 'A/B Testing']
  },
  {
    name: 'SMS Credits (1000)',
    category: 'Usage',
    price: '₹300/pack',
    description: 'Send order updates, delivery alerts & promotional messages',
    popular: true,
    freePlan: true,
    features: ['Order Updates', 'Delivery Alerts', 'Promotional SMS', 'Custom Templates']
  },
  {
    name: 'Loyalty & Rewards',
    category: 'Feature',
    price: '₹599/month',
    description: 'Build repeat business with points, rewards & referral programs',
    popular: false,
    freePlan: true,
    features: ['Points System', 'Reward Tiers', 'Referral Program', '7-day Free Trial']
  }
]

export function AddOnsHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Add-ons Marketplace
            <Badge variant="secondary" className="bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300">
              Free Plan Eligible
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Supercharge Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Laundry Business
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock advanced features, increase capacity, and integrate with powerful tools.
            Start with our Free plan and add what you need — no forced upgrades.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#marketplace">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg w-full sm:w-auto">
                Browse Add-ons
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="/pricing">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg w-full sm:w-auto">
                View Pricing Plans
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">25+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Add-ons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">6</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">Free</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Plan Eligible</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-4">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Popular Add-ons Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Most Popular Add-ons</h2>
            <p className="text-gray-600 dark:text-gray-400">Top picks — buy these on any plan, no upgrade required</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularAddOns.map((addon, index) => (
              <div key={index} className="relative p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all flex flex-col h-full group">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  {addon.popular && (
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {addon.freePlan && (
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      No Upgrade Needed
                    </Badge>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{addon.name}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs mb-3">{addon.category}</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{addon.description}</p>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{addon.price}</div>
                </div>

                <div className="space-y-2 mb-4 flex-grow">
                  {addon.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <a href={`/contact?addon=${addon.name.toLowerCase().replace(/ /g, '-')}&plan=free`}>
                  <Button variant="outline" size="sm" className="w-full mt-auto group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-300 transition-all">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
