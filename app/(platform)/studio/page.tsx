'use client'
import { useState } from 'react'
import { Navbar } from '@/components/ui/Navbar'

const TABS = ['My Templates', 'Submit New', 'Earnings']

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState('My Templates')
  const [templateName, setTemplateName] = useState('')
  const [templateDesc, setTemplateDesc] = useState('')
  const [templatePrice, setTemplatePrice] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: POST to /api/templates with Supabase + Stripe product creation
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-ws-void">
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-ws-warm/10 border border-ws-warm/20 rounded-full px-3 py-1 text-xs text-ws-warm font-medium mb-4">
              Developer Studio
            </div>
            <h1 className="font-display text-4xl font-bold text-ws-ink mb-2">Studio</h1>
            <p className="text-ws-ink/40">Design templates. Publish them. Earn on every sale.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-ws-mist border border-ws-border rounded-xl p-1 mb-10 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-ws-signal text-white'
                    : 'text-ws-ink/50 hover:text-ws-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab: My Templates */}
          {activeTab === 'My Templates' && (
            <div>
              <div className="rounded-2xl border border-ws-border border-dashed bg-ws-mist/50 p-12 text-center">
                <div className="w-12 h-12 rounded-xl bg-ws-signal/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ws-signal">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-ws-ink mb-2">No templates yet</h3>
                <p className="text-sm text-ws-ink/40 mb-6">Submit your first template to start earning</p>
                <button
                  onClick={() => setActiveTab('Submit New')}
                  className="px-5 py-2.5 bg-ws-signal hover:bg-ws-glow text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Submit a template
                </button>
              </div>
            </div>
          )}

          {/* Tab: Submit New */}
          {activeTab === 'Submit New' && (
            <div className="max-w-2xl">
              {submitted ? (
                <div className="rounded-2xl border border-ws-signal/30 bg-ws-signal/5 p-10 text-center">
                  <div className="text-4xl mb-4">✦</div>
                  <h3 className="font-display text-2xl font-bold text-ws-ink mb-2">Submitted</h3>
                  <p className="text-ws-ink/40 text-sm">Your template is in review. We&apos;ll notify you once it&apos;s live.</p>
                  <button
                    onClick={() => { setSubmitted(false); setTemplateName(''); setTemplateDesc(''); setTemplatePrice('') }}
                    className="mt-6 text-xs text-ws-signal hover:text-ws-glow transition-colors"
                  >
                    Submit another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs text-ws-ink/50 uppercase tracking-widest mb-2">Template Name</label>
                    <input
                      type="text"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="e.g. Void Transmission"
                      required
                      className="w-full bg-ws-mist border border-ws-border focus:border-ws-signal rounded-xl px-4 py-3 text-ws-ink placeholder:text-ws-ink/25 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ws-ink/50 uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      value={templateDesc}
                      onChange={(e) => setTemplateDesc(e.target.value)}
                      placeholder="What makes this template special?"
                      rows={3}
                      required
                      className="w-full bg-ws-mist border border-ws-border focus:border-ws-signal rounded-xl px-4 py-3 text-ws-ink placeholder:text-ws-ink/25 outline-none transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ws-ink/50 uppercase tracking-widest mb-2">Price (USD)</label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setTemplatePrice('0')}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${templatePrice === '0' ? 'bg-ws-signal border-ws-signal text-white' : 'border-ws-border text-ws-ink/50 hover:border-ws-signal'}`}
                      >
                        Free
                      </button>
                      <input
                        type="number"
                        value={templatePrice === '0' ? '' : templatePrice}
                        onChange={(e) => setTemplatePrice(e.target.value)}
                        placeholder="9.00"
                        min="1"
                        step="0.50"
                        className="flex-1 bg-ws-mist border border-ws-border focus:border-ws-signal rounded-xl px-4 py-2 text-ws-ink placeholder:text-ws-ink/25 outline-none transition-colors"
                      />
                    </div>
                    <p className="text-xs text-ws-ink/30 mt-2">You earn 80% of every sale.</p>
                  </div>
                  <div>
                    <label className="block text-xs text-ws-ink/50 uppercase tracking-widest mb-2">Template Code (ZIP or repo URL)</label>
                    <input
                      type="url"
                      placeholder="https://github.com/you/my-template"
                      className="w-full bg-ws-mist border border-ws-border focus:border-ws-signal rounded-xl px-4 py-3 text-ws-ink placeholder:text-ws-ink/25 outline-none transition-colors"
                    />
                    <p className="text-xs text-ws-ink/30 mt-2">HTML/CSS/JS. We sandbox and review before publishing.</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-ws-signal hover:bg-ws-glow text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    Submit for review
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Tab: Earnings */}
          {activeTab === 'Earnings' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total earned', value: '$0.00', sub: 'All time' },
                { label: 'This month', value: '$0.00', sub: 'Feb 2026' },
                { label: 'Pending payout', value: '$0.00', sub: 'Next cycle' },
              ].map((stat) => (
                <div key={stat.label} className="bg-ws-mist border border-ws-border rounded-2xl p-6">
                  <p className="text-xs text-ws-ink/30 mb-1">{stat.sub}</p>
                  <p className="font-display text-3xl font-bold text-ws-ink">{stat.value}</p>
                  <p className="text-sm text-ws-ink/40 mt-1">{stat.label}</p>
                </div>
              ))}
              <div className="sm:col-span-3 bg-ws-mist border border-ws-border rounded-2xl p-6">
                <p className="text-ws-ink/20 text-sm text-center py-4">No sales yet — publish a template to start earning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
