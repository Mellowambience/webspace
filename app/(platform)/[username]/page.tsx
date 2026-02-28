import { Navbar } from '@/components/ui/Navbar'

interface Props {
  params: { username: string }
}

// Sample blocks for demo — replace with Supabase fetch
const DEMO_PROFILE = {
  displayName: 'Mars T.',
  username: 'mars',
  bio: 'Builder. Founder. Transmission in progress. // Aetherhaven',
  following: 12,
  followers: 41,
  links: [
    { label: 'Aetherhaven', url: 'https://github.com/Mellowambience' },
    { label: 'GitHub', url: 'https://github.com/Mellowambience' },
  ],
  template: 'Void Transmission',
}

export default async function ProfilePage({ params }: Props) {
  const { username } = params
  // TODO: fetch real profile from Supabase
  // const profile = await getProfile(username)
  const profile = DEMO_PROFILE

  return (
    <div className="min-h-screen bg-ws-void">
      <Navbar />

      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[400px] bg-ws-signal/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="pt-24 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Profile header */}
          <div className="flex items-start gap-6 mb-10">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-ws-mist border border-ws-border flex items-center justify-center shrink-0 relative overflow-hidden">
              <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ws-signal opacity-40">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.40053 8.55807C8.88268 9.62143 9.31868 10.9063 10.3744 11.4279C11.8907 12.1771 13.2065 12.9159 14.5094 14.3954C15.2896 15.2815 16.6353 15.3627 17.515 14.5768C18.3947 13.7909 18.4753 12.4354 17.695 11.5493C15.8385 9.441 13.9275 8.40615 12.2497 7.57715C11.194 7.05554 9.91838 7.49471 9.40053 8.55807Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M20.9079 2.31393C19.7672 2.60119 19.0736 3.76554 19.3588 4.91457C19.558 5.71734 19.7438 6.40375 19.9139 7.03212C20.2395 8.2348 20.5075 9.22481 20.7019 10.4109C20.8934 11.5795 21.9892 12.3704 23.1493 12.1775C24.3095 11.9846 25.0947 10.8809 24.9032 9.71228C24.6735 8.31044 24.3157 6.98407 23.9566 5.65277C23.7976 5.06324 23.6383 4.47275 23.4898 3.87432C23.2046 2.72528 22.0487 2.02667 20.9079 2.31393Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M33.0786 3.63329C32.0734 3.01888 30.7639 3.34167 30.154 4.35425C29.0225 6.23259 28.4277 8.08208 27.8752 10.308C27.59 11.457 28.2836 12.6213 29.4244 12.9086C30.5651 13.1959 31.7211 12.4973 32.0063 11.3482C32.5183 9.28501 32.9881 7.91768 33.7944 6.5792C34.4044 5.56662 34.0839 4.24769 33.0786 3.63329Z" fill="currentColor"/>
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="font-display text-2xl font-bold text-ws-ink">{profile.displayName}</h1>
                  <p className="text-ws-ink/40 text-sm">@{username}</p>
                </div>
                <button className="px-4 py-2 border border-ws-border hover:border-ws-signal text-ws-ink/70 hover:text-ws-ink text-sm font-medium rounded-xl transition-colors">
                  Follow
                </button>
              </div>

              <p className="text-ws-ink/60 text-sm mt-3 leading-relaxed">{profile.bio}</p>

              <div className="flex gap-6 mt-4">
                <span className="text-xs text-ws-ink/40">
                  <span className="font-semibold text-ws-ink">{profile.followers}</span> followers
                </span>
                <span className="text-xs text-ws-ink/40">
                  <span className="font-semibold text-ws-ink">{profile.following}</span> following
                </span>
              </div>
            </div>
          </div>

          {/* Template badge */}
          <div className="mb-8 flex items-center gap-2">
            <span className="text-xs text-ws-ink/30">Using</span>
            <span className="text-xs bg-ws-mist border border-ws-border text-ws-ink/60 px-3 py-1 rounded-full">
              {profile.template}
            </span>
          </div>

          {/* Content blocks */}
          <div className="space-y-4">
            {/* Links block */}
            <div className="bg-ws-mist border border-ws-border rounded-2xl p-5">
              <h2 className="text-xs text-ws-ink/30 uppercase tracking-widest mb-4">Links</h2>
              <div className="space-y-2">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group px-4 py-3 rounded-xl border border-ws-border hover:border-ws-signal bg-ws-void/50 transition-all duration-200"
                  >
                    <span className="text-sm text-ws-ink/70 group-hover:text-ws-ink transition-colors">{link.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ws-ink/20 group-hover:text-ws-signal transition-colors">
                      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Projects placeholder */}
            <div className="bg-ws-mist border border-ws-border rounded-2xl p-5">
              <h2 className="text-xs text-ws-ink/30 uppercase tracking-widest mb-4">Projects</h2>
              <p className="text-sm text-ws-ink/20 text-center py-6">No projects added yet</p>
            </div>
          </div>

          {/* Powered by watermark */}
          <div className="mt-12 flex justify-center">
            <a href="/" className="flex items-center gap-2 opacity-20 hover:opacity-40 transition-opacity">
              <svg width="12" height="12" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ws-signal">
                <path fillRule="evenodd" clipRule="evenodd" d="M43.9331 56.6106C48.0617 53.9722 50.9164 39.8218 50.2884 35.6081Z" fill="currentColor"/>
              </svg>
              <span className="text-xs text-ws-ink font-display">webspace</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
