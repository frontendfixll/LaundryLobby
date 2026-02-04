'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui'

const benefits = [
  'No setup fees',
  'Free demo',
  'Cancel anytime',
]

interface HeroSectionProps {
  /** Path to video file in public folder, e.g., "/videos/hero-bg.mp4" */
  videoSrc?: string
  /** Poster image shown before video loads */
  videoPoster?: string
}

export function HeroSection({ 
  videoSrc = '/videos/hero-bg.mp4',
  videoPoster = '/videos/hero-poster.jpg'
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={videoPoster}
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
      </div>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80" />

      {/* Content */}
      <div className="container-marketing section-padding relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
              🚀 New Platform Launch
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 text-display-md sm:text-display-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Launch Your Laundry Business{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Online in Minutes
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The complete laundry management platform. Streamline operations, 
            delight customers, and grow your business with our all-in-one solution.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/contact">
              <Button size="lg" className="group">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/features">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 hover:border-white"
              >
                Explore Features
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle className="h-4 w-4 text-secondary-400" />
                {benefit}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
