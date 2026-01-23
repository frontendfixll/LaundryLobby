'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Package, 
  Users, 
  Zap, 
  TrendingUp, 
  Globe, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Plus
} from 'lucide-react'
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

const categoryIcons = {
  capacity: Users,
  feature: Zap,
  usage: TrendingUp,
  branding: Globe,
  integration: Package,
  support: Shield
}

const featuredAddOns = [
  {
    id: 'campaign-manager',
    name: 'Campaign Manager',
    category: 'feature',
    price: { monthly: 799, yearly: 7990 },
    description: 'Create promotional campaigns and boost customer engagement',
    features: ['Discount Coupons', 'Email Campaigns', 'Analytics'],
    benefits: ['Increase customer retention', 'Boost sales', 'Track performance'],
    isPopular: true,
    isRecommended: true,
    icon: '📢',
    color: 'blue',
    status: 'active',
    showOnMarketplace: true
  },
  {
    id: 'loyalty-program',
    name: 'Loyalty Program',
    category: 'feature',
    price: { monthly: 599, yearly: 5990 },
    description: 'Reward customers with points and exclusive benefits',
    features: ['Points System', 'VIP Tiers', 'Exclusive Rewards'],
    benefits: ['Customer retention', 'Increased orders', 'Brand loyalty'],
    isPopular: true,
    isRecommended: false,
    icon: '⭐',
    color: 'purple',
    status: 'active',
    showOnMarketplace: true
  },
  {
    id: 'sms-notifications',
    name: 'SMS Notifications',
    category: 'feature',
    price: { monthly: 299, yearly: 2990 },
    description: 'Send SMS updates to customers about their orders',
    features: ['Order Updates', 'Delivery Alerts', 'Promotional SMS'],
    benefits: ['Better communication', 'Reduced calls', 'Higher satisfaction'],
    isPopular: false,
    isRecommended: true,
    icon: '📱',
    color: 'green',
    status: 'active',
    showOnMarketplace: true
  }
]