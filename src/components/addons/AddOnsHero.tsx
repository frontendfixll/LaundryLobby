'use client'

import React, { useState, useEffect } from 'react'
import { 
  Package, 
  Zap, 
  Users, 
  TrendingUp, 
  Globe, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'

const features = [
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Add-ons activate immediately after purchase'
  },
  {
    icon: Users,
    title: 'Scalable Solutions',
    description: 'Grow your business with capacity add-ons'
  },
  {
    icon: Shield,
    title: 'Enterprise Ready',
    description: 'Professional-grade features and support'
  }
]

const stats = [
  { label: 'Available Add-ons', value: '25+' },
  { label: 'Categories', value: '6' },
  { label: 'Happy Customers', value: '1000+' }
]

export function AddOnsHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Package className="h-4 w-4" />
            Powerful Add-ons Available
            <Badge variant="secondary" className="bg-blue-200 text-blue-900">
              New
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Supercharge Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LaundryPro Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock advanced features, increase capacity, and integrate with powerful tools. 
            Choose from our marketplace of professional add-ons designed to grow with your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Browse Add-ons
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Pricing
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Popular Add-ons Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Most Popular Add-ons</h2>
            <p className="text-gray-600">See what other businesses are using to grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Campaign Manager',
                category: 'Marketing',
                price: '₹799/month',
                description: 'Create and manage promotional campaigns',
                popular: true,
                features: ['Discount Coupons', 'Email Campaigns', 'Analytics']
              },
              {
                name: 'Extra Branch',
                category: 'Capacity',
                price: '₹499/month',
                description: 'Add additional branch locations',
                popular: false,
                features: ['Multi-location', 'Centralized Control', 'Branch Analytics']
              },
              {
                name: 'SMS Pack (1000)',
                category: 'Communication',
                price: '₹300/pack',
                description: 'Send SMS notifications to customers',
                popular: true,
                features: ['Order Updates', 'Delivery Alerts', 'Promotional SMS']
              }
            ].map((addon, index) => (
              <div key={index} className="relative p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                {addon.popular && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-orange-100 text-orange-800">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                    <Badge variant="outline" className="text-xs">{addon.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                  <div className="text-lg font-bold text-blue-600">{addon.price}</div>
                </div>

                <div className="space-y-2 mb-4">
                  {addon.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}