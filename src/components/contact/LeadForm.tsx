'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button, Input, Select, Textarea } from '@/components/ui'
import { leadFormSchema, type LeadFormValues } from '@/lib/validations'
import { submitLead } from '@/lib/api'

const businessTypeOptions = [
  { value: 'small_laundry', label: 'Small Laundry Shop' },
  { value: 'chain', label: 'Laundry Chain' },
  { value: 'dry_cleaner', label: 'Dry Cleaner' },
  { value: 'other', label: 'Other' },
]

const planOptions = [
  { value: 'undecided', label: 'Not sure yet' },
  { value: 'free', label: 'Free Plan' },
  { value: 'basic', label: 'Basic Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan' },
]

const orderVolumeOptions = [
  { value: '0-100', label: '0-100 orders/month' },
  { value: '100-500', label: '100-500 orders/month' },
  { value: '500-1000', label: '500-1,000 orders/month' },
  { value: '1000-5000', label: '1,000-5,000 orders/month' },
  { value: '5000+', label: '5,000+ orders/month' },
]

interface LeadFormProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  preselectedPlan?: string
  source?: 'website' | 'pricing_page' | 'referral' | 'other'
}

export function LeadForm({ onSuccess, onError, preselectedPlan, source = 'website' }: LeadFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showAddress, setShowAddress] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      businessType: undefined,
      interestedPlan: preselectedPlan as any || 'undecided',
      expectedMonthlyOrders: '0-100',
      currentBranches: 1,
      source,
      address: {
        country: 'India'
      }
    },
  })

  const onSubmit = async (data: LeadFormValues) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      const response = await submitLead(data)
      
      if (response.success) {
        setSubmitStatus('success')
        reset()
        onSuccess?.()
      } else {
        throw new Error(response.message || 'Failed to submit form')
      }
    } catch (error) {
      setSubmitStatus('error')
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      setErrorMessage(message)
      onError?.(error instanceof Error ? error : new Error(message))
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        className="rounded-2xl bg-secondary-50 dark:bg-secondary-900/30 p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900/50">
          <CheckCircle className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-[rgb(var(--foreground))]">
          Thank You!
        </h3>
        <p className="mt-2 text-[rgb(var(--foreground-secondary))]">
          We&apos;ve received your request. Our team will contact you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitStatus('idle')}
        >
          Submit Another Request
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus === 'error' && (
        <motion.div
          className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-300">Submission Failed</p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      {/* Contact Info */}
      <div className="space-y-4">
        <h4 className="font-medium text-[rgb(var(--foreground))]">Contact Information</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Your Name *"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <Input
          label="Phone Number *"
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Business Info */}
      <div className="space-y-4">
        <h4 className="font-medium text-[rgb(var(--foreground))]">Business Information</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Business Name *"
            placeholder="Your Laundry Business"
            error={errors.businessName?.message}
            {...register('businessName')}
          />
          <Select
            label="Business Type *"
            placeholder="Select type"
            options={businessTypeOptions}
            error={errors.businessType?.message}
            {...register('businessType')}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Expected Monthly Orders"
            options={orderVolumeOptions}
            {...register('expectedMonthlyOrders')}
          />
          <Input
            label="Current Branches"
            type="number"
            min={1}
            placeholder="1"
            {...register('currentBranches', { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Plan Interest */}
      <div className="space-y-4">
        <h4 className="font-medium text-[rgb(var(--foreground))]">Plan Interest</h4>
        <Select
          label="Which plan are you interested in?"
          options={planOptions}
          {...register('interestedPlan')}
        />
      </div>

      {/* Address (Collapsible) */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setShowAddress(!showAddress)}
          className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          {showAddress ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showAddress ? 'Hide' : 'Add'} Business Address (Optional)
        </button>
        
        {showAddress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 p-4 rounded-lg bg-[rgb(var(--muted))]"
          >
            <Input
              label="Address Line 1"
              placeholder="Street address"
              {...register('address.line1')}
            />
            <Input
              label="Address Line 2"
              placeholder="Apartment, suite, etc."
              {...register('address.line2')}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="City"
                placeholder="Mumbai"
                {...register('address.city')}
              />
              <Input
                label="State"
                placeholder="Maharashtra"
                {...register('address.state')}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Pincode"
                placeholder="400001"
                {...register('address.pincode')}
              />
              <Input
                label="Country"
                placeholder="India"
                {...register('address.country')}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Message */}
      <Textarea
        label="Additional Message (Optional)"
        placeholder="Tell us about your business and what you're looking for..."
        rows={3}
        error={errors.message?.message}
        {...register('message')}
      />

      <input type="hidden" {...register('source')} />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={submitStatus === 'loading'}
        disabled={submitStatus === 'loading'}
      >
        {submitStatus === 'loading' ? 'Submitting...' : 'Request a Demo'}
      </Button>

      <p className="text-center text-sm text-[rgb(var(--foreground-muted))]">
        By submitting this form, you agree to be contacted by our sales team.
      </p>
    </form>
  )
}
