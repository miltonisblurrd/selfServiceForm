# Blurrd Studio Self-Service Form

A multi-step form for selecting services, generating contracts, and processing payments.

## Tech Stack

- **Next.js 15+** with App Router
- **Tailwind CSS** for styling
- **Zustand** for state management
- **@react-pdf/renderer** for PDF generation
- **Resend** for email delivery
- **Stripe** for payment processing
- **Webflow Cloud** for hosting (Cloudflare Workers Edge Runtime)

## Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- npm package manager
- Webflow account with Cloud access
- GitHub account

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000/self-serve](http://localhost:3000/self-serve) in your browser.

### Local Development

The app runs with basePath `/self-serve` configured. Access the form at:
- Local: `http://localhost:3000/self-serve`

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Resend Email API
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@blurrdstudio.com
RESEND_ADMIN_EMAIL=admin@blurrdstudio.com

# Stripe Payment API
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

## Project Structure

```
/app
  /self-serve              # Main form route
  /api                     # API routes (Resend, Stripe)
/components
  /form-steps              # 3 step components
  /ui                      # Reusable UI components
  /Sidebar.tsx             # Left progress sidebar
  /PricingSummary.tsx      # Right sticky pricing panel
/config
  /services.ts             # Service definitions & pricing
/store
  /form-store.ts           # Zustand state management
/types
  /form.ts                 # TypeScript interfaces
```

## Features

### 3-Step Form Flow

1. **Pick the Services** - Select one or more services
2. **Pick the Packages** - Choose a package for each selected service
3. **Generate the Contract** - Fill in details and generate contract

### Key Features

- ✅ Sticky pricing sidebar showing real-time total
- ✅ localStorage persistence (auto-save progress)
- ✅ Different signer support ("I'm the signer" toggle)
- ✅ Responsive design (mobile-friendly)
- ✅ Client-side PDF generation
- ✅ Email delivery to client and admin
- ✅ Stripe Payment Links integration

## Deployment to Webflow Cloud

### 1. Install Webflow CLI

```bash
npm install -g @webflow/webflow-cli
```

### 2. Authenticate with Webflow

```bash
webflow auth login
```

### 3. Test Locally with Edge Runtime

```bash
npm run preview
```

This uses Wrangler to simulate the Cloudflare Workers Edge runtime locally.

### 4. Deploy to Webflow Cloud

```bash
webflow cloud deploy --env production --mount /self-serve --auto-publish
```

Or push to GitHub - Webflow Cloud will auto-deploy from your connected branch.

### 5. Set Environment Variables

In Webflow Cloud dashboard:
1. Go to your project's Environment settings
2. Add all environment variables from `.env.local`
3. Mark sensitive values (API keys) as "Secret"

### 6. Access Your Form

Once deployed, access at: `https://blurrdstudio.com/self-serve`

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Preview with Edge runtime (Wrangler)
npm run preview

# Deploy to Webflow Cloud
webflow cloud deploy
```

## Next Steps

- [ ] Add actual service/package data to `config/services.ts`
- [ ] Setup Resend account and verify domain
- [ ] Setup Stripe account and get API keys
- [ ] Wire up PDF generation in Step 3
- [ ] Wire up email sending via Resend
- [ ] Wire up Stripe payment redirect
- [ ] Test complete flow
- [ ] Deploy to Webflow Cloud

## Support

For questions or issues, contact: hello@blurrdstudio.com
