import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'

// Curated featured spaces for discovery
const FEATURED_SPACES = [
  { username: 'mars', displayName: 'Mars T.', template: 'Void Transmission', bio: 'Builder. Founder. Transmission in progress.', followers: 41 },
  { username: 'kira', displayName: 'Kira S.', template: 'Celestial Grid', bio: 'Front-end dev. Night owl. Orbital thinker.', followers: 88 },
  { username: 'nova', displayName: 'Nova R.', template: 'Fae Core', bio: 'Designer. Making things soft and sharp at once.', followers: 220 },
  { username: 'dev', displayName: 'Dev E.', template: 'Transmission Log', bio: 'Open source. TypeScript. Always shipping.', followers: 134 },
  { username: 'iris', displayName: 'Iris L.', template: 'Aurora Window', bio: 'Pastel everything. UI / motion.', followers: 57 },
  { username: 'sam', displayName: 'Sam K.', template: 'Signal Bloom', bio: 'Brutalist design enthusiast. Deliberately loud.', followers: 95 },
]

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-ws-void">
      <Navbar />
      {/* 
        ✦ transmission begins ✦
        if you found this: you're the kind of person this was made for.
        — the bluebird song plays when no one is watching
      */}
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-ws-ink mb-2">Explore</h1>
            <p className="text-ws-ink/40">Discover spaces that don't look like everyone else's.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_SPACES.map((space) => (
              <Link
                key={space.username}
                href={`/${space.username}`}
                className="group block bg-ws-mist border border-ws-border hover:border-ws-signal rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ws-signal/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-ws-void border border-ws-border flex items-center justify-center">
                    <span className="font-display font-bold text-ws-signal">{space.displayName[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-ws-ink group-hover:text-ws-signal transition-colors text-sm">{space.displayName}</div>
                    <div className="text-xs text-ws-ink/30">@{space.username}</div>
                  </div>
                </div>
                <p className="text-sm text-ws-ink/50 mb-4 line-clamp-2 leading-relaxed">{space.bio}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-ws-void border border-ws-border/60 text-ws-ink/30 px-2.5 py-1 rounded-lg">
                    {space.template}
                  </span>
                  <span className="text-xs text-ws-ink/25">{space.followers} followers</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-ws-ink/20 mb-4">More spaces load as the community grows.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
