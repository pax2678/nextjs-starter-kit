import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Protect } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AnalyticsPage() {
  const { has } = await auth()
  
  if (!has({ feature: 'analytics_access' })) {
    redirect('/subscription?feature=analytics_access&plan=gold')
  }
  
  return (
    <Protect
      feature="analytics_access"
      fallback={
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upgrade to Gold Plan</h2>
            <p className="text-muted-foreground mb-6">
              Advanced analytics and reporting features are available with the Gold plan. 
              Get deep insights into your project performance, user engagement, and key metrics.
            </p>
            <Button asChild>
              <Link href="/subscription?feature=analytics_access&plan=gold">
                Upgrade to Gold
              </Link>
            </Button>
          </div>
        </div>
      }
    >
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your project metrics and performance data.
          </p>
        </div>
      </div>
      
      <div className="px-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Total Users</h3>
              <span className="text-xs text-green-600">+12%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Active Sessions</h3>
              <span className="text-xs text-green-600">+5%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Conversion Rate</h3>
              <span className="text-xs text-red-600">-2%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Revenue</h3>
              <span className="text-xs text-green-600">+18%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">$12,426</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
          <div className="h-64 flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Chart placeholder - integrate with your preferred charting library</p>
          </div>
        </div>
      </div>
        </div>
      </Protect>
    )
  }