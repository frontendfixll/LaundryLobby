'use client'

import { motion } from 'framer-motion'
import { Store, Building2, Sparkles, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'

const audiences = [
  {
    icon: Store,
    title: 'Small Laundries',
    description: 'Perfect for neighborhood laundry shops looking to digitize operations.',
    features: [
      'Easy setup in minutes',
      'Affordable pricing',
      'Simple order management',
      'Customer loyalty program',
    ],
  },
  {
    icon: Building2,
    title: 'Laundry Chains',
    description: 'Scale your multi-location business with centralized management.',
    features: [
      'Multi-branch dashboard',
      'Centralized reporting',
      'Staff management',
      'Inventory tracking',
    ],
  },
  {
    icon: Sparkles,
    title: 'Dry Cleaners',
    description: 'Specialized features for premium dry cleaning services.',
    features: [
      'Premium service tracking',
      'Special care instructions',
      'VIP customer tiers',
      'Detailed item tracking',
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function AudienceSection() {
  return (
    <section className="section-padding bg-[rgb(var(--background-secondary))] transition-colors duration-300">
      <div className="container-marketing">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-display-sm text-[rgb(var(--foreground))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Built for{' '}
            <span className="gradient-text">Every Laundry Business</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-[rgb(var(--foreground-secondary))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Whether you&apos;re a small shop or a growing chain, we have the right solution for you.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 grid gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {audiences.map((audience) => (
            <motion.div key={audience.title} variants={itemVariants}>
              <Card className="h-full border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-700 transition-colors">
                <CardContent className="p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
                    <audience.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[rgb(var(--foreground))]">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-[rgb(var(--foreground-secondary))]">
                    {audience.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {audience.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary-500 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[rgb(var(--foreground-secondary))]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
