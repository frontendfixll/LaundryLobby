'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { FeatureCard } from './FeatureCard'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureCategoryProps {
  icon: LucideIcon
  title: string
  description: string
  features: Feature[]
  reversed?: boolean
}

export function FeatureCategory({ 
  icon: Icon, 
  title, 
  description, 
  features,
  reversed = false 
}: FeatureCategoryProps) {
  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:gap-16 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
      <motion.div
        className={`${reversed ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Horizontal layout - icon with content beside it */}
        <div className="flex items-start gap-4">
          <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-md">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">{title}</h3>
            <p className="text-base text-[rgb(var(--foreground-secondary))] leading-relaxed">{description}</p>
          </div>
        </div>
      </motion.div>

      <div className={`space-y-3 ${reversed ? 'lg:order-1' : ''}`}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
