import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SubscriptionSuccessPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-10 h-10 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Welcome to Your New Plan!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            Your subscription is now active and you have access to all your new features.
          </p>
          
          <p className="text-muted-foreground mb-8">
            You'll receive a confirmation email shortly with your subscription details. 
            You can manage your subscription anytime from your account settings.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard/team">
              Explore New Features
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Explore your new features in the dashboard</li>
            <li>• Check out the enhanced analytics and project management tools</li>
            <li>• Invite team members to collaborate (Platinum plan)</li>
            <li>• Contact support if you have any questions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}