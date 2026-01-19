'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--background))]/80 transition-colors duration-300">
      <nav className="container-marketing flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[rgb(var(--foreground))]">LaundryLobby</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-[rgb(var(--foreground-secondary))] hover:text-[rgb(var(--foreground))]'
              )}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <ThemeToggle />
          <Link href="/contact">
            <Button size="sm">Request Demo</Button>
          </Link>
        </div>

        {/* Mobile: Theme Toggle & Menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-[rgb(var(--foreground-secondary))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-down border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]">
          <div className="container-marketing py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-lg px-4 py-2 text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-[rgb(var(--foreground-secondary))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
                )}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Request Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
