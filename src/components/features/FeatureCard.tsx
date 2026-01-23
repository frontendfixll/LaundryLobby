'use client'

import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 border border-primary-200/50 dark:border-primary-700/50">
        <Icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-[rgb(var(--foreground))] mb-1">{title}</h4>
        <p className="text-sm text-[rgb(var(--foreground-secondary))] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
