'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Users, Shield, TrendingUp, Store, Monitor, Smartphone, Building2, LogIn } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'
import { useState } from 'react'

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
    url: `https://demo-laundry.${process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'laundrypro.com'}`,
    icon: Store,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    type: 'portal'
  },
  {
    name: 'Tenant Admin Login',
    description: 'Access any tenant\'s admin portal by entering the tenant slug',
    features: ['Tenant-specific admin access', 'Custom branding & settings', 'Order & customer management', 'Analytics & reports'],
    url: '',
    icon: Building2,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    type: 'tenant-login'
  },
]

export function DemoShowcase() {
  const [tenantSlug, setTenantSlug] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleTenantLogin = async () => {
    if (!tenantSlug.trim()) {
      alert('Please enter tenant slug')
      return
    }

    setIsLoading(true)
    
    try {
      // Construct the tenant URL
      const baseUrl = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3002'
      const tenantUrl = `https://${tenantSlug}.${baseUrl}/auth/login`
      
      // For localhost development
      if (baseUrl.includes('localhost')) {
        const localUrl = `http://localhost:3002/auth/login?tenant=${tenantSlug}`
        window.open(localUrl, '_blank', 'noopener,noreferrer')
      } else {
        window.open(tenantUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error('Error opening tenant login:', error)
      alert('Error opening tenant login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTenantLogin()
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary-200 dark:hover:border-primary-800">
                  <CardContent className="p-6">
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

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-[rgb(var(--foreground))] mb-3">
                        {portal.type === 'tenant-login' ? 'Features:' : 'Key Features:'}
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {portal.features.map((feature) => (
                          <li key={feature} className="text-sm text-[rgb(var(--foreground-secondary))] flex items-center">
                            <div className={`w-1.5 h-1.5 ${portal.type === 'tenant-login' ? 'bg-green-500' : 'bg-primary-500'} rounded-full mr-2 flex-shrink-0`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {portal.type === 'tenant-login' ? (
                      <div className="space-y-3">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2">
                          <Building2 className="w-4 h-4 text-gray-500 mr-2" />
                          <input
                            type="text"
                            placeholder="Enter tenant slug"
                            value={tenantSlug}
                            onChange={(e) => setTenantSlug(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="bg-transparent border-none outline-none text-sm flex-1 placeholder-gray-500 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        
                        <Button
                          onClick={handleTenantLogin}
                          disabled={isLoading || !tenantSlug.trim()}
                          className={`w-full bg-gradient-to-r ${portal.color} text-white border-0 hover:scale-105 transition-all duration-200`}
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          ) : (
                            <LogIn className="w-4 h-4 mr-2" />
                          )}
                          Access Tenant Admin
                          {!isLoading && <ExternalLink className="w-4 h-4 ml-2" />}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleNavigate(portal.url)}
                        className={`w-full bg-gradient-to-r ${portal.color} text-white border-0 hover:scale-105 transition-all duration-200`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        Open {portal.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}
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