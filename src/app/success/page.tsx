'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Download, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const planName = searchParams.get('plan')
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      fetchPaymentDetails()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/payment-success/${sessionId}`)
      const data = await response.json()
      
      if (data.success) {
        setPaymentDetails(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch payment details:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Email',
      description: 'We\'ve sent you a confirmation email with your receipt and next steps.',
    },
    {
      icon: Calendar,
      title: 'Schedule Onboarding',
      description: 'Our team will contact you within 24 hours to schedule your setup call.',
    },
    {
      icon: Download,
      title: 'Access Your Dashboard',
      description: 'You\'ll receive login credentials and access to your admin dashboard.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/10 dark:to-[rgb(var(--background))] py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[rgb(var(--foreground))] mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-[rgb(var(--foreground-secondary))] mb-2">
            Welcome to LaundryLobby!
          </p>
          {paymentDetails && (
            <p className="text-[rgb(var(--foreground-muted))]">
              Order #{paymentDetails.orderId} • {paymentDetails.planName} Plan
            </p>
          )}
        </motion.div>

        {/* Payment Details Card */}
        {paymentDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[rgb(var(--card))] rounded-2xl p-6 border border-[rgb(var(--border))] shadow-lg mb-8"
          >
            <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-4">
              Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Plan:</span>
                <span className="font-medium text-[rgb(var(--foreground))]">
                  {paymentDetails.planDisplayName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Billing:</span>
                <span className="font-medium text-[rgb(var(--foreground))]">
                  {paymentDetails.billingCycle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Amount:</span>
                <span className="font-medium text-[rgb(var(--foreground))]">
                  ₹{paymentDetails.amount?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Email:</span>
                <span className="font-medium text-[rgb(var(--foreground))]">
                  {paymentDetails.customerEmail}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-6">
            What happens next?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <div
                key={step.title}
                className="bg-[rgb(var(--card))] rounded-xl p-6 border border-[rgb(var(--border))]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-lg mb-4 mx-auto">
                  <step.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[rgb(var(--foreground-muted))]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact">
            <Button size="lg" className="w-full sm:w-auto">
              Contact Support
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Need help?</strong> Our support team is available 24/7 at{' '}
            <a href="mailto:support@laundrylobby.com" className="underline">
              support@laundrylobby.com
            </a>{' '}
            or call us at{' '}
            <a href="tel:+919876543210" className="underline">
              +91 98765 43210
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}