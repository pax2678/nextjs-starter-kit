'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function CurrentPlan() {
  const { has } = useAuth()
  
  const getCurrentPlan = () => {
    if (has({ feature: 'team_access' })) return 'Platinum'
    if (has({ feature: 'lifecycle_access' })) return 'Gold'  
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