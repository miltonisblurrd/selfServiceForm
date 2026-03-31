# Self Service Form - BLURRD STUDIO

Multi-step self-service form for project requests. Built with Next.js 15+ and deployed on Webflow Cloud at `blurrdstudio.com/self-service-project-request`.

## Features

### ✅ Complete 3-Step Flow
1. **Service Selection** - Choose from Brand Identity, Web Design, or Development
2. **Package Selection** - Pick packages (Starter, Standard, Premium) for each service
3. **Contract Generation** - Fill details, generate PDF, receive email, and pay

### ✅ PDF Contract Generation
- Client-side PDF generation with `@react-pdf/renderer`
- Professional branded contract template
- Automatic download after generation
- Includes all selected services, packages, and pricing

### ✅ Email Integration (Resend)
- Automated contract delivery to client
- Admin notification emails
- PDF attachment included
- Professional HTML email templates

### ✅ Payment Integration (Stripe)
- Dynamic Stripe Payment Links
- Automatic amount calculation
- Secure Stripe-hosted checkout
- Custom success messages

### ✅ Video Integration (Mux)
- High-performance video playback
- One video per form step
- Fallback placeholder when no video uploaded
- Edge-optimized streaming

### ✅ Modern UI/UX
- Clean 2-column layout (700px content + 400px video)
- Tailwind CSS with custom Webflow design tokens
- JetBrains Mono typography
- Persistent state with Zustand + localStorage
- Responsive mobile design

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand with localStorage persistence
- **PDF**: @react-pdf/renderer
- **Email**: Resend
- **Payments**: Stripe Payment Links
- **Video**: Mux
- **Hosting**: Webflow Cloud (Cloudflare Workers Edge)
- **Adapter**: @opennextjs/cloudflare

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Visit the form
http://localhost:3000/self-service-project-request

# Build for production
npm run build
```

## Deployment

### Initial Setup
1. Connect GitHub repo to Webflow Cloud
2. Set directory path: `/` (root of repo)
3. Add environment variables in Webflow dashboard
4. Push to `main` branch - auto deploys

### Environment Variables
Required in Webflow Cloud → Site Settings → Environment Variables:

```bash
RESEND_API_KEY=re_your_key_here
STRIPE_SECRET_KEY=sk_test_or_sk_live_your_key_here
```

See detailed setup guides:
- [Resend Setup](docs/RESEND_SETUP.md)
- [Stripe Setup](docs/STRIPE_SETUP.md)
- [Mux Videos](docs/MUX_SETUP.md)
- [Full Deployment Guide](docs/DEPLOYMENT.md)

### Deployment URL
https://blurrdstudio.com/self-service-project-request

## Project Structure

```
/
├── app/
│   ├── api/
│   │   ├── send-contract/route.ts    # Email API (Resend)
│   │   └── create-payment/route.ts   # Payment API (Stripe)
│   ├── page.tsx                      # Main form entry
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── form-steps/
│   │   ├── Step1ServiceSelection.tsx
│   │   ├── Step2PackageSelection.tsx
│   │   └── Step3ContractGeneration.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── ServiceCard.tsx
│   │   └── PackageCard.tsx
│   ├── ContractPDF.tsx              # PDF template
│   ├── MuxVideoPlayer.tsx           # Video player
│   ├── FormProvider.tsx
│   ├── Sidebar.tsx
│   └── MultiStepForm.tsx
├── config/
│   ├── services.ts                  # Service & package definitions
│   └── mux-videos.ts               # Mux video playback IDs
├── store/
│   └── form-store.ts               # Zustand state management
├── types/
│   └── form.ts                     # TypeScript interfaces
├── docs/                           # Setup documentation
└── webflow.json                    # Webflow Cloud config
```

## Configuration

### Services & Packages
Edit `config/services.ts` to modify:
- Service offerings
- Package tiers
- Pricing
- Timelines
- Included/excluded features

### Videos
Add Mux playback IDs in `config/mux-videos.ts`:
```typescript
export const muxVideos = {
  step1: { playbackId: 'YOUR_MUX_PLAYBACK_ID', title: 'Pick the Services' },
  step2: { playbackId: 'YOUR_MUX_PLAYBACK_ID', title: 'Choose Your Package' },
  step3: { playbackId: 'YOUR_MUX_PLAYBACK_ID', title: 'Generate Contract' },
};
```

### Styling
Design tokens in `tailwind.config.ts`:
- Colors: `#003399` (primary), `#ff6601` (accent), `#FBFAF6` (background)
- Font: JetBrains Mono
- Custom spacing and sizing

## User Flow

1. **Select Services** → Choose 1 or more services (Development is disabled)
2. **Pick Packages** → Select package tier for each service
3. **Fill Details** → Provide client and contract information
4. **Generate Contract** → PDF downloads, email sent, payment link created
5. **Make Payment** → Stripe checkout opens in new tab
6. **Project Kickoff** → BLURRD STUDIO reaches out within 24 hours

## Testing

### Local Testing
```bash
# Start dev server
npm run dev

# Test form flow
1. Visit http://localhost:3000/self-service-project-request
2. Select services and packages
3. Fill contract details
4. Click "Generate Contract"
```

Note: Email and payment won't work locally without environment variables.

### Production Testing
Use Stripe test mode keys and test cards:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 9995

## Maintenance

### Updating Prices
1. Edit `config/services.ts`
2. Commit and push
3. Webflow Cloud auto-deploys

### Adding New Services
1. Add to `services` array in `config/services.ts`
2. Include packages with pricing
3. Deploy

### Modifying Contract Template
Edit `components/ContractPDF.tsx` for PDF layout/content changes.

### Email Templates
Modify HTML in `app/api/send-contract/route.ts`.

## Support

For questions or issues:
- Email: hello@blurrdstudio.com
- GitHub: [Repository Issues](https://github.com/miltonisblurrd/selfServiceForm/issues)

## License

Proprietary - BLURRD STUDIO

