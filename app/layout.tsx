import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Webspace — Your corner of the internet, designed.',
  description:
    'A social platform where your profile is a fully designed webpage. Developers build and sell templates. Everyone else picks one and makes it theirs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-ws-void text-ws-ink font-body antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
