'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, ArrowRight, Mail, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'

interface SignupStatus {
  status: 'pending' | 'payment_processing' | 'completed' | 'failed' | 'expired'
  businessName?: string
  email?: string
  planName?: string
  tenancy?: string
}

export default function SignupSuccessPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const sessionId = searchParams.get('session_id')
  const isFree = searchParams.get('free') === 'true'
  const email = searchParams.get('email')

  const [status, setStatus] = useState<SignupStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isFree) {
      // Free plan - account already created
      setStatus({
        status: 'completed',
        email: email || ''
      })
      setLoading(false)
    } else if (token && sessionId) {
      // Paid plan - verify payment
      verifyPayment()
    } else if (token) {
      // Check status
      checkStatus()
    } else {
      setError('Invalid signup link')
      setLoading(false)
    }
  }, [token, sessionId, isFree])

  const verifyPayment = async () => {
    setVerifying(true)
    try {
      const response = await fetch(`${API_URL}/public/signup/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, sessionId })
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          status: 'completed',
          businessName: data.data.tenancy?.name,
          email: data.data.user?.email
        })
      } else {
        setError(data.message || 'Failed to verify payment')
        // Still check status
        await checkStatus()
      }
    } catch (err) {
      setError('Failed to verify payment. Please contact support.')
      await checkStatus()
    } finally {
      setVerifying(false)
      setLoading(false)
    }
  }

  const checkStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/public/signup/status/${token}`)
      const data = await response.json()

      if (data.success) {
        setStatus(data.data)
      }
    } catch (err) {
      console.error('Failed to check status:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading || verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--background))] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
        <p className="text-[rgb(var(--foreground-muted))]">
          {verifying ? 'Verifying your payment...' : 'Loading...'}
        </p>
      </div>
    )
  }

  if (error && status?.status !== 'completed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--background))] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
            Something Went Wrong
          </h1>
          <p className="text-[rgb(var(--foreground-muted))] mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                Back to Pricing
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (status?.status === 'completed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--background))] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-2">
            Welcome to LaundryLobby!
          </h1>
          <p className="text-lg text-[rgb(var(--foreground-muted))] mb-8">
            Your account has been created successfully.
          </p>

          {status.businessName && (
            <div className="bg-[rgb(var(--muted))] rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-[rgb(var(--foreground-muted))]">Business Name</p>
              <p className="font-semibold text-[rgb(var(--foreground))]">{status.businessName}</p>
            </div>
          )}

          {status.email && (
            <div className="flex items-center justify-center gap-2 text-[rgb(var(--foreground-muted))] mb-8">
              <Mail className="h-4 w-4" />
              <span>Login credentials sent to {status.email}</span>
            </div>
          )}

          <div className="space-y-3">
            <a href={`${FRONTEND_URL}/auth/login`}>
              <Button className="w-full group">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <p className="text-sm text-[rgb(var(--foreground-muted))]">
              Use your email and password to login
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-[rgb(var(--border))]">
            <h3 className="font-medium text-[rgb(var(--foreground))] mb-3">What&apos;s Next?</h3>
            <ul className="text-sm text-[rgb(var(--foreground-muted))] space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">1.</span>
                Login to your admin dashboard
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">2.</span>
                Set up your services and pricing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">3.</span>
                Add your staff members
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold">4.</span>
                Start accepting orders!
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    )
  }

  // Pending or processing state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--background))] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-2">
          Processing Your Signup
        </h1>
        <p className="text-[rgb(var(--foreground-muted))] mb-6">
          Please wait while we set up your account...
        </p>
        <p className="text-sm text-[rgb(var(--foreground-muted))]">
          This usually takes just a few seconds.
        </p>
      </motion.div>
    </div>
  )
}
