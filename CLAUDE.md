# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Yves Virtuel / Virtuel All Tech** — a consultant in AI, automation, and generative AI based in Yaoundé, Cameroon. Single-page static site, content in French.

## Tech Stack

- **HTML5** — single `index.html` entry point
- **Tailwind CSS** — loaded via CDN (`cdn.tailwindcss.com`), utility-first classes inline
- **Custom CSS** — `CSS/style.css` for overrides (CSS variables, scrollbar, glassmorphism, AOS tweaks)
- **Vanilla JavaScript** — `JS/script.js` for navigation, form handling, and analytics
- **Libraries (CDN)**: AOS (scroll animations), Font Awesome 6 (icons), Google Fonts (Inter, Orbitron)
- **Backend**: n8n webhook endpoints for form submission and analytics tracking
- **Analytics**: Cloudflare Web Analytics + custom n8n event tracking

## Project Structure

```
├── index.html          # Single page: nav, hero, services, resources, bio, contact
├── CSS/style.css       # Custom styles and CSS variables
├── JS/script.js        # Navigation, AOS init, form submission, tracking
├── assets/             # Images (logo, profile photos), CV PDF, certificate PNGs
└── CLAUDE.md
```

## Key Architecture Decisions

- **No build step**: Tailwind is loaded from CDN at runtime. No `package.json`, no bundler, no transpilation.
- **No framework**: Pure vanilla HTML/CSS/JS. No React, Vue, or other framework.
- **n8n webhooks**: The contact form (`#contact-form`) POSTs JSON to `formwebsite` webhook. Analytics events POST to `stats` webhook. Both use `fetch()` with `mode: 'no-cors'`.
- **Google Translate exclusion**: Elements with `.notranslate` class are excluded from auto-translation (brand names).
- **Session tracking**: `sessionStorage` generates a unique `session_id` per browser session for analytics.

## Sections (index.html)

| ID | Purpose |
|---|---|
| `#offres` | Services (AutoPost, RAG Assistant, Automation) |
| `#ressources` | Free downloadable resources (PDFs via Google Forms) |
| `#bio` | About / certifications |
| `#contact` | Contact form (n8n webhook) + footer |

## Common Tasks

**Local preview**: Open `index.html` directly in a browser, or use a local server:
```bash
# Python
python -m http.server 8000

# Node.js (if available)
npx serve .
```

**No lint/test/build commands** — this is a static site with no tooling configured.

## External Integrations

- **n8n webhooks** (self-hosted on Hugging Face Spaces):
  - Form: `https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/formwebsite`
  - Stats: `https://SIKATIYvesJoseph-n8nhuggingface1.hf.space/webhook/stats`
- **Google Forms**: Resource download links (FR/EN variants per resource)
- **Notion**: Resource center link
- **Cloudflare Web Analytics**: Beacon script in footer
- **WhatsApp**: Direct contact link (`wa.me/237673219281`)

## Content Guidelines

- All visible text is in French; do not translate brand names (`.notranslate` class)
- Social links: LinkedIn, Facebook, WhatsApp, TikTok
- Profile images in `assets/` — optimized formats (.webp) preferred over raw .jpg/.png
