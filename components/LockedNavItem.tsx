'use client'

import Link from 'next/link'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'

interface LockedNavItemProps {
  item: {
    title: string
    icon?: any
    requiredFeature: string
    requiredPlan: string
  }
}

export function LockedNavItem({ item }: LockedNavItemProps) {
  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'gold':
        return { text: '⭐ Gold', variant: 'secondary' as const }
      case 'platinum':
        return { text: '💎 Platinum', variant: 'default' as const }
      default:
        return { text: plan, variant: 'outline' as const }
    }
  }

  const badge = getPlanBadge(item.requiredPlan)

  return (
    <SidebarMenuButton 
      asChild
      className="opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
      tooltip={`Requires ${item.requiredPlan} plan`}
    >
      <Link href={`/subscription?feature=${item.requiredFeature}&plan=${item.requiredPlan}`}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        <Badge variant={badge.variant} className="ml-auto text-xs">
          {badge.text}
        </Badge>
      </Link>
    </SidebarMenuButton>
  )
}