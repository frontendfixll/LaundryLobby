'use client'

import Link from 'next/link'
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Request Demo', href: '/contact' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background-secondary))] transition-colors duration-300">
      <div className="container-marketing py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[rgb(var(--foreground))]">LaundryLobby</span>
            </Link>
            <p className="mt-4 max-w-md text-[rgb(var(--foreground-secondary))]">
              The complete laundry management platform. Streamline operations, 
              delight customers, and grow your business with our all-in-one solution.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[rgb(var(--foreground-secondary))]">
                <Mail className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span>contact@LaundryLobby.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[rgb(var(--foreground-secondary))]">
                <Phone className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[rgb(var(--foreground-secondary))]">
                <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgb(var(--foreground-secondary))] hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgb(var(--foreground-secondary))] hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[rgb(var(--border))] pt-8">
          <p className="text-center text-sm text-[rgb(var(--foreground-muted))]">
            © {new Date().getFullYear()} LaundryLobby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
