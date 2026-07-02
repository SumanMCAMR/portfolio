# Repository Guidelines

## Project Overview
This is **Suman Kumar's** personal developer portfolio — a single-page application built with **Vue 3 + TypeScript + Vite**. The design follows an API/developer-themed aesthetic with a dark color scheme, monospace accents, HTTP method badges, a terminal typing animation, and scroll-reveal effects throughout.

**Live repo:** [github.com/SumanMCAMR/portfolio](https://github.com/SumanMCAMR/portfolio)

## Project Structure & Module Organization

```
portfolio/
├── index.html                  # Root HTML with SEO meta tags & Google Fonts preconnect
├── package.json                # Dependencies: Vue 3, Vite, TypeScript, vue-tsc
├── vite.config.ts              # Vite config with Vue plugin
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # App-level TS config
├── tsconfig.node.json          # Node-level TS config
├── AGENTS.md                   # This file — project context for AI agents
├── .gitignore                  # Node, Vite, TypeScript, macOS, IDE rules
├── public/                     # Static public assets (favicon, etc.)
├── src/
│   ├── main.ts                 # App entry — creates Vue app, imports global CSS
│   ├── style.css               # Global stylesheet with all CSS custom properties,
│   │                           # layout, typography, component styles, animations,
│   │                           # and responsive breakpoints
│   ├── App.vue                 # Root component — composes all sections,
│   │                           # implements IntersectionObserver scroll-reveal
│   ├── assets/                 # Imported source assets
│   └── components/
│       ├── NavBar.vue          # Fixed navigation with mobile hamburger toggle
│       ├── HeroSection.vue     # Hero grid + terminal typing animation
│       ├── AboutSection.vue    # Profile text + stat cards (3+ yrs, 30%, 25%)
│       ├── SkillsSection.vue   # Data-driven skill groups in tagged cards
│       ├── ExperienceSection.vue  # Timeline for work history & education
│       ├── ProjectsSection.vue # Project cards with links (professional + personal)
│       ├── CertificationsSection.vue  # Placeholder certification entries
│       ├── ContactSection.vue  # CTA box with email, LinkedIn, GitHub
│       └── FooterSection.vue   # Simple footer with copyright
```

## Component Architecture

### Data Flow
All section data (skills, projects, experience, certifications, nav items) is defined as **reactive TypeScript arrays/objects** inside each component's `<script setup lang="ts">` block. This makes content edits straightforward — just update the array.

### Key Patterns
- **Scroll Reveal:** `App.vue` uses a global `IntersectionObserver` (threshold 0.15) that adds `.visible` to any element with class `.reveal`, triggering a CSS opacity/translateY transition.
- **Terminal Animation:** `HeroSection.vue` uses `onMounted` to type out a curl command character-by-character, then fades in a JSON response block.
- **Mobile Nav:** `NavBar.vue` uses a `ref<boolean>` to toggle the `.open` class on the nav links list. Links auto-close the menu on click.
- **Dynamic Project Links:** `ProjectsSection.vue` uses Vue's `<component :is>` to render project cards as `<a>` tags when a link exists, or `<div>` otherwise. A `linkLabel()` helper shows "Visit Website ↗" for live sites and "View on GitHub ↗" for repos.

### Design System (CSS Custom Properties)
Defined in `src/style.css` under `:root`:
- **Colors:** `--bg` (#0B0E14), `--bg-alt` (#11151F), `--bg-raise` (#161B27), `--text` (#E8E6DE), `--text-dim` (#8B93A7), `--accent` (#FF5A3C, orange-red), `--accent-2` (#5EEAD4, teal), `--line` (#232838)
- **Typography:** `--mono` (JetBrains Mono), `--display` (Space Grotesk), `--body` (Inter)
- **Spacing:** `--radius` (10px)
- **Fonts loaded via:** Google Fonts preconnect in `index.html` + `@import` in `style.css`

### Responsive Breakpoints
- **820px:** Hero grid collapses to single column, about grid collapses, nav switches to mobile dropdown
- **700px:** Project grid and contact box collapse to single column
- **600px:** Skill groups collapse to single column

## Portfolio Content

### Owner
**Suman Kumar** — Software Developer based in Kolkata, India. 3+ years experience with Laravel + Vue.js/Nuxt.

### Projects (in `ProjectsSection.vue`)

| Project | Badge | Description | Link |
|---------|-------|-------------|------|
| **Bullfincher** | webskitters technology | Visual-first BI & research platform. Owned News, Ownership, Earnings Transcript, Org Chart, SEC Filings (10-K/10-Q) pages. Built AI-powered earning call transcript generation and summarization. | [bullfincher.io](https://bullfincher.io) |
| **MyWhiteCoats** | webskitters technology | HIPAA-compliant healthcare platform. Built ERX generation via provider API, doctor/patient onboarding with NPI & state license verification, Zoom integration for in-app video calls with auto-transcripts, SHA-256 encryption for HIPAA compliance. | [mywhitecoats.com](https://mywhitecoats.com) |
| **Merchan.io** | webreinvent technologies | Multi-store Shopify PIM and bulk editor. Integrated ag-grid for an Excel-like grid view to bulk edit products, variants, collections, and tags with auto-complete and drag-copy features. | [merchan.io](https://merchan.io) |
| **AR Restaurant Menu** | personal | QR-based AR menu for restaurants using browser WebXR. No app install required. | [GitHub](https://github.com/SumanMCAMR/AR_web_app_restaurant) |
| **Ride-Sharing App** | personal | Full-stack ride-hailing with real-time tracking, Twilio OTP, Pusher WebSockets. | [GitHub](https://github.com/SumanMCAMR/Ride-Sharing-App-Vue3-Laravel) |

### Experience (in `ExperienceSection.vue`)
1. **Software Developer** — Webskitters Technology Solutions (Aug 2024 – Present)
2. **Software Developer** — WebReinvent Technologies (Jun 2023 – Aug 2024)
3. **MCA** — Manav Rachna International (2021–2023, CGPA 7.8)
4. **BCA** — B.S.S College, Supaul (2016–2019, 78%)

### Skills (in `SkillsSection.vue`)
- Languages: PHP, JavaScript (ES6+), HTML5, CSS3, jQuery
- Frameworks: Laravel, Vue.js, Nuxt 3
- Backend: REST APIs, MVC, Sanctum, Passport, Queues & Jobs, Artisan CLI, Eloquent ORM
- Frontend: SPA Development, Axios, Pinia, Vuex
- Database: MySQL, PostgreSQL
- Tools: Git, GitHub, Postman, Composer, Microservices, Caching

### Contact
- Email: sumankumarmca022@gmail.com
- Phone: 8709583934
- LinkedIn: [linkedin.com/in/sumanmca](https://linkedin.com/in/sumanmca)
- GitHub: [github.com/SumanMCAMR](https://github.com/SumanMCAMR)

## Build, Test, and Development Commands

```sh
# Install dependencies
npm install

# Run the local development server
npm run dev

# Create a production build (runs vue-tsc type check + Vite build)
npm run build

# Preview the production build locally
npm run preview
```

## Coding Style & Naming Conventions
- Use Vue single-file components with `<script setup lang="ts">`.
- Two-space indentation, single quotes in TypeScript imports and strings.
- PascalCase component names (e.g., `HeroSection.vue`, `NavBar.vue`).
- Section components end in `Section.vue` when they represent page sections.
- Component-scoped styles use `<style scoped>`. Shared styles go in `src/style.css`.
- Data arrays for content (projects, skills, experience) live inside the component that renders them.

## Testing Guidelines
No test runner is currently configured. Before adding behavior-heavy changes, consider adding Vue Test Utils with Vitest and placing tests beside the relevant component or in a dedicated `src/__tests__/` directory. Use names like `HeroSection.test.ts` and focus on user-visible behavior, rendered content, and component state. Until tests exist, always run `npm run build` before submitting changes to catch TypeScript and production build issues.

## Commit & Pull Request Guidelines
Use short, imperative commit messages such as `Add contact section animation` or `Update project cards`. Pull requests should include a concise summary, screenshots or screen recordings for visual changes, any linked issue, and the commands run for verification, especially `npm run build`.

## Security & Configuration Tips
Do not commit secrets, private contact credentials beyond intended public portfolio details, or local environment files. Keep external links using `target="_blank"` paired with `rel="noopener"` as shown in existing components.
