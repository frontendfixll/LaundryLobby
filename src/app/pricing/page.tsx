import Link from 'next/link'
import { ArrowRight, Sparkles, Users, TrendingUp, Shield, Package, Database, Smartphone, Lock, Building, Megaphone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui'
import { VideoHero } from '@/components/shared'
import { PricingInteractive } from '@/components/pricing/PricingInteractive'
import { mockBillingPlans } from '@/lib/mockData'

interface BillingPlan {
  _id: string
  name: string
  displayName: string
  description?: string
  price: { monthly: number; yearly: number }
  features: Record<string, boolean | number>
  isPopular?: boolean
  badge?: string
}

const PLAN_ORDER: Record<string, number> = { free: 0, basic: 1, pro: 2, enterprise: 3 }

async function fetchPlans(): Promise<BillingPlan[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
  try {
    const res = await fetch(`${apiUrl}/public/billing/plans`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (!data.success || !data.data?.plans) throw new Error('Invalid response')
    return data.data.plans
      .map((plan: BillingPlan) => ({
        ...plan,
        isPopular: plan.name === 'pro',
        badge: plan.name === 'pro' ? 'Most Popular' : plan.name === 'enterprise' ? 'Best Value' : undefined,
      }))
      .sort((a: BillingPlan, b: BillingPlan) =>
        (PLAN_ORDER[a.name] ?? 999) - (PLAN_ORDER[b.name] ?? 999)
      )
  } catch {
    return [...mockBillingPlans].sort(
      (a, b) => (PLAN_ORDER[a.name] ?? 999) - (PLAN_ORDER[b.name] ?? 999)
    )
  }
}

export default async function PricingPage() {
  const plans = await fetchPlans()

  return (
    <>
      <VideoHero
        videoSrc="/videos/hero-bg.mp4"
        videoPoster="/videos/hero-poster.jpg"
        size="sm"
        title={
          <>
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </>
        }
        subtitle="Choose the plan that fits your business. No hidden fees, cancel anytime."
      />

      <section className="section-padding bg-[rgb(var(--background))] transition-colors duration-300">
        <div className="container-marketing">
          {/* Interactive: billing toggle + plan cards + feature comparison */}
          <PricingInteractive plans={plans} />

          {/* What's Included */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-3">
                What&apos;s Included in Every Plan
              </h2>
              <p className="text-base text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
                All plans include our core laundry management features. Higher plans unlock advanced capabilities.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FeatureCard
                icon={<Package className="h-6 w-6 text-blue-500" />}
                title="Order Management"
                description="Complete order tracking from pickup to delivery"
                included="All Plans"
              />
              <FeatureCard
                icon={<Database className="h-6 w-6 text-green-500" />}
                title="Customer Database"
                description="Manage customer information and preferences"
                included="All Plans"
              />
              <FeatureCard
                icon={<Smartphone className="h-6 w-6 text-purple-500" />}
                title="Mobile Access"
                description="Access your dashboard from any device"
                included="All Plans"
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6 text-amber-500" />}
                title="Secure & Reliable"
                description="Bank-level security with robust infrastructure"
                included="All Plans"
              />
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-3">
                Enhance Your Plan with Add-ons
              </h2>
              <p className="text-base text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
                Need extra features or capacity? Browse our marketplace of professional add-ons to customize your plan exactly how you want it.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <AddOnPreviewCard
                icon={<Building className="h-6 w-6 text-blue-500" />}
                title="Extra Branch"
                description="Add additional branch locations to expand your business"
                price="₹499/month"
                popular
              />
              <AddOnPreviewCard
                icon={<Megaphone className="h-6 w-6 text-orange-500" />}
                title="Campaign Manager"
                description="Create promotional campaigns and boost customer engagement"
                price="₹799/month"
                popular
              />
              <AddOnPreviewCard
                icon={<MessageSquare className="h-6 w-6 text-green-500" />}
                title="SMS Pack (1000)"
                description="Send SMS notifications to customers for order updates"
                price="₹300 one-time"
                popular={false}
              />
            </div>
            <div className="text-center">
              <Link href="/addons">
                <Button size="lg" variant="outline" className="group">
                  Browse All Add-ons
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Business Benefits */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] mb-3">
                Why Choose LaundryLobby?
              </h2>
              <p className="text-base text-[rgb(var(--foreground-muted))] max-w-2xl mx-auto">
                Experience the power of modern laundry management technology
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <BenefitCard
                icon={<TrendingUp className="h-6 w-6 text-green-500" />}
                title="Increase Revenue"
                description="Streamline operations to boost your business growth"
                stat="Growth 📈"
              />
              <BenefitCard
                icon={<Users className="h-6 w-6 text-blue-500" />}
                title="Better Service"
                description="Provide excellent service with automated workflows"
                stat="Quality 🎯"
              />
              <BenefitCard
                icon={<Sparkles className="h-6 w-6 text-purple-500" />}
                title="Save Time"
                description="Automate routine tasks and focus on growth"
                stat="Efficient ⏰"
              />
              <BenefitCard
                icon={<Shield className="h-6 w-6 text-amber-500" />}
                title="Reduce Errors"
                description="Minimize mistakes with automated processes"
                stat="Reliable ✅"
              />
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[rgb(var(--foreground))] mb-3">
                Need a Custom Enterprise Solution?
              </h3>
              <p className="text-[rgb(var(--foreground-muted))] mb-4 max-w-2xl mx-auto text-sm">
                For large chains, franchises, or businesses with unique requirements, we offer custom enterprise solutions with dedicated support, custom integrations, and flexible pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact?plan=enterprise">
                  <Button size="md" className="bg-gradient-to-r from-primary-600 to-secondary-600">
                    Contact Sales
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="md" variant="outline">
                    View All Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[rgb(var(--background-secondary))] transition-colors duration-300">
        <div className="container-marketing">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-base text-[rgb(var(--foreground-secondary))]">
              Start with a free demo and see how LaundryLobby can transform your business.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="md" className="group">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact?plan=free">
                <Button size="md" variant="outline">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, title, description, included }: {
  icon: React.ReactNode; title: string; description: string; included: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2 text-sm">{title}</h3>
      <p className="text-xs text-[rgb(var(--foreground-muted))] mb-2 leading-tight">{description}</p>
      <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
        {included}
      </span>
    </div>
  )
}

function BenefitCard({ icon, title, description, stat }: {
  icon: React.ReactNode; title: string; description: string; stat: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2 text-sm">{title}</h3>
      <p className="text-xs text-[rgb(var(--foreground-muted))] mb-2 leading-tight">{description}</p>
      <div className="text-base font-bold text-primary-600 dark:text-primary-400">{stat}</div>
    </div>
  )
}

function AddOnPreviewCard({ icon, title, description, price, popular }: {
  icon: React.ReactNode; title: string; description: string; price: string; popular: boolean
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {popular && (
        <div className="flex justify-end mb-2">
          <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
            Popular
          </span>
        </div>
      )}
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-[rgb(var(--foreground))] mb-2 text-sm">{title}</h3>
      <p className="text-xs text-[rgb(var(--foreground-muted))] mb-3 leading-tight">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{price}</span>
        <Link href="/addons">
          <Button size="sm" variant="outline">View Details</Button>
        </Link>
      </div>
    </div>
  )
}
