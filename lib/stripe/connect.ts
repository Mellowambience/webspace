import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

/**
 * Create a Stripe Connect onboarding link for a developer.
 * Call this when a developer wants to start receiving payouts.
 */
export async function createConnectAccountLink(accountId: string, origin: string) {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${origin}/studio/connect/refresh`,
    return_url: `${origin}/studio/connect/return`,
    type: 'account_onboarding',
  })
  return accountLink.url
}

/**
 * Create a payment intent for a template purchase.
 * Platform takes STRIPE_PLATFORM_FEE_PERCENT% of the sale.
 */
export async function createTemplatePaymentIntent({
  amount,
  connectedAccountId,
}: {
  amount: number
  connectedAccountId: string
}) {
  const feePercent = Number(process.env.STRIPE_PLATFORM_FEE_PERCENT ?? 20)
  const applicationFeeAmount = Math.round(amount * (feePercent / 100))

  return stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    application_fee_amount: applicationFeeAmount,
    transfer_data: { destination: connectedAccountId },
  })
}
