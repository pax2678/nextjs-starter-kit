'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function CurrentPlan() {
  const { has, isLoaded } = useAuth()
  
  // Show loading state while auth is being established
  if (!isLoaded || !has) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="animate-pulse">
          Loading...
        </Badge>
      </div>
    )
  }
  
  const getCurrentPlan = () => {
    // Additional safety check
    if (!has) return 'Free'
    
    if (has({ plan: 'platinum' })) return 'Platinum'
    if (has({ plan: 'gold' })) return 'Gold'  
    return 'Free'
  }
  
  const plan = getCurrentPlan()
  
  const getPlanVariant = (planName: string) => {
    switch (planName) {
      case 'Platinum': return 'default'
      case 'Gold': return 'secondary'
      default: return 'outline'
    }
  }
  
  const getUpgradeText = (planName: string) => {
    switch (planName) {
      case 'Free': return 'Upgrade to Gold'
      case 'Gold': return 'Upgrade to Platinum'
      default: return null
    }
  }
  
  const upgradeText = getUpgradeText(plan)
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Badge variant={getPlanVariant(plan)} className="font-medium">
          {plan} Plan
        </Badge>
        
        {plan === 'Platinum' && (
          <span className="text-xs text-muted-foreground">
            All features unlocked
          </span>
        )}
      </div>
      
      {upgradeText && (
        <Button asChild variant="outline" size="sm">
          <Link href="/subscription">
            {upgradeText}
          </Link>
        </Button>
      )}
    </div>
  )
}