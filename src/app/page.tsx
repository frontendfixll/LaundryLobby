import { HeroSection, FeaturesOverview, AudienceSection, CTASection, DemoShowcase, PricingPreview } from '@/components/home'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DemoShowcase />
      <FeaturesOverview />
      <PricingPreview />
      <AudienceSection />
      <CTASection />
    </>
  )
}
