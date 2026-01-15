'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ClipboardList, 
  Package, 
  Truck, 
  QrCode,
  Gift,
  Star,
  Trophy,
  Percent,
  Megaphone,
  Image,
  Tag,
  Bell,
  Smartphone,
  MapPin,
  CreditCard,
  History,
  BarChart3,
  TrendingUp,
  PieChart,
  FileText,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui'
import { FeatureCategory } from '@/components/features'
import { VideoHero } from '@/components/shared'

const featureCategories = [
  {
    icon: ClipboardList,
    title: 'Order Management',
    description: 'Complete order lifecycle management from pickup to delivery with real-time tracking.',
    features: [
      { icon: Package, title: 'Order Tracking', description: 'Track every order through each stage of processing with status updates.' },
      { icon: Truck, title: 'Pickup & Delivery', description: 'Manage logistics with route optimization and delivery scheduling.' },
      { icon: QrCode, title: 'Barcode Scanning', description: 'Scan items for quick identification and error-free processing.' },
    ],
  },
  {
    icon: Gift,
    title: 'Customer Loyalty',
    description: 'Build lasting relationships with customers through rewards and personalized experiences.',
    features: [
      { icon: Star, title: 'Points System', description: 'Reward customers with points for every order they place.' },
      { icon: Trophy, title: 'VIP Tiers', description: 'Create exclusive tiers with special benefits for loyal customers.' },
      { icon: Percent, title: 'Redemption Options', description: 'Let customers redeem points for discounts and free services.' },
    ],
  },
  {
    icon: Megaphone,
    title: 'Campaigns & Promotions',
    description: 'Drive sales and engagement with targeted marketing campaigns.',
    features: [
      { icon: Image, title: 'Banner Management', description: 'Create eye-catching banners for your storefront and app.' },
      { icon: Tag, title: 'Discount Codes', description: 'Generate and manage promotional discount codes.' },
      { icon: Bell, title: 'Push Notifications', description: 'Send targeted notifications to drive customer engagement.' },
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Give your customers a branded mobile experience for easy ordering.',
    features: [
      { icon: MapPin, title: 'Store Locator', description: 'Help customers find your nearest branch with GPS.' },
      { icon: CreditCard, title: 'Easy Payments', description: 'Accept online payments with multiple payment options.' },
      { icon: History, title: 'Order History', description: 'Let customers view past orders and reorder easily.' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Make data-driven decisions with comprehensive business insights.',
    features: [
      { icon: TrendingUp, title: 'Revenue Analytics', description: 'Track revenue trends, growth, and performance metrics.' },
      { icon: PieChart, title: 'Customer Insights', description: 'Understand customer behavior and preferences.' },
      { icon: FileText, title: 'Custom Reports', description: 'Generate detailed reports for any time period.' },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* Hero with Video */}
      <VideoHero
        videoSrc="/videos/features-bg.mp4"
        videoPoster="/videos/features-poster.jpg"
        size="md"
        title={
          <>
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Modern Laundries
            </span>
          </>
        }
        subtitle="Everything you need to run a successful laundry business, from order management to customer loyalty programs."
      />

      {/* Feature Categories */}
      <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300">
        <div className="container-marketing space-y-24">
          {featureCategories.map((category, index) => (
            <FeatureCategory
              key={category.title}
              icon={category.icon}
              title={category.title}
              description={category.description}
              features={category.features}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[rgb(var(--background-secondary))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-sm text-[rgb(var(--foreground))]">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-[rgb(var(--foreground-secondary))]">
              See how LaundryLobby can transform your business. Request a personalized demo today.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
