// TODO: Fetch templates from Supabase
export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold mb-2">Template Marketplace</h1>
      <p className="text-ws-ink/60 mb-10">Pick a design. Make it yours.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TemplateCard components render here */}
        <div className="rounded-xl border border-ws-border bg-ws-mist h-64 flex items-center justify-center text-ws-ink/30">
          Templates loading...
        </div>
      </div>
    </div>
  )
}
