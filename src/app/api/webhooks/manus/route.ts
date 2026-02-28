import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Manus task webhook receiver
// Receives task.completed / task.failed events -> updates Webspace UI via Supabase realtime
// Bridge: if task originated from Ko-fi (metadata.source === 'kofi_webhook'),
//         extract the thank-you tweet copy and push to the Make tweet-drafting scenario
//
// Setup: Register webhook at POST https://api.manus.ai/v1/webhooks
//   { "url": "https://your-vercel-url.vercel.app/api/webhooks/manus",
//     "events": ["task.completed", "task.failed"],
//     "secret": "<your-manus-webhook-secret>" }
// Env: MANUS_WEBHOOK_SECRET, MAKE_KOFI_TWEET_WEBHOOK_URL

const MANUS_WEBHOOK_SECRET = process.env.MANUS_WEBHOOK_SECRET
const MAKE_KOFI_TWEET_WEBHOOK_URL = process.env.MAKE_KOFI_TWEET_WEBHOOK_URL

export interface ManusTaskEvent {
  event: 'task.completed' | 'task.failed'
  task: {
    id: string
    title: string
    status: 'completed' | 'failed'
    result?: string
    error?: string
    metadata?: {
      source?: string
      supporter_email?: string
      transaction_id?: string
      [key: string]: unknown
    }
    created_at: string
    completed_at?: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    if (MANUS_WEBHOOK_SECRET) {
      const signature = req.headers.get('x-manus-signature')
      if (!verifySignature(rawBody, signature, MANUS_WEBHOOK_SECRET)) {
        console.error('[manus-webhook] Invalid signature')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const payload: ManusTaskEvent = JSON.parse(rawBody)
    const { event, task } = payload

    console.log(`[manus-webhook] ${event} -- task "${task.title}" (${task.id})`)

    broadcastToUI(task).catch(err =>
      console.error('[manus-webhook] UI broadcast failed:', err)
    )

    if (
      event === 'task.completed' &&
      task.metadata?.source === 'kofi_webhook' &&
      task.result &&
      MAKE_KOFI_TWEET_WEBHOOK_URL
    ) {
      forwardToMakeTweetScenario(task).catch(err =>
        console.error('[manus-webhook] Make tweet forward failed:', err)
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[manus-webhook] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function verifySignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

async function broadcastToUI(task: ManusTaskEvent['task']) {
  // TODO: replace with Supabase realtime once connected
  // const supabase = createClient()
  // await supabase.channel('task-updates').send({
  //   type: 'broadcast',
  //   event: 'task_status',
  //   payload: { task_id: task.id, status: task.status, result: task.result }
  // })
  console.log(`[manus-webhook] UI broadcast queued (Supabase not yet connected): task ${task.id} -> ${task.status}`)
}

async function forwardToMakeTweetScenario(task: ManusTaskEvent['task']) {
  const res = await fetch(MAKE_KOFI_TWEET_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'manus_kofi_bridge',
      task_id: task.id,
      tweet_copy: task.result,
      supporter_email: task.metadata?.supporter_email,
      transaction_id: task.metadata?.transaction_id,
    }),
  })

  if (!res.ok) {
    throw new Error(`Make webhook error ${res.status}`)
  }

  console.log(`[manus-webhook] Ko-fi thank-you copy forwarded to Make for tweet: task ${task.id}`)
}
