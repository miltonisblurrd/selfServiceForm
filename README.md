# Self Service Form - Blurrd Studio

Multi-step self-service form for project requests built with Next.js 15+ and deployed on Webflow Cloud.

## Tech Stack

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State Management)
- **Webflow Cloud** (Hosting on Cloudflare Workers)

## Project Structure

```
/self-service-project-request
├── Step 1: Service Selection
├── Step 2: Package Selection
└── Step 3: Contract Generation
```

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/self-service-project-request`

## Deployment

This app is configured to deploy to Webflow Cloud at `/self-service-project-request`.

### Configuration

- `basePath`: `/self-service-project-request`
- `assetPrefix`: `/self-service-project-request`

## Features

- ✅ 3-step multi-step form
- ✅ Service selection with disabled states
- ✅ Package selection with details
- ✅ Contract form with dynamic inputs
- ✅ Real-time pricing summary
- ✅ Responsive design with mobile support
- ✅ Persistent state with localStorage
- 🚧 PDF contract generation (coming soon)
- 🚧 Email integration (coming soon)
- 🚧 Stripe payment integration (coming soon)
