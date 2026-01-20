import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import NotificationManager from '@/components/notifications/NotificationManager'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'LaundryLobby - Complete Laundry Management Platform',
  description: 'Streamline your laundry business with our all-in-one management platform. Order management, customer loyalty, campaigns, mobile app, and analytics.',
  keywords: ['laundry management', 'laundry software', 'dry cleaning software', 'laundry business'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <NotificationManager />
      </body>
    </html>
  )
}
