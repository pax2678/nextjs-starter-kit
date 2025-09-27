import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Protect } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ProjectsPage() {
  const { has } = await auth()
  
  if (!has({ feature: 'projects_access' })) {
    redirect('/subscription?feature=projects_access&plan=platinum')
  }
  
  return (
    <Protect
      feature="projects_access"
      fallback={
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upgrade to Platinum Plan</h2>
            <p className="text-muted-foreground mb-6">
              Advanced project management features are available with the Platinum plan. 
              Organize your project portfolio, track progress, and manage complex workflows.
            </p>
            <Button asChild>
              <Link href="/subscription?feature=projects_access&plan=platinum">
                Upgrade to Platinum
              </Link>
            </Button>
          </div>
        </div>
      }
    >
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your project portfolio and track progress across initiatives.
          </p>
        </div>
      </div>
      
      <div className="px-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">E-commerce Platform</h3>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Building a modern e-commerce solution with React and Node.js
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>78%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>Due: Dec 15, 2024</span>
              <span>5 members</span>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Mobile App Redesign</h3>
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">In Progress</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Modernizing the mobile app UI/UX with new design system
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>45%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full w-[45%]"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>Due: Jan 30, 2025</span>
              <span>3 members</span>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">API Documentation</h3>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Planning</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive API documentation and developer portal
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>20%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full w-1/5"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>Due: Mar 15, 2025</span>
              <span>2 members</span>
            </div>
          </div>
        </div>
      </div>
        </div>
      </Protect>
    )
  }