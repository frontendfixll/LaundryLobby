import { Metadata } from 'next'
import { AddOnsShowcase } from '@/components/addons/AddOnsShowcase'
import { AddOnsCTA } from '@/components/addons/AddOnsCTA'
import { AddOnsHero } from '@/components/addons/AddOnsHero'

export const metadata: Metadata = {
  title: 'Add-ons - Enhance Your LaundryPro Experience',
  description: 'Discover powerful add-ons to extend your LaundryPro platform with advanced features, integrations, and capabilities.',
  keywords: ['laundry add-ons', 'laundry software extensions', 'business features', 'integrations'],
}

export default function AddOnsPage() {
  return (
    <>
      <AddOnsHero />
      <AddOnsShowcase />
      <AddOnsCTA />
    </>
  )
}