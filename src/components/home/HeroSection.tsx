'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui'

interface HeroSectionProps {
  /** Path to video in public folder, e.g., "/videos/hero-bg.mp4" */
  videoSrc?: string
  videoPoster?: string
}

export function HeroSection({
  videoSrc = '/videos/hero-bg.mp4',
  videoPoster,
}: HeroSectionProps) {
  return (
    <section className="relative flex items-center overflow-hidden">
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
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="container-marketing relative z-10 py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            One system powering your{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              entire
            </span>{' '}
            laundry business
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The most integrated laundry and dry cleaning business management
            system in the industry.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/features">
              <Button size="lg" className="group rounded-full px-7">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white bg-white/10 px-7 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Schedule a Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-primary-400 text-primary-400"
                />
              ))}
            </div>
            <span className="text-sm text-white/80">
              #1 rated by customer reviews
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
