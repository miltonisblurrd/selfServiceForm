# Deployment Guide

## Quick Start: Deploy to Webflow Cloud

### 1. Push to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Connect to Webflow Cloud

1. Go to your Webflow site settings
2. Navigate to "Webflow Cloud" in the sidebar
3. Click "Login to GitHub" and authorize
4. Click "Create New Project"
5. Enter project details:
   - **Name**: Self-Service Form
   - **GitHub Repository**: Your repo URL
   - **Description**: Multi-step form for service selection and contract generation
6. Click "Create project"

### 3. Create Environment

1. Select branch: `main`
2. Set mount path: `/self-serve`
3. Click "Create environment"

### 4. Add Environment Variables

In the Webflow Cloud environment settings, add:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx (mark as Secret)
RESEND_FROM_EMAIL=hello@blurrdstudio.com
RESEND_ADMIN_EMAIL=admin@blurrdstudio.com
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx (mark as Secret)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

### 5. Publish Your Site

Click "Publish Site" in Webflow to activate the environment.

### 6. Deploy

Option A: Auto-deploy (push to GitHub)
```bash
git add .
git commit -m "Update"
git push
```

Option B: Manual deploy (CLI)
```bash
webflow cloud deploy --env production --mount /self-serve --auto-publish
```

### 7. Access Your Form

After deployment (takes ~2 minutes), visit:
`https://blurrdstudio.com/self-serve`

## Local Testing with Edge Runtime

Before deploying, test locally with Wrangler to simulate Cloudflare Workers:

```bash
npm run preview
```

Access at: `http://localhost:8788/self-serve`

## Troubleshooting

### 404 Error
- Ensure site is published in Webflow
- Check mount path is `/self-serve`
- Verify deployment succeeded in build logs

### Assets Not Loading
- Check basePath in `next.config.ts` matches mount path
- Verify assetPrefix is configured

### API Routes Failing
- Ensure all API routes have `export const runtime = 'edge';`
- Check environment variables are set in Webflow Cloud dashboard
- Review build logs for errors
