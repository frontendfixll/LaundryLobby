'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function PaymentSuccessPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = params.token as string
  const sessionId = searchParams.get('session_id')

  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<{
    transactionId: string
    amount: number
    plan: string
  } | null>(null)

  useEffect(() => {
    if (sessionId) {
      verifyPayment()
    } else {
      setError('Invalid session')
      setVerifying(false)
    }
  }, [sessionId])

  const verifyPayment = async () => {
    try {
      const response = await fetch(`${API_URL}/public/pay/${token}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setVerified(true)
        setPaymentDetails(data.data)
      } else {
        setError(data.message || 'Failed to verify payment')
      }
    } catch (err) {
      setError('Failed to verify payment')
    } finally {
      setVerifying(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-spin" />
          <h1 className="text-xl font-semibold text-[rgb(var(--foreground))]">
            Verifying your payment...
          </h1>
          <p className="text-[rgb(var(--foreground-muted))] mt-2">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-4 w-20 h-20 mx-auto mb-6">
            <Loader2 className="h-12 w-12 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
            Verification Pending
          </h1>
          <p className="text-[rgb(var(--foreground-muted))] mb-6">
            {error}. If you completed the payment, it will be processed shortly.
          </p>
          <Button onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 w-20 h-20 mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
          Payment Successful!
        </h1>
        
        <p className="text-[rgb(var(--foreground-muted))] mb-6">
          Thank you for your payment. Our team will set up your account and contact you within 24 hours.
        </p>

        {paymentDetails && (
          <div className="bg-[rgb(var(--muted))] rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Amount Paid</span>
                <span className="font-semibold text-[rgb(var(--foreground))]">
                  {formatCurrency(paymentDetails.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Plan</span>
                <span className="font-semibold text-[rgb(var(--foreground))] capitalize">
                  {paymentDetails.plan}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(var(--foreground-muted))]">Transaction ID</span>
                <span className="font-mono text-xs text-[rgb(var(--foreground))]">
                  {paymentDetails.transactionId?.slice(0, 20)}...
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button onClick={() => router.push('/')} className="w-full">
            Back to Home
          </Button>
          <p className="text-xs text-[rgb(var(--foreground-muted))]">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
