import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-6">
        Welcome back{user.firstName ? `, ${user.firstName}` : ''}
      </h1>
      {/* Dashboard widgets: active template, analytics, following feed */}
    </div>
  )
}
