'use client'

import React from 'react'
import { ArrowRight, CheckCircle, Zap, Shield, Users } from 'lucide-react'
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
    name: 'Sample Business',
    business: 'Modern Laundry',
    location: 'Demo',
    quote: 'Campaign Manager add-on helps increase customer retention with targeted marketing campaigns.',
    addon: 'Campaign Manager'
  },
  {
    name: 'Demo Account',
    business: 'Express Wash',
    location: 'Demo',
    quote: 'SMS notifications keep customers informed about their order status in real-time.',
    addon: 'SMS Pack'
  },
  {
    name: 'Test User',
    business: 'Quick Clean Services',
    location: 'Demo',
    quote: 'Extra Branch add-on enables seamless multi-location management from one dashboard.',
    addon: 'Extra Branch'
  }
]

export function AddOnsCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose LaundryPro Add-ons?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our add-ons are designed by laundry industry experts to solve real business challenges
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Built for Growing Laundry Businesses
            </h3>
            <p className="text-gray-600">Discover how our add-ons can transform your operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.business}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-blue-600 font-medium">Using</div>
                        <div className="text-sm font-semibold text-gray-900">{testimonial.addon}</div>
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
            Start your laundry business journey with our comprehensive platform designed to help you grow and succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-90">
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
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600">Everything you need to know about LaundryPro add-ons</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'How quickly do add-ons activate?',
                answer: 'Add-ons activate instantly after successful payment. You can start using them immediately without any setup or configuration required.'
              },
              {
                question: 'Can I cancel add-ons anytime?',
                answer: 'Yes, you can cancel any add-on from your billing dashboard. The add-on will remain active until the end of your current billing period.'
              },
              {
                question: 'Do add-ons work with all plans?',
                answer: 'Most add-ons are compatible with all plans. Some advanced add-ons may require specific plan tiers, which will be clearly mentioned.'
              },
              {
                question: 'Is there a limit to how many add-ons I can purchase?',
                answer: 'No, you can purchase as many add-ons as you need. Some add-ons like "Extra Branch" can be purchased multiple times to scale your business.'
              },
              {
                question: 'Do you offer discounts for multiple add-ons?',
                answer: 'Yes, we offer bundle discounts when you purchase multiple add-ons together. Contact our sales team for custom pricing.'
              },
              {
                question: 'What support is included with add-ons?',
                answer: 'All add-ons include standard support. You can upgrade to Priority Support add-on for faster response times and dedicated assistance.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}