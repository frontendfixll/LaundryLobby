'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    videoSrc: '/videos/small-laundries.mp4',
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
    videoSrc: '/videos/laundry-chains.mp4',
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
    videoSrc: '/videos/dry-cleaners.mp4',
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
  const [activeIndex, setActiveIndex] = useState(0)
  const activeVideo = audiences[activeIndex].videoSrc

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

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — 3 stacked cards */}
          <motion.div
            className="flex flex-col gap-6 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {audiences.map((audience, index) => {
              const isActive = activeIndex === index
              return (
                <motion.div key={audience.title} variants={itemVariants}>
                  <Card
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`h-full cursor-pointer border-2 transition-colors ${
                      isActive
                        ? 'border-primary-500 dark:border-primary-400 shadow-lg'
                        : 'border-transparent hover:border-primary-200 dark:hover:border-primary-700'
                    }`}
                  >
                    <CardContent className="p-6 sm:p-8">
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
              )
            })}
          </motion.div>

          {/* RIGHT — video that swaps with the active card */}
          <motion.div
            className="order-1 lg:order-2 lg:sticky lg:top-24"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
              <AnimatePresence mode="wait">
                <motion.video
                  key={activeVideo}
                  src={activeVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
