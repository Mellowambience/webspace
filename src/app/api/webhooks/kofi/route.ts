import { NextRequest, NextResponse } from 'next/server'

// Ko-fi webhook receiver
// Receives support events → logs to Supabase → triggers Make scenario for thank-you tweet
// Bridge: also creates a Manus agent task for personalized thank-you copy
//
// Setup: Ko-fi dashboard → Settings → API → Webhook URL → point here
// Env: KO_FI_VERIFICATION_TOKEN, MANUS_API_KEY, NEXT_PUBLIC_SITE_URL

const KO_FI_VERIFICATION_TOKEN = process.env.KO_FI_VERIFICATION_TOKEN

// Manus agent task config for personalized thank-you
const MANUS_AGENT_TASK_TEMPLATE = (supporter: KoFiEvent) => ({
  title: `Write thank-you for ${supporter.from_name}`,
  description: `
    A supporter named "${supporter.from_name}" just supported Aetherhaven via Ko-fi.
    Type: ${supporter.type}
    Amount: ${supporter.amount} ${supporter.currency}
    Message: "${supporter.message || '(no message)'}"

    Write a warm, personalized, cosmic thank-you tweet reply (under 280 chars).
    Tone: fae-core meets cyberpunk — intimate, genuine, name-woven if possible.
    Do NOT use generic templates. Reference their message if they left one.
    Sign off as @1Aether1Rose1 / Aetherhaven.
  `.trim(),
  metadata: {
    source: 'kofi_webhook',
    supporter_email: supporter.email,
    transaction_id: supporter.kofi_transaction_id,
  },
})

export interface KoFiEvent {
  verification_token: string
  message_id: string
  timestamp: string
  type: 'Donation' | 'Subscription' | 'Commission' | 'Shop Order'
  is_public: boolean
  from_name: string
  message: string
  amount: string
  url: string
  email: string
  currency: string
  is_subscription_payment: boolean
  is_first_subscription_payment: boolean
  kofi_transaction_id: string
  tier_name?: string
  shop_items?: { direct_link_code?: string }[]
}

export async function POST(req: NextRequest) {
  try {
    // Ko-fi sends as form-encoded `data` field containing JSON
    const formData = await req.formData()
    const rawData = formData.get('data')

    if (!rawData || typeof rawData !== 'string') {
      return NextResponse.json({ error: 'Missing data field' }, { status: 400 })
    }

    const event: KoFiEvent = JSON.parse(rawData)

    // Verify token
    if (event.verification_token !== KO_FI_VERIFICATION_TOKEN) {
      console.error('[kofi-webhook] Invalid verification token')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log(`[kofi-webhook] ${event.type} from ${event.from_name} — ${event.amount} ${event.currency}`)

    // 1. Log to Supabase (fire-and-forget, non-blocking)
    logToSupabase(event).catch(err => console.error('[kofi-webhook] Supabase log failed:', err))

    // 2. Bridge → Manus: create personalized thank-you agent task
    if (process.env.MANUS_API_KEY) {
      triggerManusTask(event).catch(err =>
        console.error('[kofi-webhook] Manus task creation failed:', err)
      )
    }

    // Ko-fi requires 200 OK to stop retries
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[kofi-webhook] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function logToSupabase(event: KoFiEvent) {
  // TODO: replace with your Supabase client once connected
  // import { createClient } from '@/lib/supabase/server'
  // const supabase = createClient()
  // await supabase.from('kofi_events').insert({ ... })
  console.log('[kofi-webhook] Supabase logging: Supabase not yet connected — queued for after DB setup')
  return { ok: true }
}

async function triggerManusTask(event: KoFiEvent) {
  const taskPayload = MANUS_AGENT_TASK_TEMPLATE(event)

  const res = await fetch('https://api.manus.ai/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MANUS_API_KEY}`,
    },
    body: JSON.stringify(taskPayload),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Manus API error ${res.status}: ${body}`)
  }

  const task = await res.json()
  console.log(`[kofi-webhook] Manus task created: ${task.id} for ${event.from_name}`)
  return task
}
