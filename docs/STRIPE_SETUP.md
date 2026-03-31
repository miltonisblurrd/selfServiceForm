# Stripe Payment Integration

## Overview
Your form uses Stripe Payment Links to accept payments after contract generation.

## Setup Steps

### 1. Create Stripe Account
1. Go to https://dashboard.stripe.com/register
2. Sign up with your business details
3. Complete business verification (required for live payments)

### 2. Get API Keys
1. In Stripe dashboard, go to "Developers" → "API keys"
2. You'll see two keys:
   - **Publishable key** (starts with `pk_`) - NOT NEEDED for this integration
   - **Secret key** (starts with `sk_test_` for test mode, `sk_live_` for production)

### 3. Test Mode vs Live Mode
- **Test mode**: Use while developing (no real payments)
  - Use `sk_test_...` key
  - Test with card: `4242 4242 4242 4242` (any future date, any CVV)
- **Live mode**: Use in production (real payments)
  - Use `sk_live_...` key
  - Requires business verification

### 4. Add to Webflow Cloud
1. Go to Webflow Cloud dashboard
2. Navigate to your site → Settings → Environment Variables
3. Add: `STRIPE_SECRET_KEY=sk_test_your_key_here`
4. When ready for production, replace with `sk_live_your_key_here`

## Payment Flow

1. User completes form and clicks "Generate Contract"
2. PDF is generated and emailed
3. Stripe Payment Link is created with:
   - Dynamic amount (based on selected services)
   - Client metadata (name, email, company)
   - Custom success message
4. User is redirected to Stripe-hosted payment page
5. After payment, user sees success message
6. You receive payment notification in Stripe dashboard

## Payment Link Features
- Secure Stripe-hosted checkout
- Mobile optimized
- Multiple payment methods (card, Apple Pay, Google Pay)
- Automatic receipt email from Stripe
- No PCI compliance needed on your end

## Webhook Setup (Optional)
To get notified when payments complete:
1. In Stripe dashboard, go to "Developers" → "Webhooks"
2. Add endpoint: `https://blurrdstudio.com/self-service-project-request/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`
4. Copy webhook signing secret
5. Add to environment: `STRIPE_WEBHOOK_SECRET=whsec_...`

## Testing
- **Test mode cards**: https://stripe.com/docs/testing#cards
- **4242 4242 4242 4242**: Success
- **4000 0000 0000 9995**: Declined

## Costs
- **2.9% + $0.30** per successful transaction
- No monthly fees
- No setup fees
