import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TemplateCardProps {
  id: string
  slug: string
  title: string
  description: string
  previewImageUrl?: string
  priceCents: number
  developerName: string
  developerUsername: string
  featured?: boolean
}

export function TemplateCard({
  id, slug, title, description, previewImageUrl,
  priceCents, developerName, developerUsername, featured
}: TemplateCardProps) {
  const isFree = priceCents === 0
  const priceDisplay = isFree ? 'Free' : `$${(priceCents / 100).toFixed(2)}`

  return (
    <Link href={`/marketplace/${slug}`} className="group block">
      <div className={cn(
        "rounded-2xl border bg-ws-mist overflow-hidden transition-all duration-300",
        "hover:border-ws-signal hover:shadow-lg hover:shadow-ws-signal/10 hover:-translate-y-1",
        featured ? "border-ws-warm/50" : "border-ws-border"
      )}>
        {/* Preview */}
        <div className="h-48 bg-ws-void relative overflow-hidden">
          {previewImageUrl ? (
            <img src={previewImageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 opacity-10">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-ws-signal">
                  <path fillRule="evenodd" clipRule="evenodd" d="M43.9331 56.6106C48.0617 53.9722 50.9164 39.8218 50.2884 35.6081C50.2884 35.6081 49.634 33.3459 48.0372 33.3459C46.8137 33.3458 46.1377 34.3405 45.8884 34.8057C45.6728 34.7259 45.4533 34.6537 45.2792 34.5975C45.1853 34.5672 45.0537 34.5253 44.9304 34.4861L44.6964 34.4115C44.5053 34.3503 44.3255 34.2913 44.1561 34.2328L44.1566 34.1728C44.164 32.8051 44.025 30.6709 42.6083 28.4471C42.3816 28.0912 42.1677 27.7731 41.9848 27.5032L41.8701 27.3342C41.734 27.1338 41.6272 26.9765 41.5245 26.8195C41.2723 26.4345 41.2034 26.2861 41.1767 26.2177L41.1755 26.2146C41.1651 26.1881 41.1438 26.1341 41.138 25.9694C41.1309 25.7671 41.1481 25.3842 41.2793 24.7145L41.9612 21.9896C36.4404 26.8905 37.1541 27.9417 38.3305 29.6741C38.5371 29.9784 38.7581 30.3038 38.9884 30.6653C39.9266 32.1381 39.8833 33.5542 39.8479 34.71C39.8251 35.4534 39.8057 36.0891 40.0528 36.5629C40.5618 37.5387 42.4666 38.1438 43.7154 38.5405C44.0155 38.6358 44.2777 38.7191 44.4736 38.7927L44.6074 38.8457C44.4314 39.3955 44.2715 39.9646 44.1117 40.5332C43.4013 43.0618 42.6941 45.5791 40.5854 46.3334C37.9241 47.2853 35.2627 46.3846 35.2627 46.3846C34.783 46.2434 34.2945 46.1341 33.806 46.0247C33.1971 45.8885 32.588 45.7521 31.9952 45.554C31.1691 45.2451 30.0119 44.9796 28.7543 44.691C25.7598 44.004 22.1958 43.1863 21.1752 41.3406Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-ws-signal/5 to-transparent" />
            </div>
          )}
          {featured && (
            <div className="absolute top-3 left-3 bg-ws-warm text-ws-void text-xs font-semibold px-2 py-1 rounded-md">
              Featured
            </div>
          )}
          {isFree && (
            <div className="absolute top-3 right-3 bg-ws-signal/20 border border-ws-signal/30 text-ws-signal text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
              Free
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-ws-ink group-hover:text-ws-signal transition-colors leading-tight">
              {title}
            </h3>
            <span className="text-sm font-semibold text-ws-warm shrink-0">{priceDisplay}</span>
          </div>
          <p className="text-xs text-ws-ink/50 mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-ws-signal/20 flex items-center justify-center">
              <span className="text-xs text-ws-signal font-bold">{developerName[0]}</span>
            </div>
            <span className="text-xs text-ws-ink/40">by @{developerUsername}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
