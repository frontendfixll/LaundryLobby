'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Users, Shield, TrendingUp, Store, Monitor, Smartphone } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

const demoPortals = [
  {
    name: 'Customer Portal',
    description: 'Experience the customer journey from booking to pickup',
    features: ['Online booking', 'Order tracking', 'Loyalty rewards', 'Payment integration'],
    url: process.env.NEXT_PUBLIC_CUSTOMER_URL || 'http://localhost:3002',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    type: 'portal'
  },
  {
    name: 'Demo Tenant Portal',
    description: 'Example of a tenant-specific laundry portal',
    features: ['Branded experience', 'Custom domain', 'Tenant-specific features', 'Multi-tenancy'],
    url: 'https://tenacy.laundrylobby.com/dgsfg',
    icon: Store,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    type: 'portal'
  },
]

export function DemoShowcase() {
  const handleNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="section-padding bg-[rgb(var(--background-secondary))]">
      <div className="container-marketing">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 mb-4">
            <Monitor className="w-4 h-4 mr-2" />
            Live Demo Environment
          </span>
          <h2 className="text-display-sm sm:text-display-md text-[rgb(var(--foreground))] mb-4">
            Explore All LaundryLobby Portals
          </h2>
          <p className="text-lg text-[rgb(var(--foreground-secondary))] max-w-2xl mx-auto">
            Get hands-on experience with our complete platform. Each portal is designed for specific user roles and business needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {demoPortals.map((portal, index) => {
            const IconComponent = portal.icon
            return (
              <motion.div
                key={portal.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary-200 dark:hover:border-primary-800 flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${portal.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${portal.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-2">
                          {portal.name}
                        </h3>
                        <p className="text-[rgb(var(--foreground-secondary))] mb-4">
                          {portal.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 flex-grow">
                      <h4 className="text-sm font-medium text-[rgb(var(--foreground))] mb-3">
                        Key Features:
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {portal.features.map((feature) => (
                          <li key={feature} className="text-sm text-[rgb(var(--foreground-secondary))] flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <Button
                        onClick={() => handleNavigate(portal.url)}
                        className={`w-full bg-gradient-to-r ${portal.color} text-white border-0 hover:scale-105 transition-all duration-200`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        Open {portal.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <Smartphone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <div className="text-left">
              <p className="text-sm font-medium text-[rgb(var(--foreground))]">
                Mobile App Coming Soon
              </p>
              <p className="text-xs text-[rgb(var(--foreground-secondary))]">
                Native iOS & Android apps for customers and staff
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}