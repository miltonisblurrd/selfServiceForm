# Deployment Guide for Webflow Cloud

## Prerequisites
- GitHub repository connected to Webflow Cloud
- Resend account with verified domain
- Stripe account with API keys

## Environment Variables Setup

### Required Variables
Add these in Webflow Cloud → Site Settings → Environment Variables:

```
RESEND_API_KEY=re_your_resend_api_key_here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
```

### Getting the Keys

**Resend API Key:**
1. Sign up at https://resend.com/signup
2. Verify domain `blurrdstudio.com`
3. Create API key in dashboard
4. See `docs/RESEND_SETUP.md` for detailed steps

**Stripe Secret Key:**
1. Sign up at https://dashboard.stripe.com/register
2. Complete business verification
3. Get secret key from Developers → API keys
4. Use `sk_test_...` for testing, `sk_live_...` for production
5. See `docs/STRIPE_SETUP.md` for detailed steps

## Mux Videos (Optional)
1. Upload videos to https://dashboard.mux.com
2. Get playback IDs
3. Update `config/mux-videos.ts`
4. See `docs/MUX_SETUP.md` for detailed steps

## Deployment Process

### Method 1: Automatic (Recommended)
1. Push to GitHub: `git push origin main`
2. Webflow Cloud automatically detects changes
3. Builds and deploys within 2-3 minutes
4. Check deployment status in Webflow dashboard

### Method 2: Manual via CLI
```bash
# Install Webflow CLI globally
npm install -g @webflow/cli

# Login to Webflow
webflow login

# Deploy
webflow cloud deploy
```

## Post-Deployment Checklist

1. **Test the form:**
   - Visit https://blurrdstudio.com/self-service-project-request
   - Select services and packages
   - Fill out contract details
   - Generate contract (should download PDF)
   - Check email for contract
   - Complete payment via Stripe

2. **Verify emails:**
   - Client should receive contract at their email
   - You should receive notification at hello@blurrdstudio.com
   - Both emails should have PDF attachments

3. **Verify payment:**
   - Payment link should open Stripe checkout
   - Test with card: 4242 4242 4242 4242 (test mode)
   - Check Stripe dashboard for payment

4. **Monitor errors:**
   - Check Webflow Cloud logs for any runtime errors
   - Check browser console for client-side errors

## Troubleshooting

### "Email service not configured"
- Environment variable `RESEND_API_KEY` is missing
- Add it in Webflow Cloud environment variables
- Redeploy after adding

### "Payment service not configured"
- Environment variable `STRIPE_SECRET_KEY` is missing
- Add it in Webflow Cloud environment variables
- Redeploy after adding

### PDF not generating
- Check browser console for errors
- Ensure all required fields are filled
- Try hard refresh (Cmd+Shift+R)

### Videos not showing
- Add Mux playback IDs to `config/mux-videos.ts`
- Videos are optional - placeholder shows if no ID

## Performance Notes
- PDF generation is client-side (fast, no server delay)
- Email sending takes 1-2 seconds
- Payment link creation takes 1-2 seconds
- Total form submission: ~3-5 seconds

## Updating After Deployment
Any code changes:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Webflow Cloud will automatically rebuild and redeploy.
