# RN Stream

Starter project for a Stremio add-on hosted on Cloudflare Workers.

## Current status

- Manifest endpoint: `/manifest.json`
- Health endpoint: `/health`
- Stremio catalogue, metadata and stream route placeholders
- No provider integrations or playable streams are included yet

## Deploy

Connect this GitHub repository to Cloudflare Workers Builds, or deploy with Wrangler from a development environment.

Build settings for Git integration:
- Build command: leave empty
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

After deployment, test:
- `https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/health`
- `https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev/manifest.json`

Provider integrations should only use APIs and playback sources you are authorized to access and distribute.
