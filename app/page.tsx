import HeroSection from '@/components/hero-section'
import { TasksDemo } from '@/components/TasksDemo'
import { AuthHeader } from '@/components/AuthHeader'

export default function Home() {
  return (
    <>
      <AuthHeader />
      <HeroSection />
      <TasksDemo />
    </>
  )
}
