'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

export function CTASection() {
  return (
    <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300">
      <div className="container-marketing">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-500 dark:to-primary-700 px-6 py-16 sm:px-12 sm:py-20 lg:px-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Transform Your Laundry Business?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join hundreds of laundry businesses already using LaundryLobby to streamline 
              their operations and delight their customers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 h-14 px-8 text-lg bg-white text-primary-600 hover:bg-primary-50 shadow-sm hover:shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/features">
                <button
                  className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 h-14 px-8 text-lg border-2 border-white text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
