# Webspace Webhook System

Three-part webhook architecture: Ko-fi -> Make -> Manus -> Webspace UI (bridged).

## Architecture

```
Ko-fi support event
       |
       v
/api/webhooks/kofi  (Webspace — verifies token, logs support, triggers Manus task)
       |
       v
Manus API  (agent writes personalized cosmic thank-you tweet copy)
       |
       v  task.completed
/api/webhooks/manus  (Webspace — broadcasts to UI via Supabase realtime, re-fires Make)
       |
       v
Make scenario (manus_kofi_bridge path)
       |
       v
Tweet draft -> Mars HITL review -> @1Aether1Rose1 posts
```

## Setup

### 1. Ko-fi Webhook
- Ko-fi dashboard -> Settings -> API -> Webhook URL:
  `https://your-vercel-url.vercel.app/api/webhooks/kofi`
- Set `KO_FI_VERIFICATION_TOKEN` in Vercel env vars (copy from Ko-fi dashboard)

### 2. Manus Webhook
Register via Manus API:
```bash
curl -X POST https://api.manus.ai/v1/webhooks \
  -H "Authorization: Bearer $MANUS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-vercel-url.vercel.app/api/webhooks/manus",
    "events": ["task.completed", "task.failed"],
    "secret": "<generate a strong random secret>"
  }'
```
Set `MANUS_WEBHOOK_SECRET` in Vercel env vars.

### 3. Make Scenario
- Create scenario in Make org 6727204
- Reference `make-scenario-blueprint.json` for the flow structure
- Add CustomWebHook trigger -> copy generated URL
- Set `MAKE_KOFI_TWEET_WEBHOOK_URL` env var to that URL

### 4. Environment Variables
Add to `.env.local` and Vercel project settings:
```
KO_FI_VERIFICATION_TOKEN=your_kofi_token_here
MANUS_WEBHOOK_SECRET=your_manus_secret_here
MANUS_API_KEY=your_manus_api_key_here
MAKE_KOFI_TWEET_WEBHOOK_URL=https://hook.us2.make.com/your-scenario-hook
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

### 5. Supabase Realtime (after DB is connected)
Uncomment the Supabase broadcast block in `manus/route.ts`.
Channel `task-updates` pushes task status to Webspace frontend in real time.
