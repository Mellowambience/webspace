\'use client\'
import { useState } from \'react\'
import { Navbar } from \'@/components/ui/Navbar\'
import { cn } from \'@/lib/utils\'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Param {
  name: string
  type: string
  required: boolean
  location: \'path\' | \'query\' | \'body\'
  description: string
  enumValues?: string[]
  defaultValue?: string
}

interface Endpoint {
  id: string
  method: \'GET\' | \'POST\' | \'PUT\' | \'DELETE\'
  path: string
  summary: string
  description: string
  params: Param[]
  responseExample?: string
  requestExample?: string
}

interface Section {
  title: string
  icon: string
  description: string
  endpoints: Endpoint[]
}

// ─── Method Badge ─────────────────────────────────────────────────────────────
const METHOD_COLORS = {
  GET: \'bg-emerald-500/15 text-emerald-400 border-emerald-500/30\',
  POST: \'bg-ws-signal/15 text-ws-glow border-ws-signal/30\',
  PUT: \'bg-ws-warm/15 text-ws-warm border-ws-warm/30\',
  DELETE: \'bg-red-500/15 text-red-400 border-red-500/30\',
}

function MethodBadge({ method }: { method: keyof typeof METHOD_COLORS }) {
  return (
    <span className={cn(\'text-xs font-mono font-bold px-2 py-0.5 rounded border\', METHOD_COLORS[method])}>
      {method}
    </span>
  )
}

// ─── Param Table ─────────────────────────────────────────────────────────────
function ParamTable({ params }: { params: Param[] }) {
  if (!params.length) return null
  const byLocation = {
    path: params.filter(p => p.location === \'path\'),
    query: params.filter(p => p.location === \'query\'),
    body: params.filter(p => p.location === \'body\'),
  }

  return (
    <div className=\"space-y-4\">
      {([\'path\', \'query\', \'body\'] as const).map(loc => {
        const group = byLocation[loc]
        if (!group.length) return null
        return (
          <div key={loc}>
            <p className=\"text-xs text-ws-ink/30 uppercase tracking-widest mb-2\">{loc} parameters</p>
            <div className=\"rounded-xl border border-ws-border overflow-hidden\">
              <table className=\"w-full text-sm\">
                <thead>
                  <tr className=\"border-b border-ws-border bg-ws-void/50\">
                    <th className=\"text-left px-4 py-2 text-xs text-ws-ink/40 font-medium w-1/4\">Name</th>
                    <th className=\"text-left px-4 py-2 text-xs text-ws-ink/40 font-medium w-1/6\">Type</th>
                    <th className=\"text-left px-4 py-2 text-xs text-ws-ink/40 font-medium w-16\">Required</th>
                    <th className=\"text-left px-4 py-2 text-xs text-ws-ink/40 font-medium\">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((p, i) => (
                    <tr key={p.name} className={cn(\'border-b border-ws-border/50 last:border-0\', i % 2 === 0 ? \'bg-transparent\' : \'bg-ws-void/20\')}>
                      <td className=\"px-4 py-3 font-mono text-xs text-ws-signal\">{p.name}{p.defaultValue ? <span className=\"text-ws-ink/30 ml-1\">= {p.defaultValue}</span> : null}</td>
                      <td className=\"px-4 py-3 font-mono text-xs text-ws-warm/80\">{p.type}</td>
                      <td className=\"px-4 py-3 text-xs\">{p.required ? <span className=\"text-red-400\">yes</span> : <span className=\"text-ws-ink/30\">no</span>}</td>
                      <td className=\"px-4 py-3 text-xs text-ws-ink/60\">
                        {p.description}
                        {p.enumValues && <div className=\"mt-1 flex flex-wrap gap-1\">{p.enumValues.map(v => <code key={v} className=\"bg-ws-void border border-ws-border px-1.5 py-0.5 rounded text-ws-glow text-xs\">{v}</code>)}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Code Block ───────────────────────────────────────────────────────────────
function CodeBlock({ code, label }: { code: string, label?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className=\"rounded-xl border border-ws-border overflow-hidden\">
      <div className=\"flex items-center justify-between px-4 py-2 bg-ws-void/80 border-b border-ws-border\">
        <span className=\"text-xs text-ws-ink/30 font-mono\">{label || \'example\'}</span>
        <button onClick={copy} className=\"text-xs text-ws-ink/30 hover:text-ws-signal transition-colors\">{copied ? \'copied ✓\' : \'copy\'}</button>
      </div>
      <pre className=\"p-4 text-xs text-ws-ink/70 font-mono overflow-x-auto bg-ws-void/60 leading-relaxed\"><code>{code}</code></pre>
    </div>
  )
}

// ─── Endpoint Card ────────────────────────────────────────────────────────────
function EndpointCard({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={\"rounded-2xl border transition-all duration-200\" + (open ? \" border-ws-signal/40 bg-ws-mist\" : \" border-ws-border bg-ws-mist/60 hover:border-ws-border/80\")}>
      <button
        onClick={() => setOpen(!open)}
        className=\"w-full text-left flex items-center gap-4 p-5\"
      >
        <MethodBadge method={ep.method} />
        <code className=\"font-mono text-sm text-ws-ink/80 flex-1\">{ep.path}</code>
        <span className=\"text-sm text-ws-ink/50 hidden sm:block\">{ep.summary}</span>
        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" className={\"text-ws-ink/30 transition-transform\" + (open ? \" rotate-180\" : \"\")}><path d=\"M6 9l6 6 6-6\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>
      </button>

      {open && (
        <div className=\"px-5 pb-6 space-y-5 border-t border-ws-border/50 pt-5\">
          <p className=\"text-sm text-ws-ink/60 leading-relaxed\">{ep.description}</p>
          {ep.params.length > 0 && <ParamTable params={ep.params} />}
          {ep.requestExample && <CodeBlock code={ep.requestExample} label=\"request\" />}
          {ep.responseExample && <CodeBlock code={ep.responseExample} label=\"response\" />}
        </div>
      )}
    </div>
  )
}

// ─── API Data ─────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    title: \'Tasks\',
    icon: \'⚡\',
    description: \'Create, retrieve, update, and delete Manus agent tasks.\',
    endpoints: [
      {
        id: \'create-task\',
        method: \'POST\', path: \'/v1/tasks\',
        summary: \'Create Task\',
        description: \'Creates a new Manus agent task. Requires a prompt and agent profile. The agent will execute the task asynchronously — poll GET /v1/tasks/{task_id} to check status and retrieve output.\',
        requestExample: `{
  "prompt": "Research the top 5 AI safety papers from 2025 and summarize each",
  "agentProfile": "manus-1.6",
  "taskMode": "agent",
  "hideInTaskList": false,
  "createShareableLink": true
}`,
        responseExample: `{
  "task_id": "tsk_abc123",
  "task_title": "AI Safety Papers Research",
  "task_url": "https://manus.ai/tasks/tsk_abc123",
  "share_url": "https://manus.ai/share/tsk_abc123"
}`,
        params: [
          { name: \'prompt\', type: \'string\', required: true, location: \'body\', description: \'The task instruction for the Manus agent.\' },
          { name: \'agentProfile\', type: \'string\', required: true, location: \'body\', description: \'Which Manus model to use.\', enumValues: [\'manus-1.6\', \'manus-1.6-lite\', \'manus-1.6-max\'], defaultValue: \'manus-1.6\' },
          { name: \'taskMode\', type: \'string\', required: false, location: \'body\', description: \'Execution mode.\', enumValues: [\'chat\', \'adaptive\', \'agent\'] },
          { name: \'attachments\', type: \'array\', required: false, location: \'body\', description: \'File or image attachments (file_id, URL, or base64).\' },
          { name: \'taskId\', type: \'string\', required: false, location: \'body\', description: \'Provide an existing task ID to continue a multi-turn conversation.\' },
          { name: \'projectId\', type: \'string\', required: false, location: \'body\', description: \"Associate with a project to apply that project's default instruction.\" },
          { name: \'connectors\', type: \'array\', required: false, location: \'body\', description: \'Connector IDs to enable (e.g. Gmail, Notion). Must be pre-configured in your account.\' },
          { name: \'hideInTaskList\', type: \'boolean\', required: false, location: \'body\', description: \'Hide from the Manus webapp task list. Still accessible via task_url.\' },
          { name: \'createShareableLink\', type: \'boolean\', required: false, location: \'body\', description: \'Make the task publicly viewable on the Manus site.\' },
          { name: \'interactiveMode\', type: \'boolean\', required: false, location: \'body\', description: \'Allow Manus to ask follow-up questions when input is insufficient. Default: false.\' },
          { name: \'locale\', type: \'string\', required: false, location: \'body\', description: \'Your locale (e.g. "en-US"). Uses your account default if omitted.\' },
        ]
      },
      {
        id: \'list-tasks\',
        method: \'GET\', path: \'/v1/tasks\',
        summary: \'List Tasks\',
        description: \'Retrieves a paginated list of tasks with optional filtering by status, date range, or search query.\',
        responseExample: `{
  "object": "list",
  "data": [{ "id": "tsk_abc123", "status": "completed", ... }],
  "first_id": "tsk_abc123",
  "last_id": "tsk_xyz789",
  "has_more": true
}`,
        params: [
          { name: \'after\', type: \'string\', required: false, location: \'query\', description: \'Cursor for pagination. Pass the last_id from the previous response.\' },
          { name: \'limit\', type: \'integer\', required: false, location: \'query\', description: \'Max results to return. Default: 100, Range: 1–1000.\' },
          { name: \'order\', type: \'string\', required: false, location: \'query\', description: \'Sort direction.\', enumValues: [\'asc\', \'desc\'] },
          { name: \'orderBy\', type: \'string\', required: false, location: \'query\', description: \'Sort field.\', enumValues: [\'created_at\', \'updated_at\'] },
          { name: \'query\', type: \'string\', required: false, location: \'query\', description: \'Search term to filter by title and body content.\' },
          { name: \'status\', type: \'array\', required: false, location: \'query\', description: \'Filter by task status.\', enumValues: [\'pending\', \'running\', \'completed\', \'failed\'] },
          { name: \'createdAfter\', type: \'integer\', required: false, location: \'query\', description: \'Unix timestamp (seconds). Only returns tasks created after this time.\' },
          { name: \'createdBefore\', type: \'integer\', required: false, location: \'query\', description: \'Unix timestamp (seconds). Only returns tasks created before this time.\' },
          { name: \'project_id\', type: \'string\', required: false, location: \'query\', description: \'Filter by project. Returns only tasks in the specified project.\' },
        ]
      },
      {
        id: \'get-task\',
        method: \'GET\', path: \'/v1/tasks/{task_id}\',
        summary: \'Get Task\',
        description: \'Retrieves details of a specific task including its full output (conversation history), status, and credit usage. Poll this endpoint to check task progress.\',
        responseExample: `{
  "id": "tsk_abc123",
  "object": "task",
  "status": "completed",
  "model": "manus-1.6",
  "instructions": "Research the top 5 AI safety papers...",
  "output": [
    { "role": "assistant", "content": [{ "type": "output_text", "text": "Here are the top 5..." }] }
  ],
  "credit_usage": 42,
  "created_at": 1740000000,
  "updated_at": 1740001200
}`,
        params: [
          { name: \'task_id\', type: \'string\', required: true, location: \'path\', description: \'The ID of the task to retrieve.\' },
          { name: \'convert\', type: \'boolean\', required: false, location: \'query\', description: \'Convert task output (currently only applies to .pptx files).\' },
        ]
      },
      {
        id: \'update-task\',
        method: \'PUT\', path: \'/v1/tasks/{task_id}\',
        summary: \'Update Task\',
        description: \'Updates a task's metadata: rename it, toggle public sharing, or show/hide from the task list.\',
        requestExample: `{
  "title": "AI Safety Research — 2025 Edition",
  "enableShared": true,
  "enableVisibleInTaskList": true
}`,
        responseExample: `{
  "task_id": "tsk_abc123",
  "task_title": "AI Safety Research — 2025 Edition",
  "task_url": "https://manus.ai/tasks/tsk_abc123",
  "share_url": "https://manus.ai/share/tsk_abc123"
}`,
        params: [
          { name: \'task_id\', type: \'string\', required: true, location: \'path\', description: \'The ID of the task to update.\' },
          { name: \'title\', type: \'string\', required: false, location: \'body\', description: \'New display title for the task.\' },
          { name: \'enableShared\', type: \'boolean\', required: false, location: \'body\', description: \'Whether to make the task publicly shareable.\' },
          { name: \'enableVisibleInTaskList\', type: \'boolean\', required: false, location: \'body\', description: \'Whether this task appears in the Manus task list UI.\' },
        ]
      },
      {
        id: \'delete-task\',
        method: \'DELETE\', path: \'/v1/tasks/{task_id}\',
        summary: \'Delete Task\',
        description: \'Permanently deletes a task by ID.\',
        responseExample: `{
  "id": "tsk_abc123",
  "object": "task.deleted",
  "deleted": true
}`,
        params: [
          { name: \'task_id\', type: \'string\', required: true, location: \'path\', description: \'The ID of the task to delete.\' },
        ]
      },
    ]
  },
  {
    title: \'Files\',
    icon: \'📁\',
    description: \'Upload files to attach to tasks. Files are stored on S3 via a presigned URL flow.\',
    endpoints: [
      {
        id: \'list-files\',
        method: \'GET\', path: \'/v1/files\',
        summary: \'List Files\',
        description: \'Returns the 10 most recently uploaded files in your account.\',
        responseExample: `{
  "object": "list",
  "data": [
    { "id": "file_abc", "filename": "report.pdf", "status": "ready", "created_at": "2026-02-28T10:00:00Z" }
  ]
}`,
        params: []
      },
      {
        id: \'create-file\',
        method: \'POST\', path: \'/v1/files\',
        summary: \'Create File\',
        description: \'Creates a file record and returns a presigned S3 URL. Upload your file content via a PUT request to that URL, then use the returned file_id as an attachment in CreateTask.\',
        requestExample: `// Step 1: Create file record
POST /v1/files
{ "filename": "my-document.pdf" }

// Step 2: Upload content to presigned URL
PUT {upload_url}
Content-Type: application/pdf
[binary file data]

// Step 3: Use in CreateTask
{ "attachments": [{ "filename": "my-document.pdf", "file_id": "file_abc" }] }`,
        responseExample: `{
  "id": "file_abc",
  "object": "file",
  "filename": "my-document.pdf",
  "status": "pending",
  "upload_url": "https://s3.amazonaws.com/...",
  "upload_expires_at": "2026-02-28T11:00:00Z",
  "created_at": "2026-02-28T10:00:00Z"
}`,
        params: [
          { name: \'filename\', type: \'string\', required: true, location: \'body\', description: \'Name of the file to upload.\' },
        ]
      },
      {
        id: \'get-file\',
        method: \'GET\', path: \'/v1/files/{file_id}\',
        summary: \'Get File\',
        description: \'Retrieves details of a specific file by ID.\',
        responseExample: `{
  "id": "file_abc",
  "object": "file",
  "filename": "my-document.pdf",
  "status": "ready",
  "created_at": "2026-02-28T10:00:00Z"
}`,
        params: [
          { name: \'file_id\', type: \'string\', required: true, location: \'path\', description: \'The ID of the file to retrieve.\' },
        ]
      },
      {
        id: \'delete-file\',
        method: \'DELETE\', path: \'/v1/files/{file_id}\',
        summary: \'Delete File\',
        description: \'Deletes a file by ID. Removes both the file record and the S3 object.\',
        responseExample: `{
  "id": "file_abc",
  "object": "file.deleted",
  "deleted": true
}`,
        params: [
          { name: \'file_id\', type: \'string\', required: true, location: \'path\', description: \'The ID of the file to delete.\' },
        ]
      },
    ]
  },
  {
    title: \'Projects\',
    icon: \'📂\',
    description: \'Group tasks and apply consistent instructions across an entire project.\',
    endpoints: [
      {
        id: \'list-projects\',
        method: \'GET\', path: \'/v1/projects\',
        summary: \'List Projects\',
        description: \'Returns all projects in your account. Each project has a default instruction that is automatically applied to every task created within it.\',
        responseExample: `{
  "data": [
    { "id": "proj_abc", "name": "Aetherhaven Research", "instruction": "Always cite sources.", "created_at": 1740000000 }
  ]
}`,
        params: [
          { name: \'limit\', type: \'integer\', required: false, location: \'query\', description: \'Max results. Default: 100, Range: 1–1000.\' },
        ]
      },
      {
        id: \'create-project\',
        method: \'POST\', path: \'/v1/projects\',
        summary: \'Create Project\',
        description: \'Creates a new project. Provide a name and an optional default instruction. All tasks in this project will receive the instruction automatically.\',
        requestExample: `{
  "name": "Aetherhaven Research",
  "instruction": "You are an Aetherhaven research agent. Always cite sources. Format output as markdown. Focus on space tech, AI, and biotech."
}`,
        responseExample: `{
  "id": "proj_abc",
  "name": "Aetherhaven Research",
  "instruction": "You are an Aetherhaven research agent...",
  "created_at": 1740000000
}`,
        params: [
          { name: \'name\', type: \'string\', required: true, location: \'body\', description: \'Project name.\' },
          { name: \'instruction\', type: \'string\', required: false, location: \'body\', description: \'Default instruction applied to all tasks in this project.\' },
        ]
      },
    ]
  },
  {
    title: \'Webhooks\',
    icon: \'🔔\',
    description: \'Receive real-time notifications when tasks complete, fail, or update.\',
    endpoints: [
      {
        id: \'create-webhook\',
        method: \'POST\', path: \'/v1/webhooks\',
        summary: \'Create Webhook\',
        description: \'Registers a webhook URL to receive task lifecycle events. Manus will POST to your endpoint when a task status changes. Validate authenticity using the HMAC signature in the X-Manus-Signature header.\',
        requestExample: `{
  "webhook": {
    "url": "https://your-server.com/webhooks/manus",
    "events": ["task.completed", "task.failed"]
  }
}`,
        responseExample: `{
  "webhook_id": "wh_abc123"
}`,
        params: [
          { name: \'webhook\', type: \'object\', required: true, location: \'body\', description: \'Webhook configuration object with url and events array.\' },
        ]
      },
      {
        id: \'delete-webhook\',
        method: \'DELETE\', path: \'/v1/webhooks/{webhook_id}\',
        summary: \'Delete Webhook\',
        description: \'Removes a registered webhook. Manus will stop sending events to that endpoint immediately.\',
        params: [
          { name: \'webhook_id\', type: \'string\', required: true, location: \'path\', description: \'The ID of the webhook to delete.\' },
        ]
      },
    ]
  },
]

// ─── Schema Reference ─────────────────────────────────────────────────────────
const SCHEMAS = [
  {
    name: \'Task\',
    fields: [
      { name: \'id\', type: \'string\', desc: \'Unique task identifier\' },
      { name: \'object\', type: \'string\', desc: \'Always "task"\' },
      { name: \'status\', type: \'string\', desc: \'pending | running | completed | failed\' },
      { name: \'model\', type: \'string\', desc: \'Model used (e.g. manus-1.6)\' },
      { name: \'instructions\', type: \'string\', desc: \'Original prompt\' },
      { name: \'output\', type: \'TaskMessage[]\', desc: \'Full conversation history\' },
      { name: \'credit_usage\', type: \'integer\', desc: \'Credits consumed\' },
      { name: \'metadata\', type: \'object\', desc: \'Task info + optional custom key-value pairs\' },
      { name: \'created_at\', type: \'integer\', desc: \'Unix timestamp\' },
      { name: \'updated_at\', type: \'integer\', desc: \'Unix timestamp\' },
    ]
  },
  {
    name: \'TaskMessage\',
    fields: [
      { name: \'id\', type: \'string\', desc: \'Message ID\' },
      { name: \'role\', type: \'string\', desc: \'assistant | user\' },
      { name: \'type\', type: \'string\', desc: \'Always "message"\' },
      { name: \'status\', type: \'string\', desc: \'Message status\' },
      { name: \'content\', type: \'MessageContent[]\', desc: \'Array of content items\' },
    ]
  },
  {
    name: \'MessageContent\',
    fields: [
      { name: \'type\', type: \'string\', desc: \'output_text | output_file\' },
      { name: \'text\', type: \'string\', desc: \'Text content (output_text only)\' },
      { name: \'fileUrl\', type: \'string\', desc: \'File URL (output_file only)\' },
      { name: \'fileName\', type: \'string\', desc: \'File name (output_file only)\' },
      { name: \'mimeType\', type: \'string\', desc: \'MIME type (output_file only)\' },
    ]
  },
  {
    name: \'File\',
    fields: [
      { name: \'id\', type: \'string\', desc: \'File ID\' },
      { name: \'object\', type: \'string\', desc: \'Always "file"\' },
      { name: \'filename\', type: \'string\', desc: \'Original filename\' },
      { name: \'status\', type: \'string\', desc: \'pending | ready\' },
      { name: \'upload_url\', type: \'string\', desc: \'Presigned S3 PUT URL (CreateFile only)\' },
      { name: \'upload_expires_at\', type: \'string\', desc: \'ISO 8601 expiry for upload URL\' },
      { name: \'created_at\', type: \'string\', desc: \'ISO 8601 creation time\' },
    ]
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ApiReferencePage() {
  const [activeSection, setActiveSection] = useState(\'Tasks\')
  const activeData = SECTIONS.find(s => s.title === activeSection)!

  return (
    <div className=\"min-h-screen bg-ws-void\">
      <Navbar />
      <div className=\"pt-24 pb-24\">
        <div className=\"max-w-7xl mx-auto px-6\">

          {/* Page header */}
          <div className=\"mb-12\">
            <div className=\"flex items-center gap-3 mb-4\">
              <a href=\"/docs\" className=\"text-xs text-ws-ink/30 hover:text-ws-signal transition-colors\">Docs</a>
              <span className=\"text-ws-ink/20\">/</span>
              <span className=\"text-xs text-ws-ink/50\">API Reference</span>
            </div>
            <h1 className=\"font-display text-5xl font-extrabold text-ws-ink mb-3\">API Reference</h1>
            <p className=\"text-ws-ink/50 max-w-xl\">
              Integrate Manus agent tasks into any workflow. All endpoints require a Bearer token in the <code className=\"font-mono text-xs bg-ws-mist border border-ws-border px-1.5 py-0.5 rounded\">API_KEY</code> header.
            </p>
            <div className=\"mt-4 flex items-center gap-3\">
              <code className=\"font-mono text-sm bg-ws-mist border border-ws-border px-3 py-1.5 rounded-lg text-ws-signal\">
                Base URL: https://api.manus.ai
              </code>
              <a
                href=\"https://open.manus.ai/docs/api-reference/openapi.json\"
                target=\"_blank\"
                rel=\"noopener noreferrer\"
                className=\"text-xs border border-ws-border text-ws-ink/40 hover:border-ws-signal hover:text-ws-signal px-3 py-1.5 rounded-lg transition-colors\"
              >
                OpenAPI spec ↗
              </a>
            </div>
          </div>

          <div className=\"flex gap-8\">
            {/* Sidebar */}
            <aside className=\"w-48 shrink-0 hidden md:block\">
              <div className=\"sticky top-24 space-y-1\">
                <p className=\"text-xs text-ws-ink/25 uppercase tracking-widest mb-3 px-2\">Endpoints</p>
                {SECTIONS.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveSection(s.title)}
                    className={cn(
                      \"w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2\",
                      activeSection === s.title
                        ? \"bg-ws-signal/15 text-ws-signal\"
                        : \"text-ws-ink/50 hover:text-ws-ink hover:bg-ws-mist\"
                    )}
                  >
                    <span className=\"text-base\">{s.icon}</span> {s.title}
                  </button>
                ))}
                <div className=\"pt-4 mt-4 border-t border-ws-border\">
                  <p className=\"text-xs text-ws-ink/25 uppercase tracking-widest mb-3 px-2\">Schemas</p>
                  {SCHEMAS.map((s) => (
                    <div key={s.name} className=\"px-3 py-1.5 text-xs text-ws-ink/30 font-mono\">{s.name}</div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className=\"flex-1 min-w-0 space-y-10\">
              {/* Mobile section tabs */}
              <div className=\"flex gap-2 overflow-x-auto md:hidden\">
                {SECTIONS.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveSection(s.title)}
                    className={cn(\"shrink-0 px-3 py-1.5 rounded-full border text-xs transition-colors\",
                      activeSection === s.title ? \"bg-ws-signal border-ws-signal text-white\" : \"border-ws-border text-ws-ink/50\")}
                  >
                    {s.icon} {s.title}
                  </button>
                ))}
              </div>

              {/* Section header */}
              <div>
                <h2 className=\"font-display text-2xl font-bold text-ws-ink mb-1\">
                  {activeData.icon} {activeData.title}
                </h2>
                <p className=\"text-sm text-ws-ink/40\">{activeData.description}</p>
              </div>

              {/* Endpoints */}
              <div className=\"space-y-3\">
                {activeData.endpoints.map((ep) => (
                  <EndpointCard key={ep.id} ep={ep} />
                ))}
              </div>

              {/* Schema reference */}
              {activeSection === \'Tasks\' && (
                <div>
                  <h3 className=\"font-display text-lg font-bold text-ws-ink mb-4\">Schema Reference</h3>
                  <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-4\">
                    {SCHEMAS.map((schema) => (
                      <div key={schema.name} className=\"rounded-2xl border border-ws-border bg-ws-mist/50 p-5\">
                        <h4 className=\"font-mono text-sm font-bold text-ws-signal mb-3\">{schema.name}</h4>
                        <div className=\"space-y-1.5\">
                          {schema.fields.map((f) => (
                            <div key={f.name} className=\"flex items-start gap-3 text-xs\">
                              <code className=\"text-ws-ink/70 font-mono shrink-0 w-32\">{f.name}</code>
                              <code className=\"text-ws-warm/70 font-mono shrink-0\">{f.type}</code>
                              <span className=\"text-ws-ink/30\">{f.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auth note */}
              <div className=\"rounded-2xl border border-ws-warm/20 bg-ws-warm/5 p-5\">
                <div className=\"flex items-start gap-3\">
                  <span className=\"text-ws-warm text-lg\">⚠</span>
                  <div>
                    <p className=\"text-sm font-semibold text-ws-warm mb-1\">Authentication</p>
                    <p className=\"text-xs text-ws-ink/50 leading-relaxed\">
                      All requests require an API key passed in the <code className=\"font-mono bg-ws-mist border border-ws-border px-1.5 py-0.5 rounded text-ws-signal\">API_KEY</code> header.
                      Get your key at <a href=\"https://manus.ai/settings/api\" className=\"text-ws-signal hover:text-ws-glow\" target=\"_blank\" rel=\"noopener noreferrer\">manus.ai/settings/api</a>.
                    </p>
                    <CodeBlock
                      code={`curl https://api.manus.ai/v1/tasks \\
  -H "API_KEY: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{ "prompt": "Hello Manus!", "agentProfile": "manus-1.6" }'`}
                      label=\"cURL example\"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
