import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'

const QUICK_ACTIONS = [
  { label: 'Browse templates', href: '/marketplace', icon: '🎨', desc: 'Find your next look' },
  { label: 'Open Studio', href: '/studio', icon: '⚡', desc: 'Build and publish templates' },
  { label: 'My space', href: '/preview', icon: '🌐', desc: 'Preview your live page' },
  { label: 'Analytics', href: '/analytics', icon: '📊', desc: 'Views, followers, earnings' },
]

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const displayName = user.firstName || user.username || 'there'

  return (
    <div className="min-h-screen bg-ws-void">
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Welcome */}
          <div className="mb-12 flex items-start justify-between flex-wrap gap-6">
            <div>
              <p className="text-ws-ink/40 text-sm mb-1">Welcome back</p>
              <h1 className="font-display text-3xl font-bold text-ws-ink">{displayName}</h1>
            </div>
            <Link
              href="/marketplace"
              className="px-5 py-2.5 bg-ws-signal hover:bg-ws-glow text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105"
            >
              + Browse templates
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group bg-ws-mist border border-ws-border hover:border-ws-signal rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-2xl mb-3">{action.icon}</div>
                <div className="font-semibold text-ws-ink text-sm group-hover:text-ws-signal transition-colors mb-1">{action.label}</div>
                <div className="text-xs text-ws-ink/30">{action.desc}</div>
              </Link>
            ))}
          </div>

          {/* Active template */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-ws-mist border border-ws-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-ws-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ws-signal" />
                Active Template
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-ws-void border border-ws-border flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.40053 8.55807C8.88268 9.62143 9.31868 10.9063 10.3744 11.4279C11.8907 12.1771 13.2065 12.9159 14.5094 14.3954C15.2896 15.2815 16.6353 15.3627 17.515 14.5768C18.3947 13.7909 18.4753 12.4354 17.695 11.5493C15.8385 9.441 13.9275 8.40615 12.2497 7.57715C11.194 7.05554 9.91838 7.49471 9.40053 8.55807Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="text-ws-ink/30 text-sm">No template applied</p>
                  <Link href="/marketplace" className="text-xs text-ws-signal hover:text-ws-glow transition-colors mt-1 inline-block">
                    Browse marketplace →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-ws-mist border border-ws-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-ws-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ws-warm" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                <p className="text-ws-ink/25 text-sm text-center py-4">No activity yet</p>
              </div>
            </div>
          </div>

          {/* Discovery feed placeholder */}
          <div className="bg-ws-mist border border-ws-border rounded-2xl p-6">
            <h2 className="font-display font-bold text-ws-ink mb-4">Discovery Feed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 rounded-xl bg-ws-void border border-ws-border/50 animate-pulse" />
              ))}
            </div>
            <p className="text-xs text-ws-ink/20 text-center mt-4">
              Follow people to see their spaces here
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
