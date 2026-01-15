'use client'

import { motion } from 'framer-motion'
import { 
  ClipboardList, 
  Gift, 
  Megaphone, 
  Smartphone, 
  BarChart3, 
  Users 
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui'

const features = [
  {
    icon: ClipboardList,
    title: 'Order Management',
    description: 'Track orders from pickup to delivery with real-time status updates and barcode scanning.',
  },
  {
    icon: Gift,
    title: 'Customer Loyalty',
    description: 'Reward repeat customers with points, tiers, and exclusive offers to boost retention.',
  },
  {
    icon: Megaphone,
    title: 'Campaigns & Promotions',
    description: 'Create targeted campaigns with banners, discounts, and seasonal promotions.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Give customers a branded mobile app for easy ordering and order tracking.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Make data-driven decisions with comprehensive business analytics and insights.',
  },
  {
    icon: Users,
    title: 'Multi-Branch Support',
    description: 'Manage multiple locations from a single dashboard with branch-level controls.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function FeaturesOverview() {
  return (
    <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300 relative">
      {/* Top gradient to blend with hero video */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 to-transparent dark:from-black/40 pointer-events-none" />
      
      <div className="container-marketing relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-display-sm text-[rgb(var(--foreground))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need to{' '}
            <span className="gradient-text">Run Your Business</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-[rgb(var(--foreground-secondary))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Powerful features designed specifically for laundry and dry cleaning businesses.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card hover className="h-full">
                <CardContent>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40">
                    <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[rgb(var(--foreground))]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[rgb(var(--foreground-secondary))]">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
