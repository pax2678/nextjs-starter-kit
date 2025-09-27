import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Protect } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LifecyclePage() {
  const { has } = await auth()
  
  if (!has({ feature: 'lifecycle' })) {
    redirect('/subscription?feature=lifecycle&plan=gold')
  }
  
  return (
    <Protect
      feature="lifecycle"
      fallback={
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upgrade to Gold Plan</h2>
            <p className="text-muted-foreground mb-6">
              Project lifecycle management is available with the Gold plan. 
              Track your projects from ideation to deployment with advanced workflow tools.
            </p>
            <Button asChild>
              <Link href="/subscription?feature=lifecycle&plan=gold">
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
              <h1 className="text-3xl font-bold">Lifecycle Management</h1>
              <p className="text-muted-foreground">
                Manage your project lifecycles, from ideation to deployment.
              </p>
            </div>
          </div>
          
          <div className="px-4 lg:px-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">Planning Phase</h3>
                <p className="text-sm text-muted-foreground">
                  Define project requirements and create initial roadmap.
                </p>
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full w-3/4"></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">75% Complete</span>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">Development</h3>
                <p className="text-sm text-muted-foreground">
                  Build and iterate on your project features.
                </p>
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full w-1/2"></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">50% Complete</span>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Quality assurance and bug fixes before launch.
                </p>
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-muted-foreground rounded-full w-1/4"></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">25% Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Protect>
    )
  }