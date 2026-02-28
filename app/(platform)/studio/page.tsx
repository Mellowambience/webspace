// Developer template studio — submit and manage templates
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function StudioPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-2">Studio</h1>
      <p className="text-ws-ink/60 mb-10">
        Design a template. Publish it. Earn on every sale.
      </p>
      {/* Template builder, submission form, earnings dashboard */}
    </div>
  )
}
