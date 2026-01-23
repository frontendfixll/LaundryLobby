'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Square, 
  Package, 
  Truck, 
  QrCode,
  Circle,
  Star,
  Trophy,
  Percent,
  Triangle,
  Image,
  Tag,
  Bell,
  Hexagon,
  MapPin,
  CreditCard,
  History,
  Octagon,
  TrendingUp,
  PieChart,
  FileText,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui'
import { FeatureCard } from '@/components/features'
import { VideoHero } from '@/components/shared'

const featureCategories = [
  {
    icon: Square,
    title: 'Order Management',
    description: 'Complete order lifecycle management from pickup to delivery with real-time tracking.',
    features: [
      { icon: Package, title: 'Order Tracking', description: 'Track every order through each stage of processing with status updates.' },
      { icon: Truck, title: 'Pickup & Delivery', description: 'Manage logistics with route optimization and delivery scheduling.' },
      { icon: QrCode, title: 'Barcode Scanning', description: 'Scan items for quick identification and error-free processing.' },
    ],
  },
  {
    icon: Circle,
    title: 'Customer Loyalty',
    description: 'Build lasting relationships with customers through rewards and personalized experiences.',
    features: [
      { icon: Star, title: 'Points System', description: 'Reward customers with points for every order they place.' },
      { icon: Trophy, title: 'VIP Tiers', description: 'Create exclusive tiers with special benefits for loyal customers.' },
      { icon: Percent, title: 'Redemption Options', description: 'Let customers redeem points for discounts and free services.' },
    ],
  },
  {
    icon: Triangle,
    title: 'Campaigns & Promotions',
    description: 'Drive sales and engagement with targeted marketing campaigns.',
    features: [
      { icon: Image, title: 'Banner Management', description: 'Create eye-catching banners for your storefront and app.' },
      { icon: Tag, title: 'Discount Codes', description: 'Generate and manage promotional discount codes.' },
      { icon: Bell, title: 'Push Notifications', description: 'Send targeted notifications to drive customer engagement.' },
    ],
  },
  {
    icon: Hexagon,
    title: 'Mobile App',
    description: 'Give your customers a branded mobile experience for easy ordering.',
    features: [
      { icon: MapPin, title: 'Store Locator', description: 'Help customers find your nearest branch with GPS.' },
      { icon: CreditCard, title: 'Easy Payments', description: 'Accept online payments with multiple payment options.' },
      { icon: History, title: 'Order History', description: 'Let customers view past orders and reorder easily.' },
    ],
  },
  {
    icon: Octagon,
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
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = featureCategories.map((_, index) => 
        document.getElementById(`feature-${index}`)
      )
      
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveFeature(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      {/* Feature Categories - Advanced Scrollspy Layout */}
      <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--foreground))] mb-4">
              Complete Feature Set
            </h2>
            <p className="text-lg text-[rgb(var(--foreground-secondary))] max-w-2xl mx-auto">
              Discover all the tools and capabilities that make LaundryLobby the perfect solution for your business
            </p>
          </div>
          
          {/* Advanced Sticky Layout */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Left Sidebar - Sticky Feature List */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24 space-y-3">
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-6">
                  Feature Categories
                </h3>
                {featureCategories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`group cursor-pointer transition-all duration-300 ${
                      activeFeature === index ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => {
                      const element = document.getElementById(`feature-${index}`);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${
                      activeFeature === index
                        ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-300 dark:border-primary-600 shadow-lg'
                        : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 border-transparent hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-sm'
                    }`}>
                      <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        activeFeature === index
                          ? 'bg-primary-600 dark:bg-primary-500 scale-105'
                          : 'bg-primary-500 dark:bg-primary-600 group-hover:scale-105'
                      }`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold transition-colors duration-200 truncate ${
                          activeFeature === index
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-[rgb(var(--foreground))] group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }`}>
                          {category.title}
                        </h4>
                        <p className="text-sm text-[rgb(var(--foreground-secondary))] line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      <ArrowRight className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
                        activeFeature === index
                          ? 'text-primary-600 dark:text-primary-400 translate-x-1'
                          : 'text-[rgb(var(--foreground-secondary))] group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1'
                      }`} />
                    </div>
                  </motion.div>
                ))}
                
                {/* Progress Indicator */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-[rgb(var(--foreground-secondary))] mb-3">
                    <strong>Currently Viewing:</strong> {featureCategories[activeFeature]?.title}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((activeFeature + 1) / featureCategories.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-[rgb(var(--foreground-secondary))] mt-2">
                    {activeFeature + 1} of {featureCategories.length} features
                  </div>
                  <div className="text-xs text-[rgb(var(--foreground-secondary))] mt-1">
                    Left panel stays fixed while you scroll through features
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Scrollable Feature Details */}
            <div className="lg:col-span-3 space-y-16">
              {featureCategories.map((category, index) => (
                <div key={category.title} id={`feature-${index}`} className="scroll-mt-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    {/* Feature Header */}
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 dark:bg-primary-500 shadow-sm">
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-3xl font-bold text-[rgb(var(--foreground))]">{category.title}</h3>
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                            {category.features.length} Features
                          </span>
                        </div>
                        <p className="text-lg text-[rgb(var(--foreground-secondary))] leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
                      {category.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        >
                          <div className="group p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 border border-transparent hover:border-primary-200 dark:hover:border-primary-700">
                            <div className="flex items-start gap-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-800 border border-primary-200 dark:border-primary-700 group-hover:scale-105 transition-transform duration-200">
                                <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-[rgb(var(--foreground))] mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-lg">
                                  {feature.title}
                                </h4>
                                <p className="text-[rgb(var(--foreground-secondary))] leading-relaxed">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
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