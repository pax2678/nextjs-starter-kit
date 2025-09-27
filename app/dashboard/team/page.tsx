import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function TeamPage() {
  const { has } = await auth()
  
  if (!has({ feature: 'team_access' })) {
    redirect('/subscription?feature=team_access&plan=platinum')
  }
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and collaboration settings.
          </p>
        </div>
      </div>
      
      <div className="px-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                JS
              </div>
              <div>
                <h3 className="font-semibold">John Smith</h3>
                <p className="text-sm text-muted-foreground">Lead Developer</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Projects</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tasks Completed</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Online</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-semibold">
                AM
              </div>
              <div>
                <h3 className="font-semibold">Alice Miller</h3>
                <p className="text-sm text-muted-foreground">UI/UX Designer</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Projects</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tasks Completed</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Away</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                MJ
              </div>
              <div>
                <h3 className="font-semibold">Mike Johnson</h3>
                <p className="text-sm text-muted-foreground">Product Manager</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Projects</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tasks Completed</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Team Performance</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <p className="text-sm text-muted-foreground">Task Completion</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">8.2</div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}