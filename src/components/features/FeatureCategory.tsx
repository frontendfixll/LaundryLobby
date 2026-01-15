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
    <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
      <motion.div
        className={reversed ? 'lg:order-2' : ''}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-[rgb(var(--foreground))]">{title}</h3>
        <p className="mt-3 text-lg text-[rgb(var(--foreground-secondary))]">{description}</p>
      </motion.div>

      <div className={`space-y-6 ${reversed ? 'lg:order-1' : ''}`}>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  )
}
