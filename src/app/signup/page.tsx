'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SignupRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to pricing page to select a plan
    router.replace('/pricing')
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(var(--background))]">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600 mb-4" />
      <p className="text-[rgb(var(--foreground-muted))]">Redirecting to pricing...</p>
    </div>
  )
}
