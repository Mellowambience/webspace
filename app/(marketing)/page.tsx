import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'
import { TemplateCard } from '@/components/marketplace/TemplateCard'
import { StatsBar } from '@/components/ui/StatsBar'

// Sample featured templates for homepage demo
const FEATURED_TEMPLATES = [
  {
    id: '1', slug: 'void-transmission', title: 'Void Transmission',
    description: 'Dark, minimal, typographic. For developers who want their work to speak.',
    priceCents: 0, developerName: 'Mars', developerUsername: 'mars', featured: true,
  },
  {
    id: '2', slug: 'celestial-grid', title: 'Celestial Grid',
    description: 'A structured grid layout with orbital accent lines and a night-sky palette.',
    priceCents: 900, developerName: 'Kira', developerUsername: 'kira',
  },
  {
    id: '3', slug: 'fae-core', title: 'Fae Core',
    description: 'Cyberpunk meets fairy ring. Mint accents, dark depths, real depth of field.',
    priceCents: 1200, developerName: 'Nova', developerUsername: 'nova',
  },
]

const STATS = [
  { label: 'Spaces live', value: '0' },
  { label: 'Templates', value: '0' },
  { label: 'Creators', value: '0' },
  { label: 'Revenue paid out', value: '$0' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ws-void">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ws-signal/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-ws-warm/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Manus glyph watermark */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none" aria-hidden>
            <svg width="200" height="200" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M43.9331 56.6106C48.0617 53.9722 50.9164 39.8218 50.2884 35.6081C50.2884 35.6081 49.634 33.3459 48.0372 33.3459C46.8137 33.3458 46.1377 34.3405 45.8884 34.8057C45.6728 34.7259 45.4533 34.6537 45.2792 34.5975C45.1853 34.5672 45.0537 34.5253 44.9304 34.4861L44.6964 34.4115C44.5053 34.3503 44.3255 34.2913 44.1561 34.2328L44.1566 34.1728C44.164 32.8051 44.025 30.6709 42.6083 28.4471C42.3816 28.0912 42.1677 27.7731 41.9848 27.5032L41.8701 27.3342C41.734 27.1338 41.6272 26.9765 41.5245 26.8195C41.2723 26.4345 41.2034 26.2861 41.1767 26.2177C41.1651 26.1881 41.1438 26.1341 41.138 25.9694C41.1309 25.7671 41.1481 25.3842 41.2793 24.7145L41.9612 21.9896C36.4404 26.8905 37.1541 27.9417 38.3305 29.6741C39.9266 32.1381 39.8833 33.5542 39.8479 34.71C40.5618 37.5387 42.4666 38.1438 43.7154 38.5405C44.4314 39.3955 44.2715 39.9646 44.1117 40.5332C43.4013 43.0618 42.6941 45.5791 40.5854 46.3334C37.9241 47.2853 35.2627 46.3846 35.2627 46.3846Z" fill="white"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-ws-mist border border-ws-border rounded-full px-4 py-1.5 text-xs text-ws-ink/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-ws-signal animate-pulse" />
            Now in early access
          </div>

          <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-ws-ink mb-6 leading-[0.95]">
            Your corner of the<br />
            <span className="text-ws-signal">internet, designed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-ws-ink/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Webspace is a social platform where your profile <em className="text-ws-ink/70 not-italic">is</em> a fully designed webpage.
            Developers build the templates. You make one yours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-8 py-3.5 bg-ws-signal hover:bg-ws-glow text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-ws-signal/25"
            >
              Claim your space
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-3.5 border border-ws-border hover:border-ws-signal text-ws-ink/70 hover:text-ws-ink rounded-xl font-semibold transition-all duration-200"
            >
              Browse templates →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <StatsBar stats={STATS} />
        </div>
      </section>

      {/* Featured Templates */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-ws-ink">Featured templates</h2>
              <p className="text-ws-ink/40 mt-1">Handpicked by the community</p>
            </div>
            <Link href="/marketplace" className="text-sm text-ws-signal hover:text-ws-glow transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_TEMPLATES.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* For Developers CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-ws-border bg-ws-mist relative overflow-hidden p-12">
            {/* Corner glyph watermark */}
            <div className="absolute -bottom-8 -right-8 opacity-5 pointer-events-none select-none" aria-hidden>
              <svg width="180" height="180" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.40053 8.55807C8.88268 9.62143 9.31868 10.9063 10.3744 11.4279C11.8907 12.1771 13.2065 12.9159 14.5094 14.3954C15.2896 15.2815 16.6353 15.3627 17.515 14.5768C18.3947 13.7909 18.4753 12.4354 17.695 11.5493C15.8385 9.441 13.9275 8.40615 12.2497 7.57715C11.194 7.05554 9.91838 7.49471 9.40053 8.55807Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M20.9079 2.31393C19.7672 2.60119 19.0736 3.76554 19.3588 4.91457C19.558 5.71734 19.7438 6.40375 19.9139 7.03212C20.2395 8.2348 20.5075 9.22481 20.7019 10.4109C20.8934 11.5795 21.9892 12.3704 23.1493 12.1775C24.3095 11.9846 25.0947 10.8809 24.9032 9.71228C24.6735 8.31044 24.3157 6.98407 23.9566 5.65277C23.7976 5.06324 23.6383 4.47275 23.4898 3.87432C23.2046 2.72528 22.0487 2.02667 20.9079 2.31393Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M33.0786 3.63329C32.0734 3.01888 30.7639 3.34167 30.154 4.35425C29.0225 6.23259 28.4277 8.08208 27.8752 10.308C27.59 11.457 28.2836 12.6213 29.4244 12.9086C30.5651 13.1959 31.7211 12.4973 32.0063 11.3482C32.5183 9.28501 32.9881 7.91768 33.7944 6.5792C34.4044 5.56662 34.0839 4.24769 33.0786 3.63329Z" fill="white"/>
              </svg>
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-ws-warm/10 border border-ws-warm/20 rounded-full px-3 py-1 text-xs text-ws-warm font-medium mb-6">
                For developers
              </div>
              <h2 className="font-display text-4xl font-bold text-ws-ink mb-4 max-w-lg">
                Design templates. <br />Get paid every time.
              </h2>
              <p className="text-ws-ink/50 mb-8 max-w-md leading-relaxed">
                Build a template once. Earn 80% of every sale. Your creativity becomes recurring income — no subscriptions, no middlemen.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/studio"
                  className="px-6 py-3 bg-ws-warm hover:bg-ws-warm/90 text-ws-void rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                >
                  Open Studio
                </Link>
                <Link
                  href="/docs/developers"
                  className="px-6 py-3 border border-ws-border hover:border-ws-warm/50 text-ws-ink/60 hover:text-ws-ink rounded-xl font-semibold transition-colors"
                >
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ws-border px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ws-signal opacity-60">
              <path fillRule="evenodd" clipRule="evenodd" d="M43.9331 56.6106C48.0617 53.9722 50.9164 39.8218 50.2884 35.6081C50.2884 35.6081 49.634 33.3459 48.0372 33.3459C46.8137 33.3458 46.1377 34.3405 45.8884 34.8057C45.6728 34.7259 45.4533 34.6537 45.2792 34.5975C45.1853 34.5672 45.0537 34.5253 44.9304 34.4861L44.6964 34.4115C44.5053 34.3503 44.3255 34.2913 44.1561 34.2328Z" fill="currentColor"/>
            </svg>
            <span className="font-display font-bold text-ws-ink/40 text-sm">webspace</span>
          </div>
          <p className="text-xs text-ws-ink/25">
            Built under the stars. © {new Date().getFullYear()} Webspace.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Docs', 'Status'].map((item) => (
              <Link key={item} href="#" className="text-xs text-ws-ink/30 hover:text-ws-ink/60 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
