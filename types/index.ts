export interface Template {
  id: string
  slug: string
  title: string
  description: string
  preview_image_url: string
  price_cents: number        // 0 = free
  developer_id: string
  stripe_product_id: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  active_template_id: string | null
  is_developer: boolean
  stripe_account_id: string | null  // Stripe Connect
  follower_count: number
  following_count: number
  created_at: string
}

export interface ContentBlock {
  id: string
  user_id: string
  type: 'bio' | 'links' | 'projects' | 'social_embeds' | 'custom_html'
  position: number
  data: Record<string, unknown>
}

export interface TemplatePurchase {
  id: string
  user_id: string
  template_id: string
  stripe_payment_intent_id: string
  amount_cents: number
  purchased_at: string
}
