export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="font-display text-6xl font-extrabold tracking-tight text-ws-ink">
          Your corner of the<br />
          <span className="text-ws-signal">internet, designed.</span>
        </h1>
        <p className="text-xl text-ws-ink/60 max-w-xl mx-auto">
          Webspace is a social platform where your profile is a fully designed
          webpage. Developers build templates. You make one yours.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/sign-up"
            className="px-6 py-3 bg-ws-signal text-white rounded-lg font-medium hover:bg-ws-glow transition-colors"
          >
            Claim your space
          </a>
          <a
            href="/marketplace"
            className="px-6 py-3 border border-ws-border text-ws-ink rounded-lg font-medium hover:border-ws-signal transition-colors"
          >
            Browse templates
          </a>
        </div>
      </div>
    </main>
  )
}
