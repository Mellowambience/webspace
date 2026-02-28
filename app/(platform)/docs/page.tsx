\'use client\'
import Link from \'next/link\'
import { Navbar } from \'@/components/ui/Navbar\'

const DOC_SECTIONS = [
  {
    icon: \'⚡\',
    title: \'Quickstart\',
    description: \'Get your API key and make your first task call in under 5 minutes.\',
    href: \'/docs/api-reference\',
    badge: \'Start here\',
    badgeColor: \'bg-ws-signal/15 text-ws-signal border-ws-signal/30\',
  },
  {
    icon: \'📡\',
    title: \'API Reference\',
    description: \'Full reference for Tasks, Files, Projects, and Webhooks endpoints.\',
    href: \'/docs/api-reference\',
    badge: \'14 endpoints\',
    badgeColor: \'bg-ws-warm/15 text-ws-warm border-ws-warm/30\',
  },
  {
    icon: \'🔔\',
    title: \'Webhooks\',
    description: \'Receive real-time task lifecycle events. Validate signatures with HMAC.\',
    href: \'/docs/api-reference#webhooks\',
  },
  {
    icon: \'📂\',
    title: \'Projects\',
    description: \'Group tasks and apply consistent instructions across a workflow.\',
    href: \'/docs/api-reference#projects\',
  },
  {
    icon: \'🔗\',
    title: \'Connectors\',
    description: \'Link Gmail, Notion, Google Calendar, and more to power Manus tasks.\',
    href: \'https://open.manus.ai/docs/connectors\',
    external: true,
  },
  {
    icon: \'🤝\',
    title: \'OpenAI Compatibility\',
    description: \'Use the OpenAI Python SDK directly with the Manus API.\',
    href: \'https://open.manus.ai/docs/openai-compatibility\',
    external: true,
  },
]

const CODE_EXAMPLE = `import requests

response = requests.post(
    "https://api.manus.ai/v1/tasks",
    headers={"API_KEY": "your_api_key"},
    json={
        "prompt": "Summarize the latest SpaceX launch news",
        "agentProfile": "manus-1.6",
        "taskMode": "agent"
    }
)

task = response.json()
print(task["task_url"])  # https://manus.ai/tasks/tsk_abc123`

export default function DocsPage() {
  return (
    <div className=\"min-h-screen bg-ws-void\">
      <Navbar />
      <div className=\"pt-28 pb-24 px-6\">
        <div className=\"max-w-5xl mx-auto\">

          {/* Hero */}
          <div className=\"mb-14\">
            <div className=\"inline-flex items-center gap-2 bg-ws-signal/10 border border-ws-signal/20 rounded-full px-4 py-1.5 text-xs text-ws-signal mb-6\">
              <span className=\"w-1.5 h-1.5 rounded-full bg-ws-signal animate-pulse\" />
              Manus Integrations API v1.0
            </div>
            <h1 className=\"font-display text-5xl font-extrabold text-ws-ink mb-4 leading-tight\">
              Developer Docs
            </h1>
            <p className=\"text-lg text-ws-ink/50 max-w-2xl leading-relaxed\">
              Integrate Manus AI agents into any workflow. Build automations, power templates, and connect Manus to your stack via a clean REST API.
            </p>
          </div>

          {/* Quick example */}
          <div className=\"mb-14 rounded-2xl border border-ws-border bg-ws-mist overflow-hidden\">
            <div className=\"flex items-center justify-between px-5 py-3 border-b border-ws-border bg-ws-void/60\">
              <span className=\"text-xs font-mono text-ws-ink/40\">quickstart.py</span>
              <span className=\"text-xs text-ws-ink/25\">Python</span>
            </div>
            <pre className=\"p-6 text-xs font-mono text-ws-ink/70 leading-relaxed overflow-x-auto\"><code>{CODE_EXAMPLE}</code></pre>
          </div>

          {/* Section cards */}
          <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14\">
            {DOC_SECTIONS.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                {...(section.external ? { target: \"_blank\", rel: \"noopener noreferrer\" } : {})}
                className=\"group block bg-ws-mist border border-ws-border hover:border-ws-signal rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1\"
              >
                <div className=\"flex items-start justify-between mb-3\">
                  <span className=\"text-2xl\">{section.icon}</span>
                  {section.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${section.badgeColor}`}>
                      {section.badge}
                    </span>
                  )}
                  {section.external && (
                    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" className=\"text-ws-ink/20 group-hover:text-ws-signal transition-colors\">
                      <path d=\"M7 17L17 7M17 7H7M17 7v10\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/>
                    </svg>
                  )}
                </div>
                <h3 className=\"font-display font-bold text-ws-ink group-hover:text-ws-signal transition-colors mb-1.5\">{section.title}</h3>
                <p className=\"text-xs text-ws-ink/40 leading-relaxed\">{section.description}</p>
              </Link>
            ))}
          </div>

          {/* Base URL callout */}
          <div className=\"rounded-2xl border border-ws-border bg-ws-mist/50 p-6 flex items-center justify-between flex-wrap gap-4\">
            <div>
              <p className=\"text-xs text-ws-ink/30 uppercase tracking-widest mb-1\">Base URL</p>
              <code className=\"font-mono text-ws-signal\">https://api.manus.ai</code>
            </div>
            <div>
              <p className=\"text-xs text-ws-ink/30 uppercase tracking-widest mb-1\">Authentication</p>
              <code className=\"font-mono text-ws-ink/60\">API_KEY header</code>
            </div>
            <div>
              <p className=\"text-xs text-ws-ink/30 uppercase tracking-widest mb-1\">Format</p>
              <code className=\"font-mono text-ws-ink/60\">application/json</code>
            </div>
            <Link
              href=\"/docs/api-reference\"
              className=\"px-5 py-2.5 bg-ws-signal hover:bg-ws-glow text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105\"
            >
              View full reference →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
