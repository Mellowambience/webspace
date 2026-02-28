import { Navbar } from '@/components/ui/Navbar'
import { TemplateCard } from '@/components/marketplace/TemplateCard'

const CATEGORIES = ['All', 'Minimal', 'Portfolio', 'Creative', 'Developer', 'Branded']

// Sample templates — replace with Supabase fetch in production
const TEMPLATES = [
  { id:'1', slug:'void-transmission', title:'Void Transmission', description:'Dark, minimal, typographic. For developers who want their work to speak.', priceCents:0, developerName:'Mars', developerUsername:'mars', featured:true },
  { id:'2', slug:'celestial-grid', title:'Celestial Grid', description:'A structured grid layout with orbital accent lines and a night-sky palette.', priceCents:900, developerName:'Kira', developerUsername:'kira' },
  { id:'3', slug:'fae-core', title:'Fae Core', description:'Cyberpunk meets fairy ring. Mint accents, dark depths, real depth of field.', priceCents:1200, developerName:'Nova', developerUsername:'nova' },
  { id:'4', slug:'signal-bloom', title:'Signal Bloom', description:'Brutalist layout with a warm paper texture and expressive type.', priceCents:600, developerName:'Sam', developerUsername:'sam' },
  { id:'5', slug:'transmission-log', title:'Transmission Log', description:'Terminal-inspired developer page with real-time GitHub commit feed.', priceCents:0, developerName:'Dev', developerUsername:'devuser' },
  { id:'6', slug:'aurora-window', title:'Aurora Window', description:'Pastel gradients, glassmorphism cards, a soft presence for creative work.', priceCents:1500, developerName:'Iris', developerUsername:'iris' },
]

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-ws-void">
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-ws-ink mb-2">Template Marketplace</h1>
            <p className="text-ws-ink/40">Pick a design. Make it yours.</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 -mx-2 px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="shrink-0 px-4 py-2 rounded-full border text-sm transition-colors
                  border-ws-border text-ws-ink/50 hover:border-ws-signal hover:text-ws-signal
                  first:bg-ws-signal first:border-ws-signal first:text-white"
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto shrink-0 flex items-center gap-2 bg-ws-mist border border-ws-border rounded-xl px-4 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ws-ink/40">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search templates..."
                className="bg-transparent text-sm text-ws-ink placeholder:text-ws-ink/30 outline-none w-40"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>

          {/* Empty state hint */}
          <p className="text-center text-xs text-ws-ink/20 mt-12">
            More templates added weekly. <a href="/studio" className="text-ws-signal hover:text-ws-glow">Publish yours →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
