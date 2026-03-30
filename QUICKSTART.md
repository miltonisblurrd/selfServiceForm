# Quick Setup Guide

## What's Built (Front-End Complete! ✅)

### ✅ Completed
- Next.js 15 project with App Router
- Webflow Cloud configuration (OpenNext, Wrangler, basePath)
- 3-step form flow matching your screenshots
- Sticky pricing sidebar ("Resume" panel)
- Dark left sidebar with progress tracking
- Mobile-responsive design
- Zustand state management with localStorage auto-save
- Service and package selection UI
- Contract generation form with different signer support
- Git repository initialized

### 🔧 To Be Wired Up (Backend)
- PDF generation (@react-pdf/renderer)
- Email sending (Resend)
- Stripe payment integration
- API routes

## Access Your Form

**Local Development:**
- URL: http://localhost:3001/self-serve
- Dev server is running!

## Next Steps

### 1. Test the UI Flow

Open http://localhost:3001/self-serve and test:
- [ ] Select services (SEO & AEO, Technical Problem Solving)
- [ ] See pricing update in sticky sidebar
- [ ] Navigate to Step 2, select packages
- [ ] Navigate to Step 3, fill in form
- [ ] Toggle "I'm the signer" checkbox
- [ ] Click "Generate Contract" (shows alert for now)

### 2. Add Your Actual Services

Edit `config/services.ts` to add all your real services and packages with:
- Service names, descriptions, icons
- Package pricing, timelines
- What's included/not included lists

### 3. Deploy to Webflow Cloud

Follow steps in `DEPLOYMENT.md`:
1. Create GitHub repository
2. Push code: `git push -u origin main`
3. Connect to Webflow Cloud in site settings
4. Create project and environment (mount path: `/self-serve`)
5. Set environment variables
6. Publish site

**That's it!** Your form will be live at `blurrdstudio.com/self-serve`

### 4. Wire Up Backend (After Deployment)

Once the front-end is deployed and looking good:
- [ ] Setup Resend account and verify domain
- [ ] Get Stripe API keys
- [ ] Build PDF contract template
- [ ] Create API routes for email and payment
- [ ] Test end-to-end flow

## Quick Commands

```bash
# Development
npm run dev                    # Start dev server (http://localhost:3000/self-serve)

# Testing with Edge Runtime
npm run preview                # Test with Wrangler (simulates Cloudflare Workers)

# Deployment
git add . && git commit -m "Update"
git push                       # Auto-deploys to Webflow Cloud

# Or manual deploy
webflow auth login
webflow cloud deploy --env production --mount /self-serve
```

## File Structure

```
✅ app/self-serve/page.tsx          # Main form page
✅ app/self-serve/confirmation/     # Post-payment confirmation
✅ components/form-steps/           # 3 step components
✅ components/Sidebar.tsx           # Left progress sidebar
✅ components/PricingSummary.tsx    # Right sticky pricing
✅ config/services.ts               # YOUR DATA GOES HERE
✅ store/form-store.ts              # State management
⏳ app/api/send-contract/          # TO BE BUILT
⏳ app/api/create-payment/         # TO BE BUILT
⏳ lib/contract-template.tsx       # TO BE BUILT
```

## Need Help?

Check `README.md` for full documentation
Check `DEPLOYMENT.md` for deployment steps
