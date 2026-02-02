'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import { LeadForm } from '@/components/contact'
import { PlanBenefits } from '@/components/shared'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@LaundryLobby.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 98765 43210',
    description: 'Mon-Sat, 9am-6pm IST',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'Mumbai, India',
    description: 'Visit by appointment',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    description: 'For demo requests',
  },
]

export default function ContactPage() {
  const searchParams = useSearchParams()
  const preselectedPlan = searchParams.get('plan') || undefined
  const isBuyNow = searchParams.get('buyNow') === 'true'
  const source = preselectedPlan ? 'pricing_page' : 'website'

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white dark:from-slate-900 dark:to-[rgb(var(--background))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-display-md text-[rgb(var(--foreground))]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let&apos;s Talk About{' '}
              <span className="gradient-text">Your Business</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-[rgb(var(--foreground-secondary))]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to transform your laundry business? Fill out the form below
              and our team will get in touch to schedule a personalized demo.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                Get in Touch
              </h2>
              <p className="mt-3 text-[rgb(var(--foreground-secondary))]">
                Have questions? We&apos;re here to help. Reach out through any of
                these channels or fill out the form.
              </p>

              <div className="mt-8 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40">
                      <item.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-[rgb(var(--foreground))]">{item.title}</p>
                      <p className="text-[rgb(var(--foreground))]">{item.value}</p>
                      <p className="text-sm text-[rgb(var(--foreground-muted))]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-6">
                    {isBuyNow ? 'Confirm Your Plan' : 'Request a Demo'}
                    {preselectedPlan && (
                      <span className="ml-2 text-sm font-normal text-primary-600 dark:text-primary-400">
                        ({preselectedPlan.charAt(0).toUpperCase() + preselectedPlan.slice(1)} Plan)
                      </span>
                    )}
                  </h3>
                  <LeadForm preselectedPlan={preselectedPlan} source={source as any} isBuyNow={isBuyNow} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plan Benefits Section */}
      {preselectedPlan && (
        <PlanBenefits selectedPlan={preselectedPlan} />
      )}
    </>
  )
}
