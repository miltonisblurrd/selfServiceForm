# Email Setup with Resend

## Overview
Your self-service form uses Resend to send contract PDFs via email to both the client and your admin team.

## Setup Steps

### 1. Create Resend Account
1. Go to https://resend.com/signup
2. Sign up with your email (free tier includes 100 emails/day)

### 2. Verify Your Domain
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter `blurrdstudio.com`
4. Follow the DNS verification steps:
   - Add the provided DNS records to your domain registrar
   - Wait for verification (usually 5-15 minutes)
5. Once verified, you can send from `contracts@blurrdstudio.com`

### 3. Get API Key
1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name it "Webflow Cloud Production"
4. Copy the key (starts with `re_`)

### 4. Add to Webflow Cloud
1. Go to Webflow Cloud dashboard
2. Navigate to your site → Settings → Environment Variables
3. Add: `RESEND_API_KEY=re_your_api_key_here`

### 5. Test Email Delivery
Once deployed, test by:
1. Completing a form submission
2. Check your email inbox
3. Verify PDF attachment is included
4. Check spam folder if not received

## Email Configuration

The form sends **2 emails** per submission:

1. **Client Email** (`to: client's email`)
   - Subject: "Your BLURRD STUDIO Service Agreement - [Company]"
   - Includes contract PDF attachment
   - Professional branded template
   - Next steps instructions

2. **Admin Email** (`to: hello@blurrdstudio.com`)
   - Subject: "New Contract Generated - [Company]"
   - Includes contract PDF attachment
   - Client details for follow-up

## Costs
- **Free tier**: 100 emails/day, 3,000/month
- **Pro plan** ($20/month): 50,000 emails/month
- For your use case, free tier should be sufficient

## Customization
Email templates are in: `app/api/send-contract/route.ts`
- Modify HTML for branding changes
- Add/remove fields as needed
- Update `from` address after domain verification
