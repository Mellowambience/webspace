# Webspace

> Your corner of the internet, designed.

Webspace is a social platform where your profile *is* a fully designed webpage. Developers build and sell templates. Everyone else picks one, makes it theirs, and uses it as their digital identity.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: Supabase (Postgres)
- **Storage**: Supabase Storage
- **Payments**: Stripe Connect
- **Hosting**: Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your env vars
npm run dev
```

## Project Structure

```
webspace/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth routes (sign-in, sign-up)
│   ├── (marketing)/        # Public pages (landing, pricing)
│   ├── (platform)/         # Authenticated platform
│   │   ├── dashboard/      # User dashboard
│   │   ├── marketplace/    # Template marketplace
│   │   ├── [username]/     # Public profile page
│   │   └── studio/         # Developer template builder
│   ├── api/                # API routes
│   │   ├── webhooks/       # Stripe + Clerk webhooks
│   │   └── templates/      # Template CRUD
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                 # Base UI components
│   ├── profile/            # Profile rendering
│   ├── marketplace/        # Marketplace components
│   └── studio/             # Template studio components
├── lib/
│   ├── supabase/           # Supabase client
│   ├── stripe/             # Stripe Connect helpers
│   └── utils.ts
├── types/
└── public/
```

## Environment Variables

See `.env.example` for required variables.

## Contributing

PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
