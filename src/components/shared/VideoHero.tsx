'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface VideoHeroProps {
  /** Path to video file in public folder */
  videoSrc?: string
  /** Poster image shown before video loads */
  videoPoster?: string
  /** Main heading */
  title: ReactNode
  /** Subtitle/description */
  subtitle?: string
  /** Badge text shown above title */
  badge?: string
  /** Additional content below subtitle */
  children?: ReactNode
  /** Height of hero section */
  size?: 'sm' | 'md' | 'lg'
}

export function VideoHero({
  videoSrc = '/videos/hero-bg.mp4',
  videoPoster = '/videos/hero-poster.jpg',
  title,
  subtitle,
  badge,
  children,
  size = 'md'
}: VideoHeroProps) {
  const heightClass = {
    sm: 'min-h-[50vh]',
    md: 'min-h-[60vh]',
    lg: 'min-h-[90vh]'
  }[size]

  return (
    <section className={`relative overflow-hidden ${heightClass} flex items-center`}>
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80" />

      {/* Content */}
      <div className="container-marketing section-padding relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="mt-6 text-display-md sm:text-display-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
