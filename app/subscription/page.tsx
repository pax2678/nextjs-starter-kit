import { PricingTable } from '@clerk/nextjs'

export default function SubscriptionPage({ 
  searchParams 
}: { 
  searchParams: { feature?: string; plan?: string } 
}) {
  const feature = searchParams.feature
  const plan = searchParams.plan

  const getFeatureDisplayName = (featureName?: string) => {
    if (!featureName) return ''
    // Capitalize first letter for display
    return featureName.charAt(0).toUpperCase() + featureName.slice(1)
  }

  const getPlanDisplayName = (planName?: string) => {
    switch (planName) {
      case 'gold': return 'Gold'
      case 'platinum': return 'Platinum'
      default: return planName
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        
        {feature && plan && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-800">
              <strong>Unlock {getFeatureDisplayName(feature)}</strong> with the{' '}
              <strong>{getPlanDisplayName(plan)}</strong> plan
            </p>
          </div>
        )}
        
        <p className="text-xl text-muted-foreground mb-2">
          Upgrade to unlock more powerful features for your projects
        </p>
        <p className="text-muted-foreground">
          Start with any plan and upgrade anytime as your needs grow
        </p>
      </div>
      
      <div className="mb-8">
        <PricingTable 
          forOrganizations={false}
          newSubscriptionRedirectUrl="/subscription/success"
        />
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include a 30-day money-back guarantee</p>
        <p className="mt-1">Cancel anytime with one click</p>
      </div>
    </div>
  )
}