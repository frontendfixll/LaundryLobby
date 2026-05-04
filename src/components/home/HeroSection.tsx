'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui'

interface HeroSectionProps {
  /** Path to image in public folder, e.g., "/images/hero.jpg" */
  imageSrc?: string
  imageAlt?: string
}

export function HeroSection({
  imageSrc = '/images/hero.png',
  imageAlt = 'Laundry business owner using LaundryLobby management system',
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gray-100 dark:bg-[rgb(var(--background))]">

      <div className="container-marketing relative pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — content */}
          <div>
            <motion.h1
              className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              One system powering your{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                entire
              </span>{' '}
              laundry business
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The most integrated laundry and dry cleaning business management
              system in the industry.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
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
                  className="rounded-full border-2 border-primary-600 px-7 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950/30"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                #1 rated by customer reviews
              </span>
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
