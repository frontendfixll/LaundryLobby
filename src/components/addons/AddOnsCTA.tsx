'use client'

import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Zap, Shield, Users, ChevronDown, Crown, CreditCard, Clock, RefreshCw } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

const benefits = [
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Add-ons activate immediately after purchase with no setup required'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'All add-ons follow enterprise-grade security and compliance standards'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Get dedicated support for all your add-ons from our expert team'
  }
]

const testimonials = [
  {
    name: 'Rajesh Kumar',
    business: 'SparkClean Laundry',
    location: 'Mumbai',
    quote: 'The Campaign Manager add-on increased our repeat customers by 35% in just 2 months. Best investment we made!',
    addon: 'Campaign Manager',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    business: 'FreshWash Express',
    location: 'Delhi',
    quote: 'SMS notifications keep our customers informed. Complaints about missed pickups dropped by 80%.',
    addon: 'SMS Pack',
    rating: 5
  },
  {
    name: 'Amit Patel',
    business: 'QuickClean Services',
    location: 'Bangalore',
    quote: 'We started on the Free plan, added the Loyalty program, and saw 60% more returning customers within weeks.',
    addon: 'Loyalty & Rewards',
    rating: 5
  }
]

const faqs = [
  {
    question: 'Can I use add-ons on the Free plan?',
    answer: 'Yes! Many of our add-ons like SMS Credits, Loyalty & Rewards, Campaigns, and more are available on the Free plan. You can start using them right away without upgrading your subscription plan.'
  },
  {
    question: 'How quickly do add-ons activate?',
    answer: 'Add-ons activate instantly after successful payment. You can start using them immediately without any setup or configuration required.'
  },
  {
    question: 'Can I cancel add-ons anytime?',
    answer: 'Yes, you can cancel any add-on from your billing dashboard. The add-on will remain active until the end of your current billing period. No cancellation fees.'
  },
  {
    question: 'Do add-ons work with all plans?',
    answer: 'Most add-ons are compatible with all plans including Free. Some premium add-ons like API Access require higher-tier plans, which is clearly marked on each add-on card.'
  },
  {
    question: 'Is there a free trial for add-ons?',
    answer: 'Yes! Several add-ons offer 7-14 day free trials. Look for the "trial" badge on add-on cards. You won\'t be charged until the trial period ends.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and bank transfers through our secure Stripe payment gateway. All transactions are encrypted and PCI-DSS compliant.'
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
      >
        <h4 className="font-semibold text-gray-900 dark:text-white pr-4">{question}</h4>
        <ChevronDown className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export function AddOnsCTA() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Add-ons?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Designed by laundry industry experts to solve real business challenges
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Crown, label: 'Free Plan Add-ons', value: '6+' },
            { icon: Clock, label: 'Instant Setup', value: '0 min' },
            { icon: CreditCard, label: 'Secure Payments', value: 'Stripe' },
            { icon: RefreshCw, label: 'Cancel Anytime', value: 'No Lock-in' }
          ].map((signal, i) => (
            <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <signal.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="font-bold text-gray-900 dark:text-white text-lg">{signal.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{signal.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Growing Laundry Businesses
            </h3>
            <p className="text-gray-600 dark:text-gray-400">See how add-ons are transforming operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.business}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">{testimonial.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Using</div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.addon}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Supercharge Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start with our Free plan and add powerful features as you grow. No forced upgrades, no hidden fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="/contact?plan=free">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg w-full sm:w-auto">
                Schedule Demo
              </Button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Free plan add-ons
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to know about our add-ons</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
