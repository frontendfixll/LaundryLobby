'use client'

import { motion } from 'framer-motion'
import { Check, TrendingUp, Users, Clock, Shield, Zap, Star } from 'lucide-react'

interface PlanBenefitsProps {
  selectedPlan?: string
}

const planBenefits = {
  free: {
    title: '🚀 Free Plan Benefits',
    subtitle: 'Perfect for getting started',
    color: 'from-gray-400 to-gray-600',
    benefits: [
      { icon: '📊', title: 'Up to 100 orders/month', description: 'Perfect for small operations' },
      { icon: '👥', title: '2 staff accounts', description: 'Basic team management' },
      { icon: '📱', title: 'Mobile access', description: 'Manage from anywhere' },
      { icon: '🔒', title: 'Secure & reliable', description: 'Bank-level security' },
    ]
  },
  basic: {
    title: '💼 Basic Plan Benefits',
    subtitle: 'Ideal for growing businesses',
    color: 'from-blue-400 to-blue-600',
    benefits: [
      { icon: '📈', title: 'Up to 500 orders/month', description: 'Handle more customers' },
      { icon: '👨‍💼', title: '5 staff accounts', description: 'Better team coordination' },
      { icon: '📊', title: 'Basic analytics', description: 'Track your performance' },
      { icon: '📧', title: 'Email support', description: 'Get help when needed' },
    ]
  },
  pro: {
    title: '⭐ Pro Plan Benefits',
    subtitle: 'Most popular choice for established businesses',
    color: 'from-purple-400 to-purple-600',
    benefits: [
      { icon: '🚀', title: 'Unlimited orders', description: 'No limits on growth' },
      { icon: '👥', title: '15 staff accounts', description: 'Full team management' },
      { icon: '🎨', title: 'Custom branding', description: 'Your brand, your way' },
      { icon: '📊', title: 'Advanced analytics', description: 'Deep business insights' },
      { icon: '📢', title: 'Marketing campaigns', description: 'Grow your customer base' },
      { icon: '🎁', title: 'Loyalty program', description: 'Reward your customers' },
    ]
  },
  enterprise: {
    title: '👑 Enterprise Plan Benefits',
    subtitle: 'Complete solution for large operations',
    color: 'from-amber-400 to-amber-600',
    benefits: [
      { icon: '🏢', title: 'Multi-location support', description: 'Manage all branches' },
      { icon: '🔗', title: 'API access', description: 'Custom integrations' },
      { icon: '🏷️', title: 'White label solution', description: 'Your brand only' },
      { icon: '🛠️', title: 'Custom domain', description: 'yourlaundry.com' },
      { icon: '📞', title: 'Priority support', description: '24/7 dedicated help' },
      { icon: '💼', title: 'Account manager', description: 'Personal success partner' },
    ]
  }
}

const generalBenefits = [
  {
    icon: <TrendingUp className="h-8 w-8 text-green-500" />,
    title: 'Increase Revenue',
    description: 'Streamline operations to boost your business growth',
    stat: 'Growth 📈'
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: 'Better Service',
    description: 'Provide excellent service with automated workflows',
    stat: 'Quality 🎯'
  },
  {
    icon: <Clock className="h-8 w-8 text-purple-500" />,
    title: 'Save Time',
    description: 'Automate routine tasks and focus on growth',
    stat: 'Efficient ⏰'
  },
  {
    icon: <Shield className="h-8 w-8 text-amber-500" />,
    title: 'Reduce Errors',
    description: 'Minimize mistakes with automated processes',
    stat: 'Reliable ✅'
  }
]

export function PlanBenefits({ selectedPlan }: PlanBenefitsProps) {
  const plan = selectedPlan && planBenefits[selectedPlan as keyof typeof planBenefits]

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-marketing">
        {/* Plan-specific benefits */}
        {plan && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
                {plan.title}
              </h2>
              <p className="text-lg text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
                {plan.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {plan.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[rgb(var(--foreground-muted))]">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* General business benefits */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-4">
              🚀 Why Choose LaundryLobby?
            </h2>
            <p className="text-lg text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
              Experience the power of modern laundry management technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[rgb(var(--foreground-muted))] mb-3">{benefit.description}</p>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{benefit.stat}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ⭐ Built for Modern Laundry Businesses
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              "Experience the future of laundry management with our comprehensive platform designed 
              to streamline operations and enhance customer satisfaction."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold">LaundryLobby Team</div>
                <div className="text-sm text-primary-200">Platform Developers</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}