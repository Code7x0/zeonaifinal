# ZeonAI Website

Official web application for **ZeonAI** — an enterprise AI workspace and governed agent platform. Built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router, standalone output)
- **UI & Styling:** React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui (`@base-ui/react`, `@radix-ui/react-tabs`), Lucide React
- **Motion & Graphics:** GSAP (`@gsap/react`), Motion, Lenis, Anime.js, Three.js

## Prerequisites

- [Node.js](https://nodejs.org/) 24+ (see `.nvmrc`)
- npm (included with Node.js)

## Local Setup

1. Install dependencies:

```bash
npm ci
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical base URL used for metadata, `sitemap.xml`, and `robots.txt`. Defaults to `https://zeonai.com`. |
| `RESEND_API_KEY` | Required for demo form | Server-side Resend API key used by `POST /api/demo` to deliver Book a Demo requests to `contact@zeonai.com`. |
| `RESEND_FROM_EMAIL` | Required for demo form | Verified sender address in Resend (for example `ZeonAI <demo@mail.zeonai.com>`). Must use a domain verified in Resend. |
| `DEMO_RATE_LIMIT_SECRET` | Optional | Secret used to sign the stateless submission cooldown cookie (defaults to `RESEND_API_KEY` if omitted). |
| `UPSTASH_REDIS_REST_URL` | Optional | Upstash Redis REST URL for distributed IP rate limiting on serverless deployments. |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Upstash Redis REST token paired with `UPSTASH_REDIS_REST_URL`. |

Copy `.env.example` to `.env.local` for local development (never commit `.env.local`).

## Available Scripts

```bash
npm run dev        # Start local development server
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type check
npm run check      # Run lint, typecheck, and build
```

## Build & Deployment

### Node.js / Vercel

The project uses standard Next.js build scripts (`npm run build` / `npm run start`) and deploys directly to Vercel or any Node.js 24+ host.

### Docker

The repository includes a multi-stage `Dockerfile` (using Next.js `output: "standalone"`) and `docker-compose.yml`:

```bash
# Build and run the production container on port 3000
docker compose up app --build

# Run the development container on port 3001
docker compose up dev --build
```

## Project Structure

```text
src/
  app/            # Next.js App Router pages, metadata, robots.ts, sitemap.ts
  components/     # Site sections, reusable blocks, and UI primitives
  lib/            # Shared utilities
  styles/         # Design tokens and global styles
  types/          # TypeScript declarations
public/           # Static fonts, images, icons, and video assets
```

## License

This project retains the MIT License notice in [LICENSE](LICENSE) from its initial project scaffold.
