'use client'

import { ExternalLink, Users, Shield, TrendingUp, Store } from 'lucide-react'
import { Button } from '@/components/ui'

const demoApps = [
  {
    name: 'Customer Portal',
    description: 'Customer-facing laundry booking platform',
    url: process.env.NEXT_PUBLIC_CUSTOMER_URL || 'http://localhost:3002',
    icon: Users,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    name: 'Super Admin',
    description: 'Complete system administration',
    url: process.env.NEXT_PUBLIC_SUPERADMIN_URL || 'http://localhost:3003',
    icon: Shield,
    color: 'bg-red-500 hover:bg-red-600',
  },
  {
    name: 'Sales Portal',
    description: 'Sales team management dashboard',
    url: process.env.NEXT_PUBLIC_SALES_URL || 'http://localhost:3005',
    icon: TrendingUp,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    name: 'Demo Tenant',
    description: 'Example tenant laundry portal',
    url: `https://demo-laundry.${process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'laundrypro.com'}`,
    icon: Store,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
]

export function DemoNavigation() {
  const handleNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-b border-[rgb(var(--border))]">
      <div className="container-marketing py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-1">
              🚀 Demo Environment
            </h3>
            <p className="text-sm text-[rgb(var(--foreground-secondary))]">
              Explore all LaundryLobby portals - Click any button to open in a new tab
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {demoApps.map((app) => {
              const IconComponent = app.icon
              return (
                <Button
                  key={app.name}
                  onClick={() => handleNavigate(app.url)}
                  className={`${app.color} text-white border-0 hover:scale-105 transition-all duration-200 text-xs sm:text-sm px-3 py-2 h-auto`}
                  size="sm"
                  title={app.description}
                >
                  <IconComponent className="w-4 h-4 mr-1.5" />
                  {app.name}
                  <ExternalLink className="w-3 h-3 ml-1.5" />
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}