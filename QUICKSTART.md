# Quick Start Guide - Self-Service Form

## What You Have Now

A complete 3-step self-service form that:
1. Guides users to select services and packages
2. Generates a professional PDF contract
3. Emails the contract automatically
4. Creates Stripe payment links
5. Integrates Mux videos (when you add them)

## What You Need to Do

### 1. Set Up Email (Resend) - 10 minutes
```
1. Sign up at resend.com
2. Verify blurrdstudio.com domain
3. Get API key
4. Add to Webflow Cloud environment variables
```
👉 **Detailed guide**: `docs/RESEND_SETUP.md`

### 2. Set Up Payments (Stripe) - 15 minutes
```
1. Sign up at stripe.com
2. Complete business verification
3. Get API key (test or live)
4. Add to Webflow Cloud environment variables
```
👉 **Detailed guide**: `docs/STRIPE_SETUP.md`

### 3. Add Videos (Mux) - Optional
```
1. Sign up at mux.com
2. Upload 3 videos (one per form step)
3. Get playback IDs
4. Update config/mux-videos.ts
5. Push to GitHub
```
👉 **Detailed guide**: `docs/MUX_SETUP.md`

## Environment Variables

Add these in **Webflow Cloud** → Site Settings → Environment Variables:

```bash
RESEND_API_KEY=re_your_key_here
STRIPE_SECRET_KEY=sk_test_or_live_your_key_here
```

⚠️ **Important**: Add these BEFORE testing the form in production!

## Deploy & Test

### Deploy
```bash
git push origin main
```
Webflow Cloud automatically rebuilds and deploys (2-3 minutes).

### Test
1. Visit: https://blurrdstudio.com/self-service-project-request
2. Complete all 3 steps
3. Generate contract (PDF downloads)
4. Check email for contract
5. Click payment link
6. Test payment with: 4242 4242 4242 4242

## Current Status

✅ **Frontend**: Live and working  
✅ **PDF Generation**: Client-side, ready  
✅ **Email API**: Built, needs Resend API key  
✅ **Payment API**: Built, needs Stripe API key  
⏳ **Videos**: Ready for Mux playback IDs (optional)

## Next Actions

1. **Add Resend API key** → Enables email delivery
2. **Add Stripe API key** → Enables payments
3. **Upload videos to Mux** → Replace placeholders (optional)
4. **Test end-to-end** → Verify complete flow works

## Support Files

- `docs/DEPLOYMENT.md` - Full deployment guide
- `docs/RESEND_SETUP.md` - Email setup instructions
- `docs/STRIPE_SETUP.md` - Payment setup instructions
- `docs/MUX_SETUP.md` - Video setup instructions
- `.env.example` - Environment variable template

## Questions?

Check the docs folder or contact hello@blurrdstudio.com
