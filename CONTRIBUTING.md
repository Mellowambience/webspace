# Contributing to Webspace

Thanks for your interest. Here's how to get started.

## Setup

```bash
git clone https://github.com/Mellowambience/webspace.git
cd webspace
npm install
cp .env.example .env.local
# Fill in your keys
npm run dev
```

## Stack Notes

- **Next.js 14 App Router** — use Server Components by default, Client Components only when necessary
- **Supabase** — all DB queries go through `lib/supabase/server.ts` in server components
- **Stripe Connect** — all payment helpers live in `lib/stripe/connect.ts`
- **Types** — shared types in `types/index.ts`

## PRs

- Keep PRs focused and small
- Add types for new data structures
- Test against local Supabase instance

## Issues

Use GitHub Issues for bugs and feature requests.
